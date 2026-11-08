import { chromium } from "playwright";

const BASE = "http://127.0.0.1:4173";
const browser = await chromium.launch({ args: ["--use-fake-ui-for-media-stream", "--use-fake-device-for-media-stream"] });
const page = await browser.newPage({ viewport: { width: 412, height: 915 }, deviceScaleFactor: 2 });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));

await page.goto(BASE, { waitUntil: "networkidle" });
await page.getByRole("button", { name: /Just look around|Lihat-lihat dulu/ }).click();
await page.getByRole("tab", { name: /Speak|Ucapkan/ }).click();
await page.waitForTimeout(400);
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(300);
await page.screenshot({ path: "shots/mobile-conv.png" });

const qa = await page.locator(".qa-card").count();
console.log("qa cards:", qa, "| errors:", errors.length ? errors : "none");
await browser.close();
