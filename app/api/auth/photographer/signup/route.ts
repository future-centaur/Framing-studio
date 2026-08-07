/**
 * POST /api/auth/photographer/signup
 * Input: { phone or email, isPhotographer: true }
 * Output: { photographerId, sessionToken }
 * resolved C-3: phone/email + self-declared checkbox, no verification gate
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { signToken, generateOTPCode } from '@/lib/auth';
import { sendOTP } from '@/lib/otp';

const SignupSchema = z.object({
  phone: z.string().optional(),
  email: z.string().email().optional(),
  isPhotographer: z.literal(true),
}).refine((d) => d.phone || d.email, {
  message: 'Either phone or email is required',
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = SignupSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.issues },
        { status: 400 },
      );
    }

    const { phone, email } = parsed.data;

    // Check if already exists
    const existing = await db.photographer.findFirst({
      where: {
        OR: [
          phone ? { phone } : {},
          email ? { email } : {},
        ].filter((o) => Object.keys(o).length > 0),
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'An account with this phone/email already exists. Please login.' },
        { status: 409 },
      );
    }

    const otpCode = generateOTPCode();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    const photographer = await db.photographer.create({
      data: {
        phone: phone ?? null,
        email: email ?? null,
        isPhotographer: true,
        otpCode,
        otpExpiresAt,
      },
    });

    // Send OTP via stub (console in dev, real provider in prod)
    const destination = phone ?? email!;
    await sendOTP(destination, otpCode);

    return NextResponse.json({
      photographerId: photographer.id,
      message: 'OTP sent. Please verify to complete signup.',
      // In dev, return OTP directly so it can be tested without a real SMS
      ...(process.env.NODE_ENV !== 'production' && { devOtp: otpCode }),
    });
  } catch (err) {
    console.error('[POST /api/auth/photographer/signup]', err);
    return NextResponse.json({ error: 'Signup failed' }, { status: 500 });
  }
}
