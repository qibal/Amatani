import {
    GetExperiencesAction,
    InsertExperienceAction,
} from "@/app/actions/v2/dashboard/admin/sd/experienceActions";

export async function GET(req, { params }) {
    try {
        const { success, data, error } = await GetExperiencesAction();

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

export async function POST(req, { params }) {
    try {
        const formData = await req.formData();
        const number = formData.get("number");
        const description = formData.get("description");

        const { success, data, error } = await InsertExperienceAction(
            number,
            description
        );

        if (success) {
            return new Response(JSON.stringify({ success: true, data }), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        } else {
            console.error("POST experiences failed:", error);
            return new Response(JSON.stringify({ success: false, error }), {
                status: 500,
                headers: { "Content-Type": "application/json" },
            });
        }
    } catch (error) {
        console.error("Error in POST request:", error);
        return new Response(
            JSON.stringify({ success: false, error: error.message }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}