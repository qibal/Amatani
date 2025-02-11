'use server'

import sql from "@/lib/postgres";
import { supabase } from "@/lib/supabase/client";
import { v4 as uuidv4 } from 'uuid';

export async function GetProductAction(req, { params }) {
    const url = new URL(req.url);
    const searchQuery = url.searchParams.get('search');
    const sort = url.searchParams.get('sort');
    const limit = parseInt(url.searchParams.get('limit')) || 10;
    const offset = parseInt(url.searchParams.get('offset')) || 0;

    const result = await sql.begin(async sql => {
        const products = await sql`
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
        ${searchQuery ? sql`WHERE p.products_name ILIKE ${'%' + searchQuery + '%'} 
            OR p.products_description ILIKE ${'%' + searchQuery + '%'} 
            OR c.categories_name ILIKE ${'%' + searchQuery + '%'}` : sql``}
        ${sort === 'A-Z' ? sql`ORDER BY p.products_name ASC` : sql``}
        ${sort === 'Z-A' ? sql`ORDER BY p.products_name DESC` : sql``}
        ${sort === 'Newest' ? sql`ORDER BY p.created_at DESC` : sql``}
        ${sort === 'Oldest' ? sql`ORDER BY p.created_at ASC` : sql``}
        LIMIT ${limit} OFFSET ${offset}
    `;

        console.log("Query result:", products);
        return products;
    });

    return result;
}

export async function GetProductByIdAction(req, { params }) {
    console.log(params);
    const data = await params.product_id

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

export async function DeleteProductAction(req, { params }) {
    const product_id = await params.product_id
    console.log("🚀 ~ DeleteProductAction ~ product_id:", product_id)
    try {
        const result = await sql.begin(async sql => {
            // 1. Get product info first
            const [product] = await sql`
                SELECT price_type FROM products WHERE product_id = ${product_id}
            `;

            if (!product) {
                throw new Error("Product not found");
            }

            // 2. Get and handle images
            const product_images = await sql`
                SELECT image_path FROM product_images WHERE product_id = ${product_id}
            `;

            // 3. Delete from storage if there are images
            if (product_images && product_images.length > 0) {
                const imagePaths = product_images.map(img => img.image_path.split('/').pop());
                console.log("Images to delete:", imagePaths);

                if (imagePaths.length > 0) {
                    const { error } = await supabase.storage
                        .from('product_images')
                        .remove(imagePaths);

                    if (error && error.message !== 'Not found') {
                        console.error('Error removing images:', error);
                        throw new Error(`Failed to remove images: ${error.message}`);
                    }
                }
            }

            // 4. Delete related data in correct order
            await sql`DELETE FROM product_images WHERE product_id = ${product_id}`;

            if (product.price_type === 'fixed') {
                await sql`DELETE FROM fixed_prices WHERE product_id = ${product_id}`;
            } else if (product.price_type === 'wholesale') {
                await sql`DELETE FROM wholesale_prices WHERE product_id = ${product_id}`;
            }

            // 5. Finally delete the product
            const [deletedProduct] = await sql`
                DELETE FROM products 
                WHERE product_id = ${product_id} 
                RETURNING *
            `;

            return deletedProduct;
        });

        return { result };
    } catch (error) {
        console.error('Error deleting product:', error);
        throw new Error(`Failed to delete product: ${error.message}`);
    }
}

export async function InsertProductAction(req, { params }) {
    const formData = await req.formData();
    const products_name = formData.get('products_name');
    const products_description = formData.get('products_description');
    const stock = formData.get('stock');
    const fixed_price = formData.get('fixed_price');
    const price_type = formData.get('price_type');
    const category = JSON.parse(formData.get('category') || '{}');
    const categories_id = category.categories_id;
    const categories_name = category.categories_name;
    const product_images = formData.getAll('product_images');
    const wholesalePrices = JSON.parse(formData.get('wholesalePrices') || 'null');

    try {
        // Validasi data
        if (!products_name) {
            throw new Error("Nama produk harus diisi.");
        }
        if (!products_description) {
            throw new Error("Deskripsi produk harus diisi.");
        }
        if (!stock) {
            throw new Error("Stok harus diisi.");
        }
        if (!categories_id) {
            throw new Error("Kategori harus diisi.");
        }
        if (!categories_name) {
            throw new Error("Nama Kategori harus diisi")
        }
        if (!price_type) {
            throw new Error("Tipe harga harus diisi.");
        }

        if (price_type === 'fixed' && !fixed_price) {
            throw new Error("Harga tetap harus diisi jika tipe harga adalah fixed.");
        }

        let product;
        const result = await sql.begin(async sql => {
            // Insert ke tabel products
            [product] = await sql`
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

            // Handle fixed price
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
            }

            // Handle wholesale prices
            if (price_type === 'wholesale' && wholesalePrices) {
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

            // Handle images
            if (product_images && product_images.length > 0) {
                for (const image of product_images) {
                    if (image && image.name) {
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
                }
            }

            return product;
        });

        return result;
    } catch (error) {
        console.error("Error inserting product:", error);
        return { error: error.message }; // Mengembalikan pesan error saja
    }
}



export async function UpdateProductAction(req, { params }) {
    const product_id = params.product_id;
    try {
        const formData = await req.formData();
        const products_name = formData.get('products_name');
        const products_description = formData.get('products_description');
        const stock = formData.get('stock');
        const price_type = formData.get('price_type');
        const fixed_price = formData.get('fixed_price');
        const category = JSON.parse(formData.get('category'));
        const wholesalePrices = JSON.parse(formData.get('wholesalePrices'));
        const product_images = formData.getAll('product_images');

        // Validasi data
        if (!products_name) {
            throw new Error("Nama produk harus diisi.");
        }
        if (!products_description) {
            throw new Error("Deskripsi produk harus diisi.");
        }
        if (!stock) {
            throw new Error("Stok harus diisi.");
        }
        if (!price_type) {
            throw new Error("Tipe harga harus diisi.");
        }
        if (!category || !category.categories_id) {
            throw new Error("Kategori harus diisi.");
        }

        if (price_type === 'fixed' && !fixed_price) {
            throw new Error("Harga tetap harus diisi jika tipe harga adalah fixed.");
        }

        const result = await sql.begin(async sql => {
            // Cek apakah produk ada
            const [existingProduct] = await sql`
                SELECT product_id FROM products WHERE product_id = ${product_id}
            `;

            if (!existingProduct) {
                throw new Error("Produk yang akan di update tidak ditemukan.");
            }

            // Update produk utama
            const [updatedProduct] = await sql`
                UPDATE products 
                SET 
                    products_name = ${products_name},
                    products_description = ${products_description},
                    stock = ${stock},
                    price_type = ${price_type},
                    categories_id = ${category.categories_id}
                WHERE product_id = ${product_id}
                RETURNING *
            `;

            if (!updatedProduct) {
                throw new Error("Gagal memperbarui produk.");
            }

            // Handle harga berdasarkan price_type
            if (price_type === 'fixed') {
                // Hapus harga grosir jika ada
                await sql`DELETE FROM wholesale_prices WHERE product_id = ${product_id}`;

                // Update atau insert harga tetap
                const [existingFixedPrice] = await sql`SELECT product_id FROM fixed_prices WHERE product_id = ${product_id}`;
                if (existingFixedPrice) {
                    await sql`
                        UPDATE fixed_prices SET price = ${fixed_price} WHERE product_id = ${product_id}
                    `;
                } else {
                    await sql`
                        INSERT INTO fixed_prices (product_id, price) VALUES (${product_id}, ${fixed_price})
                    `;
                }
            } else if (price_type === 'wholesale') {
                // Hapus harga tetap jika ada
                await sql`DELETE FROM fixed_prices WHERE product_id = ${product_id}`;

                // Hapus harga grosir yang lama
                await sql`DELETE FROM wholesale_prices WHERE product_id = ${product_id}`;

                // Insert harga grosir baru
                if (wholesalePrices && wholesalePrices.length > 0) {
                    for (const price of wholesalePrices) {
                        await sql`
                            INSERT INTO wholesale_prices (
                                product_id, 
                                min_quantity, 
                                max_quantity, 
                                price
                            ) VALUES (
                                ${product_id}, 
                                ${price.min_quantity}, 
                                ${price.max_quantity}, 
                                ${price.price}
                            )
                        `;
                    }
                }
            }
            // Handle images
            if (product_images && product_images.length > 0) {
                // Get existing images
                const existingImages = await sql`
                    SELECT image_path FROM product_images WHERE product_id = ${product_id}
                `;

                // Delete existing images from storage
                if (existingImages && existingImages.length > 0) {
                    const imagePaths = existingImages.map(img => img.image_path.split('/').pop());
                    if (imagePaths.length > 0) {
                        const { error } = await supabase.storage
                            .from('product_images')
                            .remove(imagePaths);

                        if (error && error.message !== 'Not found') {
                            console.error('Error removing images:', error);
                            throw new Error(`Failed to remove images: ${error.message}`);
                        }
                    }
                    // Delete existing images from database
                    await sql`DELETE FROM product_images WHERE product_id = ${product_id}`;
                }
                for (const image of product_images) {
                    if (image && image.name) {
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
                            )
                        `;
                    }
                }
            }

            // Ambil data produk yang sudah diupdate
            const [result] = await sql`
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
                    ) AS images
                FROM 
                    products p
                LEFT JOIN 
                    fixed_prices f ON p.product_id = f.product_id AND p.price_type = 'fixed'
                LEFT JOIN 
                    categories c ON p.categories_id = c.categories_id
                WHERE p.product_id = ${product_id};
            `;

            return result;
        });

        return result;
    } catch (error) {
        console.error('Error updating product:', error);
        return { success: false, error: error.message };
    }
}
