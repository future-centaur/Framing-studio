/**
 * GET /api/metrics/conversion
 * Admin-only: returns { startedCount, completedCount, rate }
 * E-3: Dual success metric
 * Optional query params: startDate, endDate (ISO strings)
 */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { ConversionEventType } from '@prisma/client';

export async function GET(req: NextRequest) {
  try {
    // Admin-only check
    const adminSecret = process.env.ADMIN_SECRET;
    if (adminSecret) {
      const authHeader = req.headers.get('authorization');
      if (authHeader !== `Bearer ${adminSecret}`) {
        return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
      }
    }

    const { searchParams } = new URL(req.url);
    const startDateStr = searchParams.get('startDate');
    const endDateStr = searchParams.get('endDate');

    const dateFilter = startDateStr || endDateStr
      ? {
          createdAt: {
            ...(startDateStr ? { gte: new Date(startDateStr) } : {}),
            ...(endDateStr ? { lte: new Date(endDateStr) } : {}),
          },
        }
      : {};

    const [startedCount, completedCount] = await Promise.all([
      db.conversionEvent.count({
        where: { type: ConversionEventType.CONFIGURATION_STARTED, ...dateFilter },
      }),
      db.conversionEvent.count({
        where: { type: ConversionEventType.CONFIGURATION_COMPLETED, ...dateFilter },
      }),
    ]);

    const rate = startedCount > 0 ? (completedCount / startedCount) * 100 : 0;

    return NextResponse.json({
      startedCount,
      completedCount,
      rate: Math.round(rate * 100) / 100, // 2 decimal places
      period: {
        startDate: startDateStr ?? 'all time',
        endDate: endDateStr ?? 'now',
      },
    });
  } catch (err) {
    console.error('[GET /api/metrics/conversion]', err);
    return NextResponse.json({ error: 'Failed to load metrics' }, { status: 500 });
  }
}
