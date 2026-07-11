import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Hous Sites — Editorial Websites for Small Businesses | SolHous",
  description:
    "Hous Sites builds editorial websites for small businesses and brands. Your business, art-directed. A $500 Blueprint, builds at $3,500 and $6,000, and every site ships with the Hous Panel and 90 days of Hous Care.",
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
      price: "3500",
      priceCurrency: "USD",
      description:
        "Up to 5 pages, editorial-grade design, Hous Panel, contact form and SEO, launch plus 90 days of Hous Care included.",
    },
    {
      "@type": "Offer",
      name: "Hous Flagship",
      price: "6000",
      priceCurrency: "USD",
      description:
        "Up to 10 pages, CMS collections, booking or commerce-lite, art-directed photo treatment with Studio Hous, launch plus 90 days of Hous Care+ included.",
    },
  ],
};

export default function HousSitesPage() {
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
              Built like editorials,
              <br />
              not <em>templates.</em>
            </h2>
            <p className="muted">
              Most small-business sites come off a template shelf and look like it. Hous Sites treats
              your website like an editorial: direction first, then design, then a build you can live
              in without a developer on retainer.
            </p>
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
                  You edit your own words, images, and hours through the Hous Panel. The type, spacing,
                  and layout stay locked, so the site never drifts off-grade.
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
              Every build includes · Hous Panel · launch · 90 days of care · a fixed quote before work
              starts
            </p>
            <div className="cats">
              <div className="cat">
                <h3>Hous Blueprint</h3>
                <p className="season">Paid discovery · every build starts here</p>
                <p className="blurb">
                  A discovery sprint that ends in a plan you own, whether or not we build it.
                </p>
                <div className="tier">
                  <div className="n">
                    The sprint
                    <small>60-min call · editorial direction memo · sitemap · fixed quote</small>
                  </div>
                  <div className="pr">$500</div>
                </div>
                <p className="note">100% credited toward your build within 30 days.</p>
              </div>
              <div className="cat">
                <h3>Hous Editorial</h3>
                <p className="season">Up to 5 pages · about 3 weeks</p>
                <p className="blurb">
                  Editorial-grade design for the business that needs one site done right.
                </p>
                <div className="tier">
                  <div className="n">
                    The build
                    <small>up to 5 pages · Hous Panel · contact form + SEO</small>
                  </div>
                  <div className="pr">$3,500</div>
                </div>
                <div className="tier">
                  <div className="n">
                    Launch + care
                    <small>go-live · 90 days of Hous Care</small>
                  </div>
                  <div className="pr">included</div>
                </div>
              </div>
              <div className="cat">
                <h3>Hous Flagship</h3>
                <p className="season">Up to 10 pages · CMS · commerce-lite</p>
                <p className="blurb">
                  The larger build: collections, booking or commerce-lite, and imagery treated with the
                  studio&rsquo;s eye.
                </p>
                <div className="tier">
                  <div className="n">
                    The build
                    <small>up to 10 pages · CMS collections · booking or commerce-lite</small>
                  </div>
                  <div className="pr">$6,000</div>
                </div>
                <div className="tier">
                  <div className="n">
                    Photo treatment
                    <small>art-directed with Studio Hous</small>
                  </div>
                  <div className="pr">included</div>
                </div>
                <div className="tier">
                  <div className="n">
                    Launch + care
                    <small>go-live · 90 days of Hous Care+</small>
                  </div>
                  <div className="pr">included</div>
                </div>
              </div>
            </div>
            <p className="held">
              The Blueprint ends in a fixed quote. The number you sign is the number you pay, and the
              $500 comes off it when you build within 30 days.
            </p>
          </Reveal>
        </section>

        <section aria-labelledby="panel-h">
          <Reveal className="block" id="panel">
            <p className="roll">Roll 003 · the hous panel</p>
            <h2 className="big" id="panel-h">
              You hold the words.
              <br />
              We hold the <em>taste.</em>
            </h2>
            <p className="muted">
              The Hous Panel is a white-label dashboard that ships with every build. Your hours, your
              announcements, your words and images, editable by you in the browser at any hour. The
              layout, the type, the spacing, the color: locked. The client controls content; the
              studio controls taste.
            </p>
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
              <p>You can&rsquo;t break it. We made sure.</p>
              <p className="by">— the Hous Panel promise</p>
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
              <div className="pro">
                <h3>Hous Care</h3>
                <p>
                  Hosting, the Hous Panel, backups, monitoring, 30 minutes of assistance each month,
                  and a quarterly editorial check-in on the words.
                </p>
                <p className="meta">$150/mo · 90 days included with every build</p>
              </div>
              <div className="pro">
                <h3>Hous Care+</h3>
                <p>
                  Everything in Hous Care, plus 2 hours of design work each month, a seasonal refresh
                  each quarter, a traffic snapshot, and 48-hour priority.
                </p>
                <p className="meta">$325/mo · 90 days included with Flagship</p>
              </div>
            </div>
            <p className="held">
              After the included 90 days, care continues month to month on the card on file. Cancel
              any time with 30 days&rsquo; notice, and your site and content export with you.
            </p>
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
