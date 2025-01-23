import sql from "@/lib/postgres";



// http://localhost:3000/api/customer/home/home_buah
export async function GetProductHomeActionCustomers() {
    let retries = 3;

    while (retries > 0) {
        try {
            const result = await sql.begin(async sql => {
                const categoriesWithProducts = await sql`
                SELECT 
                    c.categories_id,
                    c.categories_name,
                    (
                        SELECT json_agg(
                            json_build_object(
                                'product_id', p.product_id,
                                'products_name', p.products_name,
                                'products_description', p.products_description,
                                'stock', p.stock,
                                'created_at', p.created_at,
                                'price_type', p.price_type,
                                'fixed_price', f.price,
                                'wholesale_prices', (
                                    SELECT json_agg(
                                        json_build_object(
                                            'min_quantity', w.min_quantity,
                                            'max_quantity', w.max_quantity,
                                            'price', w.price
                                        )
                                    )
                                    FROM wholesale_prices w
                                    WHERE w.product_id = p.product_id
                                ),
                                'images', (
                                    SELECT json_agg(pi.image_path)
                                    FROM product_images pi
                                    WHERE pi.product_id = p.product_id
                                )
                            )
                        )
                        FROM products p
                        LEFT JOIN fixed_prices f ON p.product_id = f.product_id AND p.price_type = 'fixed'
                        WHERE p.categories_id = c.categories_id
                    ) AS products
                FROM categories c
                ORDER BY c.categories_id
            `;
                return categoriesWithProducts;
            });
            return result;
        } catch (error) {
            retries--;
            if (retries === 0) {
                console.error("Database connection failed after 3 attempts:", error);
                throw error;
            }
            // Tunggu sebentar sebelum mencoba lagi
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
}