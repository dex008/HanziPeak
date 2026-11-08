/**
 * Builds app/lib/words2.ts: 150 HSK 2 words not already taught in HSK 1.
 * Source: jelleverheyen/hsk-vocabulary (MIT), wordlists/exclusive/new/2.json.
 */
import fs from "node:fs/promises";
import path from "node:path";

const RAW = path.resolve("../.tools/hsk2.json");
const WORDS1 = path.resolve("lib/words.ts");
const OUT = path.resolve("lib/words2.ts");
const CACHE = path.resolve("../.tools/id2-cache.json");
const TARGET = 600;

/** Concrete words that should be taught first (lessons 1–5). */
const PRIORITY2 = [
  "公司", "事情", "问题", "计划", "机会", "帮助", "生活", "感觉", "参加", "完成",
  "店", "服务", "米", "面", "药", "酒", "红", "黑", "漂亮", "可爱",
  "家庭", "照片", "音乐", "故事", "银行", "声音", "眼睛", "脸", "头", "边",
  "快乐", "开心", "哭", "感到", "想到", "相信", "接受", "安全", "交", "收",
  "停", "换", "选", "讲", "懂", "离开", "发现", "出现", "道", "近",
];

const raw = JSON.parse(await fs.readFile(RAW, "utf8"));
const words1 = await fs.readFile(WORDS1, "utf8");
const used = new Set([...words1.matchAll(/h: "([^"]+)"/g)].map((m) => m[1]));

const seen = new Set();
const entries = raw
  .filter((e) => {
    const h = e.simplified;
    if (!h || used.has(h) || seen.has(h)) return false;
    const form = e.forms?.find((f) => f.transcriptions?.pinyin && f.meanings?.length);
    if (!form) return false;
    seen.add(h);
    return true;
  })
  .map((e) => ({
    h: e.simplified,
    form: e.forms.find((f) => f.transcriptions?.pinyin && f.meanings?.length),
    q: e.frequency ?? 1e9,
    pos: e.pos ?? [],
  }))
  .sort((a, b) => {
    const pa = PRIORITY2.indexOf(a.h);
    const pb = PRIORITY2.indexOf(b.h);
    if (pa >= 0 || pb >= 0) {
      if (pa < 0) return 1;
      if (pb < 0) return -1;
      return pa - pb;
    }
    const rank = (x) =>
      x.pos.some((p) => ["n", "v", "a"].includes(p))
        ? 0
        : x.pos.some((p) => ["t", "f", "q", "m"].includes(p))
          ? 1
          : 2;
    return rank(a) - rank(b) || a.q - b.q;
  })
  .slice(0, TARGET);

let cache = {};
try {
  cache = JSON.parse(await fs.readFile(CACHE, "utf8"));
} catch {
  cache = {};
}

async function translate(text) {
  if (cache[text]) return cache[text];
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|id`;
  const res = await fetch(url);
  const json = await res.json();
  const out = json?.responseData?.translatedText;
  if (!out || /MYMEMORY WARNING/i.test(out)) throw new Error("translate failed");
  cache[text] = out;
  return out;
}

function tidy(text, hanzi) {
  let s = String(text || "").replace(/\s+/g, " ").trim();
  s = s.replace(/\(.*?\)/g, "").trim();
  if (s.length > 54) s = s.slice(0, 52).trim() + "…";
  return s || hanzi;
}

const OVERRIDES = {
  啊: { en: "ah; oh (particle)", idn: "ah; oh (partikel)" },
  让: { en: "to let; to allow", idn: "membiarkan; mengizinkan" },
  但: { en: "but; however", idn: "tetapi" },
  得: { en: "to get; must; particle", idn: "mendapat; harus" },
  为: { en: "for; to be; because of", idn: "untuk; menjadi" },
  已经: { en: "already", idn: "sudah" },
  这样: { en: "this way; like this", idn: "seperti ini" },
  如果: { en: "if", idn: "jika" },
  因为: { en: "because", idn: "karena" },
  又: { en: "again; also", idn: "lagi; juga" },
  只: { en: "only", idn: "hanya" },
  问题: { en: "question; problem", idn: "pertanyaan; masalah" },
  它: { en: "it", idn: "itu; benda" },
  但是: { en: "but; however", idn: "tetapi" },
  该: { en: "should; ought to", idn: "seharusnya" },
  更: { en: "more; even more", idn: "lebih" },
  药: { en: "medicine", idn: "obat" },
  留: { en: "to stay; to keep", idn: "tinggal; menyimpan" },
  卡: { en: "card; to be stuck", idn: "kartu; macet" },
  辆: { en: "classifier for vehicles", idn: "penghitung kendaraan" },
  算: { en: "to count; to consider", idn: "menghitung; dianggap" },
  办: { en: "to do; to handle", idn: "mengurus" },
  过来: { en: "to come over", idn: "datang ke sini" },
  带来: { en: "to bring", idn: "membawa" },
  懂: { en: "to understand", idn: "mengerti" },
  开心: { en: "happy", idn: "senang" },
  米: { en: "uncooked rice", idn: "beras" },
  面: { en: "noodles; face", idn: "mi; wajah" },
  红: { en: "red", idn: "merah" },
  黑: { en: "black", idn: "hitam" },
  故事: { en: "story", idn: "cerita" },
  眼: { en: "eye", idn: "mata" },
  道: { en: "road; path", idn: "jalan" },
  近: { en: "near; close", idn: "dekat" },
  加: { en: "to add", idn: "menambah" },
  生: { en: "to be born; raw", idn: "lahir; mentah" },
  组: { en: "group; to organise", idn: "kelompok" },
  提: { en: "to carry; to mention", idn: "membawa; menyebut" },
  度: { en: "degree; to spend (time)", idn: "derajat; melewatkan" },
  怕: { en: "to fear; afraid", idn: "takut" },
  离: { en: "to leave; away from", idn: "meninggalkan" },
  黑2: { en: "", idn: "" },
  当: { en: "to be; to serve as", idn: "menjadi; ketika" },
  向: { en: "towards; direction", idn: "ke arah" },
  带: { en: "to bring; belt", idn: "membawa; sabuk" },
  成: { en: "to become; to succeed", idn: "menjadi; berhasil" },
  周: { en: "week", idn: "minggu" },
  全: { en: "all; whole", idn: "seluruh" },
  结果: { en: "result", idn: "hasil" },
  长: { en: "long; to grow", idn: "panjang; tumbuh" },
  队: { en: "team; queue", idn: "tim; antre" },
  克: { en: "gram; to overcome", idn: "gram; mengatasi" },
  组: { en: "group; to organise", idn: "kelompok" },
  生: { en: "raw; to be born", idn: "mentah; lahir" },
  套: { en: "set (classifier)", idn: "set" },
  挺: { en: "quite; to stand straight", idn: "cukup; tegak" },
  倒: { en: "to fall; to pour", idn: "jatuh; menuang" },
  数: { en: "number; to count", idn: "angka; menghitung" },
  度: { en: "degree; to spend (time)", idn: "derajat; melewatkan" },
  发: { en: "to send; to issue", idn: "mengirim" },
  弄: { en: "to do; to make", idn: "membuat; mengerjakan" },
  满: { en: "full", idn: "penuh" },
  查: { en: "to check; to look up", idn: "memeriksa" },
  假: { en: "fake; holiday", idn: "palsu; libur" },
  海: { en: "sea; ocean", idn: "laut" },
  称: { en: "to weigh; to be called", idn: "menimbang; disebut" },
  鱼: { en: "fish", idn: "ikan" },
  节: { en: "festival; section", idn: "festival; bagian" },
  船: { en: "boat; ship", idn: "kapal" },
  遍: { en: "time (classifier)", idn: "kali (penghitung)" },
  表: { en: "watch; table", idn: "jam tangan; tabel" },
  重点: { en: "key point; to focus on", idn: "poin utama" },
  蛋: { en: "egg", idn: "telur" },
  科: { en: "subject; science", idn: "bidang; sains" },
  占: { en: "to occupy; to account for", idn: "menempati" },
  词: { en: "word", idn: "kata" },
  鸟: { en: "bird", idn: "burung" },
  蓝: { en: "blue", idn: "biru" },
  纸: { en: "paper", idn: "kertas" },
  背: { en: "back; to recite", idn: "punggung; menghafal" },
  平: { en: "flat; peace", idn: "datar; damai" },
  黄: { en: "yellow", idn: "kuning" },
  雪: { en: "snow", idn: "salju" },
  墙: { en: "wall", idn: "dinding" },
};

const rows = [];
for (const { h, form } of entries) {
  const pinyin = form.transcriptions.pinyin;
  const fix = OVERRIDES[h] ?? {};
  const en = fix.en ?? tidy(form.meanings.slice(0, 2).join("; "), h);
  let idn = fix.idn ?? "";
  if (!idn) {
    try {
      idn = tidy(await translate(form.meanings[0]), h);
    } catch {
      idn = en;
    }
  }
  rows.push({
    id: String(rows.length + 1).padStart(3, "0"),
    h,
    p: pinyin,
    en,
    idn,
    pos: (form.meanings[0] || "").slice(0, 0),
  });
  console.log(`${rows.length}/${TARGET} ${h} ${pinyin} | ${en} | ${idn}`);
}

await fs.writeFile(CACHE, JSON.stringify(cache, null, 2), "utf8");

const body = rows
  .map(
    (w) =>
      `  { id: "${w.id}", h: "${w.h}", p: "${w.p.replace(/"/g, '\\"')}", en: "${w.en.replace(/"/g, '\\"')}", idn: "${w.idn.replace(/"/g, '\\"')}", pos: "" },`,
  )
  .join("\n");

const out = `// Generated by tools/build-hsk2.mjs — HSK 2, 150 words (frequency order).
export type Word2 = { id: string; h: string; p: string; en: string; idn: string; pos: string };

export const WORDS2: Word2[] = [
${body}
];
`;

await fs.writeFile(OUT, out, "utf8");
console.log(`wrote ${rows.length} words`);
