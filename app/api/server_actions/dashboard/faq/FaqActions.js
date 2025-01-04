'use server';

import sql from "@/lib/postgres";

// Mengambil data FAQ beserta kategori
export async function GetFaqAction() {
    const faqs = await sql`
        SELECT 
            f.faq_id, 
            f.title, 
            f.content, 
            f.created_at, 
            f.updated_at, 
            c.name AS category_name
        FROM 
            public.faq f
        LEFT JOIN 
            public.faq_category c 
        ON 
            f.category_id = c.category_id;
    `;

    if (faqs) {
        return faqs;
    }
}

// /api/dashboard/faq/insert
export async function InsertFaqAction(title, content, category_id) {
    try {
        const result = await sql.begin(async sql => {
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
        console.error('Error inserting FAQ:', error);
        throw error;
    }
}

export async function DeleteFaqAction(params) {
    // const result = `berhasil hapus categories${params}`

    const result = await sql`delete from faq where faq_id = ${params} returning *`
    // Mengembalikan hasil query
    return result;
}
