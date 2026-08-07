/**
 * POST /api/mockup
 * Input: { configurationId, sceneId, placement? }
 * Output: { mockupId, mockupImageUrl }
 *
 * A-9: Mockup creation for both clients and photographers
 * D-2: Calls the SAME compositing service as /api/preview — not a separate implementation.
 *      If /api/preview and POST /api/mockup ever produce visually different results
 *      for the same Configuration, that is a bug.
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { compositeMockup } from '@/lib/compositing';

const PlacementSchema = z.object({
  x: z.number().min(0).max(1).optional().default(0.5),
  y: z.number().min(0).max(1).optional().default(0.5),
  scale: z.number().min(0.05).max(1).optional().default(0.4),
});

const MockupCreateSchema = z.object({
  configurationId: z.string().min(1),
  sceneId: z.string().min(1),
  placement: PlacementSchema.optional(),
});

// Visual colour maps — same as /api/preview (D-2: must stay in sync)
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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = MockupCreateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.issues },
        { status: 400 },
      );
    }

    const { configurationId, sceneId, placement } = parsed.data;
    const px = placement?.x ?? 0.5;
    const py = placement?.y ?? 0.5;
    const ps = placement?.scale ?? 0.4;

    // Load configuration + scene
    const [configuration, scene] = await Promise.all([
      db.configuration.findUnique({
        where: { id: configurationId },
        include: {
          moulding: true,
          mat: true,
          glazing: true,
          mount: true,
        },
      }),
      db.scene.findUnique({ where: { id: sceneId } }),
    ]);

    if (!configuration) {
      return NextResponse.json({ error: 'Configuration not found' }, { status: 404 });
    }
    if (!scene) {
      return NextResponse.json({ error: 'Scene not found' }, { status: 404 });
    }
    if (!scene.isActive) {
      return NextResponse.json({ error: 'Scene is not active' }, { status: 400 });
    }

    // Call the SAME compositing engine used by /api/preview (D-2)
    const result = await compositeMockup({
      compositeInput: {
        fileUrl: configuration.fileUrl,
        mouldingColor: MOULDING_COLORS[configuration.moulding.name] ?? '#3d2b1f',
        matColor: MAT_COLORS[configuration.mat.name] ?? '#f5f0e8',
        glazingTier: configuration.glazing.tier,
        mountType: configuration.mount?.name?.includes('Float') ? 'FLOAT' : 'STANDARD',
      },
      sceneImageUrl: scene.imageUrl,
      placementX: px,
      placementY: py,
      placementScale: ps,
    });

    // Persist mockup record
    const mockup = await db.mockup.create({
      data: {
        configurationId,
        sceneId,
        placementX: px,
        placementY: py,
        placementScale: ps,
        mockupImageUrl: result.mockupImageUrl,
      },
    });

    return NextResponse.json({
      mockupId: mockup.id,
      mockupImageUrl: mockup.mockupImageUrl,
      resolutionWarning: result.resolutionWarning,
      warningMessage: result.warningMessage,
    });
  } catch (err) {
    console.error('[POST /api/mockup]', err);
    return NextResponse.json({ error: 'Mockup creation failed' }, { status: 500 });
  }
}
