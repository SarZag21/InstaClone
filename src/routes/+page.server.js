import pool from '$lib/server/database.js';
import { fail, redirect } from '@sveltejs/kit';

export async function load() {
    const [images] = await pool.execute(
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
         ORDER BY images.created_at DESC
         LIMIT 25`
    );
    return { images };
}
export const actions = {
    vote: async ({ request, locals }) => {
        if (!locals.user) {
            throw redirect(303, '/login');
        }

        const form = await request.formData();
        const imageId = form.get('imageId');
        const voteType = form.get('voteType');

        if (!imageId || !voteType) {
            return fail(400, { error: 'Invalid vote.' });
        }

        try {
            const [existing] = await pool.execute(
                'SELECT * FROM votes WHERE user_id = ? AND image_id = ?',
                [locals.user.id, imageId]
            );

            if (existing.length > 0) {
                return fail(400, { error: 'You already voted for this image.' });
            }

            await pool.execute(
                'INSERT INTO votes (user_id, image_id, vote_type) VALUES (?, ?, ?)',
                [locals.user.id, imageId, voteType]
            );
            if (voteType === 'like') {
                await pool.execute(
                    'UPDATE images SET votes = votes + 1 WHERE id = ?',
                    [imageId]
                );
            } else {
                await pool.execute(
                    'UPDATE images SET dislikes = dislikes + 1 WHERE id = ?',
                    [imageId]
                );
            }
        } catch (err) {
            console.log(err);
            return fail(500, { error: 'Voting failed.' });
        }
        throw redirect(303, '/');
    }
};