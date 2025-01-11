import { GetFaqAction, UpdateFaqAction } from "@/app/api/server_actions/dashboard/faq/FaqActions";

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
        console.error('Error in GET /api/dashboard/faq:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
}

export async function POST(req) {
    try {
        const formData = await req.formData();
        const faq_id = formData.get('faq_id');
        const title = formData.get('title');
        const content = formData.get('content');
        const category_id = formData.get('category_id');

        if (!faq_id || !title || !content || !category_id) {
            return new Response(JSON.stringify({ message: "Missing required fields" }), {
                status: 400,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        }

        const data = await UpdateFaqAction(faq_id, title, content, category_id);
        if (data) {
            return new Response(JSON.stringify(data), {
                status: 200,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        } else {
            return new Response(JSON.stringify({ message: "Failed to update FAQ" }), {
                status: 400,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        }
    } catch (error) {
        console.error('Error in POST /api/dashboard/faq:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
}

