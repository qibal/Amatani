"use server"

import sql from "@/lib/postgres";

export async function GetProductActionPublic(req, { params }) {
    const url = new URL(req.url);
    const searchQuery = url.searchParams.get('search');
    const category = url.searchParams.get('category');
    const sort = url.searchParams.get('sort');
    const limit = parseInt(url.searchParams.get('limit')) || 10;
    const offset = parseInt(url.searchParams.get('offset')) || 0;

    try {
        let query = sql`
            SELECT 
                p.product_id,
                p.products_name,
                p.products_description,
                p.stock,
                p.categories_id,
                c.categories_name,
                p.price_type,
                f.price,
                (
                    SELECT json_agg(json_build_object('min_quantity', w.min_quantity, 'max_quantity', w.max_quantity, 'price', w.price))
                    FROM wholesale_prices w
                    WHERE w.product_id = p.product_id
                ) AS wholesale_prices,
                (
                    SELECT json_agg(pi.image_path)
                    FROM product_images pi
                    WHERE pi.product_id = p.product_id
                ) AS images,
                p.created_at
            FROM 
                products p
            LEFT JOIN 
                fixed_prices f ON p.product_id = f.product_id AND p.price_type = 'fixed'
            LEFT JOIN 
                categories c ON p.categories_id = c.categories_id
        `;

        // Menambahkan WHERE clause jika ada filter
        if (searchQuery && category) {
            query = sql`${query} 
                WHERE (p.products_name ILIKE ${'%' + searchQuery + '%'} 
                OR p.products_description ILIKE ${'%' + searchQuery + '%'}) 
                AND c.categories_name ILIKE ${'%' + category + '%'}`;
        } else if (searchQuery) {
            query = sql`${query} 
                WHERE p.products_name ILIKE ${'%' + searchQuery + '%'} 
                OR p.products_description ILIKE ${'%' + searchQuery + '%'}`;
        } else if (category) {
            query = sql`${query} 
                WHERE c.categories_name ILIKE ${'%' + category + '%'}`;
        }

        // Menambahkan ORDER BY clause
        if (sort === 'A-Z') {
            query = sql`${query} ORDER BY p.products_name ASC`;
        } else if (sort === 'Z-A') {
            query = sql`${query} ORDER BY p.products_name DESC`;
        } else if (sort === 'Newest') {
            query = sql`${query} ORDER BY p.created_at DESC`;
        } else if (sort === 'Oldest') {
            query = sql`${query} ORDER BY p.created_at ASC`;
        }

        // Menambahkan LIMIT dan OFFSET
        query = sql`${query} LIMIT ${limit} OFFSET ${offset}`;

        const products = await query;
        console.log("Query result:", products);
        return products;

    } catch (error) {
        console.error("Error fetching products:", error);
        return { error: "Failed to fetch products", details: error.message };
    }
}
export async function GetProductDetailActionCustomers(request, { params }) {
    try {
        const data = await params.product_id;

        // Query untuk mendapatkan data produk berdasarkan kategori yang sesuai dengan query
        const result = await sql`
            SELECT 
                p.product_id,
                p.products_name,
                p.products_description,
                p.stock,
                p.categories_id,
                c.categories_name,
                p.created_at,
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
                fixed_prices f ON p.product_id = f.product_id AND p.price_type = 'fixed'
            LEFT JOIN 
                categories c ON p.categories_id = c.categories_id
            WHERE 
                p.product_id = ${data}
        `;

        console.log("Query result:", result);
        return result;
    } catch (error) {
        console.error("Error fetching product detail:", error);
        return { error: "Failed to fetch product detail", details: error.message };
    }
}