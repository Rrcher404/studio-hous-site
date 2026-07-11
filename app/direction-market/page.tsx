import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Footer } from "@/components/Footer";
import { NotifyForm } from "@/components/NotifyForm";

export const metadata: Metadata = {
  title: "The Direction Market — Creative Direction Packages | SolHous",
  description:
    "The SolHous Direction Market: complete, shootable creative-direction packages — mood board, shot list, lighting diagrams, color grade, styling guide, and the frames that proved it. Three packages open now, from $29.",
  alternates: { canonical: "https://solhous.com/direction-market/" },
  openGraph: {
    title: "The Direction Market — SolHous",
    description:
      "Presets sell you a look. Direction hands you the whole decision — the board, the list, the light, the grade. Three proven packages, open now.",
    type: "website",
    url: "https://solhous.com/direction-market/",
    images: [{ url: "https://solhous.com/media/portfolio/portraits/portrait-29.jpg" }],
  },
  twitter: { card: "summary_large_image" },
};

/**
 * The shelf. `live` gates the buy state: a live card links to its Gumroad
 * product; a not-yet-live card shows the honest "opening this week" state and
 * points to the notify form. Flip `live` to true the moment the product is
 * published on Gumroad.
 */
type Pkg = {
  slug: string;
  href: string;
  live: boolean;
  cover: string;
  alt: string;
  tier: string;
  name: string;
  pitch: string;
};

const shelf: Pkg[] = [
  {
    slug: "final-touches",
    href: "https://nervahous.gumroad.com/l/final-touches",
    live: true,
    cover: "/media/portfolio/portraits/portrait-14.jpg",
    alt: "Mother in a white beaded dress adjusting her son's collar as he stands in a black tuxedo before the night out.",
    tier: "Single-scene · $29",
    name: "Final Touches",
    pitch: "The grad photo everyone takes, directed like the night it actually was. One hallway, sixteen frames.",
  },
  {
    slug: "dockside",
    href: "https://nervahous.gumroad.com/l/dockside",
    live: true,
    cover: "/media/portfolio/portraits/portrait-05.jpg",
    alt: "Woman in a white swim set and cat-eye sunglasses leaning on a chrome boat rail against turquoise water.",
    tier: "Standard · $49",
    name: "Dockside",
    pitch: "Shoot summer like it owes you nothing. Four setups, the hardest light of the day made the point.",
  },
  {
    slug: "downtown-runway",
    href: "https://nervahous.gumroad.com/l/downtown-runway",
    live: true,
    cover: "/media/portfolio/portraits/portrait-29.jpg",
    alt: "Young man in a fur-collared graphic sweatshirt looking down at painted hexagons on a downtown street.",
    tier: "Flagship · $79",
    name: "Downtown Is the Runway",
    pitch: "Six blocks, one subject, no studio. The city does the set design. Twenty frames, gold into blue hour.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "The SolHous Direction Market",
  description:
    "Complete creative-direction packages a photographer buys and shoots with their own people — mood board, shot list, lighting, grade, and styling, each proven on a real shoot.",
  itemListElement: shelf.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Product",
      name: p.name,
      description: p.pitch,
      image: `https://solhous.com${p.cover}`,
      brand: { "@type": "Brand", name: "SolHous" },
      offers: {
        "@type": "Offer",
        price: p.tier.split("$")[1],
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: p.href,
      },
    },
  })),
};

export default function DirectionMarketPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        tall
        bgImage="/media/studio/studio-06.jpg"
        eyebrow="SolHous · The Direction Market · Open"
        heading={
          <>
            Direction is the <em>product.</em>
          </>
        }
        sub="Presets sell you a look. Direction hands you the whole decision — the board, the list, the light, the grade. Buy it, shoot it with your own people."
      />

      <main id="main">
        <section aria-labelledby="shelf-h">
          <Reveal className="block" id="shelf">
            <p className="roll">Roll 001 · the shelf</p>
            <h2 className="big" id="shelf-h">
              Three packages.
              <br />
              Every one <em>shot.</em>
            </h2>
            <p className="muted">
              Each package is a complete, shootable brief, proven on a real Studio Hous session before
              it went up. Take one, put your people in it, and stand on a director&rsquo;s decisions
              instead of a blank page.
            </p>
            <div className="uni">
              {shelf.map((p) =>
                p.live ? (
                  <a key={p.slug} href={p.href} target="_blank" rel="noopener">
                    <div className="im">
                      <img src={p.cover} alt={p.alt} loading="lazy" />
                    </div>
                    <div className="tx">
                      <span className="k">{p.tier}</span>
                      <h3>{p.name}</h3>
                      <p>{p.pitch}</p>
                      <span className="go">See the package ›</span>
                    </div>
                  </a>
                ) : (
                  <a key={p.slug} href="#notify">
                    <div className="im">
                      <img src={p.cover} alt={p.alt} loading="lazy" />
                    </div>
                    <div className="tx">
                      <span className="k">{p.tier}</span>
                      <h3>{p.name}</h3>
                      <p>{p.pitch}</p>
                      <span className="go">Shot &amp; proven · opening this week ›</span>
                    </div>
                  </a>
                )
              )}
            </div>
          </Reveal>
        </section>

        <section aria-labelledby="anat-h">
          <Reveal className="block" id="anatomy">
            <p className="roll">Roll 002 · anatomy of a package</p>
            <h2 className="big" id="anat-h">
              The thinking behind
              <br />
              the <em>frame.</em>
            </h2>
            <p className="muted">
              Every package carries the same six documents — the ones we build for our own sessions.
            </p>
            <div className="princ" style={{ marginTop: 42 }}>
              <div className="p">
                <span className="k">01</span>
                <h3>Mood board</h3>
                <p>References and a palette pulled from the frames themselves — the real colors of the shoot.</p>
              </div>
              <div className="p">
                <span className="k">02</span>
                <h3>Shot list</h3>
                <p>Twelve to twenty numbered shots. Framing, lens, and the intent behind every one.</p>
              </div>
              <div className="p">
                <span className="k">03</span>
                <h3>Lighting diagram</h3>
                <p>Every scene, top-down and gear-agnostic — with a budget path when a window is all you have.</p>
              </div>
              <div className="p">
                <span className="k">04</span>
                <h3>Color grade</h3>
                <p>The look in real Lightroom values, plus a one-click preset installed and ready.</p>
              </div>
              <div className="p">
                <span className="k">05</span>
                <h3>Styling guide</h3>
                <p>Wardrobe, props, and HMUA direction — buildable from a real closet, not a rental house.</p>
              </div>
              <div className="p">
                <span className="k">06</span>
                <h3>Results gallery</h3>
                <p>The frames that proved it. Every one shot in a real session, not a mockup.</p>
              </div>
            </div>
          </Reveal>
        </section>

        <section aria-labelledby="honest-h">
          <Reveal className="block" id="notify">
            <p className="roll">Roll 003 · the honest shelf</p>
            <h2 className="big" id="honest-h">
              Nothing sells here
              <br />
              until it&rsquo;s <em>proven.</em>
            </h2>
            <p className="muted">
              Three packages are open. More are being shot right now — editorial, street, water, formal.
              When one clears the bar — shot, proven, documented — it goes up, and the work behind it goes
              up with it. Leave your email and you&rsquo;ll know when.
            </p>
            <NotifyForm />
          </Reveal>
        </section>

        <section aria-labelledby="cx-h">
          <Reveal className="block tight" id="crosslink">
            <p className="roll">Roll 004 · meanwhile</p>
            <h3 className="mid" id="cx-h">
              The direction is on the shelf.
              <br />
              The eye behind it is already public.
            </h3>
            <p className="muted">
              See the standard the packages are held to — the working portfolio. And every package
              here came out of a Studio Hous session. That door is open too.
            </p>
            <div className="crosslink" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link href="/work/" className="btn ghost">
                The portfolio ›
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
            Anyone can sell a preset.
            <br />
            We&rsquo;re selling the decision.
          </>
        }
        meta={
          <>
            The Direction Market · SolHous · Greensboro, North Carolina
            <br />
            <a href="mailto:studio@solhous.com">studio@solhous.com</a> ·{" "}
            <a href="https://www.instagram.com/thestudio.hous/" target="_blank" rel="noopener">
              @thestudio.hous
            </a>
          </>
        }
        legal="Every package ships with the frames that proved it. © 2026 SolHous."
      />
    </>
  );
}
