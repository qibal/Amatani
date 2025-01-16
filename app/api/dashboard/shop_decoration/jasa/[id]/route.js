import { DeleteJasaAction } from "@/app/api/server_actions/dashboard/shop_decoration/jasa/JasaActions";

export async function DELETE(req, { params }) {
    try {
        const { id } = params;

        if (!id) {
            return new Response(JSON.stringify({ error: "Missing required fields" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const data = await DeleteJasaAction(id);
        if (data) {
            return new Response(JSON.stringify(data), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        } else {
            return new Response(JSON.stringify({ message: "Failed to delete jasa" }), {
                status: 500,
                headers: { "Content-Type": "application/json" },
            });
        }
    } catch (error) {
        console.error('Error in jasa deletion route:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}