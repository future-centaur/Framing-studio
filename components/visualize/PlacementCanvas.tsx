'use client';

/**
 * PlacementCanvas — interactive 60fps mockup canvas.
 *
 * Displays the room scene with interactive client-side 60fps drag, scale, and 3D wall perspective adjustment.
 *
 * Performance optimization:
 * - Dragging/scaling/tilting operates 100% locally on the client with zero lag.
 * - On drag release (pointer-up) or slider release, onPlacementChange is triggered to sync with the server.
 */

import { useCallback, useEffect, useRef, useState } from 'react';

// Debounce helper — calls fn only after `delay`ms of silence
function useDebounceCallback<T extends unknown[]>(fn: (...args: T) => void, delay: number) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  return useCallback(
    (...args: T) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => fn(...args), delay);
    },
    [fn, delay],
  );
}

export interface Placement {
  x: number;        // 0–1 normalised cx
  y: number;        // 0–1 normalised cy
  scale: number;    // 0–1 fraction of scene width
  rotateY?: number; // -45 to +45 deg (wall perspective tilt)
  rotateX?: number; // -30 to +30 deg (vertical tilt)
}

interface PlacementCanvasProps {
  /** The composited mockup image URL from the server. */
  mockupImageUrl: string | null;
  /** Current placement values. */
  placement: Placement;
  /** Called when drag/scale/tilt completes. */
  onPlacementChange: (placement: Placement) => void;
  loading?: boolean;
}

export function PlacementCanvas({
  mockupImageUrl,
  placement,
  onPlacementChange,
  loading = false,
}: PlacementCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ mouseX: number; mouseY: number; px: number; py: number } | null>(null);
  const [localPlacement, setLocalPlacement] = useState<Placement>({
    x: placement.x ?? 0.5,
    y: placement.y ?? 0.4,
    scale: placement.scale ?? 0.4,
    rotateY: placement.rotateY ?? 0,
    rotateX: placement.rotateX ?? 0,
  });

  // Debounced server sync — fires 600ms after the last local change
  const syncToServer = useDebounceCallback(onPlacementChange, 600);

  // Sync external placement into local state when server finishes updating
  useEffect(() => {
    if (!isDragging) {
      setLocalPlacement({
        x: placement.x ?? 0.5,
        y: placement.y ?? 0.4,
        scale: placement.scale ?? 0.4,
        rotateY: placement.rotateY ?? 0,
        rotateX: placement.rotateX ?? 0,
      });
    }
  }, [placement, isDragging]);

  // Helper: convert pixel delta to normalised delta
  const pixelToNorm = useCallback((dx: number, dy: number) => {
    const el = containerRef.current;
    if (!el) return { nx: 0, ny: 0 };
    const { width, height } = el.getBoundingClientRect();
    return { nx: dx / width, ny: dy / height };
  }, []);

  // ── Drag to reposition ────────────────────────────────────────────────────
  const handlePointerDown = (e: React.PointerEvent) => {
    if (loading || !mockupImageUrl) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
    dragStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      px: localPlacement.x,
      py: localPlacement.y,
    };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !dragStartRef.current) return;
    const dx = e.clientX - dragStartRef.current.mouseX;
    const dy = e.clientY - dragStartRef.current.mouseY;
    const { nx, ny } = pixelToNorm(dx, dy);
    const newX = Math.max(0.05, Math.min(0.95, dragStartRef.current.px + nx));
    const newY = Math.max(0.05, Math.min(0.95, dragStartRef.current.py + ny));
    setLocalPlacement((prev) => ({ ...prev, x: newX, y: newY }));
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    dragStartRef.current = null;
    onPlacementChange(localPlacement);
  };

  // ── Scroll / pinch to scale (local only — server syncs after 600ms idle) ──
  const handleWheel = (e: React.WheelEvent) => {
    if (loading || !mockupImageUrl) return;
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.02 : 0.02;
    setLocalPlacement((prev) => {
      const newScale = Math.max(0.1, Math.min(0.9, prev.scale + delta));
      const next = { ...prev, scale: newScale };
      syncToServer(next); // debounced — won't fire until scrolling stops
      return next;
    });
  };

  // 3D Perspective Transform for Wall Orientation Alignment
  const rotY = localPlacement.rotateY ?? 0;
  const rotX = localPlacement.rotateX ?? 0;
  const perspectiveTransform = `perspective(1000px) rotateY(${rotY}deg) rotateX(${rotX}deg)`;

  return (
    <div className="mockup-canvas-wrapper rabbet-accent" ref={containerRef}>
      {/* Mockup Canvas */}
      <div
        className="mockup-canvas-inner"
        style={{
          position: 'relative',
          userSelect: 'none',
          touchAction: 'none',
          perspective: 1000,
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onWheel={handleWheel}
      >
        {mockupImageUrl ? (
          <div style={{ position: 'relative', width: '100%', overflow: 'hidden', borderRadius: 'var(--radius-md)' }}>
            {/* Rendered mockup */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={mockupImageUrl}
              alt="Room mockup — drag to reposition, scroll to scale"
              style={{
                width: '100%',
                display: 'block',
                cursor: isDragging ? 'grabbing' : 'grab',
                opacity: loading ? 0.7 : 1,
                transform: perspectiveTransform,
                transition: isDragging ? 'none' : 'transform var(--dur-mid), opacity var(--dur-mid)',
                transformOrigin: 'center center',
              }}
              draggable={false}
            />
          </div>
        ) : (
          <div className="mockup-canvas-placeholder">
            <span style={{ fontSize: '2rem', opacity: 0.4 }}>🖼</span>
            <p className="text-secondary text-sm">Select a scene to see your piece in a room</p>
          </div>
        )}

        {/* Loading overlay */}
        {loading && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(16,15,13,0.4)',
              borderRadius: 'var(--radius-md)',
              backdropFilter: 'blur(2px)',
            }}
          >
            <div className="spinner" style={{ width: 28, height: 28 }} />
          </div>
        )}
      </div>

      {/* Placement hint */}
      {mockupImageUrl && (
        <p
          className="text-xs text-muted"
          style={{ marginTop: 'var(--space-2)', textAlign: 'center' }}
        >
          Drag to reposition · Scroll to resize · Adjust wall perspective below
        </p>
      )}

      {/* Interactive Controls Panel */}
      {mockupImageUrl && (
        <div style={{ marginTop: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {/* Size Slider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <span className="text-xs text-muted" style={{ flexShrink: 0, width: 90 }}>
              Frame Size
            </span>
            <input
              id="placement-scale-slider"
              type="range"
              min={10}
              max={80}
              step={1}
              value={Math.round(localPlacement.scale * 100)}
              onChange={(e) => {
                const newScale = parseInt(e.target.value, 10) / 100;
                setLocalPlacement((prev) => {
                  const next = { ...prev, scale: newScale };
                  syncToServer(next);
                  return next;
                });
              }}
              onMouseUp={() => syncToServer(localPlacement)}
              onTouchEnd={() => syncToServer(localPlacement)}
              style={{ flex: 1, accentColor: 'var(--accent)' }}
              aria-label="Frame size in scene"
            />
            <span className="text-xs text-muted" style={{ flexShrink: 0, minWidth: 36, textAlign: 'right' }}>
              {Math.round(localPlacement.scale * 100)}%
            </span>
          </div>

          {/* Wall Perspective / Angle Tilt */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <span className="text-xs text-muted" style={{ flexShrink: 0, width: 90 }}>
              Wall Perspective
            </span>
            <input
              id="placement-rotate-y-slider"
              type="range"
              min={-30}
              max={30}
              step={1}
              value={localPlacement.rotateY ?? 0}
              onChange={(e) => {
                const rot = parseInt(e.target.value, 10);
                setLocalPlacement((prev) => {
                  const next = { ...prev, rotateY: rot };
                  syncToServer(next);
                  return next;
                });
              }}
              onMouseUp={() => syncToServer(localPlacement)}
              onTouchEnd={() => syncToServer(localPlacement)}
              style={{ flex: 1, accentColor: 'var(--accent)' }}
              aria-label="Wall perspective rotation angle"
            />
            <span className="text-xs text-muted" style={{ flexShrink: 0, minWidth: 36, textAlign: 'right' }}>
              {(localPlacement.rotateY ?? 0) > 0 ? `+${localPlacement.rotateY}°` : `${localPlacement.rotateY ?? 0}°`}
            </span>
          </div>

          {/* Quick Wall Angle Presets */}
          <div style={{ display: 'flex', gap: 'var(--space-2)', justifyContent: 'flex-end', marginTop: 'var(--space-1)' }}>
            <button
              type="button"
              className={`btn btn-sm ${rotY === -15 ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => {
                const next = { ...localPlacement, rotateY: -15 };
                setLocalPlacement(next);
                onPlacementChange(next);
              }}
            >
              Left Wall
            </button>
            <button
              type="button"
              className={`btn btn-sm ${rotY === 0 ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => {
                const next = { ...localPlacement, rotateY: 0, rotateX: 0 };
                setLocalPlacement(next);
                onPlacementChange(next);
              }}
            >
              Flat Wall
            </button>
            <button
              type="button"
              className={`btn btn-sm ${rotY === 15 ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => {
                const next = { ...localPlacement, rotateY: 15 };
                setLocalPlacement(next);
                onPlacementChange(next);
              }}
            >
              Right Wall
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
