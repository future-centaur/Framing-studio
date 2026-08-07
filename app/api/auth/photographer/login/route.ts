/**
 * POST /api/auth/photographer/login
 * Input: { phone or email }
 * Initiates OTP flow
 * Output: OTP sent; client then calls /verify with the code
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { signToken, generateOTPCode } from '@/lib/auth';
import { sendOTP } from '@/lib/otp';

const LoginSchema = z.object({
  phone: z.string().optional(),
  email: z.string().email().optional(),
  otpCode: z.string().optional(), // present on second step (OTP verification)
}).refine((d) => d.phone || d.email, {
  message: 'Either phone or email is required',
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = LoginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.issues },
        { status: 400 },
      );
    }

    const { phone, email, otpCode } = parsed.data;

    const photographer = await db.photographer.findFirst({
      where: {
        OR: [
          phone ? { phone } : {},
          email ? { email } : {},
        ].filter((o) => Object.keys(o).length > 0),
      },
    });

    if (!photographer) {
      return NextResponse.json(
        { error: 'No account found. Please sign up first.' },
        { status: 404 },
      );
    }

    // Step 2: OTP verification
    if (otpCode) {
      if (
        !photographer.otpCode ||
        !photographer.otpExpiresAt ||
        photographer.otpCode !== otpCode ||
        photographer.otpExpiresAt < new Date()
      ) {
        return NextResponse.json(
          { error: 'Invalid or expired OTP' },
          { status: 401 },
        );
      }

      const sessionToken = await signToken(photographer.id);

      await db.photographer.update({
        where: { id: photographer.id },
        data: {
          sessionToken,
          otpCode: null,
          otpExpiresAt: null,
        },
      });

      // Set session cookie + return token
      const response = NextResponse.json({
        photographerId: photographer.id,
        sessionToken,
      });

      response.cookies.set('photographer_session', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60, // 7 days
        path: '/',
      });

      return response;
    }

    // Step 1: Send OTP
    const newOtp = generateOTPCode();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await db.photographer.update({
      where: { id: photographer.id },
      data: { otpCode: newOtp, otpExpiresAt },
    });

    const destination = phone ?? email!;
    await sendOTP(destination, newOtp);

    return NextResponse.json({
      message: 'OTP sent',
      photographerId: photographer.id,
      ...(process.env.NODE_ENV !== 'production' && { devOtp: newOtp }),
    });
  } catch (err) {
    console.error('[POST /api/auth/photographer/login]', err);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
