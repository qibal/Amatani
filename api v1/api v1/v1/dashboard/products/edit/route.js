import { UpdateProductAction } from "@/api v1/actions v1/v1/admin/products/ProductsActions";

// http://localhost:3000/api/dashboard/products/edit
export async function POST(req) {
    try {
        const result = await UpdateProductAction(req);
        if (!result) {
            throw new Error("Gagal memperbarui produk");
        }
        return new Response(JSON.stringify({ success: true, data: result }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        console.error('Error in edit route:', error);
        return new Response(JSON.stringify({
            success: false,
            message: error.message
        }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
