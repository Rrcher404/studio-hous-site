import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Footer } from "@/components/Footer";
import { BookMeButton } from "@/components/BookingModal";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sessions & Pricing — Studio Hous | Greensboro NC",
  description:
    "Studio Hous sessions start at $135. Portraits, graduation, prom, weddings, corporate and private events, real estate, and commercial — every session includes creative direction, premium editing, and a curated gallery.",
  alternates: { canonical: "https://solhous.com/sessions/" },
  openGraph: {
    title: "Sessions & Pricing — Studio Hous",
    description: "Sessions start at $135. Professional creative direction, premium editing, and a curated gallery on every one.",
    type: "website",
    url: "https://solhous.com/sessions/",
    images: [{ url: "https://solhous.com/media/studio/studio-06.jpg" }],
  },
};

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
  url: "https://solhous.com/sessions/",
};

export default function SessionsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHero
        bgImage="/media/studio/studio-06.jpg"
        eyebrow="Studio Hous · Sessions & Pricing · Greensboro NC"
        heading={
          <>
            Sessions start
            <br />
            at <em>$135.</em>
          </>
        }
        sub="Every session includes real creative direction, premium editing, and a gallery that's curated, not dumped — every frame one we'd stand behind. You'll know the scope and the price before you put anything down."
      />

      <main id="main">
        <section aria-labelledby="price-h">
          <div className="block" id="pricing">
            <p className="roll rv">Roll 001 · portrait sessions</p>
            <div className="price-head rv">
              <span className="start" id="price-h">
                Portraits, graduation, prom.
              </span>
            </div>
            <p className="includes rv">
              Every session includes — professional creative direction · premium editing · a curated digital
              gallery
            </p>
            <div className="cats rv">
              <div className="cat">
                <h3>Portraits</h3>
                <p className="season">Personal branding · creatives</p>
                <div className="tier">
                  <div className="n">
                    Signature
                    <small>60 min · 15–20 images</small>
                  </div>
                  <div className="pr">$150</div>
                </div>
                <div className="tier">
                  <div className="n">
                    Portrait Plus
                    <small>120 min · 20–35 images · reels</small>
                  </div>
                  <div className="pr">$225</div>
                </div>
                <div className="tier">
                  <div className="n">
                    Editorial / Concept
                    <small>2–3 hrs · 50–75 images</small>
                  </div>
                  <div className="pr">$450</div>
                </div>
              </div>
              <div className="cat">
                <h3>Graduation</h3>
                <p className="season">Peak Mar–Jun · book 4–12 wks ahead</p>
                <div className="tier">
                  <div className="n">
                    Mini
                    <small>30 min · 10–15 images</small>
                  </div>
                  <div className="pr">$135</div>
                </div>
                <div className="tier">
                  <div className="n">
                    Signature <span className="pop">Most loved</span>
                    <small>60 min · 20–30 images · reels</small>
                  </div>
                  <div className="pr">$270</div>
                </div>
                <div className="tier">
                  <div className="n">
                    Deluxe
                    <small>90 min · 35–50 images</small>
                  </div>
                  <div className="pr">$425</div>
                </div>
              </div>
              <div className="cat">
                <h3>Prom</h3>
                <p className="season">Peak Apr–Jun · 24–48 hr delivery</p>
                <div className="tier">
                  <div className="n">
                    Express
                    <small>30 min · 12–18 images</small>
                  </div>
                  <div className="pr">$175</div>
                </div>
                <div className="tier">
                  <div className="n">
                    Signature <span className="pop">Most loved</span>
                    <small>60 min · 20–30 images · reels</small>
                  </div>
                  <div className="pr">$275</div>
                </div>
                <div className="tier">
                  <div className="n">
                    Group (4–6)
                    <small>90 min · 30–50 images</small>
                  </div>
                  <div className="pr">$375</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="pro-h">
          <Reveal className="block tight" id="pro">
            <p className="roll">Roll 002 · property &amp; commercial</p>
            <h2 className="big" id="pro-h">
              A face or a room.
              <br />
              The same <em>eye.</em>
            </h2>
            <div className="pro-row" style={{ marginTop: 34 }}>
              <div className="pro">
                <h3>Real Estate</h3>
                <p>Fast, clean listing photography with the same editorial eye. MLS-ready galleries.</p>
                <p className="meta">From $150 · 24–48 hr delivery</p>
              </div>
              <div className="pro">
                <h3>Commercial</h3>
                <p>Brand and organizational imagery — product, team, and space, quoted to your scope.</p>
                <p className="meta">Quoted per project · let&rsquo;s talk</p>
              </div>
            </div>
            <p className="held">
              Property and storefront work has its own studio. For full real estate, restaurant, and
              agent-branding packages, see{" "}
              <Link href="/spaces/" style={{ color: "var(--sun)", textDecoration: "none" }}>
                SolHous Spaces ›
              </Link>
            </p>
          </Reveal>
        </section>

        <section aria-labelledby="events-h">
          <Reveal className="block tight" id="events">
            <p className="roll">Roll 003 · events</p>
            <h2 className="big" id="events-h">
              Rooms full of moments,
              <br />
              none of them <em>posed.</em>
            </h2>
            <p className="muted">
              Weddings, corporate events, and the celebrations in between. The same editorial eye,
              working a room instead of a set: the planned frames on the run of show, and the ones
              nobody planned that end up mattering more.
            </p>
            <div className="pro-row" style={{ marginTop: 34 }}>
              <div className="pro">
                <h3>Weddings</h3>
                <p>
                  Coverage built around your timeline, not a shot-list template. Direction where it
                  helps, invisibility where it counts, and a gallery curated like an editorial.
                </p>
                <p className="meta">Quoted per wedding · dates hold with a deposit</p>
              </div>
              <div className="pro">
                <h3>Corporate &amp; Private Events</h3>
                <p>
                  Conferences, galas, launches, retreats, and the parties worth remembering.
                  Keynotes, candids, details, and the room itself — delivered ready for your
                  channels.
                </p>
                <p className="meta">Quoted to your run of show · let&rsquo;s talk</p>
              </div>
            </div>
            <p className="held">
              Every event is scoped on a call first: hours of coverage, the moments that cannot be
              missed, and delivery timeline. You&rsquo;ll have the whole number before you hold the
              date.
            </p>
          </Reveal>
        </section>

        <section aria-labelledby="hold-h">
          <Reveal className="block" id="hold">
            <p className="roll">Roll 004 · how holding a date works</p>
            <h2 className="big" id="hold-h">
              The whole price,
              <br />
              <em>up front.</em>
            </h2>
            <div className="steps">
              <div className="step-r">
                <div className="num" />
                <div>
                  <h3>Hold your date</h3>
                  <p>A 30% retainer holds your date. The remainder is due 48 hours before your session.</p>
                </div>
              </div>
              <div className="step-r">
                <div className="num" />
                <div>
                  <h3>Plan the look</h3>
                  <p>A styling consultation is included, and one additional guest is always welcome.</p>
                </div>
              </div>
              <div className="step-r">
                <div className="num" />
                <div>
                  <h3>We shoot</h3>
                  <p>Editorial direction on the day. We work the frames until they earn their place.</p>
                </div>
              </div>
              <div className="step-r">
                <div className="num" />
                <div>
                  <h3>Your gallery</h3>
                  <p>A curated, premium-edited digital gallery, delivered and ready to share.</p>
                </div>
              </div>
            </div>
            <p className="held">Based in Greensboro — Guilford County included. Travel available beyond with a fee.</p>
          </Reveal>
        </section>

        <section aria-labelledby="who-h">
          <Reveal className="block" id="who">
            <p className="roll">Roll 005 · who we work with</p>
            <h2 className="big" id="who-h">
              For the moment that&rsquo;s
              <br />
              <em>worth keeping.</em>
            </h2>
            <div className="whogrid">
              <div>Graduates wanting portraits that feel current and celebratory</div>
              <div>Individuals and creatives building personal brands</div>
              <div>Prom clients who want polished photos before the night moves</div>
              <div>Real estate agents and brokerages needing fast, clean listing photography</div>
              <div>Businesses and organizations needing commercial imagery</div>
              <div>Anyone who believes their moment deserves more than a snapshot</div>
            </div>
            <div style={{ marginTop: 42 }}>
              <BookMeButton className="btn">Hold your date ›</BookMeButton>
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
        legal="Inquiry details you share are used only to respond to your booking and are never sold or shared. © 2026 SolHous · Studio Hous."
      />
    </>
  );
}
