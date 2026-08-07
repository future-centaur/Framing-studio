/**
 * GET /api/design-link/[id]
 * Returns a saved Configuration by ID
 * D-5: No account required to retrieve
 */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const configuration = await db.configuration.findUnique({
      where: { id },
      include: {
        moulding: true,
        mat: true,
        glazing: true,
        mount: true,
      },
    });

    if (!configuration) {
      return NextResponse.json({ error: 'Design not found' }, { status: 404 });
    }

    return NextResponse.json(configuration);
  } catch (err) {
    console.error('[GET /api/design-link/:id]', err);
    return NextResponse.json({ error: 'Failed to retrieve design' }, { status: 500 });
  }
}
