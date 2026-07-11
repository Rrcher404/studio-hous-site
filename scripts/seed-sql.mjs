// Regenerates supabase/migrations/00004_seed_solhous.sql from content/seed.json
// so the seed file and the database seed can never drift. Run from repo root:
//   node scripts/seed-sql.mjs
import fs from "node:fs";

const TENANT = "f5ad4cdb-5e9f-4f15-ab87-c3542e14260a";
const SECRET = process.env.REVALIDATE_SECRET ?? "<set-REVALIDATE_SECRET>";
const seed = JSON.parse(fs.readFileSync("content/seed.json", "utf8"));
const esc = (s) => s.replace(/'/g, "''");

let sql = `-- Seed tenant #1: solhous.com (the dogfood tenant — internal plan).
-- site_content rows are generated from content/seed.json by scripts/seed-sql.mjs;
-- the two files are the same content by construction.

insert into clients (id, name, slug, domain, plan, status, revalidate_url, revalidate_secret)
values (
  '${TENANT}',
  'SolHous',
  'solhous',
  'solhous.com',
  'internal',
  'active',
  'https://solhous.com/api/revalidate',
  '${SECRET}'
);

`;
for (const [key, content] of Object.entries(seed)) {
  sql += `insert into site_content (client_id, section_key, content)\nvalues ('${TENANT}', '${key}', '${esc(JSON.stringify(content))}'::jsonb);\n\n`;
}
sql += `-- One inactive sample announcement to toggle from the table editor / Panel.
insert into announcements (client_id, title, body, active)
values ('${TENANT}', 'Booked through August', 'Fall dates open now — hold yours early.', false);
`;
fs.writeFileSync("supabase/migrations/00004_seed_solhous.sql", sql);
console.log(`wrote ${sql.length} bytes, ${Object.keys(seed).length} site_content rows`);
