import { chromium } from "playwright";

const BASE = "http://127.0.0.1:4173";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 412, height: 915 }, deviceScaleFactor: 2 });

await page.goto(BASE, { waitUntil: "networkidle" });
await page.evaluate(() => {
  localStorage.setItem(
    "hq.progress.v3",
    JSON.stringify({
      xp: 120,
      todayXp: 20,
      streak: 2,
      lastDay: "",
      lessons: { l01: { done: true, best: 12 } },
      speaking: {},
      answers: 30,
      correct: 27,
    }),
  );
  localStorage.setItem("hq.onboarded", "1");
  localStorage.removeItem("hq.lastBackup");
});
await page.reload({ waitUntil: "networkidle" });
await page.getByRole("tab", { name: /Report|Laporan/ }).click();
await page.waitForTimeout(300);
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(200);
await page.screenshot({ path: "shots/mobile-backup-nudge.png" });

const nudge = await page.getByText(/Back up your progress|Cadangkan progresmu/).count();
const downloadPromise = page.waitForEvent("download", { timeout: 5000 }).catch(() => null);
await page.getByRole("button", { name: /Back up now|Cadangkan sekarang/ }).click();
const download = await downloadPromise;
await page.waitForTimeout(400);
const stamp = await page.evaluate(() => localStorage.getItem("hq.lastBackup"));

console.log("nudge visible:", nudge, "| download:", download ? "yes" : "no", "| stamp:", Boolean(stamp));
await browser.close();
