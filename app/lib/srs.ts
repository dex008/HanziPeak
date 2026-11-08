import { createEmptyCard, fsrs, generatorParameters, Rating, type Card } from "ts-fsrs";

export type Skill = "rec" | "prod" | "listen";

export type StoredCard = {
  due: string;
  stability: number;
  difficulty: number;
  elapsed_days: number;
  scheduled_days: number;
  learning_steps: number;
  reps: number;
  lapses: number;
  state: number;
  last_review?: string;
};

export type CardMap = Record<string, StoredCard>;

const KEY = "hq.cards.v2";

const scheduler = fsrs(
  generatorParameters({
    enable_fuzz: false,
    enable_short_term: false,
    request_retention: 0.9,
  }),
);

export function cardKey(wordId: string, skill: Skill): string {
  return `${wordId}:${skill}`;
}

export function revive(c: StoredCard): Card {
  return {
    due: new Date(c.due),
    stability: c.stability,
    difficulty: c.difficulty,
    elapsed_days: c.elapsed_days,
    scheduled_days: c.scheduled_days,
    learning_steps: c.learning_steps,
    reps: c.reps,
    lapses: c.lapses,
    state: c.state,
    last_review: c.last_review ? new Date(c.last_review) : undefined,
  } as Card;
}

export function pack(c: Card): StoredCard {
  return {
    due: c.due.toISOString(),
    stability: c.stability,
    difficulty: c.difficulty,
    elapsed_days: c.elapsed_days,
    scheduled_days: c.scheduled_days,
    learning_steps: c.learning_steps,
    reps: c.reps,
    lapses: c.lapses,
    state: c.state as unknown as number,
    last_review: c.last_review?.toISOString(),
  };
}

export function grade(card: StoredCard | undefined, correct: boolean, now = new Date()): Card {
  const base = card ? revive(card) : createEmptyCard(now);
  return scheduler.next(base, now, correct ? Rating.Good : Rating.Again).card;
}

export function isDue(card: StoredCard, now = new Date()): boolean {
  return new Date(card.due).getTime() <= now.getTime();
}

/** A brand-new card, due immediately (used to offer review right after a lesson). */
export function newCard(now = new Date()): StoredCard {
  return pack(createEmptyCard(now));
}

export function dueCards(cards: CardMap, now = new Date()): Array<{ key: string; card: StoredCard }> {
  return Object.entries(cards)
    .filter(([, c]) => isDue(c, now))
    .sort((a, b) => new Date(a[1].due).getTime() - new Date(b[1].due).getTime())
    .map(([key, card]) => ({ key, card }));
}

export function masteredCount(cards: CardMap): number {
  return Object.values(cards).filter((c) => c.reps >= 3).length;
}

export function loadCards(): CardMap {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as CardMap) : {};
  } catch {
    return {};
  }
}

export function saveCards(cards: CardMap): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(cards));
  } catch {
    /* quota */
  }
}
