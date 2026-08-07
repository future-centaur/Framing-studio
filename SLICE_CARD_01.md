# SLICE CARD 01 — Configurator + Referral/Resale — Hollow & Hale, 2026-08-05

*Drafted from MANIFEST.md / CLAIMS.md, post practitioner-input round 2. Primary claim: CL-1. Updated to fold in CL-11 (cart), CL-12 (KES currency), D-15 (one cart = one path).*

---

### Primary claim
Referral and resale are distinct paths, freely chosen by the photographer per client/order, with mutually exclusive reward mechanisms: referral pays a cash commission, resale pays a default 13% wholesale discount (studio-adjustable per photographer).

### In scope
- Core configurator: moulding, matting, glazing, mounting (A-1–A-4), tier tagging (A-5), data-driven catalog (D-1)
- Live preview recomposited over the client's own uploaded photo (D-2); live running price total (D-3)
- Low-res upload warning gate (D-4); no-account shareable design link (D-5); guarantee surfaced inline at decision point (D-6); concrete archival/UV copy for photographers (D-7)
- No default mount pre-selected — float and standard presented as equal choices (D-10)
- Photographer signup: phone/email + self-declared "are you a photographer" checkbox — no verification gate (from resolved C-3)
- Free choice between referral (A-6) and resale (A-7) per order — not pre-routed (D-8)
- Referral: commission only, tracked and visible on photographer dashboard (A-10, D-9)
- Resale: 13% default wholesale discount, studio-adjustable per photographer; white-label **packaging only** — confirmations/invoices remain studio-branded (A-7)
- Approval step on photographer-initiated orders — applies to **both** referral and resale (resolved former C-6)
- Studio identity (name, logo, brand assets) as a single config point, not hardcoded anywhere in templates/copy (A-11, D-11, CL-10) — "Hollow & Hale" is placeholder content for this instance
- Rabbet groove as a recurring visual motif in UI (dividers, borders, section transitions) — a styling decision, not new engineering (A-8)
- Multi-order cart: checkout can hold several separate single-piece orders paid together, **entirely one path per cart** — referral or resale, never mixed (A-12, D-12, D-15, CL-11)
- All pricing — catalog, live totals, wholesale discount, commission — denominated in KES throughout (D-13, CL-12)
- Event tracking for configuration-start and configuration-complete, to measure the dual success metric (E-3)

### Deferred (real, tracked, not this slice)
- CL-9 — photographer-facing scene/room visualization (needs its own slice card and scope lock)
- Automated commission **payout** (this slice shows accurate tracking on the dashboard; moving money is a separate concern)
- Actual multi-tenant hosting/deployment for other studios (D-11 only requires the config point exists — not that a second studio is live)
- CL-5 / CL-7 validation (competitive positioning, category-pattern claims) — research tasks, not build blockers

### Permanently excluded
- Full client-facing account portal (dashboard stays photographer-only, commission/discount tracking only — D-9)
- Real-time order tracking (lightweight status lookup only, per original non-goal)
- Multi-item collage/layout builder (arranging several pieces within a single framed configuration) — note this is distinct from the now-in-scope multi-order cart, which pays for several separate single-piece orders together
- Any per-referral reward-type choice (fixed: commission-only for referral, discount-only for resale)
- AI-driven enhancement (wrinkle removal, perspective correction), RAW/HEIC ingestion, content marketplace, watermarked social export — none of these were adopted from the Frameit review

### Falsified-if
- A photographer is forced into one path, or the system defaults them into one without an active choice
- Referral pays anything other than commission, or resale pays anything other than the wholesale discount
- Studio name/logo appears hardcoded anywhere (template, copy, component) rather than reading from the config point
- The dashboard shows anything beyond commission/discount tracking, or shows inaccurate figures
- Any mount type is pre-selected or implied as default in the UI
- The approval step fires for only one of the two paths instead of both
- A single cart/checkout mixes referral and resale items, or applies the wrong reward mechanism to any item in it
- Any price, discount, or commission figure appears in a currency other than KES

### Done-when
- A photographer can sign up (phone/email + checkbox), then either generate a referral link or place a resale order, and complete either path end-to-end
- Commission from a completed referral appears correctly on the dashboard; a resale order applies the correct discount rate (default or studio-overridden)
- Changing the studio name/logo at the single config point updates every page with no code change
- The core configurator (all four product entities + live preview + live pricing) works identically whether the order originates from a client or a photographer
- An order from either path correctly triggers the approval step
- A cart holding multiple items checks out as one transaction, entirely referral or entirely resale, with the correct single reward mechanism applied across all items
- Every price shown or charged anywhere in the flow is in KES
