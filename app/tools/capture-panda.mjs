import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 460, height: 520 }, deviceScaleFactor: 1 });
await page.goto(pathToFileURL(path.resolve("../docs/panda-demo.html")).href);
await page.waitForTimeout(400);

const dir = path.resolve("../.tools/panda-frames");
fs.rmSync(dir, { recursive: true, force: true });
fs.mkdirSync(dir, { recursive: true });

for (let i = 0; i < 88; i++) {
  await page.screenshot({ path: path.join(dir, `f${String(i).padStart(3, "0")}.png`) });
  await page.waitForTimeout(80);
}

await browser.close();
console.log("frames:", 88);
