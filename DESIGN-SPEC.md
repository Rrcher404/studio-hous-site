# SOLHOUS.COM — Page Build Spec (multi-page era)

Every page on solhous.com is a static HTML file at `/<slug>/index.html`, sharing
`/assets/site.css` (design system) and `/assets/site.js` (chrome: film grain, vignette,
date stamp, custom cursor, booking modal, mobile menu, lightbox, reveal-on-scroll —
ALL injected automatically; do not duplicate their markup).

## Aesthetic DNA (non-negotiable)
- Palette: haze `#0e110c` bg · milk `#edefe0` text · body `#bcc4a8` · olive `#a4ac8e` · sun-gold `#cea860` accents. Dark, warm, filmic.
- Type: Cormorant Garamond (display, italic accents in gold via `em`), Inter (body), JetBrains Mono (labels/eyebrows, uppercase, letterspaced).
- Section label pattern: `<p class="roll">Roll 00N · section name</p>` — every section gets one, numbered per page.
- Headline pattern: `<h2 class="big">Plain words with one <em>italic gold</em> word.</h2>`
- Voice: editorial, declarative, anti-hype, short punches. No corporate mush.
- Motion: subtle. `class="rv"` on blocks for reveal-on-scroll (site.js handles it).

## Canonical skeleton
```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>PAGE TITLE — Studio Hous / SolHous</title>
<meta name="description" content="...">
<meta name="theme-color" content="#0e110c">
<link rel="canonical" href="https://solhous.com/SLUG/">
<link rel="icon" type="image/png" href="/media/favicon.png">
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:type" content="website">
<meta property="og:url" content="https://solhous.com/SLUG/">
<meta property="og:image" content="https://solhous.com/media/....jpg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/site.css">
</head>
<body>
<a href="#main" class="skip">Skip to content</a>

<nav class="sitenav" aria-label="Primary">
  <a href="/" class="brand">BRAND MARK (see below)</a>
  <div class="navlinks">
    <!-- Desktop nav renders TWO dropdown tabs (see lib/nav.ts NAV_GROUPS), not flat links:
         Studio ▾   → Work · Sessions · Field Notes
         The Hous ▾ → Anti-Feed · Direction Market · Records · HousScapes · Spaces · Cosign
         Dropdown panels use class "dropdown glass distort". Add new pages to NAV_GROUPS. -->
    <button class="menu-btn" data-menu data-h>Menu</button>
    <button class="book" data-book data-h aria-haspopup="dialog">Book ›</button>
  </div>
</nav>

<header class="page-hero" id="top">          <!-- add class "tall" for flagship pages -->
  <div class="bgimg"><img src="/media/..." alt="" fetchpriority="high"></div>
  <div class="sunbloom"></div>
  <div class="grad"></div>
  <div class="inner">
    <p class="eyebrow">EYEBROW · WITH · DOTS</p>
    <h1>Line one.<br>Line <em>two.</em></h1>
    <p class="sub">One or two sentences.</p>
  </div>
</header>

<main id="main">
  <section aria-labelledby="x-h"><div class="block rv" id="x">
    <p class="roll">Roll 001 · name</p>
    <h2 class="big" id="x-h">...</h2>
    <p class="muted">...</p>
  </div></section>
  <!-- more sections -->
</main>

<footer>
  <div class="ln">Italic closing line for this page.</div>
  <div class="meta">
    Studio Hous · SolHous · Greensboro, North Carolina<br>
    <a href="mailto:CONTACT@solhous.com">CONTACT@solhous.com</a> · <a href="https://www.instagram.com/thestudio.hous/" target="_blank" rel="noopener">@thestudio.hous</a>
  </div>
  <div class="fnav">
    <a href="/">Home</a><a href="/work/">Work</a><a href="/sessions/">Sessions</a><a href="/field-notes/">Field Notes</a><a href="/spaces/">Spaces</a><a href="/cosign/">Cosign</a><a href="/housscapes/">HousScapes</a>
  </div>
  <p class="legal">© 2026 SolHous · Studio Hous. <span style="color:var(--sun)">'26 7 2</span></p>
</footer>

<script src="/assets/site.js"></script>
</body>
</html>
```

## Brand mark in nav
- Studio pages (`/work/`, `/sessions/`, `/field-notes/`): `STUDIO H<span class="o">O</span>US`
- Hub + venture pages (`/`, `/anti-feed/`, `/direction-market/`, `/records/`, `/spaces/`, `/cosign/`, `/housscapes/`): `S<span class="o">O</span>LHOUS`
- The landing page is the SolHous hub (rebranded 2026-07-04) — it showcases every room; Studio Hous lives at `/work/` + `/sessions/`.

## Glass system (added 2026-07-04)
- `.glass` = liquid-glass chrome material: translucent haze tint + backdrop blur + inner milk sheen. `.glass.distort` adds the SVG `#glass-distortion` filter (defs in `components/GlassDefs.tsx`, mounted in layout; Safari falls back to plain blur automatically).
- Applied to CHROME ONLY: the fixed nav bar, dropdown panels, booking modal card, records player. Never on content blocks, never on text-bearing editorial sections.
- `components/LiquidGlass.tsx` = decorative cursor-following lens (dependency-free). Currently lives on the `/records/` hero only. Home hero keeps the part-the-haze veil — never stack both.

## Component classes available (see assets/site.css)
- `.block` section container (`.tight` for less padding)
- `.princ` 3-col feature grid (`.two` for 2-col) — items: `.p` with optional `<span class="k">LABEL</span>`
- `.split` / `.split.rev` text+image two-column — image side: `<div class="img"><img ...></div>`
- `.gal` masonry gallery — `<figure data-full="/media/full.jpg"><img src="/media/thumb.jpg" alt="..."><figcaption>CAPTION</figcaption></figure>` (lightbox is automatic via data-full)
- `.cats`/`.cat`/`.tier`/`.pop` pricing cards · `.pro-row`/`.pro` wide cards · `.price-head .start` italic gold price line · `.includes` · `.held` small print
- `.steps`/`.step-r` numbered process rows (auto-numbered 01, 02…): `<div class="step-r"><div class="num"></div><div><h3>..</h3><p>..</p></div></div>`
- `.whogrid` two-col list rows
- `.firstwords` gold-rule pull-quote block (`p` + `.by`)
- `.uni` universe cross-link cards: `<a href=..><div class="im"><img..></div><div class="tx"><span class="k">K</span><h3>..</h3><p>..</p><span class="go">Enter ›</span></div></a>`
- `.fform` form styles (label/input/textarea) for the Field Notes submission
- `.btn` gold button · `.btn.ghost` outline button
- `.rv` reveal-on-scroll (add to blocks)

## Booking
Any `<button data-book>` opens the shared booking modal (injected by site.js). Use it
for photography CTAs. Venture pages use their own mailto/external CTAs instead.

## Images
- Portraits: `/media/portfolio/portraits/portrait-NN.jpg` (+ `-thumb.jpg`)
- Studio/culture: `/media/studio/studio-0N.jpg`
- Legacy work gallery: `/media/portfolio/work-N.jpg` (+ `-thumb.jpg`)
Always write real alt text. Hero bg images get empty alt + aria-hidden treatment via CSS.

## Hard rules
- Absolute paths everywhere (`/assets/...`, `/media/...`, `/work/` …) — GitHub Pages custom domain at root.
- No external JS/CSS beyond Google Fonts.
- Real content only — no lorem, no fake testimonials, no invented numbers.
- Keep pages self-contained: one `index.html` per directory, inline `<style>` ONLY for
  small page-specific tweaks (scoped, additive — never redefine tokens).
- Accessibility: skip link, aria-labels, focus-visible comes free from site.css.
