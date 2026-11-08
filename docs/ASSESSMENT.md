# Assessment & Grading Design

> Companion to [PLAN.md](../PLAN.md). This is the answer to: **"after learning here, how good am I actually — and can that be graded against real HSK?"**

---

## 1. Principles

1. **Two numbers, never confused.** A *practice estimate* (what the app thinks you can do) and an *exam score* (what you did under test conditions). They are shown side by side; neither is allowed to inflate the other.
2. **Grading must be earned, not given.** Stars and XP are motivation; the HSK level estimate and exam scores are evidence. They use different item pools.
3. **Every item is tagged to the syllabus.** Each word, grammar point, and sentence carries `hsk_level`, `skill`, `domain`, and a difficulty estimate — so coverage and ability are computed, not guessed.
4. **Transparent math.** The learner can open "How is this calculated?" and see the same numbers we use. Trust is the product.
5. **No dark patterns in assessment.** No "you're almost HSK 4!" nudges, no paywalled score reveals, no fake precision.

---

## 2. The ability model

### 2.1 Per-skill ability (θ)

Four skills are tracked separately, because "I can read but not speak" is the normal case:

`listening` · `reading` · `speaking` · `writing` (writing only after HSK 2 characters)

Each has an ability estimate `θ_s` on a logit scale (roughly −2 … +4).

### 2.2 Item response

Each item `i` has a difficulty `b_i` (same scale) and a skill tag.

```
P(correct | θ) = 1 / (1 + exp(-(θ_s - b_i)))
```

Update after every answer (Elo-style, cheap and online):

```
θ_s ← θ_s + K · (x - P)          x = 1 correct, 0 wrong
K   = 0.60 for first 30 responses in a skill
      0.25 for responses 31–150
      0.12 after that            (stability grows with evidence)
```

- Careless-tap guard: responses < 400 ms are counted as 0.5.
- Hints reduce the effective `x` (hint used → x = 0.5).
- Speaking items update θ via the normalized pronunciation score (0–1), not just pass/fail.

### 2.3 From θ to HSK level

Anchor items to the syllabus so the scale is interpretable before we have thousands of users:

| HSK level | Seed difficulty `b` |
|---|---|
| 1 | −1.6 |
| 2 | −0.9 |
| 3 | −0.1 |
| 4 | +0.7 |
| 5 | +1.5 |
| 6 | +2.3 |
| 7–9 | +3.1 |

Estimated level = linear interpolation between cut points, reported with one decimal:

> **HSK 2.4** — Listening 2.6 · Reading 2.5 · Speaking 2.0 · Writing 1.8

Once ~200k real answers exist, refit `b_i` monthly (Rasch/2PL) and recalibrate cut points against real HSK results from consenting users ("I took HSK 3 and scored 214" → ground truth). Until then, label the estimate **"practice estimate"**.

### 2.4 Confidence

```
SE ≈ 1.7 / sqrt(n_effective)      n_effective = sum of item information
```

Show as `HSK 2.4 ± 0.3`. Below ~40 responses in a skill, show "still calibrating" instead of a number. Never show two decimals.

---

## 3. Grading instruments

| Instrument | When | Length | What it grades | Gates anything? |
|---|---|---|---|---|
| **Micro-grade** | Every lesson | 8–15 items | Session quality: accuracy, independence (hints), speed → S/A/B/C | No |
| **Unit checkpoint** | End of unit | 12–15 items, no hints | Unit mastery → 1–3 stars; weak items go back to SRS | Yes: next unit |
| **Level exam** | End of level (optional, repeatable monthly) | Official section structure | HSK-style section scores + pass/fail | No: it *reports*, never locks |
| **Placement test** | Onboarding / re-test | ~25 adaptive items | Starting level + seed vocabulary + θ priors | Sets start point |
| **Monthly report card** | Every 30 days | — | Grades per skill, coverage, trend, next targets | No |

### 3.1 Micro-grade (session)

| Grade | Rule |
|---|---|
| **S** | ≥ 95% correct, 0 hints, no item seen twice |
| **A** | 88–94%, ≤ 1 hint |
| **B** | 75–87% |
| **C** | 60–74% |
| **D** | < 60% → remediation: next session injects the failed items + a simpler variant |

The grade is shown on the summary screen with *why* ("2 hints used, 3 items were new"). No grade is ever shown in red-shaming style; D gets a "let's rebuild this" path.

### 3.2 Unit stars

- ★ completed
- ★★ ≥ 80% on checkpoint, first attempt
- ★★★ ≥ 90% on checkpoint, no hints, first attempt

Stars feed the map and collection, never the HSK estimate.

### 3.3 Level exam (the "real HSK" part)

Blueprints follow the 2025 HSK section structure (verify against official papers before launch):

| Level | Listening | Reading | Writing | Speaking |
|---|---|---|---|---|
| HSK 1 | 20 items / ~12 min | 20 items / 20 min | — | — |
| HSK 2 | 25 / ~17 min | 25 / 25 min | 10 / 10 min | — |
| HSK 3 | 30 / ~23 min | 30 / 30 min | 10 / 20 min | 15 / ~15 min |
| HSK 4 | 32 / ~20 min | 32 / 30 min | 6 / 25 min | 5 / ~20 min |
| HSK 5 | 35 / ~25 min | 35 / 35 min | 2 / 40 min | 5 / ~23 min |
| HSK 6 | 40 / ~30 min | 40 / 40 min | 2 / 45 min | 5 / ~23 min |

Scoring model (verify 2025 rules): each section 100 points; HSK 1–2 total 200 with pass ≈ 120; HSK 3–6 total 300 with pass ≈ 180. Speaking is reported as its own 100-point section until the official 2025 weighting is confirmed.

Exam rules:
- Timed, no hints, no pause, no dictionary, no rewind of audio.
- One scored attempt per level per 24 h; unlimited *practice* attempts that don't count.
- Items drawn from a **held-out pool** (see §5).

### 3.4 Readiness score

Transparent heuristic until we have outcome data:

```
readiness = 0.45 × coverage_score
          + 0.35 × mock_score
          + 0.20 × accuracy_trend
```

- `coverage_score` = share of that level's words (mastery ≥ 3) and grammar points (mastery ≥ 2)
- `mock_score` = best recent exam section average / 100
- `accuracy_trend` = last 14 days' review accuracy, normalized

Displayed as a gauge with the three components visible and a "fix this first" recommendation (e.g., "Coverage is 91% but mock reading is 62 → do 3 reading drills").

Label it as **estimated**, with a confidence band. Never promise a pass.

---

## 4. What the learner sees

### Session summary
```
  ★★☆   Grade A
  92% correct · 1 hint · 11 items · +84 XP
  New: 6 words   Review: 5 items
  Ability now: HSK 2.3 (was 2.2)
```

### Profile / report card (monthly)
```
  HSK 2.4  ±0.3        Reading 2.5 | Listening 2.6 | Speaking 2.0
  Coverage   HSK 2: 412/500 words (82%) · grammar 61/78 (78%)
  Readiness  HSK 2 exam: 74% (est.)   [coverage 82% · mock 68 · trend 71]
  Grade      B+   (best skill: reading · weakest: speaking tones)
  Next       3 speaking drills · 12 fragile words · unit 7 checkpoint
```

### Certificate (optional, after passing a level exam)
- One-page PDF + share link: name, level, date, section scores, item count, verification code.
- Watermark: **"Practice assessment — not an official HSK certificate."**
- QR code resolves to a read-only verification page (Phase 3, needs a backend).

---

## 5. Item bank & integrity

| Rule | Why |
|---|---|
| Every item has `exposure_count` and `last_seen_at` | Prevent memorization |
| Exam draws from items **not seen in 30 days**, preferring never-seen | Score integrity |
| Exam items are a fixed subset (e.g., 25% of each unit's items are "exam-only") | Practice and test stay separate |
| Monthly recalibration: drop items with p < 0.2 or p > 0.95 | Keep difficulty honest |
| Duplicate/near-duplicate detection | Stop one sentence from appearing 12 ways |
| Timing + interaction logs stored on the attempt | Detect impossible-speed answers |
| No leaderboard impact from exam scores | Remove cheating incentive |

For v1 (local-only), integrity is necessarily soft — a determined user can edit localStorage. That's acceptable: the scores are for the learner's own honesty. Server-side integrity arrives with accounts.

---

## 6. Coverage & syllabus alignment

Every content item is tagged:

```ts
type HskTag = {
  wordId?: string;          // official HSK word list id
  grammarCode?: string;     // e.g. g-hen-adjective
  hskLevel: 1|2|3|4|5|6|7|8|9;
  skill: 'listening'|'reading'|'speaking'|'writing';
  domain?: 'business'|'tech'|'travel'|'health'|'news'|'academic';
};
```

Reports use exact denominators from the 2025 syllabus:

| Level | Words (cumulative) | Characters | Grammar points |
|---|---|---|---|
| 1 | 300 | 246 | 70 |
| 2 | 500 | 371 | 148 |
| 3 | 1,000 | 655 | 244 |
| 4 | 2,000 | 1,096 | 339 |
| 5 | 3,600 | 1,527 | 409 |
| 6 | 5,400 | 1,940 | 459 |
| 7–9 | 11,000 | 3,088 | 593 |

Coverage is always shown against the *cumulative* level, e.g. "HSK 3: 812/1,000 words (81%)". This is the honest way to say "HSK-aligned": we can show exactly which words and grammar points are covered.

---

## 7. Building the first calibrated exam (practical plan)

1. **Seed difficulty** from HSK level (table in §2.3) and word frequency rank within the level.
2. **Write 3 full mock exams per level** (1–3), using the official blueprints; have a native teacher rate each item 1–5 for difficulty.
3. **Pilot** with 10–20 learners spanning HSK 1–5; compare app scores to their known HSK results.
4. **Fit a simple Rasch model** (free tools: `py-irt`, `TAM` in R, or a 40-line Python script) → per-item `b`, person `θ`.
5. **Set cut scores** so that "pass" in-app corresponds to the official pass rate on the same learners.
6. **Ship with "beta calibration" labels** until n ≥ 200 per level.

This is a weekend of statistics, not a research project — but it is the difference between "a quiz app" and "a credible assessment".

---

## 8. What we will **not** claim

- Not an official HSK product or certificate.
- No guaranteed exam pass.
- No exact CEFR equivalence beyond "indicative" (HSK 1–2 ≈ A1, 3 ≈ A2, 4 ≈ B1, 5 ≈ B2, 6 ≈ C1, 7–9 ≈ C1–C2, as a rough guide only).
- No precision we don't have: one decimal, always with ±.

---

## 9. Data model additions (local v1)

```ts
// Dexie tables
ability   { skill: string; theta: number; n: number; updatedAt: number }
items     { id: string; hsk: number; skill: string; b: number; exposure: number; lastSeen?: number }
attempts  { id: string; itemId: string; correct: 0|0.5|1; ms: number; hints: number; at: number }
exams     { id: string; level: number; startedAt: number; finishedAt?: number; sections: SectionScore[] }
grades    { period: string; micro: string; report: object }
```

`theta` and `b` live on the same scale; the worker that schedules FSRS can also update θ after each answer, so grading costs no extra network or CPU.

---

## 10. Open questions (need your call or real data)

1. Should the **level exam be free-form** (any time) or unlocked only after the level is "complete"? Recommendation: unlocked at 80% coverage, repeatable monthly.
2. Do we want a **shareable certificate** in v1? Recommendation: no — add with accounts (Phase 3), since verification needs a server.
3. Should **speaking count toward the level grade** before HSK 3? Recommendation: yes as a separate "Speaking" line, not part of the pass/fail.
4. Do you want **school-style report cards** (printable PDF)? Cheap to add, useful if this ever reaches a classroom.
