import sql from "@/lib/postgres";
import { supabase } from "@/lib/supabase/client";
import { v4 as uuidv4 } from 'uuid';

export async function GetFoodCategoriesAction() {
    try {
        const result = await sql`
            SELECT lp_food_categories.*, categories.categories_name
            FROM lp_food_categories
            JOIN categories ON lp_food_categories.categories_id = categories.categories_id;
        `;
        return { success: true, data: result };
    } catch (error) {
        console.error('Error getting food categories:', error);
        return { success: false, error: error.message };
    }
}
export async function InsertFoodCategoriesAction(categories_id, category_image) {
    try {
        if (!categories_id || !category_image) {
            throw new Error("Category ID and category image are required");
        }

        // Generate a unique filename using UUID
        const fileName = `${uuidv4()}.${category_image.name.split('.').pop()}`;

        // Convert the file to a ReadableStream
        const stream = category_image.stream();

        // Upload the file to Supabase storage
        const { data, error } = await supabase.storage
            .from('lp')
            .upload(fileName, stream, {
                contentType: category_image.type,
                duplex: 'half',
            });

        if (error) {
            throw new Error(`Failed to upload image: ${error.message}`);
        }

        const imagePath = `lp/${fileName}`;

        // Insert the image path and category id into the database
        const [result] = await sql`
            INSERT INTO lp_food_categories (categories_id, image_path)
            VALUES (${categories_id}, ${imagePath})
            RETURNING *;
        `;

        return { success: true, data: result };
    } catch (error) {
        console.error('Error inserting food category:', error);
        return { success: false, error: error.message };
    }
}
export async function DeleteFoodCategoriesAction(fc_id) {
    try {
        if (!fc_id) {
            throw new Error("Food category ID is required");
        }

        // Get the image path from the database
        const [category] = await sql`
            SELECT image_path FROM lp_food_categories
            WHERE food_categories_id = ${fc_id};
        `;

        if (!category) {
            throw new Error('Food category not found');
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
            DELETE FROM lp_food_categories
            WHERE food_categories_id = ${fc_id}
            RETURNING *;
        `;

        return { success: true, data: result };
    } catch (error) {
        console.error('Error deleting food category:', error);
        return { success: false, error: error.message };
    }
}