import { GetProductDetailActionCustomers } from "@/app/api/server_actions/customer/products/detail_products/D_productActions";

// http://localhost:3000/api/dashboard/products/edit/5735d9b9-18cf-4bf8-9fb1-533e56d491c6
export async function GET(request, { params }) {
    const { product_id } = params;

    try {
        const data = await GetProductDetailActionCustomers(product_id);
        if (data && data.length > 0) {
            return new Response(JSON.stringify(data), {
                status: 200,
                headers: { "Content-Type": "application/json" }
            });
        } else {
            return new Response(JSON.stringify({ message: "Produk tidak ditemukan" }), {
                status: 404,
                headers: { "Content-Type": "application/json" }
            });
        }
    } catch (error) {
        console.error('Error fetching product:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
