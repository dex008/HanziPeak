import { WORDS, type Word } from "./words";
import { WORDS2 } from "./words2";

export type Lesson = {
  id: string;
  index: number;
  unit: number;
  words: Word[];
};

export type Unit = {
  index: number;
  title: { en: string; id: string };
  lessons: Lesson[];
};

const PER_LESSON = 10;
const PER_UNIT = 5;

const UNIT_TITLES: Array<{ en: string; id: string }> = [
  { en: "Foundations", id: "Dasar" },
  { en: "Everyday words", id: "Kata sehari-hari" },
  { en: "People & places", id: "Orang & tempat" },
  { en: "Actions", id: "Tindakan" },
  { en: "Time & numbers", id: "Waktu & angka" },
  { en: "Putting it together", id: "Menyusun kalimat" },
];

export const LESSONS: Lesson[] = [];
for (let i = 0; i < Math.ceil(WORDS.length / PER_LESSON); i++) {
  LESSONS.push({
    id: `l${String(i + 1).padStart(2, "0")}`,
    index: i,
    unit: Math.floor(i / PER_UNIT),
    words: WORDS.slice(i * PER_LESSON, (i + 1) * PER_LESSON),
  });
}

export const UNITS: Unit[] = UNIT_TITLES.map((title, index) => ({
  index,
  title,
  lessons: LESSONS.filter((l) => l.unit === index),
}));

export const TOTAL_WORDS = WORDS.length;
export const TOTAL_LESSONS = LESSONS.length;

const UNIT_TITLES2: Array<{ en: string; id: string }> = [
  { en: "People & plans", id: "Orang & rencana" },
  { en: "Daily life", id: "Keseharian" },
  { en: "Getting things done", id: "Menyelesaikan hal" },
  { en: "Body & health", id: "Tubuh & kesehatan" },
  { en: "City & travel", id: "Kota & perjalanan" },
  { en: "World & ideas", id: "Dunia & gagasan" },
  { en: "Places & travel", id: "Tempat & perjalanan" },
  { en: "School & work", id: "Sekolah & kerja" },
  { en: "Daily life II", id: "Keseharian II" },
  { en: "Out & about", id: "Keluar rumah" },
  { en: "Study & health", id: "Belajar & sehat" },
  { en: "Language & numbers", id: "Bahasa & angka" },
  { en: "Time & seasons", id: "Waktu & musim" },
  { en: "Connectors", id: "Kata sambung" },
  { en: "Everyday talk", id: "Obrolan sehari-hari" },
];

export const LESSONS2: Lesson[] = [];
for (let i = 0; i < Math.ceil(WORDS2.length / PER_LESSON); i++) {
  LESSONS2.push({
    id: `h2-${String(i + 1).padStart(2, "0")}`,
    index: i,
    unit: Math.floor(i / PER_UNIT),
    words: WORDS2.slice(i * PER_LESSON, (i + 1) * PER_LESSON) as unknown as Word[],
  });
}

export const UNITS2: Unit[] = UNIT_TITLES2.map((title, index) => ({
  index,
  title,
  lessons: LESSONS2.filter((l) => l.unit === index),
}));

export const TOTAL_WORDS2 = WORDS2.length;
export const TOTAL_LESSONS2 = LESSONS2.length;

export function lessonById(id: string): Lesson | undefined {
  return LESSONS.find((l) => l.id === id);
}

export function nextLesson(completed: Record<string, { done: boolean }>): Lesson {
  return LESSONS.find((l) => !completed[l.id]?.done) ?? LESSONS[LESSONS.length - 1];
}

export function isUnlocked(index: number, completed: Record<string, { done: boolean }>): boolean {
  if (index === 0) return true;
  return Boolean(completed[LESSONS[index - 1].id]?.done);
}
