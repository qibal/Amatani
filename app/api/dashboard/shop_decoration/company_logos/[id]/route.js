//delete data gambar di storage dan di tabel
import { DeleteCompanyLogoAction } from "@/app/api/server_actions/dashboard/shop_decoration/company_logos/CL_actions";

export async function DELETE(req, { params }) {
    try {
        const { id } = params;

        if (!id) {
            return new Response(JSON.stringify({ error: "Missing required fields" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const data = await DeleteCompanyLogoAction(id);
        if (data) {
            return new Response(JSON.stringify(data), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        } else {
            return new Response(JSON.stringify({ message: "Failed to delete company logo" }), {
                status: 500,
                headers: { "Content-Type": "application/json" },
            });
        }
    } catch (error) {
        console.error('Error in company logo deletion route:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}