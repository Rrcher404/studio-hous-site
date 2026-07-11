# Studio Hous Website — Build Journal
**Live:** https://rrcher404.github.io/studio-hous-site/ · **Repo:** github.com/Rrcher404/studio-hous-site
**Built:** 2026-06-30 (single session) · **Method:** Casting Office committee + cross-cut + envision + full web-team review

> Read this before the next big Studio Hous / SolHous web build. It records what was decided, why, what shipped, and what's still open — so we don't relitigate settled calls or repeat dead ends.

---

## The arc (how we got here)

1. **Reviewed the original repo** `Rrcher404/solhous-website` (private) — a Next.js 15 single-page "premium" showcase: WebGL fluid shader, magnetic cursor, GSAP/Framer/Lenis, audio visualizer. Beautiful demo, but one page pretending to be a brand. No routing, no Studio Hous, no booking.
2. **Concept rounds (4 loops)** landed on **THRESHOLD** → then the aesthetic locked when Jene's own **graded film-still footage** arrived (Black Pro-Mist haze, silhouette, `'26 6 29` date stamp). The website now *aligns to his footage* instead of competing with it. This ties to the **SolHous Field Notes canon**.
3. **Built v1** as a static site (correct call — a brochure site has no reason to be a Next.js app).
4. **Full web-team committee review** (7 specialists + Voss red-team) on the real file. Convergent verdict, then v2 rebuild.
5. **Shipped live** via GitHub Pages using the already-authenticated `gh` CLI on Jene's Mac (Desktop Commander). No Vercel needed for a static site.

---

## Decisions locked (don't relitigate)

- **Stack = static HTML/CSS/JS, zero build.** Not Next.js. A one-page site doesn't need a framework; static is faster to ship, free to host, nothing to maintain. (Mara + Voss both confirmed; "I shipped static" is not the regret — "I shipped static with no images / no form" would have been.)
- **Aesthetic = Field Notes film-still.** Forest-haze palette (`--haze:#0e110c`, `--milk:#edefe0`, `--sun:#cea860`), Cormorant Garamond + Inter + JetBrains Mono, global grain+vignette, the `'26 6 29` date stamp as a brand device, the **"part-the-haze" cursor** (backdrop-blur veil masked away around the pointer). Use HIS graded footage, not a re-grade.
- **Hero copy = "Not the pose. The person."** Grounded beats abstract for the grad-mom buyer (committee promoted this over "Some moments only show up in the quiet").
- **Hosting = GitHub Pages now; Vercel + solhous.com later.** solhous.com currently serves a Notion site on `www`; Google Workspace MX must be preserved on any DNS change.

## Dead ends / things that didn't work (skip next time)

- **Headless screenshots in the sandbox** (playwright/chromium) — no display, kept failing. QA the LIVE URL in Chrome instead.
- **`navigate` to `file://`** in the Chrome extension — it prepends `https://` and extensions can't open local files. Deploy first, QA the URL.
- **git in the sandbox mount** — `.git` object unlink "Operation not permitted" warnings. Run git on the REAL machine via Desktop Commander, where auth + permissions are clean.
- **Vercel MCP `deploy_to_vercel`** — doesn't auto-deploy; it just tells you to run the CLI. Vercel CLI login needs browser OAuth this session can't do. GitHub Pages via `gh` sidesteps all of it.

---

## Committee findings → what shipped (v2)

| P0 blocker (committee) | Fix shipped |
|---|---|
| Photography site with **zero photos** | Real D-Town editorial portraits (`media/portfolio/work-1..7`), masonry + keyboard lightbox |
| **Fake testimonials** live | Replaced with honest "first words / honest by design" copy |
| **Mailto that lies** ("Held" before send) | Formspree endpoint hook + email fallback + honest confirm + validation |
| **A11y** (contrast, cursor:none, modal) | AA tokens, native cursor restored, focus-trap/ESC/autofocus, skip link, `<main>`, aria |
| **OG image relative URL** | Absolute URL, canonical, `priceRange` |

P1 also done: real-estate + commercial cards, haze tuned (6px/55%/320px), type tracking, rAF IntersectionObserver-gated, 404 page, privacy note.

---

## Current state

- ✅ **LIVE** at https://rrcher404.github.io/studio-hous-site/ (HTTP 200, all assets serving, QA'd in Chrome).
- ✅ Real pricing from Notion (Grad Mini $135 → Editorial $450; Signatures flagged "Most loved").
- ✅ Booking flow works (date-first → email fallback today).

## OPEN — needs Jene (small, but real)

1. **Formspree endpoint** — paste your form URL into `FORMSPREE_ENDPOINT` in `index.html` so inquiries POST to you directly. Until then it falls back to a pre-filled email.
2. **⚠️ Model release** — the gallery uses a real client's identifiable photos and they are **now public** on the live site. Confirm you have a signed release, or say the word and I pull the gallery in 30 seconds.
3. **Custom domain solhous.com** — when ready: add the domain in repo settings (or move to Vercel), point Namecheap DNS, preserve Google MX. I can drive this via Desktop Commander + the gh API on your say-so.
4. **Real testimonials** — drop three real client lines into "Roll 005" when they come in.

---

## Lessons for next big build

- **Check for a build journal first** (this file). Jene keeps them; review before starting.
- **Reach for Desktop Commander early** for anything touching git/deploy/accounts — it runs on the real Mac with real auth. Don't fight the isolated sandbox.
- **The footage is the brand.** When Jene provides graded media, align the site to it; don't impose a grade.
- **Committee on a real artifact > committee on a brief.** Build v1, then have the room review actual code — the critique is concrete and the agents aren't guessing.
- **Ship to a live URL before QA.** Most QA blockers (file://, headless) vanish once there's a real URL.

---

## 2026-07-04 — SolHous hub rebrand + Anti-Feed + Direction Market
Landing rebranded from Studio Hous page to SolHous hub ("Welcome to The Hous", 8 room cards, hero booking CTA with $135 anchor, dual JSON-LD: Organization + ProfessionalService). New: /anti-feed/ (manifesto, signed Selection 001 from house frames, submission form w/ clipboard fallback) and /direction-market/ (honest placeholder, mailto notify). Nav 6→8 links, menu breakpoint 900→1120px. Committee review (Isolde/Yuki/Reyes/Voss, T4): P0s fixed pre-push — hero ask, SEO retention, curator signature, mailto honesty, fform focus-visible. OPEN: model releases for Selection 001 frames (esp. portrait-25) under the new editorial banner; Google Form endpoints for Anti-Feed submissions + Market waitlist (mailto is the honest fallback, not the end state); test booking through the pipe post-deploy.

## 2026-07-04 (later) — Dropdown nav, glass system, SolHous Records
Nav consolidated 8 flat links → two dropdown tabs (Studio ▾ / The Hous ▾) with hover+click, outside-click/Escape/route-change close, hover-gap bridge. Glass system: .glass/.glass.distort (SVG #glass-distortion via GlassDefs, Safari falls back to plain blur) applied to CHROME ONLY — fixed nav bar (now a floating glass pill), dropdown panels, booking modal card, records player. Jene's GSAP LiquidGlass adapted dependency-free (rAF lerp, reduced-motion + touch opt-out) — lives on /records/ hero only; never stack with home haze veil. New /records/ page: plain hero + lens, glass player (lib/records.ts TRACKS manifest — drop mp3 in public/media/audio/ + add a line), honest first-pressing empty state until tracks land. Records card added to hub grid (reuses studio-05 — swap when a real music frame exists). Mobile nav breakpoint 1120→720.

## 2026-07-04 (evening) — Echoes of Tomorrow EP live on /records/
Real release wired in: 4 WAV masters converted to 192k AAC (~22MB total, durations verified against iTunes API), EP cover art (1000px, from Apple CDN) at media/records/echoes-of-tomorrow.jpg. lib/records.ts now carries RELEASE (title/cover/appleUrl/℗ line) + TRACKS in album order: Crashing Colors, Glass Horizons, Fractured Light, We Shine!. Player shows cover + "Open in Apple Music"; tracklist shows lengths. Hub Records card = real EP art (studio-05 duplication resolved). Artist: music.apple.com/us/artist/solhous/1842974967.

## 2026-07-05 — Direction Market: placeholder → live storefront + 3 Gumroad products
Rebuilt `/direction-market/` from the "Opening Soon" placeholder into the selling storefront. Roll 001 = the shelf (3 package cards → Gumroad, `.uni` grid), Roll 002 = anatomy of a package (6 components), Roll 003 = honest-shelf + `NotifyForm`, Roll 004 = crosslinks. Added ItemList/Product JSON-LD; sitemap `changeFrequency` weekly for the Market.

**Products (LIVE on nervahous.gumroad.com):** Final Touches $29 (`/l/final-touches`, frames 14/16/18), Dockside $49 (`/l/dockside`, 05/07/09/11), Downtown Is the Runway $79 flagship (`/l/downtown-runway`, 27/29/30/31/33/34). Each package = a reportlab-built PDF (mood board + palette pulled from the real frames, 16–20-shot list, drawn top-down lighting diagram, grade notes, styling, results gallery) + a generated `.xmp` Lightroom preset + README, zipped. Source files: `SolHous/direction-market/`.

**Committee (Casting Office T4, on the real page):** Isolde (taste) killed "get the drop before it's public" (roadmap leak + honest-shelf contradiction), the self-congratulatory pull-quote, "not homework," and "working director" overclaim; SolHous owns the masthead, Studio Hous = shot credit only. Voss (red-team) caught the `downtown-runway` vs `downtown-is-the-runway` slug mismatch (reconciled to `downtown-runway`) and gated publish on commercial model releases (Jene confirmed signed). All 3 permalinks verified live/buyable before push.

**Decisions:** Commerce rail = the existing **nervahous** Gumroad store (URL bar says nervahous; product titles say "· Studio Hous" as the visible-seller mitigation — full store-display rebrand is a later call). Gumroad covers use a native OS picker (not automatable) — branded 1600×900 covers are staged in `SolHous/direction-market/covers/` for a 2-min manual add. `NotifyForm` ships with empty GFORM constants → honest prefilled-email fallback until the one-field notify Google Form exists.

**OPEN:** add Gumroad covers (staged in `/covers/`); create the notify Google Form + paste `GFORM_ACTION` + `GFORM_EMAIL_ENTRY` into `NotifyForm.tsx`; update the home `app/page.tsx` Direction Market room card (still reads "Opening soon"); optional nervahous→Studio Hous store-display rename; $5 launch code (`OPENINGWEEK`) + launch email/IG caption (drafted in `SolHous/direction-market/`).

## 2026-07-11 — Hous Sites launch, repricing, privacy/consent, fluid pass, events, Anti-Feed/Cosign removed
Five pushes in one session (691e9e1 → c2cb813). **New room: `/hous-sites/`** — the web-design service page (7 Rolls: position, builds, Hous Panel, process, care, demonstrations, CTA), ProfessionalService JSON-LD with offers, registered in nav/sitemap/hub rooms[]. Two white-label demo shells live at `/demos/verbena.html` + `/demos/kept.html` (fictional businesses, disclaimed) with a "✎ See what you could edit" toggle that outlines Panel-editable regions — the backend pitch made visible without a backend. 9 editorial mock photos generated via Higgsfield soul_2, web-optimized to ~1.6MB total in `/demos/img/`.

**Pricing repriced same-day (Jene's call):** Editorial $3,500→$2,000, Flagship $6,000→$3,500, Care+ $325→$275/mo; **Hous Panel unbundled to a $500 add-on** on either build (was included). Page copy reframed: panel section sells the add-on, both pricing cards carry a "+ $500" tier row, care card says "where you've added it." The "No contracts hiding in the care" line was replaced with honest auto-continue disclosure (red-team flagged it as negative-option-renewal exposure).

**Sitewide:** `/privacy/` page (plain-language, 8 Rolls) + default-deny cookie consent banner ported from nervahous.com's pattern (`sh.consent` in localStorage, footer "Cookie Settings" reopens via custom event; future analytics must gate on it). Footer gained a legal-links row. **Fluid pass:** NervaHous-style clamp() applied to section paddings (12vh→clamp 64-110px — also the "extra spacing" fix), hero/footer padding, and all main body-copy sizes. **Sessions:** new Roll 003 · events (weddings + corporate/private, quoted per event, NO fixed prices), rolls renumbered, metadata updated. **Removed entirely:** `/anti-feed/` and `/cosign/` pages + AntiFeedForm component + every reference (homepage prose, root metadata, nav) — Jene: "archive" meant remove. Both URLs now 404; model-release and Google-Form open items for Anti-Feed are moot.

**Ops lessons:** the Cowork mount blocks unlink — `git commit` fails on index.lock until file-delete permission is granted (persists per-folder once granted). Push works via SSH with the key copied to /tmp (`GIT_SSH_COMMAND`), remote is HTTPS but git@github.com auths fine. Stale `.next/` types break tsc after route deletions — `rm -rf .next` first.

**OPEN:** Stripe Blueprint payment link + Calendly event + e-sign contract (the whole first-dollar path — CTA is mailto until then); hours display location decision; Hous Panel implementation (plan at `../Hous-Sites/HOUS-PANEL-IMPLEMENTATION-PLAN.md`, runs as its own Opus session; solhous.com becomes tenant #1 with editable regions sitewide). Direction Market items from 07-05 still open (Gumroad covers, notify form, launch code).

## 2026-07-11 (motion system) — SolHous Motion System: sticky doors, expand-to-detail, lookbook, bento, split-sticky, polish
Implemented the ranked motion system (execution doc `solhous-motion-execution-claude.md`) CSS-first — **no GSAP/Lenis/Framer/Three, zero new deps.** New `components/motion/` (barrel): `StickyStack`, `ExpandDetail`, `LookbookBand`, `BentoGrid`, `SplitSticky`, `SkipRegion`; new `hooks/usePrefersReducedMotion.ts`; a documented `/* Motion system */` block + tokens (`--nav-h`, `--stack-top`, durations) in `globals.css`. Plan of record: `MOTION-PLAN.md`.

**Shipped (M1–M8 + P7):** Home rooms → **sticky pin-and-cover deck** (5 commercial doors: Sessions/Work/Direction Market/Spaces/Hous Sites) integrated with the Panel's `getContent("home.rooms")` layer; the other 3 rooms + a Book tile → **editorial bento** (`BentoGrid`, Records lg / HousScapes sm / Field Notes md / Book CTA). Convictions section → **split-sticky** (thesis pins while the three scroll). `/sessions` pricing → **expand-to-detail** disclosures (prices never hidden; deep links `#portraits|#graduation|#prom`). `/work` → **horizontal lookbook** band (native scroll-snap, Roll 001) + **gallery cascade** entrance. **Steps timeline spine** + **booking 4-segment progress bar**. **Page-enter** opacity fade on `<main>`.

**Key decisions:** (1) **Never wrap sticky in `.rv`/`Reveal`** — its transform silently kills `position:sticky`; the deck and split-sticky copy are siblings of the reveal, not children. (2) **`ExpandDetail` uses measured-height, not the grid `0fr→1fr` trick** — `1fr` collapses to 0 with `overflow:hidden` in an indefinite container (verified in-browser). (3) **Hero breath (S3) cut** — `HeroVeil` + sunbloom already carry the life; DESIGN-SPEC forbids stacking two hero treatments. (4) **True View Transitions (S1/S2) NOT enabled** — native VT doesn't fire on Next SPA `<Link>` nav and the `experimental.viewTransition` config risk wasn't worth a first-to-cut nicety; shipped the documented CSS cross-fade degradation instead. (5) **No scroll-driven recede-scale** on covered cards — `animation-timeline: view()` on a *pinned* element fires at the wrong time.

**Concurrent-build note:** this ran alongside the **Hous Panel** session, which was live-rewiring `app/page.tsx`/`layout.tsx`/`globals.css` into the CMS. Reordered to build the clean money-path phases (`sessions`/`work`) first, then integrated the home deck onto the Panel's real `page.tsx` once it settled. Their `revalidateTag()` (Next 16 signature) was left alone and later fixed on their side; full `next build` is green.

**Verified:** mobile 375px **no horizontal bleed** on home/sessions/work; stack→vertical list, bento→1-col, split→stacked; **reduced-motion safe** (global killswitch voids transitions; JS-driven cascade short-circuits before hiding anything); keyboard/aria (skip links, `inert` collapsed panels, focusable lookbook region, aria-expanded); booking wizard intact; `npm run build` passes.

**OPEN:** optional S1/S2 real View Transitions via `experimental.viewTransition` later; when the Hous Panel adds `home.*`/`work.*` editable regions, the motion components already consume `getContent`/`clamp` so they inherit it for free.
