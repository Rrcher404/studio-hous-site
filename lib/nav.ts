export type NavLink = { href: string; label: string };

export const NAV: NavLink[] = [
  { href: "/work/", label: "Work" },
  { href: "/sessions/", label: "Sessions" },
  { href: "/field-notes/", label: "Field Notes" },
  { href: "/anti-feed/", label: "Anti-Feed" },
  { href: "/direction-market/", label: "Direction Market" },
  { href: "/spaces/", label: "Spaces" },
  { href: "/cosign/", label: "Cosign" },
  { href: "/housscapes/", label: "HousScapes" },
];

/**
 * Pages that use the "STUDIO H​OUS" brand mark vs. the "S​OLHOUS" venture mark.
 * The landing page is the SolHous hub now, so it carries the venture mark.
 */
export const STUDIO_BRAND_PATHS = new Set(["/work/", "/sessions/", "/field-notes/"]);

export function isActivePath(href: string, pathname: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href);
}
