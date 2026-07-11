import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Footer } from "@/components/Footer";
import { FieldNotesForm } from "@/components/FieldNotesForm";

export const metadata: Metadata = {
  title: "Field Notes — Real People, Real Days, Real Work | Studio Hous",
  description:
    "Field Notes is the editorial practice of Studio Hous — a biweekly, long-form, day-in-the-life series documenting working creatives across Greensboro and beyond. Submit to be a case study.",
  alternates: { canonical: "https://solhous.com/field-notes/" },
  openGraph: {
    title: "Field Notes — Studio Hous",
    description:
      "Some stories take a day. Some stories take a season. All of them are worth the time it takes to get them right.",
    type: "website",
    url: "https://solhous.com/field-notes/",
    images: [{ url: "https://solhous.com/media/studio/studio-04.jpg" }],
  },
  twitter: { card: "summary_large_image" },
};

export default function FieldNotesPage() {
  return (
    <>
      <PageHero
        tall
        bgImage="/media/studio/studio-04.jpg"
        eyebrow="Studio Hous · The Editorial Practice"
        heading={
          <>
            Field <em>Notes.</em>
          </>
        }
        sub="Some stories take a day. Some stories take a season. All of them are worth the time it takes to get them right."
      />

      <main id="main">
        <section aria-labelledby="what-h">
          <Reveal className="block" id="what">
            <p className="roll">Roll 001 · what it is</p>
            <h2 className="big" id="what-h">
              Real people, real days,
              <br />
              real <em>work.</em>
            </h2>
            <p className="muted">
              Field Notes is a biweekly, long-form, day-in-the-life editorial series documenting working
              creatives — photographers, designers, founders, students, audio engineers, muralists, art
              teachers — across the Greensboro creative middle class and beyond. Numbered issues. A permanent
              archive. Published by Studio Hous, under SolHous.
            </p>
            <div className="firstwords" style={{ marginTop: 40 }}>
              <p>We&rsquo;re early. We&rsquo;re choosy. We&rsquo;re building the founding archive of a publication that intends to last.</p>
              <p className="by">— honest by design</p>
            </div>
          </Reveal>
        </section>

        <section aria-labelledby="issue-h">
          <Reveal className="block" id="issue">
            <p className="roll">Roll 002 · what an issue looks like</p>
            <h2 className="big" id="issue-h">
              Five pieces, every <em>time.</em>
            </h2>
            <div className="princ">
              <div className="p">
                <span className="k">The essay</span>
                <h3>1,500–2,500 words</h3>
                <p>First-person, narrative, editorial. Written to last, not to trend.</p>
              </div>
              <div className="p">
                <span className="k">The photographs</span>
                <h3>8–15 frames</h3>
                <p>Editorial, shot personally. The subject keeps every photo.</p>
              </div>
              <div className="p">
                <span className="k">The pull quote</span>
                <h3>One statement</h3>
                <p>The line that stays with you, set large.</p>
              </div>
              <div className="p">
                <span className="k">The workflow note</span>
                <h3>One observation</h3>
                <p>A transferable truth about how the work actually gets done.</p>
              </div>
              <div className="p">
                <span className="k">Where to find them</span>
                <h3>The footer</h3>
                <p>Every issue closes by pointing at the subject&rsquo;s own work.</p>
              </div>
            </div>
          </Reveal>
        </section>

        <section aria-labelledby="split-h">
          <Reveal className="block">
            <div className="split">
              <div>
                <p className="roll">Roll 003 · the archive</p>
                <h2 className="big" id="split-h">
                  The archive begins <em>here.</em>
                </h2>
                <p className="muted">
                  Field Notes 001 is being made now. Numbered, permanent, unhurried. Nothing gets published
                  because the calendar says so. It gets published when the work clears the bar.
                </p>
                <div className="firstwords" style={{ marginTop: 32 }}>
                  <p>The practice is the product. Build slowly. Build truly.</p>
                  <p className="by">— the standing mantra</p>
                </div>
              </div>
              <div className="img">
                <img
                  src="/media/studio/studio-03.jpg"
                  alt="A photographer reviewing contact sheets on a lightbox beneath a wall of moodboard prints."
                  loading="lazy"
                />
              </div>
            </div>
          </Reveal>
        </section>

        <section aria-labelledby="how-h">
          <Reveal className="block" id="how">
            <p className="roll">Roll 004 · how to be in it</p>
            <h2 className="big" id="how-h">
              Five steps from
              <br />a stranger to a <em>story.</em>
            </h2>
            <div className="steps">
              <div className="step-r">
                <div className="num" />
                <div>
                  <h3>Be doing the work</h3>
                  <p>Field Notes documents people whose work is real and ongoing.</p>
                </div>
              </div>
              <div className="step-r">
                <div className="num" />
                <div>
                  <h3>Reach out</h3>
                  <p>
                    Email cosign@solhous.com or DM @studio.hous on Instagram.
                    <span className="k">Or use the form below</span>
                  </p>
                </div>
              </div>
              <div className="step-r">
                <div className="num" />
                <div>
                  <h3>A short conversation</h3>
                  <p>We talk about your work and whether the format fits.</p>
                </div>
              </div>
              <div className="step-r">
                <div className="num" />
                <div>
                  <h3>A day with you</h3>
                  <p>We spend a real day in your working life. No script.</p>
                </div>
              </div>
              <div className="step-r">
                <div className="num" />
                <div>
                  <h3>It runs</h3>
                  <p>Publishes within about 30 days. You keep all the photos.</p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <section aria-labelledby="get-h">
          <Reveal className="block" id="get">
            <p className="roll">Roll 005 · what subjects get</p>
            <h2 className="big" id="get-h">
              You keep more than
              <br />
              the <em>feature.</em>
            </h2>
            <div className="whogrid">
              <div>A permanent entry in the archive</div>
              <div>All photography for your own portfolio use</div>
              <div>A &ldquo;Where to Find Them&rdquo; footer pointing at your work</div>
              <div>Consideration for the Founding Twenty — our first cohort of ongoing collaborators</div>
              <div>A real relationship with a creative direction practice building something bigger</div>
              <div>The right to say no — you review your story before it runs</div>
            </div>
            <div className="firstwords" style={{ marginTop: 40 }}>
              <p>Every subject becomes a scout for the next.</p>
              <p className="by">— how the archive grows</p>
            </div>
          </Reveal>
        </section>

        <section aria-labelledby="sub-h">
          <Reveal className="block" id="submit">
            <p className="roll">Roll 006 · put yourself in the frame</p>
            <h2 className="big" id="sub-h">
              Make the case for
              <br />a <em>day.</em>
            </h2>
            <p className="muted">
              We&rsquo;re not collecting leads. We&rsquo;re looking for one real day worth documenting. You
              don&rsquo;t have to be established — a sophomore running an art club gets the same day as a
              photographer of twenty years. If the work is real and ongoing, tell us about it.
            </p>
            <FieldNotesForm />
          </Reveal>
        </section>

        <section aria-labelledby="std-h">
          <Reveal className="block tight" id="standards">
            <p className="roll">Roll 007 · editorial standards</p>
            <h3 className="mid" id="std-h">
              How we handle a story.
            </h3>
            <div className="whogrid" style={{ marginTop: 26 }}>
              <div>Subjects review their story before it runs</div>
              <div>Photography belongs to the subject for portfolio use</div>
              <div>Content is never licensed for commercial use by default</div>
              <div>We publish when the work clears the rubric, not when the calendar says</div>
            </div>
          </Reveal>
        </section>

        <section aria-labelledby="cx-h">
          <Reveal className="block tight" id="crosslink">
            <p className="roll">Roll 008 · where it goes</p>
            <h3 className="mid" id="cx-h">
              Field Notes is where relationships begin.
              <br />
              The work is where they go.
            </h3>
            <p className="muted">
              Built from the community up. The people documented here become the sessions, the
              collaborations, and the walls the work ends up on.
            </p>
            <div className="crosslink">
              <Link href="/work/" className="btn ghost">
                The portfolio ›
              </Link>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer
        line={
          <>
            The practice is the product.
            <br />
            Build slowly. Build truly.
          </>
        }
        meta={
          <>
            Studio Hous · Field Notes · Published under SolHous · Greensboro, North Carolina
            <br />
            <a href="mailto:cosign@solhous.com">cosign@solhous.com</a> ·{" "}
            <a href="https://www.instagram.com/thestudio.hous/" target="_blank" rel="noopener">
              @studio.hous
            </a>
          </>
        }
        legal="Details you share are used only to consider your submission and are never sold or shared. © 2026 SolHous · Studio Hous."
      />
    </>
  );
}
