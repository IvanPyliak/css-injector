// Copies static, non-compiled files into dist/ so it is a self-contained
// extension folder that can be loaded unpacked into Chrome.
import { cp, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const files = [
  ["manifest.json", "dist/manifest.json"],
  ["src/popup/popup.html", "dist/popup/popup.html"],
  ["src/popup/popup.css", "dist/popup/popup.css"],
];

for (const [src, dest] of files) {
  const destPath = path.join(root, dest);
  await mkdir(path.dirname(destPath), { recursive: true });
  await cp(path.join(root, src), destPath);
}

console.log("Copied static assets to dist/");
