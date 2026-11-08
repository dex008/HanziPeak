import fs from "node:fs";

const s = fs.readFileSync("lib/words2.ts", "utf8");
const rows = [...s.matchAll(/h: "([^"]+)".*?en: "([^"]+)"/g)];
rows.forEach((m, i) => console.log(`${i + 1}. ${m[1]} — ${m[2]}`));
