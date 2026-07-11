import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Footer } from "@/components/Footer";
import { getContent } from "@/lib/content";
import { renderHeadline, clamp } from "@/components/editable";

type Tier = { n: string; small: string; pr: string; pop?: string };
type BuildCard = { name: string; season: string; blurb: string; tiers: Tier[]; note?: string };

export const metadata: Metadata = {
  title: "Hous Sites — Editorial Websites for Small Businesses | SolHous",
  description:
    "Hous Sites builds editorial websites for small businesses and brands. Your business, art-directed. A $500 Blueprint, builds at $2,000 and $3,500, the Hous Panel editing dashboard as a $500 add-on, and 90 days of Hous Care with every build.",
  alternates: { canonical: "https://solhous.com/hous-sites/" },
  openGraph: {
    title: "Hous Sites — SolHous",
    description:
      "Websites built like editorials, not templates. The client controls content; the studio controls taste. Built in Greensboro, sold nationally.",
    type: "website",
    url: "https://solhous.com/hous-sites/",
    images: [{ url: "https://solhous.com/media/studio/studio-07.jpg" }],
  },
  twitter: { card: "summary_large_image" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Hous Sites",
  image: "https://solhous.com/media/studio/studio-07.jpg",
  description:
    "Editorial website studio for small businesses and brands. Websites built like editorials, not templates.",
  email: "studio@solhous.com",
  url: "https://solhous.com/hous-sites/",
  areaServed: "United States",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Greensboro",
    addressRegion: "NC",
    addressCountry: "US",
  },
  parentOrganization: { "@type": "Organization", name: "SolHous", url: "https://solhous.com/" },
  makesOffer: [
    {
      "@type": "Offer",
      name: "Hous Blueprint",
      price: "500",
      priceCurrency: "USD",
      description:
        "Paid discovery sprint: 60-minute call, editorial direction memo, sitemap, and a fixed quote. 100% credited toward the build within 30 days.",
    },
    {
      "@type": "Offer",
      name: "Hous Editorial",
      price: "2000",
      priceCurrency: "USD",
      description:
        "Up to 5 pages, editorial-grade design, contact form and SEO, launch plus 90 days of Hous Care included.",
    },
    {
      "@type": "Offer",
      name: "Hous Flagship",
      price: "3500",
      priceCurrency: "USD",
      description:
        "Up to 10 pages, CMS collections, booking or commerce-lite, art-directed photo treatment with Studio Hous, launch plus 90 days of Hous Care+ included.",
    },
    {
      "@type": "Offer",
      name: "Hous Panel",
      price: "500",
      priceCurrency: "USD",
      description:
        "Add-on to either build: a white-label dashboard for editing words, images, hours, and announcements inside design-protected limits.",
    },
  ],
};

export default async function HousSitesPage() {
  const [position, builds, panel, care] = await Promise.all([
    getContent<{ headline: string; body: string }>("hous-sites.position"),
    getContent<{ cards: BuildCard[]; held: string }>("hous-sites.builds"),
    getContent<{ headline: string; body: string; promise: string; promiseBy: string }>("hous-sites.panel"),
    getContent<{ cards: { h: string; p: string; meta: string }[]; held: string }>("hous-sites.care"),
  ]);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        tall
        bgImage="/media/studio/studio-07.jpg"
        eyebrow="SolHous · Hous Sites · Editorial Web"
        heading={
          <>
            Your business,
            <br />
            <em>art-directed.</em>
          </>
        }
        sub="Hous Sites builds websites the way we build editorials: a direction, a shot list, a locked design. Editorial websites for small businesses and brands, built in Greensboro, sold nationally."
      />

      <main id="main">
        <section aria-labelledby="pos-h">
          <Reveal className="block" id="position">
            <p className="roll">Roll 001 · the position</p>
            <h2 className="big" id="pos-h">
              {renderHeadline(clamp(position.headline, 64))}
            </h2>
            <p className="muted">{clamp(position.body, 300)}</p>
            <div className="princ" style={{ marginTop: 42 }}>
              <div className="p">
                <span className="k">Direction first</span>
                <h3>The site starts on paper</h3>
                <p>
                  Every build opens with a Blueprint: a direction memo and a sitemap before a single
                  pixel is placed. The same discipline we bring to a shoot.
                </p>
              </div>
              <div className="p">
                <span className="k">Design stays locked</span>
                <h3>Taste is protected</h3>
                <p>
                  Add the Hous Panel and edit your own words, images, and hours yourself. Either way,
                  the type, spacing, and layout stay locked, so the site never drifts off-grade.
                </p>
              </div>
              <div className="p">
                <span className="k">Care included</span>
                <h3>Launch is not goodbye</h3>
                <p>
                  Every build ships with 90 days of Hous Care: hosting, backups, monitoring, and a
                  human checking in on the words each quarter.
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        <section aria-labelledby="builds-h">
          <Reveal className="block" id="builds">
            <p className="roll">Roll 002 · the builds</p>
            <div className="price-head">
              <span className="start" id="builds-h">
                Blueprint, Editorial, Flagship.
              </span>
            </div>
            <p className="includes">
              Every build includes · launch · 90 days of care · a fixed quote before work starts
            </p>
            <div className="cats">
              {builds.cards.map((card) => (
                <div className="cat" key={card.name}>
                  <h3>{clamp(card.name, 28)}</h3>
                  <p className="season">{clamp(card.season, 48)}</p>
                  <p className="blurb">{clamp(card.blurb, 160)}</p>
                  {card.tiers.map((tier) => (
                    <div className="tier" key={tier.n}>
                      <div className="n">
                        {clamp(tier.n, 28)}
                        {tier.pop && <span className="pop">{tier.pop}</span>}
                        <small>{clamp(tier.small, 80)}</small>
                      </div>
                      <div className="pr">{clamp(tier.pr, 12)}</div>
                    </div>
                  ))}
                  {card.note && <p className="note">{card.note}</p>}
                </div>
              ))}
            </div>
            <p className="held">{clamp(builds.held, 280)}</p>
          </Reveal>
        </section>

        <section aria-labelledby="panel-h">
          <Reveal className="block" id="panel">
            <p className="roll">Roll 003 · the hous panel</p>
            <h2 className="big" id="panel-h">
              {renderHeadline(clamp(panel.headline, 64))}
            </h2>
            <p className="muted">{clamp(panel.body, 400)}</p>
            <div className="princ two" style={{ marginTop: 42 }}>
              <div className="p">
                <span className="k">Yours to edit</span>
                <h3>The content</h3>
                <p>
                  Words, images, hours, announcements. Change them the night before a holiday weekend
                  without filing a support ticket or paying an hourly rate.
                </p>
              </div>
              <div className="p">
                <span className="k">Ours to hold</span>
                <h3>The design</h3>
                <p>
                  Type, spacing, color, layout. Locked so the site reads as well in month nine as it
                  did on launch day.
                </p>
              </div>
            </div>
            <div className="firstwords" style={{ marginTop: 42 }}>
              <p>{clamp(panel.promise, 80)}</p>
              <p className="by">— {clamp(panel.promiseBy, 48)}</p>
            </div>
          </Reveal>
        </section>

        <section aria-labelledby="proc-h">
          <Reveal className="block" id="process">
            <p className="roll">Roll 004 · the process</p>
            <h2 className="big" id="proc-h">
              Five steps.
              <br />
              No <em>mystery.</em>
            </h2>
            <div className="steps">
              <div className="step-r">
                <div className="num" />
                <div>
                  <h3>Blueprint</h3>
                  <p>
                    A 60-minute discovery call, then an editorial direction memo and a sitemap. You
                    leave with a fixed quote, whether or not we go further.
                  </p>
                </div>
              </div>
              <div className="step-r">
                <div className="num" />
                <div>
                  <h3>Design</h3>
                  <p>
                    Editorial direction applied to your pages: type, palette, imagery, voice. Two
                    revision rounds, so the design is argued about before it is built.
                  </p>
                </div>
              </div>
              <div className="step-r">
                <div className="num" />
                <div>
                  <h3>Build</h3>
                  <p>The site and your Hous Panel, built and wired together.</p>
                </div>
              </div>
              <div className="step-r">
                <div className="num" />
                <div>
                  <h3>Launch</h3>
                  <p>Go-live, plus 90 days of care included with every build.</p>
                </div>
              </div>
              <div className="step-r">
                <div className="num" />
                <div>
                  <h3>Care</h3>
                  <p>The site stays alive: edited, backed up, watched.</p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <section aria-labelledby="care-h">
          <Reveal className="block tight" id="care">
            <p className="roll">Roll 005 · the care</p>
            <h2 className="big" id="care-h">
              Launch is the start,
              <br />
              not the <em>finish.</em>
            </h2>
            <p className="muted">
              Websites die of neglect, not bad design. Every build includes 90 days of care, and it
              continues month to month after that.
            </p>
            <div className="pro-row" style={{ marginTop: 34 }}>
              {care.cards.map((card) => (
                <div className="pro" key={card.h}>
                  <h3>{clamp(card.h, 28)}</h3>
                  <p>{clamp(card.p, 240)}</p>
                  <p className="meta">{clamp(card.meta, 64)}</p>
                </div>
              ))}
            </div>
            <p className="held">{clamp(care.held, 280)}</p>
          </Reveal>
        </section>

        <section aria-labelledby="demos-h">
          <Reveal className="block" id="demos">
            <p className="roll">Roll 006 · the demonstrations</p>
            <h2 className="big" id="demos-h">
              Two businesses.
              <br />
              Both <em>fictional.</em>
            </h2>
            <p className="muted">
              Verbena is a hair studio. KEPT is a small-batch goods shop. Neither exists, and both are
              built to the standard your business would get. Open either one and press the pencil in
              the corner: the outlined regions are what the Hous Panel hands you. Everything else
              stays ours to hold.
            </p>
            <div style={{ marginTop: 34, display: "flex", gap: 14, flexWrap: "wrap" }}>
              <a className="btn ghost" href="/demos/verbena.html" target="_blank" rel="noopener">
                Verbena Hair Studio ›
              </a>
              <a className="btn ghost" href="/demos/kept.html" target="_blank" rel="noopener">
                KEPT Goods Co. ›
              </a>
            </div>
          </Reveal>
        </section>

        <section aria-labelledby="start-h">
          <Reveal className="block" id="start">
            <p className="roll">Roll 007 · the first move</p>
            <h2 className="big" id="start-h">
              Start with the
              <br />
              <em>Blueprint.</em>
            </h2>
            <p className="muted">
              One call, one memo, one sitemap, one fixed quote. $500, and it comes off the build when
              you go ahead within 30 days. The worst case is a plan you own.
            </p>
            <div style={{ marginTop: 34, display: "flex", gap: 14, flexWrap: "wrap" }}>
              <a className="btn" href="mailto:studio@solhous.com?subject=Hous%20Sites%20Blueprint">
                Start with the Blueprint ›
              </a>
              <Link className="btn ghost" href="/work/">
                The eye behind it ›
              </Link>
              <Link className="btn ghost" href="/spaces/">
                Photography for your space ›
              </Link>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer
        line={
          <>
            Templates rent a look.
            <br />
            Direction owns one.
          </>
        }
        meta={
          <>
            Hous Sites · SolHous · Greensboro, North Carolina
            <br />
            <a href="mailto:studio@solhous.com">studio@solhous.com</a> ·{" "}
            <a href="https://www.instagram.com/thestudio.hous/" target="_blank" rel="noopener">
              @thestudio.hous
            </a>
          </>
        }
        legal="Built in Greensboro, sold nationally. © 2026 SolHous."
      />
    </>
  );
}
