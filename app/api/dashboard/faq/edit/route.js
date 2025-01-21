import { UpdateFaqAction } from "@/app/api/server_actions/dashboard/faq/FaqActions";

export async function POST(req, { params }) {
    try {
        const formData = await req.formData();
        const faq_id = formData.get('faq_id');
        console.log("🚀 ~ POST ~ faq_id:", faq_id)
        const title = formData.get('title');
        console.log("🚀 ~ POST ~ title:", title)
        const content = formData.get('content');
        console.log("🚀 ~ POST ~ content:", content)
        const category_id = formData.get('category_id');
        console.log("🚀 ~ POST ~ category_id:", category_id)
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