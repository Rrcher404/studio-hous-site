import type { ReactNode } from "react";

/**
 * Keyboard escape hatch for a "theater" region (sticky stack, lookbook band).
 * Renders a link that is off-screen until focused, then jumps a keyboard user
 * past the region to `skipToId`. Pair with an element carrying that id right
 * after the region. Server component — no client JS needed.
 *
 *   <SkipRegion skipToId="after-doors" label="Skip the doors" />
 *   …theater…
 *   <span id="after-doors" tabIndex={-1} />
 */
export function SkipRegion({
  skipToId,
  label,
  children,
}: {
  skipToId: string;
  label: string;
  children?: ReactNode;
}) {
  return (
    <a href={`#${skipToId}`} className="motion-skip">
      {children ?? label}
    </a>
  );
}
