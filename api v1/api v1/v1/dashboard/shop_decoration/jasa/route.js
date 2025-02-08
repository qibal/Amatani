import { InsertJasaAction, GetJasaAction } from "@/api v1/actions v1/v1/admin/shop_decoration/jasa/JasaActions";

export async function POST(req) {
    try {
        const formData = await req.formData();
        const jasaName = formData.get('companyName');
        const logo = formData.get('logo');

        if (!jasaName || !logo) {
            return new Response(JSON.stringify({ error: "Missing required fields" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const data = await InsertJasaAction(jasaName, logo);
        if (data) {
            return new Response(JSON.stringify(data), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        } else {
            return new Response(JSON.stringify({ message: "Failed to insert jasa" }), {
                status: 500,
                headers: { "Content-Type": "application/json" },
            });
        }
    } catch (error) {
        console.error('Error in jasa insertion route:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}

export async function GET(req) {
    try {
        const data = await GetJasaAction();
        if (data) {
            return new Response(JSON.stringify(data), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        } else {
            return new Response(JSON.stringify({ message: "No data found" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }
    } catch (error) {
        console.error('Error in jasa retrieval route:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}