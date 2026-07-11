"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";

/**
 * Inline expand-to-detail (M3). A summary row that toggles a detail panel open
 * in place — no drawer, no overlay, no focus trap.
 *
 * Why inline over a bottom drawer (P3 decision): the panel lives in normal flow
 * (z-index 2), so it never contends with the BookingModal (z130) or the lightbox
 * (z120); one code path serves desktop and mobile; and there is no focus to trap
 * or restore. The trade — you cannot dim the page behind it — is exactly what we
 * want on a pricing surface, where the tiers above must stay readable.
 *
 * Motion: an animated `height` (0 <-> measured content height). We reach for the
 * measured-height technique rather than the CSS grid `0fr->1fr` trick because
 * `1fr` collapses to 0 when the revealed content clips with overflow:hidden in an
 * indefinite-height container (verified in-browser during P3). Measuring is what
 * Radix/Headless UI ship for the same reason. It runs once per click, never per
 * scroll frame, so it stays inside the "no layout thrash" budget; the global
 * reduced-motion killswitch voids the transition -> instant open.
 *
 * A11y: button carries aria-expanded + aria-controls; the collapsed content is
 * `inert` so it leaves the tab order and the a11y tree entirely. Give it an `id`
 * and the panel opens itself when the page loads at `#id` (shareable deep link).
 */
export function ExpandDetail({
  id,
  summary,
  ariaLabel,
  children,
  defaultOpen = false,
}: {
  id?: string;
  summary: ReactNode;
  /** Accessible name for the trigger when the visible summary is ambiguous
   *  (e.g. several "What's included" toggles on one page). */
  ariaLabel?: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const [height, setHeight] = useState(0);
  const innerRef = useRef<HTMLDivElement>(null);
  const reactId = useId();
  const panelId = `${id ?? reactId}-panel`;

  const measure = () => innerRef.current?.scrollHeight ?? 0;

  const toggle = () => {
    if (!open) setHeight(measure());
    setOpen((v) => !v);
  };

  // Deep link: open on load if the URL points at this disclosure.
  useEffect(() => {
    if (id && window.location.hash === `#${id}`) {
      setHeight(measure());
      setOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Keep the measured height honest when the viewport (and text wrapping) changes.
  useEffect(() => {
    if (!open) return;
    const onResize = () => setHeight(measure());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open]);

  return (
    <div className="expand" data-open={open || undefined} id={id}>
      <button
        type="button"
        className="expand__trig"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={ariaLabel}
        onClick={toggle}
      >
        <span className="expand__sum">{summary}</span>
        <span className="expand__chev" aria-hidden="true">
          ↓
        </span>
      </button>
      <div
        id={panelId}
        className="expand__panel"
        role="region"
        style={{ height: open ? height : 0 }}
      >
        <div className="expand__inner" ref={innerRef} inert={!open ? true : undefined}>
          {children}
        </div>
      </div>
    </div>
  );
}
