/**
 * POST /api/checkout
 * Input: { cartId, mpesaPhone }
 * Initiates M-Pesa STK push via Daraja API (mocked with DARAJA_MOCK=true)
 * On success: writes CommissionLedgerEntry (referral) or ResaleDiscount (resale)
 * Triggers Approval if photographer-originated
 * D-16: M-Pesa via Daraja
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { applyResaleDiscount, calculateCommission, getStudioCommissionRate, calculateTotalFromItems } from '@/lib/pricing';

const CheckoutSchema = z.object({
  cartId: z.string().min(1),
  mpesaPhone: z.string().min(9), // E.164 or local Kenyan format
});

// ─────────────────────────────────────────
// Daraja M-Pesa STK Push helper
// D-16: real credentials from env; mock when DARAJA_MOCK=true
// ─────────────────────────────────────────
async function getDarajaToken(): Promise<string> {
  const key = process.env.DARAJA_CONSUMER_KEY!;
  const secret = process.env.DARAJA_CONSUMER_SECRET!;
  const credentials = Buffer.from(`${key}:${secret}`).toString('base64');

  const res = await fetch(
    'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
    { headers: { Authorization: `Basic ${credentials}` } },
  );
  const data = await res.json() as { access_token: string };
  return data.access_token;
}

async function initiateStkPush(params: {
  phone: string;
  amountKES: number;
  cartId: string;
  token: string;
}): Promise<{ CheckoutRequestID: string; ResponseCode: string }> {
  const { phone, amountKES, cartId, token } = params;
  const shortcode = process.env.DARAJA_SHORTCODE!;
  const passkey = process.env.DARAJA_PASSKEY!;
  const callbackUrl = process.env.DARAJA_CALLBACK_URL!;

  const timestamp = new Date()
    .toISOString()
    .replace(/[-T:.Z]/g, '')
    .slice(0, 14);

  const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString('base64');

  // Normalize phone number to 254...
  const normalizedPhone = phone.startsWith('+')
    ? phone.slice(1)
    : phone.startsWith('0')
    ? `254${phone.slice(1)}`
    : phone;

  const body = {
    BusinessShortCode: shortcode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: 'CustomerPayBillOnline',
    Amount: Math.ceil(amountKES),
    PartyA: normalizedPhone,
    PartyB: shortcode,
    PhoneNumber: normalizedPhone,
    CallBackURL: callbackUrl,
    AccountReference: `ORDER-${cartId.slice(0, 8).toUpperCase()}`,
    TransactionDesc: 'Framing Order Payment',
  };

  const res = await fetch(
    'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  );

  return res.json() as Promise<{ CheckoutRequestID: string; ResponseCode: string }>;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = CheckoutSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.issues },
        { status: 400 },
      );
    }

    const { cartId, mpesaPhone } = parsed.data;

    const cart = await db.cart.findUnique({
      where: { id: cartId },
      include: {
        orders: true,
        photographer: true,
        approval: true,
      },
    });

    if (!cart) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
    }

    if (cart.paymentStatus === 'CONFIRMED') {
      return NextResponse.json({ error: 'Cart already paid' }, { status: 409 });
    }

    // Calculate total from price snapshots
    const orderTotal = calculateTotalFromItems(cart.orders.map((o) => Number(o.priceSnapshotKES)));

    // Apply discount or commission based on path
    let chargeAmount = orderTotal;
    let discountApplied: number | null = null;
    const discountRate = cart.photographer?.resaleDiscountRate
      ? Number(cart.photographer.resaleDiscountRate)
      : 13;

    if (cart.path === 'RESALE') {
      const discountResult = applyResaleDiscount(orderTotal, discountRate);
      chargeAmount = discountResult.finalKES;
      discountApplied = discountResult.discountAmountKES;
    }

    // ── M-Pesa STK Push ────────────────────────────────────────────────────
    let checkoutRequestId: string;

    if (process.env.DARAJA_MOCK === 'true') {
      // Mock mode: auto-confirm, no real API call
      console.log(
        `[DARAJA MOCK] STK push to ${mpesaPhone} for KES ${chargeAmount} (cart: ${cartId})`,
      );
      checkoutRequestId = `mock-${Date.now()}`;

      // Immediately simulate successful payment in mock mode
      await db.cart.update({
        where: { id: cartId },
        data: {
          mpesaCheckoutId: checkoutRequestId,
          paymentStatus: 'CONFIRMED',
        },
      });

      // Write side effects for confirmed payment
      await handlePaymentConfirmed(cart, orderTotal, discountRate, discountApplied);

      return NextResponse.json({
        status: 'CONFIRMED',
        message: '[MOCK] Payment confirmed automatically',
        checkoutRequestId,
        chargeAmountKES: chargeAmount,
      });
    }

    // Real Daraja STK push
    const token = await getDarajaToken();
    const stkResult = await initiateStkPush({
      phone: mpesaPhone,
      amountKES: chargeAmount,
      cartId,
      token,
    });

    if (stkResult.ResponseCode !== '0') {
      return NextResponse.json(
        { error: 'M-Pesa STK push failed', details: stkResult },
        { status: 502 },
      );
    }

    checkoutRequestId = stkResult.CheckoutRequestID;

    await db.cart.update({
      where: { id: cartId },
      data: {
        mpesaCheckoutId: checkoutRequestId,
        paymentStatus: 'PENDING',
      },
    });

    return NextResponse.json({
      status: 'PENDING',
      message: 'STK push sent to your phone. Enter M-Pesa PIN to confirm.',
      checkoutRequestId,
      chargeAmountKES: chargeAmount,
    });
  } catch (err) {
    console.error('[POST /api/checkout]', err);
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 });
  }
}

/**
 * Write post-payment side effects:
 * - CommissionLedgerEntry for REFERRAL carts
 * - ResaleDiscount record for RESALE carts
 * Both paths: Approval record already created at cart creation; update if auto-approving
 */
async function handlePaymentConfirmed(
  cart: { id: string; path: string; photographerId: string | null; photographer: { resaleDiscountRate: unknown } | null },
  orderTotal: number,
  discountRate: number,
  discountApplied: number | null,
) {
  if (cart.path === 'REFERRAL' && cart.photographerId) {
    const commissionRate = await getStudioCommissionRate();
    const commissionResult = calculateCommission(orderTotal, commissionRate);

    await db.commissionLedgerEntry.create({
      data: {
        photographerId: cart.photographerId,
        cartId: cart.id,
        amountKES: commissionResult.commissionAmountKES,
      },
    });
  }

  if (cart.path === 'RESALE' && discountApplied !== null) {
    await db.resaleDiscount.upsert({
      where: { cartId: cart.id },
      update: { discountRatePercent: discountRate, discountAmountKES: discountApplied },
      create: {
        cartId: cart.id,
        discountRatePercent: discountRate,
        discountAmountKES: discountApplied,
      },
    });
  }
}
