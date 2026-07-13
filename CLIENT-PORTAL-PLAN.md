# SolHous Client Portal (P6) — Product & Build Plan
**Committee-tested · drafted 2026-07-12 · status: plan awaiting Jene's decisions (not built)**

A client-facing portal where SolHous clients receive their work, download it, and see their project history. This plan was pressure-tested by a research pass (passwordless-auth security + delivery-portal benchmarking) and a six-voice committee: a portrait mom, a real-estate agent, a wedding client, a commercial/brand manager, an application-security red-team, and an operator (ops-fit) lens. Their feedback materially changed the design — the changes are the point of this document.

---

## Decisions locked (2026-07-12, from Jene)

1. **Delivery model = native for small sets (hybrid).** Portrait / real-estate / commercial finals download **natively from SolHous** (this is the core of the "download from my site" vision, and these sets are small enough — hundreds of MB — to host affordably). Big weddings/events link out to a host.
2. **No gallery host yet.** → The "link out" leg for weddings has no destination today. **Resolution:** Phase 1 ships the **native small-set portal** (portraits/RE/commercial), which needs no host and matches the vision. Weddings/large events keep being delivered your current way until you either (a) adopt a host for big galleries — **Pixieset** (generous free tier, simplest) or **Pic-Time** (best built-in print sales) — or (b) decide to native-host them too (higher cost/complexity; not recommended). This is the one remaining fork (see §11).
3. **Retention = type-aware + view-forever + paid reactivation.** Confirmed (§4).

**Storage-control mechanism (new, resolves "storage grows forever" even for native):** after a project's download window closes, **purge the full-res originals from the portal bucket** and keep only watermarked previews + the project record. You keep your own master copies offline. "Keep it live / reactivate" (paid) re-publishes them. Storage tracks *active* windows, not your whole back-catalog.

---

## 0. TL;DR

- **The portal is a branded "home" that *points at* the gallery — not the gallery itself.** Don't self-host multi-GB wedding files on Supabase; you'd blow the storage tier on the first job and pay egress forever. Store a **link** to your gallery host (Pixieset/Pic-Time/CloudSpot); "uploading" becomes pasting one URL.
- **Build it *into* the Hous Panel**, not as a separate app. It's a client-facing *read view* of rows you already have (Sessions pipeline = the status timeline, Agenda = dates, Stripe = balance, document library = prep/contract, message widget = "Request access"). This is literally the P6 on your roadmap.
- **The flat 30-day rule was rejected by every client** — for four different, legitimate reasons. Replace it with: **view-forever, a type-aware download window, "your originals are never gone" framing, and a paid "keep it live / reactivate" option.** Your underlying goal survives; it just gets executed in a way clients trust instead of fear.
- **Lead auth with a 6-digit code, not a bare magic link** (mail scanners pre-consume link tokens → dead-link tickets for your least-techy clients).
- **Three "selling points" (signed URLs, the 30-day lock, the rolloff) are fake unless two things are true first:** deliverables live in a *new private bucket*, and the window is enforced *server-side at download time*. The red-team's five non-negotiables (§9) gate any launch.

---

## 1. What the committee changed (headline findings)

| Finding | Source | Change |
|---|---|---|
| Flat 30-day window is wrong for every client type | All 4 client personas + benchmark | Type-aware windows + view-forever + paid extension (§4) |
| Don't host the pixels — link to a gallery host | Operator | Portal stores links, not files (MVP) (§3) |
| Build into the Panel, not a separate app | Operator | Client route group reusing existing data (§3) |
| Magic-link alone fails behind corporate mail scanners | Auth research + red-team | 6-digit OTP / PKCE, no bare-GET auth (§5) |
| The existing `client-media` bucket is **public** — locks/signed-URLs would be cosmetic | Red-team (read your migrations) | New **private** deliverables bucket, per-click signed URLs (§5, §9) |
| ZIP, favorites, real-estate branded/unbranded are **table stakes**, not extras | Benchmark | Promoted to core for the relevant offerings (§7) |
| "Never deleted + request access" **beats** the industry's delete-and-charge-$50 model | Benchmark | Keep it — but *frame it as a feature* (§4) |
| EXIF/GPS in delivered photos = a client's home coordinates | Red-team | Strip metadata on delivery copies (§5) |
| Minors in grad/family galleries | Red-team | Guest-share off + noindex + consent attestation (§5) |

---

## 2. The product: what the client experiences

1. **Sign in** at (e.g.) `panel.solhous.com/portal` — type the email you have on file, get a **6-digit code** (or tap a confirm link), you're in. No password.
2. **Home = your projects.** Active work up top with a live status; below it, completed projects from the last 6 months. Each card: type, title, date, status, and whether the download window is open.
3. **A project** shows a **status timeline** (Booked → Shoot day → Editing → Delivered), the **deliverable** (a "View / Download your gallery" button), your **balance + a Pay button** if one's due, your **prep guide / contract**, and a **"Message the studio"** thread (which is also the one-tap "Request access").
4. **Download** full quality — "Download all" and per-image — while the window is open. A calm banner states: *"Your originals are always safe with SolHous. This is your download window."*
5. **After the window**, the project stays fully visible; the download button becomes **"Request access"** (one tap → your inbox) or **"Keep it live"** (a small paid extension).

Principles the committee held you to: **dead-simple, mobile-first, warm, and never make a client feel their photos could vanish.**

---

## 3. Architecture

**Build into the Hous Panel** as a new client-facing route group (`/portal/*`) with a **client role** distinct from the studio role. Everything the portal shows already exists in your Supabase:

| Portal feature | Reuses |
|---|---|
| Status timeline | Sessions pipeline stage (P2) |
| Delivery / balance-due dates | Agenda (P5) |
| Pay balance | Bookings + Stripe (live) |
| Prep guide / contract | Document library (P4) |
| Request access | Message widget / inbox thread |

**The storage fork (your call — §11).** Three ways to handle the actual photos:

- **A) Link-first (recommended MVP).** The portal stores a URL to your gallery host. The host owns the pixels, the ZIP, favorites, and the download window. Zero storage cost/risk to you; ships fastest. "Upload" = paste a link.
- **B) Size-aware hybrid (Phase 2).** Small deliveries that *should* feel native — portrait finals, real-estate sets, commercial finals (hundreds of MB) — self-hosted in a **private** bucket with real on-your-site download; big weddings/events stay link-mode. Preserves your "download from my site" vision where it's affordable.
- **C) Full self-host.** Everything on your infra. Most control, most cost, most security surface. Not recommended.

Your original ask (download natively from your site with a 30-day window) is **Option B for the small stuff**. The recommendation is to ship **A first** to prove the portal kills support emails, then add **B** for the session types where a native download matters.

---

## 4. Retention & access model (the reworked 30-day)

The committee was unanimous: don't lock people out of *seeing* their work, and don't treat a wedding like a headshot. New model:

- **View access = as long as the project is in the portal** (your 6-month home window, longer on request). Separate "view" from "download."
- **Download window = type-aware defaults** (you can override per project):
  - Portraits / family / grad: **45 days**
  - Real estate: **long / effectively permanent** (agents re-pull listings for months; Marcus: "photos I paid for shouldn't have a shot clock")
  - Weddings / events: **90+ days** (Priya: "30 days treats a wedding like a headshot")
  - Commercial: **12 months+** (Taylor: campaigns relaunch seasonally; 30 days is "a dealbreaker")
- **"Never gone" framing, everywhere.** A persistent line: *"Your originals are backed up with SolHous. This is only your self-serve download window."* This single sentence did more for client trust than any feature.
- **Paid "Keep it live" / "Reactivate."** After the window, a small Stripe charge re-opens downloads. This is the industry norm (≈$50 reactivation) — and both a revenue line and a peace-of-mind offer (Danielle: "peace of mind is worth money to me").
- **One-tap "Request access"** → your inbox, with an on-screen expectation ("we usually re-open within a day"). Multiple clients feared this being a black hole — set the expectation.
- **Delivery-day email (day 0)** in addition to reminders, so a client who never opens the gallery isn't ambushed at lock time. Reminder cadence: **day 0, day (window−7), day (window−2)**, and make it **mutable** (Marcus, at 6–10 shoots/month, will drown in nags).

---

## 5. Auth & security (from research + red-team)

**Authentication**
- **6-digit OTP as the primary factor** (or PKCE + a "confirm on this device" interstitial). Corporate/Gmail mail scanners pre-fetch links and **consume single-use magic-link tokens** before the human clicks — the exact failure that generates support tickets for real-estate and commercial clients. A typed code has nothing to prefetch. Supabase gives OTP for free (same email, a code template variable).
- **`shouldCreateUser: false`** + a **generic same-response, same-timing send endpoint** ("If that email is on file, a code is on its way") → no account creation, no enumeration oracle. Pre-provision each client's auth user when you create their first project.
- **Rate-limit per-email + per-IP + a Turnstile/CAPTCHA** on the request form; lower Supabase's OTP expiry to **~10–15 min, single-use**.
- **Sessions:** short idle (~30 min) + absolute cap, stored in **httpOnly cookies** (SSR helpers), not `localStorage`; use `getUser()` (server-verified) for authorization, not local claims. Show "Signed in as x@y" after login so a mis-delivered code is visible.
- **Never embed a signed URL or auto-auth token in an email** — login/reminder emails link to the login page only (emails get forwarded; family inboxes are shared). Optional per-project PIN for high-sensitivity shoots.

**Storage & downloads (the part that makes the locks real)**
- **New private bucket** (`client-deliverables`, `public: false`) — **never** the existing `client-media` bucket (it's `public: true`, images-only, 25MB — correct for the marketing site, fatal for deliverables). A public-bucket object is fetchable by anyone forever; it would make the signed URL, the lock, the rolloff, and the paywall all cosmetic.
- **Per-click, short-lived (≤5 min) signed URLs**, minted behind an authenticated route that re-checks **window + payment + ownership at issuance time**. The 30-day rule = "will I mint a fresh URL," never a long-lived URL (Supabase signed URLs can't be revoked and persist on CDN).
- **Opaque storage keys** (`{client_id}/{uuid}.jpg`), display filename in the DB only.
- **Strip EXIF/GPS on the delivery copy** at publish (keep the pristine original studio-side). Real-estate GPS = a home's coordinates; weddings = the venue; grad/family = a home or school.
- **Watermarked, downscaled previews** in-gallery; full-res only through the gated route. Be honest that a lock governs *re-download*, not screenshots.
- **Big ZIPs:** pre-generate a stored ZIP object + a short signed URL, or per-file URLs + a manifest — **do not build multi-GB ZIPs inside a serverless function.** (In link-mode, the host does this for you — another point for Option A.)

**Multi-tenant isolation**
- New tables (`projects`/`deliverables`/`favorites`/`guest_shares`/`payments`/`access_requests`) get **RLS enabled** with your existing `client_id = my_client_id() OR is_studio()` pattern **before any UI ships**.
- **Authenticated reads are `SECURITY INVOKER`** (rely on RLS). Do **not** copy the anonymous-intake `SECURITY DEFINER` idiom for authenticated project reads — a `DEFINER` read RPC bypasses RLS and hands another tenant's photos to anyone who passes their UUID.
- UUID PKs in URLs (never addresses or sequential numbers); `with check (client_id = my_client_id())` on every write; add `get_advisors(security)` to CI and a cross-tenant test.

**Privacy**
- Guest-share **off by default** + `noindex` + `no-referrer` on all portal pages; guest links **expiring + revocable + audited**; a **release-attestation flag** required before guest-share can be enabled; projects tagged as containing **minors cannot be guest-shared** without it.
- No PII (emails, addresses, project IDs) in URL query strings or logs. Short privacy notice covering delivery, retention, "originals kept by studio," and deletion-on-request.
- **"Request access" hardening:** bind to `my_client_id()` server-side (don't trust a client-supplied id), rate-limit + debounce (one open request per project), **render payloads as text, never HTML** in the Panel/emails (stored-XSS vector), schema-validate the payload. Consider a dedicated `access_requests` table rather than the open `form_submissions` firehose.

---

## 6. Per-offering delivery

- **Portraits (grad / family / prom):** proof + final gallery, favorites → print store, print-release PDF, guest-share **off** (minors). Warmth over features (Danielle wants *fewer* buttons).
- **Weddings / events:** link-mode (volume), a **highlight set** to share on delivery day, favorites feeding album design, **opt-in** guest share for family, generous window, easy low-res *viewing* for non-techy/overseas relatives before any big download.
- **Real estate:** **branded + unbranded (MLS) as two clearly-labeled downloads** (non-negotiable — MLS rejects watermarks), floor-plan + virtual-tour links pinned on the project, fast-turnaround status, long/permanent access, mutable reminders, a multi-listing view by address. All-day sessions (agents keep many tabs open).
- **Commercial:** a **usage-license PDF + invoice/receipt delivered *with* the finals** (standard, not optional — this is the most important artifact for a brand), durable 12-month+ access, optional payment-gated final delivery.
- **Hous Sites:** these clients already get the Hous Panel; the portal just shows build status + handoff docs (staging link, care-plan doc). Keep light — don't duplicate the Panel.

---

## 7. Enhancements: promoted to core vs. deferred

**Promoted to core (table stakes per benchmark):**
- ZIP / bulk download (for the offerings that self-host or where the host provides it)
- Favorites / selects (weddings → album, portraits → print selection)
- Real-estate branded/unbranded sets

**Recommended additions (mostly free, high-trust):**
- Delivery status timeline (your standout edge — no gallery-only competitor has it; kills "is it ready?")
- "Never deleted" framing + paid reactivation
- Delivery-day email; mutable reminders
- Usage-license PDF + invoice for commercial

**Deferred (Phase 3, revisit after MVP proves it kills support emails):**
- Native self-hosted download + signed-URL machinery (Option B)
- Print/usage-release PDFs, payment-gated galleries, guest-share, upsell hooks (prints / next session / Direction Market — and *don't* upsell on delivery day; both wedding and portrait clients found it tone-deaf)

---

## 8. Data model (new, all RLS'd)

At the right altitude — final shapes during build:
- **`projects`** — client_id, type (portrait/event/real_estate/commercial/hous_site), title, status (pipeline stage), dates. May map onto/extend existing booking/lead rows rather than a brand-new table (decide during build).
- **`deliverables`** — project_id, kind (gallery_link | file), url or storage_key, published_at, download_window_days, branded/unbranded label, exif_stripped flag.
- **`access_requests`** — project_id, client_id (server-stamped), status, created_at.
- **`payments`** — reuse the existing Stripe/bookings rows where possible.
- (Phase 3) **`favorites`**, **`guest_shares`** — with expiring/revocable tokens + consent flag.

---

## 9. The 5 non-negotiables before this touches a real client photo (red-team gate)

1. **Deliverables in a NEW private bucket**, served only via ≤5-min, per-click, authenticated signed URLs. *Verify:* a `/object/public/...` fetch of a deliverable returns 403.
2. **Window + paywall enforced server-side at issuance** as DB/RLS predicates — never a hidden button or a long-lived URL. *Verify:* a saved day-30 URL fails on day 31; a pre-payment URL fails.
3. **Every new table RLS-enabled** with the tenant pattern; **all authenticated reads `SECURITY INVOKER`** (no DEFINER read RPCs). *Verify:* cross-tenant UUID test denied; `get_advisors(security)` clean in CI.
4. **Scanner-safe, enumeration-safe auth:** OTP/PKCE (no state-mutating bare GET), generic send response, per-email + per-IP rate limits + captcha, ≤15-min single-use codes, short httpOnly-cookie sessions, no signed URL/token in forwardable email.
5. **Delivery copies EXIF/GPS-stripped; guest galleries noindex + expiring + revocable + off-by-default + consent-gated; minors never guest-shareable without a release attestation.** Originals stay studio-side. *Verify:* `exiftool` on a delivered file shows no GPS; a guest link both expires and can be killed on demand.

---

## 10. Build phases

*(Sequenced to Jene's locked decisions: native small-set delivery, no host yet.)*

- **Phase 1 — Native small-set portal, inside the Panel.** Client-role **OTP** auth → `/portal`; home (active + last 6 months); project view (status timeline, **native gallery with per-click signed-URL download**, "Download all" for small sets, balance + Pay, prep/contract doc, Request-access thread). New **private bucket** + `projects`/`deliverables`/`access_requests` tables with RLS; **DB-enforced type-aware window**; "never deleted" framing; delivery-day + reminder emails; **post-window full-res purge** (storage control). Scope: portraits / real estate / commercial. All five §9 non-negotiables apply from day one because we're hosting bytes.
- **Phase 2 — Weddings/large events + host.** Once a host is chosen (Pixieset/Pic-Time), add link-mode deliverables for big galleries; highlight-set + opt-in guest share. Until then, weddings stay on your current delivery.
- **Phase 3 — Delight & monetize:** favorites/selects, real-estate branded/unbranded auto-sets, print/usage-release PDFs, payment-gated delivery, tasteful upsells.

---

## 11. Decisions

**Resolved (2026-07-12):** ✅ delivery model = native small-set hybrid · ✅ retention = type-aware + view-forever + paid reactivation.

**Resolved (later 2026-07-12):** ✅ **Host = Pixieset** (account set up). Phase 2's wedding/large-event leg now links to Pixieset galleries — no native hosting of multi-GB weddings.

**Still open (don't block Phase 1):**
1. **Payment-gate final delivery?** (final balance unlocks the gallery — strong for cashflow.) Default: optional per project.
2. **Portal name** — e.g., "Your Hous," "The Darkroom," or just "Client Portal."

**Approval flow:** Phase 1 (native small-set) builds first. **Phase 2 goes through the `build-gate` skill** (committee + 1–10 score, ≥8 builds) and — per Jene — builds autonomously on a pass, stopping only at the go-live hand-off.

*Phase 1 is ready to build now on the resolved decisions.*
