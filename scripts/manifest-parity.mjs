// Confirms the site's editable-region manifest and the Panel's copy are
// byte-identical. Run before deploying either app:
//   node scripts/manifest-parity.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const siteManifest = path.join(here, "../lib/manifest.ts");
const panelManifest = path.join(here, "../../hous-panel/lib/manifest/solhous.ts");

const a = fs.readFileSync(siteManifest, "utf8");
let b;
try {
  b = fs.readFileSync(panelManifest, "utf8");
} catch {
  console.error(`✗ Panel manifest not found at ${panelManifest}`);
  process.exit(1);
}

if (a === b) {
  console.log("✓ Manifests are identical.");
} else {
  console.error("✗ Manifests differ. Copy the changed one over the other:");
  console.error(`  site:  ${siteManifest}`);
  console.error(`  panel: ${panelManifest}`);
  process.exit(1);
}
