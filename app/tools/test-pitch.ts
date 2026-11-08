import { analyzeTones } from "../lib/pitch.ts";

const RATE = 8000;

function tone1(t: number) {
  return 220;
}
function tone2(t: number) {
  return 180 + 90 * t;
}
function tone3(t: number) {
  return 210 - 60 * Math.sin(Math.PI * t);
}
function tone4(t: number) {
  return 260 - 100 * t;
}

function build(shapes: Array<(t: number) => number>, dur = 0.6) {
  const per = Math.floor(RATE * dur);
  const out = new Float32Array(per * shapes.length);
  let phase = 0;
  for (let s = 0; s < shapes.length; s++) {
    for (let i = 0; i < per; i++) {
      const t = i / per;
      const f = shapes[s](t);
      phase += (2 * Math.PI * f) / RATE;
      out[s * per + i] = 0.35 * Math.sin(phase);
    }
  }
  return out;
}

const cases = [
  { name: "correct 1-2-3-4", shapes: [tone1, tone2, tone3, tone4], pinyin: "mā má mǎ mà" },
  { name: "wrong: all flat", shapes: [tone1, tone1, tone1, tone1], pinyin: "mā má mǎ mà" },
  { name: "wrong: all falling", shapes: [tone4, tone4, tone4, tone4], pinyin: "mā má mǎ mà" },
];

for (const c of cases) {
  const samples = build(c.shapes);
  const result = analyzeTones(samples, RATE, c.pinyin);
  console.log(
    c.name,
    "score",
    result.score,
    result.syllables.map((s) => `${s.syllable}:${s.expected}/${s.detected}:${s.score}`).join(" "),
  );
}
