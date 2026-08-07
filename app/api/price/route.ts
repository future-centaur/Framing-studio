/**
 * POST /api/price
 * Input: { mouldingId, matId, glazingId, mountId? }
 * Output: { totalKES, breakdown }
 * D-3: Live running total
 * D-13: All amounts in KES
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { calculatePrice } from '@/lib/pricing';

const PriceSchema = z.object({
  mouldingId: z.string().min(1),
  matId: z.string().min(1),
  glazingId: z.string().min(1),
  mountId: z.string().optional().nullable(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = PriceSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.issues },
        { status: 400 },
      );
    }

    const result = await calculatePrice(parsed.data);

    return NextResponse.json(result);
  } catch (err) {
    console.error('[POST /api/price]', err);
    return NextResponse.json({ error: 'Price calculation failed' }, { status: 500 });
  }
}
