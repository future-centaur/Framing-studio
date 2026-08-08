/**
 * lib/otp.ts
 * Generic OTP interface — provider intentionally unspecified per explicit constraint.
 * OTP_PROVIDER_* env vars read here; real implementation replaces the stub.
 *
 * CONSTRAINT (from prompt): Do not hardcode a specific vendor (Twilio,
 * Africa's Talking, or otherwise) — that is a decision for a human, not an
 * inference. This file is the single integration point.
 *
 * To wire a real provider, replace the stub body of sendOTP with the
 * vendor SDK call, reading credentials from OTP_PROVIDER_* env vars.
 */

export interface OTPSendResult {
  success: boolean;
  messageId?: string;
}

/**
 * Send an OTP code to a phone number or email address.
 *
 * @param destination - Phone number (E.164 format e.g. +254...) or email address
 * @param code - The 6-digit OTP code to send
 */
export async function sendOTP(
  destination: string,
  code: string,
): Promise<OTPSendResult> {
  // ── STUB — no real provider wired yet ────────────────────────────────────
  // Replace this block with a real SMS/email provider when one is chosen.
  // Read credentials from process.env.OTP_PROVIDER_* here.
  //
  // Until a provider is wired the code is returned in the API response
  // (see route.ts) so photographers can still log in. Set OTP_PROVIDER_READY=true
  // in Netlify env vars once a real provider is configured to enforce sending.
  // ─────────────────────────────────────────────────────────────────────────
  console.log(`[OTP STUB] → ${destination}: Your Hollow & Hale code is ${code}`);
  return { success: true, messageId: `stub-${Date.now()}` };
}

