import { fail, redirect } from '@sveltejs/kit';
import pool from '$lib/server/database.js';
import { uploadImage } from '$lib/server/uploadImage.js';

// Load upload page
export async function load({ locals }) {
   // Only logged-in users can access upload page
    if (!locals.user) {
        throw redirect(303, '/login');
    }
    return {};
}

export const actions = {
    upload: async ({ request, locals }) => {
   // Only logged-in users can upload images
        if (!locals.user) {
            throw redirect(303, '/login');
        }

        // Get form data
        const form = await request.formData();

        const image = form.get('image');
        const description = form.get('description');
  // Validate image upload
        if (!image || image.size === 0) {
            return fail(400, { error: 'Bitte ein Bild auswählen.' });
        }
  // Validate description
        if (!description) {
            return fail(400, { error: 'Bitte eine Beschreibung eingeben.' });
        }

        let imageUrl;

        try {
    // Upload image to Vercel Blob storage
            imageUrl = await uploadImage(image);
    // Save image information in database   
            await pool.execute(
                'INSERT INTO images (image, description, author_id) VALUES (?, ?, ?)',
                [imageUrl, description, locals.user.id]
            );

        }  catch (err) {
    // Handle upload errors
    console.log("UPLOAD ERROR:", err);
    return fail(500, { error: 'Fehler beim Hochladen des Bildes.' });
}
    // Redirect to homepage after successful upload
        throw redirect(303, '/');
    }
};