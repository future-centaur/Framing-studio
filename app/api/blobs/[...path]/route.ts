/**
 * GET /api/blobs/[...path]
 * Proxies requested uploaded photos from private Netlify Blobs storage.
 * Serves them as inline images securely.
 */

import { NextRequest, NextResponse } from 'next/server';
import { getStore } from '@netlify/blobs';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  try {
    const { path } = await params;
    const key = path.join('/');

    if (!process.env.BLOB_STORAGE_TOKEN || !process.env.NETLIFY_SITE_ID) {
      return NextResponse.json(
        { error: 'Blob storage is not configured' },
        { status: 501 },
      );
    }

    const store = getStore({
      name: 'photos',
      token: process.env.BLOB_STORAGE_TOKEN,
      siteID: process.env.NETLIFY_SITE_ID,
    });

    const data = await store.get(key, { type: 'arrayBuffer' });
    if (!data) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    return new NextResponse(data, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (err) {
    console.error('[GET /api/blobs/:path]', err);
    return NextResponse.json({ error: 'Failed to retrieve asset' }, { status: 500 });
  }
}
