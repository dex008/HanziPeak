import type { Lang } from "./content";
import { PATTERNS, type Pattern } from "./patterns";
import type { Skill } from "./srs";
import type { Word } from "./words";

export type Exercise = {
  key: string;
  word: Word;
  skill: Skill;
  kind: "choice" | "order";
  prompt: string;
  pinyin?: string;
  options: string[];
  answer: number;
  audio: boolean;
  tokens?: string[];
  answerOrder?: string[];
};

function gloss(w: Word, lang: Lang): string {
  return lang === "id" ? w.idn : w.en;
}

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function distractors(word: Word, pool: Word[], lang: Lang, field: "gloss" | "hanzi"): string[] {
  const answer = field === "gloss" ? gloss(word, lang) : word.h;
  const seen = new Set([answer]);
  const out: string[] = [];
  for (const w of shuffle(pool)) {
    const value = field === "gloss" ? gloss(w, lang) : w.h;
    if (seen.has(value)) continue;
    seen.add(value);
    out.push(value);
    if (out.length === 3) break;
  }
  return out;
}

function makeOptions(answer: string, wrong: string[]): { options: string[]; answer: number } {
  const options = shuffle([answer, ...wrong]);
  return { options, answer: options.indexOf(answer) };
}

export function exerciseFor(word: Word, skill: Skill, pool: Word[], lang: Lang): Exercise {
  if (skill === "prod") {
    const { options, answer } = makeOptions(word.h, distractors(word, pool, lang, "hanzi"));
    return {
      key: `${word.id}:${skill}`,
      word,
      skill,
      kind: "choice",
      prompt: gloss(word, lang),
      options,
      answer,
      audio: false,
    };
  }

  const { options, answer } = makeOptions(gloss(word, lang), distractors(word, pool, lang, "gloss"));
  return {
    key: `${word.id}:${skill}`,
    word,
    skill,
    kind: "choice",
    prompt: skill === "listen" ? "🔊" : word.h,
    pinyin: skill === "listen" ? undefined : word.p,
    options,
    answer,
    audio: skill === "listen",
  };
}

function orderExercise(pattern: Pattern, word: Word, lang: Lang): Exercise {
  return {
    key: `order:${pattern.unit}`,
    word,
    skill: "rec",
    kind: "order",
    prompt: lang === "id" ? pattern.id : pattern.en,
    options: [],
    answer: -1,
    audio: false,
    tokens: shuffle(pattern.tokens),
    answerOrder: [...pattern.tokens],
  };
}

/** 15 items: recognition, production, listening, recall, and one sentence build. */
export function buildLessonQuiz(
  words: Word[],
  pool: Word[],
  lang: Lang,
  unit: number,
): Exercise[] {
  const out: Exercise[] = [];
  words.forEach((w, i) => {
    const skill: Skill = i % 3 === 0 ? "rec" : i % 3 === 1 ? "prod" : "listen";
    out.push(exerciseFor(w, skill, pool, lang));
  });
  words.slice(0, 5).forEach((w) => out.push(exerciseFor(w, "rec", pool, lang)));

  const pattern = PATTERNS[unit];
  if (pattern && words[0]) out[out.length - 1] = orderExercise(pattern, words[0], lang);

  return shuffle(out);
}

export function buildReviewQuiz(
  entries: Array<{ key: string; skill: Skill; word: Word }>,
  pool: Word[],
  lang: Lang,
): Exercise[] {
  return entries.map((e) => exerciseFor(e.word, e.skill, pool, lang));
}
