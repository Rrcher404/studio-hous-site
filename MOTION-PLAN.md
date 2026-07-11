# SolHous Motion System — Execution Plan

Status: **ALL PHASES SHIPPED (P1–P7). M1–M8 complete; S1/S2 stood down for a CSS degradation; S3 cut.** Full `next build` green; mobile no-bleed on home/sessions/work; reduced-motion + keyboard verified.

## Shipped
- **P1 — Foundation:** `hooks/usePrefersReducedMotion.ts`, `components/motion/` barrel, motion tokens + `--nav-h` + documented contracts in `globals.css`.
- **P2 — Sticky stack (M2):** `StickyStack` (server, pure-CSS pin-and-cover) on home — 5 commercial doors, integrated with the CMS `getContent("home.rooms")` layer; 3 overflow rooms below. `top:92px`, split cards, mobile→vertical list. Kept OUT of `Reveal` (transform would break sticky).
- **P3 — Expand-to-detail (M3):** `ExpandDetail` on `/sessions` (3 categories); prices never hidden; measured-height reveal; `inert` + per-category aria-labels; deep links.
- **P4 — Bento + split-sticky (M4/M5):** `BentoGrid` (asymmetric, Records lg / HousScapes sm / Field Notes md / Book CTA) replaces the interim overflow grid; `SplitSticky` pins the convictions thesis while the three scroll past.
- **P5 — Lookbook (M6):** `LookbookBand` native scroll-snap on `/work` (Roll 001); focusable region + skip link.
- **P6 — Polish (M7/M8):** gallery cascade (flash-free, 440ms cap) · steps timeline spine · booking 4-segment progress.
- **P7 — Page-enter (VT degradation):** opacity-only `room-in` on `<main>` (no transform → sticky-safe). Native View Transitions deliberately NOT enabled (SPA `<Link>` nav + config risk vs. a first-to-cut signature nicety). **S3 hero breath cut** — `HeroVeil`/sunbloom already carry the life.
- **Verified:** mobile 375px no horizontal bleed (home + sessions + work) · reduced-motion safe (killswitch + JS short-circuit) · keyboard/aria · booking wizard intact · **full build passes**.

## Follow-ups
- True View Transitions (S1) + shared-element (S2) remain available if desired later, via `experimental.viewTransition`.
- Optional depth: a scroll-driven recede-scale on covered stack cards was intentionally skipped (`view()` on a pinned card fires at the wrong time).

---
_Original P0 plan below._

Status: **P0 complete — awaiting approval to build P1.**
Law order: execution doc → DESIGN-SPEC.md → live `globals.css` tokens.
Dependency decision: **CSS-only CONFIRMED.** No GSAP / Lenis / Framer / Three. IO reused only where JS already lives (the `Reveal` pattern). Scroll-linked polish via CSS `animation-timeline: view()` as *progressive enhancement* over a plain sticky base.

> Note: the two docs the master prompt cites (`solhous-motion-ui-research-brief.md`, `solhous-website-THRESHOLD-concept.md`) are **not in the repo**. Working from the execution doc + DESIGN-SPEC, which agree. Flagged, not blocking.

---

## Think Block answers

1. **Home order / stack host.** Hero → `Roll 001 · the rooms` (`.uni`, 8 cards) → `Roll 002` work/gallery → `Roll 003` sessions split → `Roll 004` convictions → `Roll 005` firstwords. Natural sticky-stack host = **Roll 001**. It already *is* "the doors." The stack replaces the `.uni` grid there — no two competing rooms UIs.
2. **Rooms data.** Already typed inline in `app/page.tsx` (`rooms[]`: href/img/alt/k/h/p/imgPos) — one field-rename from `StickyStackItem`. **Extract to `lib/content/rooms.ts`** so the stack (P2) and the bento overflow (P4) share one source.
3. **Sessions presentation.** Plain sections + `.cats` 3-col grid; **tier prices already render inline.** So expand ≠ price reveal. Expand adds **per-category detail** (inclusions / deliverables / turnaround) via **inline disclosure**, same pattern desktop + mobile, prices always visible. That's M3.
4. **Work lookbook host.** `Gallery` is masonry (`.gal` columns) — keep it for browse. Lookbook is a **separate horizontal chapter**, not a Gallery rewrite. Native `overflow-x` + `scroll-snap`.
5. **One theater first → Home.** The sticky door-walk answers "what is this place" for the highest-traffic entry. Work gets the lookbook, which is a *native-scroll chapter*, not a scroll-jack — so it doesn't spend Home's theater budget.
6. **z-index / sticky conflicts.** `nav.sitenav` = z95, fixed `top:14px`, ~54px tall. Sticky cards live inside `main` (z2) → **nav always floats above, Book always clickable.** Define `--nav-h: 68px`; stack `top: calc(var(--nav-h) + clamp(12px,2vw,24px))`. `body{overflow-x:hidden}` is already set (helps the lookbook). No sticky ancestor sets `overflow:hidden` today — the stack container must keep it that way or sticky dies. Consent z100 / booking modal z130 both sit above the stack — correct.
7. **VT degradation.** If native View Transitions are flaky in Next 16, fall back to a **200–300ms opacity cross-fade** on route change (no shared-element morph). Still reads as rooms dissolving into each other. S2 shared-element only rides on a stable S1.

---

## Must-ship inventory (M1–M8) → home surface

| ID | Element | Lands on | Notes |
|----|---------|----------|-------|
| M1 | Motion foundation (tokens, reduced-motion, `components/motion/`) | global | P1 |
| M2 | Sticky stack (pin + cover) | Home `Roll 001` (replaces `.uni`) | 5–6 primary doors; overflow → bento |
| M3 | Expand-to-detail (inline disclosure) | `/sessions` `.cats` | adds detail, never hides price |
| M4 | Editorial bento | Home, after the stack | holds the 2–3 overflow rooms + a Book tile |
| M5 | Split sticky text + media | Home `Roll 004` convictions **or** founding worldview | reuse existing `.split`, add sticky copy col |
| M6 | Horizontal lookbook band | `/work`, own chapter above masonry | native scroll-snap |
| M7 | Numbered step polish | `/sessions` `Roll 004` (`.steps`) + BookingModal | refine, don't reinvent |
| M8 | Gallery cascade entrance | `Gallery` (Work + Home teaser) | IO stagger ~40–80ms, once per view |

Signature: **S1** View Transitions (native-first) · **S2** shared-element (only if S1 stable) · ~~**S3** hero breath — **CUT.** HeroVeil already follows the cursor and the sunbloom breathes; DESIGN-SPEC forbids stacking two hero treatments.~~

## Proposed stack roster (finalize in P2)
Stack (strong imagery + commercial weight): **Sessions, Work, Direction Market, Spaces, Hous Sites.**
Bento overflow (editorial / sound, lighter): **Field Notes, Records, HousScapes** + a **Book** tile.

---

## Conflicts / watch-list
- Keep the stack container free of `overflow:hidden` (kills `position:sticky`).
- Global reduced-motion killswitch (`globals.css:290`) already nukes all `animation`/`transition` — new CSS motion is auto-covered; **sticky scale must gate on non-reduced-motion explicitly** (sticky itself isn't a transition).
- Book (nav z95 + modal z130) and skip link (z200) must stay above every new stacking context — never mint a higher z-index in `main`.
- Mobile `≤768px`: sticky stack degrades to a vertical card list, same content + CTAs (Gate G2). No WebGL, no 3D peel.

## Out of scope (do not build — C3)
Full-site horizontal · scroll-jacking / mandatory snap engines · infinite scroll · fan/shuffle/drag decks · 3D perspective peel · GSAP/Lenis/Framer/Three · WebGL fluid/particles · marquee-only prices or CTAs · hover-only critical info.

## Phase order — REORDERED (concurrent Panel writer on home page)
A concurrent **Hous Panel / CMS** build is live-editing `app/page.tsx` (now on `getContent`/`editable`), `app/layout.tsx`, and `app/globals.css`. `sessions.tsx` + `work.tsx` are **clean**. To avoid two writers on `page.tsx`, the home-page theater is deferred.

- **Build now (clean ground):** P1 ✅ → **P3** Sessions expand → **P5** Work lookbook → **P6** steps + Work-gallery cascade → **P8-partial** red team on shipped surfaces.
- **Deferred until Panel commits, then rebase onto their real `page.tsx`:** P2 sticky stack, P4 bento + split-sticky, P7 View Transitions. (Roster locked: **Commercial 5** — Sessions/Work/Direction Market/Spaces/Hous Sites in the stack; Field Notes/Records/HousScapes + Book in the bento.)
- **Build gate:** the production build is red from the Panel's `revalidateTag()` (their Next-16 signature bug, out of scope). My gate = **my files typecheck clean + render correctly**; the only tolerated `tsc` error is `app/api/revalidate/route.ts`.
- Cadence: straight through, report at gates. Cut order if time fails: S3(cut)→S2→S1→M8→M4.
