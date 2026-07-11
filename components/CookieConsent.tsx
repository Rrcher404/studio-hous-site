"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const KEY = "sh.consent";
export const CONSENT_OPEN_EVENT = "sh:consent-open";

/**
 * Cookie consent — default deny, ported from the NervaHous pattern.
 * SolHous sets no analytics or tracking cookies today; essential
 * storage only. Choice stored in localStorage as `sh.consent`
 * ("accepted" | "declined"). Any future analytics must check it:
 * only load when sh.consent === "accepted".
 * The footer's Cookie Settings link re-opens this via a custom event.
 */
export function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(KEY);
    } catch {
      /* storage unavailable — stay quiet, never block the site */
    }
    if (!stored) setOpen(true);

    const reopen = () => setOpen(true);
    window.addEventListener(CONSENT_OPEN_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, reopen);
  }, []);

  const choose = (value: "accepted" | "declined") => {
    try {
      window.localStorage.setItem(KEY, value);
    } catch {
      /* ignore */
    }
    setOpen(false);
  };

  if (!open) return null;

  return (
    <aside
      className="consent glass specular"
      role="dialog"
      aria-labelledby="consent-title"
      aria-describedby="consent-body"
    >
      <p className="ctitle" id="consent-title">
        Cookies
      </p>
      <p className="cbody" id="consent-body">
        SolHous sets no analytics or tracking cookies without your OK. Essential storage (the kind
        that makes the site work) is always on. Change your mind anytime under Cookie Settings in
        the footer.
      </p>
      <div className="cactions">
        <button type="button" className="cbtn ghost" onClick={() => choose("declined")}>
          Decline non-essential
        </button>
        <button type="button" className="cbtn" onClick={() => choose("accepted")}>
          Accept all
        </button>
      </div>
      <Link className="clink" href="/privacy/">
        Read the privacy policy ›
      </Link>
    </aside>
  );
}

/** Footer trigger — re-opens the banner. */
export function CookieSettingsLink() {
  return (
    <button
      type="button"
      className="linklike"
      onClick={() => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))}
    >
      Cookie Settings
    </button>
  );
}
