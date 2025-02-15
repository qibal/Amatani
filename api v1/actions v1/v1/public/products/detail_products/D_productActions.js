'use server'

import sql from "@/lib/postgres";

// http://localhost:3000/api/customer/products/products_detail/33a5fcb9-7dff-45af-b7e0-d44711eb9c44
export async function GetProductDetailActionCustomers(params) {
    console.log(params);
    const data = params

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

        // Check if product_id already exists in carts_items
        let cartItem = await sql`
            SELECT * 
            FROM carts_items 
            WHERE cart_id = ${cart[0].carts_id} 
            AND product_id = ${product_id}
            LIMIT 1;
        `;

        if (cartItem.length > 0) {
            // Update quantity if product_id exists
            cartItem = await sql`
                UPDATE carts_items
                SET quantity = quantity + ${quantity}
                WHERE cart_id = ${cart[0].carts_id}
                AND product_id = ${product_id}
                RETURNING *;
            `;
        } else {
            // Insert new product_id and quantity if not exists
            cartItem = await sql`
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
        }

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
    // Hitung total produk unik di dalam keranjang berdasarkan user_id
    try {
        const result = await sql`
            SELECT
                COUNT(DISTINCT ci.product_id) AS total_products
            FROM carts c
            LEFT JOIN carts_items ci ON ci.cart_id = c.carts_id
            WHERE c.user_id = ${user_id}
            LIMIT 1;
        `;

        // Jika tidak ada keranjang, kembalikan 0
        if (result.length === 0) {
            return {
                success: true,
                data: 0
            };
        }

        // Ambil total_products dari baris pertama
        return {
            success: true,
            data: result[0].total_products
        };
    } catch (error) {
        console.error("Error GetCountCarttCustomers:", error);
        return {
            success: false,
            error: error.message
        };
    }
}