import sql from "@/lib/postgres";

// http://localhost:3000/api/customer/cart/ea1975e8-e225-4988-9c31-e4e1d8d11693
export async function GetCarttActionCustomers({ user_id }) {
    console.log("🚀 ~ GetCarttActionCustomers ~ query:", user_id)
    try {
        const result = await sql`
            SELECT
                c.carts_id,
                c.user_id,
                c.created_at,
                COALESCE(
                    JSON_AGG(
                        JSON_BUILD_OBJECT(
                            'cart_items_id', ci.cart_items_id,
                            'product_id', ci.product_id,
                            'quantity', ci.quantity,
                            'item_created_at', ci.created_at,
                            'products_name', p.products_name,
                            'stock', p.stock,
                            'price_type', p.price_type,
                            'fixed_price',
                                (
                                    SELECT fp.price
                                    FROM fixed_prices fp
                                    WHERE fp.product_id = p.product_id
                                    LIMIT 1
                                ),
                            'wholesale_prices',
                                (
                                    SELECT JSON_AGG(
                                        JSON_BUILD_OBJECT(
                                            'wholesale_prices_id', wp.wholesale_prices_id,
                                            'min_quantity', wp.min_quantity,
                                            'max_quantity', wp.max_quantity,
                                            'price', wp.price
                                        )
                                    )
                                    FROM wholesale_prices wp
                                    WHERE wp.product_id = p.product_id
                                ),
                            'product_images',
                                (
                                    SELECT JSON_AGG(
                                        JSON_BUILD_OBJECT(
                                            'images_id', pi.images_id,
                                            'image_path', pi.image_path
                                        )
                                    )
                                    FROM product_images pi
                                    WHERE pi.product_id = p.product_id
                                )
                        )
                    ) FILTER (WHERE ci.cart_items_id IS NOT NULL),
                    '[]'
                ) AS items
            FROM carts c
            LEFT JOIN carts_items ci ON ci.cart_id = c.carts_id
            LEFT JOIN products p ON p.product_id = ci.product_id
            WHERE c.user_id = ${user_id}
            GROUP BY c.carts_id, c.user_id, c.created_at
            LIMIT 1;
        `;

        if (result.count === 0) {
            return { success: true, data: null };
        }

        return { success: true, data: result[0] };
    } catch (error) {
        console.error("Error GetCarttActionCustomers:", error);
        return { success: false, error: error.message };
    }
}



