/**
 * POST /api/upload
 * Accepts multipart photo upload
 * Returns { fileUrl, resolutionWarning }
 * D-4: Low-resolution warning triggered on upload
 * BLOB_STORAGE_TOKEN: read from env (PRD §7) — Netlify Blobs
 */

import { NextRequest, NextResponse } from 'next/server';
import { checkResolution } from '@/lib/compositing';
import { savePhotoBlob } from '@/lib/blobs';

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('photo') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No photo file provided' }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Unsupported file type. Please upload JPG or PNG.' },
        { status: 400 },
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File too large. Maximum 20MB.' },
        { status: 400 },
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // D-4: Check resolution immediately on upload
    const resCheck = await checkResolution(buffer);

    // Store in Netlify Blobs (or fallback memory store)
    const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
    await savePhotoBlob(filename, buffer, file.type);

    // Resolve site origin dynamically so production never defaults to localhost
    const forwardedHost = req.headers.get('x-forwarded-host');
    const forwardedProto = req.headers.get('x-forwarded-proto') || 'https';
    const origin = forwardedHost ? `${forwardedProto}://${forwardedHost}` : req.nextUrl.origin;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || origin;

    const fileUrl = `${siteUrl}/api/blobs/${filename}`;

    return NextResponse.json({
      fileUrl,
      resolutionWarning: resCheck.resolutionWarning,
      warningMessage: resCheck.warningMessage,
      dimensions: { width: resCheck.width, height: resCheck.height },
    });
  } catch (err) {
    console.error('[POST /api/upload]', err);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
