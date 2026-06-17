import pool from '$lib/server/database.js';
import { fail, redirect } from '@sveltejs/kit';
// Load latest images for homepage
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
         ORDER BY images.votes DESC, images.created_at DESC
         LIMIT 25`
    );
    return { 
        images
     };
}
export const actions = {

  // Handle image voting
    vote: async ({ request, locals }) => {
 // Only logged-in users can vote
        if (!locals.user) {
            throw redirect(303, '/login');
        }

        const form = await request.formData();
        const imageId = form.get('imageId');
        const voteType = form.get('voteType');
 // Validate vote data
        if (!imageId || !voteType) {
            return fail(400, { error: 'Invalid vote.' });
        }

        try {
     // Check if user already voted     
            const [existing] = await pool.execute(
                'SELECT * FROM votes WHERE user_id = ? AND image_id = ?',
                [locals.user.id, imageId]
            );

            if (existing.length > 0) {
                return fail(400, { error: 'You already voted for this image.' });
            }
 // Save vote in database
            await pool.execute(
                'INSERT INTO votes (user_id, image_id, vote_type) VALUES (?, ?, ?)',
                [locals.user.id, imageId, voteType]
            );
 // Update image vote counter
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
// Handle database errors
            console.log(err);
            return fail(500, { error: 'Voting failed.' });
        }
        return {
           success: true
        };
    }
};