'use server'

import sql from "@/lib/postgres";

// http://localhost:3000/api/dashboard/faq/categories
export async function GetCategoriesFaqAction(req, { params }) {
    try {
        const categories = await sql`SELECT category_id,category_name,created_at FROM faq_category;`;
        return categories;
    } catch (error) {
        console.error("Error fetching categories:", error);
        return { error: "Failed to fetch categories", error };
    }
}

export async function DeleteCategoriesFaqAction(req, { params }) {
    try {
        const category_id = params.category_id;
        console.log("🚀 ~ DeleteCategoriesFaqAction ~ category_id:", category_id)
        const result = await sql`delete from faq_category where category_id = ${category_id} returning *`
        return result;
    } catch (error) {
        console.error("Error deleting category:", error);
        return { error: "Failed to delete category", error };
    }
}

export async function InsertCategoriesFaqAction(req, { params }) {
    try {
        const formData = await req.formData();
        const category_name = formData.get('category_name');
        console.log('Inserting category:', category_name);
        const result = await sql`INSERT INTO faq_category (category_name) VALUES (${category_name}) RETURNING *`;
        return result;
    } catch (error) {
        console.error("Error inserting category:", error);
        return { error: "Failed to insert category", error };
    }
}