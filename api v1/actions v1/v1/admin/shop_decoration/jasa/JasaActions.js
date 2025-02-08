import sql from "@/lib/postgres";
import { supabase } from "@/lib/supabase/client";
import { v4 as uuidv4 } from 'uuid';

export async function InsertJasaAction(jasaName, logo) {
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

        // Insert the image path and jasa name into the database
        const result = await sql`
            INSERT INTO lp_jasa (jasa_name, image_path)
            VALUES (${jasaName}, ${imagePath})
            RETURNING *;
        `;

        return result[0];
    } catch (error) {
        console.error('Error inserting jasa:', error);
        throw error;
    }
}

export async function GetJasaAction() {
    try {
        const result = await sql`
            SELECT * FROM lp_jasa;
        `;
        return result;
    } catch (error) {
        console.error('Error getting jasa:', error);
        throw error;
    }
}

export async function DeleteJasaAction(id) {
    try {
        // Get the image path from the database
        const [jasa] = await sql`
            SELECT image_path FROM lp_jasa
            WHERE id_jasa = ${id};
        `;

        if (!jasa) {
            throw new Error('Jasa not found');
        }

        // Extract the file name from the image path
        const fileName = jasa.image_path.split('/').pop();

        // Delete the image from Supabase storage
        const { error } = await supabase.storage
            .from('lp')
            .remove([fileName]);

        if (error) {
            throw new Error(`Failed to delete image: ${error.message}`);
        }

        // Delete the image path from the database
        const result = await sql`
            DELETE FROM lp_jasa
            WHERE id_jasa = ${id}
            RETURNING *;
        `;

        return result[0];
    } catch (error) {
        console.error('Error deleting jasa:', error);
        throw error;
    }
}