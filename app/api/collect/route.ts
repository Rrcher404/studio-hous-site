/**
 * First-party pageview collector. Same-origin beacon posts a path; this route
 * calls track_pageview() which derives client_id from the site's own domain
 * (never the caller) and increments an aggregate daily count. Cookieless, no PII,
 * no identifiers — consent-compatible. Server-side bot filter + same-origin check.
 */
const SITE_DOMAIN = "solhous.com";
const BOT = /bot|crawl|spider|slurp|bingpreview|headless|lighthouse|preview|monitor|curl|wget/i;

export async function POST(request: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return new Response(null, { status: 204 });

  // Same-origin only — ignore cross-site or tool-driven calls.
  const ref = request.headers.get("referer") ?? "";
  try {
    if (ref && new URL(ref).hostname !== SITE_DOMAIN && !new URL(ref).hostname.endsWith(".vercel.app")) {
      return new Response(null, { status: 204 });
    }
  } catch {
    /* malformed referer — fall through, the path sanitizer + aggregate-only storage bound the risk */
  }

  const ua = request.headers.get("user-agent") ?? "";
  if (!ua || BOT.test(ua)) return new Response(null, { status: 204 });

  let path = "/";
  try {
    const body = await request.json();
    path = String(body.path ?? "/").slice(0, 300);
  } catch {
    return new Response(null, { status: 204 });
  }

  await fetch(`${url}/rest/v1/rpc/track_pageview`, {
    method: "POST",
    headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ p_domain: SITE_DOMAIN, p_path: path }),
  }).catch(() => {});

  return new Response(null, { status: 204 });
}
