/**
 * lib/auth.ts
 * Photographer session token management using jose (JWT)
 * SESSION_SECRET read from env (PRD §7)
 */

import { SignJWT, jwtVerify } from 'jose';
import { NextRequest } from 'next/server';

const SECRET = new TextEncoder().encode(
  process.env.SESSION_SECRET ?? 'dev-secret-change-in-production',
);

const ALGORITHM = 'HS256';
const EXPIRY = '7d';

export interface SessionPayload {
  photographerId: string;
  iat?: number;
  exp?: number;
}

/**
 * Sign a JWT for a photographer session.
 */
export async function signToken(photographerId: string): Promise<string> {
  return new SignJWT({ photographerId })
    .setProtectedHeader({ alg: ALGORITHM })
    .setIssuedAt()
    .setExpirationTime(EXPIRY)
    .sign(SECRET);
}

/**
 * Verify a JWT and return the payload, or null if invalid.
 */
export async function verifyToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET, { algorithms: [ALGORITHM] });
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

/**
 * Middleware-style guard: extracts and verifies the photographer auth token
 * from the Authorization header (Bearer <token>) or the session cookie.
 * Returns the photographerId, or throws a 401 response.
 */
export async function requirePhotographerAuth(
  req: NextRequest,
): Promise<{ photographerId: string }> {
  let token: string | undefined;

  // Try Authorization header first
  const authHeader = req.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    token = authHeader.slice(7);
  }

  // Fallback: cookie
  if (!token) {
    token = req.cookies.get('photographer_session')?.value;
  }

  if (!token) {
    throw new Response(
      JSON.stringify({ error: 'Unauthorized — no session token' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } },
    );
  }

  const payload = await verifyToken(token);
  if (!payload) {
    throw new Response(
      JSON.stringify({ error: 'Unauthorized — invalid or expired token' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } },
    );
  }

  return { photographerId: payload.photographerId };
}

/**
 * Generate a 6-digit numeric OTP code.
 */
export function generateOTPCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
