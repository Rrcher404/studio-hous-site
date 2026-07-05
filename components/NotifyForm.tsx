"use client";

import { useState } from "react";

/**
 * Notify list for the Direction Market.
 * Clones the BookingModal Google-Form POST pattern. Until the notify form is
 * created, GFORM_ACTION is empty and we degrade to an honest prefilled email
 * (studio@solhous.com) with a clipboard fallback — never a silent no-op.
 *
 * To go live: create a one-field Google Form (see the field spec in the
 * handoff), then paste its formResponse URL + the email field's entry id below.
 */
const GFORM_ACTION = ""; // e.g. https://docs.google.com/forms/d/e/XXXX/formResponse
const GFORM_EMAIL_ENTRY = ""; // e.g. entry.123456789

export function NotifyForm() {
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
  const [done, setDone] = useState(false);
  const [posted, setPosted] = useState(false);
  const [copied, setCopied] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const v = email.trim();
    if (!v || !/.+@.+\..+/.test(v)) {
      setErr("An email so we can tell you when a package opens.");
      document.getElementById("nf_email")?.focus();
      return;
    }
    setErr("");

    if (GFORM_ACTION && GFORM_EMAIL_ENTRY) {
      const fd = new URLSearchParams();
      fd.append(GFORM_EMAIL_ENTRY, v);
      fetch(GFORM_ACTION, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: fd.toString(),
      }).finally(() => {
        setPosted(true);
        setDone(true);
      });
    } else {
      // Form not wired yet — honest prefilled-email fallback, not a silent success.
      const href = `mailto:studio@solhous.com?subject=${encodeURIComponent(
        "Direction Market — notify me"
      )}&body=${encodeURIComponent("Tell me when the next Direction Market package opens.\n\nEmail: " + v)}`;
      setDone(true);
      location.href = href;
    }
  }

  function copyEmail() {
    navigator.clipboard?.writeText("studio@solhous.com").then(() => setCopied(true));
  }

  return (
    <form className="fform" id="nfform" noValidate onSubmit={submit} style={{ marginTop: 36 }}>
      <label htmlFor="nf_email">Your email</label>
      <input
        id="nf_email"
        name="email"
        type="email"
        placeholder="you@studio.com"
        autoComplete="email"
        aria-required="true"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="err" id="nf_err" role="alert">
        {err}
      </div>
      <div style={{ marginTop: 26 }}>
        <button type="submit" className="btn">
          Tell me when it opens ›
        </button>
      </div>
      <p className={`confirm${done ? " show" : ""}`} id="nf_confirm" role="status">
        {posted ? (
          <>You&rsquo;re on the list. When a package clears the honest shelf, you hear it first.</>
        ) : (
          <>
            Your email app should open with everything filled in — hit send and you&rsquo;re on the
            list. If nothing opened,{" "}
            <button type="button" className="linklike" onClick={copyEmail}>
              {copied ? "copied — " : "copy the address"}
            </button>{" "}
            {copied ? "now " : "and "}write us at{" "}
            <a href="mailto:studio@solhous.com">studio@solhous.com</a>.
          </>
        )}
      </p>
      <p className="note">One email when a package opens. No list-swapping, no spam.</p>
    </form>
  );
}
