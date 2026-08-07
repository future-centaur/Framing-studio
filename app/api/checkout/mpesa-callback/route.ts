/**
 * POST /api/checkout/mpesa-callback
 * Daraja payment confirmation callback
 * D-16: Called by Safaricom servers on payment outcome
 * IMPORTANT: This endpoint must be publicly reachable (Netlify deployment URL)
 */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { applyResaleDiscount, calculateCommission, getStudioCommissionRate, calculateTotalFromItems } from '@/lib/pricing';

interface DarajaCallbackBody {
  Body: {
    stkCallback: {
      MerchantRequestID: string;
      CheckoutRequestID: string;
      ResultCode: number;
      ResultDesc: string;
    };
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as DarajaCallbackBody;
    const { CheckoutRequestID, ResultCode, ResultDesc } = body.Body.stkCallback;

    // Find cart by mpesaCheckoutId
    const cart = await db.cart.findFirst({
      where: { mpesaCheckoutId: CheckoutRequestID },
      include: {
        orders: true,
        photographer: true,
      },
    });

    if (!cart) {
      console.error('[mpesa-callback] Cart not found for CheckoutRequestID:', CheckoutRequestID);
      // Acknowledge receipt to Daraja even if cart not found
      return NextResponse.json({ ResultCode: 0, ResultDesc: 'Acknowledged' });
    }

    if (ResultCode === 0) {
      // Payment successful
      await db.cart.update({
        where: { id: cart.id },
        data: { paymentStatus: 'CONFIRMED' },
      });

      // Write post-payment side effects
      const orderTotal = calculateTotalFromItems(cart.orders.map((o) => Number(o.priceSnapshotKES)));
      const discountRate = cart.photographer?.resaleDiscountRate
        ? Number(cart.photographer.resaleDiscountRate)
        : 13;

      if (cart.path === 'REFERRAL' && cart.photographerId) {
        const commissionRate = await getStudioCommissionRate();
        const { commissionAmountKES } = calculateCommission(orderTotal, commissionRate);

        await db.commissionLedgerEntry.upsert({
          where: { cartId: cart.id },
          update: { amountKES: commissionAmountKES },
          create: {
            photographerId: cart.photographerId,
            cartId: cart.id,
            amountKES: commissionAmountKES,
          },
        });
      }

      if (cart.path === 'RESALE') {
        const { discountAmountKES } = applyResaleDiscount(orderTotal, discountRate);
        await db.resaleDiscount.upsert({
          where: { cartId: cart.id },
          update: { discountRatePercent: discountRate, discountAmountKES },
          create: {
            cartId: cart.id,
            discountRatePercent: discountRate,
            discountAmountKES,
          },
        });
      }

      console.log(`[mpesa-callback] Payment confirmed for cart ${cart.id}`);
    } else {
      // Payment failed or cancelled
      await db.cart.update({
        where: { id: cart.id },
        data: { paymentStatus: 'REJECTED' },
      });

      console.log(`[mpesa-callback] Payment failed for cart ${cart.id}: ${ResultDesc}`);
    }

    // Acknowledge receipt to Daraja
    return NextResponse.json({ ResultCode: 0, ResultDesc: 'Acknowledged' });
  } catch (err) {
    console.error('[POST /api/checkout/mpesa-callback]', err);
    // Always return 200 to Daraja to prevent retries on our errors
    return NextResponse.json({ ResultCode: 0, ResultDesc: 'Acknowledged' });
  }
}
