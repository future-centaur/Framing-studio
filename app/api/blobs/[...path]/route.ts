/**
 * GET /api/blobs/[...path]
 * Proxies requested uploaded photos from private Netlify Blobs storage.
 * Serves them as inline images securely.
 */

import { NextRequest, NextResponse } from 'next/server';
import { getPhotoBlob } from '@/lib/blobs';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  try {
    const { path } = await params;
    const key = path.join('/');

    const photo = await getPhotoBlob(key);
    if (!photo) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    return new NextResponse(new Uint8Array(photo.buffer), {
      headers: {
        'Content-Type': photo.contentType || 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (err) {
    console.error('[GET /api/blobs/:path]', err);
    return NextResponse.json({ error: 'Failed to retrieve asset' }, { status: 500 });
  }
}
