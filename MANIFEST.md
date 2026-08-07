## MANIFEST — Hollow & Hale marketing website (framing studio, dual photographer/client path), 2026-08-05, tier 2

*Compiled from `framing-studio-research-doc.md` per Domain Acquisition Model v0.2, Steps 3–4–5–7.*
*Tier 2 (Substantive — professional practice/industry convention): framing archival standards carry real consequence for trust and product quality but are not regulated/legal/clinical, and the source doc's own sourcing is informal rather than primary-source.*
*Updated 2026-08-05 — practitioner input, round 1 (resolves former C-1–C-6, confirms/refutes E-1/E-2/E-3/E-5, adds A-9/A-10, B-2, C-7, D-8/D-9/D-10). Round 2: closes C-7 fully (referral = commission only), adds A-11/D-11 (studio branding config), A-12/D-12 (multi-order cart), D-13 (KES currency), D-14 (scene visualization scope: static curated scenes only), and confirms A-9's dual-audience + direct-handoff behavior (Option A).*

---

### A. Entities

| id | canonical term | definition | source |
|---|---|---|---|
| A-1 | Moulding | The visible frame material (wood or metal); purely aesthetic choice, no protective/archival function | Domain Research §2 |
| A-2 | Matting | Board surrounding the print inside the frame; ranges from acidic wood-pulp (degrades over time, can damage the print) through pH-neutral alpha-cellulose to cotton rag (archival standard) | Domain Research §2 |
| A-3 | Glazing | Glass or acrylic covering over the artwork; tiers run standard (protection only) → UV-protective → museum-grade anti-reflective (~99% UV-blocking, minimal visible glare) | Domain Research §2 |
| A-4 | Mounting | Method of attaching/holding the print; float mount exposes the print's full margin/deckled edge, versus flush/standard mount. **Corrected 2026-08-05:** neither is the default — both remain popular. No default should be pre-selected or implied in copy; present as an equal choice | Domain Research §2; corrected per practitioner input (see E-5) |
| A-5 | Tier (budget/mid/premium) | Cross-cutting classification applied to moulding/mat/glazing/mount options, driven by invisible protective/archival choices rather than visible aesthetics | Domain Research §2; Workflow Research §5 |
| A-6 | Referral path | Photographer refers a client; client completes their own order. Photographer earns a **cash commission only** — discount reward removed, discount reward-type is exclusive to resale (see A-7) | Workflow Research §5; refined per practitioner input 2026-08-05 |
| A-7 | Wholesale/resale (white-label) path | Photographer configures and orders directly; studio ships to the client under white-label **packaging only** (order confirmations/emails/invoices remain studio-branded). Photographer receives a default 13% wholesale **discount**, adjustable at studio discretion per photographer | Workflow Research §5; refined per practitioner input 2026-08-05 |
| A-8 | Rabbet | The structural groove in a physical frame that holds glazing, mat, and print; reused site-wide as the visual signature element | Visual Design §8 |
| A-9 | Scene/room visualization | Composites a framed piece into a staged room/wall scene, for **both clients and photographers**, as a pre-sale mockup before a physical print exists. Practitioner's photographer currently does this manually via a third-party app (Frameit). **A "start this order" action on the mockup hands off directly into the slice-1 configurator, pre-filled with the same moulding/mat/glazing/mount configuration shown in the mockup** (Option A, practitioner-confirmed 2026-08-05) — not in original research doc | Practitioner input, 2026-08-05 |
| A-10 | Photographer dashboard | Minimal, photographer-scoped view showing referral/commission tracking. Distinct from and narrower than the excluded full client account portal | Practitioner input, 2026-08-05 (see B-2) |
| A-11 | Studio identity / branding | Studio name, logo, and brand assets must be a swappable configuration point, not hardcoded into templates or copy. "Hollow & Hale" is placeholder content for this build instance, not fixed product identity — build target is white-label/multi-studio-capable | Practitioner input, 2026-08-05 (see D-11) |
| A-12 | Multi-order cart | A single checkout can contain multiple separate framed-piece orders at once. Distinct from a multi-item collage/layout builder (A-9 scenes and configurator orders remain single-piece configurations; the cart just lets several of them be paid for together). **One cart = one path** — entirely referral or entirely resale, no mixing (see D-15) | Practitioner input, 2026-08-05 (see D-12, D-15) |
| A-13 | Direct order path | A client purchase with no photographer involved at all — no referral link, no resale relationship. Skips commission, discount, and approval logic entirely; behaves as a plain checkout. Sits alongside A-6/A-7 as the third valid Cart path | Practitioner input, 2026-08-06 (originally surfaced as an unresolved domain question during PRD drafting, then confirmed as a named path) |

---

### B. Resolved conflicts

| id | the conflict | resolution | resolution type | if violated, what breaks and for whom |
|---|---|---|---|---|
| B-1 | Referral vs. resale had no stated rule for which is primary or how a photographer chooses | Photographer freely chooses per client/order — not fixed at signup. Referral pays a **cash commission only**. Resale pays a **13% default wholesale discount**, studio-adjustable per photographer. Reward types are now mutually exclusive by path — no per-referral choice needed, closing C-7 | **fully resolved — practitioner input, 2026-08-05** | Configurator must implement free choice between the two paths, and must not conflate the two distinct reward mechanisms (commission vs. discount) |
| B-2 | Problem Definition §1 states "no account portals" as an explicit non-goal, but C-4/A-10 requires a photographer-facing dashboard for commission tracking | A minimal, photographer-only dashboard (commission/discount balance, referral tracking) is in scope. This supersedes the original non-goal for this specific case. A full client-facing account portal remains excluded | **resolved — practitioner input, 2026-08-05, overrides prior stated non-goal** | Either photographers can't see what they're owed (adoption/trust failure in a paid referral relationship), or scope quietly balloons into a full account system nobody asked for |

---

### C. Open questions (carried, not resolved)

*None outstanding as of 2026-08-05. Former C-1–C-6 resolved via B-1/B-2/A-6/A-7/A-10; C-7 closed via A-6 (referral reward type fixed to commission-only, no per-referral choice needed).*

*Note: this table being empty is a milestone, not a default state — CL-5 and CL-7 remain open in Section E and should not be mistaken for closed.*

---

### D. Constraints (regulatory / structural / domain-imposed)

| id | constraint | source | if violated, what breaks and for whom |
|---|---|---|---|
| D-1 | Catalog (moulding/mat/glazing/mount options) must be data-driven records, not hardcoded, and taggable by tier | Workflow Research §5 | Adding or repricing an option requires a redesign/redeploy cycle instead of a data change |
| D-2 | Live preview must recomposite the frame/mat/glazing over the client's own uploaded photo, not a stock image | Workflow Research §5; User Research §4 | Fails to address Persona 1's core fear — the site's primary trust mechanism fails |
| D-3 | Running price total must update live as the client builds; no surprise total at checkout | Workflow Research §5; User Research §4 | Triggers Persona 1's stated repellent — likely increases abandonment |
| D-4 | Low-resolution upload must trigger a warning before an expensive glazing tier or large size can be selected against it | Workflow Research §5 edge cases | Client pays premium price for a result that won't hold up — guarantee/refund liability |
| D-5 | Saved/shareable design link must not require account creation | Workflow Research §5 edge cases | Contradicts explicit non-goal and adds friction Persona 1 doesn't tolerate |
| D-6 | Guarantee language must be surfaced inline at the configurator's decision point, not only in FAQ | User Research §4; IA §6 | Guarantee doesn't reach the client at peak pre-purchase anxiety |
| D-7 | Archival/UV specifics shown to photographers must be concrete, not generic marketing language | User Research §4, Persona 2 | Fails to differentiate from competitors' marketing-only claims |
| D-8 | Referral/resale choice must be presented as free choice, not pre-routed by the system | Practitioner input, 2026-08-05 (B-1) | Photographer loses the flexibility they were promised; may pick the "wrong" path with no way to correct it |
| D-9 | Photographer dashboard (A-10) exposes referral/commission tracking only — no client-facing account features | Practitioner input, 2026-08-05 (B-2) | Scope creeps from "minimal dashboard" into a full account portal, contradicting the deliberate carve-out |
| D-10 | No mount type (float or standard) should be pre-selected or implied as default in copy or UI | Practitioner input, 2026-08-05 (E-5) | Implies a false industry norm and may steer clients away from their actual preference |
| D-11 | Studio name, logo, and brand assets must be a single, easy configuration point (e.g. one config object/settings screen), never hardcoded into page templates, copy, or components | Practitioner input, 2026-08-05 (A-11) | "Hollow & Hale" is confirmed placeholder — hardcoding it means every other studio instance requires a code change instead of a config change, defeating the stated white-label intent |
| D-12 | Checkout must support a cart of multiple separate orders paid together in one transaction. This is explicitly not a multi-item/collage layout builder — each item in the cart remains its own single-piece configuration | Practitioner input, 2026-08-05 (A-12) | Without this, a client or photographer with several pieces must complete separate checkouts, or the feature gets misbuilt as the excluded collage tool |
| D-13 | All pricing, catalog prices, live totals, wholesale discount calculations, and commission amounts must be denominated in KES throughout | Practitioner input, 2026-08-05 | Any USD/generic pricing shipped anywhere breaks the live price total (D-3), the 13% wholesale discount (A-7), and commission accuracy (A-10) simultaneously |
| D-14 | Scene visualization (A-9) ships with a small, curated, on-brand static scene library only — no user-uploaded room backgrounds in this phase | Practitioner input, 2026-08-05 | Room-upload is a real, larger feature (its own composite/perspective problem); shipping it now would blow slice 2's scope past what's been claim-tested |
| D-15 | A single cart/checkout must be entirely one path — either referral or resale, not mixed. The chosen path's reward mechanism (commission or discount) applies to every item in that checkout | Practitioner input, 2026-08-05 (resolves cart/path-mixing question, A-12) | Mixed carts would require splitting one transaction into two different reward calculations mid-checkout — ambiguous math and a support/dispute risk on every mixed order |
| D-16 | Payment must process via M-Pesa, through the Daraja API | Practitioner input, 2026-08-06 (originally surfaced as an unresolved domain question during PRD drafting) | Checkout cannot settle real transactions without this — the stubbed payment step in slice 1's PRD must be replaced with actual Daraja integration (STK push + callback handling) before this slice is truly done |
| D-17 | Scene visualization (A-9) supports auto-orientation correction (EXIF-based), adjustable placement (move/scale) of the piece within the scene, and a before/after toggle. Crop/straighten/perspective correction and lighting matching are deferred, not in this slice | Practitioner-guided Frameit feature review, 2026-08-05 (previously decided in conversation only — formalized here, not newly invented) | Without this row, "placement" and "before/after" exist only as chat history, not as a checkable manifest fact — exactly the prose-vs-manifest gap this pipeline exists to prevent |

---

### E. Declared assumptions (relied on, unsourced)

| id | assumption | status | why relied on | what would confirm or refute it |
|---|---|---|---|---|
| E-1 | Persona 1's core fear ("what if it looks different in person") is the single biggest pre-order hesitation | **Confirmed — practitioner input, 2026-08-05.** Other fears may exist; deferred, not blocking | Organizing premise for homepage §7 and configurator design | — |
| E-2 | Persona 1's and Persona 2's "convinced by" / "repelled by" lists are accurate and complete | **Confirmed — practitioner input, 2026-08-05** | Drives configurator content requirements | — |
| E-3 | "% of visitors who start a configuration" is the correct success metric | **Refined — practitioner input, 2026-08-05:** track dual metric — % who start **and** % who complete (start→complete rate) | Original proxy risked rewarding started-but-abandoned configs | — |
| E-4 | Framebridge's craft storytelling is thin; WHCC/Bay Photo's craft depth is inaccessible to end clients | **Still open — not addressed this round** | Basis for stated market positioning | Dated review of competitors' current sites |
| E-5 | Float mounts are preferred by "most" fine-art/portrait photographers | **Refuted/corrected — practitioner input, 2026-08-05:** float is popular but not the default; standard/flush also popular. Corrected in A-4/D-10 | — | — |
| E-6 | An "established configurator pattern" exists "across the category," not just at Framebridge | **Still open — not addressed this round** | Justifies live-recompositing as baseline, not differentiator | Survey of additional competitors |

---

**Manifest counts:** entities 13, resolved_conflicts 2, open_questions 0, constraints 17, assumptions 6 (4 settled, 2 still open)
