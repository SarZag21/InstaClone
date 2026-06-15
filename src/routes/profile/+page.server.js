import pool from '$lib/server/database.js';
import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
    if (!locals.user) {
        throw redirect(303, '/login');
    }

    const [images] = await pool.execute(
        `SELECT 
            id,
            image,
            description,
            votes,
            dislikes,
            created_at
         FROM images
         WHERE author_id = ?
         ORDER BY created_at DESC`,
        [locals.user.id]
    );

    return {
        user: locals.user,
        images
    };
}