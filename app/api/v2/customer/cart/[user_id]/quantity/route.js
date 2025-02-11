import { QuantityChangeCartCustomer } from "@/app/actions/v2/customer/cartActions";

export async function POST(request, { params }) {
    const { cart_items_id, quantity } = await request.json();
    const user_id = await params.user_id;
    try {
        const data = await QuantityChangeCartCustomer({ cart_items_id, quantity, user_id });
        if (data.success) {
            return new Response(JSON.stringify(data), {
                status: 200,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        } else {
            return new Response(JSON.stringify({ message: data.message }), {
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