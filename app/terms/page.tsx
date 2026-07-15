import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms — SolHous",
  description:
    "The terms for using SolHous: booking and deposits, payments, the client portal, your work and ours, and how to reach us. Plain language, no fine-print traps.",
  alternates: { canonical: "https://solhous.com/terms/" },
  openGraph: {
    title: "Terms — SolHous",
    description: "Booking, deposits, payments, the portal, and your rights — in plain language.",
    type: "website",
    url: "https://solhous.com/terms/",
  },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <>
      <header className="page-hero">
        <div className="sunbloom" />
        <div className="inner">
          <p className="eyebrow">SolHous · Legal · Updated July 15, 2026</p>
          <h1>
            Terms, in
            <br />
            plain <em>language.</em>
          </h1>
          <p className="sub">
            The short version: book in good faith, a deposit holds your date, the work we deliver is
            yours to keep, and anything we promise about a specific project lives in your signed
            session agreement — this page sets the ground rules around it.
          </p>
        </div>
      </header>

      <main id="main">
        <section aria-labelledby="basics-h">
          <Reveal className="block tight" id="basics">
            <p className="roll">Roll 001 · the basics</p>
            <h2 className="big" id="basics-h">
              Using this means <em>agreeing.</em>
            </h2>
            <p className="muted">
              When you browse SolHous, submit a form, book a session, or sign in to a client portal,
              you agree to these terms. They cover the site and the services we offer through it. If
              a written agreement we both sign for a specific project ever says something different,
              that signed agreement wins for that project. We keep this page current and date it at
              the top.
            </p>
          </Reveal>
        </section>

        <section aria-labelledby="booking-h">
          <Reveal className="block tight" id="booking">
            <p className="roll">Roll 002 · bookings and deposits</p>
            <h2 className="big" id="booking-h">
              A deposit holds the <em>date.</em>
            </h2>
            <p className="muted">
              Requesting a session tells us you want the date; it is confirmed once we say so and, if
              a deposit applies, once that deposit is paid. Deposits reserve time we then turn away
              other work for, so the specific refund, reschedule, and cancellation terms for your
              booking live in your session agreement — read it before you pay. If anything about
              those terms is unclear, ask us first; we would rather answer than surprise you.
            </p>
          </Reveal>
        </section>

        <section aria-labelledby="pay-h">
          <Reveal className="block tight" id="pay">
            <p className="roll">Roll 003 · payments</p>
            <h2 className="big" id="pay-h">
              Handled by <em>Stripe.</em>
            </h2>
            <p className="muted">
              Online payments run through Stripe. Your card details go straight to them over an
              encrypted connection — we never see or store your card number. You are responsible for
              the fees quoted in your agreement, and for any taxes that apply. Receipts come from
              Stripe or from us on request.
            </p>
          </Reveal>
        </section>

        <section aria-labelledby="portal-h">
          <Reveal className="block tight" id="portal">
            <p className="roll">Roll 004 · the client portal</p>
            <h2 className="big" id="portal-h">
              Yours to <em>use.</em>
            </h2>
            <p className="muted">
              If we give you a portal login, it is for you and your project. Keep your sign-in link
              private, use the portal for its purpose, and do not try to reach another client&rsquo;s
              area or probe the system. Files we place there are for you to view and download under
              the terms of your agreement. Tell us right away if you think someone else has your
              access.
            </p>
          </Reveal>
        </section>

        <section aria-labelledby="work-h">
          <Reveal className="block tight" id="work">
            <p className="roll">Roll 005 · your work and ours</p>
            <h2 className="big" id="work-h">
              Two kinds of <em>ownership.</em>
            </h2>
            <p className="muted">
              The finished galleries and files we deliver are licensed to you as your session
              agreement spells out — that document, not this page, defines exactly how you can use
              them. The SolHous name, look, site, and the words and images we make to present our own
              work stay ours. If we would ever like to show a photograph of your session in our
              portfolio, that is covered by your session agreement, and you can always say no.
            </p>
          </Reveal>
        </section>

        <section aria-labelledby="promise-h">
          <Reveal className="block tight" id="promise">
            <p className="roll">Roll 006 · what we can and can&rsquo;t promise</p>
            <h2 className="big" id="promise-h">
              Honest <em>limits.</em>
            </h2>
            <p className="muted">
              We put real care into the work and the site, but we provide both as they are — we
              can&rsquo;t promise the site is error-free or available every second, and a creative
              service is a collaboration, not a guarantee of a specific outcome. To the extent the
              law allows, our responsibility for any claim connected to a project is limited to what
              you paid us for that project. Nothing here removes rights the law gives you that
              can&rsquo;t be waived.
            </p>
          </Reveal>
        </section>

        <section aria-labelledby="changes-h">
          <Reveal className="block tight" id="changes">
            <p className="roll">Roll 007 · changes, law, and contact</p>
            <h2 className="big" id="changes-h">
              If this page <em>changes.</em>
            </h2>
            <p className="muted">
              We update the date at the top and, for anything meaningful, say so plainly. These
              terms are governed by the laws of North Carolina. Questions belong at{" "}
              <a href="mailto:studio@solhous.com?subject=Terms%20question">studio@solhous.com</a> —
              SolHous, Greensboro, North Carolina.
            </p>
          </Reveal>
        </section>
      </main>

      <Footer
        line={
          <>
            Clear terms,
            <br />
            clear work.
          </>
        }
        legal="© 2026 SolHous · Terms of service."
      />
    </>
  );
}
