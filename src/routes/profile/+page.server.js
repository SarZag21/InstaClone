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

     export const actions = {
    deleteImage: async ({ request, locals }) => {
        const form = await request.formData();

        const imageId = form.get('imageId');

        await pool.execute(
            `DELETE FROM images
             WHERE id = ?
             AND author_id = ?`,
            [imageId, locals.user.id]
        );

        return {
            success: true
        };
    }

};
