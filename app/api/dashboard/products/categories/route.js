

// http://localhost:3000/api/dashboard/products/categories
// [
//     {
//       "categories_id": "edb18ecd-88c4-455b-a7fb-0caeb5a882e9",
//       "categories_name": "sayuran",
//       "created_at": "2024-12-25T06:47:25.643Z"
//     }

import { GetCategoriesAction } from "@/app/api/server_actions/dashboard/products/categories/CategoriesActions"

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
        }
        return null
    } catch (error) {

    }

}