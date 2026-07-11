import Link from "next/link";
import type { ReactNode } from "react";
import { NAV } from "@/lib/nav";
import { CookieSettingsLink } from "@/components/CookieConsent";

export function Footer({
  line,
  legal = "© 2026 SolHous · Studio Hous.",
  id,
  meta,
}: {
  line: ReactNode;
  legal?: ReactNode;
  id?: string;
  /** Override the default contact-info meta block entirely. */
  meta?: ReactNode;
}) {
  return (
    <footer id={id}>
      <div className="ln">{line}</div>
      <div className="meta">
        {meta ?? (
          <>
            Studio Hous · SolHous · Greensboro, North Carolina
            <br />
            <a href="mailto:studio@solhous.com">studio@solhous.com</a> ·{" "}
            <a href="https://www.instagram.com/thestudio.hous/" target="_blank" rel="noopener">
              @thestudio.hous
            </a>
          </>
        )}
      </div>
      <div className="fnav">
        <Link href="/">Home</Link>
        {NAV.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </div>
      <p className="legal">
        {legal} <span style={{ color: "var(--sun)" }}>&apos;26 7 2</span>
      </p>
      <p className="legal-links">
        <Link href="/privacy/">Privacy</Link>
        <span aria-hidden="true"> · </span>
        <CookieSettingsLink />
      </p>
    </footer>
  );
}
