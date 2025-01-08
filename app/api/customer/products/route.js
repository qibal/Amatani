import { GetProductActionCustomers } from "../../server_actions/customer/products/ProductActions";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const categories = searchParams.get('categories');
    const products = searchParams.get('products');
    const allProducts = searchParams.get('all_product');
    const query = categories || products || '';
    const type = categories ? 'categories' : (products ? 'products' : 'all');

    console.log('Query:', query);
    console.log('Type:', type);

    try {
        const data = await GetProductActionCustomers({ query, type });
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