import { DeleteFoodCategoriesAction } from "@/app/actions/v2/dashboard/admin/sd/foodCategories";

export async function DELETE(req, { params }) {
    try {
        const { fc_id } = params;
        const { success, data, error, message } = await DeleteFoodCategoriesAction(fc_id);

        if (success) {
            return new Response(JSON.stringify({ success: true, data }), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        } else {
            console.error("DELETE food categories failed:", error);
            const status = message === "Food category not found" ? 404 : 500;
            return new Response(
                JSON.stringify({ success: false, error: error || message }),
                {
                    status: status,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }
    } catch (error) {
        console.error("Error in DELETE request:", error);
        return new Response(
            JSON.stringify({ success: false, error: error.message }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}