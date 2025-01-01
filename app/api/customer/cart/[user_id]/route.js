import { GetCountCarttCustomers } from "@/app/api/server_actions/customer/cart/CartActions";




// http://localhost:3000/api/customer/cart/ea1975e8-e225-4988-9c31-e4e1d8d11693
export async function GET(request, { params }) {
    const user_id = await params.user_id
    console.log("🚀 ~ GET ~ user_id:", await user_id)
    try {
        const data = await GetCountCarttCustomers({ user_id });
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