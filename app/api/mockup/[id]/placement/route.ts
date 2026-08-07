/**
 * PATCH /api/mockup/[id]/placement
 * Input: { placement: { x, y, scale } }
 * Output: { mockupImageUrl }
 *
 * D-17: Adjustable placement (move/scale) triggers re-composite using same engine.
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { compositeMockup } from '@/lib/compositing';

const PlacementPatchSchema = z.object({
  placement: z.object({
    x: z.number().min(0).max(1),
    y: z.number().min(0).max(1),
    scale: z.number().min(0.05).max(1),
    rotateY: z.number().min(-45).max(45).optional().default(0),
    rotateX: z.number().min(-30).max(30).optional().default(0),
  }),
});

// Visual colour maps — kept in sync with /api/preview and /api/mockup (D-2)
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

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const parsed = PlacementPatchSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.issues },
        { status: 400 },
      );
    }

    const { x, y, scale, rotateY = 0, rotateX = 0 } = parsed.data.placement;

    const mockup = await db.mockup.findUnique({
      where: { id },
      include: {
        configuration: { include: { moulding: true, mat: true, glazing: true, mount: true } },
        scene: true,
      },
    });

    if (!mockup) {
      return NextResponse.json({ error: 'Mockup not found' }, { status: 404 });
    }

    // Re-composite with updated placement (same engine — D-2)
    const result = await compositeMockup({
      compositeInput: {
        fileUrl: mockup.configuration.fileUrl,
        mouldingColor: MOULDING_COLORS[mockup.configuration.moulding.name] ?? '#3d2b1f',
        matColor: MAT_COLORS[mockup.configuration.mat.name] ?? '#f5f0e8',
        glazingTier: mockup.configuration.glazing.tier,
        mountType: mockup.configuration.mount?.name?.includes('Float') ? 'FLOAT' : 'STANDARD',
      },
      sceneImageUrl: mockup.scene.imageUrl,
      placementX: x,
      placementY: y,
      placementScale: scale,
    });

    const updated = await db.mockup.update({
      where: { id },
      data: {
        placementX: x,
        placementY: y,
        placementScale: scale,
        placementRotateY: rotateY,
        placementRotateX: rotateX,
        mockupImageUrl: result.mockupImageUrl,
      },
    });

    return NextResponse.json({
      mockupId: updated.id,
      mockupImageUrl: updated.mockupImageUrl,
      placement: {
        x: updated.placementX,
        y: updated.placementY,
        scale: updated.placementScale,
        rotateY: updated.placementRotateY,
        rotateX: updated.placementRotateX,
      },
    });
  } catch (err) {
    console.error('[PATCH /api/mockup/:id/placement]', err);
    return NextResponse.json({ error: 'Placement update failed' }, { status: 500 });
  }
}
