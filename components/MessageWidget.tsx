"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Persistent "Message the studio" widget — a collapsed circle on every page that
 * opens into a compact note composer. It posts to the SAME hardened intake as the
 * /contact page (POST /api/contact/ → create_message RPC: honeypot + per-IP
 * rate-limit + host-resolved tenant), so there is no new backend surface.
 *
 * Two smart touches over a plain email box:
 *  - subject is set automatically from the page the visitor is on, so the inbox
 *    thread reads "Message from Hous Sites" — triage context for free.
 *  - after a successful send we remember it (localStorage) so a returning visitor
 *    sees a warm confirmation line, not a blank form.
 *
 * Kept to email + message, as asked. Non-modal (doesn't trap the page); Esc and
 * the launcher both close it; honors prefers-reduced-motion.
 */

const STORE_KEY = "solhous_msg_v1";

function pageLabel(path: string): string {
  if (!path || path === "/") return "the homepage";
  const seg = path.replace(/^\/+|\/+$/g, "").split("/")[0] ?? "";
  if (!seg) return "the homepage";
  return seg
    .split("-")
    .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1) : w))
    .join(" ");
}

const ChatIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.5 8.5 0 0 1-12.2 7.7L3 21l1.9-5.6A8.5 8.5 0 1 1 21 11.5z" />
  </svg>
);
const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export function MessageWidget() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ email: "", message: "", company: "" });
  const [err, setErr] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [priorEmail, setPriorEmail] = useState<string | null>(null);
  const launchRef = useRef<HTMLButtonElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) {
        const v = JSON.parse(raw) as { email?: string };
        if (v?.email) setPriorEmail(v.email);
      }
    } catch {
      /* localStorage blocked — fine, widget still works */
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => emailRef.current?.focus(), 40);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        launchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.email.trim() || !/.+@.+\..+/.test(form.email)) {
      setErr("An email so we can write back.");
      emailRef.current?.focus();
      return;
    }
    if (!form.message.trim()) {
      setErr("A line or two about what you have in mind.");
      return;
    }
    setErr("");
    setState("sending");
    const path = typeof window !== "undefined" ? window.location.pathname : "/";
    try {
      const res = await fetch("/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "",
          email: form.email,
          subject: `Message from ${pageLabel(path)}`,
          message: form.message,
          company: form.company,
        }),
      });
      if (res.ok) {
        setState("done");
        setPriorEmail(form.email);
        try {
          localStorage.setItem(STORE_KEY, JSON.stringify({ email: form.email, at: Date.now() }));
        } catch {
          /* ignore */
        }
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  }

  function reset() {
    setForm({ email: "", message: "", company: "" });
    setErr("");
    setState("idle");
  }

  function close() {
    setOpen(false);
    launchRef.current?.focus();
  }

  return (
    <div className="msgw" data-open={open ? "true" : "false"}>
      {open && (
        <div className="msgw-panel" role="dialog" aria-label="Message the studio" id="msgw-panel">
          <button type="button" className="msgw-x" aria-label="Close" onClick={close}>
            <CloseIcon />
          </button>
          <p className="msgw-kick">Message the studio</p>

          {state === "done" ? (
            <div className="msgw-done">
              <p className="msgw-lead">Your note&rsquo;s in.</p>
              <p className="msgw-sub">
                We read every one and reply by email — to {priorEmail}. Usually within a day.
              </p>
              <button type="button" className="msgw-again linklike" onClick={reset}>
                Send another &rsaquo;
              </button>
            </div>
          ) : (
            <>
              <p className="msgw-lead">Leave a note.</p>
              <p className="msgw-sub">
                We read every one and reply by email, usually within a day.
                {priorEmail ? ` Last time we wrote to ${priorEmail}.` : ""}
              </p>
              <form className="msgw-form" noValidate onSubmit={submit}>
                <label htmlFor="msgw_email">Your email</label>
                <input
                  id="msgw_email"
                  ref={emailRef}
                  type="email"
                  autoComplete="email"
                  aria-required="true"
                  value={form.email}
                  onChange={set("email")}
                  placeholder="you@email.com"
                />
                <label htmlFor="msgw_message">Your message</label>
                <textarea
                  id="msgw_message"
                  rows={3}
                  aria-required="true"
                  value={form.message}
                  onChange={set("message")}
                  placeholder="Tell us what you have in mind."
                />
                {/* honeypot — hidden from people, dropped server-side */}
                <div aria-hidden="true" className="msgw-hp">
                  <label htmlFor="msgw_company">Company</label>
                  <input
                    id="msgw_company"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.company}
                    onChange={set("company")}
                  />
                </div>
                <div className="msgw-err" role="alert">
                  {err}
                </div>
                <button type="submit" className="msgw-send" disabled={state === "sending"}>
                  {state === "sending" ? "Sending…" : "Send it ›"}
                </button>
                {state === "error" && (
                  <p className="msgw-fallback" role="status">
                    Something hiccuped. Write us at{" "}
                    <a href="mailto:studio@solhous.com">studio@solhous.com</a>.
                  </p>
                )}
              </form>
            </>
          )}
        </div>
      )}

      <button
        ref={launchRef}
        type="button"
        className="msgw-launch"
        aria-expanded={open}
        aria-controls="msgw-panel"
        aria-label={open ? "Close message box" : "Message the studio"}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="msgw-ico" aria-hidden="true">
          {open ? <CloseIcon /> : <ChatIcon />}
        </span>
      </button>
    </div>
  );
}
