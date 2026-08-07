/**
 * lib/compositing.ts
 * Server-side image compositing for live preview (D-2)
 * Uses sharp for pixel manipulation
 *
 * D-2: Must composite client's own uploaded photo — not a stock image
 * D-4: Resolution check triggers warning for incompatible size/glazing combos
 */

import sharp from 'sharp';

// Minimum pixel dimensions per glazing tier for a standard 20×30cm print
// These thresholds enforce D-4 (low-res warning)
const RESOLUTION_THRESHOLDS: Record<string, { minWidth: number; minHeight: number }> = {
  BUDGET: { minWidth: 800, minHeight: 600 },
  MID: { minWidth: 1600, minHeight: 1200 },
  PREMIUM: { minWidth: 2400, minHeight: 1800 },
};

export interface CompositeInput {
  fileUrl: string;
  mouldingColor?: string; // hex color for frame simulation
  matColor?: string;      // hex color for mat border
  glazingTier?: string;   // BUDGET | MID | PREMIUM
  mountType?: string;     // FLOAT | STANDARD
}

export interface CompositeResult {
  previewImageUrl: string; // base64 data URL or stored URL
  resolutionWarning: boolean;
  warningMessage?: string;
}

export interface UploadResolutionCheck {
  resolutionWarning: boolean;
  width: number;
  height: number;
  warningMessage?: string;
}

/**
 * Check if an uploaded image meets resolution requirements.
 * Called immediately on upload (D-4).
 */
export async function checkResolution(
  imageBuffer: Buffer,
  glazingTier = 'BUDGET',
): Promise<UploadResolutionCheck> {
  const metadata = await sharp(imageBuffer).metadata();
  const { width = 0, height = 0 } = metadata;

  const threshold = RESOLUTION_THRESHOLDS[glazingTier] ?? RESOLUTION_THRESHOLDS.BUDGET;
  const resolutionWarning = width < threshold.minWidth || height < threshold.minHeight;

  return {
    resolutionWarning,
    width,
    height,
    warningMessage: resolutionWarning
      ? `Your image is ${width}×${height}px. For ${glazingTier.toLowerCase()} glazing, we recommend at least ${threshold.minWidth}×${threshold.minHeight}px for sharp results. You can still proceed, but print quality may be affected.`
      : undefined,
  };
}

/**
 * Composite a client's photo with frame/mat/mount simulation.
 * Returns a base64-encoded preview image (JPEG).
 *
 * Visual approach:
 * - Outer border: moulding color (simulates frame)
 * - Inner border: mat color (simulates mat board)
 * - Image area: resized client photo
 * - Float mount: 4px gap visible around image edge
 */
export async function compositePreview(input: CompositeInput): Promise<CompositeResult> {
  const {
    fileUrl,
    mouldingColor = '#3d2b1f',
    matColor = '#f5f0e8',
    glazingTier = 'BUDGET',
    mountType = 'STANDARD',
  } = input;

  // Fetch source image
  let imageBuffer: Buffer;
  try {
    const response = await fetch(fileUrl);
    if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);
    imageBuffer = Buffer.from(await response.arrayBuffer());
  } catch (err) {
    throw new Error(`Could not load photo for compositing: ${err}`);
  }

  // Check resolution
  const resCheck = await checkResolution(imageBuffer, glazingTier);

  // Output canvas: 800×600 preview
  const CANVAS_W = 800;
  const CANVAS_H = 600;
  const MOULDING_PX = 36; // pixels simulating frame width
  const MAT_PX = 24;      // pixels simulating mat width
  const FLOAT_GAP = mountType === 'FLOAT' ? 8 : 0; // gap for float mount

  const innerW = CANVAS_W - (MOULDING_PX + MAT_PX + FLOAT_GAP) * 2;
  const innerH = CANVAS_H - (MOULDING_PX + MAT_PX + FLOAT_GAP) * 2;

  // Parse hex colors to RGB
  const parseHex = (hex: string) => ({
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  });

  const mouldingRgb = parseHex(mouldingColor.startsWith('#') ? mouldingColor : '#3d2b1f');
  const matRgb = parseHex(matColor.startsWith('#') ? matColor : '#f5f0e8');

  // Resize client photo to fit inner area
  const resizedPhoto = await sharp(imageBuffer)
    .resize(innerW, innerH, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 85 })
    .toBuffer();

  // Build composited image: canvas → moulding background → mat layer → photo
  const canvas = sharp({
    create: {
      width: CANVAS_W,
      height: CANVAS_H,
      channels: 3,
      background: mouldingRgb,
    },
  });

  // Mat layer
  const matLayer = await sharp({
    create: {
      width: CANVAS_W - MOULDING_PX * 2,
      height: CANVAS_H - MOULDING_PX * 2,
      channels: 3,
      background: matRgb,
    },
  })
    .png()
    .toBuffer();

  // Float gap layer (if float mount — shows backing behind print)
  const floatBacking = FLOAT_GAP > 0
    ? await sharp({
        create: {
          width: innerW + FLOAT_GAP * 2,
          height: innerH + FLOAT_GAP * 2,
          channels: 3,
          background: { r: 220, g: 215, b: 200 },
        },
      })
        .png()
        .toBuffer()
    : null;

  // Composite layers
  const compositeOps: sharp.OverlayOptions[] = [
    { input: matLayer, top: MOULDING_PX, left: MOULDING_PX },
  ];

  if (floatBacking) {
    compositeOps.push({
      input: floatBacking,
      top: MOULDING_PX + MAT_PX,
      left: MOULDING_PX + MAT_PX,
    });
  }

  compositeOps.push({
    input: resizedPhoto,
    top: MOULDING_PX + MAT_PX + FLOAT_GAP,
    left: MOULDING_PX + MAT_PX + FLOAT_GAP,
  });

  const outputBuffer = await canvas.composite(compositeOps).jpeg({ quality: 88 }).toBuffer();

  const base64 = `data:image/jpeg;base64,${outputBuffer.toString('base64')}`;

  return {
    previewImageUrl: base64,
    resolutionWarning: resCheck.resolutionWarning,
    warningMessage: resCheck.warningMessage,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// SLICE 2: Scene mockup compositing (A-9, D-17)
// Calls compositePreview() internally — same engine, zero visual drift.
// ─────────────────────────────────────────────────────────────────────────────

export interface SceneMockupInput {
  /** Same input used by /api/preview — reused unmodified. */
  compositeInput: CompositeInput;
  /** Absolute URL or data URL of the curated room/wall background. */
  sceneImageUrl: string;
  /** Normalised centre X of the piece within the scene (0 = left, 1 = right). */
  placementX: number;
  /** Normalised centre Y of the piece within the scene (0 = top, 1 = bottom). */
  placementY: number;
  /** Piece width as a fraction of scene canvas width (e.g. 0.4 = 40%). */
  placementScale: number;
}

export interface SceneMockupResult {
  /** base64 data URL of the final room mockup. */
  mockupImageUrl: string;
  resolutionWarning: boolean;
  warningMessage?: string;
}

/**
 * Composite a framed piece (from compositePreview) into a curated scene.
 *
 * D-2 enforced: the framed piece is produced by the SAME compositePreview()
 * call that /api/preview uses — never a parallel implementation.
 * D-17 enforced: placement (x/y) and scale are adjustable.
 */
export async function compositeMockup(
  input: SceneMockupInput,
): Promise<SceneMockupResult> {
  const { compositeInput, sceneImageUrl, placementX, placementY, placementScale } = input;

  // Step 1: produce the framed piece using the SAME engine as /api/preview
  const frameResult = await compositePreview(compositeInput);

  // Decode the base64 preview back to a buffer for sharp manipulation
  const base64Data = frameResult.previewImageUrl.replace(/^data:image\/\w+;base64,/, '');
  const pieceBuffer = Buffer.from(base64Data, 'base64');

  // Step 2: fetch the scene background
  let sceneBuffer: Buffer;
  if (sceneImageUrl.startsWith('data:')) {
    const b64 = sceneImageUrl.replace(/^data:image\/\w+;base64,/, '');
    sceneBuffer = Buffer.from(b64, 'base64');
  } else {
    const res = await fetch(sceneImageUrl);
    if (!res.ok) throw new Error(`Failed to fetch scene image: ${res.statusText}`);
    sceneBuffer = Buffer.from(await res.arrayBuffer());
  }

  // Step 3: measure scene dimensions
  const sceneMeta = await sharp(sceneBuffer).metadata();
  const sceneW = sceneMeta.width ?? 1200;
  const sceneH = sceneMeta.height ?? 800;

  // Step 4: scale the framed piece to placementScale × scene width
  const pieceW = Math.round(sceneW * Math.max(0.1, Math.min(1, placementScale)));
  const pieceMeta = await sharp(pieceBuffer).metadata();
  const origW = pieceMeta.width ?? 800;
  const origH = pieceMeta.height ?? 600;
  const aspectRatio = origH / origW;
  const pieceH = Math.round(pieceW * aspectRatio);

  const scaledPiece = await sharp(pieceBuffer)
    .resize(pieceW, pieceH, { fit: 'fill' })
    .png()
    .toBuffer();

  // Step 5: calculate top-left corner (placement is centre-anchored)
  const cx = Math.round(sceneW * Math.max(0, Math.min(1, placementX)));
  const cy = Math.round(sceneH * Math.max(0, Math.min(1, placementY)));
  const left = Math.max(0, Math.min(sceneW - pieceW, cx - Math.round(pieceW / 2)));
  const top  = Math.max(0, Math.min(sceneH - pieceH, cy - Math.round(pieceH / 2)));

  // Step 6: composite piece onto scene
  const outputBuffer = await sharp(sceneBuffer)
    .composite([{ input: scaledPiece, top, left, blend: 'over' }])
    .jpeg({ quality: 88 })
    .toBuffer();

  const mockupBase64 = `data:image/jpeg;base64,${outputBuffer.toString('base64')}`;

  return {
    mockupImageUrl: mockupBase64,
    resolutionWarning: frameResult.resolutionWarning,
    warningMessage: frameResult.warningMessage,
  };
}
