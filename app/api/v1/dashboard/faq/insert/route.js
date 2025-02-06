import { InsertFaqAction } from "@/app/actions/v1/admin/faq/FaqActions";

export async function POST(req) {
    try {
        const formData = await req.formData();
        const title = formData.get('title');
        console.log("🚀 ~ POST ~ title:", title)
        const content = formData.get('content');
        console.log("🚀 ~ POST ~ content:", content)
        const category_id = formData.get('category_id');
        console.log("🚀 ~ POST ~ category_id:", category_id)

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