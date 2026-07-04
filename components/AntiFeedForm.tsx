"use client";

import { useState } from "react";

export function AntiFeedForm() {
  const [values, setValues] = useState({
    name: "",
    craft: "",
    city: "",
    link: "",
    why: "",
    contact: "",
  });
  const [err, setErr] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [bodyText, setBodyText] = useState("");
  const [copied, setCopied] = useState(false);

  function set(field: keyof typeof values, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
  }

  function fail(message: string, fieldId: string) {
    setErr(message);
    document.getElementById(fieldId)?.focus();
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const name = values.name.trim();
    const contact = values.contact.trim();
    const link = values.link.trim();

    if (!name) {
      fail("A name so we know whose work we're looking at.", "af_name");
      return;
    }
    if (!link) {
      fail("A link to the work — the work is the whole conversation.", "af_link");
      return;
    }
    if (!contact) {
      fail("An email or phone so we can tell you when you're selected.", "af_contact");
      return;
    }
    setErr("");

    const craft = values.craft.trim();
    const city = values.city.trim();
    const why = values.why.trim();
    const body =
      `Name: ${name}\nWhat they make: ${craft}\nCity: ${city}\nThe work: ${link}\n\n` +
      `The frame they'd lead with, and why:\n${why}\n\nReach them: ${contact}`;
    const href = `mailto:studio@solhous.com?subject=${encodeURIComponent(
      "Anti-Feed — submission — " + name
    )}&body=${encodeURIComponent("Anti-Feed submission\n\n" + body)}`;

    setBodyText("Anti-Feed submission\n\n" + body);
    setShowConfirm(true);
    location.href = href;
  }

  function copySubmission() {
    navigator.clipboard?.writeText(bodyText).then(() => setCopied(true));
  }

  return (
    <form className="fform" id="afform" noValidate onSubmit={handleSubmit}>
      <label htmlFor="af_name">Your name</label>
      <input
        id="af_name"
        name="name"
        placeholder="First and last"
        autoComplete="name"
        aria-required="true"
        value={values.name}
        onChange={(e) => set("name", e.target.value)}
      />
      <label htmlFor="af_craft">What you make</label>
      <input
        id="af_craft"
        name="craft"
        placeholder="Photographer, creative director, stylist, designer…"
        autoComplete="off"
        value={values.craft}
        onChange={(e) => set("craft", e.target.value)}
      />
      <label htmlFor="af_city">City</label>
      <input
        id="af_city"
        name="city"
        placeholder="Greensboro, NC"
        autoComplete="address-level2"
        value={values.city}
        onChange={(e) => set("city", e.target.value)}
      />
      <label htmlFor="af_link">A link to the work</label>
      <input
        id="af_link"
        name="link"
        type="url"
        placeholder="Instagram, site, portfolio…"
        autoComplete="url"
        aria-required="true"
        value={values.link}
        onChange={(e) => set("link", e.target.value)}
      />
      <label htmlFor="af_why">The frame you&rsquo;d lead with, and why</label>
      <textarea
        id="af_why"
        name="why"
        placeholder="Point us at one image. Tell us what it took to make it — the decision behind it, not the settings."
        value={values.why}
        onChange={(e) => set("why", e.target.value)}
      />
      <label htmlFor="af_contact">Email or phone</label>
      <input
        id="af_contact"
        name="contact"
        placeholder="How we reach you"
        autoComplete="email"
        aria-required="true"
        value={values.contact}
        onChange={(e) => set("contact", e.target.value)}
      />
      <div className="err" id="af_err" role="alert">
        {err}
      </div>
      <div style={{ marginTop: 30 }}>
        <button type="submit" className="btn">
          Submit to the Anti-Feed ›
        </button>
      </div>
      <p className={`confirm${showConfirm ? " show" : ""}`} id="af_confirm" role="status">
        Your email app should open with everything filled in — hit send and it reaches the
        curator&rsquo;s desk. If nothing opened,{" "}
        <button type="button" className="linklike" onClick={copySubmission}>
          {copied ? "copied — " : "copy your submission"}
        </button>{" "}
        {copied ? "now " : "and "}email it to{" "}
        <a href="mailto:studio@solhous.com">studio@solhous.com</a>. Every submission gets looked at
        by a person.
      </p>
      <p className="note">
        No engagement metrics, no follower minimums. The work is the only credential we check.
      </p>
    </form>
  );
}
