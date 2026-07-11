import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Gallery } from "@/components/Gallery";
import { Footer } from "@/components/Footer";
import { BookMeButton } from "@/components/BookingModal";
import { LookbookBand } from "@/components/motion";
import Link from "next/link";
import { getContent } from "@/lib/content";
import { renderHeadline, clamp } from "@/components/editable";

export const metadata: Metadata = {
  title: "Work — Editorial Portrait Photography | Studio Hous, Greensboro NC",
  description:
    "Selected work from Studio Hous — editorial portraits, personal branding, graduation, and street sessions across Greensboro. Every image earns its place.",
  alternates: { canonical: "https://solhous.com/work/" },
  openGraph: {
    title: "Work — Studio Hous",
    description: "Every image earns its place. Selected editorial work from Studio Hous, Greensboro NC.",
    type: "website",
    url: "https://solhous.com/work/",
    images: [{ url: "https://solhous.com/media/portfolio/portraits/portrait-36.jpg" }],
  },
  twitter: { card: "summary_large_image" },
};

const gallery = [
  { n: "36", alt: "Black-and-white night scene of a woman in a dalmatian-print faux fur coat walking two dalmatians down a city sidewalk.", caption: "Editorial · The city walks with her" },
  { n: "14", alt: "Mother in a white beaded dress adjusting her son's hair as he stands in a black tuxedo and sunglasses.", caption: "Graduation · Final touches before the night" },
  { n: "25", alt: "Warm-toned portrait of a bearded man reclining in a bathtub in a leather jacket, holding lilies.", caption: "Editorial · Sunday, undone" },
  { n: "05", alt: "Woman in a white swim set and cat-eye sunglasses standing on a boat rail against palms and turquoise water.", caption: "Portrait · Unbothered, dockside" },
  { n: "29", alt: "Young man in a fur-collared graphic sweatshirt and camo shorts looking down at painted hexagons on a downtown street.", caption: "Street · Downtown is the runway" },
  { n: "16", alt: "Black-and-white portrait of a smiling mother wrapped in her tuxedoed son's arm.", caption: "Portrait · Her whole heart, in a tux" },
  { n: "01", alt: "Woman in a spotted faux fur coat, black mini dress and red heels standing square to camera on a night sidewalk.", caption: "Editorial · Streetlight couture" },
  { n: "31", alt: "Young man with locs and a fur-trim collar studying his reflection in a green-framed shop window.", caption: "Street · Meeting himself in the glass" },
  { n: "09", alt: "Woman in a blue two-piece and wide sun hat perched on a yacht bow with legs crossed, marina behind.", caption: "Portrait · Poise at sea" },
  { n: "22", alt: "Man seen from behind sitting on a wooden park bench amid deep green spring foliage.", caption: "Personal · The quiet frame" },
  { n: "24", alt: "Close crop of a man's chest with silver chains and a carnation, pink lilies and magenta satin in foreground.", caption: "Editorial · Soft armor" },
  { n: "11", alt: "Three women in swimwear laughing together on a boat bow, one wearing a bridal veil.", caption: "Portrait · The bride and her crew" },
  { n: "33", alt: "Low-angle portrait of a young man seated on a concrete ledge, sneaker sole filling the foreground.", caption: "Street · Sole first, world second" },
  { n: "23", alt: "Man with glasses and beard looking over his shoulder in a white jacket on a wooded path.", caption: "Personal Brand · Wearing the statement" },
  { n: "18", alt: "Son in a black tuxedo flanked by two women in a bright hallway before prom.", caption: "Graduation · The whole hous showed up" },
  { n: "27", alt: "Young man in a fur-trimmed vest checking his phone at a purple café table outside a brick storefront.", caption: "Street · Between takes" },
  { n: "30", alt: "Fur backpack held against camo shorts and chunky sneakers in front of a red brick wall.", caption: "Street · Texture study, brick and fur" },
  { n: "03", alt: "Bearded man in a red fleece leaning against a tree in a park, smiling with a chain necklace.", caption: "Portrait · Easy like golden hour" },
  { n: "34", alt: "Young man with locs running a hand through his hair, head bowed, between green and brick buildings.", caption: "Street · A moment he didn't pose" },
  { n: "07", alt: "Woman in a blue marbled one-piece leaning on a boat railing, eyes lowered, ferry behind.", caption: "Portrait · Caught mid-thought" },
  { n: "37", alt: "Woman in a spotted faux fur coat and red heels holding a dalmatian on a leash before a vintage painted mural.", caption: "Editorial · Every story needs a finale" },
].map((item) => ({
  thumb: `/media/portfolio/portraits/portrait-${item.n}-thumb.jpg`,
  full: `/media/portfolio/portraits/portrait-${item.n}.jpg`,
  alt: item.alt,
  caption: item.caption,
}));

/** A curated cinematic subset for the horizontal lookbook, reusing gallery data
 *  (full-res frames) so captions/alt stay in one place. */
const LOOKBOOK_NS = ["36", "01", "25", "24", "05", "09", "31", "37"];
const lookbook = LOOKBOOK_NS.map((n) => gallery.find((g) => g.full.endsWith(`portrait-${n}.jpg`)))
  .filter((g): g is (typeof gallery)[number] => Boolean(g))
  .map((g) => ({ src: g.full, alt: g.alt, caption: g.caption }));

export default async function WorkPage() {
  const hero = await getContent<{ eyebrow: string; headline: string; sub: string }>("work.hero");
  return (
    <>
      <PageHero
        bgImage="/media/portfolio/portraits/portrait-36.jpg"
        eyebrow={clamp(hero.eyebrow, 48)}
        heading={renderHeadline(clamp(hero.headline, 60))}
        sub={clamp(hero.sub, 200)}
      />

      <main id="main">
        <section aria-labelledby="look-h">
          <div className="block" id="lookbook">
            <p className="roll rv">Roll 001 · the lookbook</p>
            <h2 className="big rv" id="look-h" style={{ marginBottom: 8 }}>
              A walk through
              <br />
              the <em>work.</em>
            </h2>
            <p className="muted rv" style={{ marginBottom: 4 }}>
              A curated pass through recent editorial frames — scroll sideways, take your time.
              The full archive is below.
            </p>
            <LookbookBand items={lookbook} label="Selected editorial frames" skipToId="after-lookbook" />
          </div>
        </section>
        <span id="after-lookbook" data-motion-anchor tabIndex={-1} />

        <section aria-labelledby="gal-h">
          <div className="block" id="gallery">
            <p className="roll rv">Roll 002 · the gallery</p>
            <h2 className="big rv" id="gal-h" style={{ marginBottom: 8 }}>
              Not the pose.
              <br />
              The <em>person.</em>
            </h2>
            <p className="muted rv" style={{ marginBottom: 44 }}>
              Tap any frame to open it. Editorial, personal branding, graduation, and street sessions — a
              working sample of recent Studio Hous galleries.
            </p>
            <Gallery items={gallery} />
          </div>
        </section>

        <section aria-labelledby="appr-h">
          <Reveal className="block" id="approach">
            <p className="roll">Roll 003 · the approach</p>
            <h2 className="big" id="appr-h">
              We don&rsquo;t shoot volume.
              <br />
              We shoot with <em>purpose.</em>
            </h2>
            <p className="muted">
              Studio Hous is an editorial portrait studio in Greensboro, North Carolina, making clean,
              intentional imagery that feels polished and grounded. No rushed, generic work. Every frame is
              intentional.
            </p>
            <div className="princ">
              <div className="p">
                <h3>Grounded craft</h3>
                <p>Editorial-level direction on every session, whether it&rsquo;s a graduation portrait or a listing shoot.</p>
              </div>
              <div className="p">
                <h3>Clear communication</h3>
                <p>From inquiry to gallery delivery, you&rsquo;ll know exactly what to expect, when, and what it costs. No surprises.</p>
              </div>
              <div className="p">
                <h3>Intentional results</h3>
                <p>We don&rsquo;t shoot volume. Every image in your gallery is there because it earned its place.</p>
              </div>
            </div>
          </Reveal>
        </section>

        <section aria-labelledby="cta-h">
          <Reveal className="block" id="cta">
            <p className="roll">Roll 004 · your turn</p>
            <h2 className="big" id="cta-h">
              Your moment deserves
              <br />
              more than a <em>snapshot.</em>
            </h2>
            <p className="muted">See something here that feels like you? Sessions start at $135. Let&rsquo;s hold a date.</p>
            <div style={{ marginTop: 34, display: "flex", gap: 14, flexWrap: "wrap" }}>
              <BookMeButton className="btn">Book a session ›</BookMeButton>
              <Link className="btn ghost" href="/sessions/">
                See sessions &amp; pricing ›
              </Link>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer
        line={
          <>
            Your moment deserves more than a snapshot.
            <br />
            It deserves Studio Hous.
          </>
        }
      />
    </>
  );
}
