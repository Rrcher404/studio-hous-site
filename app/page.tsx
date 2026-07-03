import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Gallery } from "@/components/Gallery";
import { Footer } from "@/components/Footer";
import { HeroVeil } from "@/components/HeroVeil";
import { BookMeButton } from "@/components/BookingModal";

export const metadata: Metadata = {
  title: "Studio Hous — Editorial Portrait Photography | Greensboro, NC",
  description:
    "Studio Hous is an editorial portrait photography studio in Greensboro, North Carolina. Portraits, graduation, prom, personal branding, real estate, and commercial — every frame intentional. Part of the SolHous creative universe.",
  alternates: { canonical: "https://solhous.com/" },
  openGraph: {
    title: "Studio Hous — Editorial Photography, Greensboro NC",
    description: "We don't shoot volume. We shoot with purpose. Every image earns its place.",
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

const universeCards = [
  {
    href: "/spaces/",
    img: "/media/studio/studio-02.jpg",
    alt: "Wide interior of the studio: cyc backdrop, softbox, and a gallery print wall.",
    k: "SolHous Spaces",
    h: "Property & brand",
    p: "The room and the people in it, shot with the same eye. Listings, storefronts, and headshots across the Triad.",
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
    href: "/housscapes/",
    img: "/media/studio/studio-05.jpg",
    alt: "Crew in SolHous Productions gear rigging a stage light at festival sunset.",
    k: "HousScapes",
    h: "Custom sound",
    p: "Send the brief, get a track built around the post — not pulled from a library. Custom sound by SolHous Records.",
  },
  {
    href: "/cosign/",
    img: "/media/studio/studio-01.jpg",
    alt: "A director walking a team through a pinned shot list beside a print wall.",
    k: "Cosign",
    h: "The bridge layer",
    p: "Recognition and production for the organizations already doing the work. Reciprocity, never extraction.",
  },
  {
    href: "/sessions/",
    img: "/media/portfolio/portraits/portrait-38.jpg",
    alt: "Three friends at a warm-lit hallway threshold, one in a black tuxedo flanked by two women in forest green and ivory, dressed for a formal night out.",
    k: "Book",
    h: "Sessions & pricing",
    p: "Portraits, grad, prom, and commercial, from $135. Direction, editing, and a curated gallery on every one.",
  },
  {
    href: "/work/",
    img: "/media/portfolio/portraits/portrait-39.jpg",
    alt: "Two best friends in matching mustard bomber jackets sharing tea at a chrome diner table against a crushed forest-green velvet backdrop.",
    k: "Work",
    h: "The portfolio",
    p: "The frames that earned their place. A working sample of recent editorial sessions.",
  },
];

const jsonLd = {
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
  url: "https://solhous.com/",
  sameAs: ["https://www.instagram.com/thestudio.hous/"],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="hero" id="top">
        <HeroVeil />
        <div className="sunbloom" />
        <div className="hero-grad" />
        <div className="hero-content">
          <p className="eyebrow">Studio Hous · Editorial Photography · Greensboro NC</p>
          <h1>
            Not the pose.
            <br />
            The <em>person.</em>
          </h1>
          <p className="sub">
            Editorial portraits, made with intention. Graduation, prom, personal branding, real estate, and
            commercial.
          </p>
        </div>
        <div className="scrollcue" aria-hidden="true">
          scroll ↓
        </div>
      </header>

      <main id="main">
        <section aria-labelledby="work-h">
          <Reveal className="block" id="work">
            <p className="roll">Roll 001 · the work</p>
            <h2 className="big" id="work-h">
              Every image earns
              <br />
              its <em>place.</em>
            </h2>
            <p className="muted">
              Editorial direction, premium editing, and a curated gallery — the same eye on every session,
              whether it&rsquo;s a graduation portrait or a brand shoot. A few recent frames below.
            </p>
            <div style={{ marginTop: 38 }}>
              <Gallery items={workTeaser} />
            </div>
            <div style={{ marginTop: 34 }}>
              <Link className="btn ghost" href="/work/">
                See the full portfolio ›
              </Link>
            </div>
          </Reveal>
        </section>

        <section aria-labelledby="appr-h">
          <Reveal className="block" id="approach">
            <p className="roll">Roll 002 · the approach</p>
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
            <div style={{ marginTop: 42 }}>
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
                  src="/media/studio/studio-06.jpg"
                  alt="A flat-lay of a Greensboro shoot plan: mood board, lighting diagram, shot list, and a Polaroid."
                  loading="lazy"
                />
              </div>
            </div>
          </Reveal>
        </section>

        <section aria-labelledby="uni-h">
          <Reveal className="block" id="universe">
            <p className="roll">Roll 004 · the Hous</p>
            <h2 className="big" id="uni-h">
              One studio.
              <br />A wider <em>practice.</em>
            </h2>
            <p className="muted">
              Studio Hous is the front door. Behind it is SolHous — not a platform, a building with rooms.
              Space to shoot in, sound to score with, recognition for the ones already doing the work, and a
              written record of the work as it happens. Six ways into one practice.
            </p>
            <div className="uni">
              {universeCards.map((card) => (
                <Link key={card.href} href={card.href}>
                  <div className="im">
                    <img src={card.img} alt={card.alt} loading="lazy" />
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
            Your moment deserves more than a snapshot.
            <br />
            It deserves Studio Hous.
          </>
        }
        meta={
          <>
            Studio Hous · Editorial Photography · Greensboro, North Carolina
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
