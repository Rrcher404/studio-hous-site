"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Persistent "Message the studio" widget — a collapsed circle on every page that
 * opens into a compact composer, and then into an ongoing conversation.
 *
 * First contact posts to the same hardened intake as /contact (POST /api/contact/
 * → create_message: honeypot + per-IP rate-limit + host-resolved tenant), which
 * returns the thread's reply_token. We remember that token (localStorage) so a
 * returning visitor sees the studio's reply right here and can write back in-widget
 * (POST /api/conversation → append_visitor_message). No account, no new tables.
 * The token is an unguessable capability the visitor already holds via their email
 * Reply-To; the read/append RPCs are pinned to it, so a request only ever touches
 * that one thread.
 *
 * Subject on first contact is set from the page ("Message from Hous Sites") for
 * studio triage. Non-modal; Esc/launcher/× close; honors prefers-reduced-motion.
 */

const STORE_KEY = "solhous_msg_v1";

type Store = { token?: string; email?: string; seenAt?: number };
type Msg = { from: "you" | "studio"; body: string; at: string };
type Mode = "form" | "convo" | "done";

function readStore(): Store {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY) || "{}") as Store;
  } catch {
    return {};
  }
}
function writeStore(s: Store) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(s));
  } catch {
    /* blocked — widget still works, just won't remember */
  }
}

function pageLabel(path: string): string {
  if (!path || path === "/") return "the homepage";
  const seg = path.replace(/^\/+|\/+$/g, "").split("/")[0] ?? "";
  if (!seg) return "the homepage";
  return seg
    .split("-")
    .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1) : w))
    .join(" ");
}

const latestStudioAt = (ms: Msg[]) =>
  ms.reduce((mx, m) => (m.from === "studio" ? Math.max(mx, new Date(m.at).getTime()) : mx), 0);

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
  const [mode, setMode] = useState<Mode>("form");
  const [token, setToken] = useState<string | null>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [form, setForm] = useState({ email: "", message: "", company: "" });
  const [reply, setReply] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [hasUnseen, setHasUnseen] = useState(false);
  const [priorEmail, setPriorEmail] = useState<string | null>(null);
  const launchRef = useRef<HTMLButtonElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  // Live mirror of `open` so the single background poll reads the current
  // state without tearing down and rebuilding its interval on every toggle.
  const openRef = useRef(open);
  useEffect(() => {
    openRef.current = open;
  }, [open]);

  const loadConvo = useCallback(async (tok: string, markSeen: boolean) => {
    try {
      const res = await fetch(`/api/conversation?token=${encodeURIComponent(tok)}`);
      const data = await res.json();
      if (!data?.ok || !Array.isArray(data.messages)) return;
      if (data.messages.length === 0) {
        // thread no longer exists — fall back to a fresh note
        setToken(null);
        setMode("form");
        writeStore({ email: readStore().email });
        return;
      }
      setMessages(data.messages as Msg[]);
      const s = readStore();
      if (markSeen) {
        writeStore({ ...s, token: tok, seenAt: Date.now() });
        setHasUnseen(false);
      } else {
        setHasUnseen(latestStudioAt(data.messages) > (s.seenAt ?? 0));
      }
    } catch {
      /* offline — leave state as is */
    }
  }, []);

  // On mount: recall a prior thread and pull its conversation quietly.
  useEffect(() => {
    const s = readStore();
    if (s.email) setPriorEmail(s.email);
    if (s.token) {
      setToken(s.token);
      setMode("convo");
      loadConvo(s.token, false);
    }
  }, [loadConvo]);

  function close() {
    setOpen(false);
    launchRef.current?.focus();
  }

  // While open: Esc to close, focus the form, and on entering a conversation
  // refresh once and mark it seen. The background poll below keeps it live.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    if (mode === "convo" && token) {
      loadConvo(token, true);
    } else if (mode === "form") {
      setTimeout(() => emailRef.current?.focus(), 40);
    }
    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [open, mode, token, loadConvo]);

  // Background poll — the heart of the live refresh. Whenever a thread exists,
  // check for the studio's replies on a gentle cadence *regardless of whether
  // the bubble is open*, so a fresh reply lights the notification dot without a
  // page reload. Open → mark seen and the thread updates in place; closed →
  // just flip hasUnseen. Pauses on hidden tabs and refreshes the instant the
  // visitor looks back at the tab.
  useEffect(() => {
    if (mode !== "convo" || !token) return;
    const poll = () => {
      if (typeof document !== "undefined" && document.visibilityState === "hidden") return;
      loadConvo(token, openRef.current);
    };
    const id = setInterval(poll, 12000);
    const onVis = () => {
      if (document.visibilityState === "visible") poll();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [mode, token, loadConvo]);

  // Keep the newest message in view.
  useEffect(() => {
    if (open && mode === "convo") endRef.current?.scrollIntoView({ block: "end" });
  }, [messages, open, mode]);

  const setField =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  async function submitForm(e: React.FormEvent) {
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
    setBusy(true);
    const path = typeof window !== "undefined" ? window.location.pathname : "/";
    const firstBody = form.message.trim();
    try {
      const res = await fetch("/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "",
          email: form.email,
          subject: `Message from ${pageLabel(path)}`,
          message: firstBody,
          company: form.company,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && typeof data?.token === "string") {
        setToken(data.token);
        setMessages([{ from: "you", body: firstBody, at: new Date().toISOString() }]);
        setMode("convo");
        setPriorEmail(form.email);
        writeStore({ token: data.token, email: form.email, seenAt: Date.now() });
        setForm({ email: "", message: "", company: "" });
      } else if (res.ok) {
        // accepted but no thread token (spam/rate-limited path) — soft confirm
        setPriorEmail(form.email);
        writeStore({ ...readStore(), email: form.email });
        setMode("done");
      } else {
        setErr("Something hiccuped. Try again, or email studio@solhous.com.");
      }
    } catch {
      setErr("Something hiccuped. Try again, or email studio@solhous.com.");
    }
    setBusy(false);
  }

  async function submitReply(e: React.FormEvent) {
    e.preventDefault();
    const body = reply.trim();
    if (!body || !token || busy) return;
    setBusy(true);
    setMessages((m) => [...m, { from: "you", body, at: new Date().toISOString() }]);
    setReply("");
    try {
      await fetch("/api/conversation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, message: body }),
      });
      await loadConvo(token, true);
    } catch {
      /* leave the optimistic message; next poll reconciles */
    }
    setBusy(false);
  }

  const awaitingReply = mode === "convo" && !messages.some((m) => m.from === "studio");
  const launchLabel = open
    ? "Close message box"
    : hasUnseen
    ? "Message the studio — new reply waiting"
    : "Message the studio";

  return (
    <div className="msgw" data-open={open ? "true" : "false"}>
      {open && (
        <div className="msgw-panel" role="dialog" aria-label="Message the studio" id="msgw-panel">
          <button type="button" className="msgw-x" aria-label="Close" onClick={close}>
            <CloseIcon />
          </button>
          <p className="msgw-kick">Message the studio</p>

          {mode === "convo" ? (
            <>
              <p className="msgw-lead">The studio.</p>
              <p className="msgw-sub">
                We reply here and by email{priorEmail ? ` (${priorEmail})` : ""}.
              </p>
              <div className="msgw-thread">
                {messages.map((m, i) => (
                  <div key={i} className={`msgw-b msgw-b-${m.from}`}>
                    <span className="msgw-b-who">{m.from === "you" ? "You" : "SolHous"}</span>
                    <p className="msgw-b-body">{m.body}</p>
                  </div>
                ))}
                {awaitingReply && (
                  <p className="msgw-hint">Sent. We&rsquo;ll reply right here — and to your email.</p>
                )}
                <div ref={endRef} />
              </div>
              <form className="msgw-reply" onSubmit={submitReply}>
                <textarea
                  rows={2}
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Write back…"
                  aria-label="Your reply"
                />
                <button type="submit" className="msgw-send" disabled={busy || !reply.trim()}>
                  {busy ? "…" : "Send ›"}
                </button>
              </form>
            </>
          ) : mode === "done" ? (
            <div className="msgw-done">
              <p className="msgw-lead">Your note&rsquo;s in.</p>
              <p className="msgw-sub">
                We read every one and reply by email{priorEmail ? ` — to ${priorEmail}` : ""}. Usually
                within a day.
              </p>
              <button
                type="button"
                className="msgw-again linklike"
                onClick={() => {
                  setErr("");
                  setForm({ email: "", message: "", company: "" });
                  setMode("form");
                }}
              >
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
              <form className="msgw-form" noValidate onSubmit={submitForm}>
                <label htmlFor="msgw_email">Your email</label>
                <input
                  id="msgw_email"
                  ref={emailRef}
                  type="email"
                  autoComplete="email"
                  aria-required="true"
                  value={form.email}
                  onChange={setField("email")}
                  placeholder="you@email.com"
                />
                <label htmlFor="msgw_message">Your message</label>
                <textarea
                  id="msgw_message"
                  rows={3}
                  aria-required="true"
                  value={form.message}
                  onChange={setField("message")}
                  placeholder="Tell us what you have in mind."
                />
                <div aria-hidden="true" className="msgw-hp">
                  <label htmlFor="msgw_company">Company</label>
                  <input
                    id="msgw_company"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.company}
                    onChange={setField("company")}
                  />
                </div>
                <div className="msgw-err" role="alert">
                  {err}
                </div>
                <button type="submit" className="msgw-send" disabled={busy}>
                  {busy ? "Sending…" : "Send it ›"}
                </button>
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
        aria-label={launchLabel}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="msgw-ico" aria-hidden="true">
          {open ? <CloseIcon /> : <ChatIcon />}
        </span>
        {hasUnseen && !open && <span className="msgw-dot" aria-hidden="true" />}
      </button>
    </div>
  );
}
