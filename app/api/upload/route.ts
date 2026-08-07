/**
 * POST /api/upload
 * Accepts multipart photo upload
 * Returns { fileUrl, resolutionWarning }
 * D-4: Low-resolution warning triggered on upload
 * BLOB_STORAGE_TOKEN: read from env (PRD §7) — Netlify Blobs
 */

import { NextRequest, NextResponse } from 'next/server';
import { checkResolution } from '@/lib/compositing';

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

    // Upload to Netlify Blobs
    const { getStore } = await import('@netlify/blobs');
    const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
    
    let fileUrl: string;
    
    if (process.env.BLOB_STORAGE_TOKEN && process.env.NETLIFY_SITE_ID) {
      // Real Netlify Blob storage
      const store = getStore({
        name: 'photos',
        token: process.env.BLOB_STORAGE_TOKEN,
        siteID: process.env.NETLIFY_SITE_ID,
      });
      await store.set(filename, new Blob([buffer]));
      
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
      fileUrl = `${siteUrl}/api/blobs/${filename}`;
    } else {
      // Dev mode: store as base64 data URL (not for production)
      console.warn('[upload] BLOB_STORAGE_TOKEN not set — using base64 fallback for dev');
      fileUrl = `data:${file.type};base64,${buffer.toString('base64')}`;
    }

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
