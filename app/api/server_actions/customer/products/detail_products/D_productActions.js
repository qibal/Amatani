'use server'
import { cookies } from 'next/headers';
import sql from "@/lib/postgres";
import { createClient } from "@/lib/supabase/server";
// http://localhost:3000/api/customer/products/products_detail/33a5fcb9-7dff-45af-b7e0-d44711eb9c44
export async function GetProductDetailActionCustomers(params) {
    console.log(await params);
    const data = await params

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
            p.product_id = ${data};
    `;

    return result;
}


// http://localhost:3000app/api/customer/products/products_detail/add_to_cart
export async function AddToCartCustomers({ request, user }) {
    try {
        const formData = await request.formData()
        const product_id = formData.get('product_id')
        const quantity = parseInt(formData.get('quantity'))

        // Check if cart exists for user
        let cart = await sql`
            SELECT carts_id 
            FROM carts 
            WHERE user_id = ${user.id}
            LIMIT 1;
        `;

        // If no cart exists, create new cart
        if (cart.length === 0) {
            cart = await sql`
                INSERT INTO carts (user_id)
                VALUES (${user.id})
                RETURNING carts_id;
            `;
        }

        // Note: Changed table name from cart_items to carts_items
        const cartItem = await sql`
            INSERT INTO carts_items (
                cart_id,
                product_id,
                quantity
            )
            VALUES (
                ${cart[0].carts_id},
                ${product_id},
                ${quantity}
            )
            RETURNING *;
        `;

        console.log("🚀 ~ AddToCartCustomers ~ Success:", {
            user_id: user.id,
            cart_id: cart[0].carts_id,
            product_id,
            quantity
        });

        return {
            success: true,
            data: {
                user_id: user.id,
                ...cartItem[0]
            }
        };
    } catch (error) {
        console.error("🚀 ~ AddToCartCustomers ~ Error:", error);
        return { success: false, error: error.message };
    }
}


// http://localhost:3000/api/customer/navbar_cart/ea1975e8-e225-4988-9c31-e4e1d8d11693
export async function GetCountCarttCustomers({ user_id }) {
    // Hitung total quantity produk di dalam keranjang berdasarkan user_id
    try {
        const result = await sql`
            SELECT
                COALESCE(SUM(ci.quantity), 0) AS total_quantity
            FROM carts c
            LEFT JOIN carts_items ci ON ci.cart_id = c.carts_id
            WHERE c.user_id = ${user_id}
            GROUP BY c.carts_id
            LIMIT 1;
        `;

        // Jika tidak ada keranjang, kembalikan 0
        if (result.count === 0) {
            return {
                success: true,
                data: 0
            };
        }

        // Ambil total_quantity dari baris pertama
        return {
            success: true,
            data: result[0].total_quantity
        };
    } catch (error) {
        console.error("Error GetCountCarttCustomers:", error);
        return {
            success: false,
            error: error.message
        };
    }
}