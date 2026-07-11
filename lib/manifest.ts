/**
 * The editable-region manifest for solhous.com — the design contract behind
 * the Hous Panel. Every region listed here has (1) a seed row in
 * content/seed.json, (2) a Supabase site_content row, and (3) a component
 * binding via getContent(). Nothing outside this manifest is client-editable.
 *
 * Field conventions:
 *  - `headline` fields may contain "\n" (line break) and one *starred* phrase
 *    that renders as the gold <em> — see renderHeadline() in components/editable.
 *  - `max` is a hard character limit, enforced Panel-side and clamped on render.
 *
 * The Panel app carries a copy of this file (lib/manifest/solhous.ts).
 * Run scripts/manifest-parity.mjs before deploying either app.
 */

export type FieldSpec = {
  key: string;
  label: string;
  type: "headline" | "text";
  max: number;
};

export type ListSpec = {
  /** JSON key of the array inside the section's content blob. */
  key: string;
  label: string;
  /** Fields on each list item. Items cannot be added or removed by clients. */
  itemFields: FieldSpec[];
  /** Nested list on each item (e.g. pricing tiers inside a category). */
  itemList?: ListSpec;
};

export type SectionSpec = {
  sectionKey: string;
  page: string;
  label: string;
  fields?: FieldSpec[];
  lists?: ListSpec[];
};

const tierList: ListSpec = {
  key: "tiers",
  label: "Tiers",
  itemFields: [
    { key: "n", label: "Tier name", type: "text", max: 28 },
    { key: "small", label: "Spec line", type: "text", max: 80 },
    { key: "pr", label: "Price", type: "text", max: 12 },
  ],
};

export const MANIFEST: SectionSpec[] = [
  {
    sectionKey: "home.hero",
    page: "/",
    label: "Homepage · Hero",
    fields: [
      { key: "headline", label: "Headline", type: "headline", max: 60 },
      { key: "sub", label: "Subline", type: "text", max: 200 },
    ],
  },
  {
    sectionKey: "home.rooms",
    page: "/",
    label: "Homepage · Room cards",
    lists: [
      {
        key: "cards",
        label: "Rooms",
        itemFields: [
          { key: "k", label: "Kicker", type: "text", max: 24 },
          { key: "h", label: "Card heading", type: "text", max: 40 },
          { key: "p", label: "Card copy", type: "text", max: 160 },
        ],
      },
    ],
  },
  {
    sectionKey: "home.firstwords",
    page: "/",
    label: "Homepage · First words",
    fields: [
      { key: "quote", label: "Pull quote", type: "text", max: 240 },
      { key: "by", label: "Attribution", type: "text", max: 60 },
    ],
  },
  {
    sectionKey: "work.hero",
    page: "/work/",
    label: "Work · Hero",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text", max: 48 },
      { key: "headline", label: "Headline", type: "headline", max: 60 },
      { key: "sub", label: "Subline", type: "text", max: 200 },
    ],
  },
  {
    sectionKey: "sessions.hero",
    page: "/sessions/",
    label: "Sessions · Hero",
    fields: [
      { key: "headline", label: "Headline", type: "headline", max: 60 },
      { key: "sub", label: "Subline", type: "text", max: 240 },
    ],
  },
  {
    sectionKey: "sessions.portraits",
    page: "/sessions/",
    label: "Sessions · Portrait pricing",
    lists: [
      {
        key: "cats",
        label: "Categories",
        itemFields: [
          { key: "name", label: "Category", type: "text", max: 28 },
          { key: "season", label: "Season line", type: "text", max: 64 },
        ],
        itemList: tierList,
      },
    ],
  },
  {
    sectionKey: "sessions.property",
    page: "/sessions/",
    label: "Sessions · Property & commercial",
    lists: [
      {
        key: "cards",
        label: "Cards",
        itemFields: [
          { key: "h", label: "Heading", type: "text", max: 28 },
          { key: "p", label: "Copy", type: "text", max: 160 },
          { key: "meta", label: "Meta line", type: "text", max: 64 },
        ],
      },
    ],
  },
  {
    sectionKey: "sessions.events",
    page: "/sessions/",
    label: "Sessions · Events",
    fields: [
      { key: "intro", label: "Intro", type: "text", max: 300 },
      { key: "held", label: "Held note", type: "text", max: 280 },
    ],
    lists: [
      {
        key: "cards",
        label: "Cards",
        itemFields: [
          { key: "h", label: "Heading", type: "text", max: 32 },
          { key: "p", label: "Copy", type: "text", max: 240 },
          { key: "meta", label: "Meta line", type: "text", max: 64 },
        ],
      },
    ],
  },
  {
    sectionKey: "field-notes.hero",
    page: "/field-notes/",
    label: "Field Notes · Hero + intro",
    fields: [
      { key: "headline", label: "Headline", type: "headline", max: 60 },
      { key: "sub", label: "Subline", type: "text", max: 240 },
      { key: "intro", label: "Intro paragraph", type: "text", max: 400 },
    ],
  },
  {
    sectionKey: "direction-market.packages",
    page: "/direction-market/",
    label: "Direction Market · Packages",
    lists: [
      {
        key: "items",
        label: "Packages",
        itemFields: [
          { key: "name", label: "Name", type: "text", max: 32 },
          { key: "tier", label: "Tier · price", type: "text", max: 24 },
          { key: "pitch", label: "Pitch", type: "text", max: 200 },
        ],
      },
    ],
  },
  {
    sectionKey: "spaces.hero",
    page: "/spaces/",
    label: "Spaces · Hero",
    fields: [
      { key: "headline", label: "Headline", type: "headline", max: 80 },
      { key: "sub", label: "Subline", type: "text", max: 200 },
    ],
  },
  {
    sectionKey: "spaces.pricing",
    page: "/spaces/",
    label: "Spaces · Services & pricing",
    fields: [
      { key: "includes", label: "Includes line", type: "text", max: 120 },
      { key: "held", label: "Add-ons note", type: "text", max: 300 },
    ],
    lists: [
      {
        key: "cats",
        label: "Categories",
        itemFields: [
          { key: "name", label: "Category", type: "text", max: 28 },
          { key: "season", label: "Season line", type: "text", max: 64 },
          { key: "blurb", label: "Blurb", type: "text", max: 160 },
        ],
        itemList: tierList,
      },
    ],
  },
  {
    sectionKey: "hous-sites.position",
    page: "/hous-sites/",
    label: "Hous Sites · Position",
    fields: [
      { key: "headline", label: "Headline", type: "headline", max: 64 },
      { key: "body", label: "Body", type: "text", max: 300 },
    ],
  },
  {
    sectionKey: "hous-sites.builds",
    page: "/hous-sites/",
    label: "Hous Sites · Builds",
    fields: [{ key: "held", label: "Held note", type: "text", max: 280 }],
    lists: [
      {
        key: "cards",
        label: "Build cards",
        itemFields: [
          { key: "name", label: "Name", type: "text", max: 28 },
          { key: "season", label: "Season line", type: "text", max: 48 },
          { key: "blurb", label: "Blurb", type: "text", max: 160 },
        ],
        itemList: tierList,
      },
    ],
  },
  {
    sectionKey: "hous-sites.panel",
    page: "/hous-sites/",
    label: "Hous Sites · The Panel",
    fields: [
      { key: "headline", label: "Headline", type: "headline", max: 64 },
      { key: "body", label: "Body", type: "text", max: 400 },
      { key: "promise", label: "Promise line", type: "text", max: 80 },
      { key: "promiseBy", label: "Promise attribution", type: "text", max: 48 },
    ],
  },
  {
    sectionKey: "hous-sites.care",
    page: "/hous-sites/",
    label: "Hous Sites · Care",
    fields: [{ key: "held", label: "Held note", type: "text", max: 280 }],
    lists: [
      {
        key: "cards",
        label: "Care cards",
        itemFields: [
          { key: "h", label: "Heading", type: "text", max: 28 },
          { key: "p", label: "Copy", type: "text", max: 240 },
          { key: "meta", label: "Meta line", type: "text", max: 64 },
        ],
      },
    ],
  },
];

export const SECTION_KEYS = MANIFEST.map((s) => s.sectionKey);
