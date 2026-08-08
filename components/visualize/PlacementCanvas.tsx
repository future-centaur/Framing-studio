'use client';

/**
 * PlacementCanvas — two-layer client-side canvas.
 *
 * Architecture (zero-reload repositioning):
 * - Layer 1: scene background image rendered as a full-width <img>
 * - Layer 2: framed artwork <img> positioned absolutely on top using CSS transform
 * - Drag/scroll/slider adjusts a localPlacement state → instant CSS repositioning at 60fps
 * - onPlacementChange is debounced 800ms and ONLY saves coordinates to the DB
 *   (no re-composite on drag — the server never re-renders the image on placement change)
 *
 * The two images are kept separate so the scene never has to reload.
 */

import { useCallback, useEffect, useRef, useState } from 'react';

// Inline debounce — fires fn only after `delay`ms of silence
function useDebounceCallback<T extends unknown[]>(fn: (...args: T) => void, delay: number) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fnRef = useRef(fn);
  fnRef.current = fn;
  return useCallback(
    (...args: T) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => fnRef.current(...args), delay);
    },
    [delay],
  );
}

export interface Placement {
  x: number;        // 0–1 normalised cx within scene
  y: number;        // 0–1 normalised cy within scene
  scale: number;    // piece width as fraction of scene width (0.1–0.9)
  rotateY?: number; // CSS perspective tilt in deg (-30 to +30)
  rotateX?: number; // CSS perspective tilt in deg (-20 to +20)
}

interface PlacementCanvasProps {
  /** URL of the curated room/scene background. */
  sceneImageUrl: string | null;
  /** URL of the framed artwork composite (from /api/preview or POST /api/mockup). */
  frameImageUrl: string | null;
  /** Current saved placement (from server state). */
  placement: Placement;
  /** Called when the user settles on a new placement (debounced). Just saves coords — no re-composite. */
  onPlacementChange: (placement: Placement) => void;
  /** Show a subtle "saving" indicator while the debounced PATCH is in-flight. */
  saving?: boolean;
}

export function PlacementCanvas({
  sceneImageUrl,
  frameImageUrl,
  placement,
  onPlacementChange,
  saving = false,
}: PlacementCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ mouseX: number; mouseY: number; px: number; py: number } | null>(null);

  const [local, setLocal] = useState<Placement>({
    x: placement.x ?? 0.5,
    y: placement.y ?? 0.4,
    scale: placement.scale ?? 0.4,
    rotateY: placement.rotateY ?? 0,
    rotateX: placement.rotateX ?? 0,
  });

  // Sync external placement into local state only when not dragging
  useEffect(() => {
    if (!isDragging) {
      setLocal({
        x: placement.x ?? 0.5,
        y: placement.y ?? 0.4,
        scale: placement.scale ?? 0.4,
        rotateY: placement.rotateY ?? 0,
        rotateX: placement.rotateX ?? 0,
      });
    }
  }, [placement, isDragging]);

  // Debounced save — fires 800ms after user stops interacting
  const debouncedSave = useDebounceCallback(onPlacementChange, 800);

  // ── Drag to reposition ─────────────────────────────────────────────────────
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!frameImageUrl) return;
    e.stopPropagation();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setIsDragging(true);
    dragStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      px: local.x,
      py: local.y,
    };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !dragStartRef.current) return;
    const container = containerRef.current;
    if (!container) return;
    const { width, height } = container.getBoundingClientRect();
    const dx = e.clientX - dragStartRef.current.mouseX;
    const dy = e.clientY - dragStartRef.current.mouseY;
    const newX = Math.max(0.05, Math.min(0.95, dragStartRef.current.px + dx / width));
    const newY = Math.max(0.05, Math.min(0.95, dragStartRef.current.py + dy / height));
    setLocal((prev) => ({ ...prev, x: newX, y: newY }));
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    dragStartRef.current = null;
    debouncedSave(local);
  };

  // ── Scroll to scale ────────────────────────────────────────────────────────
  const handleWheel = (e: React.WheelEvent) => {
    if (!frameImageUrl) return;
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.025 : 0.025;
    setLocal((prev) => {
      const next = { ...prev, scale: Math.max(0.1, Math.min(0.9, prev.scale + delta)) };
      debouncedSave(next);
      return next;
    });
  };

  // ── Compute CSS position of the frame overlay ──────────────────────────────
  // We position the frame as: left = cx - pieceWidth/2, top = cy - pieceHeight/2
  // Using percentage values relative to the container so it's responsive.
  const pieceWidthPct = local.scale * 100;          // % of container width
  const leftPct = local.x * 100 - pieceWidthPct / 2;
  const topPct = local.y * 100;

  const rotY = local.rotateY ?? 0;
  const rotX = local.rotateX ?? 0;
  const transform = `perspective(900px) rotateY(${rotY}deg) rotateX(${rotX}deg)`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
      {/* ── Two-layer canvas ── */}
      <div
        ref={containerRef}
        className="rabbet-accent"
        style={{
          position: 'relative',
          width: '100%',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          background: 'var(--bg-2)',
          cursor: isDragging ? 'grabbing' : frameImageUrl ? 'grab' : 'default',
          userSelect: 'none',
          touchAction: 'none',
          minHeight: 200,
        }}
        onWheel={handleWheel}
      >
        {/* Layer 1: scene background */}
        {sceneImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={sceneImageUrl}
            alt="Room scene"
            draggable={false}
            style={{ width: '100%', display: 'block', pointerEvents: 'none' }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              paddingTop: '62.5%', // 16:10 placeholder aspect ratio
              background: 'var(--bg-2)',
            }}
          />
        )}

        {/* Layer 2: framed artwork — absolutely positioned, drag target */}
        {frameImageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={frameImageUrl}
            alt="Your framed piece — drag to reposition"
            draggable={false}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            style={{
              position: 'absolute',
              top: `${topPct}%`,
              left: `${leftPct}%`,
              width: `${pieceWidthPct}%`,
              transform,
              transformOrigin: 'center top',
              transition: isDragging ? 'none' : 'top 0.12s ease, left 0.12s ease',
              cursor: isDragging ? 'grabbing' : 'grab',
              // Box shadow to give depth
              filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.5))',
            }}
          />
        )}

        {/* Saving indicator (top-right corner) */}
        {saving && (
          <div
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              background: 'rgba(16,15,13,0.75)',
              borderRadius: 'var(--radius-sm)',
              padding: '4px 10px',
              fontSize: '0.7rem',
              color: 'var(--accent-light)',
              backdropFilter: 'blur(6px)',
            }}
          >
            Saving…
          </div>
        )}

        {/* Empty state */}
        {!sceneImageUrl && !frameImageUrl && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            <span style={{ fontSize: '2.5rem', opacity: 0.3 }}>🖼</span>
            <p className="text-secondary text-sm">Select a scene to begin</p>
          </div>
        )}
      </div>

      {/* Hint */}
      {frameImageUrl && (
        <p className="text-xs text-muted" style={{ textAlign: 'center' }}>
          Drag to reposition · Scroll to resize · Use sliders below for wall angle
        </p>
      )}

      {/* ── Controls ── */}
      {frameImageUrl && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {/* Size slider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <span className="text-xs text-muted" style={{ flexShrink: 0, width: 90 }}>Frame Size</span>
            <input
              id="placement-scale-slider"
              type="range" min={10} max={80} step={1}
              value={Math.round(local.scale * 100)}
              onChange={(e) => {
                const newScale = parseInt(e.target.value, 10) / 100;
                setLocal((prev) => {
                  const next = { ...prev, scale: newScale };
                  debouncedSave(next);
                  return next;
                });
              }}
              style={{ flex: 1, accentColor: 'var(--accent)' }}
              aria-label="Frame size in scene"
            />
            <span className="text-xs text-muted" style={{ flexShrink: 0, minWidth: 36, textAlign: 'right' }}>
              {Math.round(local.scale * 100)}%
            </span>
          </div>

          {/* Wall perspective slider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <span className="text-xs text-muted" style={{ flexShrink: 0, width: 90 }}>Wall Angle</span>
            <input
              id="placement-rotate-y-slider"
              type="range" min={-30} max={30} step={1}
              value={local.rotateY ?? 0}
              onChange={(e) => {
                const rot = parseInt(e.target.value, 10);
                setLocal((prev) => {
                  const next = { ...prev, rotateY: rot };
                  debouncedSave(next);
                  return next;
                });
              }}
              style={{ flex: 1, accentColor: 'var(--accent)' }}
              aria-label="Wall perspective angle"
            />
            <span className="text-xs text-muted" style={{ flexShrink: 0, minWidth: 36, textAlign: 'right' }}>
              {(local.rotateY ?? 0) > 0 ? `+${local.rotateY}°` : `${local.rotateY ?? 0}°`}
            </span>
          </div>

          {/* Preset buttons */}
          <div style={{ display: 'flex', gap: 'var(--space-2)', justifyContent: 'flex-end' }}>
            {([[-15, 'Left Wall'], [0, 'Flat Wall'], [15, 'Right Wall']] as const).map(([deg, label]) => (
              <button
                key={label}
                type="button"
                className={`btn btn-sm ${(local.rotateY ?? 0) === deg ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => {
                  const next = { ...local, rotateY: deg, rotateX: 0 };
                  setLocal(next);
                  debouncedSave(next);
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
