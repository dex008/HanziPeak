# HanziPeak — Product & Technical Plan

> **Name:** **HanziPeak** (display) · `com.hanziquest.app` *(package unchanged so builds update in place)* — 9 HSK levels = 9 peaks; quick web/DNS check clean, trademark search still pending
> **Status:** v4.2 — HSK 2 complete: 75 lessons / 746 words (v3.1.0 APK) · HSK 1 complete · panda gestures · conversation scoring · stroke practice · local account · free · EN/ID · offline
> **Goal of this document:** agree on *what* we are building, *for whom*, *in what order*, and *on what stack* before writing production code.

---

## Contents

1. Executive summary
2. Vision, positioning, and the three bets
3. Who it's for (personas & jobs)
4. Curriculum backbone — HSK 3.0 (2025)
5. The learning engine (science + algorithms)
6. The game layer (engagement design)
7. Feature specification by pillar
8. Advanced modules (HSK 4+ verticals)
9. UX, responsive design, accessibility
10. Technical architecture
11. Data model
12. Content pipeline, licensing, and volume math
13. Metrics and instrumentation
14. Roadmap and milestones
15. Cost model and monetization
16. Risks
17. Decisions needed from you
18. First 10 days
- Appendix A — routes
- Appendix B — content schema example
- Appendix C — sources

---

## 1. Executive summary

**What:** an **Android-first** app — one Next.js codebase shipped through Capacitor as a real APK, and also available as an installable PWA — that takes a learner from zero to advanced Mandarin using the HSK 3.0 (2025) syllabus as the spine, teaching *reading and speaking* rather than test-taking tricks.

**Why it can win:** existing apps are strong at gamified vocabulary drilling and weak at (a) getting you to read real Chinese text, (b) giving useful tone-level speaking feedback, and (c) making advanced levels feel professionally useful. We combine graded **story mode**, **scored speaking/roleplay**, and **vertical modules** (business, tech, travel, news…) on top of a solid SRS engine.

**How it stays addictive:** visible mastery (stars, levels, HSK-readiness score), narrative cliffhangers, weekly leagues, and collection mechanics — deliberately *without* energy timers, ads, or pay-to-win. Addiction should come from competence and story, not friction.

**Shape of the build:**

| Phase | Scope | Duration (solo, full-time) |
|---|---|---|
| 0 | Decisions, design tokens, content schema, walking skeleton web + APK | 1 week |
| 1 | Learning engine + HSK 1 unit 1–4 + local progress + Android shell | 5 weeks |
| 2 | FSRS reviews, placement, speaking v1, streak/XP, story ep. 1, APK | 4 weeks |
| 3 | HSK 1–2 complete, achievements, optional accounts + sync, beta | 5 weeks |
| 4 | HSK 3, Business module 1, level exams, Play closed testing | 6–8 weeks |
| 5+ | HSK 4–6, more verticals, handwriting, classrooms, iOS wrapper | ongoing |

**The one thing to protect:** content quality. A beautiful engine with mediocre Chinese teaches nothing. Native review is non-negotiable.

---

## 2. Vision, positioning, and the three bets

### Vision
> **"Read your first real Chinese story in week 2. Hold your first real conversation in month 2. Never plateau at HSK 4."**

### The three bets

**Bet 1 — Reading-first, not vocabulary-first.**
From the very first unit, every lesson ends inside a tiny graded story. Stories are written at 95–98% known-word coverage, so the learner is always reading *real sentences*, not isolated flashcards. Characters and words are introduced *because the story needs them*.

**Bet 2 — Speaking is scored from day one, with visible tone contours.**
Learners record; we show their pitch curve against the native curve, plus syllable-level scores. This turns the abstract "tones are hard" problem into a visible, gameable skill. Even without paid ASR, a free tier can compare pitch contours locally and check keyword accuracy from browser speech recognition.

**Bet 3 — Advanced levels are professional, not academic.**
From HSK 4 upward, the app branches into *verticals*: Business Mandarin, Tech/IT, Travel & Hospitality, Healthcare, News & Society, Academic. Each is a scenario-driven "mission pack" with roleplays, documents, and vocabulary — the reason an adult keeps paying attention after the honeymoon phase.

### Differentiation snapshot

| Product type | Strength | Gap we exploit |
|---|---|---|
| Duolingo-style gamified apps | Habit loop, polish | Weak character depth, little real reading, tones under-taught |
| Chinese-specific apps (HelloChinese, SuperChinese etc.) | Curriculum, speech features | Less "game", thinner advanced/professional content |
| Dictionary-first tools (Pleco etc.) | Reference depth | No guided path or motivation loop |
| SRS decks (Anki/HSK decks) | Efficient review | No teaching, no speaking, no story, no onboarding |
| Human tutors | Feedback quality | Cost, scheduling, no daily habit |

**Positioning line:** *"The game that makes you literate in Chinese."*

### 2.1 Reference product: HelloChinese (the bar to beat)

You used HelloChinese and liked it — that is the right benchmark, because it is widely considered the best beginner-to-intermediate Mandarin app. So the rule is simple: **if our beginner experience is not at least as clear as HelloChinese, we don't ship it.** We do not try to out-polish it on day one; we try to be clearly better at three things it does not focus on.

| Dimension | HelloChinese | HanziQuest |
|---|---|---|
| Bite-sized lessons | Excellent | Match it: 5–8 min lessons, one idea each |
| Pronunciation feedback | Strong (speech scoring) | Match, then add **visible pitch contour** + free tier that still works |
| Stroke order / writing | Strong | Match (Hanzi Writer tracing), add component-forging game |
| Pinyin toggle & fading | Present | Match, plus adaptive auto-fade per mastered word |
| Curriculum clarity | Excellent | Match, anchored to HSK 3.0 (2025) with coverage % |
| Story / real reading | Light | **Beat it:** graded story mode is the flagship |
| Advanced & professional | Thin | **Beat it:** business/tech/travel verticals from HSK 4 |
| Game meta | Modest | **Beat it:** leagues, boss battles, cards, collection, bilingual UI |
| Price & access | Subscription | **Free**, with offline packs |

**What to copy deliberately:** lesson pacing, the "one new thing at a time" rule, generous audio on every item, immediate correction, a visible daily goal, and a placement test.

**What to avoid:** copying any lesson text, audio, art, or UI 1:1 (copyright + it would make us a clone); too many taps per exercise; letting pinyin become a permanent crutch; gating the middle of the course behind a paywall.

### Non-goals (v1)
- Not a social network, not a tutor marketplace, not a dictionary-first app.
- No ads, no energy system, no pay-to-win.
- No Cantonese, no classical Chinese as a launch feature (classical appears in HSK 7–9 track later).
- Not an official HSK product; we say "HSK-aligned" and avoid implying affiliation ("HSK" is a trademark of the Chinese Ministry of Education).

---

## 3. Who it's for

| Persona | Context | Job to be done | What wins them |
|---|---|---|---|
| **P1 · True beginner** ("me") | 15–30 min/day, phone on commute + desktop at night | "Get me from zero to actually understanding Chinese, without quitting in week 3" | Fast first win, visible streak, story hook, tone feedback |
| **P2 · Returner** | Studied before, forgot most | "Don't make me redo HSK 1" | Placement test, "assumed known" seeding, skip tests |
| **P3 · Exam candidate** | HSK 3–6 in 3–9 months | "Tell me if I'll pass, and fix my weak spots" | Readiness score, timed mocks, error analytics |
| **P4 · Professional** | Works with Chinese suppliers/clients | "Teach me to negotiate, email, and survive meetings" | Business module, roleplays, document reading |
| **P5 · Teacher / study group** | Classroom or self-organized cohort | "Assign, track, motivate" | Classrooms, leaderboards, assignment links (v2) |

Primary design target: **P1 on a mid-range Android phone over 4G**, because that is the hardest constraint and the largest audience. If it feels great there, desktop is easy.

---

## 4. Curriculum backbone — HSK 3.0 (2025)

### 4.1 The standard

The 2021 "three stages, nine levels" framework became an official exam syllabus in **November 2025**, with reduced beginner/intermediate vocabulary and **mandatory speaking from Level 3**. The full exam rollout is still phasing in, so the app should ship the 2025 mapping as default and keep a legacy HSK 2.0 mapping for exam candidates who still need it.

| Level | Band | New words | Cumulative words | Cumulative chars (recognition) | Cumulative grammar | Speaking tested? |
|---|---|---|---|---|---|---|
| 1 | Beginner | 300 | 300 | 246 | 70 | No |
| 2 | Beginner | 200 | 500 | 371 | 148 | No |
| 3 | Beginner | 500 | 1,000 | 655 | 244 | **Yes** |
| 4 | Intermediate | 1,000 | 2,000 | 1,096 | 339 | Yes |
| 5 | Intermediate | 1,600 | 3,600 | 1,527 | 409 | Yes |
| 6 | Intermediate | 1,800 | 5,400 | 1,940 | 459 | Yes |
| 7–9 | Advanced | 5,600 | 11,000 | 3,088 | 593 | Yes |

*Writing characters are introduced separately: 100 at L2, 250 at L3, 400 at L4, 700 at L6, 1,200 by L7–9. HSK 1 has no writing test.*

**Design consequences:**
- HSK 1–2 is only 500 words → we can make it *excellent* and fast. Target: a motivated learner finishes HSK 1 in ~6 weeks, HSK 2 in ~8 more.
- The jump from L6 (5,400) to L7–9 (11,000) is 5,600 words. **Do not build 5,600 lessons.** Advanced is served by authentic-text reading, domain vocabulary decks, and glossing tools (see §8.3).
- Speaking is exam-relevant from L3 → the speaking engine must be real by the time HSK 3 content ships.

### 4.2 Course structure

```
9 levels  →  9 "regions" on the journey map
  └─ 8–15 units per level         (unit ≈ 20 new words + 1 grammar focus + 1 story beat)
       └─ 5 lessons + 1 checkpoint (lesson ≈ 8–15 exercises, 5–8 min)
            └─ exercises            (see §7.3)
```

- **Daily Quest** = auto-composed 10–15 min session (see §5.3). The learner never has to decide what to study.
- **Checkpoint** = mixed "boss battle" (timed, no hints) that gates the next unit and awards a badge.
- **Skip tests** per unit for returners; placement test for new users.

### 4.3 Placement test

- ~25 adaptive items: listening (8), reading (8), grammar cloze (5), character recognition (4) + one open speaking prompt (60 s).
- Adaptive difficulty via a lightweight Elo/IRT-lite item bank.
- Output: starting unit, **seed known words** (marked "assumed known", verified in the first week of reviews), and a "fragile skills" list.
- Target: < 6 minutes, skippable, re-testable monthly.

### 4.4 Mastery model

Every word exists as **multiple skill cards**, not one card:

| Skill card | Prompt → Answer | Why it matters |
|---|---|---|
| Recognition | 汉字 → meaning + sound | Reading |
| Audio recognition | audio → meaning | Listening |
| Production | meaning → pinyin/hanzi | Speaking/writing |
| Tone | audio → tone contour choice | Pronunciation |
| Context | cloze in sentence | Grammar/usage |

Each card has its own FSRS memory state. Mastery per word = weighted average (production and context weigh more), displayed as 1–5 stars. **This is the fix for "I can read but can't say."**

---

## 5. The learning engine (science + algorithms)

### 5.1 Scheduling: FSRS, not SM-2

Use **[FSRS](https://github.com/open-spaced-repetition/ts-fsrs)** (`ts-fsrs`), which models difficulty, stability, and retrievability, and targets ~90% recall. Benefits: fewer reviews for the same retention, and per-card optimization later from real review logs.

Rules:
- Target retention 0.90 (configurable 0.85–0.95).
- A card that lapses 4× becomes a **leech**: auto-simplify (add mnemonic, split into component cards, show a story sentence), flag "fragile" in the UI.
- Review load is capped (default 150/day) to prevent backlog death spirals; backlog mode pauses new items and shows a "catch-up" plan.

### 5.2 Session composer

```
daily_queue =
    60%  due reviews        (ordered by overdue × difficulty, interleaved by skill)
  + 25%  new items          (capped: 8 new words/day default; curriculum order)
  + 15%  fluency block      (1 of: speed listening, shadowing, story episode, roleplay)

if due_backlog > 80 → drop new items, keep fluency block
if session_elapsed > 20 min → offer graceful stop with partial credit
```

Interleaving is intentional: mixing recognition, listening, and production of *different* words in one session improves discrimination and retention versus blocked practice.

### 5.3 Pedagogical rules baked into content

- **Tones first.** Week 1 is a "Tone Gym": 4 tones, tone pairs, and the two sandhi rules that actually matter (不 bù→bú before 4th tone; 一 yī→yì/yí). Pitch-contour visualizations from day 1.
- **Pinyin fade.** Pinyin is shown initially, then progressively hidden per word as mastery rises (with a manual "always show" toggle). This prevents pinyin crutches — the #1 cause of "I can't read hanzi."
- **Characters via components.** Every new character is introduced with radical(s), a component story, and 1–2 words it appears in. "Character Forge" exercises let learners assemble characters from components.
- **Comprehensible input.** Story sentences must be ≥95% known words; the app highlights unknown words and offers tap-to-gloss. Stories are the reward, not a separate product.
- **Output from day 1.** Even at HSK 1, learners say one-word answers aloud (record → compare). Speaking is a habit, not a module.
- **Errors are information.** Wrong answer → immediate contrastive explanation (why *this* not *that*), then the item requeued later in the session. No punitive heart loss.
- **Spaced retrieval of grammar**, not just words: grammar patterns are practiced as cloze/ordering items with their own schedules.

### 5.4 Difficulty adaptation

- Per-learner ability estimate (Elo) updated by item outcomes.
- Exercise selection within a lesson: 70% at ~85% success probability, 20% review-easy (confidence), 10% stretch.
- If accuracy in a session < 60%, next session injects remediation and lowers new-item cap automatically.

---

## 6. The game layer (engagement design)

Guiding principle: **engagement from competence, autonomy, and story** (self-determination theory), not from artificial scarcity. Every mechanic must answer: *does this make the learner better or just make them come back?*

### 6.1 Core loop

```
   ┌────────────────────────────────────────────────────┐
   │  Open app → Daily Quest (10–15 min)                │
   │     ├─ warm-up reviews   → combo, XP, sounds       │
   │     ├─ new lesson        → stars, character cards  │
   │     ├─ story beat        → cliffhanger  ───────┐   │
   │     └─ streak check      → flame, league points│   │
   │                                                │   │
   │  Tomorrow's hook  ◄────────────────────────────┘   │
   └────────────────────────────────────────────────────┘
```

The **cliffhanger** is the retention engine: the last thing in a session is a story beat that ends mid-scene, unlocked by tomorrow's lesson.

### 6.2 Economy (concrete numbers)

| Mechanic | Rule |
|---|---|
| **XP** | base 10 per correct review item × skill multiplier (recognition 1.0, listening 1.2, production 1.5, speaking 2.0) × combo bonus (1 + 0.1 × min(combo, 10)); lesson complete +50; boss battle +150 |
| **Learner level** | XP to next = `100 × level^1.35`; titles every 10 levels: 书生 → 秀才 → 举人 → 进士 → 大学士 |
| **Daily goal** | 50 / 100 / 200 / 400 XP (user picks; default 100) |
| **Streak** | 1 day = flame; 7 = bronze, 30 = silver, 100 = gold, 365 = jade. 2 free "freezes" earned per month; 48-hour repair window |
| **Leagues** | 30-person weekly cohorts, top 10 promote, bottom 5 demote; league names from Chinese literary ranks |
| **Quests** | 3 daily (e.g., "20 reviews", "1 speaking attempt", "1 story"), 5 weekly, 1 monthly arc |
| **Coins** | earned from lessons/quests; spend only on cosmetics (themes, avatar, card backs, map skins) — never on progress |
| **Collection** | character cards (radical, etymology, stroke animation, rarity), 成语 album, city postcards, badges (~150 total) |

### 6.3 Mechanic → purpose → risk

| Mechanic | Purpose | Dark-pattern risk | Mitigation |
|---|---|---|---|
| Streak | Habit formation | Anxiety, "streak loss" churn | Freezes, repair window, rest days, never shame the user |
| Leagues | Social comparison, weekly goal | Demotivation for beginners | Cohorts matched by activity, not raw XP |
| Variable rewards (mystery chest) | Anticipation | Gambling-adjacent | Cosmetics only, transparent odds, no purchase |
| Cliffhanger story | Return next day | Manipulative serialization | Content is genuinely good; no artificial paywall |
| Push notifications | Re-engagement | Spam | Max 2/day, timezone-aware, opt-out in one tap |
| Timed boss battles | Mastery proof | Anxiety | Optional, untimed mode available |

**No energy system. No ads. No hearts that block learning.** (A "focus mode" without hints may exist, but failing never locks content.)

### 6.4 Social & community

- Friends + weekly leaderboard (opt-in).
- **Study rooms:** 2–5 people co-complete a Daily Quest → group XP bonus (accountability without competition).
- **Academies (guilds):** shared weekly goal, guild chat with moderation, guild badge.
- Shareable streak cards / "I read my first Chinese story" cards (organic acquisition).
- Later: classrooms with teacher assignments and a class leaderboard.

### 6.5 Events

Seasonal packs tied to real culture: Spring Festival (春节), Mid-Autumn (中秋), Dragon Boat (端午), HSK exam-week bootcamps, 30-day "Hanzi Marathon". Each is a re-skinned story arc + limited badges — cheap to produce once the content schema exists.

### 6.6 Anti-burnout guardrails

- Session-length warnings after 25 min; "you've hit your goal" celebration instead of endless grind.
- Weekly recap email/push with progress, not guilt.
- Detect 7-day streaks with declining accuracy → suggest a lighter day.
- All streak mechanics can be disabled in settings ("zen mode").

---

## 7. Feature specification by pillar

### 7.1 Onboarding & placement

- **No signup in v1:** landing → 60-second "taste lesson" → progress saved **locally** (IndexedDB) with one-tap export/import. Accounts + cloud sync arrive only when you actually want multi-device (Phase 3).
- Goal selection: travel / work / exam / heritage / fun → adjusts content emphasis and notification copy.
- Daily time commitment (5/10/15/30 min) → sets new-item cap and session target.
- Placement test (optional) → starting point.
- Target: **time-to-first-correct-answer < 90 seconds**; onboarding completion > 70%.

### 7.2 Journey map

- Vertical scrollable map (mobile) / zoomable map (desktop) of 9 regions.
- Each region: progress ring, units, checkpoint boss, story cover art.
- Node states: locked / available / in-progress / mastered / fragile (needs review).
- "Continue" floating action button always resumes exactly where you left off.

### 7.3 Lesson player — exercise primitives

| # | Exercise | Skill | Grading | MVP? |
|---|---|---|---|---|
| 1 | Tone Gym (audio → tone) | tone | exact | ✅ |
| 2 | Listen & choose meaning | listening | exact | ✅ |
| 3 | Character → meaning | recognition | exact | ✅ |
| 4 | Meaning → character (multiple choice) | recognition | exact | ✅ |
| 5 | Word ordering (drag) | grammar | sequence | ✅ |
| 6 | Cloze in sentence | context | exact | ✅ |
| 7 | Type the pinyin (tone marks) | production | fuzzy | ✅ |
| 8 | Stroke tracing (guided) | writing | path score | v1.5 |
| 9 | Character Forge (component assembly) | character | exact | v1.5 |
| 10 | Shadowing (record & compare) | speaking | score | v1.5 |
| 11 | Read-aloud with rubric | speaking | score | v1.5 |
| 12 | Dictation (audio → hanzi) | listening+writing | fuzzy | v2 |
| 13 | Free production (say/write a sentence) | output | LLM rubric | v2 |
| 14 | Translation zh↔en | advanced | fuzzy/LLM | v2 |

Every exercise stores: item id, skill, difficulty, latency, correctness, attempt count, and (for speaking) audio + scores. This log feeds FSRS, analytics, and future personalization.

### 7.4 Review (SRS)

- Dedicated `/review` screen + auto-included in Daily Quest.
- Modes: mixed (default), listening-only, speaking-only, "fragile only".
- Card UI shows: prompt, hint button (costs combo, not hearts), "why?" explanation, audio.
- Backlog recovery plan when reviews > 150.
- Stats: retention curve, forecast (next 7 days), heatmap.

### 7.5 Story mode

- Original graded serials per level, 8–12 episodes per season, 3–6 min reading each.
- Reading UI: hanzi with optional pinyin/ruby, tap word → gloss card (word, pinyin, meaning, audio, add-to-deck), sentence audio, "read aloud" button.
- 1–2 comprehension questions per scene; choices affect a lightweight branching outcome (cosmetic, not content-gating).
- Unknown-word density instrumented per user; stories adapt by swapping in an easier variant if density > 8%.
- **This is the flagship differentiator** — budget art and writing accordingly.

Example arcs:
- HSK 1–2: *"First Week in Shanghai"* — airport, hotel, food, lost phone.
- HSK 3: *"The Roommate"* — daily-life mystery, 12 episodes.
- HSK 4: *"The Supplier"* — business trip, negotiation, crossed wires (bridges into Business module).
- HSK 5–6: *"Palace of Dust"* — historical intrigue; *"Startup Summer"* — tech workplace.

### 7.6 Speaking & roleplay

**Echo mode:** hear a sentence → shadow it → see score + pitch contour overlay + syllable breakdown. Progressive: word → phrase → sentence → paragraph.

**Roleplay mode:** branching dialogue with an NPC where the learner speaks their turn. Grading = ASR keyword coverage + pronunciation score + (later) LLM rubric for naturalness. Scenarios: order food, taxi, pharmacy, apartment viewing, job interview, supplier negotiation, doctor visit.

**Technical tiers:**
- Tier 0 (free, offline): record + local pitch contour (autocorrelation in a Web Worker) + reference comparison. No transcript.
- Tier 1 (free, online): browser `SpeechRecognition` (Chrome/Edge/Android) → keyword matching, no tone scoring.
- Tier 2 (optional, later): Azure Pronunciation Assessment (zh-CN) → accuracy/fluency/completeness + phoneme scores. Requires a backend to issue short-lived tokens (Phase 3); **never ship the key to the client**.

**v1 (no backend) ships tiers 0–1 only** — zero cost, zero privacy surface.

### 7.7 Advanced modules

See §8. Entry points: `/modules`, unlocked contextually ("You're HSK 4 — try Business: First Meeting"), and via the journey map as side-quests.

### 7.8 Exams & grading

- Mock tests in the official section structure for HSK 1–6, timed, with per-section scores and explanations.
- **Readiness score:** predicted pass probability from syllabus coverage, mock performance, and accuracy trend — shown as a gauge with "what to fix".
- **Continuous ability estimate:** "You are HSK 2.4 (Listening 2.6 · Reading 2.5 · Speaking 2.0)" updated from every session — ability is always visible, not just on exam day.
- **Report card:** monthly grade (S/A/B/C), skills radar, syllabus coverage, next targets.
- Full design — ability model, grade bands, exam blueprints, integrity rules, certificate format: **[docs/ASSESSMENT.md](docs/ASSESSMENT.md)**.

### 7.9 Progress & stats

- Words: learning / known / mastered / fragile.
- Skills radar: listening, reading, speaking, writing, grammar.
- HSK readiness per level.
- Time studied, streak history, retention curve, review forecast.
- "Can-do" statements (CEFR-mapped) that unlock as proof of progress: *"I can order food and handle payment."*

### 7.10 Settings & accessibility

- Pinyin: always / fade / never. Traditional characters toggle. Font size. Dark/OLED. Reduced motion. Sound/haptics.
- Daily goal, reminder time, timezone, notification opt-out.
- Data: export (JSON/CSV), delete account (GDPR/PDPA compliant), reset progress.

### 7.11 Admin / content studio (internal, v1)

- Lesson CRUD with live preview, validation errors, coverage report vs HSK list.
- Audio generation queue (TTS) + upload/override.
- Review workflow: draft → native review → approved → published.
- Content versioning: immutable published versions; progress pinned to version; safe hotfixes.

---

## 8. Advanced modules (HSK 4+ verticals)

### 8.1 Module catalog

| Module | HSK range | Contents | Example mission |
|---|---|---|---|
| **Business Mandarin** | 4–6 | meetings, email, negotiation, pricing, contracts, supply chain, HR, finance basics, WeChat business etiquette, presentations | "Negotiate a 12% discount on a 5,000-unit order" — read the quote, roleplay the call, write the follow-up email |
| **Workplace & Interviews** | 3–5 | self-intro, small talk, reporting, asking for leave, performance review | "Survive your first week at a Chinese company" |
| **Tech / IT** | 4–6 | product, bugs, sprints, cloud, AI, code review | "Explain a production incident to your Chinese team" |
| **Travel & Hospitality** | 2–4 | airports, hotels, complaints, directions, payments | "Your flight is cancelled — rebook it" |
| **Healthcare** | 4–5 | symptoms, pharmacy, insurance, hospital process | "Describe a persistent cough and understand the prescription" |
| **News & Society** | 5–7 | headline decoding, opinion pieces, data in articles, media bias language | "Read three takes on the same policy and summarize" |
| **Academic / University** | 5–7 | lectures, essays, citations, seminar language | "Follow a 6-minute lecture and take notes" |
| **Chengyu & Idioms** | 4–7 | 100 core 成语 with stories, usage, collection game | "Use 画蛇添足 correctly in a sentence" |
| **Internet & Media Chinese** | 4–6 | slang, memes, drama clips, songs, comment-section reading | "Decode a viral Weibo thread" |
| **Exam Sprint** | 3–6 | timed mocks, strategy, error drills | "HSK 4 in 21 days" |
| **Cultural Literacy** | 3–6 | festivals, food, etiquette, numbers/taboo, gift-giving | "Don't accidentally insult your host" |

### 8.2 Module anatomy (reusable template)

```
Module (e.g., "Business: First Contact")
 ├─ 6 missions × (15–20 min)
 │    ├─ Briefing: 2-min video/audio scenario in Chinese (subtitled, toggleable)
 │    ├─ Vocabulary: 25–40 domain words (own SRS deck, tagged domain:business)
 │    ├─ Language patterns: 3–5 structures (e.g., 能不能…？ / 如果…就… / 关于…)
 │    ├─ Document reading: email / quote / memo with glossing
 │    ├─ Roleplay: 3–6 turns, spoken, graded
 │    └─ Production: write a 3-sentence reply (v2: LLM rubric)
 └─ 1 assessment: scenario simulation + score + badge
```

Modules are **data, not code**: same lesson player, different content packs and skins. This keeps marginal cost low.

### 8.3 Advanced (HSK 7–9) strategy

Do not attempt word-by-word lessons for 5,600 words. Instead:
1. **Authentic text reader** with AI-assisted glossing (tap → definition + grammar note + example), pinyin toggle, sentence translation on demand.
2. **Domain vocabulary decks** (news, economics, law, science, literature) scheduled by FSRS.
3. **Curated essay/news packs** with comprehension + summary writing.
4. **Rhetoric & register** lessons (formal vs colloquial, 书面语, 成语 density).
5. **Translation practice** with model answers.

This is defensible and much cheaper to produce than a 5,600-word course.

---

## 9. UX, responsive design, accessibility

### 9.1 Principles

1. **One decision per screen.** The learner should never wonder what to tap.
2. **Thumb-first.** Primary action bottom-anchored; nothing critical in the top 15% of a phone screen.
3. **Chinese is the hero.** Hanzi get the largest type; UI chrome recedes.
4. **Juice, but quiet.** Celebrations are short (< 1.2 s), skippable, and disabled under reduced motion.
5. **No dead ends.** Every empty/error state offers a next action.

### 9.2 Mobile lesson screen

```
┌─────────────────────────────┐
│ ‹   Unit 3 · Lesson 2   ⚡  │  ▓▓▓▓▓░░░░░  6/12
│                             │
│        [ 🔊 replay ]        │
│                             │
│        今天天气很好          │  ← 44–56 px hanzi
│        jīntiān tiānqì hěn hǎo│  ← pinyin (fadeable)
│                             │
│  ┌───────────────────────┐  │
│  │ The weather is nice.  │  │
│  └───────────────────────┘  │
│  ┌───────────────────────┐  │
│  │ It's raining.         │  │
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │      Check  →         │  │  ← in thumb zone, 56 px tall
│  └───────────────────────┘  │
└─────────────────────────────┘
```

### 9.3 Desktop layout

```
┌────────────┬────────────────────────────────┬─────────────┐
│  Sidebar   │  Main: map / lesson / story    │  Right rail │
│  Learn     │                                │  🔥 12 days │
│  Review    │                                │  Daily goal │
│  Story     │                                │  League     │
│  Modules   │                                │  Friends    │
│  Exams     │                                │             │
│  Profile   │                                │             │
└────────────┴────────────────────────────────┴─────────────┘
```

Desktop adds: keyboard shortcuts (1–4 select, Enter check, Space replay audio, `R` replay), hover affordances, multi-column story reading, a denser stats dashboard.

### 9.4 Breakpoints & rules

| Range | Layout |
|---|---|
| 360–639 | Single column, bottom nav (5 items), full-bleed lesson |
| 640–1023 | Single column + wider cards, tablet split for story |
| 1024–1439 | Sidebar + main + right rail |
| 1440+ | Max-width 1280 content, generous margins |

Non-negotiables: min touch target 48×48 px (WCAG 2.2 AA), `100dvh` not `100vh`, `env(safe-area-inset-*)`, no hover-only interactions, no horizontal scroll, font-size scaling to 200% without breakage.

### 9.5 Visual language

- **Concept:** ink-wash meets modern game UI. Paper textures, brush accents, seal-stamp badges, restrained red/gold/jade palette; dark mode uses ink-black + lantern glow.
- **Simple & light by rule:** one accent color per level, inline SVG illustration only (no stock photos, no 3D), max two font weights, motion via transform/opacity only, **< 60 KB of art per screen**.
- **Mascot:** 小墨 (Xiǎo Mò), a small ink-drop character who reacts to answers (blink, bounce, wobble) — cheap to animate and gives the app a face without a 3D pipeline.
- **Feel:** paper grain, rounded cards, seal-stamp badges, soft shadows; celebrations last 0.8–1.2 s and are skippable.
- **Preview:** open [`prototype/index.html`](prototype/index.html) — a no-build, ~35 KB clickable mock of the map, lesson, story reader, and report, with the EN/ID toggle wired up.
- Hanzi font: Noto Sans SC (or LXGW WenKai for story text — warmer, more readable for longer passages).
- Pinyin: Inter with proper tone-mark rendering; optional tone-color mode (mā má mǎ mà) as an accessibility/learning aid.
- Characters rendered with `lang="zh-Hans"`; writing practice uses 米字格 grid.
- Sound design: short chime per correct, rising pitch per combo step, soft "thud" for wrong (never harsh), completion fanfare. Haptics via `navigator.vibrate` where supported.

### 9.6 Performance budget

| Metric | Target |
|---|---|
| LCP (mid-range Android, 4G) | < 2.5 s |
| INP | < 200 ms |
| CLS | < 0.1 |
| Initial JS (gz) | < 200 KB |
| Lesson start after tap | < 400 ms (assets preloaded) |
| Audio bitrate | Opus 24–32 kbps mono; images AVIF |

### 9.7 Offline

- Installable PWA; "Download level pack" caches lessons, audio, and images (Cache API + IndexedDB).
- Reviews and lesson completions queue locally (Dexie) and sync when online, with conflict rules (last-write-wins per card, union for XP events).
- Essential for commute use in dense cities (and for flights).

### 9.8 Accessibility

- WCAG 2.2 AA: contrast, focus rings, semantic landmarks, ARIA on custom controls.
- Every audio has a transcript/caption; every image has alt text (decorative art marked).
- Feedback uses icon + text + color (not color alone).
- Dyslexia-friendly option: increased letter spacing, optional pinyin-only mode.
- Screen-reader support for the lesson flow (announce prompt, choices, result, next).

---

## 10. Technical architecture

### 10.1 Stack recommendation

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 15 (App Router) + React 19 + TypeScript (strict)** — static export | One UI codebase → Android APK + PWA; no server needed in v1 |
| Mobile shell | **Capacitor 7, Android first** | Wraps the same build; native TTS, haptics, splash, back button; Play Store later |
| Styling | **Tailwind CSS v4 + shadcn/ui (Radix)** | Fast, accessible primitives, easy theming |
| Motion | CSS + Framer Motion (only where needed) | Keep JS budget |
| State | Zustand (session/UI) + TanStack Query (server cache) + Dexie (offline) | Simple, no over-engineering |
| Validation | Zod (shared between content pipeline, API, forms) | One schema, many uses |
| Persistence (v1) | **IndexedDB (Dexie)** + JSON export/import; content as static JSON packs | Zero backend, works offline, instant load |
| Backend (Phase 3) | **Supabase** (Postgres + RLS + Auth + Storage + Realtime) | Add cloud sync/accounts only when needed |
| Auth (Phase 3) | Supabase Auth: email magic link, Google, Apple | No password to forget, low friction |
| Media | Cloudflare R2 (audio/images) behind CDN | Cheap egress, S3-compatible |
| Speech scoring | Azure Speech Pronunciation Assessment (zh-CN), token-issued from server | Best tone/phoneme feedback; pluggable provider interface |
| TTS | **Build-time batch TTS** (Azure Neural zh-CN voices) → static audio files | Zero runtime cost, consistent, offline-capable |
| Handwriting | Hanzi Writer + Make Me a Hanzi stroke data | Standard, lightweight |
| Analytics | PostHog (EU/self-host option) + Sentry | Product analytics + errors |
| Testing | Vitest (unit), Playwright (E2E incl. mobile viewport), MSW | Confidence on the learning engine |
| CI/CD | GitHub Actions → Vercel (or Cloudflare Pages) | Preview deploys per PR |
| Monorepo | pnpm workspaces + Turborepo | `apps/web`, `packages/core`, `packages/content`, `packages/ui` |

> Note: `pnpm` is not currently on PATH; enable via `corepack enable pnpm` (Node 22 is installed).

**Alternatives considered**
- *Vite + React SPA:* simpler, but loses the landing page/SEO and Next's build-time routing. Next static export gives both at the same runtime cost.
- *Firebase:* fast, but weaker relational queries and SQL analytics; we need heavy content joins.
- *Self-hosted Postgres + Fastify:* full control, more ops work. Better at 100k+ MAU.
- *Flutter / React Native:* rejected — they require rewriting the UI and the learning engine, while Capacitor reuses 100% of the web build.
- *Fully native Kotlin/Compose:* the best possible feel, but months before the first lesson exists. Revisit only if the WebView proves too slow.

### 10.2 System diagram

> **v1 has no backend.** Content ships as static JSON; progress lives in IndexedDB. The cloud layer below is the Phase 3 target, kept in the design so nothing blocks it.

```
┌──────────────────────── Android / PWA client ────────────────────────┐
│  Next.js (static export) + Capacitor                                 │
│   ├─ Lesson player · story reader · roleplay                         │
│   ├─ Dexie (IndexedDB): cards, attempts, XP, offline queue           │
│   ├─ Bundled content + audio (works fully offline)                   │
│   ├─ Web Worker: FSRS scheduling + pitch-contour analysis            │
│   └─ Native bridge: TTS · haptics · SpeechRecognizer · back button   │
└───────────────┬──────────────────────────────┬───────────────────────┘
                │ Phase 3: HTTPS               │ Phase 3: token
                ▼                              ▼
     ┌───────────────────────┐     ┌───────────────────────────┐
     │ Supabase              │     │ /api/speech/token         │
     │ Postgres · RLS · Auth │     │ → Azure short-lived key   │
     │ Storage · Realtime    │     └─────────────┬─────────────┘
     └───────────┬───────────┘                   ▼
                 │                    ┌───────────────────────────┐
                 ▼                    │ Azure Speech (zh-CN)      │
     ┌───────────────────────┐        │ Pronunciation Assessment  │
     │ Content pipeline      │        └───────────────────────────┘
     │ YAML → validate → TTS │
     │ → bundle → ship       │
     └───────────────────────┘
```

### 10.3 Offline sync strategy

- **Reference data** (lessons, items, audio manifest): versioned JSON packs, stored in IndexedDB, invalidated by content version bump.
- **In the Android build** the reference data is bundled inside the APK (`assets/public`), so the app is fully offline out of the box; downloaded packs only add levels beyond what shipped.
- **Mutable state** (FSRS cards, XP, streak): local-first writes; queued mutations with client-generated ids and timestamps; server accepts idempotent upserts; on conflict, FSRS state = the one with the later review time, XP = union of events (dedup by id).
- **Never block a lesson on network.** Sync happens after the lesson summary screen.

### 10.4 Speech pipeline

1. **v1 (on-device, no backend):** `MediaRecorder` captures 1–15 s → a Web Worker extracts pitch (autocorrelation) → compare against the reference contour. The transcript comes from a **native `SpeechRecognizer` plugin**, because Android WebView does not expose the Web Speech API.
2. Score = pitch proximity + syllable timing + keyword coverage. Store the score summary, never the audio.
3. **Phase 3:** client requests a short-lived Azure token → Pronunciation Assessment (zh-CN) returns accuracy/fluency/completeness + phoneme scores for graded speaking exams.
4. Fallback chain: Azure → on-device ASR → pitch-only. The learner always gets *some* feedback, even offline.
5. Recordings stay on-device unless the learner explicitly opts into sync.

### 10.5 Security & privacy

- RLS on every user table (`auth.uid() = user_id`), service-role only in Edge Functions.
- Rate limits on auth, speech tokens, and write endpoints.
- Signed URLs for audio; no public buckets for user recordings.
- PDPA (Indonesia) + GDPR: consent screen, data export, account deletion, retention policy (delete recordings after 30 days by default).
- Minors: if classrooms launch, add teacher-managed accounts and parental consent flow.
- No third-party ad trackers. Analytics with IP anonymization.

### 10.6 i18n

- UI languages at launch: **English** + **Indonesian** (`next-intl`), then Spanish/Portuguese/Vietnamese based on demand.
- Gloss language per user profile; content strings (explanations, hints) stored per-locale with English fallback.
- **Immersion mode** (fun differentiator): at HSK 4+, optionally switch UI chrome to Chinese.

### 10.7 Android strategy (decided)

**Decision: Capacitor wrapper around the same Next.js static build — Android first, PWA as a by-product.**

| Approach | Time to first APK | Feel | Code reuse | Verdict |
|---|---|---|---|---|
| **Capacitor + Next.js static export** | days | WebView; ~90% native for a text/audio app | 100% | ✅ chosen |
| Native Kotlin + Compose | months | 100% native | 0% — full rewrite of UI + engine | ❌ only if WebView fails |
| React Native / Expo | weeks | native-ish | 0% of the Next.js UI | ❌ redundant |
| Flutter | weeks | native | 0% — Dart rewrite | ❌ redundant |

The app is text, audio, and light motion — exactly what a WebView does well. Every week spent rewriting UI in Kotlin is a week not spent on the content that actually teaches Chinese.

**What the wrapper buys us**
- Real APK, home-screen icon, splash screen, Android back-button handling, status-bar theming, haptics.
- Native TTS (`@capacitor-community/text-to-speech`) using Android's offline voices — more reliable than WebView `speechSynthesis`.
- Native speech recognition (small plugin around Android `SpeechRecognizer`) — **required**, because WebView has no Web Speech API.
- Content + audio bundled in the APK → works with zero network.
- Play Store later; sideloaded APK today.

**What we give up (and accept)**
- ~6–10 MB APK, growing with content.
- WebView performance ceiling on very cheap phones → keep the lesson DOM small, avoid large blurs/shadows, test on a 3 GB device.
- Content fixes need an app update until in-app content packs land (Phase 2).
- Not pixel-identical to HelloChinese's native feel — but for reading, audio, and taps, users cannot tell the difference if startup and transitions are fast.

**Plugins for v1**
`@capacitor/core` · `@capacitor/android` · `@capacitor/app` (back button) · `@capacitor/haptics` · `@capacitor/status-bar` · `@capacitor/splash-screen` · `@capacitor-community/text-to-speech` · custom `speech-recognition` plugin.

**Build path — your machine is already 90% ready**

| Requirement | Status |
|---|---|
| Node 22 | ✅ installed |
| JDK 17 | ✅ `C:\jdk17\jdk-17.0.20.1+1` (`JAVA_HOME` set) |
| Android SDK | ✅ `C:\Android\Sdk` — build-tools 35.0.0/36.0.0, platforms 34/35/36, platform-tools |
| `adb` | ⚠️ exists at `C:\Android\Sdk\platform-tools\adb.exe`, not on PATH |
| `pnpm` | ⚠️ not on PATH → `corepack enable pnpm` |
| Device / emulator | ❌ none connected (`adb devices` is empty) — need USB debugging or an emulator image |

```powershell
corepack enable pnpm
pnpm install
pnpm build            # next build → static export in ./out
npx cap sync android
cd android; .\gradlew.bat assembleDebug
adb install -r app\build\outputs\apk\debug\app-debug.apk
```

Keep a release keystore backed up before the first Play upload — losing it means never updating that listing.

**Distribution path**

| Path | Cost | Time | Audience |
|---|---|---|---|
| Sideload APK | $0 | minutes | You + friends with "install unknown apps" |
| Play internal testing | $25 once | hours | Up to 100 testers |
| Play closed testing | $25 | **14 days, 12 testers** (new personal accounts) | Required before production |
| Play production | $25 | after closed testing | Public |

For now: **release APK on your phone.** The Play Store only matters when the app is good enough to be judged publicly — and the 12-tester/14-day rule means starting that clock early if a public launch is the goal.

**Android behaviours to design for**
- Back button: close gloss/modal → confirm leaving a lesson → exit app. Never lose a half-finished lesson silently.
- Safe areas and cutouts (`env(safe-area-inset-*)`), `100dvh`, no fixed footers under the keyboard.
- Pinyin input needs `adjustResize`; test with Gboard.
- Audio focus: pause TTS on phone calls/notifications.
- External links open in the system browser (`@capacitor/browser`), not inside the WebView.

---

## 11. Data model

Core tables (Postgres; `user_id` everywhere for RLS):

**Identity & profile**
`profiles` (id, display_name, avatar, locale, timezone, daily_goal, pinyin_mode, traditional, created_at)
`user_settings` (notifications, reduced_motion, sound, zen_mode)
`placement_results` (user_id, level, seed_words, taken_at)

**Content (read-mostly, versioned)**
`levels` (1–9, band, title, description)
`units` (level_id, idx, title, story_beat_id)
`lessons` (unit_id, idx, type: lesson|checkpoint, est_minutes, version)
`exercises` (lesson_id, idx, type, payload jsonb, item_ids[], audio_key)
`items` (hanzi, pinyin, meaning_en, meaning_id, pos, level, freq_rank, radical, components[], audio_key)
`item_skills` (item_id, skill, difficulty_seed)
`sentences` (hanzi, pinyin, gloss, audio_key, level, tags[])
`grammar_points` (code, level, pattern, explanation, examples[])
`stories` (level, season, episode, title, cover_key, version)
`story_nodes` (story_id, idx, text, audio_key, glosses jsonb, question jsonb, next[])
`modules` (slug, title, domain, hsk_min, hsk_max, description)

**Learning state (hot, per user)**
`cards` (user_id, item_id, skill, stability, difficulty, due_at, reps, lapses, last_review, state) — FSRS
`reviews` (user_id, card_id, rating, elapsed_ms, reviewed_at) — log for optimization
`sessions` (user_id, kind, started_at, ended_at, xp, accuracy)
`attempts` (user_id, exercise_id, correct, latency_ms, answer jsonb, score jsonb)
`recordings` (user_id, attempt_id, storage_key, score jsonb, expires_at)

**Progress & game**
`unit_progress` (user_id, unit_id, stars, completed_at)
`story_progress` (user_id, story_id, node_idx, choices jsonb)
`streaks` (user_id, current, longest, freezes_left, last_day)
`xp_events` (user_id, amount, source, ref_id, created_at) — idempotent
`achievements` / `user_achievements`
`quests` / `user_quests`
`leagues` / `league_members` (weekly cohort, xp, rank)
`friendships` (requester, addressee, status)
`coins_ledger` / `cosmetics` / `user_cosmetics`

**Ops**
`content_versions` (version, published_at, changelog)
`notifications` (user_id, kind, scheduled_at, sent_at, payload)

Indexes that matter: `cards(user_id, due_at)`, `xp_events(user_id, created_at)`, `attempts(user_id, created_at)`, `league_members(league_id, xp desc)`.

---

## 12. Content pipeline, licensing, and volume math

### 12.1 Authoring format

Content lives in the repo as YAML (human-editable, diffs well), validated by Zod, compiled to JSON for the app.

```yaml
# content/hsk1/unit-03/lesson-02.yaml
id: hsk1-u03-l02
unit: hsk1-u03
title: "Weather & Plans"
new_words: [今天, 天气, 很, 好, 下雨, 冷, 热]
grammar: [g-hen-adjective]
exercises:
  - type: audio_choice
    audio: hsk1-u03-l02-s01
    prompt: "今天天气很好"
    options: ["The weather is nice today.", "It's raining today."]
    answer: 0
  - type: char_meaning
    item: 天气
    options: ["weather", "mood", "air", "sky"]
    answer: 0
  - type: order
    tokens: [今天, 天气, 很, 好]
    answer: [今天, 天气, 很, 好]
  - type: cloze
    sentence: "今天___很好。"
    answer: 天气
story_beat: story-shanghai-ep01-scene03
```

### 12.2 Validation & QA

`pnpm content:validate` fails CI on:
- unknown characters outside the level's allowed set (with an exception list),
- pinyin without tone marks / mismatched tone counts,
- missing audio keys,
- duplicate items within a unit,
- story coverage below 95% known words for the target level,
- missing native-review sign-off field.

Coverage report per level: words introduced vs HSK list, grammar points covered, characters covered, duplicate/overlap warnings.

### 12.3 Audio production

- Batch script: text → Azure Neural TTS (zh-CN-XiaoxiaoNeural for lessons, YunxiNeural for business/male voices) → loudness normalize (-16 LUFS) → Opus 32 kbps + MP3 fallback → upload to R2 → update manifest.
- Cache by content hash; only regenerate changed lines.
- Optional later: human voice actors for story mode (quality jump, but expensive).

### 12.4 Native review workflow

1. Author drafts (human or AI-assisted).
2. Automated validation.
3. **Native speaker review** — checklist: naturalness, register, regional neutrality, cultural accuracy, audio match.
4. Publish with version bump; users' progress unaffected.

Quality bar: no lesson ships without a native sign-off. This is the single biggest determinant of whether the app teaches real Chinese.

### 12.5 Licensing & attribution

| Asset | Source | License | Notes |
|---|---|---|---|
| Dictionary data | [CC-CEDICT](https://cc-cedict.org/) | CC BY-SA 4.0 | Share-alike: derivative dictionary data must stay open; attribute |
| Stroke order data | [Make Me a Hanzi](https://github.com/skishore/makemeahanzi) | Arphic Public License | Copyleft-style font license; keep data unmodified and attributed |
| Example sentences | [Tatoeba](https://tatoeba.org/) | CC BY 2.0 FR | Attribute; verify per-sentence |
| HSK word lists | Official standard / community lists | **Verify before commercial use** | Word lists are widely republished but not clearly licensed; independently verify and compile |
| Fonts | Noto Sans SC, LXGW WenKai | SIL OFL | Safe for embedding |
| Icons | Lucide | ISC | Safe |
| TTS audio | Azure Neural TTS output | Permitted under Azure terms | Confirm current terms for commercial distribution |
| Illustrations | Commissioned or AI + human cleanup | Owned / licensed | Keep provenance records |
| Sound effects | Freesound (CC0) or commissioned | CC0 / owned | Keep attribution file |

Add an `ATTRIBUTION.md` and a visible licenses page from day 1.

### 12.6 Volume math (be honest about this)

| Scope | New words | Approx. lessons (8 words + reviews) | Authoring effort @2h/lesson |
|---|---|---|---|
| HSK 1 | 300 | ~45 | ~90 h |
| HSK 2 | +200 | ~30 | ~60 h |
| HSK 3 | +500 | ~65 | ~130 h |
| HSK 4 | +1,000 | ~125 | ~250 h |
| HSK 5 | +1,600 | ~200 | ~400 h |
| HSK 6 | +1,800 | ~225 | ~450 h |
| HSK 7–9 | +5,600 | *(text-first strategy, not lessons)* | ~300 h of curated text packs |

Plus stories (~1 h per 3-minute episode, including art) and roleplays (~4 h each).

**Implication:** HSK 1–3 (≈140 lessons, ~280 h) is a realistic solo scope over ~4–6 months of content work alongside engineering. HSK 4–6 needs either a content partner, AI-assisted drafting with strict native review, or community contribution — plan for it explicitly rather than pretending it's free.

---

## 13. Metrics and instrumentation

**North star:** Weekly Active Learners who complete ≥ 3 learning sessions per week (WAL3).

| Funnel stage | Metric | Target (v1) |
|---|---|---|
| Acquisition | Landing → taste lesson start | > 45% |
| Activation | Taste lesson → account created | > 55% |
| Activation | First real lesson within 24 h | > 60% |
| Retention | D1 / D7 / D30 | 40% / 20% / 10% |
| Habit | Sessions per active week | ≥ 4 |
| Habit | Median session length | 8–12 min |
| Learning | Words reaching mastery ≥3 per week | ≥ 40 |
| Learning | Review accuracy | 85–92% (too high = too easy) |
| Speaking | Speaking attempts per active week | ≥ 5 |
| Content | Story episodes completed per month | ≥ 2 |
| Monetization (if on) | Free → paid conversion | 2–5% |

**Guardrails (alert if violated):**
- Sessions > 45 min (burnout signal).
- Churn spike within 48 h of a streak break.
- Notification opt-out > 10%.
- Review accuracy < 70% (content too hard) or > 95% (too easy).
- Speaking score complaints / low correlation with human ratings.

**Instrumentation:** typed event schema (`lesson_started`, `exercise_answered`, `lesson_completed`, `story_scene_read`, `speaking_scored`, `streak_extended`, `league_joined`, `paywall_shown`...), with properties (item id, skill, latency, difficulty). PostHog funnels + cohorts; a weekly SQL report for learning outcomes.

**Experiments:** session composer weights, new-item cap, pinyin fade timing, streak freeze generosity, story episode length.

**v1 (no accounts):** metrics are computed locally and shown in Stats. Any telemetry is anonymous and opt-in — the app works fully with it off.

---

## 14. Roadmap and milestones

Assumes one full-time developer (you) + part-time native content reviewer. Adjust by dividing by available hours.

### Phase 0 — Foundation (week 1)
- Lock decisions in §17; write `README`, `ATTRIBUTION.md`, `CONTRIBUTING`.
- Design tokens + component inventory + 3 key screens (map, lesson, story).
- Content schema (Zod) + 1 sample unit.
- Walking skeleton: Next.js static export deployed + **hello-world APK installed on your phone**.
- **Gate:** web URL *and* an APK that opens a fake lesson and records an attempt end-to-end.

### Phase 1 — Learning core + Android shell (weeks 2–6)
- Lesson player with exercise types 1–7; audio playback; local progress persistence.
- FSRS integration (client-side scheduling).
- HSK 1 units 1–4 content (~20 lessons) with audio bundled.
- Streak + XP + daily goal; session summary screen.
- Responsive shell (bottom nav / desktop sidebar); dark mode.
- Capacitor: splash, status bar, haptics, back-button rules, native TTS.
- **Gate:** *you* complete a full 15-minute Daily Quest **in the APK, offline, on your phone** — and it feels smoother than the browser version.

### Phase 2 — Retention engine + real APK (weeks 7–10)
- Placement test + skip tests.
- Story mode episode 1 (glossing, tap-to-define, audio).
- Speaking v1: record, pitch contour, native `SpeechRecognizer` keyword check.
- Achievements, character cards, quests.
- Local notifications (streak reminder), in-app content packs.
- **Gate:** 2-week personal streak; release APK shared with 5 friends; D7 ≥ 25% in that group.

### Phase 3 — Accounts & social beta (weeks 11–15)
- HSK 1 complete + HSK 2 half; leagues, friends, study rooms.
- Accounts + cloud sync (Supabase), only for those who want multi-device.
- Stats dashboard, HSK readiness gauge.
- Analytics (opt-in) + error tracking.
- i18n polish (EN/ID), accessibility audit, performance pass on a low-end phone.
- **Gate:** 20–50 external testers via Play internal testing; activation ≥ 50%; no P0 bugs in a week.

### Phase 4 — Public launch (weeks 16–24)
- HSK 2 complete, HSK 3 in progress.
- **Business Mandarin module 1** (6 missions) + Tech module teaser.
- Level exams HSK 1–2 (then 3) with report cards.
- Play Store: closed testing (12 testers / 14 days) → production.
- Marketing site + SEO story pages + share cards.
- **Gate:** public launch; D30 ≥ 8%; store rating ≥ 4.3; content pipeline sustainable.

### Phase 5+ — Depth (months 6–18)
- HSK 4–6 content with a content partner; 4+ verticals; exams 3–5.
- Handwriting recognition, dictation, free production with LLM rubric.
- Classrooms + teacher dashboard; **iOS wrapper via Capacitor**.
- HSK 7–9 authentic-text reader.

---

## 15. Cost model and monetization

### 15.1 Infrastructure (monthly, rough)

**v1 (solo, no backend, sideloaded APK): $0** — static hosting on a free tier + local storage. The table below applies only once cloud sync/accounts exist.

| Users (MAU) | Supabase | Hosting | R2/CDN | Speech (Azure) | Total |
|---|---|---|---|---|---|
| 100 | $0–25 | $0–20 | <$5 | ~$0 | **~$25** |
| 1,000 | $25 | $20 | $10 | ~$100 | **~$155** |
| 10,000 | $25–100 | $50–100 | $30 | **~$1,000** | **~$1,200** |
| 100,000 | $400+ | $300+ | $200 | ~$8,000 | **~$9,000** |

Speech math: 4 s per scored utterance × 10 attempts/day × 3,000 DAU ≈ 33 audio-hours/day ≈ **$1,000/month** at ~$1/audio-hour (verify current Azure pricing). Hence: free tier cap + practice mode without paid scoring.

### 15.2 Monetization — **none** (the app is free)

No ads, no paywall, no premium tier, no "energy". The infrastructure table above exists only to show what *would* be spent if the app ever went public at scale (and to justify why v1 stays local-first). If a paid tier is ever revisited, the only defensible line is advanced modules — never access to HSK 1–2.

---

## 16. Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Content volume/quality is the real bottleneck | High | Templates, AI drafts + mandatory native review, ship narrow and deep (HSK 1 brilliant before HSK 5 exists) |
| Speech scoring unfairly harsh on tones | High | Calibrate thresholds, show contour not just number, forgiving beginner mode, human-rated validation set |
| Licensing (HSK lists, TTS, fonts, audio) | High | `ATTRIBUTION.md`, permissive sources, legal check before commercial launch |
| Scope creep (10 modules, 9 levels, social, AI) | High | Phase gates; each phase has a "definition of done"; cut ruthlessly |
| Solo-founder burnout | High | Dogfood daily, ship weekly, keep the daily loop fun for yourself |
| iOS parity | Low (later) | Same Capacitor project once Android is stable; not a separate build |
| Android WebView has no Web Speech API | High (speaking) | Native `SpeechRecognizer` plugin + pitch-contour fallback, so the feature never disappears |
| Play Store: 12 testers / 14 days closed testing | Medium (launch timing) | Sideload APK now; recruit testers in Phase 3; never block learning on store approval |
| WebView jank on 3 GB phones | Medium | Small DOM, no blur/shadow in lesson UI, test on a real low-end device, JS budget in CI |
| Content fixes require an app update | Low | In-app content packs (Phase 2) + data-driven lessons from day one |
| Backlog death spiral (SRS) | Medium | 150/day cap, backlog mode, "catch-up" plan |
| Competition (Duolingo et al.) | Medium | Differentiation is story + speaking + verticals, not feature parity |
| Legal: trademark "HSK" | Low | Use "HSK-aligned", no official logos, clear disclaimer |
| Privacy (recordings, minors) | Medium | Consent, retention limits, deletion, PDPA/GDPR review before classrooms |

---

## 17. Decisions log

### Locked (2026-10-25)

| # | Decision | Choice |
|---|---|---|
| 1 | **Price** | Free forever. No ads, no paywall, no premium tier. |
| 2 | **Languages** | English + Indonesian, toggle in the header, remembered per device. |
| 3 | **Accounts** | None in v1. Progress saved locally + export/import JSON. Accounts + sync are Phase 3. |
| 4 | **Performance** | Fast & light: static-first, < 150 KB JS, no animation library in the lesson player, offline packs. |
| 5 | **Grading** | HSK 3.0 (2025)-aligned: continuous ability estimate + graded checkpoints + level exams + report card. See [docs/ASSESSMENT.md](docs/ASSESSMENT.md). |
| 6 | **Visuals** | Simple, nice, light: ink/paper palette, inline SVG, 小墨 mascot, no 3D, < 60 KB art per screen. |
| 7 | **Reference product** | HelloChinese sets the beginner-quality bar; we beat it on story, advanced verticals, and game meta. |
| 8 | **Stack** | Next.js 15 + Tailwind + Dexie (local-first, static export). Supabase added in Phase 3 only. |
| 9 | **Name** | **HanziPeak** (display name, 2026-10-25) — 9 levels = 9 peaks. Package id stays `com.hanziquest.app` for update compatibility. Store subtitle: "Learn Chinese · HSK 1". |
| 10 | **Platform** | Android-first via Capacitor; the same build also ships as a PWA. iOS later with the same wrapper. |
| 11 | **Distribution** | Sideloaded APK now. Play Store only after the app earns it (closed testing first). |
| 12 | **Target device** | Your current Android phone; also test on a cheap 3 GB device before any public launch. |

### Open

| # | Question | Options | My recommendation |
|---|---|---|---|
| 1 | **Store listing name** | "Learn Chinese" alone vs "Learn Chinese · HSK 1" vs a brand + subtitle | Add a differentiator before any store release — the bare name is extremely crowded |
| 2 | **Speech scoring** | On-device only (free, offline) vs Azure (backend + ~$1/audio-hour) | On-device in v1 (pitch + native ASR); Azure only once accounts exist |
| 3 | **Build start** | Start Phase 0 now vs more planning | Start now; Phase 0 is one week and reversible |
| 4 | **Play developer account** | Register now ($25) vs later | Later — sideload until the app is good; register before recruiting 12 testers |

### Name collision check (2026-10-25)

"HanziQuest" is already in active use, so it is not a safe brand:

| Finding | Detail |
|---|---|
| Active HSK games site | [`hanziquest.cn`](https://www.hanziquest.cn/) — Chinese writing games, HSK 1 vocabulary games, terms page |
| Google Play app | "Hanzi Quest" (`fr.plduhoux.hanziquest`) — [listing/analytics](https://www.appbrain.com/app/hanzi-quest/fr.plduhoux.hanziquest) |
| GitHub projects | 4+ repos, incl. [jazztong/hanziquest](https://github.com/jazztong/hanziquest) (Sept 2026: "story-driven 华文 learning game … FSRS spaced repetition, HSK 3.0 coverage gating") — nearly our exact concept |
| Domains | `hanziquest.com` is registered (resolves) |

Candidate names checked the same way:

| Candidate | Web presence | Domain status | Notes |
|---|---|---|---|
| **HanziPeak** | none found | `hanzipeak.com` unregistered | Peak = the 9-level map; **recommended** |
| **HanziGrove** | none found | `hanzigrove.com` / `.app` unregistered | Calm, growth/collection metaphor |
| **HanziHarbor** | none found | `hanziharbor.com` unregistered | Safe-harbor feel, less game-y |
| HanziDojo | none found | free | Skip — "dojo" is Japanese, wrong flavour |
| HanziTrail | none found | `.com` registered | Possible, but domain is taken |
| HanziForge | **taken** — [hanziforge.com](https://hanziforge.com/) is an AI Chinese-learning product | `.com` registered | Skip |
| ZiQuest | none found | `ziquest.com` registered | Domain taken |

**This is a quick web/DNS check, not a legal clearance.** Before spending on logo/domain/App Store listing, run a proper trademark search (USPTO, EUIPO, WIPO, Indonesia DJKI) and check handle availability on Instagram/TikTok/X/YouTube. A name can be unregistered yet still create confusion with an existing product.

---

## 18. First 10 days

1. **Day 1:** Confirm the name; `corepack enable pnpm`; scaffold Next.js + Tailwind + shadcn; deploy "Hello" (static export, no backend).
2. **Day 2:** Design tokens (color, type, spacing, radii), app shell (bottom nav / sidebar), dark mode.
3. **Day 3:** Content schema (Zod) + sample HSK 1 unit + validator script.
4. **Day 4:** Lesson player skeleton: audio → 4-option choice → feedback → next; progress bar; summary screen.
5. **Day 5:** Local persistence: Dexie schema for cards/attempts/XP + export/import JSON; no auth.
6. **Day 6:** FSRS integration + `/review` screen with due cards.
7. **Day 7:** Audio pipeline: TTS batch script for the sample unit → `/public/audio` → manifest (R2 later if the library grows).
8. **Day 8:** Daily Quest composer + streak/XP; first end-to-end session.
9. **Day 9:** PWA manifest + service worker + offline cache for one unit; EN/ID toggle.
10. **Day 10:** Personal dogfood day: use only the app for your own Chinese study; log friction; write Phase 1 backlog.

**Week 3 (once the web lesson loop exists):** `npx cap add android`, native TTS + speech plugin, first APK on your phone — see §10.7. Android does not wait for the whole web app to be finished.

---

## Appendix A — Routes

```
/                         landing (SEO, demo lesson)
/onboarding               goal, time, placement
/learn                    journey map
/learn/[level]            level detail
/lesson/[id]              lesson player
/review                   SRS queue
/story                    story seasons
/story/[season]/[ep]      reader
/speak                    speaking hub
/speak/roleplay/[slug]    roleplay scenario
/modules                  advanced catalog
/modules/[slug]           module detail
/exam                     mock exams
/exam/[level]/[id]        exam runner
/stats                    progress dashboard
/achievements             badges & collection
/leaderboard              leagues
/friends                  social
/settings                 preferences, data, accessibility
/admin                    content studio (internal)
/api/speech/token         short-lived Azure token
/api/health               uptime
```

## Appendix B — Exercise payload types

```ts
type Exercise =
  | { type: 'audio_choice'; audioKey: string; prompt?: string; options: string[]; answer: number }
  | { type: 'char_meaning'; itemId: string; options: string[]; answer: number }
  | { type: 'meaning_char'; itemId: string; options: string[]; answer: number }
  | { type: 'order'; tokens: string[]; answer: string[] }
  | { type: 'cloze'; sentence: string; options: string[]; answer: number; grammarCode?: string }
  | { type: 'type_pinyin'; itemId: string; answer: string; tolerance?: 'tones' | 'none' }
  | { type: 'tone_choice'; audioKey: string; syllable: string; answer: 1 | 2 | 3 | 4 | 0 }
  | { type: 'stroke_trace'; char: string; showGuide: boolean }
  | { type: 'component_build'; char: string; components: string[] }
  | { type: 'shadow'; audioKey: string; text: string; threshold: number }
  | { type: 'roleplay_turn'; scenarioId: string; turn: number; expected: string[]; rubric: Rubric };
```

## Appendix C — Sources

- HSK 3.0 (2025) structure, bands, vocabulary counts, and exam sections: [Wikipedia — Hanyu Shuiping Kaoshi](https://en.wikipedia.org/wiki/Hanyu_Shuiping_Kaoshi) *(verify against official CTI/Hanban publications before content lock)*
- Azure Pronunciation Assessment (zh-CN support, syllable/phoneme granularity, prosody limits): [Microsoft Learn](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/how-to-pronunciation-assessment)
- CC-CEDICT dictionary data and license: [cc-cedict.org](https://cc-cedict.org/)
- Stroke data: [Make Me a Hanzi](https://github.com/skishore/makemeahanzi) (Arphic Public License)
- FSRS algorithm and TypeScript implementation: [open-spaced-repetition/ts-fsrs](https://github.com/open-spaced-repetition/ts-fsrs)
- Example-sentence corpus: [Tatoeba](https://tatoeba.org/) (CC BY 2.0 FR)
