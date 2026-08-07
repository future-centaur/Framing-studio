/**
 * GET /api/studio-config — public read
 * PUT /api/studio-config — admin update (studio-side operation)
 * A-11, D-11: Single config point — never hardcoded in templates
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const config = await db.studioConfig.findUnique({ where: { id: 1 } });
    if (!config) {
      return NextResponse.json({ error: 'Studio config not found' }, { status: 404 });
    }
    return NextResponse.json(config);
  } catch (err) {
    console.error('[GET /api/studio-config]', err);
    return NextResponse.json({ error: 'Failed to load studio config' }, { status: 500 });
  }
}

const StudioConfigUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  logoUrl: z.string().url().optional(),
  commissionRatePercent: z.number().min(0).max(100).optional(),
  brandAccentColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
});

export async function PUT(req: NextRequest) {
  try {
    // Admin-only: in production this would check an admin token/role.
    // For now, accept a shared admin secret from the Authorization header.
    const adminSecret = process.env.ADMIN_SECRET;
    if (adminSecret) {
      const authHeader = req.headers.get('authorization');
      if (authHeader !== `Bearer ${adminSecret}`) {
        return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
      }
    }

    const body = await req.json();
    const parsed = StudioConfigUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.issues },
        { status: 400 },
      );
    }

    const updated = await db.studioConfig.upsert({
      where: { id: 1 },
      update: parsed.data,
      create: {
        id: 1,
        name: parsed.data.name ?? 'Hollow & Hale',
        logoUrl: parsed.data.logoUrl ?? '/logo-placeholder.svg',
        commissionRatePercent: parsed.data.commissionRatePercent ?? 10,
        brandAccentColor: parsed.data.brandAccentColor ?? '#c8a96e',
      },
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error('[PUT /api/studio-config]', err);
    return NextResponse.json({ error: 'Failed to update studio config' }, { status: 500 });
  }
}
