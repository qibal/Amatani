import { InsertProductAction } from "@/app/api/server_actions/dashboard/products/ProductsActions";

export async function POST(req,) {
    console.log('masuk ke route insert');

    const maxRetries = 3;
    let attempt = 0;
    let data;

    while (attempt < maxRetries) {
        try {
            data = await InsertProductAction(req);
            if (data) {
                console.log('berhasil query');
                return new Response(JSON.stringify(data), {
                    status: 200,
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
            } else {
                console.error(`Attempt ${attempt + 1}: No data found`);
                attempt++;
            }
        } catch (error) {
            console.error(`Attempt ${attempt + 1}: ${error.message}`);
            attempt++;
        }
    }

    return new Response(JSON.stringify({ message: "No data found after multiple attempts" }), {
        status: 404,
        headers: {
            "Content-Type": "application/json"
        }
    });
}
