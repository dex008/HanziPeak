import { chromium } from "playwright";

const BASE = process.env.BASE ?? "http://127.0.0.1:4173";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 412, height: 915 }, deviceScaleFactor: 2 });

await page.goto(BASE, { waitUntil: "networkidle" });
await page.waitForTimeout(300);
const skip = page.getByRole("button", { name: /Just look around|Lihat-lihat dulu/ });
if (await skip.count()) await skip.click();

await page.evaluate(() => {
  const lessons = {};
  for (let i = 1; i <= 29; i++) lessons[`l${String(i).padStart(2, "0")}`] = { done: true, best: 12 };
  const p = {
    xp: 300,
    todayXp: 20,
    streak: 3,
    lastDay: "",
    lessons,
    speaking: {},
    answers: 40,
    correct: 34,
  };
  localStorage.setItem("hq.progress.v3", JSON.stringify(p));
  localStorage.setItem("hq.onboarded", "1");
});
await page.reload({ waitUntil: "networkidle" });
await page.waitForTimeout(300);

for (let i = 1; i <= 30; i++) {
  await page.getByRole("tab", { name: /Learn|Belajar/ }).click();
  await page.waitForTimeout(200);
  await page.locator(`[aria-label="Lesson ${i}"]`).click();
  await page.waitForTimeout(300);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForTimeout(300);
  await page.screenshot({ path: `shots/scene-l0${i}.png` });
}

console.log("done");
await browser.close();
