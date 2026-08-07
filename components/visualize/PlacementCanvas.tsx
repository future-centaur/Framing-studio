'use client';

/**
 * PlacementCanvas — interactive mockup canvas.
 *
 * Displays the composited mockup image. Supports:
 * - Mouse/touch drag to reposition the framed piece (updates placementX/Y)
 * - Scroll wheel / pinch to scale the piece (updates placementScale)
 *
 * On pointer-up or scroll-end, calls onPlacementChange({ x, y, scale }) —
 * the parent debounces this before firing PATCH /api/mockup/:id/placement.
 *
 * D-17: move/scale within scene canvas.
 * Note: crop/straighten/perspective correction are NOT in scope (SLICE_CARD_02 §Deferred).
 */

import { useCallback, useEffect, useRef, useState } from 'react';

export interface Placement {
  x: number;   // 0–1 normalised cx
  y: number;   // 0–1 normalised cy
  scale: number; // 0–1 fraction of scene width
}

interface PlacementCanvasProps {
  /** The current composited mockup image (base64 or URL). */
  mockupImageUrl: string | null;
  /** Current placement values (drives the live overlay indicators). */
  placement: Placement;
  /** Called when the user finishes dragging/scaling. Parent debounces the API call. */
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
  const [localPlacement, setLocalPlacement] = useState<Placement>(placement);

  // Sync external placement into local state when it changes (e.g. from a server response)
  useEffect(() => {
    setLocalPlacement(placement);
  }, [placement]);

  // Helper: convert pixel delta to normalised delta
  const pixelToNorm = useCallback((dx: number, dy: number) => {
    const el = containerRef.current;
    if (!el) return { nx: 0, ny: 0 };
    const { width, height } = el.getBoundingClientRect();
    return { nx: dx / width, ny: dy / height };
  }, []);

  // ── Drag to reposition ────────────────────────────────────────────────────
  const handlePointerDown = (e: React.PointerEvent) => {
    if (loading) return;
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

  // ── Scroll / pinch to scale ───────────────────────────────────────────────
  const handleWheel = (e: React.WheelEvent) => {
    if (loading) return;
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.02 : 0.02;
    setLocalPlacement((prev) => {
      const newScale = Math.max(0.1, Math.min(0.9, prev.scale + delta));
      const next = { ...prev, scale: newScale };
      onPlacementChange(next);
      return next;
    });
  };

  return (
    <div className="mockup-canvas-wrapper rabbet-accent" ref={containerRef}>
      {/* Crosshair placement indicator overlaid on top (hidden on mobile to save space) */}
      <div
        className="mockup-canvas-inner"
        style={{ position: 'relative', userSelect: 'none', touchAction: 'none' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onWheel={handleWheel}
      >
        {mockupImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={mockupImageUrl}
            alt="Room mockup — drag to reposition, scroll to scale"
            style={{
              width: '100%',
              display: 'block',
              borderRadius: 'var(--radius-md)',
              cursor: isDragging ? 'grabbing' : 'grab',
              opacity: loading ? 0.5 : 1,
              transition: 'opacity var(--dur-mid)',
            }}
            draggable={false}
          />
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
              background: 'rgba(16,15,13,0.5)',
              borderRadius: 'var(--radius-md)',
            }}
          >
            <div className="spinner" style={{ width: 28, height: 28 }} />
          </div>
        )}
      </div>

      {/* Placement hint */}
      {mockupImageUrl && !loading && (
        <p
          className="text-xs text-muted"
          style={{ marginTop: 'var(--space-2)', textAlign: 'center' }}
        >
          Drag to reposition · Scroll to resize
        </p>
      )}

      {/* Scale slider — supplementary control for accessibility */}
      {mockupImageUrl && (
        <div style={{ marginTop: 'var(--space-3)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <span className="text-xs text-muted" style={{ flexShrink: 0 }}>Size</span>
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
                onPlacementChange(next);
                return next;
              });
            }}
            style={{ flex: 1, accentColor: 'var(--accent)' }}
            aria-label="Frame size in scene"
          />
          <span className="text-xs text-muted" style={{ flexShrink: 0, minWidth: 36 }}>
            {Math.round(localPlacement.scale * 100)}%
          </span>
        </div>
      )}
    </div>
  );
}
