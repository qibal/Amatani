"use server";

import sql from "@/lib/postgres";

/**
 * @description Menghitung total produk unik di dalam keranjang berdasarkan user_id.
 * @param {Object} { user_id } - Objek yang berisi user_id.
 * @returns {Promise<{success: boolean, data?: number, error?: any}>} Objek yang berisi status keberhasilan, jumlah produk unik jika berhasil, atau pesan error jika gagal.
 */
export async function GetCountCartCustomers(req, { params }) {
    const user_id = await params.user_id;
    try {
        // Query untuk menghitung total produk unik di dalam keranjang berdasarkan user_id
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
        console.error("Error GetCountCartCustomers:", error);
        return {
            success: false,
            error: "Failed to get cart count",
            details: error.message
        };
    }
}


/**
 * @description Mengambil data keranjang berdasarkan user_id.
 * @param {Object} { user_id } - Objek yang berisi user_id.
 * @returns {Promise<{success: boolean, data?: any, error?: any}>} Objek yang berisi status keberhasilan, data keranjang jika berhasil, atau pesan error jika gagal.
 */
export async function GetCartActionCustomers({ user_id }) {
    console.log("🚀 ~ GetCartActionCustomers ~ query:", user_id)
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

        if (result.length === 0) {
            return { success: true, data: null };
        }

        return { success: true, data: result[0] };
    } catch (error) {
        console.error("Error GetCartActionCustomers:", error);
        return { success: false, error: "Failed to get cart", details: error.message };
    }
}

/**
 * @description Menghapus item dari keranjang berdasarkan cart_items_id dan user_id.
 * @param {Object} { cart_items_id, user_id } - Objek yang berisi cart_items_id dan user_id.
 * @returns {Promise<{success: boolean, message?: string, error?: any}>} Objek yang berisi status keberhasilan, pesan jika berhasil, atau pesan error jika gagal.
 */
export async function DeleteCartItemCustomer({ cart_items_id, user_id }) {
    try {
        const result = await sql`
            DELETE FROM carts_items
            WHERE cart_items_id = ${cart_items_id}
            AND cart_id IN (SELECT carts_id FROM carts WHERE user_id = ${user_id})
            RETURNING *;
        `;

        if (result.length === 0) {
            return { success: false, message: "Item not found or not authorized to delete" };
        }

        return { success: true, message: "Item deleted successfully" };
    } catch (error) {
        console.error("Error DeleteCartItemCustomer:", error);
        return { success: false, error: "Failed to delete cart item", details: error.message };
    }
}

/**
 * @description Mengubah kuantitas item di dalam keranjang berdasarkan cart_items_id, quantity, dan user_id.
 * @param {Object} { cart_items_id, quantity, user_id } - Objek yang berisi cart_items_id, quantity, dan user_id.
 * @returns {Promise<{success: boolean, message?: string, data?: any, error?: any}>} Objek yang berisi status keberhasilan, pesan jika berhasil, data item yang diubah jika berhasil, atau pesan error jika gagal.
 */
export async function QuantityChangeCartCustomer({ cart_items_id, quantity, user_id }) {
    try {
        const result = await sql`
            UPDATE carts_items
            SET quantity = ${quantity}
            WHERE cart_items_id = ${cart_items_id}
            AND cart_id IN (SELECT carts_id FROM carts WHERE user_id = ${user_id})
            RETURNING *;
        `;

        if (result.length === 0) {
            return { success: false, message: "Item not found or not authorized to update" };
        }

        return { success: true, message: "Quantity updated successfully", data: result[0] };
    } catch (error) {
        console.error("Error QuantityChangeCartCustomer:", error);
        return { success: false, error: "Failed to update quantity", details: error.message };
    }
}

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
