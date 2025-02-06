import sql from "@/lib/postgres";
import { supabase } from "@/lib/supabase/client";
import { v4 as uuidv4 } from 'uuid';

export async function InsertCompanyLogoAction(logo) {
    try {
        // Generate a unique filename using UUID
        const fileName = `${uuidv4()}.${logo.name.split('.').pop()}`;

        // Convert the file to a ReadableStream
        const stream = logo.stream();

        // Upload the file to Supabase storage
        const { data, error } = await supabase.storage
            .from('lp')
            .upload(fileName, stream, {
                contentType: logo.type,
                duplex: 'half',
            });

        if (error) {
            throw new Error(`Failed to upload image: ${error.message}`);
        }

        const imagePath = `lp/${fileName}`;

        // Insert the image path into the database
        const result = await sql`
            INSERT INTO lp_company_logos (image_path)
            VALUES (${imagePath})
            RETURNING *;
        `;

        return result[0];
    } catch (error) {
        console.error('Error inserting company logo:', error);
        throw error;
    }
}

export async function GetCompanyLogosAction() {
    try {
        const result = await sql`
            SELECT * FROM lp_company_logos;
        `;
        return result;
    } catch (error) {
        console.error('Error getting company logos:', error);
        throw error;
    }
}

export async function DeleteCompanyLogoAction(id) {
    try {
        // Get the image path from the database
        const [logo] = await sql`
            SELECT image_path FROM lp_company_logos
            WHERE id = ${id};
        `;

        if (!logo) {
            throw new Error('Logo not found');
        }

        // Extract the file name from the image path
        const fileName = logo.image_path.split('/').pop();

        // Delete the image from Supabase storage
        const { error } = await supabase.storage
            .from('lp')
            .remove([fileName]);

        if (error) {
            throw new Error(`Failed to delete image: ${error.message}`);
        }

        // Delete the image path from the database
        const result = await sql`
            DELETE FROM lp_company_logos
            WHERE id = ${id}
            RETURNING *;
        `;

        return result[0];
    } catch (error) {
        console.error('Error deleting company logo:', error);
        throw error;
    }
}