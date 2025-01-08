'use server';

import sql from "@/lib/postgres";

export async function InsertStatisticsAction(number, description) {
    const result = await sql`
        INSERT INTO lp_statistics (number, description)
        VALUES (${number}, ${description})
        RETURNING *;
    `;
    return result;
}
