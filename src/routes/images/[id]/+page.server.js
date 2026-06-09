import pool from '$lib/server/database.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
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

    return {
        image
    };
}