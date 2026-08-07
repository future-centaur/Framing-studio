/**
 * GET /api/photographer/dashboard
 * Auth-gated: own commission + discount totals only
 * A-10, D-9: photographer-scoped only — never other photographers' or client data
 */

import { NextRequest, NextResponse } from 'next/server';
import { requirePhotographerAuth } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { photographerId } = await requirePhotographerAuth(req);

    // Fetch own commission entries (REFERRAL path earnings)
    const commissionEntries = await db.commissionLedgerEntry.findMany({
      where: { photographerId },
      orderBy: { createdAt: 'desc' },
      include: {
        cart: {
          select: {
            id: true,
            createdAt: true,
            paymentStatus: true,
            orders: { select: { priceSnapshotKES: true } },
          },
        },
      },
    });

    // Fetch resale discount totals (from carts this photographer placed)
    const resaleDiscounts = await db.resaleDiscount.findMany({
      where: {
        cart: { photographerId },
      },
      include: {
        cart: {
          select: {
            id: true,
            createdAt: true,
            paymentStatus: true,
          },
        },
      },
    });

    // Fetch referral links
    const referralLinks = await db.referralLink.findMany({
      where: { photographerId },
      orderBy: { createdAt: 'desc' },
    });

    const photographer = await db.photographer.findUnique({
      where: { id: photographerId },
      select: { id: true, phone: true, email: true, resaleDiscountRate: true, createdAt: true },
    });

    // Totals
    const totalCommissionKES = commissionEntries.reduce(
      (sum, e) => sum + Number(e.amountKES),
      0,
    );
    const totalDiscountSavedKES = resaleDiscounts.reduce(
      (sum, d) => sum + Number(d.discountAmountKES),
      0,
    );

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

    return NextResponse.json({
      photographer,
      summary: {
        totalCommissionKES,    // KES earned from referrals
        totalDiscountSavedKES, // KES saved on resale orders
        referralCount: referralLinks.length,
        pendingCommissions: commissionEntries.filter(
          (e) => e.cart.paymentStatus !== 'CONFIRMED',
        ).length,
      },
      commissionEntries,
      resaleDiscounts,
      referralLinks: referralLinks.map((l) => ({
        ...l,
        url: `${siteUrl}/r/${l.code}`,
      })),
    });
  } catch (err) {
    if (err instanceof Response) return err;
    console.error('[GET /api/photographer/dashboard]', err);
    return NextResponse.json({ error: 'Failed to load dashboard' }, { status: 500 });
  }
}
