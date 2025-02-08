import { GetProductAction } from "../../../../actions v1/v1/admin/products/ProductsActions";

export async function GET(req) {
    try {
        const url = new URL(req.url);
        const searchQuery = url.searchParams.get('search');
        const sort = url.searchParams.get('sort');
        const limit = parseInt(url.searchParams.get('limit')) || 10;
        const offset = parseInt(url.searchParams.get('offset')) || 0;

        const data = await GetProductAction({ searchQuery, sort, limit, offset });
        console.log("🚀 ~ GET ~ data:", data)

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