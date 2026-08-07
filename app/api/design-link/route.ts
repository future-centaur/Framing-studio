/**
 * POST /api/design-link — save a configuration, returns { shareableId }
 * GET /api/design-link/[id] — retrieve saved configuration
 * D-5: No account creation required
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';

const DesignLinkSchema = z.object({
  fileUrl: z.string().min(1),
  mouldingId: z.string().min(1),
  matId: z.string().min(1),
  glazingId: z.string().min(1),
  mountId: z.string().optional().nullable(),
  sessionId: z.string().min(1),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = DesignLinkSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.issues },
        { status: 400 },
      );
    }

    const { fileUrl, mouldingId, matId, glazingId, mountId, sessionId } = parsed.data;

    const configuration = await db.configuration.create({
      data: {
        fileUrl,
        mouldingId,
        matId,
        glazingId,
        mountId: mountId ?? null,
        sessionId,
      },
    });

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

    return NextResponse.json({
      shareableId: configuration.id,
      shareableUrl: `${siteUrl}/configure?design=${configuration.id}`,
    });
  } catch (err) {
    console.error('[POST /api/design-link]', err);
    return NextResponse.json({ error: 'Failed to save design' }, { status: 500 });
  }
}
