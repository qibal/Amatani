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
