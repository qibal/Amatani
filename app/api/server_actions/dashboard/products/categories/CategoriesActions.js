import sql from "@/lib/postgres";



// http://localhost:3000/api/dashboard/products/categories
export async function GetCategories(params) {
    const categories = await sql`SELECT * FROM categories;`;

    if (categories) {
        return categories;
    }
}