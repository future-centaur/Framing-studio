/**
 * GET /api/scenes — public; returns active curated scene library
 * POST /api/scenes — admin-only; creates a new scene
 *
 * A-9, D-14: curated static library, admin-manageable (A-11 pattern)
 * D-5 extension: no auth required to read scenes
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const scenes = await db.scene.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
      select: {
        id: true,
        name: true,
        description: true,
        imageUrl: true,
        sortOrder: true,
      },
    });
    return NextResponse.json(scenes);
  } catch (err) {
    console.error('[GET /api/scenes]', err);
    return NextResponse.json({ error: 'Failed to load scenes' }, { status: 500 });
  }
}

const SceneCreateSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  imageUrl: z.string().url(),
  sortOrder: z.number().int().optional(),
});

export async function POST(req: NextRequest) {
  // Admin-only — same guard as /api/studio-config (A-11 pattern)
  const adminSecret = process.env.ADMIN_SECRET;
  if (adminSecret) {
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${adminSecret}`) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }
  }

  try {
    const body = await req.json();
    const parsed = SceneCreateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input', details: parsed.error.issues }, { status: 400 });
    }

    const scene = await db.scene.create({ data: parsed.data });
    return NextResponse.json(scene, { status: 201 });
  } catch (err) {
    console.error('[POST /api/scenes]', err);
    return NextResponse.json({ error: 'Failed to create scene' }, { status: 500 });
  }
}
