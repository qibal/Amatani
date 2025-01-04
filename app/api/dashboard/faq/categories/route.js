import { GetCategoriesFaqAction } from "@/app/api/server_actions/dashboard/faq/categories/CategoriesFaqActions";


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
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

}