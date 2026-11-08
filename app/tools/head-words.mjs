import fs from "node:fs";

const src = fs.readFileSync("lib/words.ts", "utf8");
const re = /\{ id: "(\d+)", h: "([^"]+)", p: "([^"]+)", en: "([^"]+)", idn: "([^"]+)"/g;
const rows = [...src.matchAll(re)].map((m) => ({ id: m[1], h: m[2], p: m[3], en: m[4] }));

for (let lesson = 0; lesson < 30; lesson++) {
  const slice = rows.slice(lesson * 10, lesson * 10 + 10);
  console.log(`L${lesson + 1}:`, slice.map((r) => `${r.h}(${r.p})`).join(" · "));
}
