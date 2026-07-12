import { createHash } from "node:crypto";

/**
 * Booking request intake → the Panel bookings queue. Calls the request_booking()
 * SECURITY DEFINER RPC, which resolves client_id from the site's own domain
 * (never the caller), honeypot-checks, and files the request. Anon key only.
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
  if (!email) return Response.json({ ok: false, error: "An email is required." }, { status: 400 });

  const res = await fetch(`${url}/rest/v1/rpc/request_booking`, {
    method: "POST",
    headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      p_domain: SITE_DOMAIN,
      p_type_key: String(body.type ?? ""),
      p_name: String(body.name ?? ""),
      p_email: email,
      p_phone: String(body.phone ?? ""),
      p_dates: String(body.dates ?? ""),
      p_notes: String(body.notes ?? ""),
      p_company: String(body.company ?? ""),
    }),
  });

  if (!res.ok) {
    return Response.json({ ok: false, error: "Could not send — email studio@solhous.com." }, { status: 502 });
  }
  return Response.json({ ok: true });
}
