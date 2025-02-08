

// http://localhost:3000/api/dashboard/products/categories
// [
//     {
//       "categories_id": "edb18ecd-88c4-455b-a7fb-0caeb5a882e9",
//       "categories_name": "sayuran",
//       "created_at": "2024-12-25T06:47:25.643Z"
//     }

import { GetCategoriesAction } from "@/api v1/actions v1/v1/admin/products/categories/CategoriesActions"

//   ]
export async function GET() {
    try {
        const data = await GetCategoriesAction()
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