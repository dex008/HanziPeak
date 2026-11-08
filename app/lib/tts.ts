import { Capacitor } from "@capacitor/core";

let cached: typeof import("@capacitor-community/text-to-speech") | null = null;

async function plugin() {
  if (!cached) cached = await import("@capacitor-community/text-to-speech");
  return cached;
}

/**
 * Speaks Mandarin using the phone's native TTS engine (free, offline, no API key),
 * falling back to the browser's speechSynthesis on the web build.
 */
export async function speak(text: string): Promise<void> {
  if (Capacitor.isNativePlatform()) {
    try {
      const mod = await plugin();
      await mod.TextToSpeech.stop();
      await mod.TextToSpeech.speak({
        text,
        lang: "zh-CN",
        rate: 0.8,
        pitch: 1.0,
        volume: 1.0,
      });
      return;
    } catch (err) {
      console.warn("native TTS failed", err);
    }
  }

  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "zh-CN";
    u.rate = 0.85;
    window.speechSynthesis.speak(u);
  }
}

export type VoiceStatus = "ok" | "missing" | "unknown";

export async function chineseVoiceStatus(): Promise<VoiceStatus> {
  if (!Capacitor.isNativePlatform()) return "unknown";
  try {
    const mod = await plugin();
    const result = await mod.TextToSpeech.getSupportedLanguages();
    const langs = Array.isArray(result) ? result : result.languages ?? [];
    return langs.some((l: string) => l.toLowerCase().startsWith("zh")) ? "ok" : "missing";
  } catch {
    return "unknown";
  }
}

export async function installChineseVoice(): Promise<void> {
  try {
    const mod = await plugin();
    const api = mod.TextToSpeech as unknown as { openInstall?: () => Promise<void> };
    await api.openInstall?.();
  } catch {
    /* ignore */
  }
}
