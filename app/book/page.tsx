import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Footer } from "@/components/Footer";
import { BookingRequestForm } from "@/components/BookingRequestForm";

export const metadata: Metadata = {
  title: "Book — SolHous | Greensboro, NC",
  description:
    "Request a session, event, or Hous Sites Blueprint. We confirm your date and, where a deposit holds it, send you the way to pay.",
  alternates: { canonical: "https://solhous.com/book/" },
  openGraph: {
    title: "Book — SolHous",
    description: "Request a date. We confirm first.",
    type: "website",
    url: "https://solhous.com/book/",
    images: [{ url: "https://solhous.com/media/studio/studio-06.jpg" }],
  },
};

export default function BookPage() {
  return (
    <>
      <PageHero
        bgImage="/media/studio/studio-06.jpg"
        eyebrow="SolHous · Book · Greensboro NC"
        heading={
          <>
            Hold the <em>date.</em>
          </>
        }
        sub="A session, an event, or a Hous Sites Blueprint. Tell us what you have in mind and when — we confirm first, then hold it."
      />
      <main id="main">
        <section aria-labelledby="book-h">
          <Reveal className="block" id="book">
            <p className="roll">Roll 001 · request a date</p>
            <h2 className="big" id="book-h">
              Tell us the when,
              <br />
              we&rsquo;ll hold the <em>where.</em>
            </h2>
            <p className="muted">
              This is a request, not a charge. We confirm the date first. For sessions and the
              Blueprint, a deposit holds it — we&rsquo;ll send you the way to pay once we&rsquo;ve
              confirmed.
            </p>
            <BookingRequestForm />
          </Reveal>
        </section>
      </main>
      <Footer
        line={
          <>
            One Hous. Many rooms.
            <br />
            Every door open.
          </>
        }
        legal="Inquiry details you share are used only to arrange your booking and are never sold or shared. © 2026 SolHous · Studio Hous."
      />
    </>
  );
}
