/**
 * POST /api/cart
 * Input: { orderId?, path, photographerId? }
 * Output: Cart
 * D-15: path is set once and immutable — rejects if path conflicts with existing cart
 * A-13: DIRECT path = no photographer, no commission/discount/approval
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { CartPath } from '@prisma/client';
import { calculatePrice } from '@/lib/pricing';

const CartSchema = z.object({
  path: z.enum(['DIRECT', 'REFERRAL', 'RESALE']),
  photographerId: z.string().optional().nullable(),
  referralCode: z.string().optional().nullable(),
  // Order details to add at cart creation
  configurationId: z.string().optional().nullable(),
  mouldingId: z.string().optional().nullable(),
  matId: z.string().optional().nullable(),
  glazingId: z.string().optional().nullable(),
  mountId: z.string().optional().nullable(),
  existingCartId: z.string().optional().nullable(), // to add to existing cart
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = CartSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.issues },
        { status: 400 },
      );
    }

    const { path, photographerId, referralCode, configurationId, mouldingId, matId, glazingId, mountId, existingCartId } = parsed.data;

    // D-15: If adding to existing cart, verify path matches
    if (existingCartId) {
      const existingCart = await db.cart.findUnique({ where: { id: existingCartId } });
      if (!existingCart) {
        return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
      }
      if (existingCart.path !== path) {
        return NextResponse.json(
          { error: `Path conflict: this cart is ${existingCart.path}, cannot add ${path} item. D-15: one cart = one path.` },
          { status: 409 },
        );
      }

      // Add order to existing cart
      if (configurationId && mouldingId && matId && glazingId) {
        const priceResult = await calculatePrice({ mouldingId, matId, glazingId, mountId });
        await db.order.create({
          data: {
            configurationId,
            priceSnapshotKES: priceResult.totalKES,
            cartId: existingCartId,
          },
        });
      }

      const updatedCart = await db.cart.findUnique({
        where: { id: existingCartId },
        include: { orders: { include: { configuration: true } }, approval: true },
      });

      return NextResponse.json(updatedCart);
    }

    // Create new cart
    const cartData: Record<string, unknown> = {
      path: path as CartPath,
      photographerId: photographerId ?? null,
      referralCode: referralCode ?? null,
    };

    const cart = await db.cart.create({ data: cartData as Parameters<typeof db.cart.create>[0]['data'] });

    // Add initial order if provided
    if (configurationId && mouldingId && matId && glazingId) {
      const priceResult = await calculatePrice({ mouldingId, matId, glazingId, mountId });
      await db.order.create({
        data: {
          configurationId,
          priceSnapshotKES: priceResult.totalKES,
          cartId: cart.id,
        },
      });
    }

    // Create Approval record for photographer-originated carts (both REFERRAL and RESALE)
    if (path !== 'DIRECT') {
      await db.approval.create({
        data: { cartId: cart.id, status: 'PENDING' },
      });
    }

    const fullCart = await db.cart.findUnique({
      where: { id: cart.id },
      include: { orders: { include: { configuration: true } }, approval: true },
    });

    return NextResponse.json(fullCart, { status: 201 });
  } catch (err) {
    console.error('[POST /api/cart]', err);
    return NextResponse.json({ error: 'Failed to create cart' }, { status: 500 });
  }
}
