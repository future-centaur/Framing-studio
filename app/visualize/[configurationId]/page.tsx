'use client';

/**
 * app/visualize/[configurationId]/page.tsx
 *
 * Scene/Room Visualization page (Slice 2).
 * Session flow:
 *   1. Load configuration (for raw photo URL — "before" view)
 *   2. Load frame preview image from /api/preview (the framed artwork, no scene)
 *   3. User picks a scene → POST /api/mockup creates a record (no heavy composite needed)
 *   4. PlacementCanvas: two CSS layers (scene bg + frame overlay) — 60fps local drag, no reload
 *   5. PATCH …/placement saves coordinates only (no re-composite, ~50ms)
 *   6. BeforeAfterToggle: compare raw photo vs. framed piece
 *   7. StartOrderButton: navigate to /configure?design=<id>
 */

import { Suspense, useCallback, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { StudioHeader } from '@/components/branding/StudioBranding';
import { ScenePicker, Scene } from '@/components/visualize/ScenePicker';
import { PlacementCanvas, Placement } from '@/components/visualize/PlacementCanvas';
import { BeforeAfterToggle } from '@/components/visualize/BeforeAfterToggle';
import { StartOrderButton } from '@/components/visualize/StartOrderButton';

const DEFAULT_PLACEMENT: Placement = { x: 0.5, y: 0.35, scale: 0.4 };

function VisualizeContent() {
  const params = useParams();
  const configurationId = params.configurationId as string;

  // ── State ──────────────────────────────────────────────────────────────────
  const [selectedScene, setSelectedScene] = useState<Scene | null>(null);
  const [placement, setPlacement] = useState<Placement>(DEFAULT_PLACEMENT);
  const [mockupId, setMockupId] = useState<string | null>(null);

  // Separate URLs: scene background + standalone frame preview (no scene composite)
  const [sceneImageUrl, setSceneImageUrl] = useState<string | null>(null);
  const [frameImageUrl, setFrameImageUrl] = useState<string | null>(null);
  const [beforeImageUrl, setBeforeImageUrl] = useState<string | null>(null);

  const [loadingScene, setLoadingScene] = useState(false); // initial scene selection
  const [savingPlacement, setSavingPlacement] = useState(false); // debounced PATCH
  const [error, setError] = useState<string | null>(null);

  // ── Load configuration + frame preview on mount ────────────────────────────
  useEffect(() => {
    if (!configurationId) return;
    fetch(`/api/design-link/${configurationId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Configuration not found');
        return res.json();
      })
      .then(async (config) => {
        setBeforeImageUrl(config.fileUrl ?? null);

        // Load the frame-only preview (same composite engine, no scene background)
        const previewRes = await fetch('/api/preview', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fileUrl: config.fileUrl,
            mouldingId: config.mouldingId,
            matId: config.matId,
            glazingId: config.glazingId,
            mountId: config.mountId,
          }),
        });
        if (previewRes.ok) {
          const previewData = await previewRes.json();
          setFrameImageUrl(previewData.previewImageUrl ?? null);
        }
      })
      .catch((err) => {
        console.error('[visualize] load config', err);
        setError('Could not load your configuration. Make sure you started from the configurator.');
      });
  }, [configurationId]);

  // ── Scene selection — create mockup record (no heavy composite) ────────────
  const handleSceneSelect = useCallback(
    async (scene: Scene) => {
      setSelectedScene(scene);
      setSceneImageUrl(scene.imageUrl);
      const pl = DEFAULT_PLACEMENT;
      setPlacement(pl);
      setLoadingScene(true);
      setError(null);

      try {
        // POST creates the DB record; server-side composite is skipped (frame shown via CSS layer)
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
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Scene load failed';
        console.error('[visualize] create mockup', err);
        setError(message);
      } finally {
        setLoadingScene(false);
      }
    },
    [configurationId],
  );

  // ── Placement change — PATCH coordinates only (~50ms, no re-composite) ─────
  const handlePlacementChange = useCallback(
    async (pl: Placement) => {
      setPlacement(pl);
      if (!mockupId) return;
      setSavingPlacement(true);
      try {
        await fetch(`/api/mockup/${mockupId}/placement`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            placement: { x: pl.x, y: pl.y, scale: pl.scale, rotateY: pl.rotateY ?? 0, rotateX: pl.rotateX ?? 0 },
          }),
        });
      } catch (err) {
        console.error('[visualize] save placement', err);
      } finally {
        setSavingPlacement(false);
      }
    },
    [mockupId],
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
            {/* Loading overlay for initial scene fetch */}
            {loadingScene ? (
              <div
                className="rabbet-accent"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: 340,
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-1)',
                  gap: 12,
                }}
              >
                <div className="spinner" style={{ width: 28, height: 28 }} />
                <span className="text-secondary text-sm">Preparing scene…</span>
              </div>
            ) : (
              <PlacementCanvas
                sceneImageUrl={sceneImageUrl}
                frameImageUrl={frameImageUrl}
                placement={placement}
                onPlacementChange={handlePlacementChange}
                saving={savingPlacement}
              />
            )}

            {/* Before/after toggle */}
            {beforeImageUrl && frameImageUrl && (
              <div className="card rabbet">
                <BeforeAfterToggle
                  beforeImageUrl={beforeImageUrl}
                  afterImageUrl={frameImageUrl}
                  sceneName={selectedScene?.name}
                />
              </div>
            )}

            {/* Start order CTA */}
            <div className="card rabbet">
              <StartOrderButton
                mockupId={mockupId}
                disabled={!mockupId || loadingScene}
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

            {/* Config context card */}
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
                  Drag to reposition · Scroll to resize · Use sliders for wall angle.
                  Position is saved automatically.
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
