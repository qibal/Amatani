import { QuantityChangeCartCustomer } from "@/api v1/actions v1/v1/public/cart/CartActions";

export async function POST(request) {
    const { cart_items_id, quantity, user_id } = await request.json();

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