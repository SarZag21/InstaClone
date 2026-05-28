import { validateSession } from "$lib/server/auth.js";

/** SvelteKit hook , runs on every request */
export async function handle({ event, resolve }) {

    // Get session cookie
    const sessionId = event.cookies.get("session");

    // Default values
    event.locals.user = null;
    event.locals.session = null;

    // Validate session if cookie exists
    if (sessionId) {
        const user = await validateSession(sessionId);

        if (user) {
            event.locals.user = user;
            event.locals.session = sessionId;
        }
    }

    // Continue request
    return resolve(event);
}