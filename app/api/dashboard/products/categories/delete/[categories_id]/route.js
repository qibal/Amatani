import { DeleteCategoriesAction } from "@/app/api/server_actions/dashboard/products/categories/CategoriesActions";

export async function DELETE(req, { params }) {
    const categories_id = await params.categories_id
    try {
        const data = await DeleteCategoriesAction(categories_id);
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