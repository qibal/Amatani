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

export async function GetStatisticsAction() {
    const result = await sql`
        SELECT * FROM lp_statistics;
    `;
    return result;
}

export async function DeleteStatisticsAction(id_statistic) {
    const result = await sql`
        DELETE FROM lp_statistics
        WHERE id_statistic = ${id_statistic}
        RETURNING *;
    `;
    if (result.length === 0) {
        return { success: false, message: "Statistic not found or not authorized to delete" };
    }
    return { success: true, message: "Statistic deleted successfully", data: result[0] };
}