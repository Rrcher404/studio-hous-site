import { SkipRegion } from "./SkipRegion";

export type LookbookItem = { src: string; alt: string; caption?: string };

/**
 * Horizontal lookbook band (M6) — a luxury "collection walk" for one chapter of
 * a page. Native horizontal overflow + CSS scroll-snap; no wheel hijack, no
 * translateX scrub. That keeps it honest (the user drives it), unbreakable on
 * iOS, and free under reduced-motion — nothing animates on its own.
 *
 * A11y: the track is a focusable role="region" with an aria-label, so a keyboard
 * user can focus it and arrow-scroll (WCAG scrollable-region pattern). A skip
 * link jumps past it to `skipToId`, which must exist right after the band.
 * Frames are ambient imagery — the browsable masonry below carries the lightbox.
 */
export function LookbookBand({
  items,
  label,
  skipToId,
}: {
  items: LookbookItem[];
  label?: string;
  skipToId: string;
}) {
  const regionLabel = label ?? "Lookbook";
  return (
    <div className="lookbook-band">
      <SkipRegion skipToId={skipToId} label="Skip the lookbook" />
      <div
        className="lookbook"
        role="region"
        aria-label={regionLabel}
        tabIndex={0}
      >
        <ul className="lookbook__track">
          {items.map((item, i) => (
            <li className="lookbook__frame" key={item.src}>
              <img
                src={item.src}
                alt={item.alt}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
              />
              {item.caption && <span className="lookbook__cap">{item.caption}</span>}
            </li>
          ))}
        </ul>
      </div>
      <p className="lookbook__hint" aria-hidden="true">
        scroll&nbsp;→
      </p>
    </div>
  );
}
