import { createHash } from "node:crypto";

/**
 * Website message intake. A visitor's message becomes a form_submissions row
 * (form_key='message'); a SECURITY DEFINER trigger in Supabase validates it,
 * drops honeypot/rate-limited spam, and promotes it into the Panel inbox.
 *
 * This route sets client_id SERVER-SIDE (never from the caller) and posts with
 * the anon key under the existing public_submit RLS policy — no service-role in
 * the site. Single-tenant today; before a second tenant, resolve client_id from
 * the request host and move intake behind a definer RPC (see the suite roadmap).
 */
const TENANT_ID = "f5ad4cdb-5e9f-4f15-ab87-c3542e14260a"; // solhous — matches lib/content.ts

export async function POST(request: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return Response.json({ ok: false }, { status: 503 });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();
  const name = String(body.name ?? "").trim();
  const subject = String(body.subject ?? "").trim();
  const company = String(body.company ?? ""); // honeypot — real visitors leave it blank

  if (!email || !message) {
    return Response.json({ ok: false, error: "Email and message are required." }, { status: 400 });
  }
  if (message.length > 5000) {
    return Response.json({ ok: false, error: "Message is too long." }, { status: 400 });
  }

  // Daily-rotating salted hash of the visitor IP — the trigger rate-limits on it; the raw IP is never stored.
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "none";
  const day = new Date().toISOString().slice(0, 10);
  const ipHash = createHash("sha256")
    .update(`${ip}:${day}:${process.env.REVALIDATE_SECRET ?? "salt"}`)
    .digest("hex")
    .slice(0, 24);

  const res = await fetch(`${url}/rest/v1/form_submissions`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      client_id: TENANT_ID,
      form_key: "message",
      payload: { name, email, message, subject, company, ip_hash: ipHash },
    }),
  });

  if (!res.ok) {
    return Response.json({ ok: false, error: "Could not send just now — please email studio@solhous.com." }, { status: 502 });
  }
  return Response.json({ ok: true });
}
