import { InsertCategoriesFaqAction } from "@/api v1/actions v1/v1/admin/faq/categories/CategoriesFaqActions";


export async function POST(req) {
    try {
        const formData = await req.formData();
        const name = formData.get('name');

        if (!name) {
            return new Response(JSON.stringify({ error: "Name is required" }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        const data = await InsertCategoriesFaqAction(name);
        if (data && data.length > 0) {
            return new Response(JSON.stringify(data[0]), {
                status: 200,
                headers: { "Content-Type": "application/json" }
            });
        } else {
            return new Response(JSON.stringify({ message: "Failed to insert category" }), {
                status: 500,
                headers: { "Content-Type": "application/json" }
            });
        }
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}