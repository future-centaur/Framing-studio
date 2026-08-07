'use client';

/**
 * LowResWarning
 * D-4: Low-resolution upload warning gate. Blocks proceeding or selection
 * until acknowledged.
 */

interface LowResWarningProps {
  isOpen: boolean;
  message: string;
  onAcknowledge: () => void;
  onSelectBudget: () => void;
}

export function LowResWarning({
  isOpen,
  message,
  onAcknowledge,
  onSelectBudget,
}: LowResWarningProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="warning-title">
      <div className="modal-box rabbet">
        <h3 id="warning-title" style={{ color: 'var(--warning)', marginBottom: 'var(--space-3)' }}>
          ⚠️ Low Resolution Warning
        </h3>
        <p className="text-secondary mb-5" style={{ fontSize: '0.95rem' }}>
          {message}
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={onAcknowledge}
            className="btn btn-primary w-full"
            id="ack-warning-btn"
          >
            Acknowledge & Proceed
          </button>
          <button
            onClick={onSelectBudget}
            className="btn btn-outline w-full"
            id="select-budget-glazing-btn"
          >
            Switch to Budget Glazing
          </button>
        </div>
      </div>
    </div>
  );
}
