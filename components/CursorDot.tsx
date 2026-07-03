"use client";

import { useEffect, useRef } from "react";

/** The simple custom cursor dot that enlarges over interactive elements. */
export function CursorDot() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(hover:hover) and (pointer:fine)").matches;
    if (!fine || reduce) return;

    const cursor = ref.current;
    if (!cursor) return;

    let mx = innerWidth / 2;
    let my = innerHeight / 2;
    let cx = mx;
    let cy = my;
    let raf = 0;

    function onMove(e: PointerEvent) {
      mx = e.clientX;
      my = e.clientY;
    }
    addEventListener("pointermove", onMove);

    function loop() {
      cx += (mx - cx) * 0.22;
      cy += (my - cy) * 0.22;
      if (cursor) {
        cursor.style.left = cx + "px";
        cursor.style.top = cy + "px";
      }
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    // Delegated (not queried-once) so it keeps working across client-side
    // route changes, where new page content mounts without this effect re-running.
    const HOVER_SELECTOR = "[data-h],button,a,figure,summary";
    function onOver(e: PointerEvent) {
      if ((e.target as Element)?.closest?.(HOVER_SELECTOR)) cursor?.classList.add("lg");
    }
    function onOut(e: PointerEvent) {
      const related = e.relatedTarget as Element | null;
      if (!related?.closest?.(HOVER_SELECTOR)) cursor?.classList.remove("lg");
    }
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);

    return () => {
      removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
    };
  }, []);

  return <div className="cursor" id="sh-cursor" aria-hidden="true" ref={ref} />;
}
