import { InsertProductAction } from "@/app/api/server_actions/dashboard/products/ProductsActions";


export async function POST(req,) {
    console.log('masuk ke route insert');

    try {
        const data = await InsertProductAction(req)
        if (data) {
            consoke.log('berhasil query');
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