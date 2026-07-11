import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Footer } from "@/components/Footer";
import { getContent } from "@/lib/content";
import { renderHeadline, clamp } from "@/components/editable";

type Tier = { n: string; small: string; pr: string; pop?: string };
type SpacesCat = { name: string; season: string; blurb: string; tiers: Tier[]; note?: string };
type SpacesPricing = {
  includes: string;
  cats: SpacesCat[];
  development: { h: string; p: string; meta: string };
  held: string;
};

export const metadata: Metadata = {
  title: "SolHous Spaces — Premium Real Estate & Storefront Photography | Greensboro & the Triad",
  description:
    "Premium real estate, storefront, and personal branding photography in Greensboro and the Triad. Listings from $175 with next-day delivery, storefront sessions from $250, agent branding from $225. One eye, every room.",
  alternates: { canonical: "https://solhous.com/spaces/" },
  openGraph: {
    title: "SolHous Spaces — Premium Real Estate & Storefront Photography",
    description:
      "The studio for agents and owners who refuse to look like everyone else. Listings, storefronts, and personal branding, shot with the same eye. Greensboro & the Triad.",
    type: "website",
    url: "https://solhous.com/spaces/",
    images: [{ url: "https://solhous.com/media/studio/studio-02.jpg" }],
  },
};

export default async function SpacesPage() {
  const [hero, pricing] = await Promise.all([
    getContent<{ headline: string; sub: string }>("spaces.hero"),
    getContent<SpacesPricing>("spaces.pricing"),
  ]);
  return (
    <>
      <PageHero
        tall
        bgImage="/media/studio/studio-02.jpg"
        eyebrow="SOLHOUS SPACES · GREENSBORO & THE TRIAD"
        heading={renderHeadline(clamp(hero.headline, 80))}
        sub={clamp(hero.sub, 200)}
        extra={
          <p className="cap">
            Shot on Sony A7III · Greensboro &amp; the Triad · Charlotte &amp; Raleigh-Durham by appointment
          </p>
        }
      />

      <main id="main">
        <section aria-labelledby="diff-h">
          <Reveal className="block" id="difference">
            <p className="roll">Roll 001 · the difference</p>
            <h2 className="big" id="diff-h">
              One eye across the house, the shop, <em>and you.</em>
            </h2>
            <p className="muted">
              Every shop sells an empty house, shot fast and priced to disappear. We don&rsquo;t. We treat the
              space and the brand as one body of work, a consistent eye across every house, storefront, reel,
              and headshot you put your name on.
            </p>
            <div className="firstwords" style={{ marginTop: 44 }}>
              <p>I shoot it so the scroll stops.</p>
              <p className="by">— SolHous Spaces</p>
            </div>
          </Reveal>
        </section>

        <section aria-labelledby="price-h">
          <Reveal className="block" id="pricing">
            <p className="roll">Roll 002 · services &amp; pricing</p>
            <div className="price-head">
              <span className="start" id="price-h">
                Four lanes. One eye.
              </span>
            </div>
            <p className="includes">{clamp(pricing.includes, 120)}</p>
            <div className="cats">
              {pricing.cats.map((cat) => (
                <div className="cat" key={cat.name}>
                  <h3>{clamp(cat.name, 28)}</h3>
                  <p className="season">{clamp(cat.season, 64)}</p>
                  <p className="blurb">{clamp(cat.blurb, 160)}</p>
                  {cat.tiers.map((tier) => (
                    <div className="tier" key={tier.n}>
                      <div className="n">
                        {clamp(tier.n, 28)}
                        {tier.pop && <span className="pop">{tier.pop}</span>}
                        <small>{clamp(tier.small, 80)}</small>
                      </div>
                      <div className="pr">{clamp(tier.pr, 12)}</div>
                    </div>
                  ))}
                  {cat.note && <p className="note">{cat.note}</p>}
                </div>
              ))}
            </div>
            <div className="pro-row" style={{ gridTemplateColumns: "1fr" }}>
              <div className="pro">
                <h3>{pricing.development.h}</h3>
                <p>{pricing.development.p}</p>
                <p className="meta">{pricing.development.meta}</p>
              </div>
            </div>
            <p className="held">{clamp(pricing.held, 300)}</p>
            <div style={{ marginTop: 34 }}>
              <a className="btn" data-h href="mailto:studio@solhous.com?subject=SolHous%20Spaces%20inquiry">
                Start the conversation ›
              </a>
            </div>
          </Reveal>
        </section>

        <section aria-labelledby="ret-h">
          <Reveal className="block" id="retainers">
            <p className="roll">Roll 003 · retainers</p>
            <h2 className="big" id="ret-h">
              Show up <em>every</em> month.
            </h2>
            <p className="muted">Posting once and disappearing does not build a brand. Showing up every month does.</p>
            <div className="pro-row">
              <div className="pro">
                <h3>The Week</h3>
                <p>
                  For agents. One scheduled shoot a month. 20 edited stills plus 4 vertical clips, sized and
                  ready to post. Priority booking. The same eye every time.
                </p>
                <p className="meta">$650/mo · cancel anytime</p>
              </div>
              <div className="pro">
                <h3>The Month</h3>
                <p>
                  For storefronts. One scheduled shoot a month. 20 edited stills plus 4 vertical clips, sized
                  and ready to post. Priority booking. The same eye every time.
                </p>
                <p className="meta">$650/mo · cancel anytime</p>
              </div>
            </div>
          </Reveal>
        </section>

        <section aria-labelledby="how-h">
          <Reveal className="block" id="how">
            <p className="roll">Roll 004 · how it works</p>
            <h2 className="big" id="how-h">
              Booked, shot, <em>delivered.</em>
            </h2>
            <div className="split">
              <div>
                <p className="muted">
                  Every shoot starts on paper. A mood board, a lighting diagram, a shot list. By the time I
                  walk in, the work is already half made.
                </p>
              </div>
              <div className="img">
                <img
                  src="/media/studio/studio-06.jpg"
                  alt="Planning flat lay at SolHous Spaces with a mood board, lighting diagram, and shot list"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="steps">
              <div className="step-r">
                <div className="num" />
                <div>
                  <h3>Book</h3>
                  <p>Email me. I confirm your slot and send a short plain-English agreement.</p>
                </div>
              </div>
              <div className="step-r">
                <div className="num" />
                <div>
                  <h3>Get ready</h3>
                  <p>I text you a short photo-ready checklist the morning of. Free reschedule up to 24 hours out.</p>
                </div>
              </div>
              <div className="step-r">
                <div className="num" />
                <div>
                  <h3>The shoot</h3>
                  <p>Spaces read for light. Storefronts shot in slow hours.</p>
                </div>
              </div>
              <div className="step-r">
                <div className="num" />
                <div>
                  <h3>Delivery</h3>
                  <p>
                    Listings land the next business day. Everything else, within the week. Your gallery is
                    sized for MLS, print, and social, and downloadable for 60 days.
                  </p>
                </div>
              </div>
            </div>
            <p className="held">
              You&rsquo;re licensed to market this listing. If anyone else, your broker, the builder, the
              stager, the next agent, wants the photos, send them my way. Quick to add, it just runs through
              me.
            </p>
          </Reveal>
        </section>

        <section aria-labelledby="nfy-h">
          <Reveal className="block tight" id="notforyou">
            <p className="roll">Roll 005 · not for you if</p>
            <h2 className="big" id="nfy-h">
              Let&rsquo;s save us both the <em>call.</em>
            </h2>
            <div className="firstwords" style={{ marginTop: 44 }}>
              <p>You want the cheapest photos in town. I am not that, on purpose.</p>
              <p className="by">— better to know now</p>
            </div>
            <p className="muted" style={{ marginTop: 34 }}>
              You need it edited in an hour. Quality has a turnaround, and mine is next day.
            </p>
          </Reveal>
        </section>

        <section aria-labelledby="close-h">
          <Reveal className="block" id="close">
            <p className="roll">Roll 006 · the close</p>
            <h2 className="big" id="close-h">
              One <em>eye,</em> every room.
            </h2>
            <p className="muted">
              If your listings, your storefront, or your face online deserve better than fast and forgettable,
              write to me.
            </p>
            <div style={{ marginTop: 34 }}>
              <a className="btn" data-h href="mailto:studio@solhous.com?subject=SolHous%20Spaces%20inquiry">
                Start the conversation ›
              </a>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer line="One eye, every room." />
    </>
  );
}
