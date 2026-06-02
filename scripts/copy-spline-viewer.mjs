import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = join(root, "node_modules", "@splinetool", "viewer", "build");
const destDir = join(root, "public", "spline");
const legacyFile = join(root, "public", "spline-viewer.js");

if (!existsSync(srcDir)) {
  console.warn("[copy-spline-viewer] @splinetool/viewer not installed, skipping.");
  process.exit(0);
}

mkdirSync(destDir, { recursive: true });

let count = 0;
for (const name of readdirSync(srcDir)) {
  if (!name.endsWith(".js")) continue;
  cpSync(join(srcDir, name), join(destDir, name));
  count += 1;
}

if (existsSync(legacyFile)) {
  rmSync(legacyFile);
}

console.log(`[copy-spline-viewer] Copied ${count} files to public/spline/`);
