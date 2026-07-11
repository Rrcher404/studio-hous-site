import seed from "@/content/seed.json";

/**
 * Content fetch layer — Supabase first, seed.json always.
 *
 * Server-only. Reads published content over Supabase REST with the anon key,
 * cached indefinitely and tagged so POST /api/revalidate ships Panel edits in
 * seconds without a rebuild. On ANY failure — missing env, network, bad
 * payload — the verbatim seed copy renders instead and a warning is logged,
 * so a silent reversion never goes unnoticed in Vercel logs.
 */

const TENANT = "solhous";
export const CONTENT_TAG = `content-${TENANT}`;

/** The solhous tenant row id, fixed by supabase/migrations/00004_seed_solhous.sql. */
const TENANT_ID = "f5ad4cdb-5e9f-4f15-ab87-c3542e14260a";

type Json = Record<string, unknown>;

function warnFallback(what: string, reason: string) {
  console.warn(`[content-fallback] ${what}: ${reason}`);
}

async function rest(path: string): Promise<unknown[] | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  const res = await fetch(`${url}/rest/v1/${path}`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
    next: { revalidate: false, tags: [CONTENT_TAG] },
  });
  if (!res.ok) throw new Error(`REST ${res.status}`);
  return (await res.json()) as unknown[];
}

/**
 * Fetch one editable section. Returns the Supabase-published content when
 * reachable, the seed copy otherwise. The seed also backfills any keys a
 * partial row is missing, so a malformed edit can never blank a region.
 */
export async function getContent<T extends Json = Json>(sectionKey: string): Promise<T> {
  const fallback = (seed as Record<string, Json>)[sectionKey];
  if (!fallback) throw new Error(`Unknown section_key "${sectionKey}" — add it to content/seed.json`);
  try {
    const rows = await rest(
      `site_content?select=content&client_id=eq.${TENANT_ID}&section_key=eq.${encodeURIComponent(sectionKey)}&limit=1`
    );
    if (rows === null) {
      warnFallback(sectionKey, "Supabase env vars absent");
      return fallback as T;
    }
    const content = (rows[0] as { content?: Json } | undefined)?.content;
    if (!content || typeof content !== "object") {
      warnFallback(sectionKey, "row missing or content not an object");
      return fallback as T;
    }
    return { ...fallback, ...content } as T;
  } catch (err) {
    warnFallback(sectionKey, err instanceof Error ? err.message : String(err));
    return fallback as T;
  }
}

export type Announcement = {
  id: string;
  title: string;
  body: string | null;
};

/**
 * The active announcement, if any. Active means `active = true` and now is
 * inside [starts_at, ends_at] where those are set. Null (no bar) on any
 * failure — an announcement is the one region whose fail-safe is absence.
 */
export async function getAnnouncement(): Promise<Announcement | null> {
  try {
    const rows = await rest(
      `announcements?select=id,title,body,starts_at,ends_at&client_id=eq.${TENANT_ID}&active=eq.true&order=created_at.desc`
    );
    if (rows === null) return null;
    const now = Date.now();
    for (const raw of rows) {
      const a = raw as { id: string; title: string; body: string | null; starts_at: string | null; ends_at: string | null };
      if (a.starts_at && Date.parse(a.starts_at) > now) continue;
      if (a.ends_at && Date.parse(a.ends_at) < now) continue;
      return { id: a.id, title: a.title, body: a.body };
    }
    return null;
  } catch (err) {
    warnFallback("announcement", err instanceof Error ? err.message : String(err));
    return null;
  }
}

export type DayHours = {
  day: number;
  open: string | null;
  close: string | null;
  closed: boolean;
  note: string | null;
};

/** Business hours, ordered Sun–Sat. Empty array = not set, render nothing. */
export async function getHours(): Promise<DayHours[]> {
  try {
    const rows = await rest(
      `business_hours?select=day,open,close,closed,note&client_id=eq.${TENANT_ID}&order=day.asc`
    );
    if (rows === null) return [];
    return rows as DayHours[];
  } catch (err) {
    warnFallback("hours", err instanceof Error ? err.message : String(err));
    return [];
  }
}
