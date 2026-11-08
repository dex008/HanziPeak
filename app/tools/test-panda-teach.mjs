import { chromium } from "playwright";

const BASE = "http://127.0.0.1:4173";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 412, height: 915 }, deviceScaleFactor: 2 });

await page.goto(BASE, { waitUntil: "networkidle" });
await page.getByRole("button", { name: /Just look around|Lihat-lihat dulu/ }).click();
await page.getByRole("button", { name: /start|continue|mulai|lanjut/i }).first().click();
await page.waitForTimeout(400);
await page.locator(".opt").first().click();
await page.waitForTimeout(200);
await page.getByRole("button", { name: /Learn the words|Belajar kata/ }).click();
await page.waitForTimeout(400);
await page.screenshot({ path: "shots/panda-point.png" });

await page.locator(".teach .audio").click();
await page.waitForTimeout(420);
await page.screenshot({ path: "shots/panda-talk.png" });
console.log("done");
await browser.close();
