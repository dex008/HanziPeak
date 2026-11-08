import { chromium } from "playwright";

const BASE = "http://127.0.0.1:4173";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 412, height: 915 }, deviceScaleFactor: 2 });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));

await page.goto(BASE, { waitUntil: "networkidle" });
await page.getByRole("button", { name: /Just look around|Lihat-lihat dulu/ }).click();
await page.getByRole("tab", { name: /Report|Laporan/ }).click();
await page.waitForTimeout(300);
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(200);

const accountCard = page.locator(".card.pad", { hasText: "Account" });
const inputs = accountCard.locator("input");
await inputs.nth(0).fill("Eddy");
await inputs.nth(1).fill("1234");
await page.getByRole("button", { name: /Create account|Buat akun/ }).click();
await page.waitForTimeout(400);
await page.screenshot({ path: "shots/mobile-account.png" });

await page.getByRole("button", { name: /Sign out|Keluar/ }).click();
await page.waitForTimeout(400);
await page.screenshot({ path: "shots/mobile-lock.png" });

await page.locator(".lock-card input").fill("9999");
await page.getByRole("button", { name: /Unlock|Buka/ }).click();
await page.waitForTimeout(300);
const wrongVisible = await page.getByText(/Wrong PIN|PIN salah/).count();
await page.screenshot({ path: "shots/mobile-lock-error.png" });

await page.locator(".lock-card input").fill("1234");
await page.getByRole("button", { name: /Unlock|Buka/ }).click();
await page.waitForTimeout(400);
const lockedAfter = await page.locator(".lock-card").count();

console.log("wrong pin message:", wrongVisible, "| lock cards after correct pin:", lockedAfter);
console.log("errors:", errors.length ? errors : "none");
await browser.close();
