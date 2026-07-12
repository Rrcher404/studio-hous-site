import { createHash } from "node:crypto";

/**
 * Visitor conversation channel for the message widget.
 *  GET  ?token=<reply_token>  → that thread's messages (sanitized) via get_conversation
 *  POST { token, message }    → append the visitor's reply via append_visitor_message
 *
 * The reply_token is a 72-bit unguessable capability the visitor holds in their
 * own browser (localStorage) — the same token their email replies carry. Both
 * RPCs are SECURITY DEFINER and pinned to (domain, token), so a request can only
 * ever touch the one thread it holds the token for. Anon key only; no service-role
 * on the site. Malformed tokens are rejected before hitting the database.
 */
const SITE_DOMAIN = "solhous.com";
const TOKEN_RE = /^[0-9a-f]{12,64}$/;

function supa() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return url && key ? { url, key } : null;
}

function ipHash(request: Request): string {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "none";
  const day = new Date().toISOString().slice(0, 10);
  return createHash("sha256")
    .update(`${ip}:${day}:${process.env.REVALIDATE_SECRET ?? "salt"}`)
    .digest("hex")
    .slice(0, 24);
}

export async function GET(request: Request) {
  const env = supa();
  if (!env) return Response.json({ ok: false }, { status: 503 });
  const token = new URL(request.url).searchParams.get("token") ?? "";
  if (!TOKEN_RE.test(token)) return Response.json({ ok: false, error: "Bad token." }, { status: 400 });

  const res = await fetch(`${env.url}/rest/v1/rpc/get_conversation`, {
    method: "POST",
    headers: { apikey: env.key, Authorization: `Bearer ${env.key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ p_domain: SITE_DOMAIN, p_token: token }),
  });
  if (!res.ok) return Response.json({ ok: false }, { status: 502 });
  const rows = (await res.json()) as Array<{ direction: string; body: string; at: string }>;
  const messages = Array.isArray(rows)
    ? rows.map((r) => ({ from: r.direction === "outbound" ? "studio" : "you", body: r.body, at: r.at }))
    : [];
  return Response.json({ ok: true, messages });
}

export async function POST(request: Request) {
  const env = supa();
  if (!env) return Response.json({ ok: false }, { status: 503 });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
  const token = String(body.token ?? "");
  const message = String(body.message ?? "").trim();
  const company = String(body.company ?? ""); // honeypot
  if (!TOKEN_RE.test(token)) return Response.json({ ok: false, error: "Bad token." }, { status: 400 });
  if (!message) return Response.json({ ok: false, error: "Message is required." }, { status: 400 });
  if (message.length > 5000) return Response.json({ ok: false, error: "Message is too long." }, { status: 400 });

  const res = await fetch(`${env.url}/rest/v1/rpc/append_visitor_message`, {
    method: "POST",
    headers: { apikey: env.key, Authorization: `Bearer ${env.key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      p_domain: SITE_DOMAIN,
      p_token: token,
      p_message: message,
      p_company: company,
      p_ip_hash: ipHash(request),
    }),
  });
  if (!res.ok) return Response.json({ ok: false, error: "Could not send just now." }, { status: 502 });
  const accepted = (await res.json()) === true;
  return Response.json({ ok: accepted });
}
