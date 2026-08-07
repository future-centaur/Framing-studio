'use client';

/**
 * GuaranteeBanner
 * D-6: Guarantee language must be surfaced INLINE at the configurator's
 * decision point, not only in FAQ. This component is rendered inside the
 * configurator flow, before the "Add to cart" button.
 */

export function GuaranteeBanner() {
  return (
    <div className="guarantee-banner" role="note" aria-label="Satisfaction guarantee">
      <div className="guarantee-banner__icon" aria-hidden="true">🛡️</div>
      <div className="guarantee-banner__text">
        <div className="guarantee-banner__title">Quality Guarantee</div>
        <p>
          If your framed piece doesn&apos;t match the preview you approved, we remake it at no cost.
          Every order is reviewed before production begins.
        </p>
      </div>
    </div>
  );
}
