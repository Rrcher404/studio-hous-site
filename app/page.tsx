import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Gallery } from "@/components/Gallery";
import { Footer } from "@/components/Footer";
import { HeroVeil } from "@/components/HeroVeil";
import { BookMeButton } from "@/components/BookingModal";
import { getContent } from "@/lib/content";
import { renderHeadline, clamp } from "@/components/editable";

export const metadata: Metadata = {
  title: "SolHous — Editorial Photography & Creative House | Greensboro, NC",
  description:
    "SolHous is a creative house in Greensboro, North Carolina, built around Studio Hous editorial portrait photography — plus the Direction Market, Field Notes, Spaces, Hous Sites, and HousScapes. Sessions from $135.",
  alternates: { canonical: "https://solhous.com/" },
  openGraph: {
    title: "SolHous — A Creative House, Greensboro NC",
    description:
      "Not a platform. A building with rooms — photography, curation, direction, sound, spaces, and a written record of the work.",
    type: "website",
    url: "https://solhous.com/",
    images: [
      {
        url: "https://solhous.com/media/portfolio/portraits/portrait-36.jpg",
        alt: "Editorial night portrait by Studio Hous, downtown Greensboro.",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
};

const workTeaser = [
  {
    thumb: "/media/portfolio/portraits/portrait-36-thumb.jpg",
    full: "/media/portfolio/portraits/portrait-36.jpg",
    alt: "Black-and-white night scene of a woman in a dalmatian-print faux fur coat walking two dalmatians.",
    caption: "Editorial",
  },
  {
    thumb: "/media/portfolio/portraits/portrait-anthony-northface-thumb.jpg",
    full: "/media/portfolio/portraits/portrait-anthony-northface.jpg",
    alt: "Smiling bearded man in a red-and-black North Face fleece leaning against a tree in a park at dusk.",
    caption: "Portrait",
  },
  {
    thumb: "/media/portfolio/portraits/portrait-16-thumb.jpg",
    full: "/media/portfolio/portraits/portrait-16.jpg",
    alt: "Black-and-white portrait of a smiling mother wrapped in her tuxedoed son's arm.",
    caption: "Portrait",
  },
  {
    thumb: "/media/portfolio/portraits/portrait-29-thumb.jpg",
    full: "/media/portfolio/portraits/portrait-29.jpg",
    alt: "Young man in a fur-collared graphic sweatshirt looking down at painted hexagons on a downtown street.",
    caption: "Street",
  },
  {
    thumb: "/media/portfolio/portraits/portrait-05-thumb.jpg",
    full: "/media/portfolio/portraits/portrait-05.jpg",
    alt: "Woman in a white swim set and cat-eye sunglasses standing on a boat rail against turquoise water.",
    caption: "Portrait",
  },
  {
    thumb: "/media/portfolio/portraits/portrait-09-thumb.jpg",
    full: "/media/portfolio/portraits/portrait-09.jpg",
    alt: "Woman in a blue two-piece and wide sun hat perched on a yacht bow, marina behind.",
    caption: "Portrait",
  },
];

const rooms: {
  href: string;
  img: string;
  alt: string;
  k: string;
  h: string;
  p: string;
  imgPos?: string;
}[] = [
  {
    href: "/sessions/",
    img: "/media/portfolio/portraits/portrait-38.jpg",
    imgPos: "center 20%",
    alt: "Three friends at a warm-lit hallway threshold, one in a black tuxedo flanked by two women in forest green and ivory, dressed for a formal night out.",
    k: "Studio Hous",
    h: "Sessions & pricing",
    p: "The editorial photography studio the Hous was built around. Portraits, grad, prom, and commercial, from $135.",
  },
  {
    href: "/work/",
    img: "/media/portfolio/portraits/portrait-39.jpg",
    imgPos: "center 20%",
    alt: "Two best friends in matching mustard bomber jackets sharing tea at a chrome diner table against a crushed forest-green velvet backdrop.",
    k: "Studio Hous",
    h: "The portfolio",
    p: "The frames that earned their place. A working sample of recent editorial sessions.",
  },
  {
    href: "/direction-market/",
    img: "/media/studio/studio-06.jpg",
    alt: "A flat-lay of a Greensboro shoot plan: mood board, lighting diagram, shot list, and a Polaroid.",
    k: "The Direction Market",
    h: "Direction you can build on",
    p: "Complete creative direction packages — mood board, shot list, lighting, grade, styling. Three proven packages, open now from $29.",
  },
  {
    href: "/field-notes/",
    img: "/media/studio/studio-04.jpg",
    alt: "An editor at a desk holding a contact sheet beside a culling monitor and framed poster.",
    k: "Field Notes",
    h: "The editorial practice",
    p: "A real day in a working creative's life, documented twice a month. Real people, real days, real work.",
  },
  {
    href: "/spaces/",
    img: "/media/studio/studio-02.jpg",
    alt: "Wide interior of the studio: cyc backdrop, softbox, and a gallery print wall.",
    k: "SolHous Spaces",
    h: "Property & brand",
    p: "The room and the people in it, shot with the same eye. Listings, storefronts, and headshots across the Triad.",
  },
  {
    href: "/hous-sites/",
    img: "/media/studio/studio-07.jpg",
    alt: "A flat-lay of an editorial shoot plan in afternoon light: mood board, lighting diagram, shot list, Polaroid, and fabric swatches.",
    k: "Hous Sites",
    h: "Your business, art-directed",
    p: "Editorial websites for small businesses and brands, built like editorials, not templates. Blueprint $500, builds from $2,000.",
  },
  {
    href: "/records/",
    img: "/media/records/echoes-of-tomorrow.jpg",
    alt: "Echoes of Tomorrow EP cover art: a stairway rising toward a low sun over water.",
    k: "SolHous Records",
    h: "The sound of the Hous",
    p: "Echoes of Tomorrow — the debut EP — is out now. Play it here, or anywhere you stream.",
  },
  {
    href: "/housscapes/",
    img: "/media/studio/studio-05.jpg",
    alt: "A sound crew adjusting a stage light against sunset.",
    k: "HousScapes",
    h: "Custom sound",
    p: "Send the brief, get a track built around your content — not pulled from a library. Custom sound by SolHous Records.",
  },
];

/** The founding room keeps its service schema so the homepage's equity still ranks for photography intent. */
const jsonLdStudio = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Studio Hous",
  image: "https://solhous.com/media/portfolio/portraits/portrait-36.jpg",
  description: "Editorial portrait photography studio in Greensboro, North Carolina.",
  email: "studio@solhous.com",
  priceRange: "$$",
  areaServed: "Guilford County, NC",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Greensboro",
    addressRegion: "NC",
    addressCountry: "US",
  },
  url: "https://solhous.com/sessions/",
  parentOrganization: { "@type": "Organization", name: "SolHous", url: "https://solhous.com/" },
  sameAs: ["https://www.instagram.com/thestudio.hous/"],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SolHous",
  url: "https://solhous.com/",
  email: "studio@solhous.com",
  description:
    "SolHous is a creative house in Greensboro, North Carolina — editorial photography, human curation, creative direction, sound, and spaces.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Greensboro",
    addressRegion: "NC",
    addressCountry: "US",
  },
  sameAs: ["https://www.instagram.com/thestudio.hous/"],
  brand: [
    { "@type": "Brand", name: "Studio Hous" },
    { "@type": "Brand", name: "The Direction Market" },
    { "@type": "Brand", name: "SolHous Spaces" },
    { "@type": "Brand", name: "Hous Sites" },
    { "@type": "Brand", name: "HousScapes" },
  ],
};

export default async function HomePage() {
  const hero = await getContent<{ headline: string; sub: string }>("home.hero");
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdStudio) }}
      />

      <header className="hero" id="top">
        <HeroVeil />
        <div className="sunbloom" />
        <div className="hero-grad" />
        <div className="hero-content">
          <p className="eyebrow">SolHous · A Creative Hous · Greensboro NC</p>
          <h1>{renderHeadline(clamp(hero.headline, 60))}</h1>
          <p className="sub">{clamp(hero.sub, 200)}</p>
          <div style={{ marginTop: 30, display: "flex", gap: 14, flexWrap: "wrap" }}>
            <BookMeButton className="btn">Book a session ›</BookMeButton>
            <Link className="btn ghost" href="/sessions/">
              Sessions from $135 ›
            </Link>
          </div>
        </div>
        <div className="scrollcue" aria-hidden="true">
          scroll ↓
        </div>
      </header>

      <main id="main">
        <section aria-labelledby="rooms-h">
          <Reveal className="block" id="rooms">
            <p className="roll">Roll 001 · the rooms</p>
            <h2 className="big" id="rooms-h">
              One Hous.
              <br />
              Every door <em>open.</em>
            </h2>
            <p className="muted">
              SolHous started as a photography studio and grew the way a Hous does — a room at a time,
              each one built because the work asked for it. Studio Hous is the founding room. Every door
              is below. Walk in anywhere.
            </p>
            <div className="uni">
              {rooms.map((card) => (
                <Link key={card.href} href={card.href}>
                  <div className="im">
                    {/* Decorative inside a text-labeled card link — empty alt keeps the link name short for screen readers. */}
                    <img
                      src={card.img}
                      alt=""
                      loading="lazy"
                      style={card.imgPos ? { objectPosition: card.imgPos } : undefined}
                    />
                  </div>
                  <div className="tx">
                    <span className="k">{card.k}</span>
                    <h3>{card.h}</h3>
                    <p>{card.p}</p>
                    <span className="go">Enter ›</span>
                  </div>
                </Link>
              ))}
            </div>
          </Reveal>
        </section>

        <section aria-labelledby="work-h">
          <Reveal className="block" id="work">
            <p className="roll">Roll 002 · the founding room</p>
            <h2 className="big" id="work-h">
              Where the standard
              <br />
              was <em>set.</em>
            </h2>
            <p className="muted">
              Studio Hous is the founding room — where the Hous&rsquo;s standard for direction,
              editing, and delivery was set, whether the session is a graduation portrait or a brand
              shoot. A few recent frames below.
            </p>
            <div style={{ marginTop: 38 }}>
              <Gallery items={workTeaser} />
            </div>
            <div style={{ marginTop: 34, display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link className="btn ghost" href="/work/">
                See the full portfolio ›
              </Link>
              <BookMeButton className="btn">Book a session ›</BookMeButton>
            </div>
          </Reveal>
        </section>

        <section aria-labelledby="sess-h">
          <Reveal className="block" id="sessions-teaser">
            <div className="split">
              <div>
                <p className="roll">Roll 003 · sessions</p>
                <h2 className="big" id="sess-h">
                  Sessions start
                  <br />
                  at <em>$135.</em>
                </h2>
                <p className="muted">
                  Portraits, graduation, prom, real estate, and commercial. Every session includes
                  professional creative direction, premium editing, and a curated digital gallery.
                </p>
                <div style={{ marginTop: 32, display: "flex", gap: 14, flexWrap: "wrap" }}>
                  <Link className="btn" href="/sessions/">
                    See sessions &amp; pricing ›
                  </Link>
                </div>
              </div>
              <div className="img">
                <img
                  src="/media/portfolio/portraits/portrait-38.jpg"
                  alt="Three friends at a warm-lit hallway threshold, dressed for a formal night out."
                  loading="lazy"
                  style={{ objectPosition: "center 20%" }}
                />
              </div>
            </div>
          </Reveal>
        </section>

        <section aria-labelledby="creed-h">
          <Reveal className="block" id="creed">
            <p className="roll">Roll 004 · how the Hous works</p>
            <h2 className="big" id="creed-h">
              Three convictions,
              <br />
              every <em>room.</em>
            </h2>
            <p className="muted">Everything in the Hous runs on the same three.</p>
            <div className="princ">
              <div className="p">
                <span className="k">Curation over algorithm</span>
                <h3>A person chooses</h3>
                <p>
                  Nothing here is ranked by a machine. Work gets selected by a trained eye and published
                  with the reason why.
                </p>
              </div>
              <div className="p">
                <span className="k">Direction over content</span>
                <h3>The frame starts on paper</h3>
                <p>
                  Mood boards, shot lists, lighting plans — the decisions behind the frame are worth as
                  much as the frame. We treat them that way.
                </p>
              </div>
              <div className="p">
                <span className="k">Recognition over reach</span>
                <h3>Credit is written out</h3>
                <p>
                  Field Notes documents the people doing the work, twice a month, in their own
                  words. Names attached, always.
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        <section aria-labelledby="fw-h">
          <Reveal className="block" id="firstwords">
            <p className="roll">Roll 005 · first words</p>
            <h2 className="big" id="fw-h" style={{ position: "absolute", left: -9999 }}>
              First words
            </h2>
            <div className="firstwords">
              <p>
                The first galleries are being made right now. When the words come, they&rsquo;ll arrive
                unedited, in the client&rsquo;s own voice — or they won&rsquo;t arrive at all. We&rsquo;d
                rather show you an honest blank than a borrowed quote.
              </p>
              <p className="by">— honest by design</p>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer
        id="about"
        line={
          <>
            One Hous. Many rooms.
            <br />
            Every door open.
          </>
        }
        meta={
          <>
            SolHous · Studio Hous · Greensboro, North Carolina
            <br />
            <a href="mailto:studio@solhous.com">studio@solhous.com</a> ·{" "}
            <a href="https://www.instagram.com/thestudio.hous/" target="_blank" rel="noopener">
              @thestudio.hous
            </a>
            <br />
            <BookMeButton className="btn" style={{ marginTop: 18, fontSize: 18, padding: "11px 26px" }}>
              Book a session ›
            </BookMeButton>
          </>
        }
        legal="Inquiry details you share are used only to respond to your booking and are never sold or shared. © 2026 SolHous · Studio Hous."
      />
    </>
  );
}
