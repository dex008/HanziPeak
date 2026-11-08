import { chromium } from "playwright";

const BASE = "http://127.0.0.1:4173";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 412, height: 915 }, deviceScaleFactor: 2 });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));

await page.goto(BASE, { waitUntil: "networkidle" });
await page.getByRole("button", { name: /Just look around|Lihat-lihat dulu/ }).click();
await page.getByRole("button", { name: "HSK 2" }).click();
await page.waitForTimeout(400);
await page.screenshot({ path: "shots/mobile-hsk2.png" });

const words = await page.evaluate(() =>
  Array.from(document.querySelectorAll(".unit-card .word, .unit-card li")).slice(0, 3).map((e) => e.textContent),
);
await page.getByRole("button", { name: /start|continue|mulai|lanjut/i }).first().click();
await page.waitForTimeout(500);
await page.screenshot({ path: "shots/mobile-hsk2-lesson.png" });

console.log("errors:", errors.length ? errors : "none");
console.log("second lesson words sample:", words.join(" | "));
await browser.close();
