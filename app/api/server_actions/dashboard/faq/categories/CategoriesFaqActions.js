'use server'

import sql from "@/lib/postgres";

// http://localhost:3000/api/dashboard/faq/categories
export async function GetCategoriesFaqAction(params) {
    const categories = await sql`SELECT * FROM faq_category;`;

    if (categories) {
        return categories;
    }
}

export async function DeleteCategoriesFaqAction(params) {
    // const result = `berhasil hapus categories${params}`

    const result = await sql`delete from faq_category where category_id = ${params} returning *`
    // Mengembalikan hasil query
    return result;
}

export async function InsertCategoriesFaqAction(name) {
    console.log('Inserting category:', name);
    const result = await sql`INSERT INTO faq_category (name) VALUES (${name}) RETURNING *`;
    return result;
}