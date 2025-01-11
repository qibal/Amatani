import { UpdateFaqAction } from "@/app/api/server_actions/dashboard/faq/FaqActions";

export async function POST(req) {
    try {
        const formData = await req.formData();
        const faq_id = formData.get('faq_id');
        const title = formData.get('title');
        const content = formData.get('content');
        const category_id = formData.get('category_id');

        // Input validation
        if (!faq_id || !title || !content || !category_id) {
            console.error('Missing required fields:', { faq_id, title, content, category_id });
            return new Response(JSON.stringify({ message: "Missing required fields" }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        const data = await UpdateFaqAction(faq_id, title, content, category_id);
        if (data) {
            console.log('FAQ updated successfully:', data);
            return new Response(JSON.stringify(data), {
                status: 200,
                headers: { "Content-Type": "application/json" }
            });
        } else {
            console.error('Failed to update FAQ:', { faq_id, title, content, category_id });
            return new Response(JSON.stringify({ message: "Failed to update FAQ" }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }
    } catch (error) {
        console.error('Error in POST /api/dashboard/faq/edit:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}

