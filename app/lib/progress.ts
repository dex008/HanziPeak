export type LessonProgress = {
  done: boolean;
  best: number;
};

export type Progress = {
  xp: number;
  todayXp: number;
  streak: number;
  lastDay: string;
  lessons: Record<string, LessonProgress>;
  speaking: Record<string, { attempts: number; best: number }>;
  answers: number;
  correct: number;
};

export const DEFAULT_PROGRESS: Progress = {
  xp: 0,
  todayXp: 0,
  streak: 0,
  lastDay: "",
  lessons: {},
  speaking: {},
  answers: 0,
  correct: 0,
};

const KEY = "hq.progress.v3";

export function todayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function yesterdayKey(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULT_PROGRESS, lessons: {} };
    const parsed = JSON.parse(raw) as Partial<Progress>;
    return {
      ...DEFAULT_PROGRESS,
      ...parsed,
      lessons: parsed.lessons && typeof parsed.lessons === "object" ? parsed.lessons : {},
      speaking: parsed.speaking && typeof parsed.speaking === "object" ? parsed.speaking : {},
    };
  } catch {
    return { ...DEFAULT_PROGRESS, lessons: {} };
  }
}

export function saveProgress(p: Progress): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    /* ignore */
  }
}

export function touchStreak(p: Progress): Progress {
  const today = todayKey();
  if (p.lastDay === today) return p;
  const streak = p.lastDay === yesterdayKey() ? p.streak + 1 : 1;
  return { ...p, streak, lastDay: today, todayXp: 0 };
}

export function addXp(p: Progress, amount: number): Progress {
  const base = touchStreak(p);
  return { ...base, xp: base.xp + amount, todayXp: (base.todayXp ?? 0) + amount };
}

export function completedCount(p: Progress): number {
  return Object.values(p.lessons).filter((l) => l.done).length;
}
