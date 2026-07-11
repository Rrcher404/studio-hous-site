"use client";

import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * SSR-safe reduced-motion preference for client components that drive motion
 * from JS (expand drawers, gallery cascade, lookbook affordances). CSS-only
 * motion is already covered by the global killswitch in globals.css — reach
 * for this hook only when JavaScript needs to branch on the preference.
 *
 * Starts `false` on the server and first client paint (so markup matches),
 * then corrects on mount and stays live if the user flips the OS setting.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
