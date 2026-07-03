import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "HousScapes — Custom Background Music by SolHous Records",
  description:
    "HousScapes creates original-feeling instrumental tracks shaped around your content, platform, mood, and audience. Not stock music. Not random AI output. By SolHous Records.",
  alternates: { canonical: "https://solhous.com/housscapes/" },
  openGraph: {
    title: "HousScapes — Custom Background Music by SolHous Records",
    description:
      "Send the brief. We shape the sound. Custom background tracks for posts, promos, explainers, and brand moments.",
    type: "website",
    url: "https://solhous.com/housscapes/",
    images: [{ url: "https://solhous.com/media/portfolio/work-1.jpg" }],
  },
};

const soundWorlds = [
  { n: "01", h: "Easy Afrohouse", p: "Warm percussion, relaxed bounce, sunlit groove." },
  { n: "02", h: "Lo-fi focus", p: "Dusty drums, mellow keys, head-nod calm." },
  { n: "03", h: "Warm cinematic", p: "Felt piano, soft strings, brand-film warmth." },
  { n: "04", h: "Luxury minimal", p: "Spacious pulse, deep bass, refined restraint." },
  { n: "05", h: "Jazz lounge", p: "Brushed drums, upright bass, late-afternoon ease." },
  { n: "06", h: "Tech clean", p: "Precise pulse, soft plucks, polished optimism." },
  { n: "07", h: "Wellness calm", p: "Slow breath, warm pads, weightless ease." },
  { n: "08", h: "Food & lifestyle groove", p: "Muted funk, friendly swing, appetizing bounce." },
  { n: "09", h: "Outdoor & adventure", p: "Acoustic layers, open-air motion, big-sky lift." },
  { n: "10", h: "Real estate walkthrough", p: "Welcoming glide, aspirational polish." },
];

export default function HousScapesPage() {
  return (
    <>
      <header className="page-hero tall" id="top">
        <div className="sunbloom" />
        <div className="grad" />
        <div className="inner">
          <p className="eyebrow">SolHous Records · HousScapes</p>
          <h1>
            Custom background music
            <br />
            for brand <em>moments.</em>
          </h1>
          <p className="sub">
            HousScapes creates original-feeling instrumental tracks shaped around your content, platform,
            mood, and audience — posts, promos, explainers, and everything in between.
          </p>
          <svg
            className="wave"
            viewBox="0 0 520 60"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            style={{ marginTop: 34, maxWidth: 520 }}
          >
            <path
              className="soft"
              d="M0 30 Q 13 10, 26 30 T 52 30 T 78 30 T 104 30 T 130 30 T 156 30 T 182 30 T 208 30 T 234 30 T 260 30 T 286 30 T 312 30 T 338 30 T 364 30 T 390 30 T 416 30 T 442 30 T 468 30 T 494 30 T 520 30"
              stroke="var(--sun)"
              strokeWidth={1.5}
              fill="none"
              opacity={0.35}
            />
            <path
              d="M0 30 Q 13 22, 26 30 Q 39 44, 52 30 Q 65 6, 78 30 Q 91 50, 104 30 Q 117 18, 130 30 Q 143 40, 156 30 Q 169 4, 182 30 Q 195 54, 208 30 Q 221 20, 234 30 Q 247 42, 260 30 Q 273 12, 286 30 Q 299 46, 312 30 Q 325 24, 338 30 Q 351 38, 364 30 Q 377 8, 390 30 Q 403 50, 416 30 Q 429 22, 442 30 Q 455 40, 468 30 Q 481 16, 494 30 Q 507 36, 520 30"
              stroke="var(--sun)"
              strokeWidth={1.5}
              fill="none"
              opacity={0.8}
            />
          </svg>
          <p className="eyebrow" style={{ marginTop: 26, marginBottom: 0 }}>
            Not stock music · Not random AI output · Shaped for your content
          </p>
          <div style={{ marginTop: 34, display: "flex", gap: 14, flexWrap: "wrap" }}>
            <a className="btn" href="https://housscapes.vercel.app/" target="_blank" rel="noopener">
              Launch HousScapes ›
            </a>
          </div>
        </div>
      </header>

      <main id="main">
        <section aria-labelledby="hous-h">
          <Reveal className="block" id="the-hous">
            <p className="roll">Roll 001 · part of the Hous</p>
            <h2 className="big" id="hous-h">
              SolHous shapes how brands look.
              <br />
              HousScapes shapes how they <em>sound.</em>
            </h2>
            <p className="muted">
              The eye and the ear, same hands. A brief goes in; a finished, licensed track comes out — built
              to fit one post instead of pulled from a library everyone else is using too. HousScapes is the
              audio arm of the Hous, published under SolHous Records.
            </p>
          </Reveal>
        </section>

        <section aria-labelledby="way-h">
          <Reveal className="block" id="the-way">
            <p className="roll">Roll 002 · the problem, the way</p>
            <h2 className="big" id="way-h">
              Stock music feels generic.
              <br />
              Vocals fight your <em>message.</em>
            </h2>
            <p className="muted">
              Trending sounds don&rsquo;t always fit. Library tracks belong to everyone, which means they
              belong to no one. Your content needs a track built around the post.
            </p>
            <div className="firstwords" style={{ marginTop: 38 }}>
              <p>Send the brief. We shape the sound.</p>
              <p className="by">— the HousScapes way</p>
            </div>
            <p className="muted" style={{ fontStyle: "italic" }}>
              &ldquo;Rhythmic enough to keep the post moving, soft enough to let the message breathe. Smooth
              Afrohouse pocket, no aggressive club pacing, voiceover-friendly middle, soft loopable
              ending.&rdquo;
              <br />
              <span
                style={{
                  fontStyle: "normal",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  color: "var(--olive)",
                }}
              >
                — a real production brief · Easy Afrohouse · info video · 108 BPM
              </span>
            </p>
          </Reveal>
        </section>

        <section aria-labelledby="how-h">
          <Reveal className="block" id="how">
            <p className="roll">Roll 003 · how it works</p>
            <h2 className="big" id="how-h">
              A brief in.
              <br />A <em>Hous Track</em> out.
            </h2>
            <div className="steps">
              <div className="step-r">
                <div className="num" />
                <div>
                  <h3>Choose your package</h3>
                  <p>Pick the format that fits — a single track, a creator pack, a full brand HousScape, or a monthly arrangement.</p>
                </div>
              </div>
              <div className="step-r">
                <div className="num" />
                <div>
                  <h3>Submit your creative brief</h3>
                  <p>Tell us the platform, mood, pacing, and message. Link or upload your video if you have one.</p>
                </div>
              </div>
              <div className="step-r">
                <div className="num" />
                <div>
                  <h3>We produce your Hous Track</h3>
                  <p>Our team shapes, curates, and finishes a custom instrumental built around your content — logged and quality-checked.</p>
                </div>
              </div>
              <div className="step-r">
                <div className="num" />
                <div>
                  <h3>Review, revise, download</h3>
                  <p>Preview your track, request a revision if needed, then download platform-ready files with your usage license.</p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <section aria-labelledby="worlds-h">
          <Reveal className="block" id="sound-worlds">
            <p className="roll">Roll 004 · sound worlds</p>
            <h2 className="big" id="worlds-h">
              Ten directions we shape
              <br />
              most <em>often.</em>
            </h2>
            <div
              className="worlds"
              role="list"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(190px,1fr))",
                gap: 14,
                marginTop: 44,
              }}
            >
              {soundWorlds.map((w) => (
                <div
                  key={w.n}
                  className="world"
                  role="listitem"
                  style={{
                    border: "1px solid rgba(237,239,224,.16)",
                    background: "rgba(237,239,224,.02)",
                    padding: "18px 18px 20px",
                  }}
                >
                  <span
                    className="bpm"
                    style={{
                      display: "block",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 9,
                      letterSpacing: ".14em",
                      textTransform: "uppercase",
                      color: "var(--olive)",
                      marginBottom: 10,
                    }}
                  >
                    {w.n}
                  </span>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 500, marginBottom: 6 }}>
                    {w.h}
                  </h3>
                  <p style={{ fontSize: 12.5, lineHeight: 1.55, color: "var(--body)" }}>{w.p}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <section aria-labelledby="pkg-h">
          <Reveal className="block" id="packages">
            <p className="roll">Roll 005 · packages</p>
            <div className="price-head">
              <span className="start" id="pkg-h">
                Hous Tracks start at $79.
              </span>
            </div>
            <p className="includes">
              Every package includes — voiceover-safe mixing · platform-ready exports · a written usage
              license
            </p>
            <div className="cats">
              <div className="cat">
                <h3>Single Hous Track</h3>
                <p className="season">2–3 business days</p>
                <div className="tier">
                  <div className="n">
                    One custom instrumental
                    <small>for a post, reel, ad, or info video</small>
                  </div>
                  <div className="pr">$79</div>
                </div>
                <div className="tier">
                  <div className="n">
                    15s / 30s / 60s exports
                    <small>MP3 + WAV · voiceover-safe mix</small>
                  </div>
                  <div className="pr">&nbsp;</div>
                </div>
                <div className="tier">
                  <div className="n">Basic license · 1 revision</div>
                  <div className="pr">&nbsp;</div>
                </div>
              </div>
              <div className="cat">
                <h3>
                  Creator Track Pack <span className="pop">Featured</span>
                </h3>
                <p className="season">5–7 business days</p>
                <div className="tier">
                  <div className="n">
                    Three custom Hous Tracks
                    <small>for creators or brands batching content</small>
                  </div>
                  <div className="pr">$249</div>
                </div>
                <div className="tier">
                  <div className="n">
                    Consistent mood direction
                    <small>exports for every track</small>
                  </div>
                  <div className="pr">&nbsp;</div>
                </div>
                <div className="tier">
                  <div className="n">Basic license · 1 revision per track</div>
                  <div className="pr">&nbsp;</div>
                </div>
              </div>
              <div className="cat">
                <h3>Brand HousScape</h3>
                <p className="season">1–2 weeks</p>
                <div className="tier">
                  <div className="n">
                    A brand sound system
                    <small>brand sound profile · 5 Hous Tracks</small>
                  </div>
                  <div className="pr">from $750</div>
                </div>
                <div className="tier">
                  <div className="n">
                    Intro/outro sting · loopables
                    <small>prompt + production archive</small>
                  </div>
                  <div className="pr">&nbsp;</div>
                </div>
                <div className="tier">
                  <div className="n">Commercial license · 2 revision rounds</div>
                  <div className="pr">&nbsp;</div>
                </div>
              </div>
            </div>
            <div className="pro-row">
              <div className="pro">
                <h3>Monthly HousScapes</h3>
                <p>
                  Ongoing background tracks for creators, agencies, and brands posting regularly. Monthly
                  track allowance, priority production, a consistent brand sound palette, and a growing
                  archive.
                </p>
                <p className="meta">From $299/mo · commercial license</p>
              </div>
              <div className="pro">
                <h3>Start a track</h3>
                <p>Pick a format, send the brief, and the first cut comes back in days. Every brief and every track runs through the app.</p>
                <p className="meta">
                  <a
                    href="https://housscapes.vercel.app/pricing"
                    target="_blank"
                    rel="noopener"
                    style={{ color: "var(--sun)", textDecoration: "none" }}
                  >
                    See full pricing ›
                  </a>
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        <section aria-labelledby="qp-h">
          <Reveal className="block" id="quality">
            <p className="roll">Roll 006 · the quality promise</p>
            <h2 className="big" id="qp-h">
              Every Hous Track ships
              <br />
              <em>studio-checked.</em>
            </h2>
            <div className="princ">
              <div className="p">
                <h3>Instrumental-first</h3>
                <p>Built as background — no vocals fighting your message.</p>
              </div>
              <div className="p">
                <h3>Voiceover-safe</h3>
                <p>Mixed to leave room for speech, captions, and narration.</p>
              </div>
              <div className="p">
                <h3>Loopable versions</h3>
                <p>Seamless tails for series content and longer cuts.</p>
              </div>
              <div className="p">
                <h3>Platform-ready exports</h3>
                <p>15s, 30s, and 60s cuts in MP3 and WAV.</p>
              </div>
              <div className="p">
                <h3>Production logging</h3>
                <p>Every track&rsquo;s direction and process is documented.</p>
              </div>
              <div className="p">
                <h3>Human curation</h3>
                <p>A producer selects, edits, and finishes every delivery.</p>
              </div>
            </div>
          </Reveal>
        </section>

        <section aria-labelledby="cta-h">
          <Reveal className="block" id="cta">
            <p className="roll">Roll 007 · press play</p>
            <h2 className="big" id="cta-h">
              Give your next post
              <br />
              its own <em>sound.</em>
            </h2>
            <div style={{ marginTop: 38, display: "flex", gap: 14, flexWrap: "wrap" }}>
              <a className="btn" href="https://housscapes.vercel.app/pricing" target="_blank" rel="noopener">
                Order a Hous Track ›
              </a>
              <a className="btn ghost" href="https://housscapes.vercel.app/" target="_blank" rel="noopener">
                Explore the app ›
              </a>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer
        line="Background music with intention."
        meta={
          <>
            HousScapes · A SolHous Records service · Part of the Hous
            <br />
            <a href="https://housscapes.vercel.app/" target="_blank" rel="noopener">
              housscapes.vercel.app
            </a>{" "}
            ·{" "}
            <a href="https://www.instagram.com/thestudio.hous/" target="_blank" rel="noopener">
              @thestudio.hous
            </a>
          </>
        }
        legal="© 2026 SolHous Records · SolHous."
      />
    </>
  );
}
