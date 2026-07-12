"use client";

import { useState } from "react";

/**
 * Booking request → the Panel bookings queue (POST /api/book/). The "company"
 * field is a honeypot. Session types mirror the seeded booking_types.
 */
const TYPES = [
  { key: "portrait", label: "Portrait session" },
  { key: "grad", label: "Graduation session" },
  { key: "event", label: "Wedding / event" },
  { key: "blueprint", label: "Hous Sites Blueprint" },
];

export function BookingRequestForm() {
  const [form, setForm] = useState({ type: "portrait", name: "", email: "", phone: "", dates: "", notes: "", company: "" });
  const [err, setErr] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.email.trim() || !/.+@.+\..+/.test(form.email)) {
      setErr("An email so we can confirm your date.");
      document.getElementById("bk_email")?.focus();
      return;
    }
    setErr("");
    setState("sending");
    try {
      const res = await fetch("/api/book/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="firstwords" style={{ marginTop: 36 }}>
        <p>Your request is in. We&rsquo;ll confirm the date and, where a deposit holds it, send you the way to pay. Look for us at {form.email}.</p>
        <p className="by">— talk soon</p>
      </div>
    );
  }

  return (
    <form className="fform" noValidate onSubmit={submit} style={{ marginTop: 36 }}>
      <label htmlFor="bk_type">What are you booking</label>
      <select id="bk_type" value={form.type} onChange={set("type")} style={{ width: "100%", background: "var(--haze-2)", border: "1px solid rgba(237,239,224,.16)", color: "var(--milk)", padding: "12px 14px", fontFamily: "inherit", fontSize: 15 }}>
        {TYPES.map((t) => (
          <option key={t.key} value={t.key}>{t.label}</option>
        ))}
      </select>

      <label htmlFor="bk_name" style={{ marginTop: 18 }}>Your name</label>
      <input id="bk_name" type="text" autoComplete="name" value={form.name} onChange={set("name")} placeholder="First and last" />

      <label htmlFor="bk_email" style={{ marginTop: 18 }}>Your email</label>
      <input id="bk_email" type="email" autoComplete="email" aria-required="true" value={form.email} onChange={set("email")} placeholder="you@email.com" />

      <label htmlFor="bk_phone" style={{ marginTop: 18 }}>Phone (optional)</label>
      <input id="bk_phone" type="tel" autoComplete="tel" value={form.phone} onChange={set("phone")} placeholder="(336) 555-0100" />

      <label htmlFor="bk_dates" style={{ marginTop: 18 }}>Dates you have in mind</label>
      <input id="bk_dates" type="text" value={form.dates} onChange={set("dates")} placeholder="e.g. a Saturday in October, or 'flexible'" />

      <label htmlFor="bk_notes" style={{ marginTop: 18 }}>Anything else</label>
      <textarea id="bk_notes" rows={4} value={form.notes} onChange={set("notes")} placeholder="Tell us about the session or event." />

      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", height: 0, overflow: "hidden" }}>
        <label htmlFor="bk_company">Company</label>
        <input id="bk_company" type="text" tabIndex={-1} autoComplete="off" value={form.company} onChange={set("company")} />
      </div>

      <div className="err" role="alert">{err}</div>
      <div style={{ marginTop: 26 }}>
        <button type="submit" className="btn" disabled={state === "sending"}>
          {state === "sending" ? "Sending…" : "Request the date ›"}
        </button>
      </div>
      {state === "error" && (
        <p className="confirm show" role="status">
          Something hiccuped. Reach us at <a href="mailto:studio@solhous.com">studio@solhous.com</a> and we&rsquo;ll hold your date.
        </p>
      )}
      <p className="note">A request, not a charge. We confirm first; deposits hold the date where they apply.</p>
    </form>
  );
}
