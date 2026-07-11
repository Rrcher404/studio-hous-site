export type NavLink = { href: string; label: string };
export type NavGroup = { label: string; mobileLabel: string; links: NavLink[] };

/** Desktop nav renders these as two dropdown tabs; the mobile menu renders them as groups. */
export const NAV_GROUPS: NavGroup[] = [
  {
    label: "Studio",
    mobileLabel: "The Studio",
    links: [
      { href: "/work/", label: "Work" },
      { href: "/sessions/", label: "Sessions" },
      { href: "/field-notes/", label: "Field Notes" },
    ],
  },
  {
    label: "The Hous",
    mobileLabel: "The Hous",
    links: [
      // Archived 2026-07-11 (pages stay reachable by URL, just unlisted):
      // { href: "/anti-feed/", label: "Anti-Feed" },
      // { href: "/cosign/", label: "Cosign" },
      { href: "/direction-market/", label: "Direction Market" },
      { href: "/records/", label: "Records" },
      { href: "/housscapes/", label: "HousScapes" },
      { href: "/spaces/", label: "Spaces" },
      { href: "/hous-sites/", label: "Hous Sites" },
    ],
  },
];

/** Flat list (footer nav, sitemaps, anything that wants every room). */
export const NAV: NavLink[] = NAV_GROUPS.flatMap((g) => g.links);

/**
 * Pages that use the "STUDIO H​OUS" brand mark vs. the "S​OLHOUS" venture mark.
 * The landing page is the SolHous hub, so it carries the venture mark.
 */
export const STUDIO_BRAND_PATHS = new Set(["/work/", "/sessions/", "/field-notes/"]);

export function isActivePath(href: string, pathname: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href);
}
