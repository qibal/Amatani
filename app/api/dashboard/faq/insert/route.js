import { InsertFaqAction } from "@/app/api/server_actions/dashboard/faq/FaqActions";

export async function POST(req) {
    try {
        const formData = await req.formData();
        const title = formData.get('title');
        const content = formData.get('content');
        const category_id = formData.get('category_id');

        if (!title || !content || !category_id) {
            return new Response(JSON.stringify({ error: "Missing required fields" }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        const data = await InsertFaqAction(title, content, category_id);
        if (data) {
            return new Response(JSON.stringify(data), {
                status: 200,
                headers: { "Content-Type": "application/json" }
            });
        } else {
            return new Response(JSON.stringify({ message: "Failed to insert FAQ" }), {
                status: 500,
                headers: { "Content-Type": "application/json" }
            });
        }
    } catch (error) {
        console.error('Error in FAQ insertion route:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}