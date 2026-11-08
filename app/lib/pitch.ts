/**
 * On-device tone feedback: record, extract F0 contour, compare each syllable's
 * shape with the expected tone (1–4). This is a heuristic trainer, not a
 * certificate-grade pronunciation score.
 */

const TONE_MARKS: Record<string, number> = {
  ā: 1, á: 2, ǎ: 3, à: 4,
  ē: 1, é: 2, ě: 3, è: 4,
  ī: 1, í: 2, ǐ: 3, ì: 4,
  ō: 1, ó: 2, ǒ: 3, ò: 4,
  ū: 1, ú: 2, ǔ: 3, ù: 4,
  ǖ: 1, ǘ: 2, ǚ: 3, ǜ: 4,
};

export function syllables(pinyin: string): string[] {
  return pinyin
    .replace(/[?!.,;:]/g, " ")
    .split(/\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function toneOf(syllable: string): number {
  for (const ch of syllable.normalize("NFC")) {
    const tone = TONE_MARKS[ch];
    if (tone) return tone;
  }
  return 5;
}

type Frame = { hz: number | null; rms: number; t: number };

function downsample(samples: Float32Array, sampleRate: number) {
  const factor = Math.max(1, Math.floor(sampleRate / 8000));
  const out = new Float32Array(Math.floor(samples.length / factor));
  for (let i = 0; i < out.length; i++) out[i] = samples[i * factor];
  return { data: out, rate: sampleRate / factor };
}

function detectPitch(frame: Float32Array, rate: number): number | null {
  let rms = 0;
  for (let i = 0; i < frame.length; i++) rms += frame[i] * frame[i];
  rms = Math.sqrt(rms / frame.length);
  if (rms < 0.012) return null;

  const minLag = Math.floor(rate / 500);
  const maxLag = Math.min(Math.floor(rate / 60), frame.length - 1);
  let bestLag = -1;
  let best = -1;

  for (let lag = minLag; lag <= maxLag; lag++) {
    let sum = 0;
    for (let i = 0; i < frame.length - lag; i++) sum += frame[i] * frame[i + lag];
    if (sum > best) {
      best = sum;
      bestLag = lag;
    }
  }
  if (bestLag < 0 || best <= 0) return null;
  const hz = rate / bestLag;
  return hz >= 60 && hz <= 500 ? hz : null;
}

function median(values: number[]): number {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)];
}

function toSemitones(hz: number, ref: number): number {
  return 12 * Math.log2(hz / ref);
}

export type ToneResult = {
  score: number;
  contour: number[];
  syllables: Array<{
    syllable: string;
    expected: number;
    detected: string;
    score: number;
  }>;
};

function shapeLabel(delta: number, dip: number): string {
  if (dip > 1.2) return "dip";
  if (delta > 1.2) return "rise";
  if (delta < -1.2) return "fall";
  return "flat";
}

export function analyzeTones(
  samples: Float32Array,
  sampleRate: number,
  pinyin: string,
): ToneResult {
  const syls = syllables(pinyin);
  const { data, rate } = downsample(samples, sampleRate);

  const window = 512;
  const hop = 160;
  const frames: Frame[] = [];
  for (let start = 0; start + window < data.length; start += hop) {
    const chunk = data.subarray(start, start + window);
    let rms = 0;
    for (let i = 0; i < chunk.length; i++) rms += chunk[i] * chunk[i];
    rms = Math.sqrt(rms / chunk.length);
    frames.push({ hz: detectPitch(chunk, rate), rms, t: start / rate });
  }

  const voiced = frames.filter((f) => f.hz !== null && f.rms > 0.012);
  if (voiced.length < 6 || syls.length === 0) {
    return { score: 0, contour: [], syllables: [] };
  }

  const ref = median(voiced.map((f) => f.hz as number));
  const semis = voiced.map((f) => toSemitones(f.hz as number, ref));

  // light smoothing (3-frame moving average)
  const smooth = semis.map((_, i) => {
    const a = semis[Math.max(0, i - 1)];
    const b = semis[i];
    const c = semis[Math.min(semis.length - 1, i + 1)];
    return (a + b + c) / 3;
  });

  const n = syls.length;
  const per = Math.max(1, Math.floor(smooth.length / n));
  const results: ToneResult["syllables"] = [];

  for (let i = 0; i < n; i++) {
    const chunk = smooth.slice(i * per, Math.min(smooth.length, (i + 1) * per));
    if (chunk.length < 3) {
      results.push({ syllable: syls[i], expected: toneOf(syls[i]), detected: "—", score: 0 });
      continue;
    }
    const half = Math.floor(chunk.length / 2);
    const startMean = chunk.slice(0, Math.max(1, Math.floor(chunk.length / 4))).reduce((a, b) => a + b, 0) /
      Math.max(1, Math.floor(chunk.length / 4));
    const endMean = chunk.slice(-Math.max(1, Math.floor(chunk.length / 4))).reduce((a, b) => a + b, 0) /
      Math.max(1, Math.floor(chunk.length / 4));
    const mid = chunk.slice(half - 1, half + 1);
    const minMid = Math.min(...mid);
    const dip = Math.min(0, minMid - Math.min(startMean, endMean));
    const delta = endMean - startMean;
    const expected = toneOf(syls[i]);
    const detected = shapeLabel(delta, -dip);

    let score = 40;
    if (expected === 1) score = Math.max(0, 100 - Math.abs(delta) * 30);
    else if (expected === 2) score = Math.max(0, Math.min(100, 50 + delta * 22));
    else if (expected === 3) score = Math.max(0, Math.min(100, 50 + -dip * 30));
    else if (expected === 4) score = Math.max(0, Math.min(100, 50 - delta * 22));

    results.push({
      syllable: syls[i],
      expected,
      detected,
      score: Math.round(expected === 5 ? 70 : score),
    });
  }

  const scored = results.filter((r) => r.expected !== 5);
  const overall = scored.length
    ? Math.round(scored.reduce((a, b) => a + b.score, 0) / scored.length)
    : 0;

  return { score: overall, contour: smooth, syllables: results };
}

export async function recordSamples(ms = 2600): Promise<{ samples: Float32Array; sampleRate: number }> {
  if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
    throw new Error("unsupported");
  }
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const rec = new MediaRecorder(stream);
  const chunks: Blob[] = [];
  rec.ondataavailable = (e) => {
    if (e.data.size) chunks.push(e.data);
  };
  rec.start();
  await new Promise((r) => setTimeout(r, ms));
  const stopped = new Promise<void>((resolve) => {
    rec.onstop = () => resolve();
  });
  rec.stop();
  await stopped;
  stream.getTracks().forEach((t) => t.stop());

  const blob = new Blob(chunks, { type: rec.mimeType || "audio/webm" });
  const buffer = await blob.arrayBuffer();
  const ctx = new AudioContext();
  const audio = await ctx.decodeAudioData(buffer);
  const samples = audio.getChannelData(0).slice();
  const sampleRate = audio.sampleRate;
  await ctx.close();
  return { samples, sampleRate };
}
