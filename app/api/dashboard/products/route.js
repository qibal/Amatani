import { GetCategories } from "../../server_actions/dashboard/products/categories/CategoriesActions"

export async function GET() {
    try {
        const data = await GetCategories()
        if (data) {
            return new Response(JSON.stringify(data), {
                status: 200,
                headers: {
                    "Content-Type": "application/json"
                }
            })
        }
        return null
    } catch (error) {

    }

}
