import { createHash } from "node:crypto";

/**
 * Website message intake → Panel inbox. Posts to the create_message() SECURITY
 * DEFINER RPC, which resolves client_id from the site's own domain (never from
 * the caller), validates, drops honeypot + rate-limited spam, and creates the
 * thread. Anon key only — no service-role in the site.
 */
const SITE_DOMAIN = "solhous.com";

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

  const res = await fetch(`${url}/rest/v1/rpc/create_message`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      p_domain: SITE_DOMAIN,
      p_name: name,
      p_email: email,
      p_subject: subject,
      p_message: message,
      p_company: company,
      p_ip_hash: ipHash,
    }),
  });

  if (!res.ok) {
    return Response.json({ ok: false, error: "Could not send just now — please email studio@solhous.com." }, { status: 502 });
  }
  return Response.json({ ok: true });
}
