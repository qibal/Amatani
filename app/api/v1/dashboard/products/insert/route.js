import { InsertProductAction } from "@/app/actions/v1/admin/products/ProductsActions";

export async function POST(req) {
    const maxRetries = 3;
    let attempt = 0;
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    while (attempt < maxRetries) {
        try {
            const data = await InsertProductAction(req);
            if (data) {
                return new Response(JSON.stringify({ success: true, data }), {
                    status: 200,
                    headers: { "Content-Type": "application/json" }
                });
            }
            throw new Error("No data returned from insert action");
        } catch (error) {
            attempt++;
            console.error(`Attempt ${attempt}:`, error);

            if (attempt === maxRetries) {
                return new Response(JSON.stringify({
                    success: false,
                    message: error.message
                }), {
                    status: 500,
                    headers: { "Content-Type": "application/json" }
                });
            }

            await delay(1000 * attempt);
        }
    }
}
