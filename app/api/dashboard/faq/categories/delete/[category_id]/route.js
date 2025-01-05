import { DeleteCategoriesFaqAction } from "@/app/api/server_actions/dashboard/faq/categories/CategoriesFaqActions";

export async function DELETE(req, props) {
    const params = await props.params;
    const category_id = await params.category_id
    try {
        const data = await DeleteCategoriesFaqAction(category_id);
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