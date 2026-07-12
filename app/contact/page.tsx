import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact — SolHous | Greensboro, NC",
  description:
    "Write to SolHous — sessions, quotes, Hous Sites, or a question about the work. Messages go straight to the studio.",
  alternates: { canonical: "https://solhous.com/contact/" },
  openGraph: {
    title: "Contact — SolHous",
    description: "Write to the studio. We read every one.",
    type: "website",
    url: "https://solhous.com/contact/",
    images: [{ url: "https://solhous.com/media/studio/studio-04.jpg" }],
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        bgImage="/media/studio/studio-04.jpg"
        eyebrow="SolHous · Contact · Greensboro NC"
        heading={
          <>
            Say the <em>word.</em>
          </>
        }
        sub="A session, a quote, a Hous Site, or a question about the work. Write to the studio and we'll write back."
      />

      <main id="main">
        <section aria-labelledby="write-h">
          <Reveal className="block" id="write">
            <p className="roll">Roll 001 · write to the studio</p>
            <h2 className="big" id="write-h">
              Tell us what
              <br />
              you have in <em>mind.</em>
            </h2>
            <p className="muted">
              Every message lands with a person, not a queue. Leave your email and we&rsquo;ll come
              back to you — usually within a couple of days.
            </p>
            <ContactForm />
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
        legal="Inquiry details you share are used only to respond to your message and are never sold or shared. © 2026 SolHous · Studio Hous."
      />
    </>
  );
}
