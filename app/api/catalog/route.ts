/**
 * GET /api/catalog
 * Returns CatalogItem[] optionally filtered by tier
 * D-1: catalog is data-driven, taggable by tier
 */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { Tier, CatalogItemType } from '@prisma/client';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const tierParam = searchParams.get('tier')?.toUpperCase();
    const typeParam = searchParams.get('type')?.toUpperCase();

    const where: Record<string, unknown> = {};
    if (tierParam && Object.values(Tier).includes(tierParam as Tier)) {
      where.tier = tierParam as Tier;
    }
    if (typeParam && Object.values(CatalogItemType).includes(typeParam as CatalogItemType)) {
      where.type = typeParam as CatalogItemType;
    }

    const items = await db.catalogItem.findMany({
      where,
      orderBy: [{ type: 'asc' }, { priceKES: 'asc' }],
    });

    return NextResponse.json(items);
  } catch (err) {
    console.error('[GET /api/catalog]', err);
    return NextResponse.json({ error: 'Failed to fetch catalog' }, { status: 500 });
  }
}
