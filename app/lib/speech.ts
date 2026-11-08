import { Capacitor } from "@capacitor/core";
import { SpeechRecognition } from "@capacitor-community/speech-recognition";

export type SpeechSupport = "native" | "web" | "none";

export function speechSupport(): SpeechSupport {
  if (Capacitor.isNativePlatform()) return "native";
  if (typeof window === "undefined") return "none";
  const w = window as unknown as Record<string, unknown>;
  return "SpeechRecognition" in w || "webkitSpeechRecognition" in w ? "web" : "none";
}

export async function speechAvailable(): Promise<boolean> {
  if (Capacitor.isNativePlatform()) {
    try {
      const res = await SpeechRecognition.available();
      return Boolean(res.available);
    } catch {
      return false;
    }
  }
  return speechSupport() === "web";
}

export async function requestMic(): Promise<boolean> {
  if (!Capacitor.isNativePlatform()) return true;
  try {
    const status = await SpeechRecognition.requestPermissions();
    return status.speechRecognition === "granted";
  } catch {
    return false;
  }
}

export async function listenOnce(lang = "zh-CN"): Promise<string[]> {
  if (Capacitor.isNativePlatform()) {
    const res = await SpeechRecognition.start({
      language: lang,
      maxResults: 3,
      partialResults: false,
      popup: false,
    });
    return res.matches ?? [];
  }

  return new Promise<string[]>((resolve, reject) => {
    const w = window as unknown as Record<string, unknown>;
    const Ctor = (w.SpeechRecognition ?? w.webkitSpeechRecognition) as
      | (new () => {
          lang: string;
          interimResults: boolean;
          maxAlternatives: number;
          onresult: (e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void;
          onerror: (e: { error?: string }) => void;
          start: () => void;
        })
      | undefined;
    if (!Ctor) {
      reject(new Error("unsupported"));
      return;
    }
    const rec = new Ctor();
    rec.lang = lang;
    rec.interimResults = false;
    rec.maxAlternatives = 3;
    rec.onresult = (e) => {
      const first = e.results[0];
      const out: string[] = [];
      for (let i = 0; i < first.length; i++) out.push(first[i].transcript);
      resolve(out);
    };
    rec.onerror = (e) => reject(new Error(e.error ?? "speech error"));
    rec.start();
  });
}

export function normalizeHanzi(s: string): string {
  return s.replace(/[^\u4e00-\u9fff]/g, "");
}

/**
 * Clarity score: how much of the expected sentence the recognizer actually heard.
 * This is recognition accuracy — not a tone-quality measurement.
 */
export function clarityScore(expected: string, heard: string): number {
  const e = normalizeHanzi(expected);
  const h = normalizeHanzi(heard);
  if (!h) return 0;
  if (h === e) return 100;

  const m = e.length;
  const n = h.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array<number>(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = e[i - 1] === h[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  const lcs = dp[m][n];
  return Math.round((lcs / Math.max(m, n)) * 100);
}
