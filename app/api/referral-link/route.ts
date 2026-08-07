/**
 * POST /api/referral-link
 * Input: { photographerId } (auth required)
 * Output: { referralCode, url }
 * A-6: Generates a referral link attributing a cart to the photographer
 */

import { NextRequest, NextResponse } from 'next/server';
import { requirePhotographerAuth } from '@/lib/auth';
import { db } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { photographerId } = await requirePhotographerAuth(req);

    const referralLink = await db.referralLink.create({
      data: { photographerId },
    });

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
    const url = `${siteUrl}/r/${referralLink.code}`;

    return NextResponse.json({
      referralCode: referralLink.code,
      url,
    });
  } catch (err) {
    if (err instanceof Response) return err;
    console.error('[POST /api/referral-link]', err);
    return NextResponse.json({ error: 'Failed to generate referral link' }, { status: 500 });
  }
}
