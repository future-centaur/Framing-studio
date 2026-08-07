'use client';

/**
 * StartOrderButton — CTA that hands the current mockup's Configuration
 * into slice 1's /configure route, pre-filled. No Order/Cart is created here.
 *
 * A-9 Option A handoff: calls POST /api/mockup/:id/start-order,
 * receives { configureUrl }, then navigates the client to that URL.
 * Slice 1 owns everything from that point forward.
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface StartOrderButtonProps {
  mockupId: string | null;
  disabled?: boolean;
}

export function StartOrderButton({ mockupId, disabled = false }: StartOrderButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStartOrder = async () => {
    if (!mockupId) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/mockup/${mockupId}/start-order`, { method: 'POST' });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? 'Failed to start order');
      }

      // Navigate to slice 1's configurator, pre-filled with the exact Configuration.
      // No new Order/Cart entity is created — slice 1 owns this from here.
      router.push(data.configureUrl);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong';
      console.error('[StartOrderButton]', err);
      setError(message);
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        id="start-order-btn"
        className="btn btn-primary btn-lg w-full rabbet"
        onClick={handleStartOrder}
        disabled={disabled || !mockupId || loading}
        aria-busy={loading}
      >
        {loading ? (
          <>
            <div className="spinner" style={{ width: 18, height: 18 }} />
            Opening configurator…
          </>
        ) : (
          <>
            🛒 Start This Order
          </>
        )}
      </button>

      {error && (
        <p
          className="text-xs"
          style={{ color: 'var(--error)', marginTop: 'var(--space-2)', textAlign: 'center' }}
        >
          {error}
        </p>
      )}

      <p
        className="text-xs text-muted"
        style={{ textAlign: 'center', marginTop: 'var(--space-2)' }}
      >
        Opens the configurator with your exact frame selection pre-filled — no re-selection needed.
      </p>
    </div>
  );
}
