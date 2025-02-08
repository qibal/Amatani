'use server'

import sql from "@/lib/postgres";



// http://localhost:3000/api/dashboard/products/categories
export async function GetCategoriesAction() {
    try {
        const categories = await sql`SELECT * FROM categories`;
        return { success: true, data: categories };
    } catch (error) {
        console.error("Error fetching categories:", error);
        return { success: false, error: "Failed to fetch categories" };
    }
}

// http://localhost:3000/api/dashboard/products/categories/delete/(id_categories)
export async function DeleteCategoryAction(categories_id) {
    try {
        const result = await sql`delete from categories where categories_id = ${categories_id} returning *`;
        if (result.length === 0) {
            return { success: false, message: "Category not found" };
        }
        return { success: true, data: result };
    } catch (error) {
        console.error("Error deleting category:", error);
        return { success: false, error: "Failed to delete category" };
    }
}


// http://localhost:3000/api/dashboard/products/categories/insert
// form = categories_name: sayuran
export async function InsertCategoryAction(categories_name) {
    try {
        if (!categories_name) {
            throw new Error("Category name is required");
        }
        const result = await sql`insert into categories (categories_name) values(${categories_name}) returning *`;
        return { success: true, data: result };
    } catch (error) {
        console.error("Error inserting category:", error);
        return { success: false, error: error.message };
    }
}