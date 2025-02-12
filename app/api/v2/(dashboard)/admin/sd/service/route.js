import {
    GetServiceAction,
    InsertServiceAction
} from "@/app/actions/v2/dashboard/admin/sd/serviceActions";

export async function GET(req, { params }) {
    try {
        const { success, data, error } = await GetServiceAction();

        if (success) {
            return new Response(JSON.stringify({ success: true, data }), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        } else {
            console.error("GET services failed:", error);
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
        const serviceName = formData.get("service_name");
        console.log("🚀 ~ POST ~ serviceName:", serviceName)
        const image = formData.get("image");
        console.log("🚀 ~ POST ~ image:", image)

        if (!serviceName || !image) {
            return new Response(
                JSON.stringify({ success: false, error: "Service name and image are required" }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        const { success, data, error } = await InsertServiceAction(serviceName, image);

        if (success) {
            return new Response(JSON.stringify({ success: true, data }), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        } else {
            console.error("POST services failed:", error);
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