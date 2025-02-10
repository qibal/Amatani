import { GetProductDetailActionCustomers } from "@/app/actions/v2/public/product/productActions";





// http://localhost:3000/api/customer/products/products_detail/33a5fcb9-7dff-45af-b7e0-d44711eb9c44
export async function GET(request, { params }) {

    try {
        const data = await GetProductDetailActionCustomers(request, { params });
        if (data && data.length > 0) {
            return new Response(JSON.stringify({ success: true, data: data[0] }), { // Mengirim data[0] karena result adalah array
                status: 200,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        } else {
            return new Response(JSON.stringify({ success: false, message: "No data found" }), {
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
