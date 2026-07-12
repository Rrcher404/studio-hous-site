"use client";

import { useState } from "react";

/**
 * Message form → the Hous Panel inbox (POST /api/contact/). Real endpoint, real
 * validation server-side. The "company" field is a honeypot: hidden from people,
 * catnip for bots; the server drops any submission that fills it. On any failure
 * we fall back to an honest prefilled email — never a silent success.
 */
export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", company: "" });
  const [err, setErr] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.email.trim() || !/.+@.+\..+/.test(form.email)) {
      setErr("An email so we can write back.");
      document.getElementById("cf_email")?.focus();
      return;
    }
    if (!form.message.trim()) {
      setErr("A line or two about what you have in mind.");
      document.getElementById("cf_message")?.focus();
      return;
    }
    setErr("");
    setState("sending");
    try {
      const res = await fetch("/api/contact/", {
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
        <p>Got it. Your message is in the studio&rsquo;s hands, and you&rsquo;ll hear back at {form.email}.</p>
        <p className="by">— thank you for writing</p>
      </div>
    );
  }

  return (
    <form className="fform" noValidate onSubmit={submit} style={{ marginTop: 36 }}>
      <label htmlFor="cf_name">Your name</label>
      <input id="cf_name" type="text" autoComplete="name" value={form.name} onChange={set("name")} placeholder="First and last" />

      <label htmlFor="cf_email" style={{ marginTop: 18 }}>Your email</label>
      <input id="cf_email" type="email" autoComplete="email" aria-required="true" value={form.email} onChange={set("email")} placeholder="you@email.com" />

      <label htmlFor="cf_subject" style={{ marginTop: 18 }}>What&rsquo;s it about</label>
      <input id="cf_subject" type="text" value={form.subject} onChange={set("subject")} placeholder="A session, a quote, a question" />

      <label htmlFor="cf_message" style={{ marginTop: 18 }}>Your message</label>
      <textarea id="cf_message" rows={5} aria-required="true" value={form.message} onChange={set("message")} placeholder="Tell us what you have in mind." />

      {/* honeypot — visually hidden, off the tab order; bots fill it, the server drops it */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", top: "auto", height: 0, overflow: "hidden" }}>
        <label htmlFor="cf_company">Company</label>
        <input id="cf_company" type="text" tabIndex={-1} autoComplete="off" value={form.company} onChange={set("company")} />
      </div>

      <div className="err" role="alert">{err}</div>
      <div style={{ marginTop: 26 }}>
        <button type="submit" className="btn" disabled={state === "sending"}>
          {state === "sending" ? "Sending…" : "Send it ›"}
        </button>
      </div>
      {state === "error" && (
        <p className="confirm show" role="status">
          Something hiccuped on our end. Write us directly at{" "}
          <a href="mailto:studio@solhous.com">studio@solhous.com</a> and we&rsquo;ll take it from there.
        </p>
      )}
      <p className="note">Goes straight to the studio. We read every one.</p>
    </form>
  );
}
