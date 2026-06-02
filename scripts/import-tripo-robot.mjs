/**
 * Import Tripo GLB into public/robot.glb
 *
 * Option A — Manual (recommended):
 *   1. Open https://studio.tripo3d.ai/3d-model/30796b22-265b-4fa0-8b10-8c4ae8841579
 *   2. Download → GLB
 *   3. Save as public/robot.glb
 *
 * Option B — Direct URL (if you have a download link from Tripo):
 *   node scripts/import-tripo-robot.mjs "https://your-signed-glb-url/model.glb"
 */

import fs from "fs";
import path from "path";

const TRIPO_MODEL_PAGE =
  "https://studio.tripo3d.ai/3d-model/30796b22-265b-4fa0-8b10-8c4ae8841579";
const outPath = path.join(process.cwd(), "public", "robot.glb");

const url = process.argv[2];

if (!url) {
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║  Add your Tripo robot to the portfolio                       ║
╚══════════════════════════════════════════════════════════════╝

Your model: ${TRIPO_MODEL_PAGE}

1. Open the link above (log in to Tripo if needed)
2. Click **Download** or **Export**
3. Choose **GLB** format
4. Save the file as:

   ${outPath}

5. Restart dev server:

   npm run dev:fresh

If Tripo gives you a direct .glb URL, run:

   node scripts/import-tripo-robot.mjs "PASTE_URL_HERE"
`);
  process.exit(0);
}

console.log("Downloading GLB...");
const res = await fetch(url);
if (!res.ok) {
  console.error(`Download failed: ${res.status} ${res.statusText}`);
  process.exit(1);
}

const buffer = Buffer.from(await res.arrayBuffer());
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, buffer);
console.log(`Saved ${(buffer.length / 1024 / 1024).toFixed(2)} MB → public/robot.glb`);
console.log("Run: npm run dev:fresh");
