'use client';

/**
 * CatalogPicker
 * D-1: Lists data-driven catalog items grouped by category.
 * D-10: Enforces no mount type pre-selected or default-checked.
 * D-7: Surfaces concrete archival/UV descriptions.
 */

import { CatalogItem, CatalogItemType } from '@prisma/client';

interface CatalogPickerProps {
  items: CatalogItem[];
  selections: {
    mouldingId: string | null;
    matId: string | null;
    glazingId: string | null;
    mountId: string | null;
  };
  onSelect: (type: CatalogItemType, id: string | null) => void;
}

export function CatalogPicker({ items, selections, onSelect }: CatalogPickerProps) {
  const mouldings = items.filter((i) => i.type === 'MOULDING');
  const mats = items.filter((i) => i.type === 'MAT');
  const glazings = items.filter((i) => i.type === 'GLAZING');
  const mounts = items.filter((i) => i.type === 'MOUNT');

  return (
    <div className="picker-panel">
      {/* Moulding Selection */}
      <section className="flex flex-col gap-3">
        <h4 className="text-serif text-accent" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: 'var(--space-2)' }}>
          1. Frame Moulding
        </h4>
        <div className="catalog-grid">
          {mouldings.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelect('MOULDING', item.id)}
              className={`catalog-item flex flex-col items-center ${
                selections.mouldingId === item.id ? 'selected' : ''
              }`}
              id={`moulding-opt-${item.id}`}
            >
              <div className={`badge badge-${item.tier.toLowerCase()} catalog-item__tier`}>
                {item.tier}
              </div>
              <div className="catalog-item__name">{item.name}</div>
              <div className="catalog-item__price">KES {Number(item.priceKES).toLocaleString()}</div>
              <p className="text-xs text-muted mt-2" style={{ textAlign: 'left', display: 'none' }}>
                {item.archivalDescription}
              </p>
            </button>
          ))}
        </div>
        {selections.mouldingId && (
          <p className="text-xs text-muted animate-fade-in" style={{ background: 'var(--bg-2)', padding: 'var(--space-3)', borderRadius: 'var(--radius-sm)' }}>
            <strong>Spec:</strong> {mouldings.find(m => m.id === selections.mouldingId)?.archivalDescription}
          </p>
        )}
      </section>

      {/* Mat Selection */}
      <section className="flex flex-col gap-3">
        <h4 className="text-serif text-accent" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: 'var(--space-2)' }}>
          2. Matboard
        </h4>
        <div className="catalog-grid">
          {mats.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelect('MAT', item.id)}
              className={`catalog-item flex flex-col items-center ${
                selections.matId === item.id ? 'selected' : ''
              }`}
              id={`mat-opt-${item.id}`}
            >
              <div className={`badge badge-${item.tier.toLowerCase()} catalog-item__tier`}>
                {item.tier}
              </div>
              <div className="catalog-item__name">{item.name}</div>
              <div className="catalog-item__price">KES {Number(item.priceKES).toLocaleString()}</div>
            </button>
          ))}
        </div>
        {selections.matId && (
          <p className="text-xs text-muted animate-fade-in" style={{ background: 'var(--bg-2)', padding: 'var(--space-3)', borderRadius: 'var(--radius-sm)' }}>
            <strong>Spec:</strong> {mats.find(m => m.id === selections.matId)?.archivalDescription}
          </p>
        )}
      </section>

      {/* Glazing Selection */}
      <section className="flex flex-col gap-3">
        <h4 className="text-serif text-accent" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: 'var(--space-2)' }}>
          3. Glazing (Glass/Acrylic)
        </h4>
        <div className="catalog-grid">
          {glazings.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelect('GLAZING', item.id)}
              className={`catalog-item flex flex-col items-center ${
                selections.glazingId === item.id ? 'selected' : ''
              }`}
              id={`glazing-opt-${item.id}`}
            >
              <div className={`badge badge-${item.tier.toLowerCase()} catalog-item__tier`}>
                {item.tier}
              </div>
              <div className="catalog-item__name">{item.name}</div>
              <div className="catalog-item__price">KES {Number(item.priceKES).toLocaleString()}</div>
            </button>
          ))}
        </div>
        {selections.glazingId && (
          <p className="text-xs text-muted animate-fade-in" style={{ background: 'var(--bg-2)', padding: 'var(--space-3)', borderRadius: 'var(--radius-sm)' }}>
            <strong>Spec:</strong> {glazings.find(g => g.id === selections.glazingId)?.archivalDescription}
          </p>
        )}
      </section>

      {/* Mounting Selection */}
      <section className="flex flex-col gap-3">
        <h4 className="text-serif text-accent" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: 'var(--space-2)' }}>
          4. Mounting Method
        </h4>
        <p className="text-xs text-muted">
          Choose a preservation method to secure your print within the mat. Neither option is default.
        </p>
        <div className="catalog-grid">
          {mounts.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelect('MOUNT', item.id)}
              className={`catalog-item flex flex-col items-center ${
                selections.mountId === item.id ? 'selected' : ''
              }`}
              id={`mount-opt-${item.id}`}
            >
              <div className={`badge badge-${item.tier.toLowerCase()} catalog-item__tier`}>
                {item.tier}
              </div>
              <div className="catalog-item__name">{item.name}</div>
              <div className="catalog-item__price">KES {Number(item.priceKES).toLocaleString()}</div>
            </button>
          ))}
          {/* Allow clearing selection to fulfill D-10 */}
          <button
            onClick={() => onSelect('MOUNT', null)}
            className={`catalog-item flex flex-col items-center justify-center ${
              selections.mountId === null ? 'selected' : ''
            }`}
            style={{ minHeight: '100px' }}
            id="mount-opt-none"
          >
            <div className="text-xs text-muted">Clear Selection</div>
            <div className="catalog-item__name" style={{ margin: 0 }}>No Mount</div>
            <div className="catalog-item__price">KES 0</div>
          </button>
        </div>
        {selections.mountId && (
          <p className="text-xs text-muted animate-fade-in" style={{ background: 'var(--bg-2)', padding: 'var(--space-3)', borderRadius: 'var(--radius-sm)' }}>
            <strong>Spec:</strong> {mounts.find(m => m.id === selections.mountId)?.archivalDescription}
          </p>
        )}
      </section>
    </div>
  );
}
