/**
 * POST /api/preview
 * Input: { fileUrl, mouldingId, matId, glazingId, mountId? }
 * Output: { previewImageUrl }
 * D-2: Composites client's own photo (not stock image)
 * D-10: mountId is optional — no default injected server-side
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { compositePreview } from '@/lib/compositing';
import { db } from '@/lib/db';

const PreviewSchema = z.object({
  fileUrl: z.string().min(1),
  mouldingId: z.string().min(1),
  matId: z.string().min(1),
  glazingId: z.string().min(1),
  mountId: z.string().optional().nullable(), // D-10: optional, never defaulted
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = PreviewSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.issues },
        { status: 400 },
      );
    }

    const { fileUrl, mouldingId, matId, glazingId, mountId } = parsed.data;

    // Fetch catalog items to get visual properties for compositing
    const [moulding, mat, glazing, mount] = await Promise.all([
      db.catalogItem.findUnique({ where: { id: mouldingId } }),
      db.catalogItem.findUnique({ where: { id: matId } }),
      db.catalogItem.findUnique({ where: { id: glazingId } }),
      mountId ? db.catalogItem.findUnique({ where: { id: mountId } }) : null,
    ]);

    if (!moulding) return NextResponse.json({ error: 'Moulding not found' }, { status: 404 });
    if (!mat) return NextResponse.json({ error: 'Mat not found' }, { status: 404 });
    if (!glazing) return NextResponse.json({ error: 'Glazing not found' }, { status: 404 });

    // Map tier names to hex colors for preview compositing
    // These are visual approximations — the actual physical color comes from the catalog item
    const MOULDING_COLORS: Record<string, string> = {
      'Classic Walnut': '#4a2c17',
      'Oak Natural': '#c8a05a',
      'Brushed Aluminium': '#a0a5a8',
      'Museum Ebony': '#1a1a1a',
    };
    const MAT_COLORS: Record<string, string> = {
      'White Standard Mat': '#f8f4ee',
      'Ivory Alpha-Cellulose Mat': '#f2ead8',
      'Cotton Rag Archival Mat': '#eee7d5',
    };

    const result = await compositePreview({
      fileUrl,
      mouldingColor: MOULDING_COLORS[moulding.name] ?? '#3d2b1f',
      matColor: MAT_COLORS[mat.name] ?? '#f5f0e8',
      glazingTier: glazing.tier,
      mountType: mount?.name.includes('Float') ? 'FLOAT' : 'STANDARD',
    });

    return NextResponse.json({ previewImageUrl: result.previewImageUrl });
  } catch (err) {
    console.error('[POST /api/preview]', err);
    return NextResponse.json({ error: 'Preview generation failed' }, { status: 500 });
  }
}
