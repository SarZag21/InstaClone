import { fail, redirect } from '@sveltejs/kit';
import pool from '$lib/server/database.js';
import { uploadImage } from '$lib/server/uploadImage.js';

export async function load({ locals }) {

    if (!locals.user) {
        throw redirect(303, '/login');
    }

    return {};
}

export const actions = {
    upload: async ({ request, locals }) => {

        if (!locals.user) {
            throw redirect(303, '/login');
        }

        const form = await request.formData();

        const image = form.get('image');
        const description = form.get('description');

        if (!image || image.size === 0) {
            return fail(400, { error: 'Bitte ein Bild auswählen.' });
        }

        if (!description) {
            return fail(400, { error: 'Bitte eine Beschreibung eingeben.' });
        }

        let imageUrl;

        try {
            imageUrl = await uploadImage(image);
            await pool.execute(
                'INSERT INTO images (image, description, author_id) VALUES (?, ?, ?)',
                [imageUrl, description, locals.user.id]
            );

        } catch (err) {
            console.log(err);
            return fail(500, { error: 'Fehler beim Hochladen des Bildes.' });
        }

        throw redirect(303, '/');
    }
};