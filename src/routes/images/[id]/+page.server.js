import pool from '$lib/server/database.js';
import { error, fail, redirect } from '@sveltejs/kit';

// Load image details and all comments for the selected image
export async function load({ params, url }) {
    const imageId = params.id;

 // Get image information and author username
    const [rows] = await pool.execute(
        `SELECT 
            images.id,
            images.image,
            images.description,
            images.votes,
            images.dislikes,
            images.created_at,
            users.username
         FROM images
         JOIN users ON users.id = images.author_id
         WHERE images.id = ?`,
        [imageId]
    );

    const image = rows[0];

 // Show 404 page if image does not exist
    if (!image) {
        throw error(404, 'Image not found');
    }
   // Load all comments for the image
    const [comments] = await pool.execute(
    `SELECT 
        comments.id,
        comments.text,
        comments.created_at,
        users.username
     FROM comments
     JOIN users ON users.id = comments.user_id
     WHERE comments.image_id = ?
     ORDER BY comments.created_at DESC`,
    [imageId]
    );

    return {
        image,
        comments,
         from: url.searchParams.get('from')
    };
  }

  // Actions available on the image detail page
    export const actions = {
    comment: async ({ request, locals, params }) => {
  // Only logged-in users can post comments
        if (!locals.user) {
            throw redirect(303, '/login');
        }

        const form = await request.formData();
        const text = form.get('text');
   // Prevent empty comments
        if (!text) {
            return fail(400, { error: 'Please write a comment.' });
        }
     // Save the new comment in the database
        await pool.execute(
            `INSERT INTO comments (image_id, user_id, text)
             VALUES (?, ?, ?)`,
            [params.id, locals.user.id, text]
        );
  // Reload the page after posting the comment
        throw redirect(303, `/images/${params.id}`);
    }
};
