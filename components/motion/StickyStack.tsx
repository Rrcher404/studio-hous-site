import Link from "next/link";
import { SkipRegion } from "./SkipRegion";

export type StickyStackItem = {
  href: string;
  kicker: string;
  title: string;
  body: string;
  image: { src: string; alt: string; position?: string };
  ctaLabel?: string;
};

/**
 * Sticky pin-and-cover "doors" deck (M2). Each card pins under the nav and the
 * next scrolls up to cover it — a deck of film frames, not a SaaS feature wall.
 *
 * Pure CSS sticky, zero client JS: this is a server component. We deliberately
 * do NOT drive a scroll-timeline recede-scale — on a sticky card `view()` only
 * advances once the whole section exits, so the scale fires at the wrong moment
 * and reads broken. The covering is the motion; it degrades to nothing under
 * reduced-motion because sticky is position, not animation.
 *
 * IMPORTANT: never wrap this in <Reveal>/.rv — that applies a transform, which
 * creates a containing block and silently kills position:sticky in descendants.
 *
 * A11y: every card is a link with visible text in DOM order (image alt="" so the
 * link name stays the copy); a SkipRegion jumps keyboard users to `skipToId`.
 * Mobile (<=760px) drops the pin for a plain vertical list — same content, same
 * CTAs (Gate G2).
 */
export function StickyStack({
  items,
  skipToId,
  label,
}: {
  items: StickyStackItem[];
  skipToId?: string;
  label?: string;
}) {
  return (
    <div className="motion-stack" role={label ? "list" : undefined} aria-label={label}>
      {skipToId && <SkipRegion skipToId={skipToId} label="Skip the doors" />}
      {items.map((item, i) => (
        <Link
          key={item.href}
          href={item.href}
          className="motion-stack__card"
          role={label ? "listitem" : undefined}
          style={{ zIndex: i + 1 }}
        >
          <div className="motion-stack__media">
            <img
              src={item.image.src}
              alt=""
              loading={i === 0 ? "eager" : "lazy"}
              style={item.image.position ? { objectPosition: item.image.position } : undefined}
            />
          </div>
          <div className="motion-stack__tx">
            <span className="motion-stack__k">{item.kicker}</span>
            <h3 className="motion-stack__h">{item.title}</h3>
            <p className="motion-stack__p">{item.body}</p>
            <span className="motion-stack__go">{item.ctaLabel ?? "Enter"} ›</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
