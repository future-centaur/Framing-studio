/**
 * PATCH /api/mockup/[id]/placement
 * Input:  { placement: { x, y, scale, rotateY?, rotateX? } }
 * Output: { mockupId, placement }
 *
 * D-17: Saves updated placement coordinates.
 * NOTE: This route intentionally does NOT re-composite the image.
 * Repositioning is handled client-side (CSS layer approach in PlacementCanvas).
 * Re-compositing only happens at POST /api/mockup time (scene selection).
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';

const PlacementPatchSchema = z.object({
  placement: z.object({
    x: z.number().min(0).max(1),
    y: z.number().min(0).max(1),
    scale: z.number().min(0.05).max(1),
    rotateY: z.number().min(-45).max(45).optional().default(0),
    rotateX: z.number().min(-30).max(30).optional().default(0),
  }),
});

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

    const updated = await db.mockup.update({
      where: { id },
      data: {
        placementX: x,
        placementY: y,
        placementScale: scale,
        placementRotateY: rotateY,
        placementRotateX: rotateX,
        // mockupImageUrl intentionally not updated — client renders position via CSS
      },
    });

    return NextResponse.json({
      mockupId: updated.id,
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
