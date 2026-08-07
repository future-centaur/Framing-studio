/**
 * GET /api/mockup/[id]
 * Returns Mockup with before-image (raw photo) and after-image (composite).
 *
 * A-9, D-5: No authentication required — extends D-5's shareable-link pattern to Mockups.
 * Before = configuration.fileUrl (raw upload)
 * After  = mockup.mockupImageUrl (composited into scene)
 */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const mockup = await db.mockup.findUnique({
      where: { id },
      include: {
        configuration: {
          include: {
            moulding: true,
            mat: true,
            glazing: true,
            mount: true,
          },
        },
        scene: true,
      },
    });

    if (!mockup) {
      return NextResponse.json({ error: 'Mockup not found' }, { status: 404 });
    }

    return NextResponse.json({
      id: mockup.id,
      configurationId: mockup.configurationId,
      sceneId: mockup.sceneId,
      placement: {
        x: mockup.placementX,
        y: mockup.placementY,
        scale: mockup.placementScale,
      },
      // Before/after payload (D-17)
      beforeImageUrl: mockup.configuration.fileUrl,
      afterImageUrl: mockup.mockupImageUrl,
      // Enough configuration context for the handoff button label
      configuration: {
        id: mockup.configuration.id,
        moulding: { id: mockup.configuration.mouldingId, name: mockup.configuration.moulding.name },
        mat: { id: mockup.configuration.matId, name: mockup.configuration.mat.name },
        glazing: { id: mockup.configuration.glazingId, name: mockup.configuration.glazing.name },
        mount: mockup.configuration.mount
          ? { id: mockup.configuration.mountId, name: mockup.configuration.mount.name }
          : null,
      },
      scene: {
        id: mockup.scene.id,
        name: mockup.scene.name,
        imageUrl: mockup.scene.imageUrl,
      },
    });
  } catch (err) {
    console.error('[GET /api/mockup/:id]', err);
    return NextResponse.json({ error: 'Failed to load mockup' }, { status: 500 });
  }
}
