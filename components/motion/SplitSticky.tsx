import type { ReactNode } from "react";

/**
 * Split sticky (M5) — a copy column that gently pins while the content column
 * scrolls past it ("the thesis holds while the evidence passes"). Deliberately
 * light: the home already spends its theater budget on the sticky stack, so this
 * is a single pinned text column, not a second full-viewport scrub.
 *
 * Server component, pure CSS. Like the stack, it must NOT sit inside .rv/Reveal —
 * a transform ancestor kills position:sticky. On mobile the pin drops and the two
 * columns stack (copy, then content).
 */
export function SplitSticky({
  eyebrow,
  title,
  body,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  body?: ReactNode;
  /** The scrolling content column (e.g. a vertical list of points). */
  children: ReactNode;
}) {
  return (
    <div className="split-sticky">
      <div className="split-sticky__copy">
        {eyebrow && <p className="roll">{eyebrow}</p>}
        <h2 className="big split-sticky__title">{title}</h2>
        {body && <div className="split-sticky__body">{body}</div>}
      </div>
      <div className="split-sticky__content">{children}</div>
    </div>
  );
}
