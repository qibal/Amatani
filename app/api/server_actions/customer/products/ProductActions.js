import sql from "@/lib/postgres";

// http://localhost:3000/api/customer/products
export async function GetProductActionCustomers() {
    // Query untuk mendapatkan semua data produk beserta harga tetap, harga grosir, dan gambar produk
    const result = await sql`
        SELECT 
            p.product_id,
            p.products_name,
            -- p.products_description,
            -- p.stock,
            p.categories_id,
            -- p.created_at,
            p.price_type,
            f.price AS fixed_price,
            (
                SELECT json_agg(json_build_object('min_quantity', w.min_quantity, 'max_quantity', w.max_quantity, 'price', w.price))
                FROM wholesale_prices w
                WHERE w.product_id = p.product_id
            ) AS wholesale_prices,
            (
                SELECT json_agg(pi.image_path)
                FROM product_images pi
                WHERE pi.product_id = p.product_id
            ) AS images
        FROM 
            products p
        LEFT JOIN 
            fixed_prices f ON p.product_id = f.product_id AND p.price_type = 'fixed';
    `;

    // Mengembalikan hasil query
    return result;
}