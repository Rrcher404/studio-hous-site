"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Cookieless pageview beacon. Fires a fire-and-forget count on each route change.
 * Stores nothing on the device, sends no identifiers — just the path. Skips
 * obvious automation. Aggregate-only on the server (path + day counts).
 */
export function Analytics() {
  const pathname = usePathname();
  useEffect(() => {
    if (typeof navigator !== "undefined" && (navigator as { webdriver?: boolean }).webdriver) return;
    const body = JSON.stringify({ path: pathname });
    try {
      // keepalive so the beacon survives the navigation that triggered it.
      fetch("/api/collect/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      }).catch(() => {});
    } catch {
      /* never let analytics break a page */
    }
  }, [pathname]);
  return null;
}
