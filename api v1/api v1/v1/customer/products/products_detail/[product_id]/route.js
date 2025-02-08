import { GetProductDetailActionCustomers } from "@/api v1/actions v1/v1/public/products/detail_products/D_productActions";





// http://localhost:3000/api/customer/products/products_detail/33a5fcb9-7dff-45af-b7e0-d44711eb9c44
export async function GET(request, { params }) {
    const { product_id } = await params; // pastikan ini didefinisikan dengan await untuk dynamic route

    console.log("🚀 ~ GET ~ params:", product_id);

    try {
        const data = await GetProductDetailActionCustomers(product_id);
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
