import { GetFaqForEditAction } from "@/api v1/actions v1/v1/admin/faq/FaqActions";

export async function GET(req, { params }) {
    console.log("🚀 ~ GET ~ params:", params.faq_id)

    try {
        const data = await GetFaqForEditAction(params.faq_id);
        if (data) {
            return new Response(JSON.stringify(data), {
                status: 200,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        } else {
            return new Response(JSON.stringify({ message: "FAQ not found" }), {
                status: 404,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        }
    } catch (error) {
        console.error('Error in GET /api/dashboard/faq/edit/[faq_id]:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
}

