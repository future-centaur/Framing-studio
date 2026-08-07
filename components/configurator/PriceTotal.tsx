'use client';

/**
 * PriceTotal
 * D-3: Live running price total updates as selections change
 * D-13: All pricing denominated in KES
 */

import { PriceBreakdown } from '@/lib/pricing';

interface PriceTotalProps {
  totalKES: number;
  breakdown?: PriceBreakdown | null;
  loading?: boolean;
}

export function PriceTotal({ totalKES, breakdown, loading = false }: PriceTotalProps) {
  return (
    <div className="card rabbet flex flex-col gap-3" style={{ background: 'var(--bg-2)' }}>
      <div className="flex justify-between items-center">
        <span className="text-secondary text-sm">Running Total</span>
        {loading ? (
          <span className="animate-pulse text-muted text-xs text-mono">Recalculating...</span>
        ) : (
          <span className="price-kes" style={{ fontSize: '1.5rem' }}>
            KES {totalKES.toLocaleString()}
          </span>
        )}
      </div>

      {breakdown && !loading && (
        <div
          className="flex flex-col gap-2 mt-2 pt-2"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="flex justify-between text-xs text-muted">
            <span>Moulding</span>
            <span className="text-mono">KES {breakdown.mouldingKES.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-xs text-muted">
            <span>Matting</span>
            <span className="text-mono">KES {breakdown.matKES.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-xs text-muted">
            <span>Glazing</span>
            <span className="text-mono">KES {breakdown.glazingKES.toLocaleString()}</span>
          </div>
          {breakdown.mountKES > 0 && (
            <div className="flex justify-between text-xs text-muted">
              <span>Mounting</span>
              <span className="text-mono">KES {breakdown.mountKES.toLocaleString()}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
