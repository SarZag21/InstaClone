import { fail, redirect } from '@sveltejs/kit';
import pool from '$lib/server/database.js';
import { verifyPassword, createSession } from '$lib/server/auth.js';

export const actions = {
    // Get login form data
    login: async ({ request, cookies }) => {
        const form = await request.formData();

        const email = form.get('email');
        const password = form.get('password');

         // Check if all required fields are filled
        if (!email || !password) {
            return fail(400, { error: 'Bitte alle Felder ausfüllen.' });
        }

        let rows;

        try {
          // Find user by email address
            [rows] = await pool.execute(
                'SELECT * FROM users WHERE email = ?',
                [email]
            );
        } catch (err) {
            // Database error handling
            console.log(err);
            return fail(500, { error: 'Datenbankfehler.' });
        }

        const user = rows[0];
 // Check if user exists
        if (!user) {
            return fail(400, { error: 'Email oder Passwort ist falsch.' });
        }
    // Verify entered password
        const validPassword = await verifyPassword(password, user.password);

        if (!validPassword) {
            return fail(400, { error: 'Email oder Passwort ist falsch.' });
        }

      
        const sessionId = await createSession(user.id);
    // Store session cookie
        cookies.set('session', sessionId, {
            path: '/',
            maxAge: 60 * 60 * 24 * 30
        });
   // Redirect user to homepage
        throw redirect(303, '/');
    }
};