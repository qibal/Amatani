import { DeleteFaqAction } from "@/app/api/server_actions/dashboard/faq/FaqActions";

export async function DELETE(req, { params }) {
    const faq_id = await params.faq_id
    try {
        const data = await DeleteFaqAction(faq_id);
        if (data) {
            return new Response(JSON.stringify(data), {
                status: 200,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        } else {
            return new Response(JSON.stringify({ message: "No data found" }), {
                status: 404,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        }
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
}