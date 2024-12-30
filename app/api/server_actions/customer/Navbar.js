import sql from "@/lib/postgres";

// http://localhost:3000/api/customer
export async function GetCategoriesNavbarActionCustomers(params) {
    const categories = await sql`SELECT * FROM categories;`;

    if (categories) {
        return categories;
    }
}