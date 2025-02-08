//untuk delete route api by id
import { DeleteServiceAction } from "@/app/actions/v2/dashboard/admin/sd/serviceActions";

export async function DELETE(req, { params }) {
    try {
        const { service_id } = params;
        const { success, data, error, message } = await DeleteServiceAction(service_id);

        if (success) {
            return new Response(JSON.stringify({ success: true, data }), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        } else {
            console.error("DELETE services failed:", error);
            const status = message === "Service not found" ? 404 : 500;
            return new Response(
                JSON.stringify({ success: false, error: error || message }),
                {
                    status: status,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }
    } catch (error) {
        console.error("Error in DELETE request:", error);
        return new Response(
            JSON.stringify({ success: false, error: error.message }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}