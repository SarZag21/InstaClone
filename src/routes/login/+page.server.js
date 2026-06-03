import { fail, redirect } from '@sveltejs/kit';
import pool from '$lib/server/database.js';
import { verifyPassword, createSession } from '$lib/server/auth.js';

export const actions = {
    login: async ({ request, cookies }) => {
        const form = await request.formData();

        const email = form.get('email');
        const password = form.get('password');

     
        if (!email || !password) {
            return fail(400, { error: 'Bitte alle Felder ausfüllen.' });
        }

        let rows;

        try {
        
            [rows] = await pool.execute(
                'SELECT * FROM users WHERE email = ?',
                [email]
            );
        } catch (err) {
            console.log(err);
            return fail(500, { error: 'Datenbankfehler.' });
        }

        const user = rows[0];

        if (!user) {
            return fail(400, { error: 'Email oder Passwort ist falsch.' });
        }

        const validPassword = await verifyPassword(password, user.password);

        if (!validPassword) {
            return fail(400, { error: 'Email oder Passwort ist falsch.' });
        }

      
        const sessionId = await createSession(user.id);

        cookies.set('session', sessionId, {
            path: '/',
            maxAge: 60 * 60 * 24 * 30
        });

        throw redirect(303, '/');
    }
};