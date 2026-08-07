/**
 * POST /api/orders/[cartId]/approve
 * Updates Approval status for a photographer-originated cart
 * resolved former C-6: applies to both REFERRAL and RESALE paths
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { ApprovalStatus } from '@prisma/client';

const ApproveSchema = z.object({
  status: z.enum(['APPROVED', 'REJECTED']).optional().default('APPROVED'),
});

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ cartId: string }> },
) {
  try {
    const { cartId } = await params;
    const body = await req.json().catch(() => ({}));
    const parsed = ApproveSchema.safeParse(body);
    const status = parsed.success ? parsed.data.status : 'APPROVED';

    const cart = await db.cart.findUnique({
      where: { id: cartId },
      include: { approval: true },
    });

    if (!cart) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
    }

    if (cart.path === 'DIRECT') {
      return NextResponse.json(
        { error: 'Direct path carts do not require approval' },
        { status: 400 },
      );
    }

    if (!cart.approval) {
      return NextResponse.json(
        { error: 'No approval record found for this cart' },
        { status: 404 },
      );
    }

    const updatedApproval = await db.approval.update({
      where: { cartId },
      data: { status: status as ApprovalStatus },
    });

    return NextResponse.json(updatedApproval);
  } catch (err) {
    console.error('[POST /api/orders/:cartId/approve]', err);
    return NextResponse.json({ error: 'Approval update failed' }, { status: 500 });
  }
}
