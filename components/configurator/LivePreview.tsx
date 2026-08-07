'use client';

/**
 * LivePreview
 * D-2: Live preview recomposited over client's own photo.
 * Renders the base64 or storage URL returned by /api/preview.
 */

interface LivePreviewProps {
  previewImageUrl: string | null;
  loading: boolean;
  error: string | null;
}

export function LivePreview({ previewImageUrl, loading, error }: LivePreviewProps) {
  return (
    <div
      className="preview-panel rabbet flex flex-col items-center justify-center"
      style={{
        aspectRatio: '4/3',
        background: '#141311',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        position: 'relative',
        minHeight: '320px',
      }}
    >
      {loading && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(16,15,13,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            flexDirection: 'column',
            gap: 'var(--space-3)',
          }}
        >
          <div className="spinner" />
          <span className="text-sm text-secondary animate-pulse">Rendering preview...</span>
        </div>
      )}

      {error && (
        <div className="p-5 text-center flex flex-col items-center gap-2">
          <span style={{ fontSize: '2rem' }}>⚠️</span>
          <span className="text-sm text-muted">{error}</span>
        </div>
      )}

      {!previewImageUrl && !loading && !error && (
        <div className="p-5 text-center flex flex-col items-center gap-2">
          <span style={{ fontSize: '2.5rem', opacity: 0.4 }}>🖼️</span>
          <span className="text-sm text-muted">Upload a photo to see your live preview</span>
        </div>
      )}

      {previewImageUrl && !error && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={previewImageUrl}
          alt="Composited custom frame preview"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            transition: 'opacity var(--dur-mid) var(--ease-out)',
            opacity: loading ? 0.5 : 1,
          }}
        />
      )}
    </div>
  );
}
