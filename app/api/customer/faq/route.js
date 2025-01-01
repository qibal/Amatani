import { GetFaqAction } from "@/app/api/server_actions/customer/faq/FaqActions";

// Endpoint: http://localhost:3000/api/customer/faq
export async function GET() {
    try {
        const data = await GetFaqAction();

        if (data && data.length > 0) {
            return new Response(JSON.stringify(data), {
                status: 200,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        } else {
            return new Response(JSON.stringify({ message: "No FAQs found" }), {
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
