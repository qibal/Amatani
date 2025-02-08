import { DeleteStatisticsAction } from "@/api v1/actions v1/v1/admin/shop_decoration/statistics/StatisticsActions";

export async function DELETE(req, { params }) {
    const { id_statistic } = params;

    try {
        const data = await DeleteStatisticsAction(id_statistic);
        if (data.success) {
            return new Response(JSON.stringify(data), {
                status: 200,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        } else {
            return new Response(JSON.stringify({ message: data.message }), {
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