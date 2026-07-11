"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

export type GalleryItem = {
  thumb: string;
  full: string;
  alt: string;
  caption?: string;
};

export function Gallery({ items }: { items: GalleryItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Cascade entrance (M8): a subtle, once-per-view stagger as the grid enters.
  // `cascade` is applied by JS only, so no-JS and reduced-motion users get every
  // thumb immediately (the class is never added, and the CSS start-state with it).
  const galRef = useRef<HTMLDivElement>(null);
  const [cascade, setCascade] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = galRef.current;
    if (reduce || !el || !("IntersectionObserver" in window)) return;
    setCascade(true);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function openAt(i: number) {
    lastFocusRef.current = document.activeElement as HTMLElement;
    setOpenIndex(i);
  }
  function close() {
    setOpenIndex(null);
    lastFocusRef.current?.focus();
  }
  function nav(delta: number) {
    setOpenIndex((cur) => {
      if (cur === null) return cur;
      return (cur + delta + items.length) % items.length;
    });
  }

  useEffect(() => {
    if (openIndex !== null) closeBtnRef.current?.focus();
  }, [openIndex]);

  useEffect(() => {
    if (openIndex === null) return;
    function onKeydown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") nav(1);
      if (e.key === "ArrowLeft") nav(-1);
    }
    document.addEventListener("keydown", onKeydown);
    return () => document.removeEventListener("keydown", onKeydown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openIndex]);

  const current = openIndex !== null ? items[openIndex] : null;

  return (
    <>
      <div
        className={`gal${cascade ? " cascade" : ""}${inView ? " in" : ""}`}
        role="list"
        ref={galRef}
      >
        {items.map((item, i) => (
          <figure
            key={item.full}
            data-full={item.full}
            tabIndex={0}
            style={{ "--i": i } as CSSProperties}
            onClick={() => openAt(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter") openAt(i);
            }}
          >
            <img loading="lazy" src={item.thumb} alt={item.alt} />
            {item.caption && <figcaption>{item.caption}</figcaption>}
          </figure>
        ))}
      </div>

      <div
        className={`lb${openIndex !== null ? " open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Photo viewer"
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <button className="x" aria-label="Close viewer" ref={closeBtnRef} onClick={close}>
          ×
        </button>
        <button className="arw prev" aria-label="Previous" onClick={() => nav(-1)}>
          ‹
        </button>
        {current && <img src={current.full} alt={current.alt} />}
        <button className="arw next" aria-label="Next" onClick={() => nav(1)}>
          ›
        </button>
      </div>
    </>
  );
}
