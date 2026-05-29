import { fail, redirect } from '@sveltejs/kit';
import pool from '$lib/server/database.js';
import { hashPassword, createSession } from '$lib/server/auth.js';

export const actions = {
    register: async ({ request, cookies }) => {
        const form = await request.formData();

        const username = form.get('username');
        const email = form.get('email');
        const password = form.get('password');

        
        if (!username || !email || !password) {
            return fail(400, { error: 'Bitte alle Felder ausfüllen.' });
        }

        let result;

        try {
           
            [result] = await pool.execute(
                'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
                [username, email, await hashPassword(password)]
            );

            console.log(result);
        } catch (err) {
            console.log(err);

            if (err.code === 'ER_DUP_ENTRY') {
                return fail(400, { error: 'Username oder Email ist bereits vergeben!' });
            }

            return fail(500, { error: 'Datenbankfehler.' });
        }

       
        const sessionId = await createSession(result.insertId);

        cookies.set('session', sessionId, {
            path: '/',
            maxAge: 60 * 60 * 24 * 30
        });

        throw redirect(303, '/');
    }
};