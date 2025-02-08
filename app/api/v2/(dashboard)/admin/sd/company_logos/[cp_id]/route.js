export async function DELETE(req, { params }) {
    try {
        const result = await DeleteFaqAction(req, { params });

        if (result) {
            return new Response(JSON.stringify({
                success: true,
                data: result
            }), {
                status: 200,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        } else {
            return new Response(JSON.stringify({
                success: false,
                message: "No data found"
            }), {
                status: 404,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        }
    } catch (error) {
        console.error("Error in DELETE request:", error);
        return new Response(JSON.stringify({
            success: false,
            error: error.message
        }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
}