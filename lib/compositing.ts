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
