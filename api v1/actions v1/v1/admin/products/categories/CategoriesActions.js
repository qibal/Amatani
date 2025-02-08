'use server'

import sql from "@/lib/postgres";



// http://localhost:3000/api/dashboard/products/categories
export async function GetCategoriesAction() {
    const categories = await sql`SELECT * FROM categories;`;

    if (categories) {
        return categories;
    }
}

// http://localhost:3000/api/dashboard/products/categories/delete/(id_categories)
export async function DeleteCategoriesAction(params) {
    // const result = `berhasil hapus categories${params}`

    const result = await sql`delete from categories where categories_id = ${params} returning *`
    // Mengembalikan hasil query
    return result;
}


// http://localhost:3000/api/dashboard/products/categories/insert
// form = categories_name: sayuran
export async function InsertCategoriesAction(params) {
    console.log(params)
    // const result = params
    const result = await sql`insert into categories (categories_name) values(${params}) returning *`
    return result
}