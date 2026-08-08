/**
 * lib/blobs.ts
 * Unified helper for Netlify Blobs storage.
 * Works in Netlify serverless runtime (auto-configured via environment/context),
 * with explicit tokens if provided, and with local memory fallback for dev.
 */

import { getStore } from '@netlify/blobs';

// In-memory fallback cache for local dev mode when Netlify Blobs is absent
const devMemoryStore = new Map<string, { buffer: Buffer; contentType: string }>();

export function getPhotosStore() {
  if (process.env.BLOB_STORAGE_TOKEN && process.env.NETLIFY_SITE_ID) {
    return getStore({
      name: 'photos',
      token: process.env.BLOB_STORAGE_TOKEN,
      siteID: process.env.NETLIFY_SITE_ID,
    });
  }

  // Netlify auto-configured store (uses NETLIFY_BLOBS_CONTEXT or runtime credentials)
  return getStore('photos');
}

export async function savePhotoBlob(key: string, buffer: Buffer, contentType: string): Promise<void> {
  try {
    const store = getPhotosStore();
    const arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength) as ArrayBuffer;
    await store.set(key, arrayBuffer);
  } catch (err) {
    console.warn('[blobs] Netlify Blobs set failed, storing in memory fallback:', err);
    devMemoryStore.set(key, { buffer, contentType });
  }
}

export async function getPhotoBlob(key: string): Promise<{ buffer: Buffer; contentType: string } | null> {
  // Check local memory fallback first
  if (devMemoryStore.has(key)) {
    return devMemoryStore.get(key)!;
  }

  try {
    const store = getPhotosStore();
    const data = await store.get(key, { type: 'arrayBuffer' });
    if (!data) return null;
    return {
      buffer: Buffer.from(data),
      contentType: 'image/jpeg',
    };
  } catch (err) {
    console.warn('[blobs] Netlify Blobs get failed:', err);
    return null;
  }
}
