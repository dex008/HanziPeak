/**
 * Builds app/lib/words.ts for the HSK 1 course.
 *
 * - The first 100 words are hand-written (correct reading + gloss), ordered for teaching.
 * - The remaining 200 come from the HSK 3.0 level-1 dataset (frequency-ranked, best form
 *   selected automatically) with Indonesian glosses from MyMemory + overrides.
 *
 * Source: https://github.com/jelleverheyen/hsk-vocabulary (MIT), built on
 * elkmovie/hsk30 + CC-CEDICT.
 */
import fs from "node:fs/promises";
import path from "node:path";

const RAW = path.resolve("../.tools/hsk1.json");
const CACHE = path.resolve("../.tools/id-cache.json");
const OUT = path.resolve("lib/words.ts");
const TARGET = 300;

const MORPHEME_ONLY = new Set(["g", "ag", "dg", "mg", "ng", "rg", "tg", "vg", "w", "o", "k", "h"]);

/** Hand-written core: greetings, pronouns, particles, numbers, time, food, verbs. */
const CORE = [
  ["你好", "nǐ hǎo", "hello", "halo"],
  ["谢谢", "xièxie", "thank you", "terima kasih"],
  ["再见", "zàijiàn", "goodbye", "sampai jumpa"],
  ["对不起", "duìbuqǐ", "sorry", "maaf"],
  ["没关系", "méi guānxi", "it's okay", "tidak apa-apa"],
  ["请", "qǐng", "please", "silakan"],
  ["请问", "qǐngwèn", "excuse me, may I ask", "permisi"],
  ["我", "wǒ", "I; me", "saya"],
  ["你", "nǐ", "you", "kamu"],
  ["他", "tā", "he; him", "dia"],
  ["她", "tā", "she; her", "dia"],
  ["我们", "wǒmen", "we; us", "kami"],
  ["这", "zhè", "this", "ini"],
  ["那", "nà", "that", "itu"],
  ["谁", "shéi", "who", "siapa"],
  ["什么", "shénme", "what", "apa"],
  ["哪", "nǎ", "which", "mana"],
  ["怎么", "zěnme", "how", "bagaimana"],
  ["多少", "duōshao", "how many; how much", "berapa"],
  ["几", "jǐ", "how many", "berapa"],
  ["是", "shì", "to be", "adalah"],
  ["不", "bù", "not", "tidak"],
  ["很", "hěn", "very", "sangat"],
  ["太", "tài", "too; excessively", "terlalu"],
  ["都", "dōu", "all; both", "semua"],
  ["也", "yě", "also", "juga"],
  ["和", "hé", "and", "dan"],
  ["的", "de", "possessive particle", "partikel milik"],
  ["了", "le", "particle (completed action)", "partikel"],
  ["吗", "ma", "question particle", "partikel tanya"],
  ["呢", "ne", "question particle", "partikel"],
  ["个", "gè", "classifier (measure word)", "classifier"],
  ["有", "yǒu", "to have", "punya"],
  ["在", "zài", "at; in", "di"],
  ["会", "huì", "can; to be able to", "bisa"],
  ["能", "néng", "can; to be able to", "bisa"],
  ["想", "xiǎng", "to want; to think", "ingin"],
  ["要", "yào", "to want; will", "ingin"],
  ["去", "qù", "to go", "pergi"],
  ["来", "lái", "to come", "datang"],
  ["吃", "chī", "to eat", "makan"],
  ["喝", "hē", "to drink", "minum"],
  ["看", "kàn", "to look; to watch", "melihat"],
  ["听", "tīng", "to listen", "mendengar"],
  ["说", "shuō", "to speak; to say", "berbicara"],
  ["读", "dú", "to read", "membaca"],
  ["写", "xiě", "to write", "menulis"],
  ["买", "mǎi", "to buy", "membeli"],
  ["卖", "mài", "to sell", "menjual"],
  ["做", "zuò", "to do; to make", "melakukan"],
  ["坐", "zuò", "to sit", "duduk"],
  ["住", "zhù", "to live; to stay", "tinggal"],
  ["开", "kāi", "to open", "membuka"],
  ["关", "guān", "to close", "menutup"],
  ["问", "wèn", "to ask", "bertanya"],
  ["走", "zǒu", "to walk", "berjalan"],
  ["回", "huí", "to return", "kembali"],
  ["好", "hǎo", "good", "baik"],
  ["大", "dà", "big", "besar"],
  ["小", "xiǎo", "small", "kecil"],
  ["多", "duō", "many; much", "banyak"],
  ["少", "shǎo", "few; little", "sedikit"],
  ["热", "rè", "hot", "panas"],
  ["冷", "lěng", "cold", "dingin"],
  ["人", "rén", "person", "orang"],
  ["叫", "jiào", "to be called", "bernama"],
  ["名字", "míngzi", "name", "nama"],
  ["朋友", "péngyou", "friend", "teman"],
  ["老师", "lǎoshī", "teacher", "guru"],
  ["学生", "xuésheng", "student", "pelajar"],
  ["学校", "xuéxiào", "school", "sekolah"],
  ["中国", "Zhōngguó", "China", "Tiongkok"],
  ["北京", "Běijīng", "Beijing", "Beijing"],
  ["今天", "jīntiān", "today", "hari ini"],
  ["明天", "míngtiān", "tomorrow", "besok"],
  ["昨天", "zuótiān", "yesterday", "kemarin"],
  ["现在", "xiànzài", "now", "sekarang"],
  ["时候", "shíhou", "time; moment", "waktu"],
  ["分钟", "fēnzhōng", "minute", "menit"],
  ["年", "nián", "year", "tahun"],
  ["月", "yuè", "month", "bulan"],
  ["星期", "xīngqī", "week", "minggu"],
  ["点", "diǎn", "o'clock; point", "jam"],
  ["块", "kuài", "yuan (currency)", "yuan"],
  ["钱", "qián", "money", "uang"],
  ["书", "shū", "book", "buku"],
  ["水", "shuǐ", "water", "air"],
  ["茶", "chá", "tea", "teh"],
  ["米饭", "mǐfàn", "cooked rice", "nasi"],
  ["菜", "cài", "dish; vegetable", "hidangan"],
  ["苹果", "píngguǒ", "apple", "apel"],
  ["猫", "māo", "cat", "kucing"],
  ["狗", "gǒu", "dog", "anjing"],
  ["家", "jiā", "home; family", "rumah"],
  ["电话", "diànhuà", "telephone", "telepon"],
  ["电脑", "diànnǎo", "computer", "komputer"],
  ["电视", "diànshì", "television", "televisi"],
  ["电影", "diànyǐng", "film; movie", "film"],
  ["飞机", "fēijī", "airplane", "pesawat"],
  ["医生", "yīshēng", "doctor", "dokter"],
  ["天气", "tiānqì", "weather", "cuaca"],
];

/** Conversation-first order for unit 1 (lessons 1–5). */
const CORE_ORDER = [
  // lesson 1 — greetings
  "你好", "我", "你", "是", "吗", "好", "很", "谢谢", "再见", "不",
  // lesson 2 — people & introductions
  "他", "她", "谁", "什么", "这", "那", "叫", "名字", "朋友", "学生",
  // lesson 3 — school & identity
  "老师", "学校", "中国", "人", "我们", "的", "也", "都", "有", "在",
  // lesson 4 — polite requests
  "请", "请问", "对不起", "没关系", "个", "会", "能", "想", "要", "去",
  // lesson 5 — actions
  "来", "吃", "喝", "看", "听", "说", "读", "写", "买", "卖",
];

/** Conversation-first order for lessons 11–15 (tail words). */
const TAIL_ORDER = [
  // lesson 11 — everyday life
  "天气", "时间", "工作", "事", "知道", "觉得", "喜欢", "爱", "新", "快",
  // lesson 12 — actions & communication
  "找", "打", "看到", "话", "用", "给", "对", "还有", "还是", "比",
  // lesson 13 — positions & movement
  "上", "下", "里", "中", "前", "后", "到", "出", "从", "跟",
  // lesson 14 — quantity & time
  "天", "两", "次", "再", "最", "等", "起来", "这些", "你们", "他们",
  // lesson 15 — particles & grammar
  "就", "一", "还", "没", "没有", "过", "着", "地", "吧", "真",
];

/** Fixes for tricky readings/glosses in the remaining 200. */
const EXTRA = {
  上: { p: "shàng", en: "on; up", idn: "atas" },
  没: { p: "méi", en: "not have; without", idn: "tidak punya" },
  里: { p: "lǐ", en: "inside", idn: "dalam" },
  等: { p: "děng", en: "to wait", idn: "menunggu" },
  次: { p: "cì", en: "time; occurrence", idn: "kali" },
  吧: { p: "ba", en: "suggestion particle", idn: "partikel saran" },
  中: { p: "zhōng", en: "middle; in", idn: "tengah" },
  出: { p: "chū", en: "to go out", idn: "keluar" },
  天: { p: "tiān", en: "day; sky", idn: "hari" },
  号: { p: "hào", en: "number", idn: "nomor" },
  半: { p: "bàn", en: "half", idn: "setengah" },
  两: { p: "liǎng", en: "two", idn: "dua" },
  零: { p: "líng", en: "zero", idn: "nol" },
  真: { p: "zhēn", en: "really", idn: "sungguh" },
  最: { p: "zuì", en: "most", idn: "paling" },
  再: { p: "zài", en: "again", idn: "lagi" },
  又: { p: "yòu", en: "again", idn: "lagi" },
  只: { p: "zhǐ", en: "only", idn: "hanya" },
  才: { p: "cái", en: "just; only then", idn: "baru" },
  已经: { p: "yǐjīng", en: "already", idn: "sudah" },
  正在: { p: "zhèngzài", en: "in the process of", idn: "sedang" },
  地: { p: "de", en: "adverbial particle", idn: "partikel" },
  得: { p: "dé", en: "to get; to obtain", idn: "mendapat" },
  着: { p: "zhe", en: "particle (ongoing state)", idn: "partikel" },
  过: { p: "guò", en: "to pass; particle (experience)", idn: "melewati" },
  给: { p: "gěi", en: "to give", idn: "memberi" },
  从: { p: "cóng", en: "from", idn: "dari" },
  到: { p: "dào", en: "to arrive", idn: "tiba" },
  对: { p: "duì", en: "correct; towards", idn: "benar" },
  用: { p: "yòng", en: "to use", idn: "memakai" },
  让: { p: "ràng", en: "to let; to allow", idn: "membiarkan" },
  还: { p: "hái", en: "still; yet", idn: "masih" },
  就: { p: "jiù", en: "then; just", idn: "lalu" },
  可以: { p: "kěyǐ", en: "can; may", idn: "boleh" },
  但是: { p: "dànshì", en: "but; however", idn: "tetapi" },
  因为: { p: "yīnwèi", en: "because", idn: "karena" },
  所以: { p: "suǒyǐ", en: "so; therefore", idn: "jadi" },
  如果: { p: "rúguǒ", en: "if", idn: "jika" },
  虽然: { p: "suīrán", en: "although", idn: "walaupun" },
  还是: { p: "háishì", en: "or", idn: "atau" },
  知道: { p: "zhīdào", en: "to know", idn: "tahu" },
  觉得: { p: "juéde", en: "to feel; to think", idn: "merasa" },
  希望: { p: "xīwàng", en: "to hope", idn: "berharap" },
  需要: { p: "xūyào", en: "to need", idn: "butuh" },
  开始: { p: "kāishǐ", en: "to start", idn: "mulai" },
  帮助: { p: "bāngzhù", en: "to help", idn: "membantu" },
  工作: { p: "gōngzuò", en: "work; job", idn: "pekerjaan" },
  学习: { p: "xuéxí", en: "to study", idn: "belajar" },
  认识: { p: "rènshi", en: "to know (someone)", idn: "mengenal" },
  喜欢: { p: "xǐhuan", en: "to like", idn: "suka" },
  爱: { p: "ài", en: "to love", idn: "cinta" },
  睡觉: { p: "shuìjiào", en: "to sleep", idn: "tidur" },
  打电话: { p: "dǎ diànhuà", en: "to make a phone call", idn: "menelepon" },
  下雨: { p: "xiàyǔ", en: "to rain", idn: "hujan" },
  下雪: { p: "xiàxuě", en: "to snow", idn: "turun salju" },
  医生: { p: "yīshēng", en: "doctor", idn: "dokter" },
  医院: { p: "yīyuàn", en: "hospital", idn: "rumah sakit" },
  出租汽车: { p: "chūzū qìchē", en: "taxi", idn: "taksi" },
  出租车: { p: "chūzūchē", en: "taxi", idn: "taksi" },
  火车: { p: "huǒchē", en: "train", idn: "kereta" },
  飞机: { p: "fēijī", en: "airplane", idn: "pesawat" },
  商店: { p: "shāngdiàn", en: "shop", idn: "toko" },
  饭店: { p: "fàndiàn", en: "restaurant; hotel", idn: "restoran" },
  学校: { p: "xuéxiào", en: "school", idn: "sekolah" },
  图书馆: { p: "túshūguǎn", en: "library", idn: "perpustakaan" },
  桌子: { p: "zhuōzi", en: "table", idn: "meja" },
  椅子: { p: "yǐzi", en: "chair", idn: "kursi" },
  杯子: { p: "bēizi", en: "cup", idn: "gelas" },
  衣服: { p: "yīfu", en: "clothes", idn: "pakaian" },
  先生: { p: "xiānsheng", en: "Mr.; husband", idn: "Tuan" },
  小姐: { p: "xiǎojiě", en: "Miss", idn: "Nona" },
  妈妈: { p: "māma", en: "mother", idn: "ibu" },
  爸爸: { p: "bàba", en: "father", idn: "ayah" },
  儿子: { p: "érzi", en: "son", idn: "anak laki-laki" },
  女儿: { p: "nǚ'ér", en: "daughter", idn: "anak perempuan" },
  后: { p: "hòu", en: "after; behind", idn: "setelah" },
  跟: { p: "gēn", en: "with; to follow", idn: "dengan" },
  打: { p: "dǎ", en: "to hit; to play", idn: "memukul" },
  话: { p: "huà", en: "words; speech", idn: "kata-kata" },
  些: { p: "xiē", en: "some", idn: "beberapa" },
  你们: { p: "nǐmen", en: "you (plural)", idn: "kalian" },
  还有: { p: "háiyǒu", en: "and also; still have", idn: "dan juga" },
  找: { p: "zhǎo", en: "to look for", idn: "mencari" },
  一起: { p: "yìqǐ", en: "together", idn: "bersama" },
  时候: { p: "shíhou", en: "time; moment", idn: "waktu" },
};

const BAD = /variant|surname|archaic|abbr\.|used in|bound form|dialect|literary|onomatopoeia/i;

function formScore(f) {
  let s = 0;
  if (BAD.test(f.m[0])) s += 4;
  if (f.m.slice(0, 2).some((m) => BAD.test(m))) s += 1;
  if (/^[A-Z]/.test(f.i.y)) s += 1.5;
  if (f.m[0].trim().startsWith("(")) s += 0.5;
  return s;
}

function pickForm(e) {
  return [...e.f].sort((a, b) => formScore(a) - formScore(b))[0];
}

function cleanGloss(m) {
  const raw = String(m || "");
  let s = raw.split(";")[0].trim();
  s = s.replace(/^to\s+/i, "").replace(/^a\s+/i, "").replace(/\s*\(.*?\)\s*/g, " ").trim();
  if (!s) {
    const inside = raw.match(/\(([^)]+)\)/);
    s = inside ? inside[1].replace(/^classifier used before.*/i, "classifier").trim() : raw.trim();
  }
  return s;
}

function pickMeaning(form) {
  return cleanGloss(form.m.find((x) => !BAD.test(x)) ?? form.m[0]);
}

const PROPER = new Set(["北京", "中国", "中文", "汉语", "上海", "长城"]);

function tidy(text, hanzi) {
  let t = String(text ?? "").trim().replace(/^\((.*)\)$/, "$1").trim();
  if (!t) return "";
  if (PROPER.has(hanzi)) return t;
  if (t === t.toUpperCase()) t = t.toLowerCase();
  return t.charAt(0).toLowerCase() + t.slice(1);
}

async function translate(text) {
  const url =
    "https://api.mymemory.translated.net/get?q=" + encodeURIComponent(text) + "&langpair=en|id";
  const res = await fetch(url, { headers: { "user-agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error(`translate ${res.status}`);
  const data = await res.json();
  const out = data?.responseData?.translatedText;
  if (!out) throw new Error("empty translation");
  await new Promise((r) => setTimeout(r, 200));
  return out;
}

async function loadCache() {
  try {
    return JSON.parse(await fs.readFile(CACHE, "utf8"));
  } catch {
    return {};
  }
}

async function main() {
  const raw = JSON.parse(await fs.readFile(RAW, "utf8"));
  const coreMap = new Map(CORE.map((w) => [w[0], w]));
  const ordered = [
    ...CORE_ORDER.map((h) => coreMap.get(h)).filter(Boolean),
    ...CORE.filter((w) => !CORE_ORDER.includes(w[0])),
  ];
  const core = ordered.map(([h, p, en, idn], i) => ({
    id: String(i + 1).padStart(3, "0"),
    h,
    p,
    en,
    idn,
    pos: "",
  }));
  const coreSet = new Set(core.map((w) => w.h));
  const seen = new Set();

  const usable = raw
    .filter((e) => {
      const form = e.f?.[0];
      if (!form?.i?.y || !form?.m?.length) return false;
      if (coreSet.has(e.s)) return false;
      if (seen.has(e.s)) return false;
      seen.add(e.s);
      const pos = e.p || [];
      if (pos.length && pos.every((p) => MORPHEME_ONLY.has(p))) return false;
      return true;
    })
    .sort((a, b) => (a.q ?? 1e9) - (b.q ?? 1e9));

  const byHanzi = new Map(usable.map((e) => [e.s, e]));
  const orderedTail = TAIL_ORDER.map((h) => byHanzi.get(h)).filter(Boolean);
  const usedTail = new Set(orderedTail.map((e) => e.s));
  const remainingTail = usable
    .filter((e) => !usedTail.has(e.s))
    .slice(0, TARGET - core.length - orderedTail.length);
  const tail = [...orderedTail, ...remainingTail];

  const cache = await loadCache();
  const rest = new Array(tail.length);

  let cursor = 0;
  async function worker() {
    while (cursor < tail.length) {
      const i = cursor++;
      const e = tail[i];
      const form = pickForm(e);
      const hanzi = e.s;
      const extra = EXTRA[hanzi] ?? {};
      const pinyin = extra.p ?? form.i.y;
      const en = extra.en ?? pickMeaning(form);

      let idn = extra.idn;
      if (!idn) {
        if (cache[en]) idn = cache[en];
        else {
          try {
            idn = await translate(en.split(";")[0].trim());
            cache[en] = idn;
          } catch {
            idn = "";
          }
        }
      }

      rest[i] = {
        id: String(core.length + i + 1).padStart(3, "0"),
        h: hanzi,
        p: pinyin,
        en,
        idn: tidy(idn || en, hanzi),
        pos: (e.p || []).slice(0, 2).join("/"),
      };
    }
  }
  await Promise.all(Array.from({ length: 6 }, worker));
  await fs.writeFile(CACHE, JSON.stringify(cache, null, 2), "utf8");

  const items = [...core, ...rest];
  const header = `// GENERATED by tools/build-content.mjs — do not edit by hand.
// HSK 1, ${items.length} words: 100 hand-written core + frequency-ranked tail
// from the HSK 3.0 list, trimmed to the 2025 syllabus size.
// Glosses machine-drafted; native review pending.
export type Word = { id: string; h: string; p: string; en: string; idn: string; pos: string };

export const WORDS: Word[] = [
`;
  const body = items
    .map(
      (w) =>
        `  { id: "${w.id}", h: ${JSON.stringify(w.h)}, p: ${JSON.stringify(w.p)}, en: ${JSON.stringify(
          w.en,
        )}, idn: ${JSON.stringify(w.idn)}, pos: ${JSON.stringify(w.pos)} },`,
    )
    .join("\n");
  await fs.writeFile(OUT, header + body + "\n];\n", "utf8");

  console.log(`wrote ${items.length} words (${core.length} core + ${rest.length} tail)`);
  for (const w of items.slice(90, 115)) console.log(w.id, w.h, w.p, "|", w.en, "|", w.idn);
  const fallback = items.filter((w) => w.idn.toLowerCase() === w.en.toLowerCase()).length;
  console.log(`fallback-to-english: ${fallback}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
