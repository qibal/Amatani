import { InsertCategoriesAction } from "@/api v1/actions v1/v1/admin/products/categories/CategoriesActions"


export async function POST(req,) {

    const formData = await req.formData()
    const category_name = formData.get('category_name')
    console.log('data=', category_name);

    try {
        const data = await InsertCategoriesAction(category_name)
        if (data) {
            return new Response(JSON.stringify(data), {
                status: 200,
                headers: {
                    "Content-Type": "application/json"
                }
            })
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