import { DeleteCategoryAction } from "@/app/actions/v2/dashboard/admin/products/categoriesActions";

export async function DELETE(req, { params }) {
    try {
        const { categories_id } = await params;
        const { success, data, error, message } = await DeleteCategoryAction(categories_id);

        if (success) {
            return new Response(JSON.stringify({ success: true, data }), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        } else {
            console.error("DELETE categories failed:", error);
            const status = message === "Category not found" ? 404 : 500;
            return new Response(JSON.stringify({ success: false, error: error || message }), {
                status: status,
                headers: { "Content-Type": "application/json" },
            });
        }
    } catch (error) {
        console.error("Error in DELETE request:", error);
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}