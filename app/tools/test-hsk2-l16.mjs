import { chromium } from "playwright";

const BASE = "http://127.0.0.1:4173";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 412, height: 915 }, deviceScaleFactor: 2 });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));

await page.goto(BASE, { waitUntil: "networkidle" });
await page.evaluate(() => {
  const lessons = {};
  for (let i = 1; i <= 30; i++) lessons[`h2-${String(i).padStart(2, "0")}`] = { done: true, best: 11 };
  localStorage.setItem("hq.progress.v3", JSON.stringify({ xp: 400, todayXp: 10, streak: 4, lastDay: "", lessons, speaking: {}, answers: 60, correct: 52 }));
  localStorage.setItem("hq.onboarded", "1");
  localStorage.setItem("hq.level", "2");
});
await page.reload({ waitUntil: "networkidle" });
await page.waitForTimeout(400);
await page.getByRole("button", { name: /continue|start|lanjut|mulai/i }).first().click();
await page.waitForTimeout(600);
await page.screenshot({ path: "shots/mobile-hsk2-l31.png" });
console.log("errors:", errors.length ? errors : "none");
await browser.close();
