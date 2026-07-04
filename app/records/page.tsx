import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Footer } from "@/components/Footer";
import { LiquidGlass } from "@/components/LiquidGlass";
import { RecordsPlayer } from "@/components/RecordsPlayer";
import { TRACKS } from "@/lib/records";

export const metadata: Metadata = {
  title: "SolHous Records — The Sound of the House | Greensboro, NC",
  description:
    "SolHous Records is the music arm of the house — original tracks and beats, made with the same intention as the photographs. The first pressing is being cut now.",
  alternates: { canonical: "https://solhous.com/records/" },
  openGraph: {
    title: "SolHous Records",
    description: "The house has a sound. Original tracks and beats, pressed with intention.",
    type: "website",
    url: "https://solhous.com/records/",
    images: [{ url: "https://solhous.com/media/studio/studio-05.jpg" }],
  },
  twitter: { card: "summary_large_image" },
};

export default function RecordsPage() {
  const hasTracks = TRACKS.length > 0;

  return (
    <>
      {/* Plain hero — no photograph. The liquid lens is the visual. */}
      <header className="page-hero tall" id="top">
        <div className="sunbloom" />
        <LiquidGlass width={190} height={190} />
        <div className="inner">
          <p className="eyebrow">SolHous Records · The Music Arm · Greensboro NC</p>
          <h1>
            The house has
            <br />a <em>sound.</em>
          </h1>
          <p className="sub">
            Original tracks and beats, made in the same rooms as the photographs — and held to the same
            bar.
          </p>
        </div>
      </header>

      <main id="main">
        <section aria-labelledby="label-h">
          <Reveal className="block" id="label">
            <p className="roll">Roll 001 · the label</p>
            <h2 className="big" id="label-h">
              Pressed, not
              <br />
              <em>posted.</em>
            </h2>
            <p className="muted">
              SolHous Records is where the house&rsquo;s music lives — original compositions and produced
              beats, released here first. No upload schedule, no content calendar. A record goes on the
              shelf when it clears the bar, and it stays there. Same standard as every frame on this
              site.
            </p>
          </Reveal>
        </section>

        <section aria-labelledby="press-h">
          <Reveal className="block" id="pressing">
            <p className="roll">Roll 002 · {hasTracks ? "the shelf" : "the first pressing"}</p>
            {hasTracks ? (
              <>
                <h2 className="big" id="press-h">
                  Now <em>playing.</em>
                </h2>
                <p className="muted">
                  Everything below was made inside the house. Press play, stay a while.
                </p>
                <RecordsPlayer />
              </>
            ) : (
              <>
                <h2 className="big" id="press-h">
                  First pressing,
                  <br />
                  cutting <em>now.</em>
                </h2>
                <p className="muted">
                  The first tracks and beats are being finished the way everything ships from this house
                  — when they clear the bar, not when the calendar says. They&rsquo;ll play right here.
                </p>
                <div className="firstwords" style={{ marginTop: 40 }}>
                  <p>No filler drops. No placeholder loops. When the shelf stocks, it stocks real.</p>
                  <p className="by">— honest by design</p>
                </div>
                <p
                  className="muted"
                  style={{ marginTop: 30, fontSize: 13.5 }}
                >
                  Want to hear it first? Email{" "}
                  <a href="mailto:studio@solhous.com?subject=Records%20—%20first%20pressing">
                    studio@solhous.com
                  </a>{" "}
                  with the subject &ldquo;first pressing&rdquo;.
                </p>
              </>
            )}
          </Reveal>
        </section>

        <section aria-labelledby="cx-h">
          <Reveal className="block tight" id="crosslink">
            <p className="roll">Roll 003 · the other speaker</p>
            <h3 className="mid" id="cx-h">
              Records is what the house sounds like.
              <br />
              HousScapes is what your content sounds like.
            </h3>
            <p className="muted">
              Need a track built around your own work — a brief in, a custom score out? That&rsquo;s the
              room next door.
            </p>
            <div className="crosslink">
              <Link href="/housscapes/" className="btn ghost">
                HousScapes ›
              </Link>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer
        line={
          <>
            Some rooms you look at.
            <br />
            This one you turn up.
          </>
        }
        meta={
          <>
            SolHous Records · SolHous · Greensboro, North Carolina
            <br />
            <a href="mailto:studio@solhous.com">studio@solhous.com</a> ·{" "}
            <a href="https://www.instagram.com/thestudio.hous/" target="_blank" rel="noopener">
              @thestudio.hous
            </a>
          </>
        }
        legal="© 2026 SolHous · SolHous Records."
      />
    </>
  );
}
