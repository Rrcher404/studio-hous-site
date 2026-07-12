"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NAV_GROUPS, STUDIO_BRAND_PATHS, isActivePath } from "@/lib/nav";
import { BookMeButton } from "./BookingModal";

export function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);

  const isStudioBrand = STUDIO_BRAND_PATHS.has(pathname);

  useEffect(() => {
    if (menuOpen) closeBtnRef.current?.focus();
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    function onKeydown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setOpenGroup(null);
      }
    }
    document.addEventListener("keydown", onKeydown);
    return () => document.removeEventListener("keydown", onKeydown);
  }, []);

  // Close menu + dropdowns whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
    setOpenGroup(null);
  }, [pathname]);

  // Click/tap outside the nav closes any open dropdown.
  useEffect(() => {
    if (!openGroup) return;
    function onPointerDown(e: PointerEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenGroup(null);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [openGroup]);

  return (
    <>
      <nav className="sitenav" aria-label="Primary" ref={navRef}>
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
          {NAV_GROUPS.map((group) => {
            const active = group.links.some((l) => isActivePath(l.href, pathname));
            const open = openGroup === group.label;
            return (
              <div
                key={group.label}
                className={`navgroup${open ? " open" : ""}`}
                onMouseEnter={() => setOpenGroup(group.label)}
                onMouseLeave={() => setOpenGroup((g) => (g === group.label ? null : g))}
              >
                <button
                  type="button"
                  data-h
                  data-active={active || undefined}
                  aria-expanded={open}
                  aria-haspopup="true"
                  onClick={() => setOpenGroup(open ? null : group.label)}
                >
                  {group.label}{" "}
                  <span className="chev" aria-hidden="true">
                    ▾
                  </span>
                </button>
                <div className="dropdown glass distort" aria-label={group.label}>
                  {group.links.map((link) =>
                    link.external ? (
                      <a key={link.href} href={link.href} data-h target="_blank" rel="noopener noreferrer">
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        key={link.href}
                        href={link.href}
                        data-h
                        aria-current={isActivePath(link.href, pathname) ? "page" : undefined}
                      >
                        {link.label}
                      </Link>
                    )
                  )}
                </div>
              </div>
            );
          })}
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
        <p className="grp">{NAV_GROUPS[0].mobileLabel}</p>
        <Link href="/" aria-current={pathname === "/" ? "page" : undefined}>
          Home
        </Link>
        {NAV_GROUPS[0].links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            aria-current={isActivePath(link.href, pathname) ? "page" : undefined}
          >
            {link.label}
          </Link>
        ))}
        {NAV_GROUPS.slice(1).map((group) => (
          <div key={group.label} style={{ display: "contents" }}>
            <p className="grp">{group.mobileLabel}</p>
            {group.links.map((link) =>
              link.external ? (
                <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActivePath(link.href, pathname) ? "page" : undefined}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>
        ))}
      </div>
    </>
  );
}
