# PRD — Slice 2: Scene/Room Visualization — Hollow & Hale

**Slice card:** `SLICE_CARD_02.md`
**Manifest:** `MANIFEST.md` @ unversioned
**Domain standing:** acquired
**Stack:** Next.js (React) + Node + Postgres, hosted on Vercel-style platform (same as slice 1)
**Dependency:** requires slice 1's Configuration entity and composite engine (D-2) — not buildable standalone. Cursor must have slice 1's codebase present, not just this PRD.

---

## 1. What the system is and why it exists

A tool, for both clients and photographers, that places an already-configured framed piece into a curated, static, on-brand room scene — producing a pre-sale mockup before any physical print exists. It replaces the practitioner's photographer's current manual use of a third-party app (Frameit) for exactly this purpose. Its distinguishing requirement, versus a generic "room preview" feature, is that the mockup is not a dead end: a "start this order" action carries the exact configuration shown into slice 1's real configurator and checkout.

## 2. Core entities and their relationships

- **Scene** — a curated, studio-approved static room/wall background image. Swappable via the same config-point pattern as Studio Config (A-11), not hardcoded. *(enforced §4 scenes endpoint, §6 scene asset storage)*
- **Placement** — position, scale, and (optionally) rotation of a Configuration's composited image within a chosen Scene. *(enforces D-17)*
- **Mockup** — a saved combination of one Configuration (from slice 1) + one Scene + one Placement. Has a before/after toggle state (raw uploaded photo vs. framed-in-scene). *(enforces A-9, D-17)*
- **Visual identity** — this slice's UI (scene picker, placement canvas, before/after toggle) reuses the rabbet motif as the site-wide visual signature element, same as every other page. Not a new component — the existing shared visual system, applied here too. *(enforces A-8)*
- **Configuration** — reused unmodified from slice 1; this slice does not redefine it, only renders it into a Scene.

## 3. Data flow

**Enters:**
- An existing Configuration (from slice 1 — moulding/mat/glazing/mount + uploaded photo)
- Scene selection from the curated library
- Placement adjustments (drag/scale within the scene canvas)

**Stored:**
- Scene library (curated images + metadata, admin-managed)
- Mockup records (Configuration reference + Scene reference + Placement values)

**Returned:**
- Composited mockup image (piece placed into scene, using the same rendering engine as slice 1's live preview — not a separate implementation)
- Before/after toggle payload (raw photo URL + mockup image URL)

**Written (side effects):**
- On "start this order": the Configuration is carried unmodified into slice 1's `/configure` flow, pre-filled — no new Order or Cart entity is created here; slice 1 owns that from this point forward

## 4. Backend API contract (Next.js Route Handlers, `/app/api`)

| Endpoint | Input | Output | Enforces |
|---|---|---|---|
| `GET /api/scenes` | — | Scene[] (curated library) | D-14 |
| `POST /api/mockup` | `{ configurationId, sceneId, placement }` | `{ mockupId, mockupImageUrl }` — reuses slice 1's compositing service | A-9, reuse of D-2 |
| `GET /api/mockup/:id` | — | Mockup (with before/after payload) — **no authentication required**, same as D-5 | A-9, D-5 |
| `PATCH /api/mockup/:id/placement` | `{ placement }` | updated `mockupImageUrl` | — |
| `POST /api/mockup/:id/start-order` | — | redirects/hands off to `/configure?configurationId=...`, pre-filled | Option A handoff (A-9) |

## 5. Frontend behaviour

**Landing state:** a "Visualize in a room" entry point available from both the client configurator flow (after building a Configuration) and the photographer dashboard.

**Session flow (identical for client and photographer):**
1. Starting from an existing Configuration, select a curated Scene
2. Adjust Placement (drag to reposition, pinch/scroll to scale) within the scene canvas
3. Toggle before/after to compare raw photo vs. framed-in-scene mockup (D-17)
4. "Start this order" → hands off directly into slice 1's configurator, pre-filled with the identical Configuration (moulding/mat/glazing/mount), ready to add to cart

**Completion state:** either the photographer/client proceeds into slice 1's checkout, or exits with the mockup saved (revisitable via its `mockupId`, **no account required to view it** — extends D-5's shareable-link pattern to Mockups) but no order created.

**Visual identity:** every page introduced in this slice (`/visualize`, scene picker, placement canvas) uses the same rabbet-motif visual signature as the rest of the site — no separate visual language for this slice (A-8).

## 6. File structure

```
/app
  /visualize/[configurationId]/page.tsx   # scene picker + placement + before/after
  /api/scenes/route.ts
  /api/mockup/route.ts
  /api/mockup/[id]/route.ts
  /api/mockup/[id]/placement/route.ts
  /api/mockup/[id]/start-order/route.ts
/components
  /visualize/ (ScenePicker, PlacementCanvas, BeforeAfterToggle, StartOrderButton)
/lib
  compositing.ts        # extended, not duplicated — same module as slice 1's D-2 engine
/prisma
  schema.prisma          # adds Scene, Mockup, Placement (embedded or joined)
```

## 7. Environment variables

- No new variables beyond slice 1's `BLOB_STORAGE_TOKEN` (curated scene images stored the same way as uploaded photos/catalog assets)

## 8a. Deferred this increment
- User-uploaded room backgrounds (D-14) — a genuinely larger feature, its own composite/perspective problem. *Returns when: this slice's static-scene version has shipped and been used.*
- Crop/straighten/perspective correction on the uploaded piece
- Lighting matching (adjusting mockup warmth/brightness to the scene)
- Social share with watermark

## 8b. Permanently excluded
- Multi-format upload (RAW/TIFF/HEIC) — reason: same as slice 1, JPG/PNG only
- AI-driven correction (wrinkle removal, paper/ink color adjustment) — reason: out of domain, belongs to a different product (Frameit's actual use case, not ours)
- Genre presets, reference/content library, frame-or-scene marketplace — reason: out of domain
- High-res/print-ready export with bleed marks — reason: the mockup leads into our order flow, it is not a deliverable file for outside printing
- Multi-item/collage layout within one mockup — reason: explicit non-goal; multiple *orders* together is the slice-1 cart (A-12), not this

## 9. Success criteria — what "working" looks like after first session
- Either a client or a photographer can pick a curated scene, place their configured piece in it, and see a working before/after toggle
- Clicking "start this order" opens slice 1's configurator with the identical configuration already applied, with no re-upload or re-selection required
- The scene library is swappable the same way Studio Config is (A-11 pattern) — adding/removing a curated scene requires no code change
- The mockup's rendered image matches what slice 1 would actually produce for that same Configuration — no visual drift between the sales tool and the real order

---

## Domain questions status
None open. This slice inherits slice 1's resolved payment/direct-path decisions by not touching checkout at all — the handoff hands the Configuration to slice 1, which owns everything from that point on.
