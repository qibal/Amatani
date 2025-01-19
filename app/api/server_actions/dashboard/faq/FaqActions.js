'use server';

import sql from "@/lib/postgres";

export async function GetFaqAction(category, query) {
    try {
        const faqs = await sql`
            SELECT f.*, c.name AS category_name
            FROM faq f
            LEFT JOIN faq_category c ON f.category_id = c.category_id
            ${category ? sql`WHERE f.category_id = ${category}` : sql``}
            ${(category && query) ? sql`AND (f.title ILIKE ${'%' + query + '%'} OR f.content ILIKE ${'%' + query + '%'})` : (query ? sql`WHERE (f.title ILIKE ${'%' + query + '%'} OR f.content ILIKE ${'%' + query + '%'})` : sql``)}
            ORDER BY f.created_at DESC
        `;
        return faqs;
    } catch (error) {
        console.error('Error fetching FAQs:', error);
        throw error;
    }
}

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
    const result = await sql`delete from faq where faq_id = ${params} returning *`
    return result;
}

export async function UpdateFaqAction(faq_id, title, content, category_id) {
    try {
        console.log('Updating FAQ:', { faq_id, title, content, category_id });
        const result = await sql.begin(async (sql) => {
            const [updatedFaq] = await sql`
                UPDATE faq 
                SET 
                    title = ${title},
                    content = ${content},
                    category_id = ${category_id},
                    updated_at = NOW()
                WHERE 
                    faq_id = ${faq_id}
                RETURNING *
            `;
            console.log('Updated FAQ:', updatedFaq);
            return updatedFaq;
        });

        if (!result) {
            console.log('No FAQ updated');
            throw new Error('FAQ not found or not updated');
        }

        return result;
    } catch (error) {
        console.error('Error updating FAQ:', error);
        throw error;
    }
}

export async function GetFaqForEditAction(faq_id) {
    try {
        const [faq] = await sql`
            SELECT 
                f.faq_id, 
                f.title, 
                f.content, 
                f.category_id,
                c.name AS category_name
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
        console.error('Error fetching FAQ for edit:', error);
        throw error;
    }
}

