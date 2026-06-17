import { invalidateSession } from '$lib/server/auth.js';
import { redirect } from '@sveltejs/kit';

export const actions = {
    logout: async ({ cookies }) => {

     // Get current session cookie
        const sessionId = cookies.get('session');
        if (sessionId) {
         // Remove session from database
            await invalidateSession(sessionId);
          // Delete session cookie from browser
            cookies.delete('session', {
                path: '/'
            });
        }
     // Redirect user to homepage after logout
        throw redirect(303, '/');
    }
};