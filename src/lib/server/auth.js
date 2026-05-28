import pool from "./database.js";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";

const SESSION_DURATION_DAYS = 30;

/** Hash password for registration*/
export async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

/** Verify password during login */
export async function verifyPassword(password, hash) {
    return await bcrypt.compare(password, hash);
}

/** Create session after login*/
export async function createSession(userId) {
    const sessionId = randomUUID();

    const expiresAt = new Date(
        Date.now() + SESSION_DURATION_DAYS * 24 * 60 * 60 * 1000
    );

    await pool.execute(
        `INSERT INTO sessions (id, user_id, expires_at)
         VALUES (?, ?, ?)`,
        [sessionId, userId, expiresAt]
    );

    return sessionId;
}

/**
 * Get logged-in user from session
 * Used for protected pages, uploads and comments
 */
export async function validateSession(sessionId) {
    if (!sessionId) return null;

    const [rows] = await pool.execute(
        `SELECT 
            u.id,
            u.username,
            u.email
         FROM sessions s
         JOIN users u ON u.id = s.user_id
         WHERE s.id = ? AND s.expires_at > NOW()`,
        [sessionId]
    );

    return rows[0] || null;
}

/**Logout user */
export async function invalidateSession(sessionId) {
    if (!sessionId) return;

    await pool.execute(
        `DELETE FROM sessions WHERE id = ?`,
        [sessionId]
    );
}

export async function deleteExpiredSessions() {
    await pool.execute(
        `DELETE FROM sessions WHERE expires_at <= NOW()`
    );
}

