import pool from '$lib/server/database.js';
import { redirect } from '@sveltejs/kit';

// Load profile page data
export async function load({ locals }) {
 // Redirect guests to login page
    if (!locals.user) {
        throw redirect(303, '/login');
    }

    // Load all images uploaded by the current user
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
    // Delete an image belonging to the current user
    deleteImage: async ({ request, locals }) => {
        const form = await request.formData();

        const imageId = form.get('imageId');
   // Delete image only if it belongs to the logged-in user
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
