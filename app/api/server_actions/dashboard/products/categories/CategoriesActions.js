import sql from "@/lib/postgres";



// http://localhost:3000/api/dashboard/products/categories
export async function GetCategoriesAction(params) {
    const categories = await sql`SELECT * FROM categories;`;

    if (categories) {
        return categories;
    }
}

//query untuk HAPUS  produk
export async function DeleteCategoriesAction(params) {
    const result = await sql`delete from caategories where categories_id = ${params} returning *`
    // Mengembalikan hasil query
    return result;
}
