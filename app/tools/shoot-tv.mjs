import { chromium } from "playwright";

const BASE = "http://127.0.0.1:4173";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
await page.goto(BASE, { waitUntil: "networkidle" });
await page.getByRole("button", { name: /Just look around|Lihat-lihat dulu/ }).click();
await page.waitForTimeout(400);
await page.screenshot({ path: "shots/tv-learn.png" });

await page.getByRole("button", { name: /start|continue|mulai|lanjut/i }).first().click();
await page.waitForTimeout(500);
await page.screenshot({ path: "shots/tv-scene.png" });
await page.locator(".opt").first().click();
await page.waitForTimeout(200);
await page.getByRole("button", { name: /Learn the words|Belajar kata/ }).click();
await page.waitForTimeout(400);
await page.screenshot({ path: "shots/tv-teach.png" });
console.log("done");
await browser.close();
