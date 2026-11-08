import fs from "node:fs";

const map = {
  "h2-46": "tourist", "h2-47": "business", "h2-48": "sea", "h2-49": "intern", "h2-50": "snow",
  "h2-51": "gym", "h2-52": "zoo", "h2-53": "chopsticks", "h2-54": "dumplings", "h2-55": "toast",
  "h2-56": "climb", "h2-57": "medicine", "h2-58": "exchange", "h2-59": "money", "h2-60": "done",
  "h2-61": "weekend", "h2-62": "seasons", "h2-63": "spring", "h2-64": "autumn", "h2-65": "festival",
  "h2-66": "because", "h2-67": "others", "h2-68": "although", "h2-69": "crowd", "h2-70": "same",
  "h2-71": "time", "h2-72": "cloud", "h2-73": "cold", "h2-74": "sms", "h2-75": "week",
};

let src = fs.readFileSync("lib/scenes.ts", "utf8");
let n = 0;
for (const [id, art] of Object.entries(map)) {
  const re = new RegExp(`("${id}": \\{\\n    unit: \\d+, art: ")[^"]+(")`);
  if (re.test(src)) {
    src = src.replace(re, `$1${art}$2`);
    n++;
  } else {
    console.log("miss", id);
  }
}
fs.writeFileSync("lib/scenes.ts", src, "utf8");
console.log("replaced", n);
