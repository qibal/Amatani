import { GetCategoriesFaqAction } from "@/api v1/actions v1/v1/admin/faq/categories/CategoriesFaqActions";


export async function GET() {
    try {
        const data = await GetCategoriesFaqAction()
        if (data) {
            return new Response(JSON.stringify(data), {
                status: 200,
                headers: {
                    "Content-Type": "application/json"
                }
            })
        } else {
            return new Response(JSON.stringify({ message: "No data found" }), {
                status: 404,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        }
    } catch (error) {
        console.log("🚀 ~ GET ~ error:", error)
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

}