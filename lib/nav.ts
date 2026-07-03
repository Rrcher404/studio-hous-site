export type NavLink = { href: string; label: string };

export const NAV: NavLink[] = [
  { href: "/work/", label: "Work" },
  { href: "/sessions/", label: "Sessions" },
  { href: "/field-notes/", label: "Field Notes" },
  { href: "/spaces/", label: "Spaces" },
  { href: "/cosign/", label: "Cosign" },
  { href: "/housscapes/", label: "HousScapes" },
];

/** Pages that use the "STUDIO H​OUS" brand mark vs. the "S​OLHOUS" venture mark. */
export const STUDIO_BRAND_PATHS = new Set(["/", "/work/", "/sessions/", "/field-notes/"]);

export function isActivePath(href: string, pathname: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href);
}
