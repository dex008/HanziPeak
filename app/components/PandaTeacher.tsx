"use client";

import { useEffect, useRef } from "react";

type Mood = "idle" | "happy" | "sad" | "think" | "cheer";

type Props = {
  size?: number;
  mood?: Mood;
  talking?: boolean;
  point?: boolean;
  beat?: number;
  className?: string;
};

export default function PandaTeacher({
  size = 96,
  mood = "idle",
  talking = false,
  point = false,
  beat = 0,
  className = "",
}: Props) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!beat || !ref.current) return;
    ref.current.animate(
      [
        { transform: "translateY(0) rotate(0deg)" },
        { transform: "translateY(4px) rotate(-1.6deg)" },
        { transform: "translateY(0) rotate(0deg)" },
      ],
      { duration: 270, easing: "ease-in-out" },
    );
  }, [beat]);

  const happy = mood === "happy" || mood === "cheer";
  return (
    <svg
      ref={ref}
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={`panda ${mood} ${talking ? "talking" : ""} ${point ? "point" : ""} ${className}`}
      role="img"
      aria-label="Panda teacher"
    >
      <ellipse cx="60" cy="113" rx="32" ry="5" fill="#1e1b16" opacity="0.09" />

      <ellipse cx="60" cy="93" rx="28" ry="21" fill="#fdfbf4" stroke="#1e1b16" strokeWidth="2.4" />
      <ellipse cx="43" cy="97" rx="8.5" ry="11" fill="#1e1b16" />
      <ellipse cx="77" cy="97" rx="8.5" ry="11" fill="#1e1b16" />

      <g className="arm arm-left">
        <ellipse cx="31" cy="87" rx="8.5" ry="14" fill="#1e1b16" transform="rotate(20 31 87)" />
      </g>
      <g className="arm arm-right">
        <ellipse
          cx="89"
          cy="87"
          rx="8.5"
          ry="14"
          fill="#1e1b16"
          transform={point ? "rotate(-72 89 84)" : "rotate(-20 89 87)"}
        />
      </g>

      <circle cx="33" cy="33" r="13.5" fill="#1e1b16" />
      <circle cx="87" cy="33" r="13.5" fill="#1e1b16" />

      <circle cx="60" cy="57" r="33" fill="#fdfbf4" stroke="#1e1b16" strokeWidth="2.4" />

      <ellipse cx="46" cy="55" rx="9.5" ry="11.5" fill="#1e1b16" transform="rotate(-14 46 55)" />
      <ellipse cx="74" cy="55" rx="9.5" ry="11.5" fill="#1e1b16" transform="rotate(14 74 55)" />

      {happy ? (
        <g className="eyes" stroke="#fff" strokeWidth="2.6" fill="none" strokeLinecap="round">
          <path d="M41 56 q5 -6 10 0" />
          <path d="M69 56 q5 -6 10 0" />
        </g>
      ) : (
        <g className="eyes">
          <circle cx="46" cy="54" r="3.3" fill="#fff" />
          <circle cx="74" cy="54" r="3.3" fill="#fff" />
        </g>
      )}

      <ellipse cx="60" cy="67" rx="4.2" ry="3" fill="#1e1b16" />

      {mood === "sad" ? (
        <path className="mouth" d="M53 76 Q60 71 67 76" stroke="#1e1b16" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      ) : mood === "cheer" ? (
        <ellipse className="mouth" cx="60" cy="75" rx="7" ry="5" fill="#1e1b16" />
      ) : (
        <path className="mouth" d="M53 73 Q60 79 67 73" stroke="#1e1b16" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      )}

      <circle cx="34" cy="68" r="4" fill="#e9a49a" opacity="0.45" />
      <circle cx="86" cy="68" r="4" fill="#e9a49a" opacity="0.45" />
    </svg>
  );
}
