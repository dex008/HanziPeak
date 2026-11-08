import fs from "node:fs";

const map = {
  "h2-16": "health",
  "h2-17": "city",
  "h2-18": "young",
  "h2-19": "exercise",
  "h2-20": "education",
  "h2-21": "shoes",
  "h2-22": "cooking",
  "h2-23": "pets2",
  "h2-24": "match",
  "h2-25": "grow",
  "h2-26": "care",
  "h2-27": "gift",
  "h2-28": "manager",
  "h2-29": "website",
  "h2-30": "sun",
  "h2-31": "fitting",
  "h2-32": "bike",
  "h2-33": "rent",
  "h2-34": "lake",
  "h2-35": "homework",
  "h2-36": "novel",
  "h2-37": "queue",
  "h2-38": "bowl",
  "h2-39": "authors",
  "h2-40": "captain",
  "h2-41": "principal",
  "h2-42": "science",
  "h2-43": "computer",
  "h2-44": "jokes",
  "h2-45": "cart",
};

let src = fs.readFileSync("lib/scenes.ts", "utf8");
let n = 0;
for (const [id, art] of Object.entries(map)) {
  const re = new RegExp(`("${id}": \\{\\n    unit: \\d+,\\n    art: ")[^"]+(")`);
  if (re.test(src)) {
    src = src.replace(re, `$1${art}$2`);
    n++;
  } else {
    console.log("miss", id);
  }
}
fs.writeFileSync("lib/scenes.ts", src, "utf8");
console.log("replaced", n);
