import Link from "next/link";
import { BookMeButton } from "@/components/BookingModal";

export type BentoCell = {
  id: string;
  span?: "sm" | "md" | "lg";
  href?: string;
  kicker?: string;
  title: string;
  body?: string;
  media?: { src: string; alt?: string; position?: string };
  /** Renders a Book CTA tile instead of a room link. */
  book?: boolean;
};

/**
 * Editorial bento (M4) — an asymmetric scan-and-go grid, not a SaaS feature
 * wall. Static by design: it is the *quiet* counterpart to the sticky-stack
 * theater above it, so the page never reads as two theaters back to back.
 * Server component; the Book tile composes the client BookMeButton.
 */
export function BentoGrid({ cells }: { cells: BentoCell[] }) {
  return (
    <div className="motion-bento">
      {cells.map((cell) =>
        cell.book ? (
          <div key={cell.id} className={`motion-bento__cell is-book span-${cell.span ?? "sm"}`}>
            <div className="motion-bento__tx">
              {cell.kicker && <span className="motion-bento__k">{cell.kicker}</span>}
              <h3 className="motion-bento__h">{cell.title}</h3>
              {cell.body && <p className="motion-bento__p">{cell.body}</p>}
              <BookMeButton className="btn" style={{ marginTop: 18 }}>
                Book a session ›
              </BookMeButton>
            </div>
          </div>
        ) : (
          <Link
            key={cell.id}
            href={cell.href ?? "#"}
            className={`motion-bento__cell span-${cell.span ?? "sm"}${cell.media ? " has-media" : ""}`}
          >
            {cell.media && (
              <div className="motion-bento__media">
                <img
                  src={cell.media.src}
                  alt=""
                  loading="lazy"
                  style={cell.media.position ? { objectPosition: cell.media.position } : undefined}
                />
              </div>
            )}
            <div className="motion-bento__tx">
              {cell.kicker && <span className="motion-bento__k">{cell.kicker}</span>}
              <h3 className="motion-bento__h">{cell.title}</h3>
              {cell.body && <p className="motion-bento__p">{cell.body}</p>}
              <span className="motion-bento__go">Enter ›</span>
            </div>
          </Link>
        )
      )}
    </div>
  );
}
