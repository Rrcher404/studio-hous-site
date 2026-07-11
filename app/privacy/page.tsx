import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy — SolHous",
  description:
    "How SolHous handles your information: what we collect, why, how long we keep it, and the choices you have. No analytics or tracking cookies without your OK.",
  alternates: { canonical: "https://solhous.com/privacy/" },
  openGraph: {
    title: "Privacy — SolHous",
    description: "What we collect, why, and the choices you have.",
    type: "website",
    url: "https://solhous.com/privacy/",
  },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <header className="page-hero">
        <div className="sunbloom" />
        <div className="inner">
          <p className="eyebrow">SolHous · Legal · Updated July 11, 2026</p>
          <h1>
            Privacy, in
            <br />
            plain <em>language.</em>
          </h1>
          <p className="sub">
            The short version: we collect what you hand us to book a session or start a project, we
            set no tracking cookies without your OK, and we never sell your information to anyone.
          </p>
        </div>
      </header>

      <main id="main">
        <section aria-labelledby="collect-h">
          <Reveal className="block tight" id="collect">
            <p className="roll">Roll 001 · what we collect</p>
            <h2 className="big" id="collect-h">
              Only what you <em>give.</em>
            </h2>
            <p className="muted">
              When you book a session, join a waitlist, or inquire about a project through our
              forms, we receive what you type: your name, email or phone, dates, and whatever you
              tell us about the occasion. When you email us directly, we receive your email. Our
              hosting provider keeps standard server logs (IP address, browser type, pages
              requested) to keep the site running and secure. That is the whole list. We run no
              analytics and set no tracking cookies today; the only thing stored in your browser is
              your cookie choice itself.
            </p>
          </Reveal>
        </section>

        <section aria-labelledby="why-h">
          <Reveal className="block tight" id="why">
            <p className="roll">Roll 002 · why we collect it</p>
            <h2 className="big" id="why-h">
              To do the <em>work.</em>
            </h2>
            <p className="muted">
              We use your information to respond to your inquiry, hold your date, plan and deliver
              your session or project, invoice you, and keep in touch about the work you asked for.
              Nothing else. No ad targeting, no data brokers, no selling, no renting. If we ever
              want to use a photograph of you in our portfolio, that is covered by your session
              agreement, not this page — and you can always say no.
            </p>
          </Reveal>
        </section>

        <section aria-labelledby="keep-h">
          <Reveal className="block tight" id="keep">
            <p className="roll">Roll 003 · how long we keep it</p>
            <h2 className="big" id="keep-h">
              As long as the work <em>lives.</em>
            </h2>
            <p className="muted">
              Inquiry and booking details stay while we work together and for our records
              afterward, as tax and business law require. If you never become a client, ask and we
              delete your inquiry. Client galleries and project files follow the retention terms in
              your agreement.
            </p>
          </Reveal>
        </section>

        <section aria-labelledby="who-h">
          <Reveal className="block tight" id="who">
            <p className="roll">Roll 004 · who else touches it</p>
            <h2 className="big" id="who-h">
              A short <em>list.</em>
            </h2>
            <p className="muted">
              Our forms are processed by Google (Forms and Sheets) and land in our studio inbox.
              The site is hosted on Vercel. Payments, when taken online, run through Stripe — we
              never see or store your card number. Client sites under Hous Sites care plans store
              their content with Supabase. Each of these companies processes data under their own
              privacy terms, on our instructions. We add nothing to this list quietly.
            </p>
          </Reveal>
        </section>

        <section aria-labelledby="cookies-h">
          <Reveal className="block tight" id="cookies">
            <p className="roll">Roll 005 · cookies</p>
            <h2 className="big" id="cookies-h">
              Off by <em>default.</em>
            </h2>
            <p className="muted">
              We do not load analytics or trackers without your OK. Essential storage — the kind
              that remembers your cookie choice or makes a form work — is always on. You can change
              your answer anytime under Cookie Settings in the footer. If we ever add analytics, it
              loads only for visitors who accepted, and this page will say so first.
            </p>
          </Reveal>
        </section>

        <section aria-labelledby="minors-h">
          <Reveal className="block tight" id="minors">
            <p className="roll">Roll 006 · children and minors</p>
            <h2 className="big" id="minors-h">
              Guardians <em>first.</em>
            </h2>
            <p className="muted">
              This site is not directed at children, and we do not knowingly collect information
              from anyone under 18 online. We photograph graduations and proms; that information
              comes to us from a parent or guardian, and minors appear in our portfolio only with
              guardian consent in the session agreement.
            </p>
          </Reveal>
        </section>

        <section aria-labelledby="rights-h">
          <Reveal className="block tight" id="rights">
            <p className="roll">Roll 007 · your rights</p>
            <h2 className="big" id="rights-h">
              Ask, and it&rsquo;s <em>done.</em>
            </h2>
            <p className="muted">
              You can ask what we hold about you, ask us to correct it, or ask us to delete it —
              one email, no forms, no waiting period we can avoid. Depending on where you live, the
              law may give you additional rights; we honor the spirit of them regardless of your
              zip code. Write to{" "}
              <a href="mailto:studio@solhous.com?subject=Privacy%20request">studio@solhous.com</a>{" "}
              with the subject line Privacy request.
            </p>
          </Reveal>
        </section>

        <section aria-labelledby="changes-h">
          <Reveal className="block tight" id="changes">
            <p className="roll">Roll 008 · changes and contact</p>
            <h2 className="big" id="changes-h">
              If this page <em>changes.</em>
            </h2>
            <p className="muted">
              We update the date at the top and, for anything meaningful, say so plainly on this
              page. Questions belong at{" "}
              <a href="mailto:studio@solhous.com">studio@solhous.com</a> — SolHous, Greensboro,
              North Carolina.
            </p>
          </Reveal>
        </section>
      </main>

      <Footer
        line={
          <>
            Your trust is part
            <br />
            of the picture.
          </>
        }
        legal="© 2026 SolHous · Privacy policy."
      />
    </>
  );
}
