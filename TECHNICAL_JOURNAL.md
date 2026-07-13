# SolHous Platform — Technical Journal

**Purpose:** an engineering log of the systems, functions, and technical procedures built for the SolHous platform — written so the notable work can be lifted into a résumé, a portfolio case study, or an interview. Companion to `BUILD_JOURNAL.md` (which is the narrative "what shipped when"); this file is the "what was engineered and how."

**System in one line:** a two-app, multi-tenant client-operations platform — a public marketing site and a separate studio control panel — built on Next.js + Supabase + Vercel, with row-level tenant isolation, capability-token messaging, serverless cron automation, and dependency-free Stripe payments.

---

## 1. Stack & services

| Layer | Technology |
|---|---|
| Framework | **Next.js 16** (App Router, Server Components, Server Actions), **React 19** |
| Language | **TypeScript** (strict), some SQL/PLpgSQL |
| Database | **Supabase Postgres** — Row-Level Security, SQL functions, SECURITY DEFINER RPCs |
| Auth | Supabase Auth (session cookies, server-side `getUser()`), role-gated |
| Storage | Supabase Storage with per-tenant bucket policies |
| Hosting / CI | **Vercel** (per-scope projects, CLI production deploys, ISR/revalidation) |
| Scheduling | **Vercel Cron** (3 scheduled jobs, secret-authenticated) |
| Payments | **Stripe** — integrated over raw REST + manual webhook HMAC verification (no SDK) |
| Email | **Resend** transactional email + inbound reply routing |
| Validation | **Zod** schema validation on all write paths |

**Two deployables:**
- `solhous.com` — public marketing site; also **tenant #1** of the platform, with sitewide editable content.
- `panel.solhous.com` — the studio control panel (CRM, inbox, bookings, agenda, document library, runbooks), multi-tenant.

---

## 2. Multi-tenant architecture & security

The core engineering theme: **every row belongs to a tenant, and the database — not the application — enforces who can see it.**

### Row-Level Security (RLS) as the trust boundary
- Wrote SQL predicate functions used by every policy:
  - **`my_client_id()`** — resolves the caller's tenant from their auth session.
  - **`is_studio()`** — true when the caller is a studio (admin) role.
  - **`client_active()`** — gates access to active tenants only.
- Applied a consistent **`tenant_rw`** policy shape across tables: `((client_id = my_client_id()) OR is_studio())`, plus granular per-operation policies (`tenant_read`, `tenant_insert`, `tenant_update`, `tenant_delete`, `public_read`, `public_submit`, `studio_*`).
- Result: a compromised or buggy query **cannot** cross tenants — isolation is guaranteed one layer below the app.

### SECURITY DEFINER RPCs for safe anonymous input
Anonymous visitors (contact forms, the message widget, booking requests, analytics) need to *write* without any table access. Solved with **SECURITY DEFINER** Postgres functions that run with elevated rights but accept only narrow, validated inputs:
- `create_message`, `get_conversation`, `append_visitor_message` — message intake + capability-scoped reads/writes.
- `request_booking` — booking intake.
- `track_pageview` — consent-safe first-party analytics.
- Public roles get **execute on the function, not the table** — the function is the only door, and each is pinned to a single tenant/record.

### Defense-in-depth on the application side
- **`ctx()` gate** (repeated across every server action): `getUser()` → load `profile` → assert `role === 'studio'` before any privileged operation. RLS is the second gate behind it.
- **`getActiveMacros()` fails closed** — returns `[]` for any non-studio caller, so a client-reachable page can call it unconditionally without leaking operating materials.
- **Service-role isolation:** the Supabase service-role key (which bypasses RLS) exists **only** in server-side cron/webhook paths on the Panel — never in the public site, never in a client bundle.

---

## 3. Backend functions & procedures

### Serverless cron automation (Vercel Cron)
Three scheduled jobs declared in `vercel.json`, each an authenticated route:

| Job | Schedule | Function |
|---|---|---|
| `messages-digest` | `0 13 * * *` | Daily "morning brief" — unread threads + due reminders, per tenant |
| `inbound-sync` | `*/2 * * * *` | Polls the inbox and routes email replies back onto the right thread |
| `archive-sweep` | `30 13 * * *` | 90-day lifecycle sweep; emails a backup before any hard delete |

**Secure cron auth** — wrote an `authorized(req)` guard that **fails closed** and compares the `Authorization: Bearer <CRON_SECRET>` header in **constant time**:
```ts
const a = Buffer.from(got), b = Buffer.from(expected);
return a.length === b.length && timingSafeEqual(a, b);
```
Timing-safe comparison avoids leaking the secret through response-time side channels.

**Digest composition** — `collectReminders()` rolls up schedule events due within 48h/overdue plus lead next-actions due today, `buildDigestText()` renders deep-linked sections, and a combined subject (`"N unread · M due"`) is generated. Per-tenant `digest_frequency` (`daily` / `weekly` / `off`) is honored, and zero-content digests are suppressed.

### Payments — Stripe with zero SDK dependency
Integrated Stripe **without the SDK** to keep the bundle lean and the trust surface auditable:
- **`createCheckoutSession()`** — POSTs directly to `https://api.stripe.com/v1/checkout/sessions` with `fetch`.
- **`verifyStripeSignature(payload, sig)`** — hand-implemented webhook verification of Stripe's `t=…,v1=…` scheme: recompute `HMAC-SHA256(secret, "{t}.{payload}")` and compare against `v1` with `timingSafeEqual`. Rejects on missing/expired/forged signatures.
- Webhook route handles `checkout.session.completed` and flips the booking to a paid state. Verified end-to-end against Stripe **live** mode (real `cs_live_…` session → booking state change).

### Transactional email pipeline (reply-by-email)
- **Level 1:** set a real **`Reply-To`** on outbound studio email so a client's reply is deliverable (fixed a hard bounce off a no-reply subdomain).
- **Level 2:** the `inbound-sync` cron ingests those replies every 2 minutes and threads them back into the Panel inbox — a full round-trip loop with no third-party inbox parser.

### Data lifecycle / soft-archive
- Non-destructive archival model: `archived_at` + `archive_reason ∈ {completed, deleted}`; all active views filter `archived_at IS NULL`.
- Per-section Archived views with a **two-tap inline confirm** control.
- **`archive-sweep`** emails a full backup of a record **before** hard-deleting it past 90 days — recoverable by design.

### Idempotent seeding & schema migrations
- **`seedLibrary()`** — idempotent by explicit `doc_key` check (read existing keys → insert only the missing ones), wrapped in try/catch that surfaces real error text; safe to re-run and able to restore a deleted starter doc. Backed by a **full unique constraint** `(client_id, doc_key)` for a clean upsert boundary.
- Versioned SQL migrations (`00001_core` → `00002_rls` → `00003_storage` → `00004_seed`). Handled a Postgres constraint that a function's return type can't be altered in place with a **DROP + recreate** migration (all drop paths return NULL-safe).
- **`ON DELETE SET NULL`** on `schedule_events` foreign keys — deliberately chosen over cascade so purging a lead never silently deletes future calendar dates.

### Content layer / lightweight CMS
- Supabase-backed content regions (`site_content`) editable from the Panel and served to the public site, with **on-demand revalidation** so edits go live without a redeploy ("edited in Supabase, live without a deploy").

---

## 4. Frontend engineering

### Persistent message widget — capability tokens + live polling
A site-wide "Message the studio" bubble that becomes a two-way conversation with **no login and no new tables**:
- **Capability-token model:** first contact returns an unguessable 18-hex `reply_token`, stored in `localStorage`; all reads/writes are pinned to `(domain, token)` via the SECURITY DEFINER RPCs. The token is the capability the visitor already holds through their email Reply-To.
- **Live refresh engine:** a single background poll (`loadConvo()` on a 12s interval) that runs whether the widget is open or closed:
  - **Closed** → computes `latestStudioAt(messages) > seenAt` and raises a notification dot **without** marking the thread read.
  - **Open** → updates the thread in place and marks seen.
  - **Page Visibility API** pauses polling on hidden tabs and forces an immediate refresh on refocus — no wasted requests in background tabs.
- **`openRef` mirror pattern:** a ref tracks the open/closed state so the single interval reads current state without tearing down and rebuilding on every toggle.
- Notification affordance (`.msgw-ping` pulse) is motion-reduced-safe.

### Data-driven navigation
- Navigation is a single typed data model (`NAV_GROUPS`) that renders the desktop dropdowns, the mobile menu, and the footer from one source. Added an `external` flag so off-site links (e.g. the Panel login) render as real anchors with `target="_blank" rel="noopener noreferrer"`, while internal links stay client-routed — without leaking external URLs into `sitemap.xml`.

### Motion & accessibility system
- A CSS-first motion system (sticky pin-and-cover decks, expand-to-detail disclosures, scroll-snap lookbook, bento grid, split-sticky) built with **zero animation dependencies** (no GSAP/Framer/Lenis/Three).
- Accessibility throughout: focus traps, `Esc`-to-close, skip links, ARIA state (`aria-expanded`, `aria-current`), `prefers-reduced-motion` kill-switches, keyboard-navigable galleries.
- Verified responsive down to 375px with no horizontal bleed.

---

## 5. Environment & secrets configuration

A deliberate **secrets discipline**: publishable values are public, secret values are server-only, and the human enters every secret directly into the provider — the code is written to *consume* names it never hard-codes.

| Variable | Purpose | Exposure |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project endpoint | Public (browser-safe) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Publishable anon key (RLS-gated) | Public (browser-safe) |
| `SUPABASE_SERVICE_ROLE_KEY` | Bypasses RLS for cron/webhooks | **Server-only, Panel only** |
| `STRIPE_SECRET_KEY` | Create Checkout sessions | **Server-only secret** |
| `STRIPE_WEBHOOK_SECRET` | Verify webhook signatures (HMAC) | **Server-only secret** |
| `RESEND_API_KEY` | Send transactional email | **Server-only secret** |
| `RESEND_REPLY_TO` | Reply-To address for deliverable replies | Config |
| `CRON_SECRET` | Bearer auth for scheduled jobs | **Server-only secret** |

**Procedures performed:**
- Provisioned a multi-tenant Supabase project and seeded tenant #1.
- Configured Vercel environment variables per environment; set the Stripe **live** webhook destination (`panel.solhous.com/api/stripe`) for `checkout.session.completed`.
- Managed two projects under a Vercel team scope with CLI production deploys (`vercel --prod --scope …`).
- Custom-domain + DNS setup with **MX-record preservation** (kept Google Workspace mail intact through a DNS cutover).

---

## 6. Testing & verification procedures

- **In-browser verification loop:** drove a headless preview to reproduce real user flows, inspect the accessibility tree, read console/network, and assert computed state — rather than eyeballing.
- **Throwaway-fixture testing against live infra:** to prove the messaging live-refresh end-to-end, submitted a real thread, injected a studio reply via SQL, asserted the closed-state notification and the open-state in-place update, then **fully deleted the fixture** and confirmed zero residual rows across five tables.
- **Constraint-first debugging:** diagnosed a "silent no-op" as browser contention (not a code bug) by verifying the DB-level insert independently, then hardened the action anyway.
- **Timezone correctness:** fixed UTC-vs-local bugs by formatting all studio-facing dates/times through `America/New_York` (`etDay()`, `bucketOf()`, `fmt()`), including the Agenda buckets and the digest email.

---

## 7. Résumé-ready bullet points

Lift and adapt as needed:

- Architected and shipped a **multi-tenant SaaS control panel** on Next.js 16 + Supabase, enforcing tenant isolation at the database layer with **Row-Level Security** policies and SQL predicate functions (`my_client_id()`, `is_studio()`).
- Designed a **capability-token messaging system** enabling anonymous, account-free two-way conversations via SECURITY DEFINER Postgres RPCs pinned to an unguessable per-thread token.
- Built a **live-refresh polling engine** with the Page Visibility API — surfacing new replies on both open and collapsed UI states while eliminating background-tab request waste.
- Integrated **Stripe payments with zero SDK dependencies**, hand-implementing webhook verification (HMAC-SHA256, constant-time comparison) and Checkout creation over raw REST; validated end-to-end in live mode.
- Automated operations with **secret-authenticated Vercel Cron jobs** (daily digest, 2-minute inbound email sync, 90-day data-retention sweep with backup-before-delete), using timing-safe Bearer authentication.
- Implemented a **reply-by-email pipeline** (Reply-To + inbound routing) that threads client email replies back into the app inbox automatically.
- Engineered a **non-destructive data-lifecycle system** (soft-archive, 90-day retention, emailed backups) with idempotent, re-runnable seeding.
- Delivered a **dependency-free CSS motion system** and WCAG-minded, `prefers-reduced-motion`-safe, mobile-first UI.
- Practiced **least-privilege secrets management** — publishable vs. secret key separation, service-role isolation to server-only paths, MX-preserving DNS cutovers.

---

## 8. Skills demonstrated

**Backend / data:** Postgres, Row-Level Security, SECURITY DEFINER RPCs, PLpgSQL, schema migrations, foreign-key delete semantics, idempotent writes, Zod validation.
**Auth & security:** multi-tenant isolation, role-based gating, capability tokens, HMAC signature verification, constant-time comparison, least-privilege secrets, fail-closed defaults.
**Backend services:** serverless functions, scheduled jobs (cron), webhooks, transactional + inbound email, Stripe.
**Frontend:** React 19, Next.js App Router, Server Components + Server Actions, TypeScript, state-machine UI, Page Visibility API, accessibility, responsive/mobile-first, CSS animation systems.
**DevOps:** Vercel deploys & environments, cron config, DNS/domain management, ISR/on-demand revalidation, CLI-driven releases.
**Practices:** end-to-end verification, defense-in-depth, timezone correctness, non-destructive data design.

---

*Generated 2026-07-12. Ground truth for every claim above lives in the two repos (`solhous-site`, `hous-panel`); function and policy names are cited verbatim from source so this can be defended in an interview.*
