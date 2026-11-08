import fs from "node:fs";

const src = fs.readFileSync("lib/words.ts", "utf8");
const re = /\{ id: "(\d+)", h: "([^"]+)", p: "([^"]+)", en: "([^"]+)", idn: "([^"]+)", pos: "([^"]*)" \}/g;
const rows = [...src.matchAll(re)].map((m) => ({ id: m[1], h: m[2], p: m[3], en: m[4], idn: m[5], pos: m[6] }));

console.log("count", rows.length);
const seen = new Map();
for (const r of rows) seen.set(r.h, (seen.get(r.h) ?? 0) + 1);
console.log("duplicates", [...seen.entries()].filter(([, n]) => n > 1));

console.log("\nfallbacks:");
for (const r of rows) if (r.idn.toLowerCase() === r.en.toLowerCase()) console.log(r.h, r.en);

console.log("\nsample 120-200:");
for (const r of rows.slice(119, 200)) console.log(r.id, r.h, r.p, "|", r.en, "|", r.idn);

console.log("\nsample 200-300:");
for (const r of rows.slice(199, 300)) console.log(r.id, r.h, r.p, "|", r.en, "|", r.idn);
