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
