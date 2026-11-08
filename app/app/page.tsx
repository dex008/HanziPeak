"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ChangeEvent, type ReactNode } from "react";
import { QA, SPEAK, STORY, UI, type Lang } from "../lib/content";
import { LESSON_SCENES, SCENES } from "../lib/scenes";
import SceneArt from "../components/SceneArt";
import { LESSONS, LESSONS2, UNITS, UNITS2, TOTAL_WORDS, TOTAL_WORDS2, isUnlocked, nextLesson, type Lesson } from "../lib/curriculum";
import { WORDS, type Word } from "../lib/words";
import { WORDS2 } from "../lib/words2";
import { buildLessonQuiz, buildReviewQuiz, type Exercise } from "../lib/quiz";
import {
  cardKey,
  dueCards,
  grade,
  loadCards,
  masteredCount,
  newCard,
  pack,
  saveCards,
  type CardMap,
  type Skill,
} from "../lib/srs";
import {
  DEFAULT_PROGRESS,
  addXp,
  completedCount,
  loadProgress,
  saveProgress,
  type Progress,
} from "../lib/progress";
import { chineseVoiceStatus, installChineseVoice, speak, type VoiceStatus } from "../lib/tts";
import StrokeWriter from "../components/StrokeWriter";
import PandaTeacher from "../components/PandaTeacher";
import { clarityScore, listenOnce, requestMic, speechAvailable } from "../lib/speech";
import { analyzeTones, recordSamples, type ToneResult } from "../lib/pitch";
import {
  createAccount,
  getAccount,
  isUnlocked as isSessionUnlocked,
  removeAccount,
  setUnlocked,
  verifyPin,
  type Account,
} from "../lib/localAccount";

type Screen = "learn" | "lesson" | "review" | "speak" | "story" | "report";

const TABS: Array<{ id: Screen; key: string }> = [
  { id: "learn", key: "tabLearn" },
  { id: "review", key: "tabReview" },
  { id: "speak", key: "tabSpeak" },
  { id: "story", key: "tabStory" },
  { id: "report", key: "tabReport" },
];

const ICONS: Partial<Record<Screen, ReactNode>> = {
  learn: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 1 4 16.5z" />
      <path d="M4 16.5A2.5 2.5 0 0 1 6.5 14H20" />
    </svg>
  ),
  review: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a9 9 0 1 1-3-6.7" />
      <path d="M21 3v6h-6" />
    </svg>
  ),
  speak: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0" />
      <path d="M12 18v3" />
    </svg>
  ),
  story: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 4h11a2 2 0 0 1 2 2v14H8a2 2 0 0 1-2-2z" />
      <path d="M6 4a2 2 0 0 0-2 2v14" />
      <path d="M10 8h5M10 12h5" />
    </svg>
  ),
  report: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20V11" />
      <path d="M10 20V4" />
      <path d="M16 20v-6" />
      <path d="M22 20H2" />
    </svg>
  ),
};

const GOAL = 50;

const TRY_WORD = { h: "你好", p: "nǐ hǎo" };
const TRY_OPTIONS: Record<Lang, string[]> = {
  en: ["hello", "thank you", "goodbye"],
  id: ["halo", "terima kasih", "sampai jumpa"],
};

function Mascot({ size = 72, mood = "happy" }: { size?: number; mood?: "happy" | "cheer" }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className="mascot"
      aria-hidden="true"
      focusable="false"
    >
      {/* ink-blob body */}
      <circle cx="50" cy="58" r="34" fill="#1e1b16" />
      <ellipse cx="37" cy="40" rx="9" ry="5" fill="#ffffff" opacity="0.14" transform="rotate(-28 37 40)" />
      {/* antenna + red seal dot */}
      <path d="M50 24 L50 13" stroke="#1e1b16" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="50" cy="10" r="4" fill="#b8432f" />
      {/* face */}
      <circle cx="40" cy="55" r="5" fill="#fff" />
      <circle cx="60" cy="55" r="5" fill="#fff" />
      {mood === "cheer" ? (
        <path d="M42 68 Q50 78 58 68" stroke="#fff" strokeWidth="3.2" fill="none" strokeLinecap="round" />
      ) : (
        <path d="M43 69 Q50 75 57 69" stroke="#fff" strokeWidth="3.2" fill="none" strokeLinecap="round" />
      )}
      <circle cx="29" cy="63" r="3.4" fill="#b8432f" opacity="0.85" />
      <circle cx="71" cy="63" r="3.4" fill="#b8432f" opacity="0.85" />
    </svg>
  );
}

async function haptic(ok: boolean) {
  try {
    const { Haptics, ImpactStyle } = await import("@capacitor/haptics");
    await Haptics.impact({ style: ok ? ImpactStyle.Light : ImpactStyle.Heavy });
  } catch {
    /* web */
  }
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [screen, setScreen] = useState<Screen>("learn");
  const [progress, setProgress] = useState<Progress>(DEFAULT_PROGRESS);
  const [cards, setCards] = useState<CardMap>({});
  const [ready, setReady] = useState(false);
  const [voice, setVoice] = useState<VoiceStatus>("unknown");
  const [onboarded, setOnboarded] = useState(true);
  const [tried, setTried] = useState(false);
  const [tryPick, setTryPick] = useState<number | null>(null);

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [step, setStep] = useState<"scene" | "teach" | "quiz">("scene");
  const [teachIdx, setTeachIdx] = useState(0);
  const [quiz, setQuiz] = useState<Exercise[]>([]);
  const [qi, setQi] = useState(0);
  const [selected, setSelected] = useState(-1);
  const [order, setOrder] = useState<number[]>([]);
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [combo, setCombo] = useState(0);
  const [session, setSession] = useState<{ correct: number; total: number; xp: number } | null>(null);
  const [celebrate, setCelebrate] = useState(false);

  const [reviewQuiz, setReviewQuiz] = useState<Exercise[]>([]);
  const [ri, setRi] = useState(0);
  const [reviewDone, setReviewDone] = useState(false);
  const [reviewTotal, setReviewTotal] = useState(0);

  const [speakIdx, setSpeakIdx] = useState(0);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [speakScore, setSpeakScore] = useState<number | null>(null);
  const [speakError, setSpeakError] = useState("");
  const [speechOk, setSpeechOk] = useState<boolean | null>(null);
  const [toneBusy, setToneBusy] = useState(false);
  const [toneResult, setToneResult] = useState<ToneResult | null>(null);
  const [toneError, setToneError] = useState("");
  const [qaIdx, setQaIdx] = useState(0);
  const [qaBusy, setQaBusy] = useState(false);
  const [qaTranscript, setQaTranscript] = useState("");
  const [qaScore, setQaScore] = useState<number | null>(null);
  const [qaError, setQaError] = useState("");
  const [resetArm, setResetArm] = useState(false);

  const [account, setAccount] = useState<Account | null>(null);
  const [locked, setLocked] = useState(false);
  const [accName, setAccName] = useState("");
  const [accPin, setAccPin] = useState("");
  const [accBusy, setAccBusy] = useState(false);
  const [accError, setAccError] = useState("");
  const [accMessage, setAccMessage] = useState("");
  const [removeArm, setRemoveArm] = useState(false);
  const [level, setLevel] = useState<1 | 2>(1);
  const chooseLevel = useCallback((lv: 1 | 2) => {
    setLevel(lv);
    try {
      localStorage.setItem("hq.level", String(lv));
    } catch {
      /* ignore */
    }
    setScreen("learn");
    setLesson(null);
  }, []);
  const [lastBackup, setLastBackup] = useState<string | null>(null);
  const [backupDismissed, setBackupDismissed] = useState(false);

  const [gloss, setGloss] = useState<{ h: string; p: string; en: string; id: string } | null>(null);
  const [playing, setPlaying] = useState(false);
  const [scenePick, setScenePick] = useState<number | null>(null);

  const [strokeWord, setStrokeWord] = useState<Word | null>(null);
  const [strokeCharIdx, setStrokeCharIdx] = useState(0);
  const [strokeMode, setStrokeMode] = useState<"animate" | "quiz">("animate");
  const [strokeRun, setStrokeRun] = useState(0);
  const [strokeProgress, setStrokeProgress] = useState(0);
  const [strokeDone, setStrokeDone] = useState(false);
  const [strokeHint, setStrokeHint] = useState(false);
  const [beat, setBeat] = useState(0);

  const wrongRef = useRef<Set<string>>(new Set());
  const screenRef = useRef<Screen>("learn");
  screenRef.current = screen;

  const t = useCallback((key: string) => UI[lang][key] ?? UI.en[key] ?? key, [lang]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("hq.lang");
      if (stored === "id" || stored === "en") setLang(stored);
      else if (navigator.language?.toLowerCase().startsWith("id")) setLang("id");
      setOnboarded(localStorage.getItem("hq.onboarded") === "1");
      setTried(localStorage.getItem("hq.tried") === "1");
    } catch {
      /* ignore */
    }
    setProgress(loadProgress());
    setCards(loadCards());
    setReady(true);
    void chineseVoiceStatus().then(setVoice);
    void speechAvailable().then(setSpeechOk);

    const acc = getAccount();
    setAccount(acc);
    setLocked(Boolean(acc) && !isSessionUnlocked());
    try {
      setLastBackup(localStorage.getItem("hq.lastBackup"));
      const savedLevel = Number(localStorage.getItem("hq.level"));
      if (savedLevel === 2) setLevel(2);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem("hq.lang", lang);
    } catch {
      /* ignore */
    }
    document.documentElement.lang = lang;
  }, [lang, ready]);

  useEffect(() => {
    if (ready) saveProgress(progress);
  }, [progress, ready]);

  useEffect(() => {
    if (ready) saveCards(cards);
  }, [cards, ready]);

  useEffect(() => {
    let disposed = false;
    let remove: (() => void) | undefined;

    (async () => {
      try {
        const { Capacitor } = await import("@capacitor/core");
        if (!Capacitor.isNativePlatform()) return;

        const { StatusBar, Style } = await import("@capacitor/status-bar");
        await StatusBar.setStyle({ style: Style.Light }).catch(() => undefined);
        await StatusBar.setBackgroundColor({ color: "#f7f2e7" }).catch(() => undefined);

        const { SplashScreen } = await import("@capacitor/splash-screen");
        await SplashScreen.hide().catch(() => undefined);

        const { App } = await import("@capacitor/app");
        const sub = await App.addListener("backButton", () => {
          if (screenRef.current !== "learn") setScreen("learn");
          else void App.exitApp();
        });
        remove = () => void sub.remove();
        if (disposed) remove();
      } catch (err) {
        console.warn("native setup failed", err);
      }
    })();

    return () => {
      disposed = true;
      remove?.();
    };
  }, []);

  useEffect(() => {
    if (!gloss) return;
    const id = window.setTimeout(() => setGloss(null), 4500);
    return () => window.clearTimeout(id);
  }, [gloss]);

  const play = useCallback(async (text: string) => {
    setPlaying(true);
    await speak(text);
    window.setTimeout(() => setPlaying(false), 1500);
  }, []);

  const completed = completedCount(progress);
  const due = useMemo(() => dueCards(cards), [cards]);
  const mastered = useMemo(() => masteredCount(cards), [cards]);
  const levelLessons = level === 2 ? LESSONS2 : LESSONS;
  const levelUnits = level === 2 ? UNITS2 : UNITS;
  const levelTotal = level === 2 ? TOTAL_WORDS2 : TOTAL_WORDS;
  const completedLevel = levelLessons.filter((l) => progress.lessons[l.id]?.done).length;
  const next = useMemo(
    () => levelLessons.find((l) => !progress.lessons[l.id]?.done) ?? levelLessons[levelLessons.length - 1],
    [levelLessons, progress.lessons],
  );
  const scene = lesson ? LESSON_SCENES[lesson.id] ?? SCENES[lesson.unit] : undefined;
  const coverage = Math.min(levelTotal, completedLevel * 10);
  const backupStale =
    !lastBackup || Date.now() - Date.parse(lastBackup) > 7 * 24 * 60 * 60 * 1000;
  const showBackupNudge = completed > 0 && backupStale && !backupDismissed;
  const accuracy = progress.answers ? Math.round((progress.correct / progress.answers) * 100) : 0;
  const ability = (1 + coverage / levelTotal).toFixed(1);
  const todayXp = progress.todayXp ?? 0;

  const startLesson = useCallback((l: Lesson) => {
    setLesson(l);
    setStep(LESSON_SCENES[l.id] ? "scene" : "teach");
    setTeachIdx(0);
    setQuiz([]);
    setQi(0);
    setSelected(-1);
    setOrder([]);
    setChecked(false);
    setCorrect(0);
    setCombo(0);
    setSession(null);
    setCelebrate(false);
    setScenePick(null);
    wrongRef.current = new Set();
    setScreen("lesson");
    try {
      localStorage.setItem("hq.onboarded", "1");
    } catch {
      /* ignore */
    }
    setOnboarded(true);
  }, [level]);

  const teachNext = useCallback(() => {
    if (!lesson) return;
    if (teachIdx < lesson.words.length - 1) {
      setTeachIdx((i) => i + 1);
      return;
    }
    setQuiz(
      buildLessonQuiz(
        lesson.words,
        level === 2 ? (WORDS2 as unknown as Word[]) : WORDS,
        lang,
        level === 2 ? lesson.unit + 6 : lesson.unit,
      ),
    );
    setQi(0);
    setSelected(-1);
    setOrder([]);
    setChecked(false);
    setStep("quiz");
  }, [lesson, teachIdx, lang, level]);

  const finishLesson = useCallback(() => {
    if (!lesson) return;
    const total = quiz.length || 15;
    const gained = 20 + correct * 4;

    setProgress((p) => {
      const withXp = addXp(p, gained);
      return {
        ...withXp,
        lessons: {
          ...withXp.lessons,
          [lesson.id]: { done: true, best: Math.max(correct, p.lessons[lesson.id]?.best ?? 0) },
        },
      };
    });

    setCards((prev) => {
      const out = { ...prev };
      const now = new Date();
      for (const w of lesson.words) {
        const ok = !wrongRef.current.has(w.id);
        for (const skill of ["rec", "prod"] as Skill[]) {
          const key = cardKey(w.id, skill);
          const existing = out[key];
          if (!existing) {
            out[key] = skill === "rec" ? newCard(now) : pack(grade(undefined, ok, now));
          } else if (ok) {
            out[key] = pack(grade(existing, true, now));
          }
        }
      }
      return out;
    });

    setSession({ correct, total, xp: gained });
    setCelebrate(true);
    setScreen("report");
  }, [lesson, quiz.length, correct]);

  const isOrder = (ex: Exercise) => ex.kind === "order";

  const currentCorrect = useCallback(
    (ex: Exercise, pick: number, seq: number[]) => {
      if (isOrder(ex)) {
        return seq.map((i) => ex.tokens?.[i] ?? "").join("|") === (ex.answerOrder ?? []).join("|");
      }
      return pick === ex.answer;
    },
    [],
  );

  const onCheck = useCallback(() => {
    if (!quiz[qi]) return;
    const ex = quiz[qi];
    const ready = isOrder(ex) ? order.length === (ex.tokens?.length ?? 0) : selected >= 0;
    if (!ready) return;

    if (!checked) {
      const ok = currentCorrect(ex, selected, order);
      setChecked(true);
      setProgress((p) => ({ ...p, answers: p.answers + 1, correct: p.correct + (ok ? 1 : 0) }));
      if (ok) {
        setCorrect((c) => c + 1);
        setCombo((c) => c + 1);
      } else {
        wrongRef.current.add(ex.word.id);
        setCombo(0);
      }
      void haptic(ok);
      return;
    }

    if (qi < quiz.length - 1) {
      setQi((n) => n + 1);
      setSelected(-1);
      setOrder([]);
      setChecked(false);
    } else {
      finishLesson();
    }
  }, [quiz, qi, selected, order, checked, currentCorrect, finishLesson]);

  const strokeChars = strokeWord
    ? [...strokeWord.h].filter((c) => /[\u4e00-\u9fff]/.test(c))
    : [];

  const startReview = useCallback(() => {
    const entries = due
      .slice(0, 20)
      .map(({ key }) => {
        const [wordId, skill] = key.split(":");
        const word = WORDS.find((w) => w.id === wordId);
        return word ? { key, skill: skill as Skill, word } : null;
      })
      .filter((x): x is { key: string; skill: Skill; word: Word } => Boolean(x));

    setReviewQuiz(buildReviewQuiz(entries, WORDS, lang));
    setReviewTotal(entries.length);
    setRi(0);
    setReviewDone(false);
    setSelected(-1);
    setChecked(false);
    setScreen("review");
  }, [due, lang]);

  const onReviewCheck = useCallback(() => {
    if (selected < 0 || !reviewQuiz[ri]) return;
    const ex = reviewQuiz[ri];

    if (!checked) {
      const ok = selected === ex.answer;
      setChecked(true);
      setProgress((p) => ({ ...p, answers: p.answers + 1, correct: p.correct + (ok ? 1 : 0) }));
      setCards((prev) => {
        const key = cardKey(ex.word.id, ex.skill);
        return { ...prev, [key]: pack(grade(prev[key], ok)) };
      });
      void haptic(ok);
      return;
    }

    if (ri < reviewQuiz.length - 1) {
      setRi((n) => n + 1);
      setSelected(-1);
      setChecked(false);
    } else {
      setReviewDone(true);
    }
  }, [selected, checked, reviewQuiz, ri]);

  useEffect(() => {
    if (screen !== "lesson" || step !== "quiz") return;
    const ex = quiz[qi];
    if (ex?.audio) void play(ex.word.h);
  }, [screen, step, qi, quiz, play]);

  useEffect(() => {
    if (screen !== "review" || reviewDone) return;
    const ex = reviewQuiz[ri];
    if (ex?.audio) void play(ex.word.h);
  }, [screen, reviewDone, ri, reviewQuiz, play]);

  const startSpeak = useCallback(async () => {
    const item = SPEAK[speakIdx];
    if (!item || listening) return;
    setSpeakError("");
    setTranscript("");
    setSpeakScore(null);
    setListening(true);
    try {
      const granted = await requestMic();
      if (!granted) {
        setSpeakError(t("speakMicDenied"));
        return;
      }
      const matches = await listenOnce("zh-CN");
      const heard = matches[0] ?? "";
      setTranscript(heard);
      const score = clarityScore(item.h, heard);
      setSpeakScore(score);
      setProgress((p) => ({
        ...p,
        speaking: {
          ...p.speaking,
          [item.uid]: {
            attempts: (p.speaking[item.uid]?.attempts ?? 0) + 1,
            best: Math.max(score, p.speaking[item.uid]?.best ?? 0),
          },
        },
      }));
    } catch {
      setSpeakError(t("speakRetry"));
    } finally {
      setListening(false);
    }
  }, [speakIdx, listening, t]);

  const nextSpeak = useCallback(() => {
    setSpeakIdx((i) => (i + 1) % SPEAK.length);
    setTranscript("");
    setSpeakScore(null);
    setSpeakError("");
    setToneResult(null);
    setToneError("");
  }, []);

  const nextQA = useCallback(() => {
    setQaIdx((i) => (i + 1) % QA.length);
    setQaTranscript("");
    setQaScore(null);
    setQaError("");
  }, []);

  useEffect(() => {
    if (!playing) return;
    const pinyin = lesson?.words[teachIdx]?.p ?? "";
    const syl = Math.max(1, (pinyin.match(/[a-zü]+/gi) ?? []).length);
    let n = 0;
    const id = window.setInterval(() => {
      n += 1;
      setBeat((b) => b + 1);
      if (n >= syl) window.clearInterval(id);
    }, 300);
    return () => window.clearInterval(id);
  }, [playing, lesson, teachIdx]);

  const startQA = useCallback(async () => {
    if (qaBusy) return;
    setQaBusy(true);
    setQaError("");
    setQaScore(null);
    setQaTranscript("");
    try {
      await requestMic();
      const matches = await listenOnce("zh-CN");
      const text = (matches[0] ?? "").trim();
      if (!text) {
        setQaError(t("convNoSpeech"));
        return;
      }
      setQaTranscript(text);
      const item = QA[qaIdx];
      const clarity = clarityScore(text, item.sample);
      const hits = item.keys.filter((k) => text.includes(k)).length;
      const keyword = Math.round((hits / item.keys.length) * 100);
      setQaScore(Math.round(clarity * 0.5 + keyword * 0.5));
    } catch {
      setQaError(t("speakUnsupported"));
    } finally {
      setQaBusy(false);
    }
  }, [qaBusy, qaIdx, t]);

  const startToneCheck = useCallback(async () => {
    if (toneBusy) return;
    setToneBusy(true);
    setToneError("");
    setToneResult(null);
    try {
      const { samples, sampleRate } = await recordSamples(2600);
      const result = analyzeTones(samples, sampleRate, SPEAK[speakIdx].p);
      if (!result.syllables.length) setToneError(t("toneNoVoice"));
      else setToneResult(result);
    } catch {
      setToneError(t("toneUnsupported"));
    } finally {
      setToneBusy(false);
    }
  }, [toneBusy, speakIdx, t]);

  const resetProgress = useCallback(() => {
    if (!resetArm) {
      setResetArm(true);
      window.setTimeout(() => setResetArm(false), 4000);
      return;
    }
    try {
      ["hq.progress.v3", "hq.cards.v2", "hq.onboarded", "hq.tried"].forEach((k) =>
        localStorage.removeItem(k),
      );
    } catch {
      /* ignore */
    }
    window.location.reload();
  }, [resetArm]);

  const openStroke = useCallback((word: Word) => {
    setStrokeWord(word);
    setStrokeCharIdx(0);
    setStrokeMode("animate");
    setStrokeProgress(0);
    setStrokeDone(false);
    setStrokeHint(false);
    setStrokeRun((r) => r + 1);
  }, []);

  const resetStroke = useCallback(() => {
    setStrokeProgress(0);
    setStrokeDone(false);
    setStrokeHint(false);
    setStrokeRun((r) => r + 1);
  }, []);

  const handleCreateAccount = useCallback(async () => {
    if (accBusy) return;
    setAccBusy(true);
    setAccError("");
    try {
      const acc = await createAccount(accName, accPin);
      setAccount(acc);
      setLocked(false);
      setAccPin("");
      setAccMessage(t("accountSaved"));
    } catch (err) {
      setAccError(err instanceof Error ? err.message : t("authError"));
    } finally {
      setAccBusy(false);
    }
  }, [accBusy, accName, accPin, t]);

  const handleUnlock = useCallback(async () => {
    if (accBusy) return;
    setAccBusy(true);
    setAccError("");
    try {
      const ok = await verifyPin(accPin);
      if (!ok) {
        setAccError(t("wrongPin"));
        return;
      }
      setUnlocked(true);
      setLocked(false);
      setAccPin("");
    } finally {
      setAccBusy(false);
    }
  }, [accBusy, accPin, t]);

  const lockAccount = useCallback(() => {
    setUnlocked(false);
    setLocked(true);
    setAccPin("");
    setAccMessage("");
  }, []);

  const handleRemoveAccount = useCallback(() => {
    if (!removeArm) {
      setRemoveArm(true);
      window.setTimeout(() => setRemoveArm(false), 4000);
      return;
    }
    removeAccount();
    setAccount(null);
    setLocked(false);
    setRemoveArm(false);
    setAccMessage("");
  }, [removeArm]);

  const exportBackup = useCallback(() => {
    const payload = JSON.stringify(
      { progress, cards, exportedAt: new Date().toISOString() },
      null,
      2,
    );
    const url = URL.createObjectURL(new Blob([payload], { type: "application/json" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "hanzipeak-backup.json";
    a.click();
    URL.revokeObjectURL(url);
    const ts = new Date().toISOString();
    try {
      localStorage.setItem("hq.lastBackup", ts);
    } catch {
      /* ignore */
    }
    setLastBackup(ts);
    setAccMessage(t("backupDone"));
  }, [progress, cards, t]);

  const importBackup = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;
      try {
        const parsed = JSON.parse(await file.text()) as { progress?: Progress; cards?: CardMap };
        if (parsed.progress) setProgress(parsed.progress);
        if (parsed.cards) setCards(parsed.cards);
        setAccMessage(t("backupImported"));
      } catch {
        setAccError(t("backupFailed"));
      }
    },
    [t],
  );
  const toneName = (n: number) => `#${n}`;
  const shapeName = (s: string) =>
    s === "flat"
      ? t("toneFlat")
      : s === "rise"
        ? t("toneRise")
        : s === "dip"
          ? t("toneDip")
          : s === "fall"
            ? t("toneFall")
            : "—";

  const current = screen === "lesson" ? quiz[qi] : reviewQuiz[ri];
  const ok = current ? checked && currentCorrect(current, selected, order) : false;
  const promptFor = (ex: Exercise) =>
    ex.skill === "prod" ? t("askWord") : ex.skill === "listen" ? t("askListen") : t("askMeaning");

  const stars = session ? (session.correct / session.total >= 0.9 ? 3 : session.correct / session.total >= 0.7 ? 2 : 1) : 0;

  const tryAnswer = (i: number) => {
    setTryPick(i);
    if (i === 0) {
      if (!tried) {
        setProgress((p) => addXp(p, 5));
        setTried(true);
        try {
          localStorage.setItem("hq.tried", "1");
        } catch {
          /* ignore */
        }
      }
    }
  };

  const showWelcome = ready && !onboarded && completed === 0;

  return (
    <div className="shell">
      <header className="topbar">
        <div className="brand">
          <div className="seal" aria-hidden="true">
            字
          </div>
          <div className="wordmark">
            {t("appName")}
            <small>{t("appSub").replace(/HSK 1/, `HSK ${level}`)}</small>
          </div>
        </div>
        <div className="top-right">
          <div className="lang" role="group" aria-label="Language">
            <button type="button" onClick={() => setLang("en")} aria-pressed={lang === "en"}>
              EN
            </button>
            <button type="button" onClick={() => setLang("id")} aria-pressed={lang === "id"}>
              ID
            </button>
          </div>
          <div className="streak" title={t("streak")}>
            🔥 <span>{progress.streak}</span>
          </div>
        </div>
      </header>

      <nav className="tabs" role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={screen === tab.id}
            onClick={() => (tab.id === "review" ? startReview() : setScreen(tab.id))}
          >
            <span className="tab-ico">{ICONS[tab.id]}</span>
            <span>{t(tab.key)}</span>
            {tab.id === "review" && due.length > 0 && <span className="badge">{due.length}</span>}
          </button>
        ))}
      </nav>

      {screen === "learn" && (
        <section className="screen" aria-label={t("tabLearn")}>
          {voice === "missing" && (
            <div className="banner">
              <span>{t("voiceMissing")}</span>
              <button type="button" onClick={() => void installChineseVoice()}>
                {t("installVoice")}
              </button>
            </div>
          )}

          <div className="level-switch" role="group" aria-label={t("level")}>
            <button type="button" className={level === 1 ? "on" : ""} onClick={() => chooseLevel(1)}>
              HSK 1
            </button>
            <button type="button" className={level === 2 ? "on" : ""} onClick={() => chooseLevel(2)}>
              HSK 2
            </button>
          </div>

          <div className="grid">
            <div className="stack">
              <div className="card hero-card">
                <SceneArt unit={next.unit} className="hero-art" hideBubbles={level === 2} />
                <div className="hero-top">
                  <Mascot size={78} />
                  <div className={`bubble ${todayXp >= GOAL ? "done" : ""}`}>
                    {todayXp >= GOAL ? t("goalDone") : t("heroGreeting")}
                  </div>
                </div>
                <button type="button" className="btn block" onClick={() => startLesson(next)}>
                  {t("heroCta")} · {t("lesson")} {next.index + 1}
                </button>
                <div className="goal-row">
                  <div className="goal-track">
                    <i
                      style={{
                        width: `${Math.min(100, (todayXp / GOAL) * 100)}%`,
                        background: todayXp >= GOAL ? "var(--jade)" : undefined,
                      }}
                    />
                  </div>
                  <span>
                    {Math.min(todayXp, GOAL)}/{GOAL} XP · {t("goalTitle")}
                  </span>
                </div>
              </div>

              <div className="card pad" style={level === 2 ? { display: "none" } : undefined}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <h2>{t("tryTitle")}</h2>
                  <span className="chip">+5 XP</span>
                </div>
                <div className="try-word zh">{TRY_WORD.h}</div>
                <div className="pinyin">{TRY_WORD.p}</div>
                <p className="sub" style={{ marginTop: 6 }}>
                  {t("tryPrompt")}
                </p>
                <div className="options compact">
                  {TRY_OPTIONS[lang].map((label, i) => {
                    const answered = tryPick !== null;
                    const state =
                      answered && i === 0 ? "opt correct" : answered && i === tryPick ? "opt wrong" : "opt";
                    return (
                      <button
                        key={label}
                        type="button"
                        className={state}
                        disabled={tryPick === 0}
                        onClick={() => tryAnswer(i)}
                      >
                        <span className="key">{"ABC"[i]}</span>
                        <span>{label}</span>
                      </button>
                    );
                  })}
                </div>
                {tryPick === 0 && <p className="try-ok">{t("tryCorrect")}</p>}
                {tryPick !== null && tryPick !== 0 && <p className="try-no">{t("tryWrong")}</p>}
              </div>

              <div className="card pad review-card">
                <div>
                  <h2>{due.length > 0 ? `${due.length} ${t("dueNow")}` : t("reviewTitle")}</h2>
                  <p className="sub" style={{ marginTop: 4 }}>
                    {due.length > 0 ? t("reviewTitle") : t("noReviews")}
                  </p>
                </div>
                <button type="button" className="btn" disabled={due.length === 0} onClick={startReview}>
                  {t("reviewBtn")}
                </button>
              </div>

              <div className="card pad">
                <h2>{t("unitsTitle")}</h2>
                {levelUnits.map((unit) => (
                  <div className="unit" key={unit.index}>
                    <div className="unit-head">
                      <b>
                        {t("unit")} {unit.index + 1} · {unit.title[lang]}
                      </b>
                      <span className="sub">
                        {unit.lessons.filter((l) => progress.lessons[l.id]?.done).length}/
                        {unit.lessons.length}
                      </span>
                    </div>
                    <div className="lesson-row">
                      {unit.lessons.map((l) => {
                        const done = Boolean(progress.lessons[l.id]?.done);
                        const unlocked =
                          l.index === 0 ||
                          Boolean(progress.lessons[levelLessons[l.index - 1].id]?.done);
                        return (
                          <button
                            key={l.id}
                            type="button"
                            className={`ldot ${done ? "done" : unlocked ? "open" : "lock"}`}
                            disabled={!unlocked}
                            onClick={() => startLesson(l)}
                            aria-label={`${t("lesson")} ${l.index + 1}`}
                          >
                            {done ? "✓" : l.index + 1}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <aside className="stack">
              <div className="card">
                <div className="metric">
                  <span className="k">{t("coverage")}</span>
                  <span className="v">
                    {coverage} / {levelTotal}
                  </span>
                  <div className="bar">
                    <i style={{ width: `${(coverage / levelTotal) * 100}%` }} />
                  </div>
                </div>
                <div className="metric">
                  <span className="k">{t("mastered")}</span>
                  <span className="v">{mastered}</span>
                </div>
                <div className="metric">
                  <span className="k">{t("accuracy")}</span>
                  <span className="v">{accuracy}%</span>
                </div>
                <div className="metric">
                  <span className="k">{t("ability")}</span>
                  <span className="v">HSK {ability}</span>
                </div>
              </div>

              <div className="card pad">
                <h2>{t("nextActions")}</h2>
                <ul style={{ margin: "10px 0 0", paddingLeft: 18, fontSize: 13.5, lineHeight: 1.7 }}>
                  <li>{t("next1")}</li>
                  <li>{t("next2")}</li>
                  <li>{t("next3")}</li>
                </ul>
              </div>
            </aside>
          </div>
        </section>
      )}

      {screen === "lesson" && lesson && (
        <section className="screen" aria-label={t("tabLearn")}>
          <div className="lesson-wrap">
            <div className="lesson-top">
              <div className="progress">
                <i
                  style={{
                    width:
                      step === "scene"
                        ? "0%"
                        : step === "teach"
                          ? `${((teachIdx + 1) / lesson.words.length) * 100}%`
                          : `${((qi + (checked ? 1 : 0)) / Math.max(1, quiz.length)) * 100}%`,
                  }}
                />
              </div>
              <div className="counter">
                {step === "scene"
                  ? ""
                  : step === "teach"
                    ? `${teachIdx + 1}/${lesson.words.length}`
                    : `${qi + 1}/${quiz.length}`}
              </div>
            </div>

            {step === "scene" && scene && (
              <>
              <div className="scene-teacher">
                <PandaTeacher
                  size={64}
                  talking={playing}
                  mood={
                    scenePick === null
                      ? "idle"
                      : scenePick === scene.question.answer
                        ? "happy"
                        : "sad"
                  }
                />
                <div className="teacher-bubble">{t("scenePrompt")}</div>
              </div>
              <div className="card scene-card">
                <SceneArt unit={lesson.unit} variant={scene.art} className="scene-art" hideBubbles={Number(lesson.id.slice(3)) > 45} />
                <div className="scene-head">
                  <span className="pill">{t("conversation")}</span>
                  <span className="sub">{scene.place[lang]}</span>
                </div>
                <h2 style={{ marginTop: 10 }}>{scene.title[lang]}</h2>
                <div className="dialog">
                  {scene.lines.map((line, i) => (
                    <div key={i} className={`line ${line.who === "B" ? "right" : "left"}`}>
                      <div className="line-body">
                        <span className="line-name">{line.name}</span>
                        <div className="line-zh zh">{line.h}</div>
                        <div className="line-py">{line.p}</div>
                        <div className="line-tr">{lang === "id" ? line.id : line.en}</div>
                      </div>
                      <button
                        type="button"
                        className="line-audio"
                        aria-label={t("listen")}
                        onClick={() => void play(line.h)}
                      >
                        🔊
                      </button>
                    </div>
                  ))}
                </div>
                <p className="note">{t("sceneHint")}</p>

                <div className="scene-q">
                  <div className="scene-q-title">{t("sceneQuestion")}</div>
                  <p className="scene-q-text">
                    {lang === "id" ? scene.question.id : scene.question.en}
                  </p>
                  <div className="options compact">
                    {scene.question.options.map((opt, i) => {
                      const answer = scene.question.answer;
                      const state =
                        scenePick === null
                          ? "opt"
                          : i === answer
                            ? "opt correct"
                            : i === scenePick
                              ? "opt wrong"
                              : "opt";
                      return (
                        <button
                          key={i}
                          type="button"
                          className={state}
                          disabled={scenePick !== null}
                          onClick={() => setScenePick(i)}
                        >
                          <span className="key">{"ABC"[i]}</span>
                          <span>{lang === "id" ? opt.id : opt.en}</span>
                        </button>
                      );
                    })}
                  </div>
                  {scenePick !== null && (
                    <p className={`scene-feedback ${scenePick === scene.question.answer ? "good" : "bad"}`}>
                      {scenePick === scene.question.answer
                        ? t("sceneCorrect")
                        : `${t("sceneWrong")}: ${lang === "id" ? scene.question.options[scene.question.answer].id : scene.question.options[scene.question.answer].en}`}
                    </p>
                  )}
                </div>

              </div>

              <div className="scene-cta">
                <button
                  type="button"
                  className="btn block"
                  disabled={scenePick === null}
                  onClick={() => setStep("teach")}
                >
                  {t("learnWords")}
                </button>
              </div>
              </>
            )}

            {step === "teach" && lesson.words[teachIdx] && (
              <div className="card teach">
                <div className="teacher-row">
                  <PandaTeacher size={82} talking={playing} point={!playing} beat={beat} />
                  <div className="teacher-say">
                    <div className="teacher-name">潘老师</div>
                    <div className="teacher-bubble">{t("teacherPrompt")}</div>
                  </div>
                </div>
                <div className="teach-k">{t("teachTitle")}</div>
                <button
                  type="button"
                  className={`audio ${playing ? "playing" : ""}`}
                  onClick={() => void play(lesson.words[teachIdx].h)}
                  aria-label={t("tapToHear")}
                >
                  🔊
                </button>
                <div className="bigword zh">{lesson.words[teachIdx].h}</div>
                <div className="pinyin">{lesson.words[teachIdx].p}</div>
                <div className="meaning">{lang === "id" ? lesson.words[teachIdx].idn : lesson.words[teachIdx].en}</div>
                <button
                  type="button"
                  className="stroke-link"
                  onClick={() => openStroke(lesson.words[teachIdx])}
                >
                  ✍️ {t("strokeOpen")}
                </button>
                <div className="teach-dots">
                  {lesson.words.map((w, i) => (
                    <span key={w.id} className={i <= teachIdx ? "dot-on" : "dot-off"} />
                  ))}
                </div>
                <button type="button" className="btn block" onClick={teachNext}>
                  {teachIdx === lesson.words.length - 1 ? t("teachStart") : t("teachNext")}
                </button>
              </div>
            )}

            {step === "quiz" && current && (
              <>
                <div className="card qbox">
                  {combo > 1 && <div className="combo">🔥 x{combo}</div>}
                  {current.kind === "order" ? (
                    <>
                      <div className="prompt">{t("orderPrompt")}</div>
                      <div className="order-meaning">{current.prompt}</div>
                      <button
                        type="button"
                        className="order-audio"
                        onClick={() => void play((current.answerOrder ?? []).join(""))}
                      >
                        🔊 {t("listen")}
                      </button>
                      <div className="answer-row">
                        {order.length === 0 && <span className="order-help">{t("orderPlaceholder")}</span>}
                        {order.map((idx, pos) => (
                          <button
                            key={`${idx}-${pos}`}
                            type="button"
                            className="token placed"
                            disabled={checked}
                            onClick={() => setOrder((o) => o.filter((_, p) => p !== pos))}
                          >
                            {current.tokens?.[idx]}
                          </button>
                        ))}
                      </div>
                      <div className="token-row">
                        {current.tokens?.map((token, idx) => (
                          <button
                            key={`${token}-${idx}`}
                            type="button"
                            className="token"
                            disabled={checked || order.includes(idx)}
                            onClick={() => setOrder((o) => [...o, idx])}
                          >
                            {token}
                          </button>
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      {current.audio ? (
                        <button
                          type="button"
                          className={`audio ${playing ? "playing" : ""}`}
                          onClick={() => void play(current.word.h)}
                          aria-label={t("listen")}
                        >
                          🔊
                        </button>
                      ) : null}
                      {current.skill === "prod" ? (
                        <div className="meaning big-meaning">{current.prompt}</div>
                      ) : (
                        <>
                          <div className="hanzi zh">{current.prompt}</div>
                          {current.pinyin && <div className="pinyin">{current.pinyin}</div>}
                        </>
                      )}
                      <div className="prompt">{promptFor(current)}</div>

                      <div className="options">
                        {current.options.map((label, i) => {
                          const state =
                            checked && i === current.answer
                              ? "opt correct"
                              : checked && i === selected
                                ? "opt wrong"
                                : "opt";
                          return (
                            <button
                              key={`${current.key}-${i}`}
                              type="button"
                              className={state}
                              aria-pressed={selected === i}
                              disabled={checked}
                              onClick={() => !checked && setSelected(i)}
                            >
                              <span className="key">{"ABCD"[i]}</span>
                              <span>{label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </>
                  )}

                  {checked && (
                    <div className={`feedback ${ok ? "ok" : "no"}`} role="status" aria-live="polite">
                      <span className="teacher-mini">
                        <PandaTeacher size={52} mood={ok ? "happy" : "sad"} />
                      </span>
                      <b>{ok ? t("correct") : t("wrong")}</b>
                      {current.kind === "order" ? (
                        <span className="zh" style={{ marginLeft: 8 }}>
                          {(current.answerOrder ?? []).join("")}
                        </span>
                      ) : (
                        <>
                          <span className="zh" style={{ marginLeft: 8 }}>
                            {current.word.h} {current.word.p}
                          </span>
                          <span style={{ marginLeft: 8 }}>
                            {lang === "id" ? current.word.idn : current.word.en}
                          </span>
                        </>
                      )}
                    </div>
                  )}
                </div>

                <div className="lesson-foot">
                  <button type="button" className="btn ghost" onClick={() => setScreen("learn")}>
                    {t("backToMap")}
                  </button>
                  <button
                    type="button"
                    className="btn"
                    id="checkBtn"
                    disabled={current.kind === "order" ? order.length !== (current.tokens?.length ?? 0) : selected < 0}
                    onClick={onCheck}
                  >
                    {!checked ? t("check") : qi < quiz.length - 1 ? t("next") : t("finish")}
                  </button>
                </div>
              </>
            )}
          </div>
        </section>
      )}

      {screen === "review" && (
        <section className="screen" aria-label={t("tabReview")}>
          <div className="lesson-wrap">
            {reviewQuiz.length === 0 && (
              <div className="card pad" style={{ textAlign: "center" }}>
                <h2>{t("reviewTitle")}</h2>
                <p className="sub" style={{ marginTop: 6 }}>
                  {t("noReviews")}
                </p>
                <button type="button" className="btn" style={{ marginTop: 16 }} onClick={() => setScreen("learn")}>
                  {t("backToMap")}
                </button>
              </div>
            )}

            {reviewQuiz.length > 0 && !reviewDone && current && (
              <>
                <div className="lesson-top">
                  <div className="progress">
                    <i style={{ width: `${((ri + (checked ? 1 : 0)) / reviewQuiz.length) * 100}%` }} />
                  </div>
                  <div className="counter">
                    {ri + 1}/{reviewQuiz.length}
                  </div>
                </div>

                <div className="card qbox">
                  {current.audio ? (
                    <button
                      type="button"
                      className={`audio ${playing ? "playing" : ""}`}
                      onClick={() => void play(current.word.h)}
                    >
                      🔊
                    </button>
                  ) : null}
                  {current.skill === "prod" ? (
                    <div className="meaning big-meaning">{current.prompt}</div>
                  ) : (
                    <>
                      <div className="hanzi zh">{current.prompt}</div>
                      {current.pinyin && <div className="pinyin">{current.pinyin}</div>}
                    </>
                  )}
                  <div className="prompt">{promptFor(current)}</div>

                  <div className="options">
                    {current.options.map((label, i) => {
                      const state =
                        checked && i === current.answer
                          ? "opt correct"
                          : checked && i === selected
                            ? "opt wrong"
                            : "opt";
                      return (
                        <button
                          key={`${current.key}-${i}`}
                          type="button"
                          className={state}
                          disabled={checked}
                          onClick={() => !checked && setSelected(i)}
                        >
                          <span className="key">{"ABCD"[i]}</span>
                          <span>{label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {checked && (
                    <div className={`feedback ${ok ? "ok" : "no"}`}>
                      <b>{ok ? t("correct") : t("wrong")}</b>
                      <span className="zh" style={{ marginLeft: 8 }}>
                        {current.word.h} {current.word.p}
                      </span>
                    </div>
                  )}
                </div>

                <div className="lesson-foot">
                  <button type="button" className="btn ghost" onClick={() => setScreen("learn")}>
                    {t("backToMap")}
                  </button>
                  <button type="button" className="btn" disabled={selected < 0} onClick={onReviewCheck}>
                    {!checked ? t("check") : ri < reviewQuiz.length - 1 ? t("next") : t("finish")}
                  </button>
                </div>
              </>
            )}

            {reviewDone && (
              <div className="card pad" style={{ textAlign: "center" }}>
                <h2>{t("reviewsDone")}</h2>
                <p className="sub" style={{ marginTop: 6 }}>
                  {reviewTotal} {t("words")}
                </p>
                <button type="button" className="btn" style={{ marginTop: 16 }} onClick={() => setScreen("learn")}>
                  {t("backToMap")}
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {screen === "speak" && (
        <section className="screen" aria-label={t("tabSpeak")}>
          <div className="lesson-wrap">
            <div className="card speak-card">
              <div className="speak-head">
                <span className="pill">{t("tabSpeak")}</span>
                <span className="sub">
                  {speakIdx + 1}/{SPEAK.length}
                </span>
              </div>
              <div className="speak-hanzi zh">{SPEAK[speakIdx].h}</div>
              <div className="pinyin">{SPEAK[speakIdx].p}</div>
              <div className="meaning">{lang === "id" ? SPEAK[speakIdx].id : SPEAK[speakIdx].en}</div>

              <div className="speak-actions">
                <button type="button" className="btn ghost" onClick={() => void play(SPEAK[speakIdx].h)}>
                  🔊 {t("speakListen")}
                </button>
                <button
                  type="button"
                  className={`mic ${listening ? "listening" : ""}`}
                  onClick={() => void startSpeak()}
                  disabled={listening || speechOk === false}
                  aria-label={t("speakStart")}
                >
                  🎤
                </button>
              </div>
              <p className="sub" style={{ textAlign: "center" }}>
                {listening ? t("speakListening") : t("speakStart")}
              </p>

              {speechOk === false && <p className="speak-warn">{t("speakUnsupported")}</p>}
              {speakError && <p className="speak-warn">{speakError}</p>}

              {speakScore !== null && (
                <div className="speak-result">
                  <div className="score-row">
                    <span>{t("speakScore")}</span>
                    <b>{speakScore}</b>
                  </div>
                  <div className="bar">
                    <i
                      style={{
                        width: `${speakScore}%`,
                        background: speakScore >= 60 ? "var(--jade)" : "var(--gold)",
                      }}
                    />
                  </div>
                  <p className="sub" style={{ marginTop: 8 }}>
                    {t("speakHeard")}: “{transcript || "—"}”
                  </p>
                  <p className={`speak-feedback ${speakScore >= 90 ? "good" : speakScore >= 60 ? "ok" : "bad"}`}>
                    {speakScore >= 90 ? t("speakPerfect") : speakScore >= 60 ? t("speakGood") : t("speakAlmost")}
                  </p>
                  <div className="speak-buttons">
                    <button type="button" className="btn ghost" onClick={() => void startSpeak()}>
                      {t("speakTryAgain")}
                    </button>
                    <button type="button" className="btn" onClick={nextSpeak}>
                      {t("speakNext")}
                    </button>
                  </div>
                </div>
              )}

              <div className="tone-actions">
                <button type="button" className="btn ghost" onClick={() => void startToneCheck()} disabled={toneBusy}>
                  🎵 {t("toneCheck")}
                </button>
              </div>
              {toneBusy && (
                <p className="sub" style={{ textAlign: "center" }}>
                  {t("toneRecording")}
                </p>
              )}
              {toneError && <p className="speak-warn">{toneError}</p>}
              {toneResult && (
                <div className="tone-result">
                  <div className="score-row">
                    <span>{t("toneScore")}</span>
                    <b>{toneResult.score}</b>
                  </div>
                  <div className="tone-teacher">
                    <PandaTeacher
                      size={60}
                      mood={toneResult.score >= 80 ? "happy" : toneResult.score >= 55 ? "think" : "sad"}
                    />
                    <span>
                      {toneResult.score >= 80
                        ? t("tonePraise")
                        : toneResult.score >= 55
                          ? t("toneKeep")
                          : t("toneTry")}
                    </span>
                  </div>
                  <svg viewBox="0 0 260 40" className="tone-spark" aria-hidden="true">
                    <polyline
                      points={toneResult.contour
                        .map((v, i) => {
                          const x =
                            toneResult.contour.length > 1
                              ? (i / (toneResult.contour.length - 1)) * 260
                              : 0;
                          const y = 20 - Math.max(-14, Math.min(14, v)) * 1.2;
                          return `${x.toFixed(1)},${y.toFixed(1)}`;
                        })
                        .join(" ")}
                      fill="none"
                      stroke="#2e6b5a"
                      strokeWidth="2"
                    />
                  </svg>
                  <div className="tone-rows">
                    {toneResult.syllables.map((s, i) => (
                      <div className="tone-row" key={`${s.syllable}-${i}`}>
                        <span className="tone-syl">{s.syllable}</span>
                        <span className="tone-exp">{toneName(s.expected)}</span>
                        <span className={`tone-det ${s.detected}`}>{shapeName(s.detected)}</span>
                        <b>{s.score}</b>
                      </div>
                    ))}
                  </div>
                  <p className="note">{t("toneNote")}</p>
                  <button type="button" className="btn ghost block" onClick={() => void startToneCheck()}>
                    {t("toneAgain")}
                  </button>
                </div>
              )}

              <div className="card pad qa-card">
                <div className="score-row">
                  <h2>{t("convTitle")}</h2>
                  <span className="chip">🎤</span>
                </div>
                <p className="sub">{t("convPrompt")}</p>
                <div className="qa-q zh">{QA[qaIdx].q}</div>
                <div className="pinyin">{QA[qaIdx].qp}</div>
                <p className="sub">{lang === "id" ? QA[qaIdx].id : QA[qaIdx].en}</p>
                <div className="speak-actions">
                  <button type="button" className="btn ghost" onClick={() => void play(QA[qaIdx].q)}>
                    🔊 {t("convListen")}
                  </button>
                  <button
                    type="button"
                    className={`mic ${qaBusy ? "listening" : ""}`}
                    onClick={() => void startQA()}
                    disabled={qaBusy}
                    aria-label={t("convPrompt")}
                  >
                    🎤
                  </button>
                </div>
                {qaError && <p className="speak-warn">{qaError}</p>}
                {qaScore !== null && (
                  <div className="qa-result">
                    <PandaTeacher
                      size={54}
                      mood={qaScore >= 70 ? "happy" : qaScore >= 40 ? "think" : "sad"}
                    />
                    <div style={{ flex: 1 }}>
                      <div className="score-row">
                        <span>{t("convScore")}</span>
                        <b>{qaScore}</b>
                      </div>
                      <p className="sub" style={{ marginTop: 4 }}>
                        {t("convHeard")}: “{qaTranscript || "—"}”
                      </p>
                      <p className="note">
                        {t("convSample")}: {QA[qaIdx].sample}
                      </p>
                    </div>
                  </div>
                )}
                <button type="button" className="btn ghost block" style={{ marginTop: 10 }} onClick={nextQA}>
                  {t("convNext")}
                </button>
              </div>

              <p className="note">{t("speakNote")}</p>
            </div>
          </div>
        </section>
      )}

      {screen === "story" && (
        <section className="screen" aria-label={t("tabStory")}>
          <div className="card story">
            <div className="story-head">
              <div>
                <h2>{t("storyTitle")}</h2>
                <p className="sub">{t("storySub")}</p>
              </div>
              <span className="chip">{t("hsk1")}</span>
            </div>

            <div className="story-text">
              {STORY.map((line, li) => (
                <p key={li} style={{ margin: 0 }}>
                  {line.map((w, wi) =>
                    w.punct ? (
                      <span key={wi} className="w punct">
                        {w.h}
                      </span>
                    ) : (
                      <button key={wi} type="button" className="w" onClick={() => setGloss(w)}>
                        {w.h}
                      </button>
                    ),
                  )}
                </p>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 18, gap: 10 }}>
              <span className="sub">{t("tapHint")}</span>
              <button type="button" className="btn" onClick={() => setScreen("learn")}>
                {t("back")}
              </button>
            </div>
          </div>

          {gloss && (
            <div className="gloss" role="dialog" aria-live="polite">
              <b className="zh">{gloss.h}</b>
              <div className="py">{gloss.p}</div>
              <div className="mn">{lang === "id" ? gloss.id : gloss.en}</div>
              <div className="gloss-actions">
                <button type="button" onClick={() => void play(gloss.h)}>
                  🔊 {t("listen")}
                </button>
                <button type="button" onClick={() => setGloss(null)}>
                  ✕
                </button>
              </div>
            </div>
          )}
        </section>
      )}

      {screen === "report" && (
        <section className="screen" aria-label={t("tabReport")}>
          <div className="grid">
            <div className="stack">
              <div className="card pad">
                <span className="k" style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", fontWeight: 700 }}>
                  {t("ability")}
                </span>
                <div className="ability">
                  <span className="big">HSK {ability}</span>
                  <span className="pm">±0.4</span>
                </div>

                <div className="stats">
                  <div className="stat">
                    <b>{completed}</b>
                    <span>{t("lessonsDone")}</span>
                  </div>
                  <div className="stat">
                    <b>{coverage}</b>
                    <span>{t("wordsSeen")}</span>
                  </div>
                  <div className="stat">
                    <b>{mastered}</b>
                    <span>{t("mastered")}</span>
                  </div>
                  <div className="stat">
                    <b>{accuracy}%</b>
                    <span>{t("accuracy")}</span>
                  </div>
                </div>
              </div>

              <div className="card pad">
                <h2>{t("coverage")}</h2>
                <div className="bar" style={{ marginTop: 10, height: 10 }}>
                  <i style={{ width: `${(coverage / levelTotal) * 100}%` }} />
                </div>
                <p className="sub" style={{ marginTop: 8 }}>
                  {coverage} {t("of")} {levelTotal} {t("words")}
                </p>
              </div>

              <div className="card pad">
                <h2>{t("resetProgress")}</h2>
                <button
                  type="button"
                  className={`btn ${resetArm ? "" : "ghost"} block`}
                  style={{ marginTop: 10 }}
                  onClick={resetProgress}
                >
                  {resetArm ? t("resetConfirm") : t("resetProgress")}
                </button>
              </div>

              {showBackupNudge && (
                <div className="card pad">
                  <h2>{t("backupTitle")}</h2>
                  <p className="note">{t("backupBody")}</p>
                  <div className="account-row">
                    <button type="button" className="btn" onClick={exportBackup}>
                      {t("backupNow")}
                    </button>
                    <button type="button" className="btn ghost" onClick={() => setBackupDismissed(true)}>
                      {t("backupLater")}
                    </button>
                  </div>
                </div>
              )}

              <div className="card pad">
                <h2>{t("account")}</h2>
                <p className="note">{t("accountLocalNote")}</p>

                {!account ? (
                  <>
                    <input
                      className="input"
                      placeholder={t("accName")}
                      value={accName}
                      onChange={(e) => setAccName(e.target.value)}
                    />
                    <input
                      className="input"
                      type="password"
                      inputMode="numeric"
                      autoComplete="new-password"
                      placeholder={t("accPin")}
                      value={accPin}
                      onChange={(e) => setAccPin(e.target.value)}
                    />
                    <button
                      type="button"
                      className="btn block"
                      style={{ marginTop: 8 }}
                      disabled={accBusy}
                      onClick={() => void handleCreateAccount()}
                    >
                      {t("createAccount")}
                    </button>
                  </>
                ) : (
                  <>
                    <p className="sub">{account.name}</p>
                    <button type="button" className="btn ghost block" onClick={lockAccount}>
                      {t("signOut")}
                    </button>
                    <button
                      type="button"
                      className={`btn ${removeArm ? "" : "ghost"} block`}
                      style={{ marginTop: 8 }}
                      onClick={handleRemoveAccount}
                    >
                      {removeArm ? t("removeConfirm") : t("removeAccount")}
                    </button>
                  </>
                )}

                {(accError || accMessage) && <p className="note">{accError || accMessage}</p>}

                <div className="account-backup">
                  <button type="button" className="btn ghost" onClick={exportBackup}>
                    {t("exportBackup")}
                  </button>
                  <label className="btn ghost">
                    {t("importBackup")}
                    <input type="file" accept="application/json" hidden onChange={(e) => void importBackup(e)} />
                  </label>
                </div>
                <p className="note">{t("localOnly")}</p>
              </div>
            </div>

            <aside className="stack">
              <div className="grade">
                <div>
                  <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.7 }}>
                    {t("xp")}
                  </div>
                  <div style={{ fontWeight: 800, fontSize: 15, marginTop: 4 }}>
                    {progress.xp} · 🔥 {progress.streak}
                  </div>
                </div>
                <div className="letter">{stars ? ["C", "B", "A", "S"][stars] : "–"}</div>
              </div>

              <div className="card pad">
                <h2>{t("nextActions")}</h2>
                <ul style={{ margin: "10px 0 0", paddingLeft: 18, fontSize: 13.5, lineHeight: 1.7 }}>
                  <li>{t("next1")}</li>
                  <li>{t("next2")}</li>
                  <li>{t("next3")}</li>
                </ul>
                <button type="button" className="btn block" style={{ marginTop: 16 }} onClick={() => startLesson(next)}>
                  {t("continueBtn")}
                </button>
              </div>
            </aside>
          </div>
        </section>
      )}

      {account && locked && (
        <div className="overlay">
          <div className="card lock-card">
            <div className="lock-brand">字</div>
            <h2>
              {t("welcomeBack")}, {account.name}
            </h2>
            <p className="sub">{t("pinNote")}</p>
            <input
              className="input"
              type="password"
              inputMode="numeric"
              autoComplete="current-password"
              placeholder="••••"
              value={accPin}
              onChange={(e) => setAccPin(e.target.value)}
            />
            {accError && (
              <p className="note" style={{ color: "var(--red)" }}>
                {accError}
              </p>
            )}
            <button
              type="button"
              className="btn block"
              style={{ marginTop: 10 }}
              disabled={accBusy}
              onClick={() => void handleUnlock()}
            >
              {t("unlock")}
            </button>
          </div>
        </div>
      )}

      {strokeWord && strokeChars.length > 0 && (
        <div className="overlay">
          <div className="card stroke-modal">
            <div className="stroke-head">
              <div>
                <div className="k">{t("strokeOpen")}</div>
                <h2 className="zh">{strokeWord.h}</h2>
              </div>
              <button
                type="button"
                className="iconbtn"
                onClick={() => setStrokeWord(null)}
                aria-label={t("strokeClose")}
              >
                ✕
              </button>
            </div>

            {strokeChars.length > 1 && (
              <div className="stroke-tabs">
                {strokeChars.map((c, i) => (
                  <button
                    key={`${c}-${i}`}
                    type="button"
                    className={`stroke-tab ${i === strokeCharIdx ? "on" : ""}`}
                    onClick={() => {
                      setStrokeCharIdx(i);
                      resetStroke();
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}

            <StrokeWriter
              key={`${strokeChars[strokeCharIdx]}-${strokeMode}-${strokeRun}`}
              char={strokeChars[strokeCharIdx]}
              mode={strokeMode}
              onStroke={(n) => {
                setStrokeProgress(n);
                setStrokeHint(false);
              }}
              onMistake={() => setStrokeHint(true)}
              onComplete={() => setStrokeDone(true)}
            />

            <div className="stroke-status">
              {strokeMode === "quiz" && !strokeDone && (
                <span>
                  {t("strokeProgress")}: {strokeProgress}
                </span>
              )}
              {strokeMode === "quiz" && strokeHint && !strokeDone && (
                <span className="hint">{t("strokeHint")}</span>
              )}
              {strokeDone && <span className="ok">{t("strokeDone")}</span>}
            </div>

            <div className="stroke-actions">
              <button
                type="button"
                className="btn ghost"
                onClick={() => {
                  setStrokeMode("animate");
                  setStrokeRun((r) => r + 1);
                }}
              >
                {t("strokePlay")}
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => {
                  setStrokeMode("quiz");
                  setStrokeProgress(0);
                  setStrokeDone(false);
                  setStrokeHint(false);
                  setStrokeRun((r) => r + 1);
                }}
              >
                {t("strokePractice")}
              </button>
            </div>

            {strokeMode === "quiz" && strokeDone && strokeCharIdx < strokeChars.length - 1 && (
              <button
                type="button"
                className="btn ghost block"
                style={{ marginTop: 10 }}
                onClick={() => {
                  setStrokeCharIdx((i) => i + 1);
                  resetStroke();
                }}
              >
                {t("strokeNext")}
              </button>
            )}

            <p className="note">{t("strokeNote")}</p>
          </div>
        </div>
      )}

      {showWelcome && (
        <div className="overlay">
          <div className="welcome card">
            <Mascot size={110} />
            <h1>{t("welcomeTitle")}</h1>
            <p className="sub">{t("welcomeBody")}</p>
            <div className="chips">
              <span className="chip">300 {t("words")}</span>
              <span className="chip">HSK 1</span>
              <span className="chip">offline</span>
            </div>
            <button type="button" className="btn block" onClick={() => startLesson(levelLessons[0])}>
              {t("welcomeCta")}
            </button>
            <button
              type="button"
              className="btn ghost block"
              style={{ marginTop: 10 }}
              onClick={() => {
                setOnboarded(true);
                try {
                  localStorage.setItem("hq.onboarded", "1");
                } catch {
                  /* ignore */
                }
              }}
            >
              {t("welcomeSkip")}
            </button>
          </div>
        </div>
      )}

      {celebrate && session && (
        <div className="overlay">
          <div className="confetti" aria-hidden="true">
            {Array.from({ length: 14 }).map((_, i) => (
              <i
                key={i}
                style={{
                  left: `${(i * 37) % 100}%`,
                  animationDelay: `${(i % 7) * 0.08}s`,
                  background: ["#b8432f", "#c79a3b", "#2e6b5a"][i % 3],
                }}
              />
            ))}
          </div>
          <div className="celebrate card">
            <div className="stars">{"★".repeat(stars)}{"☆".repeat(3 - stars)}</div>
            <div className="teacher-name center">潘老师</div>
            <PandaTeacher size={104} mood="cheer" />
            <h1>{t("celebrateTitle")}</h1>
            <p className="sub">
              {session.correct}/{session.total} · +{session.xp} XP
            </p>
            <button type="button" className="btn block" style={{ marginTop: 14 }} onClick={() => setCelebrate(false)}>
              {t("continue")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
