'use client';

/**
 * app/visualize/[configurationId]/page.tsx
 *
 * Scene/Room Visualization page (Slice 2).
 * Session flow — identical for clients and photographers (PRD §5):
 *   1. Load scene library
 *   2. User picks a scene → POST /api/mockup creates mockup + returns image
 *   3. PlacementCanvas: drag/scroll adjusts placement → PATCH …/placement re-composites
 *   4. BeforeAfterToggle: compare raw photo vs. framed-in-scene
 *   5. StartOrderButton: POST …/start-order → navigate to /configure?design=<id>
 *
 * A-8: uses rabbet motif (rabbet, rabbet-accent) — same visual language as rest of site.
 * D-5 extension: mockup shareable via URL (no auth required to view).
 * A-9: accessible to both clients and photographers — no separate UI paths.
 */

import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { StudioHeader } from '@/components/branding/StudioBranding';
import { ScenePicker, Scene } from '@/components/visualize/ScenePicker';
import { PlacementCanvas, Placement } from '@/components/visualize/PlacementCanvas';
import { BeforeAfterToggle } from '@/components/visualize/BeforeAfterToggle';
import { StartOrderButton } from '@/components/visualize/StartOrderButton';

const DEFAULT_PLACEMENT: Placement = { x: 0.5, y: 0.4, scale: 0.4 };

function VisualizeContent() {
  const params = useParams();
  const configurationId = params.configurationId as string;

  // ── State ──────────────────────────────────────────────────────────────────
  const [selectedScene, setSelectedScene] = useState<Scene | null>(null);
  const [placement, setPlacement] = useState<Placement>(DEFAULT_PLACEMENT);
  const [mockupId, setMockupId] = useState<string | null>(null);
  const [mockupImageUrl, setMockupImageUrl] = useState<string | null>(null);
  const [beforeImageUrl, setBeforeImageUrl] = useState<string | null>(null);
  const [compositing, setCompositing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Debounce timer for placement updates
  const placementDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Load raw photo URL for the "before" view ───────────────────────────────
  useEffect(() => {
    if (!configurationId) return;
    // Load the configuration to get the raw fileUrl for the "before" image.
    // We use the design-link GET endpoint which returns a Configuration.
    fetch(`/api/design-link/${configurationId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Configuration not found');
        return res.json();
      })
      .then((data) => {
        setBeforeImageUrl(data.fileUrl ?? null);
      })
      .catch((err) => {
        console.error('[visualize] load configuration', err);
        setError('Could not load your configuration. Make sure you started from the configurator.');
      });
  }, [configurationId]);

  // ── Create or update mockup when scene / placement changes ─────────────────
  const createMockup = useCallback(
    async (scene: Scene, pl: Placement) => {
      setCompositing(true);
      setError(null);
      try {
        const res = await fetch('/api/mockup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            configurationId,
            sceneId: scene.id,
            placement: { x: pl.x, y: pl.y, scale: pl.scale },
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? 'Mockup creation failed');
        setMockupId(data.mockupId);
        setMockupImageUrl(data.mockupImageUrl);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Mockup failed';
        console.error('[visualize] create mockup', err);
        setError(message);
      } finally {
        setCompositing(false);
      }
    },
    [configurationId],
  );

  const updatePlacement = useCallback(
    async (id: string, pl: Placement) => {
      setCompositing(true);
      setError(null);
      try {
        const res = await fetch(`/api/mockup/${id}/placement`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ placement: { x: pl.x, y: pl.y, scale: pl.scale } }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? 'Placement update failed');
        setMockupImageUrl(data.mockupImageUrl);
        setPlacement({ x: data.placement.x, y: data.placement.y, scale: data.placement.scale });
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Update failed';
        console.error('[visualize] update placement', err);
        setError(message);
      } finally {
        setCompositing(false);
      }
    },
    [],
  );

  // ── Scene selection ────────────────────────────────────────────────────────
  const handleSceneSelect = useCallback(
    (scene: Scene) => {
      setSelectedScene(scene);
      // Reset to default placement for the new scene
      const pl = DEFAULT_PLACEMENT;
      setPlacement(pl);
      createMockup(scene, pl);
    },
    [createMockup],
  );

  // ── Placement change (debounced) ───────────────────────────────────────────
  const handlePlacementChange = useCallback(
    (pl: Placement) => {
      setPlacement(pl);
      if (!mockupId || !selectedScene) return;

      if (placementDebounceRef.current) clearTimeout(placementDebounceRef.current);
      placementDebounceRef.current = setTimeout(() => {
        updatePlacement(mockupId, pl);
      }, 400); // 400ms debounce — avoids spamming the server while dragging
    },
    [mockupId, selectedScene, updatePlacement],
  );

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col min-height-screen">
      <StudioHeader />

      <main className="container" style={{ paddingTop: 'var(--space-7)', paddingBottom: 'var(--space-9)' }}>
        {/* Page header */}
        <header style={{ marginBottom: 'var(--space-7)' }}>
          <p className="text-sm text-accent" style={{ marginBottom: 'var(--space-2)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Scene Visualizer
          </p>
          <h1 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', marginBottom: 'var(--space-3)' }}>
            See Your Piece in a Room
          </h1>
          <p className="text-secondary" style={{ maxWidth: 560 }}>
            Choose a scene, drag to position your framed piece, then compare before and after.
            When you&apos;re happy, start your order — no re-selection needed.
          </p>
        </header>

        {/* Error banner */}
        {error && (
          <div className="warning-banner" style={{ marginBottom: 'var(--space-5)' }}>
            <span>⚠️</span>
            <span className="text-sm">{error}</span>
          </div>
        )}

        <div className="visualize-layout">
          {/* ── Left column: canvas + before/after + CTA ── */}
          <div className="flex flex-col gap-5">
            {/* Mockup canvas */}
            <PlacementCanvas
              mockupImageUrl={mockupImageUrl}
              placement={placement}
              onPlacementChange={handlePlacementChange}
              loading={compositing}
            />

            {/* Before/after toggle */}
            {beforeImageUrl && (
              <div className="card rabbet">
                <BeforeAfterToggle
                  beforeImageUrl={beforeImageUrl}
                  afterImageUrl={mockupImageUrl}
                  sceneName={selectedScene?.name}
                />
              </div>
            )}

            {/* Start order CTA */}
            <div className="card rabbet">
              <StartOrderButton
                mockupId={mockupId}
                disabled={!mockupImageUrl || compositing}
              />
            </div>
          </div>

          {/* ── Right column: scene picker ── */}
          <div className="flex flex-col gap-5">
            <div className="card rabbet">
              <ScenePicker
                selectedSceneId={selectedScene?.id ?? null}
                onSceneSelect={handleSceneSelect}
              />
            </div>

            {/* Frame summary card (context for the viewer) */}
            {configurationId && (
              <div className="card card-glass rabbet">
                <p className="form-label" style={{ marginBottom: 'var(--space-3)' }}>
                  Your Configuration
                </p>
                <p className="text-sm text-secondary">
                  Frame choices loaded from your saved configuration.{' '}
                  <a
                    href={`/configure?design=${configurationId}`}
                    className="text-accent"
                    style={{ textDecoration: 'underline', textUnderlineOffset: 3 }}
                  >
                    Edit selections
                  </a>
                </p>
                <div
                  className="rabbet-divider"
                  style={{ margin: 'var(--space-4) 0 var(--space-3)' }}
                />
                <p className="text-xs text-muted">
                  The mockup shown here uses the exact same compositing engine as the live preview
                  in the configurator — what you see is what gets ordered.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function VisualizePage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col min-height-screen">
          <StudioHeader />
          <main
            className="flex-grow flex items-center justify-center"
            style={{ minHeight: '60vh' }}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="spinner" style={{ width: 32, height: 32 }} />
              <p className="text-secondary text-sm">Loading scene visualizer…</p>
            </div>
          </main>
        </div>
      }
    >
      <VisualizeContent />
    </Suspense>
  );
}
