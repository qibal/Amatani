import { GetForEditProductAction } from "@/app/api/server_actions/dashboard/products/ProductsActions";

// http://localhost:3000/api/dashboard/products/edit/5735d9b9-18cf-4bf8-9fb1-533e56d491c6
export async function GET(req, props) {
    const params = await props.params;
    try {
        const data = await GetForEditProductAction(await params.product_id);
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
