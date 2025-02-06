import sql from "@/lib/postgres";
import { supabase } from "@/lib/supabase/client";
import { v4 as uuidv4 } from 'uuid';

export async function InsertKategoriPanganAction(categoryId, categoryImage) {
    try {
        // Generate a unique filename using UUID
        const fileName = `${uuidv4()}.${categoryImage.name.split('.').pop()}`;

        // Convert the file to a ReadableStream
        const stream = categoryImage.stream();

        // Upload the file to Supabase storage
        const { data, error } = await supabase.storage
            .from('lp')
            .upload(fileName, stream, {
                contentType: categoryImage.type,
                duplex: 'half',
            });

        if (error) {
            throw new Error(`Failed to upload image: ${error.message}`);
        }

        const imagePath = `lp/${fileName}`;

        // Insert the image path and category id into the database
        const result = await sql`
            INSERT INTO lp_categories_pangan (categories_id, image_path)
            VALUES (${categoryId}, ${imagePath})
            RETURNING *;
        `;

        return result[0];
    } catch (error) {
        console.error('Error inserting category:', error);
        throw error;
    }
}

export async function GetKategoriPanganAction() {
    try {
        const result = await sql`
            SELECT lp_categories_pangan.*, categories.categories_name
            FROM lp_categories_pangan
            JOIN categories ON lp_categories_pangan.categories_id = categories.categories_id;
        `;
        return result;
    } catch (error) {
        console.error('Error getting categories:', error);
        throw error;
    }
}

export async function DeleteKategoriPanganAction(id) {
    try {
        // Get the image path from the database
        const [category] = await sql`
            SELECT image_path FROM lp_categories_pangan
            WHERE id_categories_pangan = ${id};
        `;

        if (!category) {
            throw new Error('Category not found');
        }

        // Extract the file name from the image path
        const fileName = category.image_path.split('/').pop();

        // Delete the image from Supabase storage
        const { error } = await supabase.storage
            .from('lp')
            .remove([fileName]);

        if (error) {
            throw new Error(`Failed to delete image: ${error.message}`);
        }

        // Delete the image path from the database
        const result = await sql`
            DELETE FROM lp_categories_pangan
            WHERE id_categories_pangan = ${id}
            RETURNING *;
        `;

        return result[0];
    } catch (error) {
        console.error('Error deleting category:', error);
        throw error;
    }
}