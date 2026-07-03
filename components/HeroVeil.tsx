"use client";

import { useEffect, useRef } from "react";

/** Homepage-only: the hero haze-veil follows the cursor, in-view only. */
export function HeroVeil() {
  const veilRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(hover:hover) and (pointer:fine)").matches;
    const veil = veilRef.current;
    const hero = veil?.closest(".hero") as HTMLElement | null;
    heroRef.current = hero;

    let raf = 0;
    let io: IntersectionObserver | null = null;

    if (veil && hero && fine && !reduce) {
      let vmx = innerWidth / 2;
      let vmy = innerHeight * 0.62;
      let vx = vmx;
      let vy = vmy;
      let heroVisible = true;
      let running = false;

      function onMove(e: PointerEvent) {
        vmx = e.clientX;
        vmy = e.clientY;
      }
      addEventListener("pointermove", onMove);

      io = new IntersectionObserver(
        (entries) => {
          heroVisible = entries[0].isIntersecting;
          if (heroVisible && !running) pump();
        },
        { threshold: 0.01 }
      );
      io.observe(hero);

      function pump() {
        running = true;
        step();
      }
      function step() {
        if (!heroVisible) {
          running = false;
          return;
        }
        vx += (vmx - vx) * 0.12;
        vy += (vmy - vy) * 0.12;
        const r = hero!.getBoundingClientRect();
        veil!.style.setProperty("--mx", vx - r.left + "px");
        veil!.style.setProperty("--my", vy - r.top + "px");
        raf = requestAnimationFrame(step);
      }
      pump();

      return () => {
        removeEventListener("pointermove", onMove);
        cancelAnimationFrame(raf);
        io?.disconnect();
      };
    } else if (veil) {
      veil.style.display = "none";
    }

    if (matchMedia("(pointer:coarse)").matches) {
      videoRef.current?.pause();
    }
  }, []);

  return (
    <>
      <video
        id="hv"
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/media/hero_silhouette_poster.jpg"
        aria-hidden="true"
      >
        <source src="/media/hero_silhouette.mp4" type="video/mp4" />
      </video>
      <div className="haze-veil" id="veil" ref={veilRef} />
    </>
  );
}
