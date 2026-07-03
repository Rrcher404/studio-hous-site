"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NAV, STUDIO_BRAND_PATHS, isActivePath } from "@/lib/nav";
import { BookMeButton } from "./BookingModal";

export function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const isStudioBrand = STUDIO_BRAND_PATHS.has(pathname);

  useEffect(() => {
    if (menuOpen) closeBtnRef.current?.focus();
  }, [menuOpen]);

  useEffect(() => {
    function onKeydown(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("keydown", onKeydown);
    return () => document.removeEventListener("keydown", onKeydown);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const studioLinks = NAV.slice(0, 3);
  const housLinks = NAV.slice(3);

  return (
    <>
      <nav className="sitenav" aria-label="Primary">
        <Link href="/" className="brand" data-h>
          {isStudioBrand ? (
            <>
              STUDIO H<span className="o">O</span>US
            </>
          ) : (
            <>
              S<span className="o">O</span>LHOUS
            </>
          )}
        </Link>
        <div className="navlinks">
          {NAV.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-h
              aria-current={isActivePath(link.href, pathname) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
          <button
            type="button"
            className="menu-btn"
            data-h
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
          >
            Menu
          </button>
          <BookMeButton className="book">Book ›</BookMeButton>
        </div>
      </nav>

      <div
        className={`mobmenu${menuOpen ? " open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <button
          className="mclose"
          aria-label="Close menu"
          ref={closeBtnRef}
          onClick={() => setMenuOpen(false)}
        >
          ×
        </button>
        <p className="grp">The Studio</p>
        <Link href="/" aria-current={pathname === "/" ? "page" : undefined}>
          Home
        </Link>
        {studioLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            aria-current={isActivePath(link.href, pathname) ? "page" : undefined}
          >
            {link.label}
          </Link>
        ))}
        <p className="grp">The Hous</p>
        {housLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            aria-current={isActivePath(link.href, pathname) ? "page" : undefined}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </>
  );
}
