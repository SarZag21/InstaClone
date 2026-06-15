import pool from '$lib/server/database.js';
import { error, fail, redirect } from '@sveltejs/kit';

export async function load({ params, url }) {
    const imageId = params.id;

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

    if (!image) {
        throw error(404, 'Image not found');
    }

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

    export const actions = {
    comment: async ({ request, locals, params }) => {
        if (!locals.user) {
            throw redirect(303, '/login');
        }

        const form = await request.formData();
        const text = form.get('text');

        if (!text) {
            return fail(400, { error: 'Please write a comment.' });
        }

        await pool.execute(
            `INSERT INTO comments (image_id, user_id, text)
             VALUES (?, ?, ?)`,
            [params.id, locals.user.id, text]
        );

        throw redirect(303, `/images/${params.id}`);
    }
};
