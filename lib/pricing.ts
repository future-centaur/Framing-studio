/**
 * lib/pricing.ts
 * KES pricing, commission/discount logic
 * D-3: live running total
 * D-13: all amounts in KES
 * A-7: 13% default resale discount, studio-adjustable per photographer
 * commissionRatePercent: 10% default (user-confirmed), stored in StudioConfig
 */

import { db } from '@/lib/db';

export interface PriceBreakdown {
  mouldingKES: number;
  matKES: number;
  glazingKES: number;
  mountKES: number;
  subtotalKES: number;
}

export interface PriceResult {
  totalKES: number;
  breakdown: PriceBreakdown;
}

export interface DiscountResult {
  originalKES: number;
  discountRatePercent: number;
  discountAmountKES: number;
  finalKES: number;
}

export interface CommissionResult {
  totalKES: number;
  commissionRatePercent: number;
  commissionAmountKES: number;
}

/**
 * Calculate total price from catalog item IDs.
 * Fetches prices from DB to ensure up-to-date catalog pricing.
 */
export async function calculatePrice(selections: {
  mouldingId: string;
  matId: string;
  glazingId: string;
  mountId?: string | null;
}): Promise<PriceResult> {
  const ids = [selections.mouldingId, selections.matId, selections.glazingId];
  if (selections.mountId) ids.push(selections.mountId);

  const items = await db.catalogItem.findMany({
    where: { id: { in: ids } },
    select: { id: true, priceKES: true, type: true },
  });

  const getPrice = (id: string): number => {
    const item = items.find((i) => i.id === id);
    return item ? Number(item.priceKES) : 0;
  };

  const mouldingKES = getPrice(selections.mouldingId);
  const matKES = getPrice(selections.matId);
  const glazingKES = getPrice(selections.glazingId);
  const mountKES = selections.mountId ? getPrice(selections.mountId) : 0;
  const subtotalKES = mouldingKES + matKES + glazingKES + mountKES;

  return {
    totalKES: subtotalKES,
    breakdown: { mouldingKES, matKES, glazingKES, mountKES, subtotalKES },
  };
}

/**
 * Calculate price from raw KES values (for cart totals across multiple orders).
 */
export function calculateTotalFromItems(itemPrices: number[]): number {
  return itemPrices.reduce((sum, p) => sum + p, 0);
}

/**
 * Apply resale wholesale discount to a cart total.
 * A-7: 13% default, studio-adjustable per photographer (D-13: KES)
 */
export function applyResaleDiscount(
  totalKES: number,
  discountRatePercent: number,
): DiscountResult {
  const discountAmountKES = Math.round((totalKES * discountRatePercent) / 100);
  return {
    originalKES: totalKES,
    discountRatePercent,
    discountAmountKES,
    finalKES: totalKES - discountAmountKES,
  };
}

/**
 * Calculate referral commission earned by photographer.
 * commissionRatePercent comes from StudioConfig.commissionRatePercent (default 10%)
 */
export function calculateCommission(
  totalKES: number,
  commissionRatePercent: number,
): CommissionResult {
  const commissionAmountKES = Math.round((totalKES * commissionRatePercent) / 100);
  return {
    totalKES,
    commissionRatePercent,
    commissionAmountKES,
  };
}

/**
 * Helper: get the studio's commission rate from config.
 */
export async function getStudioCommissionRate(): Promise<number> {
  const config = await db.studioConfig.findUnique({ where: { id: 1 } });
  return config ? Number(config.commissionRatePercent) : 10;
}
