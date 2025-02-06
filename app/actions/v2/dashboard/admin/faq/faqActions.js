
// export async function GetFaqAction(req, params) {
//     try {
//         // const url = new URL(req.url);
//         // const category = url.searchParams.get('category');
//         // const query = url.searchParams.get('query');
//         const faqs = await sql`
//             SELECT f.*, c.name AS category_name
//             FROM faq f
//             LEFT JOIN faq_category c ON f.category_id = c.category_id
//             -- ${category ? sql`WHERE f.category_id = ${category}` : sql``}
//             -- ${category && query ? sql`AND (f.title ILIKE ${"%" + query + "%"} OR f.content ILIKE ${"%" + query + "%"})` : query ? sql`WHERE (f.title ILIKE ${"%" + query + "%"} OR f.content ILIKE ${"%" + query + "%"})` : sql``}
//             ORDER BY f.created_at DESC
//         `;
//         return faqs;
//     } catch (error) {
//         console.error("Error fetching FAQs:", error);
//         throw error;
//     }
// }

"use server";

import sql from "@/lib/postgres";

export async function GetFaqAction(req, params) {
    const searchParams = req.nextUrl.searchParams;
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    try {
        let faqs;
        if (category) {
            faqs = await sql`
                SELECT
                    f.faq_id,
                    f.title,
                    f.content,
                    c.category_id,
                    c.category_name,
                    f.created_at
                FROM faq f
                LEFT JOIN faq_category c ON f.category_id = c.category_id
                WHERE c.category_name ILIKE ${'%' + category + '%'}
                ORDER BY f.created_at DESC
            `;
        } else if (search) {
            faqs = await sql`
                SELECT
                    f.faq_id,
                    f.title,
                    f.content,
                    c.category_id,
                    c.category_name,
                    f.created_at
                FROM faq f
                LEFT JOIN faq_category c ON f.category_id = c.category_id
                WHERE (f.title ILIKE ${'%' + search + '%'} OR f.content ILIKE ${'%' + search + '%'} OR c.category_name ILIKE ${'%' + category + '%'})
                ORDER BY f.created_at DESC
            `;
        } else {
            faqs = await sql`
                SELECT
                    f.faq_id,
                    f.title,
                    f.content,
                    c.category_id,
                    c.category_name,
                    f.created_at
                FROM faq f
                LEFT JOIN faq_category c ON f.category_id = c.category_id
                ORDER BY f.created_at DESC
            `;
        }
        return faqs;
    } catch (error) {
        console.error("Error fetching FAQs:", error);
        return { error: "Failed to fetch FAQs", error };
    }
}

export async function GetFaqByIdAction(req, { params }) {
    try {
        const faq_id = await params.faq_id;
        console.log("🚀 ~ GetFaqByIdAction ~ faq_id:", faq_id)
        const [faq] = await sql`
            SELECT
                f.faq_id,
                f.title,
                f.content,
                f.category_id,
                c.category_name,
                f.created_at
            FROM
                public.faq f
            LEFT JOIN
                public.faq_category c
            ON
                f.category_id = c.category_id
            WHERE
                f.faq_id = ${faq_id};
        `;
        return faq;
    } catch (error) {
        console.error("Error fetching FAQ for edit:", error);
        return { error: "Failed to fetch FAQ", error };
    }
}

export async function InsertFaqAction(req, { params }) {

    const formData = await req.formData();
    const title = formData.get('title');
    const content = formData.get('content');
    const category_id = formData.get('category_id');

    console.log("🚀 ~ POST ~ title:", title)
    console.log("🚀 ~ POST ~ content:", content)
    console.log("🚀 ~ POST ~ category_id:", category_id)

    try {
        const result = await sql.begin(async (sql) => {
            const [faq] = await sql`
                INSERT INTO faq (
                    title,
                    content,
                    category_id
                ) VALUES (
                    ${title},
                    ${content},
                    ${category_id}
                )
                RETURNING *;
            `;
            return faq;
        });
        return result;
    } catch (error) {
        console.error("Error inserting FAQ:", error);
        return { error: "Failed to insert FAQ", error };
    }
}

export async function DeleteFaqAction(req, { params }) {
    try {
        const faq_id = await params.faq_id;
        console.log("🚀 ~ DeleteFaqAction ~ faq_id:", faq_id)


        const result = await sql`delete from faq where faq_id = ${faq_id} returning *`;
        return result;
    } catch (error) {
        console.error("Error deleting FAQ:", error);
        return { error: "Failed to delete FAQ", error };
    }
}

export async function UpdateFaqByIdAction(req, { params }) {
    const formData = await req.formData();
    const title = formData.get('title');
    const content = formData.get('content');
    const category_id = formData.get('category_id');
    const faq_id = await params.faq_id;


    console.log("🚀 ~ POST ~ title:", title)
    console.log("🚀 ~ POST ~ content:", content)
    console.log("🚀 ~ POST ~ category_id:", category_id)
    console.log("🚀 ~ POST ~ faq_id:", faq_id)

    if (!title || !content || !category_id) {
        throw new Error("Invalid input: all fields are required");
    }
    if (!faq_id) {
        throw new Error("Invalid input: faq_id is required");

    }

    try {
        const result = await sql.begin(async (sql) => {
            const [updatedFaq] = await sql`
                UPDATE faq 
                SET 
                    title = ${title},
                    content = ${content},
                    category_id = ${category_id}
                WHERE 
                    faq_id = ${faq_id}
                RETURNING *
            `;
            console.log("Updated FAQ:", updatedFaq);
            return updatedFaq;
        });

        if (!result) {
            console.log("No FAQ updated");
            throw new Error("FAQ not found or not updated");
        }

        return result;
    } catch (error) {
        console.error("Error updating FAQ:", error);
        return { error: "Failed to update FAQ", error };
    }
}