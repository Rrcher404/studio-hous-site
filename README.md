# Studio Hous — solhous.com

Editorial portrait photography studio in Greensboro, NC.
Static site (zero build step). Field-Notes aesthetic, body-of-work hero, real pricing, date-first booking.

## Run locally
Open `index.html` in a browser, or:
```
npx serve .
```

## Deploy (Vercel — recommended)
```
npm i -g vercel
vercel --prod
```
Or import this repo at vercel.com (Framework preset: "Other"). No build command, output dir = root.

## Going live on solhous.com
1. Deploy to Vercel (above), add domain `solhous.com` + `www` in the Vercel project.
2. In Namecheap → Advanced DNS: point apex `@` A record → `76.76.21.21`, and `www` CNAME → `cname.vercel-dns.com`. Leave the Google MX records untouched (email keeps working). This replaces the current Notion site on www.
3. Vercel issues SSL automatically.

## Structure
- `index.html` — the whole site
- `media/` — hero videos, poster, favicon

## To update
- Testimonials: replace the three placeholder lines in the "Roll 004" section with real client quotes.
- Booking currently opens a pre-filled email to studio@solhous.com. Swap for Tally/Formspree/Resend when ready.

## Round 2 — committee-reviewed build
This build was reviewed by a full web-team committee (creative director, UX, front-end, motion, a11y/SEO/perf, copy, red-team) and addresses their P0/P1 findings.

### Two things YOU must do before launch
1. **Booking form endpoint.** Open `index.html`, find `FORMSPREE_ENDPOINT = ""` near the bottom `<script>`. Create a free form at formspree.io (or Tally/Basin), paste its URL there. Until you do, the booking gracefully falls back to a pre-filled email — but with the endpoint, every inquiry POSTs to you directly so leads never get lost.
2. **Model release.** The portfolio (`media/portfolio/work-1..7`) uses real client photos from `Clients/Active/`. Confirm you have a signed model release before publishing publicly. Swap any image by replacing the file + editing the `GALLERY` array in the script.

### Content model (no coding)
- **Add/replace portfolio images:** drop `work-N.jpg` (full) + `work-N-thumb.jpg` (small) into `media/portfolio/`, add a line to the `GALLERY` array.
- **Testimonials:** the "Roll 005" section is honest placeholder copy. Replace with real client lines when you have them.

## Hous Panel content layer (2026-07)

Marked regions render from Supabase (`hous-panel` project) with a verbatim
fallback in `content/seed.json`. Editable regions are declared in
`lib/manifest.ts`; edits happen at panel.solhous.com and go live via
`POST /api/revalidate/` (tag-based ISR, no rebuild).

- **Rollback:** unset `NEXT_PUBLIC_SUPABASE_URL` and
  `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Vercel and redeploy — the site pins
  itself to `content/seed.json`. Every fallback render logs
  `[content-fallback]` in Vercel logs; if you see those warnings, the site is
  serving seed copy, not Panel edits.
- **Manifest changes:** keep `lib/manifest.ts` and the Panel's
  `lib/manifest/solhous.ts` identical — `node scripts/manifest-parity.mjs`
  checks. New editable regions need a seed entry, a Supabase row
  (`scripts/seed-sql.mjs` regenerates the seed migration), and a component
  binding.
- **JSON-LD note:** structured-data prices are code-owned; a Panel reprice
  shows on the page immediately and in JSON-LD on the next deploy.
