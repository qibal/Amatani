import sql from "@/lib/postgres";
import { supabase } from "@/lib/supabase/client";
import { v4 as uuidv4 } from 'uuid';

export async function GetProductAction({ searchQuery, sort, limit, offset } = {}) {
    const result = await sql.begin(async sql => {
        const products = await sql`
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
        ${searchQuery ? sql`WHERE p.products_name ILIKE ${'%' + searchQuery + '%'} 
            OR p.products_description ILIKE ${'%' + searchQuery + '%'} 
            OR c.categories_name ILIKE ${'%' + searchQuery + '%'}` : sql``}
        ${sort === 'A-Z' ? sql`ORDER BY p.products_name ASC` : sql``}
        ${sort === 'Z-A' ? sql`ORDER BY p.products_name DESC` : sql``}
        ${sort === 'Newest' ? sql`ORDER BY p.created_at DESC` : sql``}
        ${sort === 'Oldest' ? sql`ORDER BY p.created_at ASC` : sql``}
        LIMIT ${limit} OFFSET ${offset}
    `;

        return products;
    });

    return result;
}

export async function DeleteProductAction(params) {
    const productId = params.product_id;

    try {
        const result = await sql.begin(async sql => {
            const [product] = await sql`
                SELECT price_type FROM products WHERE product_id = ${productId}
            `;

            if (!product) {
                throw new Error("Product not found");
            }

            const product_images = await sql`
                SELECT image_path FROM product_images WHERE product_id = ${productId}
            `;

            let fixed_products = null;
            let whole_sales = null;
            if (product.price_type === 'fixed') {
                [fixed_products] = await sql`DELETE FROM fixed_prices WHERE product_id = ${productId} RETURNING *`;
            } else if (product.price_type === 'wholesale') {
                [whole_sales] = await sql`DELETE FROM wholesale_prices WHERE product_id = ${productId} RETURNING *`;
            }

            const imagePaths = product_images.map(img => img.image_path.split('/').pop());
            console.log("🚀 ~ result ~  imagePaths:", imagePaths);

            const { error } = await supabase.storage.from('product_images').remove(imagePaths);
            if (error) {
                console.error('Error removing images:', error.message);
                console.error('Error details:', error);
                throw new Error(`Failed to remove images: ${error.message}`);
            }

            const [del_product_images] = await sql`DELETE FROM product_images WHERE product_id = ${productId} RETURNING *`;

            const [deletedProduct] = await sql`
                DELETE FROM products WHERE product_id = ${productId}
                RETURNING *;
            `;

            return { deletedProduct, fixed_products, whole_sales, product_images, del_product_images };
        });

        return result;
    } catch (error) {
        console.log('catch', error);
    }
}

export async function InsertProductAction(req) {
    const formData = await req.formData();
    const products_name = formData.get('products_name');
    const products_description = formData.get('products_description');
    const stock = formData.get('stock');
    const fixed_price = formData.get('fixed_price');
    const price_type = formData.get('price_type');
    const category = JSON.parse(formData.get('category'));
    const categories_id = category.categories_id;
    const product_images = formData.getAll('product_images');
    const wholesalePrices = JSON.parse(formData.get('wholesalePrices'));

    const maxRetries = 3;
    let attempt = 0;
    let result;

    while (attempt < maxRetries) {
        try {
            result = await sql.begin(async sql => {
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

                if (price_type === 'fixed') {
                    await sql`
                        INSERT INTO fixed_prices (
                            product_id, 
                            price
                        ) VALUES (
                            ${product.product_id}, 
                            ${fixed_price}
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

                for (const image of product_images) {
                    const fileName = `${uuidv4()}.${image.name.split('.').pop()}`;
                    const { error } = await supabase.storage.from('product_images').upload(fileName, image);

                    if (error) {
                        throw new Error(`Failed to upload image: ${error.message}`);
                    }

                    const imagePath = `product_images/${fileName}`;
                    await sql`
                        INSERT INTO product_images (
                            product_id, 
                            image_path
                        ) VALUES (
                            ${product.product_id}, 
                            ${imagePath}
                        );
                    `;
                }

                return product;
            });

            return result;
        } catch (error) {
            console.error(`Attempt ${attempt + 1}: ${error.message}`);
            attempt++;
        }
    }

    throw new Error("Failed to insert product after multiple attempts");
}

export async function GetForEditProductAction(params) {
    const result = await sql.begin(async sql => {
        const products = await sql`
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
        WHERE p.product_id = ${params};
        `;

        return products;
    });

    return result;
}

export async function UpdateProductAction(req) {
    const formData = await req.formData();
    const product_id = formData.get('product_id');
    console.log("🚀 ~ UpdateProductAction server actions ~ product_id:", product_id)
    const products_name = formData.get('products_name');
    const products_description = formData.get('products_description');
    const stock = formData.get('stock');
    const fixed_price = formData.get('fixed_price');
    const price_type = formData.get('price_type');
    const category = JSON.parse(formData.get('category'));
    const categories_id = category.categories_id;
    const product_images = formData.getAll('product_images');
    const wholesalePrices = JSON.parse(formData.get('wholesalePrices'));

    try {
        const result = await sql.begin(async sql => {
            const [product] = await sql`
                UPDATE products
                SET 
                    products_name = ${products_name}, 
                    products_description = ${products_description}, 
                    stock = ${stock}, 
                    categories_id = ${categories_id}, 
                    price_type = ${price_type}
                WHERE product_id = ${product_id}
                RETURNING *;
            `;

            if (price_type === 'fixed') {
                await sql`
                    DELETE FROM wholesale_prices
                    WHERE product_id = ${product_id};
                `;
                await sql`
                    INSERT INTO fixed_prices (
                        product_id, 
                        price
                    ) VALUES (
                        ${product_id}, 
                        ${fixed_price}
                    )
                    ON CONFLICT (product_id) 
                    DO UPDATE SET 
                        price = ${fixed_price};
                `;
            } else if (price_type === 'wholesale') {
                await sql`
                    DELETE FROM wholesale_prices
                    WHERE product_id = ${product_id};
                `;
                for (const wholesalePrice of wholesalePrices) {
                    await sql`
                        INSERT INTO wholesale_prices (
                            product_id, 
                            min_quantity, 
                            max_quantity, 
                            price
                        ) VALUES (
                            ${product_id}, 
                            ${wholesalePrice.min_quantity}, 
                            ${wholesalePrice.max_quantity}, 
                            ${wholesalePrice.price}
                        );
                    `;
                }
            }

            for (const image of product_images) {
                if (typeof image === 'string') {
                    continue;
                }
                const fileName = `${uuidv4()}.${image.name.split('.').pop()}`;
                const { error } = await supabase.storage.from('product_images').upload(fileName, image);

                if (error) {
                    throw new Error(`Failed to upload image: ${error.message}`);
                }

                const imagePath = `product_images/${fileName}`;
                await sql`
                    INSERT INTO product_images (
                        product_id, 
                        image_path
                    ) VALUES (
                        ${product_id}, 
                        ${imagePath}
                    );
                `;
            }

            return product;
        });

        return result;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
}
