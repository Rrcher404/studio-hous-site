import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Cosign — The Bridge Layer of SolHous | Partnership Invitation",
  description:
    "Cosign lends the SolHous community, production capability, and editorial credibility to established nonprofits, schools, civic organizations, and creative collectives — reciprocity, never extraction.",
  alternates: { canonical: "https://solhous.com/cosign/" },
  openGraph: {
    title: "Cosign — The Bridge Layer of SolHous | Partnership Invitation",
    description:
      "SolHous lends its community, production capability, and editorial credibility to already-established organizations — strengthening their work through reciprocity, never extraction.",
    type: "website",
    url: "https://solhous.com/cosign/",
    images: [{ url: "https://solhous.com/media/studio/studio-05.jpg" }],
  },
};

export default function CosignPage() {
  return (
    <>
      <PageHero
        tall
        bgImage="/media/studio/studio-05.jpg"
        eyebrow="SOLHOUS · A PARTNERSHIP INVITATION"
        heading="Cosign."
        extra={
          <>
            <p className="kicker">The Bridge Layer of SolHous</p>
            <p className="epi">
              The Grammy doesn&rsquo;t make the music. It recognizes it — and that recognition is itself a
              form of value.
            </p>
          </>
        }
      />

      <main id="main">
        <section aria-labelledby="frame-h">
          <Reveal className="block" id="frame">
            <p className="roll">Roll 001 · the frame</p>
            <h2 className="big" id="frame-h">
              Recognition is a form of <em>value.</em>
            </h2>
            <p className="muted">
              SolHous lends its community, production capability, and editorial credibility to
              already-established nonprofits, civic organizations, schools, and creative collectives —
              strengthening their work while expanding the SolHous network through reciprocity, never
              extraction.
            </p>
            <p className="muted">
              A nonprofit doesn&rsquo;t need SolHous to exist. It does its work either way. But when SolHous
              cosigns it, the work is seen by people who weren&rsquo;t looking before. That visibility is the
              value transfer.
            </p>
            <p className="muted">
              The Cosign mark works like a Michelin star or a certified-organic stamp — a public signal that
              SolHous has reviewed and stands with the partner&rsquo;s work. It means something because it is
              not given to everyone.
            </p>
            <div className="firstwords" style={{ marginTop: 36 }}>
              <p>Cosign augments. It does not substitute. Scarcity protects the value.</p>
              <p className="by">THE PREMISE</p>
            </div>
          </Reveal>
        </section>

        <section aria-labelledby="receive-h">
          <Reveal className="block" id="receive">
            <p className="roll">Roll 002 · what you receive</p>
            <h2 className="big" id="receive-h">
              What a cosigned partner <em>receives.</em>
            </h2>
            <div className="princ">
              <div className="p">
                <span className="k">Editorial recognition</span>
                <h3>A place in the record</h3>
                <p>
                  A PLATE feature spread on your work, and the Cosign mark for your own materials — a public
                  signal that SolHous has reviewed and stands with what you do.
                </p>
              </div>
              <div className="p">
                <span className="k">Production support</span>
                <h3>SolHous Productions</h3>
                <p>
                  Full production capability on a sliding scale — from pro bono to discounted — for the work
                  that matters most to your calendar.
                </p>
              </div>
              <div className="p">
                <span className="k">Direction packages</span>
                <h3>Creative direction</h3>
                <p>Mood boards, lighting plans, styling, and color — subsidized direction work so your programming looks the way it deserves to.</p>
              </div>
              <div className="p">
                <span className="k">Reciprocal membership</span>
                <h3>Inside the Hous</h3>
                <p>Tier-2 SolHous access for up to three of your leadership. Your people become part of the community, not guests of it.</p>
              </div>
              <div className="p">
                <span className="k">Network introductions</span>
                <h3>The right rooms</h3>
                <p>Direction architects, ambassadors, production crew — introductions made on request, when your work needs them.</p>
              </div>
              <div className="p">
                <span className="k">Hub access</span>
                <h3>Space to work</h3>
                <p>Event space, studio time, and gallery wall slots — starting with the Greensboro hub.</p>
              </div>
            </div>
          </Reveal>
        </section>

        <section aria-labelledby="ask-h">
          <Reveal className="block" id="ask">
            <p className="roll">Roll 003 · what we ask</p>
            <h2 className="big" id="ask-h">
              What we ask <em>in return.</em>
            </h2>
            <p className="muted">Cosign is reciprocal by design. We print both sides of the ledger — that&rsquo;s the honesty signal.</p>
            <div className="princ">
              <div className="p">
                <span className="k">Reciprocal cosign</span>
                <h3>Stand with us publicly</h3>
                <p>Public acknowledgment of SolHous as a partner. The bridge carries traffic both ways.</p>
              </div>
              <div className="p">
                <span className="k">A speaking moment</span>
                <h3>One slot a year</h3>
                <p>One speaking moment per year at your programming. A voice, not a booth.</p>
              </div>
              <div className="p">
                <span className="k">Network access</span>
                <h3>Introductions, on your terms</h3>
                <p>Introductions to peer organizations — on your terms, no quotas.</p>
              </div>
              <div className="p">
                <span className="k">Joint projects</span>
                <h3>Ship together</h3>
                <p>Two real pieces of work shipped together over the year.</p>
              </div>
              <div className="p">
                <span className="k">Honest feedback</span>
                <h3>Tell us the truth</h3>
                <p>Candid evaluation at renewal. The model improves with use.</p>
              </div>
            </div>
          </Reveal>
        </section>

        <section aria-labelledby="who-h">
          <Reveal className="block" id="who">
            <p className="roll">Roll 004 · who this is for</p>
            <h2 className="big" id="who-h">
              Built for organizations already <em>doing the work.</em>
            </h2>
            <div className="whogrid">
              <div>Established nonprofits with creative or cultural programming</div>
              <div>Schools and arts programs needing professional production support</div>
              <div>Civic organizations producing community events and cultural programming</div>
              <div>Creative collectives operating without dedicated infrastructure</div>
              <div>Cultural institutions hosting community-facing programming</div>
            </div>
            <div className="firstwords" style={{ marginTop: 40 }}>
              <p>Cosign is not a starter kit. The premise of the recognition economy requires that there is something real to recognize.</p>
              <p className="by">THE CAVEAT</p>
            </div>
            <p className="muted" style={{ marginTop: 28 }}>
              Newer organizations still finding their footing: start with <Link href="/field-notes/">Field Notes</Link>. That door is open to everyone.
            </p>
          </Reveal>
        </section>

        <section aria-labelledby="how-h">
          <Reveal className="block" id="how">
            <p className="roll">Roll 005 · how it works</p>
            <h2 className="big" id="how-h">
              From first conversation to <em>renewal.</em>
            </h2>
            <div className="steps">
              <div className="step-r">
                <div className="num" />
                <div>
                  <h3>Discovery</h3>
                  <p>Cosign is not a sale. It is a fit check. We sit down, look at each other&rsquo;s work, and decide whether the mark means something on both sides.</p>
                </div>
              </div>
              <div className="step-r">
                <div className="num" />
                <div>
                  <h3>Agreement</h3>
                  <p>A short, plain-language document that names what each side brings, the term, the renewal date, and the named contacts on both sides. Twelve months, renewable.</p>
                </div>
              </div>
              <div className="step-r">
                <div className="num" />
                <div>
                  <h3>Joint work</h3>
                  <p>At least one concrete piece of work in the first quarter. Cosign is not a press release. It is a collaboration. Work is the proof.</p>
                </div>
              </div>
              <div className="step-r">
                <div className="num" />
                <div>
                  <h3>Annual renewal</h3>
                  <p>At the year mark, we renew, restructure, or graduate. Graduation is a positive outcome — it means the partnership did what it was built to do.</p>
                </div>
              </div>
            </div>
            <div className="split">
              <div>
                <h2 className="big">
                  Work is the <em>proof.</em>
                </h2>
                <p className="muted">
                  The mark on a poster is easy. A crew in the room is not. Every cosign is anchored in real
                  production — shot lists pinned to the wall, lights rigged, work shipped with both names on
                  it.
                </p>
              </div>
              <div className="img">
                <img
                  src="/media/studio/studio-01.jpg"
                  alt="A SolHous director walking the team through a pinned shot list during a joint production."
                  loading="lazy"
                />
              </div>
            </div>
          </Reveal>
        </section>

        <section aria-labelledby="commit-h">
          <Reveal className="block" id="commitments">
            <p className="roll">Roll 006 · our commitments</p>
            <h2 className="big" id="commit-h">
              What we promise <em>every</em> partner.
            </h2>
            <div className="whogrid">
              <div>We never recruit from your audience without explicit invitation.</div>
              <div>We never replace your programming — your work leads, we support.</div>
              <div>Your name goes first. The partner, cosigned by SolHous — never the reverse.</div>
              <div>The cosign is renewable, never permanent.</div>
              <div>Either side can walk away.</div>
              <div>If it starts to feel extractive on either side, we name it and renegotiate.</div>
            </div>
          </Reveal>
        </section>

        <section aria-labelledby="lookfor-h">
          <Reveal className="block" id="lookfor">
            <p className="roll">Roll 007 · what we look for</p>
            <h2 className="big" id="lookfor-h">
              The plain-English <em>scorecard.</em>
            </h2>
            <div className="princ">
              <div className="p">
                <span className="k">Standing</span>
                <h3>Established and functioning</h3>
                <p>The organization exists, operates, and delivers — with or without us.</p>
              </div>
              <div className="p">
                <span className="k">People</span>
                <h3>Leadership we&rsquo;re proud to stand with</h3>
                <p>The mark is personal. We cosign people as much as programs.</p>
              </div>
              <div className="p">
                <span className="k">Mission</span>
                <h3>Alignment</h3>
                <p>Mission alignment with community-rooted creative work.</p>
              </div>
              <div className="p">
                <span className="k">Work</span>
                <h3>Worth recognizing</h3>
                <p>Work worth recognizing. Something real for the mark to point at.</p>
              </div>
              <div className="p">
                <span className="k">Reciprocity</span>
                <h3>Real, both ways</h3>
                <p>A partnership that gives as much as it receives — in whatever form fits.</p>
              </div>
            </div>
            <p className="muted" style={{ marginTop: 36 }}>Discipline protects the value of the mark.</p>
          </Reveal>
        </section>

        <section aria-labelledby="year-h">
          <Reveal className="block tight" id="year">
            <p className="roll">Roll 008 · the year ahead</p>
            <h2 className="big" id="year-h">
              Where the bridge <em>goes.</em>
            </h2>
            <p className="muted">
              Founding partnerships anchored in Greensboro. A public Cosigned Cohort application, coming. A
              print-and-digital Cosign Annual Report — the record of what the partnerships actually made. And
              on the horizon: Atlanta, Charlotte, and Houston.
            </p>
          </Reveal>
        </section>

        <section aria-labelledby="cta-h">
          <Reveal className="block" id="cta">
            <p className="roll">Roll 009 · the invitation</p>
            <h2 className="big" id="cta-h">
              Want to be <em>Cosigned?</em>
            </h2>
            <p className="muted">
              Cosign is selective by design. Reach out to start a conversation — the relationship begins long
              before the signature.
            </p>
            <p style={{ marginTop: 34 }}>
              <a className="btn" href="mailto:cosign@solhous.com?subject=Cosign%20conversation">
                Request a conversation ›
              </a>
            </p>
          </Reveal>
        </section>
      </main>

      <Footer
        line="Built from the community up. Bridged outward through Cosign."
        legal="© 2026 SolHous · Studio Hous · built in greensboro."
      />
    </>
  );
}
