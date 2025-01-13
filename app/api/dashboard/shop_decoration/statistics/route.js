import { GetStatisticsAction, InsertStatisticsAction } from "@/app/api/server_actions/dashboard/shop_decoration/statistics/StatisticsActions";

export async function GET(req) {
    try {
        const data = await GetStatisticsAction();
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
        console.error('Error in statistics retrieval route:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}

export async function POST(req) {
    try {
        const formData = await req.formData();
        const number = parseInt(formData.get('number'), 10);
        const description = formData.get('description');

        if (isNaN(number) || !description || description.trim() === "" || number <= 0) {
            return new Response(JSON.stringify({ error: "Missing or invalid required fields" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const data = await InsertStatisticsAction(number, description);
        if (data) {
            return new Response(JSON.stringify(data), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        } else {
            return new Response(JSON.stringify({ message: "Failed to insert statistic" }), {
                status: 500,
                headers: { "Content-Type": "application/json" },
            });
        }
    } catch (error) {
        console.error('Error in statistics insertion route:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}