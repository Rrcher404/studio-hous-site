import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "The Direction Market — Creative Direction You Can Build On | SolHous",
  description:
    "The Direction Market is the SolHous marketplace for complete creative direction packages — mood boards, shot lists, lighting diagrams, color grades, and styling guides. Opening soon.",
  alternates: { canonical: "https://solhous.com/direction-market/" },
  openGraph: {
    title: "The Direction Market — SolHous",
    description:
      "Presets sell you a look. Direction hands you the whole decision — the board, the list, the light, the grade.",
    type: "website",
    url: "https://solhous.com/direction-market/",
    images: [{ url: "https://solhous.com/media/studio/studio-06.jpg" }],
  },
  twitter: { card: "summary_large_image" },
};

export default function DirectionMarketPage() {
  return (
    <>
      <PageHero
        tall
        bgImage="/media/studio/studio-06.jpg"
        eyebrow="SolHous · The Direction Market · Opening Soon"
        heading={
          <>
            Direction is the <em>product.</em>
          </>
        }
        sub="Presets sell you a look. Direction hands you the whole decision — the board, the list, the light, the grade."
      />

      <main id="main">
        <section aria-labelledby="what-h">
          <Reveal className="block" id="what">
            <p className="roll">Roll 001 · what this is</p>
            <h2 className="big" id="what-h">
              The thinking behind
              <br />
              the <em>frame.</em>
            </h2>
            <p className="muted">
              Every strong image starts long before the shutter — in the mood board, the shot list, the
              lighting plan, the styling call. The Direction Market puts that thinking on the shelf:
              complete direction packages you can buy, shoot your way, and stand on a working
              director&rsquo;s decisions instead of a blank page.
            </p>
            <div className="princ" style={{ marginTop: 42 }}>
              <div className="p">
                <span className="k">In every package</span>
                <h3>The full brief</h3>
                <p>Mood board, shot list, and lighting diagram — the same documents we build for our own sessions.</p>
              </div>
              <div className="p">
                <span className="k">The finish</span>
                <h3>Grade &amp; styling</h3>
                <p>Color grade and styling guide included, so the look survives from concept through delivery.</p>
              </div>
              <div className="p">
                <span className="k">The point</span>
                <h3>Yours to shoot</h3>
                <p>Direction, not homework. Take the package, put your people in it, and make it your own.</p>
              </div>
            </div>
          </Reveal>
        </section>

        <section aria-labelledby="soon-h">
          <Reveal className="block" id="soon">
            <p className="roll">Roll 002 · the shelves</p>
            <h2 className="big" id="soon-h">
              Being stocked
              <br />
              <em>now.</em>
            </h2>
            <p className="muted">
              The first packages are being built the honest way — shot, proven, and documented before
              they&rsquo;re sold. No mockups on the shelf. When a package goes up, the work behind it goes
              up with it.
            </p>
            <div className="firstwords" style={{ marginTop: 40 }}>
              <p>We&rsquo;d rather open late with real direction than on time with a template.</p>
              <p className="by">— honest by design</p>
            </div>
            <div style={{ marginTop: 36 }}>
              <a
                className="btn"
                href="mailto:studio@solhous.com?subject=Direction%20Market%20—%20tell%20me%20when%20it%20opens"
              >
                Tell me when it opens ›
              </a>
              <p className="note" style={{ fontFamily: "var(--font-jetbrains), monospace", fontSize: 10, letterSpacing: ".04em", color: "var(--olive)", textTransform: "uppercase", marginTop: 18, lineHeight: 1.7 }}>
                If your email app doesn&rsquo;t open: studio@solhous.com, subject &ldquo;Direction Market&rdquo;.
              </p>
            </div>
          </Reveal>
        </section>

        <section aria-labelledby="cx-h">
          <Reveal className="block tight" id="crosslink">
            <p className="roll">Roll 003 · meanwhile</p>
            <h3 className="mid" id="cx-h">
              The direction is coming.
              <br />
              The eye behind it is already public.
            </h3>
            <p className="muted">
              See the standard the packages will be held to — the curated selections on the Anti-Feed and
              the working portfolio.
            </p>
            <div className="crosslink" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link href="/anti-feed/" className="btn ghost">
                The Anti-Feed ›
              </Link>
              <Link href="/work/" className="btn ghost">
                The portfolio ›
              </Link>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer
        line={
          <>
            Anyone can sell a preset.
            <br />
            We&rsquo;re selling the decision.
          </>
        }
        meta={
          <>
            The Direction Market · SolHous · Greensboro, North Carolina
            <br />
            <a href="mailto:studio@solhous.com">studio@solhous.com</a> ·{" "}
            <a href="https://www.instagram.com/thestudio.hous/" target="_blank" rel="noopener">
              @thestudio.hous
            </a>
          </>
        }
        legal="© 2026 SolHous."
      />
    </>
  );
}
