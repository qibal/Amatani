import { GetExperiencesActionPublic } from "@/app/actions/v2/public/landingPage";

export async function GET(req, { params }) {
    try {
        const { success, data, error } = await GetExperiencesActionPublic();

        if (success) {
            return new Response(JSON.stringify({ success: true, data }), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        } else {
            console.error("GET experiences failed:", error);
            return new Response(JSON.stringify({ success: false, error }), {
                status: 500,
                headers: { "Content-Type": "application/json" },
            });
        }
    } catch (error) {
        console.error("Error in GET request:", error);
        return new Response(
            JSON.stringify({ success: false, error: error.message }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}