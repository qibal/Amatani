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
                            'price_type', p.price_type
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

        // Jika tidak ada cart, kembalikan data kosong
        if (result.count === 0) {
            return {
                success: true,
                data: null
            };
        }

        return {
            success: true,
            data: result[0]
        };
    } catch (error) {
        console.error("Error GetCarttActionCustomers:", error);
        return {
            success: false,
            error: error.message
        };
    }
}



