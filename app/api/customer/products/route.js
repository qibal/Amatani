import { GetProductActionCustomers } from "../../server_actions/customer/products/ProductActions";





//   ]
export async function GET(request,) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    try {
        const data = await GetProductActionCustomers({ query });
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