import sql from "@/lib/postgres";
import { supabase } from "@/lib/supabase/client";
import { v4 as uuidv4 } from 'uuid';

export async function GetServiceAction() {
    try {
        const services = await sql`SELECT * FROM lp_service`;
        return { success: true, data: services };
    } catch (error) {
        console.error("Error fetching services:", error);
        return { success: false, error: "Failed to fetch services" };
    }
}

export async function InsertServiceAction(serviceName, image) {
    try {
        if (!serviceName || !image) {
            throw new Error("Service name and image are required");
        }

        // Generate a unique filename using UUID
        const fileName = `${uuidv4()}.${image.name.split('.').pop()}`;

        // Convert the file to a ReadableStream
        const stream = image.stream();

        // Upload the file to Supabase storage
        const { data, error } = await supabase.storage
            .from('lp')
            .upload(fileName, stream, {
                contentType: image.type,
                duplex: 'half',
            });

        if (error) {
            throw new Error(`Failed to upload image: ${error.message}`);
        }

        const imagePath = `lp/${fileName}`;

        // Insert the image path and service name into the database
        const [result] = await sql`
            INSERT INTO lp_service (service_name, image_path)
            VALUES (${serviceName}, ${imagePath})
            RETURNING *;
        `;

        return { success: true, data: result };
    } catch (error) {
        console.error('Error inserting service:', error);
        return { success: false, error: error.message };
    }
}

export async function DeleteServiceAction(service_id) {
    try {
        if (!service_id) {
            throw new Error("Service ID is required");
        }

        // Get the image path from the database
        const [service] = await sql`
            SELECT image_path FROM lp_service
            WHERE service_id = ${service_id};
        `;

        if (!service) {
            throw new Error('Service not found');
        }

        // Extract the file name from the image path
        const fileName = service.image_path.split('/').pop();

        // Delete the image from Supabase storage
        const { error } = await supabase.storage
            .from('lp')
            .remove([fileName]);

        if (error) {
            throw new Error(`Failed to delete image: ${error.message}`);
        }

        // Delete the service from the database
        const result = await sql`
            DELETE FROM lp_service
            WHERE service_id = ${service_id}
            RETURNING *;
        `;

        return { success: true, data: result };
    } catch (error) {
        console.error('Error deleting service:', error);
        return { success: false, error: error.message };
    }
}