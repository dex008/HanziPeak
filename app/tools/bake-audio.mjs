import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import fs from "node:fs/promises";
import path from "node:path";

const VOICE = process.env.TTS_VOICE ?? "zh-CN-XiaoxiaoNeural";
const OUT = path.join(process.cwd(), "public", "audio");

// key -> Chinese text. Keep this list in sync with lib/content.ts.
const CLIPS = [
  ["nihao", "你好"],
  ["xiexie", "谢谢"],
  ["zaijian", "再见"],
  ["duibuqi", "对不起"],
  ["qingwen", "请问"],
  ["story-1", "你好！我叫小明。"],
  ["story-2", "我是学生。"],
  ["story-3", "你呢？"],
];

async function main() {
  await fs.mkdir(OUT, { recursive: true });
  const tts = new MsEdgeTTS();
  await tts.setMetadata(VOICE, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);

  for (const [key, text] of CLIPS) {
    const { audioFilePath } = await tts.toFile(OUT, text);
    const dest = path.join(OUT, `${key}.mp3`);
    await fs.rename(audioFilePath, dest);
    const stat = await fs.stat(dest);
    console.log(`${key}.mp3  ${(stat.size / 1024).toFixed(1)} KB  ${text}`);
  }
  console.log(`\nvoice: ${VOICE}`);
}

main().catch((err) => {
  console.error("bake failed:", err);
  process.exit(1);
});
