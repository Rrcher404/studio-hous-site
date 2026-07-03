import type { ReactNode } from "react";

export function PageHero({
  tall,
  bgImage,
  eyebrow,
  heading,
  sub,
  extra,
}: {
  tall?: boolean;
  bgImage: string;
  eyebrow: ReactNode;
  heading: ReactNode;
  sub?: ReactNode;
  /** Extra content rendered after `.sub` inside `.inner` (e.g. the /spaces `.cap` line). */
  extra?: ReactNode;
}) {
  return (
    <header className={`page-hero${tall ? " tall" : ""}`} id="top">
      <div className="bgimg">
        <img src={bgImage} alt="" fetchPriority="high" />
      </div>
      <div className="sunbloom" />
      <div className="grad" />
      <div className="inner">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{heading}</h1>
        {sub && <p className="sub">{sub}</p>}
        {extra}
      </div>
    </header>
  );
}
