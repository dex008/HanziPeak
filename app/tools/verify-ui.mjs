import { chromium } from "playwright";
import fs from "node:fs/promises";

const BASE = process.env.BASE ?? "http://127.0.0.1:4173";
await fs.mkdir("shots", { recursive: true });

const browser = await chromium.launch({ args: ["--use-fake-ui-for-media-stream", "--use-fake-device-for-media-stream"] });
const errors = [];

const page = await browser.newPage({ viewport: { width: 412, height: 915 }, deviceScaleFactor: 2 });
page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
page.on("console", (m) => {
  if (m.type() === "error") errors.push(`console: ${m.text()}`);
});

await page.goto(BASE, { waitUntil: "networkidle" });
await page.waitForTimeout(400);
await page.screenshot({ path: "shots/mobile-welcome.png" });

// skip onboarding
await page.getByRole("button", { name: /Just look around|Lihat-lihat dulu/ }).click();
await page.waitForTimeout(300);
await page.screenshot({ path: "shots/mobile-learn.png" });

// try-one-word interaction
const tryOpts = page.locator(".options.compact .opt");
await tryOpts.nth(1).click();
await page.waitForTimeout(200);
await tryOpts.nth(0).click();
await page.waitForTimeout(200);
await page.screenshot({ path: "shots/mobile-try.png" });

// start lesson from hero
await page.getByRole("button", { name: /Let's start|Ayo mulai/ }).click();
await page.waitForTimeout(300);
await page.screenshot({ path: "shots/mobile-scene.png" });
await page.locator(".scene-q .opt").first().click();
await page.waitForTimeout(250);
await page.screenshot({ path: "shots/mobile-scene-q.png" });
await page.getByRole("button", { name: /Learn the words|Belajar kata-kata/ }).click();
await page.waitForTimeout(300);
await page.screenshot({ path: "shots/mobile-teach.png" });

await page.locator(".stroke-link").click();
await page.waitForTimeout(1300);
await page.screenshot({ path: "shots/mobile-stroke.png" });
await page.getByRole("button", { name: /Practice writing|Latihan menulis/ }).click();
await page.waitForTimeout(900);
await page.screenshot({ path: "shots/mobile-stroke-quiz.png" });
await page.locator(".stroke-modal .iconbtn").click();
await page.waitForTimeout(300);

for (let i = 0; i < 9; i++) {
  await page.getByRole("button", { name: /Got it|Paham/ }).click();
  await page.waitForTimeout(50);
}
await page.getByRole("button", { name: /Start quiz|Mulai kuis/ }).click();
await page.waitForTimeout(300);
await page.screenshot({ path: "shots/mobile-quiz.png" });

for (let i = 0; i < 15; i++) {
  const tokens = page.locator(".token-row .token:not([disabled])");
  const tokenCount = await tokens.count();
  if (tokenCount > 0) {
    for (let k = 0; k < tokenCount; k++) {
      await page.locator(".token-row .token:not([disabled])").first().click();
      await page.waitForTimeout(40);
    }
    await page.screenshot({ path: "shots/mobile-order.png" });
  } else {
    await page.locator(".opt").first().click();
  }
  await page.locator("#checkBtn").click();
  await page.waitForTimeout(80);
  await page.locator("#checkBtn").click();
  await page.waitForTimeout(80);
}

await page.waitForTimeout(400);
await page.screenshot({ path: "shots/mobile-celebrate.png" });
await page.locator(".celebrate .btn").click();
await page.waitForTimeout(300);
await page.screenshot({ path: "shots/mobile-report.png" });
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(300);
await page.screenshot({ path: "shots/mobile-account.png" });

// force cards due, then review
await page.evaluate(() => {
  const raw = JSON.parse(localStorage.getItem("hq.cards.v2") || "{}");
  for (const k of Object.keys(raw)) raw[k].due = new Date(Date.now() - 60000).toISOString();
  localStorage.setItem("hq.cards.v2", JSON.stringify(raw));
});
await page.reload({ waitUntil: "networkidle" });
await page.waitForTimeout(300);
await page.getByRole("tab", { name: /Review|Ulangi/ }).click();
await page.waitForTimeout(300);
await page.screenshot({ path: "shots/mobile-review.png" });

const cardCount = await page.evaluate(() => Object.keys(JSON.parse(localStorage.getItem("hq.cards.v2") || "{}")).length);
const progress = await page.evaluate(() => JSON.parse(localStorage.getItem("hq.progress.v3") || "{}"));

// speaking screen with a stubbed recognizer (headless has no real mic)
const speakPage = await browser.newPage({ viewport: { width: 412, height: 915 }, deviceScaleFactor: 2 });
await speakPage.addInitScript(() => {
  class FakeSR {
    lang = "";
    interimResults = false;
    maxAlternatives = 1;
    onresult = null;
    onerror = null;
    start() {
      setTimeout(() => this.onresult?.({ results: [[{ transcript: "你好" }]] }), 200);
    }
  }
  // @ts-expect-error test stub
  window.SpeechRecognition = FakeSR;
});
speakPage.on("pageerror", (e) => errors.push(`speak pageerror: ${e.message}`));
await speakPage.goto(BASE, { waitUntil: "networkidle" });
await speakPage.waitForTimeout(300);
await speakPage.getByRole("button", { name: /Just look around|Lihat-lihat dulu/ }).click();
await speakPage.waitForTimeout(200);
await speakPage.getByRole("tab", { name: /Speak|Ucapkan/ }).click();
await speakPage.waitForTimeout(300);
await speakPage.screenshot({ path: "shots/mobile-speak.png" });
await speakPage.locator(".mic").click();
await speakPage.waitForTimeout(700);
await speakPage.screenshot({ path: "shots/mobile-speak-score.png" });
await speakPage.locator(".tone-actions .btn").click();
await speakPage.waitForTimeout(4200);
await speakPage.screenshot({ path: "shots/mobile-tone.png" });

const desk = await browser.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 2 });
desk.on("pageerror", (e) => errors.push(`desktop pageerror: ${e.message}`));
await desk.goto(BASE, { waitUntil: "networkidle" });
await desk.waitForTimeout(400);
await desk.getByRole("button", { name: /Just look around|Lihat-lihat dulu/ }).click();
await desk.waitForTimeout(300);
await desk.screenshot({ path: "shots/desktop-learn.png" });

console.log("cards:", cardCount, "lessons:", Object.keys(progress.lessons ?? {}).length, "xp:", progress.xp, "todayXp:", progress.todayXp);
console.log(errors.length ? `ERRORS:\n${errors.join("\n")}` : "no console errors");
await browser.close();
