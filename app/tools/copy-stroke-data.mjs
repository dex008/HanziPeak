import fs from "node:fs/promises";
import path from "node:path";

const WORDS = path.resolve("lib/words.ts");
const SRC = path.resolve("node_modules/hanzi-writer-data");
const OUT = path.resolve("public/stroke");

const src = await fs.readFile(WORDS, "utf8");
const chars = new Set();
for (const m of src.matchAll(/h: "([^"]+)"/g)) {
  for (const ch of m[1]) {
    if (/[\u4e00-\u9fff]/.test(ch)) chars.add(ch);
  }
}

await fs.mkdir(OUT, { recursive: true });
let copied = 0;
let missing = 0;

for (const ch of chars) {
  const from = path.join(SRC, `${ch}.json`);
  const name = `u${ch.codePointAt(0).toString(16)}.json`;
  try {
    const data = await fs.readFile(from);
    await fs.writeFile(path.join(OUT, name), data);
    copied++;
  } catch {
    missing++;
  }
}

console.log(`characters: ${chars.size}, copied: ${copied}, missing: ${missing}`);
