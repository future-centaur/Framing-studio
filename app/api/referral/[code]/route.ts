/**
 * GET /api/referral/[code]
 * Resolves referral code → photographerId
 * Sets cart path=referral context (returned to client for state management)
 * A-6: Attributes a Cart to the referring photographer
 */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ code: string }> },
) {
  try {
    const { code } = await params;

    const referralLink = await db.referralLink.findUnique({
      where: { code },
      include: { photographer: { select: { id: true } } },
    });

    if (!referralLink) {
      return NextResponse.json({ error: 'Referral link not found' }, { status: 404 });
    }

    return NextResponse.json({
      photographerId: referralLink.photographerId,
      referralCode: code,
      cartPath: 'referral', // signal to client to set path=referral
    });
  } catch (err) {
    console.error('[GET /api/referral/:code]', err);
    return NextResponse.json({ error: 'Failed to resolve referral link' }, { status: 500 });
  }
}
