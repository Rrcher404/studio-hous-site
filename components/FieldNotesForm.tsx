"use client";

import { useState } from "react";

export function FieldNotesForm() {
  const [values, setValues] = useState({
    name: "",
    craft: "",
    city: "",
    link: "",
    day: "",
    contact: "",
  });
  const [err, setErr] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  function set(field: keyof typeof values, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const name = values.name.trim();
    const contact = values.contact.trim();
    const link = values.link.trim();

    if (!name) {
      setErr("A name so we know who we’re talking to.");
      return;
    }
    if (!link) {
      setErr("A link to your work — it’s how we get a feel for it.");
      return;
    }
    if (!contact) {
      setErr("An email or phone so we can reach you.");
      return;
    }
    setErr("");

    const craft = values.craft.trim();
    const city = values.city.trim();
    const day = values.day.trim();
    const body =
      `Name: ${name}\nWhat they make: ${craft}\nCity: ${city}\nWork: ${link}\n\n` +
      `A working day:\n${day}\n\nReach them: ${contact}`;
    const href = `mailto:cosign@solhous.com?subject=${encodeURIComponent(
      "Field Notes — case study submission — " + name
    )}&body=${encodeURIComponent("Field Notes submission\n\n" + body)}`;

    setShowConfirm(true);
    location.href = href;
  }

  return (
    <form className="fform" id="fnform" noValidate onSubmit={handleSubmit}>
      <label htmlFor="s_name">Your name</label>
      <input
        id="s_name"
        name="name"
        placeholder="First and last"
        autoComplete="name"
        value={values.name}
        onChange={(e) => set("name", e.target.value)}
      />
      <label htmlFor="s_craft">What you make</label>
      <input
        id="s_craft"
        name="craft"
        placeholder="Photographer, muralist, producer, founder…"
        autoComplete="off"
        value={values.craft}
        onChange={(e) => set("craft", e.target.value)}
      />
      <label htmlFor="s_city">City</label>
      <input
        id="s_city"
        name="city"
        placeholder="Greensboro, NC"
        autoComplete="address-level2"
        value={values.city}
        onChange={(e) => set("city", e.target.value)}
      />
      <label htmlFor="s_link">A link to your work</label>
      <input
        id="s_link"
        name="link"
        type="url"
        placeholder="Instagram, site, portfolio…"
        autoComplete="url"
        value={values.link}
        onChange={(e) => set("link", e.target.value)}
      />
      <label htmlFor="s_day">What a working day looks like for you</label>
      <textarea
        id="s_day"
        name="day"
        placeholder="The real version. Where you start, what the hours actually hold, what you're making right now."
        value={values.day}
        onChange={(e) => set("day", e.target.value)}
      />
      <label htmlFor="s_contact">Email or phone</label>
      <input
        id="s_contact"
        name="contact"
        placeholder="How we reach you"
        autoComplete="email"
        value={values.contact}
        onChange={(e) => set("contact", e.target.value)}
      />
      <div className="err" id="s_err">
        {err}
      </div>
      <div style={{ marginTop: 30 }}>
        <button type="submit" className="btn">
          Send it to the studio ›
        </button>
      </div>
      <p className={`confirm${showConfirm ? " show" : ""}`} id="s_confirm">
        Your email app opens with everything filled in — hit send and it reaches the studio. We read
        everything. We publish when the work clears the bar.
      </p>
      <p className="note">
        No script. No volume. Studio Hous publishes when the work clears the rubric, not when the calendar
        says.
      </p>
    </form>
  );
}
