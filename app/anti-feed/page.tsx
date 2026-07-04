import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { AntiFeedForm } from "@/components/AntiFeedForm";

export const metadata: Metadata = {
  title: "The Anti-Feed — Curated by a Person, Not an Algorithm | SolHous",
  description:
    "The Anti-Feed is the SolHous editorial showcase. No algorithm, no engagement ranking, no infinite scroll — a person selects the work and writes down why. Submit your work for selection.",
  alternates: { canonical: "https://solhous.com/anti-feed/" },
  openGraph: {
    title: "The Anti-Feed — SolHous",
    description:
      "No algorithm decided you should see this. A person chose it, and signed their name to the choice.",
    type: "website",
    url: "https://solhous.com/anti-feed/",
    images: [{ url: "https://solhous.com/media/portfolio/portraits/portrait-31.jpg" }],
  },
  twitter: { card: "summary_large_image" },
};

/**
 * Selection 001 — drawn from inside the Hous while the first outside
 * submissions arrive. Captions are the curator's note, not the category.
 */
const selection001 = [
  {
    n: "31",
    alt: "Young man with locs and a fur-trim collar studying his reflection in a green-framed shop window.",
    caption: "Chosen because he isn't looking at us",
  },
  {
    n: "25",
    alt: "Warm-toned portrait of a bearded man reclining in a bathtub in a leather jacket, holding lilies.",
    caption: "Chosen because it refuses to explain itself",
  },
  {
    n: "34",
    alt: "Young man with locs running a hand through his hair, head bowed, between green and brick buildings.",
    caption: "Chosen because nobody posed it",
  },
  {
    n: "24",
    alt: "Close crop of a man's chest with silver chains and a carnation, pink lilies and magenta satin in foreground.",
    caption: "Chosen for the softness inside the armor",
  },
  {
    n: "22",
    alt: "Man seen from behind sitting on a wooden park bench amid deep green spring foliage.",
    caption: "Chosen because it holds still",
  },
  {
    n: "37",
    alt: "Woman in a spotted faux fur coat and red heels holding a dalmatian on a leash before a vintage painted mural.",
    caption: "Chosen because she committed to the whole story",
  },
].map((item) => ({
  thumb: `/media/portfolio/portraits/portrait-${item.n}-thumb.jpg`,
  full: `/media/portfolio/portraits/portrait-${item.n}.jpg`,
  alt: item.alt,
  caption: item.caption,
}));

export default function AntiFeedPage() {
  return (
    <>
      <PageHero
        tall
        bgImage="/media/portfolio/portraits/portrait-31.jpg"
        eyebrow="SolHous · The Anti-Feed · Curated by Hand"
        heading={
          <>
            The Anti-<em>Feed.</em>
          </>
        }
        sub="No algorithm decided you should see this. A person chose it, and signed their name to the choice."
        extra={
          <p className="cap">
            <a href="#submit">Selection 002 is open for submissions ↓</a>
          </p>
        }
      />

      <main id="main">
        <section aria-labelledby="premise-h">
          <Reveal className="block" id="premise">
            <p className="roll">Roll 001 · the premise</p>
            <h2 className="big" id="premise-h">
              The feed ranks.
              <br />A curator <em>chooses.</em>
            </h2>
            <p className="muted">
              Every platform you post to runs your work through a machine that optimizes for one thing:
              time on site. Not craft. Not intention. Not the year you spent learning to light a face.
              The Anti-Feed is the opposite instrument — a small, slow selection, chosen by a person and
              published with the reason why.
            </p>
            <div className="firstwords" style={{ marginTop: 40 }}>
              <p>
                Being seen by ten thousand scrollers is exposure. Being chosen by one person with a
                trained eye is recognition. We deal in the second thing.
              </p>
              <p className="by">— the Hous position</p>
            </div>
          </Reveal>
        </section>

        <section aria-labelledby="how-h">
          <Reveal className="block" id="how">
            <p className="roll">Roll 002 · how it works</p>
            <h2 className="big" id="how-h">
              Small, slow, and
              <br />
              <em>signed.</em>
            </h2>
            <div className="princ">
              <div className="p">
                <span className="k">Curated</span>
                <h3>A person selects</h3>
                <p>
                  Every selection is made by a working creative director. No engagement scores, no
                  follower counts, no submission fees. The work is the only credential.
                </p>
              </div>
              <div className="p">
                <span className="k">Annotated</span>
                <h3>The why runs with the work</h3>
                <p>
                  Each selected piece carries the curator&rsquo;s note — what the frame does and what it
                  took to make it. Credit is written out, never buried in a tag.
                </p>
              </div>
              <div className="p">
                <span className="k">Permanent</span>
                <h3>Selections don&rsquo;t expire</h3>
                <p>
                  Nothing scrolls away. Selections are numbered and archived, like issues of a
                  publication — because that&rsquo;s what this is.
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        <section aria-labelledby="sel-h">
          <Reveal className="block" id="selection">
            <p className="roll">Roll 003 · Selection 001</p>
            <h2 className="big" id="sel-h">
              The first
              <br />
              <em>selection.</em>
            </h2>
            <p className="muted">
              Selection 001 is drawn from inside the Hous — Studio Hous frames — while the first outside
              submissions arrive. That&rsquo;s deliberate: before we ask you to trust the curation, you
              should see the standard it holds itself to. Every caption below is the reason the frame was
              chosen, not the category it belongs to.
            </p>
            <div style={{ marginTop: 38 }}>
              <Gallery items={selection001} />
            </div>
            <div className="firstwords" style={{ marginTop: 40 }}>
              <p>Every frame above was chosen by one set of eyes.</p>
              <p className="by">— Selection 001, chosen and annotated by Jene · Studio Hous, SolHous</p>
            </div>
          </Reveal>
        </section>

        <section aria-labelledby="sub-h">
          <Reveal className="block" id="submit">
            <p className="roll">Roll 004 · get selected</p>
            <h2 className="big" id="sub-h">
              Send the frame
              <br />
              you&rsquo;d <em>sign.</em>
            </h2>
            <p className="muted">
              Photographers, creative directors, stylists, designers — if the work is intentional, it
              belongs on the curator&rsquo;s desk. Selection 002 is open for submissions. We&rsquo;re
              not looking for the most-liked image you&rsquo;ve made. We&rsquo;re looking for the one
              you&rsquo;d put your name under.
            </p>
            <AntiFeedForm />
          </Reveal>
        </section>

        <section aria-labelledby="cx-h">
          <Reveal className="block tight" id="crosslink">
            <p className="roll">Roll 005 · where it goes</p>
            <h3 className="mid" id="cx-h">
              The Anti-Feed is where work gets seen.
              <br />
              The Direction Market is where direction gets made.
            </h3>
            <p className="muted">
              Selection is the front porch of the Hous. Behind it: creative direction you can buy and
              build on, and an editorial practice documenting the people doing the work. And every frame
              in Selection 001 was made in a Studio Hous session — that door is open too.
            </p>
            <div className="crosslink" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link href="/direction-market/" className="btn ghost">
                The Direction Market ›
              </Link>
              <Link href="/field-notes/" className="btn ghost">
                Field Notes ›
              </Link>
              <Link href="/sessions/" className="btn ghost">
                Sessions from $135 ›
              </Link>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer
        line={
          <>
            The algorithm shows you what everyone saw.
            <br />
            The Anti-Feed shows you what someone chose.
          </>
        }
        meta={
          <>
            The Anti-Feed · Curated under SolHous · Greensboro, North Carolina
            <br />
            <a href="mailto:studio@solhous.com">studio@solhous.com</a> ·{" "}
            <a href="https://www.instagram.com/thestudio.hous/" target="_blank" rel="noopener">
              @thestudio.hous
            </a>
          </>
        }
        legal="Details you share are used only to consider your submission and are never sold or shared. © 2026 SolHous."
      />
    </>
  );
}
