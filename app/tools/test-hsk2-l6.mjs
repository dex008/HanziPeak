import { chromium } from "playwright";

const BASE = "http://127.0.0.1:4173";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 412, height: 915 }, deviceScaleFactor: 2 });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));

await page.goto(BASE, { waitUntil: "networkidle" });
await page.evaluate(() => {
  const lessons = {};
  for (let i = 1; i <= 5; i++) lessons[`h2-0${i}`] = { done: true, best: 11 };
  localStorage.setItem(
    "hq.progress.v3",
    JSON.stringify({ xp: 200, todayXp: 10, streak: 3, lastDay: "", lessons, speaking: {}, answers: 40, correct: 35 }),
  );
  localStorage.setItem("hq.onboarded", "1");
  localStorage.setItem("hq.level", "2");
});
await page.reload({ waitUntil: "networkidle" });
await page.waitForTimeout(400);
await page.screenshot({ path: "shots/mobile-hsk2-learn.png" });
await page.getByRole("button", { name: /continue|start|lanjut|mulai/i }).first().click();
await page.waitForTimeout(600);
await page.screenshot({ path: "shots/mobile-hsk2-l6.png" });

console.log("errors:", errors.length ? errors : "none");
await browser.close();
