# SLICE CARD 02 — Scene/Room Visualization — Hollow & Hale, 2026-08-05

*Drafted from MANIFEST.md / CLAIMS.md, post practitioner-input round 2. Primary claim: CL-9. Depends on slice 1's configurator/composite engine (D-2) — not a standalone rendering build.*

---

### Primary claim
A photographer or client can composite a framed piece into a staged room scene as a pre-sale mockup, before a physical print exists, and hand off directly into the slice-1 configurator to start a real order from that exact mockup.

### In scope
- Scene compositing for **both clients and photographers** — not photographer-only (A-9)
- Small, curated, on-brand **static** scene library (D-14) — no user-uploaded room backgrounds this phase
- Reuse of slice 1's frame/mat/glazing composite engine (D-2) — this is not a new rendering build
- Auto-orientation correction on upload (EXIF-based)
- Adjustable placement — move/scale the framed piece within the scene
- Before/after toggle (raw photo vs. framed-in-scene mockup)
- Direct handoff: a "start this order" action on the mockup opens the slice-1 configurator pre-filled with the same moulding/mat/glazing/mount configuration shown in the mockup (Option A, A-9)

### Deferred (real, tracked, not this slice)
- User-uploaded room backgrounds (D-14) — a genuinely larger feature, its own composite/perspective problem
- Crop/straighten/perspective correction on the uploaded piece
- Lighting matching (adjusting mockup warmth/brightness to the scene)
- Social share with watermark

### Permanently excluded
- Multi-format upload (RAW/TIFF/HEIC) — JPG/PNG only, same as slice 1
- AI-driven correction (wrinkle removal, paper/ink color adjustment)
- Genre presets, stele-rubbing/reference content library, frame-or-scene marketplace
- High-res/print-ready export with bleed marks — the mockup leads into our order flow, it isn't a deliverable file for outside printing
- Multi-item/collage layout within one mockup (a mockup is one framed piece in one scene — multiple *orders* together is the slice-1 cart, A-12, not this)

### Falsified-if
- The mockup requires re-uploading or reconfiguring from scratch to become a real order (handoff isn't direct)
- A non-curated or off-brand scene appears in the library
- The mockup uses a different composite engine/result than the slice-1 live preview, so the mockup doesn't match what actually gets ordered
- Client-side access to scene visualization is missing (built photographer-only despite A-9 covering both)

### Done-when
- Either a client or a photographer can pick a curated scene, place their configured piece in it, and see a before/after toggle
- Clicking "start this order" from the mockup opens the slice-1 configurator with the identical configuration already applied, ready to complete checkout
- The scene library is swappable/curatable the same way the studio-branding config point works (A-11) — not hardcoded per scene
