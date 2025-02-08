import {
    GetFoodCategoriesAction,
    InsertFoodCategoriesAction
} from "@/app/actions/v2/dashboard/admin/sd/foodCategories";

export async function GET(req, { params }) {
    try {
        const { success, data, error } = await GetFoodCategoriesAction();

        if (success) {
            return new Response(JSON.stringify({ success: true, data }), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        } else {
            console.error("GET food categories failed:", error);
            return new Response(JSON.stringify({ success: false, error }), {
                status: 500,
                headers: { "Content-Type": "application/json" },
            });
        }
    } catch (error) {
        console.error("Error in GET request:", error);
        return new Response(
            JSON.stringify({ success: false, error: error.message }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}

export async function POST(req, { params }) {
    try {
        const formData = await req.formData();
        const categories_id = formData.get("categories_id");
        const category_image = formData.get("category_image");

        if (!categories_id || !category_image) {
            return new Response(
                JSON.stringify({ success: false, error: "Category ID and category image are required" }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        const { success, data, error } = await InsertFoodCategoriesAction(categories_id, category_image);

        if (success) {
            return new Response(JSON.stringify({ success: true, data }), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        } else {
            console.error("POST food categories failed:", error);
            return new Response(JSON.stringify({ success: false, error }), {
                status: 500,
                headers: { "Content-Type": "application/json" },
            });
        }
    } catch (error) {
        console.error("Error in POST request:", error);
        return new Response(
            JSON.stringify({ success: false, error: error.message }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}