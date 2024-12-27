import sql from "@/lib/postgres";



// http://localhost:3000/api/dashboard/products
export async function GetProductAction() {
    // Query untuk mendapatkan semua data produk beserta harga tetap, harga grosir, dan gambar produk
    const result = await sql`
        SELECT 
            p.product_id,
            p.products_name,
            p.products_description,
            p.stock,
            p.categories_id,
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
            fixed_prices f ON p.product_id = f.product_id AND p.price_type = 'fixed';
    `;

    // Mengembalikan hasil query
    return result;
}




// path terakhir nu id acak etateh id productna
// http://localhost:3000/api/dashboard/products/delete/c1aefa4b-7feb-4d2e-ad97-e3a396145c87
//query untuk HAPUS  produk
export async function DeleteProductAction(productId) {
    const result = await sql.begin(async sql => {
        // Get price type
        const [product] = await sql`
            SELECT price_type FROM products WHERE product_id = ${productId}
        `;

        if (!product) {
            throw new Error("Product not found");
        }

        // Delete related data based on price type
        let fixed_products = null;
        let whole_sales = null;
        if (product.price_type === 'fixed') {
            [fixed_products] = await sql`DELETE FROM fixed_prices WHERE product_id = ${productId} RETURNING *`;
        } else if (product.price_type === 'wholesale') {
            [whole_sales] = await sql`DELETE FROM wholesale_prices WHERE product_id = ${productId} RETURNING *`;
        }

        // Delete product images
        const product_images = await sql`DELETE FROM product_images WHERE product_id = ${productId} RETURNING *`;

        // Delete product and return the deleted product
        const [deletedProduct] = await sql`
            DELETE FROM products WHERE product_id = ${productId}
            RETURNING *;
        `;

        return { deletedProduct, fixed_products, whole_sales, product_images };
    });

    return result;
}



export async function InsertProductAction(params) {
    const {
        products_name,
        products_description,
        stock,
        categories_id,
        price_type,
        price,
        wholesalePrices,
        images
    } = params;

    const result = await sql.begin(async sql => {
        // Insert into products table
        const [product] = await sql`
            INSERT INTO products (
                products_name, 
                products_description, 
                stock, 
                categories_id, 
                price_type
            ) VALUES (
                ${products_name}, 
                ${products_description}, 
                ${stock}, 
                ${categories_id}, 
                ${price_type}
            )
            RETURNING *;
        `;

        // Insert into fixed_prices or wholesale_prices based on price_type
        if (price_type === 'fixed') {
            await sql`
                INSERT INTO fixed_prices (
                    product_id, 
                    price
                ) VALUES (
                    ${product.product_id}, 
                    ${price}
                );
            `;
        } else if (price_type === 'wholesale') {
            for (const wholesalePrice of wholesalePrices) {
                await sql`
                    INSERT INTO wholesale_prices (
                        product_id, 
                        min_quantity, 
                        max_quantity, 
                        price
                    ) VALUES (
                        ${product.product_id}, 
                        ${wholesalePrice.min_quantity}, 
                        ${wholesalePrice.max_quantity}, 
                        ${wholesalePrice.price}
                    );
                `;
            }
        }

        // Insert into product_images table
        for (const image of images) {
            await sql`
                INSERT INTO product_images (
                    product_id, 
                    image_path
                ) VALUES (
                    ${product.product_id}, 
                    ${image}
                );
            `;
        }

        return product;
    });

    return result;
}





export async function UpdateProductAction(productId, params) {
    const {
        products_name,
        products_description,
        stock,
        categories_id,
        price_type,
        price,
        wholesalePrices,
        images
    } = params;

    const result = await sql.begin(async sql => {
        // Update products table
        const [product] = await sql`
            UPDATE products SET
                products_name = ${products_name}, 
                products_description = ${products_description}, 
                stock = ${stock}, 
                categories_id = ${categories_id}, 
                price_type = ${price_type}
            WHERE product_id = ${productId}
            RETURNING *;
        `;

        // Update fixed_prices or wholesale_prices based on price_type
        if (price_type === 'fixed') {
            await sql`
                DELETE FROM wholesale_prices WHERE product_id = ${productId};
            `;
            await sql`
                INSERT INTO fixed_prices (
                    product_id, 
                    price
                ) VALUES (
                    ${product.product_id}, 
                    ${price}
                )
                ON CONFLICT (product_id) DO UPDATE SET
                    price = ${price};
            `;
        } else if (price_type === 'wholesale') {
            await sql`
                DELETE FROM fixed_prices WHERE product_id = ${productId};
            `;
            await sql`
                DELETE FROM wholesale_prices WHERE product_id = ${productId};
            `;
            for (const wholesalePrice of wholesalePrices) {
                await sql`
                    INSERT INTO wholesale_prices (
                        product_id, 
                        min_quantity, 
                        max_quantity, 
                        price
                    ) VALUES (
                        ${product.product_id}, 
                        ${wholesalePrice.min_quantity}, 
                        ${wholesalePrice.max_quantity}, 
                        ${wholesalePrice.price}
                    );
                `;
            }
        }

        // Update product_images table
        await sql`
            DELETE FROM product_images WHERE product_id = ${productId};
        `;
        for (const image of images) {
            await sql`
                INSERT INTO product_images (
                    product_id, 
                    image_path
                ) VALUES (
                    ${product.product_id}, 
                    ${image}
                );
            `;
        }

        return product;
    });

    return result;
}

