'use client';

/**
 * BeforeAfterToggle — two-state toggle comparing raw photo vs framed-in-scene.
 *
 * D-17: before/after toggle (raw uploaded photo vs. framed-in-scene mockup).
 * "Before" = configuration.fileUrl (the client's original upload)
 * "After"  = mockup.mockupImageUrl (composited into the chosen scene)
 */

import { useState } from 'react';

type ToggleState = 'before' | 'after';

interface BeforeAfterToggleProps {
  /** Raw uploaded photo URL. */
  beforeImageUrl: string;
  /** Composited mockup URL. */
  afterImageUrl: string | null;
  /** Scene name for the alt/aria label. */
  sceneName?: string;
}

export function BeforeAfterToggle({
  beforeImageUrl,
  afterImageUrl,
  sceneName = 'room scene',
}: BeforeAfterToggleProps) {
  const [view, setView] = useState<ToggleState>('after');

  const activeImageUrl = view === 'before' ? beforeImageUrl : (afterImageUrl ?? beforeImageUrl);

  return (
    <div className="before-after-container">
      {/* Image display */}
      <div className="before-after-image-wrap rabbet-accent">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={view} // key forces re-render animation on toggle
          src={activeImageUrl}
          alt={
            view === 'before'
              ? 'Your original uploaded photo'
              : `Framed piece placed in ${sceneName}`
          }
          className="before-after-image animate-fade-in"
        />

        {/* Floating pill label */}
        <div className="before-after-pill">
          {view === 'before' ? 'Original' : 'In Room'}
        </div>
      </div>

      {/* Toggle control */}
      <div className="before-after-toggle" role="group" aria-label="Before/after view">
        <button
          id="toggle-before-btn"
          className={`btn ${view === 'before' ? 'btn-primary' : 'btn-ghost'}`}
          onClick={() => setView('before')}
          aria-pressed={view === 'before'}
          disabled={!beforeImageUrl}
        >
          Before
        </button>
        <button
          id="toggle-after-btn"
          className={`btn ${view === 'after' ? 'btn-primary' : 'btn-ghost'}`}
          onClick={() => setView('after')}
          aria-pressed={view === 'after'}
          disabled={!afterImageUrl}
        >
          After
        </button>
      </div>

      {!afterImageUrl && (
        <p className="text-xs text-muted" style={{ textAlign: 'center', marginTop: 'var(--space-2)' }}>
          Select a scene to see the &quot;After&quot; view
        </p>
      )}
    </div>
  );
}
