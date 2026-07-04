"use client";

import { CSSProperties, useEffect, useRef } from "react";

type LiquidGlassProps = {
  width?: number;
  height?: number;
  borderRadius?: number;
};

/**
 * A liquid-glass lens that drifts after the cursor inside its parent
 * (parent must be position:relative). Dependency-free take on the
 * GSAP LiquidGlass concept — rAF lerp instead of a tween library.
 * Pointer-events: none, decorative only. Sits out entirely on touch
 * devices and for prefers-reduced-motion users.
 */
export function LiquidGlass({ width = 170, height = 170, borderRadius = 999 }: LiquidGlassProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let raf = 0;
    let tx = 0,
      ty = 0,
      cx = 0,
      cy = 0;

    const onMove = (e: MouseEvent) => {
      const r = parent.getBoundingClientRect();
      const inside =
        e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      el.style.opacity = inside ? "1" : "0";
      if (!inside) return;
      tx = e.clientX - r.left - width / 2;
      ty = e.clientY - r.top - height / 2;
    };

    const tick = () => {
      cx += (tx - cx) * 0.09;
      cy += (ty - cy) * 0.09;
      el.style.transform = `translate(${cx}px, ${cy}px)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [width, height]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="liquid-lens glass distort"
      style={{ width, height, borderRadius, opacity: 0 } as CSSProperties}
    />
  );
}
