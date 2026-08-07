/**
 * POST /api/mockup/[id]/start-order
 * Output: { configureUrl: "/configure?design=<configurationId>" }
 *
 * A-9 Option A handoff: carries the exact Configuration into slice 1's /configure route,
 * pre-filled. Creates NO new Order, Cart, or checkout entity — slice 1 owns everything
 * from this point forward.
 */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const mockup = await db.mockup.findUnique({
      where: { id },
      select: { configurationId: true },
    });

    if (!mockup) {
      return NextResponse.json({ error: 'Mockup not found' }, { status: 404 });
    }

    // The handoff URL pre-fills the slice-1 configurator with this exact Configuration.
    // No Order/Cart is created here — slice 1 owns the checkout from this point forward.
    const configureUrl = `/configure?design=${mockup.configurationId}`;

    return NextResponse.json({ configureUrl });
  } catch (err) {
    console.error('[POST /api/mockup/:id/start-order]', err);
    return NextResponse.json({ error: 'Start-order handoff failed' }, { status: 500 });
  }
}
