"use client";

import { useEffect, useRef, useState } from "react";
import HanziWriter from "hanzi-writer";

type Props = {
  char: string;
  mode: "animate" | "quiz";
  size?: number;
  onStroke?: (n: number) => void;
  onMistake?: () => void;
  onComplete?: () => void;
};

export default function StrokeWriter({ char, mode, size = 240, onStroke, onMistake, onComplete }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const cb = useRef({ onStroke, onMistake, onComplete });
  cb.current = { onStroke, onMistake, onComplete };
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.innerHTML = "";
    setFailed(false);

    const writer = HanziWriter.create(el, char, {
      width: size,
      height: size,
      padding: 12,
      showOutline: true,
      showCharacter: mode === "animate",
      strokeColor: "#1e1b16",
      outlineColor: "#e7decb",
      highlightColor: "#c79a3b",
      drawingColor: "#b8432f",
      drawingWidth: 22,
      charDataLoader: (ch, onLoad, onError) => {
        const name = `u${ch.codePointAt(0)?.toString(16)}.json`;
        fetch(`/stroke/${name}`)
          .then((r) => {
            if (!r.ok) throw new Error("missing");
            return r.json();
          })
          .then(onLoad)
          .catch((err) => {
            setFailed(true);
            onError?.(err);
          });
      },
    });

    if (mode === "animate") {
      writer.animateCharacter();
    } else {
      writer.quiz({
        showHintAfterMisses: 2,
        onCorrectStroke: (d: { strokeNum: number }) => cb.current.onStroke?.(d.strokeNum + 1),
        onMistake: () => cb.current.onMistake?.(),
        onComplete: () => cb.current.onComplete?.(),
      });
    }

    return () => {
      el.innerHTML = "";
    };
  }, [char, mode, size]);

  return (
    <div className="stroke-wrap">
      <div ref={ref} />
      {failed && <p className="sub">Data stroke belum tersedia.</p>}
    </div>
  );
}
