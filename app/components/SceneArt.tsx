import type { ReactNode } from "react";

type Props = { unit: number; className?: string };

const INK = "#1e1b16";
const SKIN = "#f2c9a0";
const RED = "#b8432f";
const JADE = "#2e6b5a";
const GOLD = "#c79a3b";
const PAPER = "#fbf3e2";
const WALL = "#f6e8ce";
const FLOOR = "#ecdcbe";

function Person({
  x,
  y,
  shirt,
  flip = false,
  hair = INK,
  skin = SKIN,
  longHair = false,
}: {
  x: number;
  y: number;
  shirt: string;
  flip?: boolean;
  hair?: string;
  skin?: string;
  longHair?: boolean;
}) {
  return (
    <g transform={`translate(${x} ${y})${flip ? " scale(-1 1)" : ""}`}>
      <rect x="-19" y="-26" width="38" height="48" rx="14" fill={shirt} stroke={INK} strokeWidth="2.2" />
      <rect x="-5" y="-33" width="10" height="9" fill={skin} />
      <circle cx="0" cy="-49" r="16" fill={skin} stroke={INK} strokeWidth="2.2" />
      {longHair ? (
        <path d="M-17 -52 Q-19 -72 0 -70 Q19 -72 17 -52 L17 -34 Q10 -42 0 -42 Q-10 -42 -17 -34 Z" fill={hair} />
      ) : (
        <path d="M-16 -53 Q-14 -69 0 -69 Q14 -69 16 -53 Q8 -59 0 -59 Q-8 -59 -16 -53 Z" fill={hair} />
      )}
      <circle cx="-5" cy="-49" r="1.7" fill={INK} />
      <circle cx="5" cy="-49" r="1.7" fill={INK} />
      <path d="M-4 -43 Q0 -39 4 -43" stroke={INK} strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M15 -16 Q27 -6 20 6" stroke={INK} strokeWidth="5" fill="none" strokeLinecap="round" />
    </g>
  );
}

function Room({ wall = WALL }: { wall?: string }) {
  return (
    <>
      <rect x="0" y="0" width="400" height="220" fill={PAPER} />
      <rect x="0" y="0" width="400" height="168" fill={wall} />
      <rect x="0" y="168" width="400" height="52" fill={FLOOR} />
    </>
  );
}

function Window({ x = 30, y = 26, w = 92, h = 72 }: { x?: number; y?: number; w?: number; h?: number }) {
  return (
    <>
      <rect x={x} y={y} width={w} height={h} rx="6" fill="#fff8e8" stroke={INK} strokeWidth="2.2" />
      <path d={`M${x + w / 2} ${y} V${y + h}`} stroke={INK} strokeWidth="2" />
      <path d={`M${x} ${y + h / 2} H${x + w}`} stroke={INK} strokeWidth="2" />
    </>
  );
}

function Bubble({ x, y, text, fill = "#fff8e8" }: { x: number; y: number; text: string; fill?: string }) {
  return (
    <g className="bubble">
      <rect x={x} y={y} width="64" height="30" rx="12" fill={fill} stroke={INK} strokeWidth="2" />
      <path d={`M${x + 16} ${y + 30} l6 10 l6 -10 Z`} fill={fill} stroke={INK} strokeWidth="2" />
      <text
        x={x + 32}
        y={y + 21}
        textAnchor="middle"
        fontSize="15"
        fontFamily="'Noto Serif SC','Songti SC',serif"
        fill={INK}
      >
        {text}
      </text>
    </g>
  );
}

/** Per-lesson illustration variants (used before the unit fallback). */
const VARIANTS: Record<string, ReactNode> = {
  corridor: (
    <g>
      <Room wall="#f2e7d8" />
      <Window x={276} y={26} w={96} h={70} />
      <rect x="26" y="42" width="46" height="112" rx="4" fill="#9fb8ad" stroke={INK} strokeWidth="2" />
      <rect x="78" y="42" width="46" height="112" rx="4" fill="#a9c2b7" stroke={INK} strokeWidth="2" />
      <rect x="130" y="42" width="46" height="112" rx="4" fill="#9fb8ad" stroke={INK} strokeWidth="2" />
      {[26, 78, 130].map((x) => (
        <g key={x}>
          <rect x={x + 34} y="94" width="9" height="4" rx="2" fill={INK} />
        </g>
      ))}
      <rect x="196" y="132" width="22" height="22" rx="3" fill={RED} stroke={INK} strokeWidth="2" />
      <path d="M207 132 q-14 -18 0 -30 q14 12 0 30" fill={JADE} stroke={INK} strokeWidth="2" />
      <Person x={150} y={196} shirt={RED} />
      <Person x={300} y={196} shirt={GOLD} flip />
      <Bubble x={196} y={26} text="你好" />
    </g>
  ),
  classroom: (
    <g>
      <Room wall="#eef0dd" />
      <rect x="24" y="24" width="150" height="82" rx="4" fill="#2f3b33" stroke={INK} strokeWidth="2" />
      <text x="99" y="76" textAnchor="middle" fontSize="28" fill="#fff8e8" fontFamily="'Noto Serif SC','Songti SC',serif">
        谁?
      </text>
      <rect x="24" y="106" width="150" height="6" rx="3" fill={GOLD} />
      <Person x={110} y={196} shirt={JADE} />
      <Person x={248} y={196} shirt={RED} longHair />
      <rect x="220" y="136" width="86" height="9" rx="4" fill="#d8b98a" />
      <rect x="228" y="145" width="6" height="22" fill={INK} />
      <rect x="292" y="145" width="6" height="22" fill={INK} />
      <Person x={336} y={196} shirt={GOLD} flip />
      <Bubble x={196} y={40} text="她是谁" />
    </g>
  ),
  teacher: (
    <g>
      <Room wall="#e9efe6" />
      <rect x="30" y="24" width="160" height="86" rx="4" fill="#2f3b33" stroke={INK} strokeWidth="2" />
      <text x="110" y="80" textAnchor="middle" fontSize="30" fill="#fff8e8" fontFamily="'Noto Serif SC','Songti SC',serif">
        老师
      </text>
      <rect x="30" y="110" width="160" height="6" fill={GOLD} />
      <Person x={300} y={196} shirt={GOLD} />
      <path d="M292 150 L238 104" stroke={INK} strokeWidth="4" strokeLinecap="round" />
      <Person x={112} y={200} shirt={RED} />
      <Person x={196} y={200} shirt={JADE} flip />
      <Bubble x={214} y={26} text="老师" />
    </g>
  ),
  yard: (
    <g>
      <rect x="0" y="0" width="400" height="220" fill="#dcebf4" />
      <circle cx="342" cy="40" r="22" fill={GOLD} />
      <rect x="0" y="120" width="400" height="100" fill="#cfe0c3" />
      <rect x="30" y="58" width="170" height="66" fill="#f6e8ce" stroke={INK} strokeWidth="2" />
      <path d="M20 58 L115 30 L210 58 Z" fill={RED} stroke={INK} strokeWidth="2" />
      <rect x="58" y="86" width="24" height="38" fill="#fff8e8" stroke={INK} strokeWidth="2" />
      <rect x="108" y="86" width="24" height="38" fill="#fff8e8" stroke={INK} strokeWidth="2" />
      <rect x="158" y="86" width="24" height="38" fill="#fff8e8" stroke={INK} strokeWidth="2" />
      <rect x="250" y="112" width="7" height="34" fill="#8a6a3f" />
      <circle cx="253" cy="94" r="24" fill={JADE} />
      <rect x="366" y="118" width="7" height="30" fill="#8a6a3f" />
      <circle cx="369" cy="104" r="20" fill={JADE} />
      <Person x={170} y={200} shirt={RED} />
      <Person x={300} y={200} shirt={GOLD} flip />
      <Bubble x={230} y={28} text="中国" />
    </g>
  ),
  writing: (
    <g>
      <Room wall="#f6e3d8" />
      <Person x={70} y={200} shirt={RED} />
      <Person x={340} y={200} shirt={JADE} flip />
      <rect x="40" y="112" width="320" height="16" rx="6" fill="#d8b98a" stroke={INK} strokeWidth="2" />
      <rect x="60" y="128" width="10" height="46" fill={INK} />
      <rect x="330" y="128" width="10" height="46" fill={INK} />
      <rect x="92" y="56" width="150" height="56" rx="5" fill="#fff8e8" stroke={INK} strokeWidth="2" />
      <path d="M104 72 H228 M104 84 H228 M104 96 H190" stroke="#c9bfae" strokeWidth="2" />
      <text x="112" y="96" fontSize="24" fill={INK} fontFamily="'Noto Serif SC','Songti SC',serif">
        你好
      </text>
      <g transform="rotate(16 250 52)">
        <rect x="250" y="48" width="86" height="10" rx="4" fill={GOLD} stroke={INK} strokeWidth="2" />
        <path d="M336 48 l14 5 l-14 5 Z" fill={SKIN} stroke={INK} strokeWidth="2" />
      </g>
      <Bubble x={252} y={104} text="写" />
    </g>
  ),
  seats: (
    <g>
      <Room wall="#eef0dd" />
      <rect x="24" y="24" width="140" height="70" rx="4" fill="#2f3b33" stroke={INK} strokeWidth="2" />
      <text x="94" y="70" textAnchor="middle" fontSize="28" fill="#fff8e8" fontFamily="'Noto Serif SC','Songti SC',serif">
        做
      </text>
      <Person x={120} y={168} shirt={RED} />
      <Person x={280} y={168} shirt={GOLD} flip />
      <rect x="70" y="150" width="100" height="10" rx="4" fill="#d8b98a" />
      <rect x="78" y="160" width="7" height="26" fill={INK} />
      <rect x="156" y="160" width="7" height="26" fill={INK} />
      <rect x="230" y="150" width="100" height="10" rx="4" fill="#d8b98a" />
      <rect x="238" y="160" width="7" height="26" fill={INK} />
      <rect x="316" y="160" width="7" height="26" fill={INK} />
      <Bubble x={196} y={36} text="做" />
    </g>
  ),
  home: (
    <g>
      <Room wall="#f3e6cf" />
      <rect x="250" y="42" width="96" height="126" rx="4" fill="#e8d3ae" stroke={INK} strokeWidth="2" />
      <rect x="262" y="54" width="72" height="50" fill="#fff8e8" stroke={INK} strokeWidth="2" />
      <circle cx="330" cy="112" r="3.5" fill={INK} />
      <ellipse cx="268" cy="178" rx="12" ry="6" fill={RED} stroke={INK} strokeWidth="2" />
      <ellipse cx="292" cy="178" rx="12" ry="6" fill={RED} stroke={INK} strokeWidth="2" />
      <rect x="28" y="118" width="36" height="36" rx="4" fill={JADE} opacity="0.25" />
      <path d="M46 118 q-12 -22 0 -38 q12 16 0 38" fill={JADE} stroke={INK} strokeWidth="2" />
      <Person x={120} y={196} shirt={RED} />
      <Person x={204} y={196} shirt={GOLD} flip />
      <Bubble x={56} y={36} text="住" />
    </g>
  ),
  weather: (
    <g>
      <Room wall="#e7ecf2" />
      <rect x="34" y="28" width="170" height="110" rx="6" fill="#cfe0e8" stroke={INK} strokeWidth="2.4" />
      <path d="M119 28 V138" stroke={INK} strokeWidth="2" />
      <circle cx="84" cy="64" r="18" fill={GOLD} />
      <ellipse cx="142" cy="80" rx="26" ry="14" fill="#fff8e8" />
      <ellipse cx="118" cy="88" rx="18" ry="11" fill="#fff8e8" />
      <Person x={140} y={200} shirt={RED} />
      <Person x={286} y={200} shirt={JADE} flip />
      <rect x="330" y="40" width="10" height="80" rx="5" fill="#fff8e8" stroke={INK} strokeWidth="2" />
      <rect x="333" y="70" width="4" height="46" fill={RED} />
      <circle cx="335" cy="120" r="9" fill={RED} stroke={INK} strokeWidth="2" />
      <Bubble x={222} y={26} text="热" />
    </g>
  ),
  tea: (
    <g>
      <Room wall="#f6e3d8" />
      <Person x={120} y={190} shirt={RED} />
      <Person x={292} y={190} shirt={GOLD} flip />
      <rect x="60" y="118" width="280" height="12" rx="6" fill="#d8b98a" stroke={INK} strokeWidth="2" />
      <rect x="72" y="130" width="9" height="30" fill={INK} />
      <rect x="320" y="130" width="9" height="30" fill={INK} />
      <ellipse cx="200" cy="100" rx="30" ry="18" fill={JADE} stroke={INK} strokeWidth="2" />
      <path d="M228 96 q18 4 14 18" stroke={INK} strokeWidth="3" fill="none" />
      <rect x="192" y="80" width="16" height="6" rx="3" fill={INK} />
      <rect x="120" y="106" width="20" height="14" rx="3" fill="#fff8e8" stroke={INK} strokeWidth="2" />
      <rect x="268" y="106" width="20" height="14" rx="3" fill="#fff8e8" stroke={INK} strokeWidth="2" />
      <rect x="300" y="96" width="34" height="24" rx="2" fill={GOLD} stroke={INK} strokeWidth="2" />
      <Bubble x={80} y={30} text="茶" />
    </g>
  ),
  pets: (
    <g>
      <Room wall="#eef0dd" />
      <rect x="250" y="96" width="120" height="60" rx="10" fill={JADE} opacity="0.35" stroke={INK} strokeWidth="2" />
      <rect x="240" y="120" width="140" height="36" rx="8" fill={JADE} opacity="0.5" stroke={INK} strokeWidth="2" />
      <rect x="40" y="40" width="90" height="56" rx="4" fill={INK} />
      <rect x="48" y="48" width="74" height="40" fill="#cfe0e8" />
      <ellipse cx="180" cy="168" rx="16" ry="10" fill="#c9a36a" stroke={INK} strokeWidth="2" />
      <circle cx="180" cy="150" r="10" fill="#c9a36a" stroke={INK} strokeWidth="2" />
      <path d="M172 144 l-3 -8 l7 3 Z" fill="#c9a36a" stroke={INK} strokeWidth="1.5" />
      <path d="M188 144 l3 -8 l-7 3 Z" fill="#c9a36a" stroke={INK} strokeWidth="1.5" />
      <path d="M196 168 q12 -8 10 -18" stroke={INK} strokeWidth="2.5" fill="none" />
      <ellipse cx="218" cy="184" rx="18" ry="10" fill="#b98a5a" stroke={INK} strokeWidth="2" />
      <circle cx="218" cy="166" r="11" fill="#b98a5a" stroke={INK} strokeWidth="2" />
      <ellipse cx="208" cy="164" rx="4" ry="8" fill="#8a5a36" />
      <ellipse cx="228" cy="164" rx="4" ry="8" fill="#8a5a36" />
      <Person x={320} y={192} shirt={RED} />
      <Bubble x={60} y={112} text="猫" />
    </g>
  ),
  park: (
    <g>
      <rect x="0" y="0" width="400" height="220" fill="#dcebf4" />
      <rect x="0" y="120" width="400" height="100" fill="#cfe0c3" />
      <rect x="150" y="120" width="100" height="100" fill="#e8dcc2" />
      <rect x="26" y="58" width="84" height="62" fill="#f6e8ce" stroke={INK} strokeWidth="2" />
      <path d="M18 58 L68 36 L118 58 Z" fill={RED} stroke={INK} strokeWidth="2" />
      <rect x="256" y="112" width="7" height="42" fill="#8a6a3f" />
      <circle cx="259" cy="92" r="26" fill={JADE} />
      <rect x="296" y="132" width="66" height="10" rx="3" fill="#c99a6a" />
      <rect x="304" y="142" width="6" height="18" fill={INK} />
      <rect x="348" y="142" width="6" height="18" fill={INK} />
      <Person x={130} y={200} shirt={RED} />
      <Person x={230} y={200} shirt={GOLD} flip />
      <Bubble x={176} y={26} text="天气" />
    </g>
  ),
  phone: (
    <g>
      <Room wall="#eef0dd" />
      <rect x="34" y="40" width="80" height="52" rx="4" fill={INK} />
      <rect x="42" y="48" width="64" height="36" fill="#cfe0e8" />
      <rect x="228" y="108" width="132" height="40" rx="8" fill={JADE} opacity="0.35" stroke={INK} strokeWidth="2" />
      <rect x="218" y="130" width="152" height="34" rx="8" fill={JADE} opacity="0.5" stroke={INK} strokeWidth="2" />
      <rect x="150" y="96" width="70" height="12" rx="4" fill="#d8b98a" stroke={INK} strokeWidth="2" />
      <rect x="156" y="108" width="6" height="24" fill={INK} />
      <rect x="208" y="108" width="6" height="24" fill={INK} />
      <rect x="168" y="82" width="14" height="24" rx="3" fill={INK} />
      <rect x="196" y="88" width="22" height="14" rx="2" fill="#8fb9c9" stroke={INK} strokeWidth="1.5" />
      <Person x={340} y={196} shirt={RED} />
      <Bubble x={54} y={104} text="电话" />
    </g>
  ),
  office: (
    <g>
      <Room wall="#eef0dd" />
      <rect x="26" y="30" width="122" height="72" rx="4" fill="#fff8e8" stroke={INK} strokeWidth="2" />
      <path d="M38 48 H136 M38 62 H136 M38 76 H108" stroke="#c9bfae" strokeWidth="2" />
      <Person x={110} y={196} shirt={JADE} />
      <Person x={60} y={196} shirt={GOLD} flip />
      <rect x="176" y="120" width="176" height="12" rx="4" fill="#d8b98a" stroke={INK} strokeWidth="2" />
      <rect x="186" y="132" width="8" height="30" fill={INK} />
      <rect x="334" y="132" width="8" height="30" fill={INK} />
      <rect x="202" y="100" width="46" height="20" rx="2" fill={INK} />
      <rect x="208" y="104" width="34" height="12" fill="#8fb9c9" />
      <rect x="268" y="104" width="40" height="16" rx="2" fill="#fff8e8" stroke={INK} strokeWidth="2" />
      <Bubble x={228} y={30} text="工作" />
    </g>
  ),
  cafe: (
    <g>
      <Room wall="#f6e3d8" />
      <rect x="36" y="28" width="120" height="56" rx="3" fill="#2f3b33" stroke={INK} strokeWidth="2" />
      <text x="96" y="66" textAnchor="middle" fontSize="22" fill="#fff8e8" fontFamily="'Noto Serif SC','Songti SC',serif">
        茶
      </text>
      <Person x={250} y={196} shirt={RED} />
      <Person x={330} y={196} shirt={GOLD} flip />
      <rect x="30" y="120" width="340" height="12" rx="6" fill="#d8b98a" stroke={INK} strokeWidth="2" />
      <rect x="42" y="132" width="9" height="30" fill={INK} />
      <rect x="348" y="132" width="9" height="30" fill={INK} />
      <rect x="70" y="100" width="22" height="20" rx="3" fill="#fff8e8" stroke={INK} strokeWidth="2" />
      <rect x="110" y="104" width="18" height="16" rx="3" fill="#fff8e8" stroke={INK} strokeWidth="2" />
      <Bubble x={272} y={36} text="茶" />
    </g>
  ),
  street: (
    <g>
      <rect x="0" y="0" width="400" height="220" fill="#dcebf4" />
      <rect x="0" y="150" width="400" height="70" fill="#b8b8b0" />
      <rect x="20" y="58" width="90" height="92" fill="#f6e8ce" stroke={INK} strokeWidth="2" />
      <rect x="38" y="78" width="18" height="24" fill="#cfe0e8" stroke={INK} strokeWidth="1.5" />
      <rect x="74" y="78" width="18" height="24" fill="#cfe0e8" stroke={INK} strokeWidth="1.5" />
      <rect x="132" y="80" width="78" height="70" fill="#efe0c8" stroke={INK} strokeWidth="2" />
      <rect x="150" y="100" width="20" height="20" fill="#cfe0e8" stroke={INK} strokeWidth="1.5" />
      <rect x="290" y="60" width="10" height="90" fill={INK} />
      <circle cx="295" cy="60" r="10" fill={RED} />
      <circle cx="295" cy="84" r="10" fill={GOLD} />
      <circle cx="295" cy="108" r="10" fill={JADE} />
      <Person x={170} y={200} shirt={RED} />
      <Person x={236} y={200} shirt={GOLD} flip />
      <rect x="330" y="184" width="16" height="28" rx="3" fill={INK} />
      <rect x="332" y="187" width="12" height="18" fill="#8fb9c9" />
      <Bubble x={54} y={20} text="找" />
    </g>
  ),
  shop: (
    <g>
      <Room wall="#f3e6cf" />
      <rect x="26" y="36" width="120" height="112" rx="4" fill="#d8b98a" stroke={INK} strokeWidth="2" />
      <path d="M26 72 H146 M26 108 H146" stroke={INK} strokeWidth="2" />
      <rect x="38" y="48" width="16" height="20" fill={RED} />
      <rect x="58" y="48" width="16" height="20" fill={JADE} />
      <rect x="78" y="48" width="16" height="20" fill={GOLD} />
      <rect x="38" y="84" width="16" height="20" fill={JADE} />
      <rect x="58" y="84" width="16" height="20" fill={RED} />
      <rect x="38" y="118" width="16" height="20" fill={GOLD} />
      <rect x="180" y="168" width="176" height="12" rx="4" fill="#d8b98a" stroke={INK} strokeWidth="2" />
      <rect x="192" y="180" width="8" height="26" fill={INK} />
      <rect x="336" y="180" width="8" height="26" fill={INK} />
      <Person x={210} y={196} shirt={RED} />
      <Person x={300} y={196} shirt={GOLD} flip />
      <Bubble x={200} y={36} text="书" />
    </g>
  ),
  desk: (
    <g>
      <Room wall="#eef0dd" />
      <rect x="150" y="120" width="190" height="12" rx="4" fill="#d8b98a" stroke={INK} strokeWidth="2" />
      <rect x="162" y="132" width="8" height="30" fill={INK} />
      <rect x="320" y="132" width="8" height="30" fill={INK} />
      <rect x="186" y="96" width="42" height="24" rx="3" fill={GOLD} stroke={INK} strokeWidth="2" />
      <rect x="240" y="100" width="36" height="20" rx="3" fill="#fff8e8" stroke={INK} strokeWidth="2" />
      <g transform="translate(300 206) scale(1.14)">
        <Person x={0} y={0} shirt={JADE} />
      </g>
      <Person x={104} y={196} shirt={RED} />
      <Bubble x={210} y={30} text="高" />
    </g>
  ),
  airport: (
    <g>
      <Room wall="#e9eef0" />
      <rect x="24" y="26" width="168" height="94" rx="8" fill="#cfe0e8" stroke={INK} strokeWidth="2.4" />
      <path d="M66 90 L150 60 L128 96 Z" fill="#fff8e8" stroke={INK} strokeWidth="2" />
      <path d="M110 78 L96 62" stroke={INK} strokeWidth="2" />
      <rect x="216" y="128" width="34" height="44" rx="4" fill={RED} stroke={INK} strokeWidth="2" />
      <rect x="218" y="120" width="30" height="10" rx="3" fill={RED} stroke={INK} strokeWidth="2" />
      <rect x="262" y="140" width="40" height="32" rx="4" fill="#d8b98a" stroke={INK} strokeWidth="2" />
      <Person x={180} y={196} shirt={JADE} />
      <Person x={320} y={196} shirt={GOLD} flip />
      <Bubble x={232} y={30} text="您" />
    </g>
  ),
  road: (
    <g>
      <rect x="0" y="0" width="400" height="220" fill="#dcebf4" />
      <rect x="0" y="150" width="400" height="70" fill="#b8b8b0" />
      {[40, 90, 140, 190, 240, 290, 340].map((x) => (
        <rect key={x} x={x} y="160" width="26" height="10" fill="#fff8e8" opacity="0.85" />
      ))}
      <rect x="20" y="60" width="70" height="92" rx="3" fill="#f6e8ce" stroke={INK} strokeWidth="2" />
      <rect x="34" y="88" width="20" height="64" fill={JADE} opacity="0.35" stroke={INK} strokeWidth="2" />
      <circle cx="48" cy="120" r="3" fill={INK} />
      <rect x="130" y="70" width="80" height="80" fill="#efe0c8" stroke={INK} strokeWidth="2" />
      <rect x="150" y="92" width="18" height="22" fill="#cfe0e8" stroke={INK} strokeWidth="1.5" />
      <Person x={230} y={196} shirt={RED} />
      <Person x={300} y={196} shirt={GOLD} flip />
      <Bubble x={236} y={26} text="门" />
    </g>
  ),
  morning: (
    <g>
      <Room wall="#fdf1dc" />
      <Window x={268} y={28} w={96} h={70} />
      <circle cx="292" cy="52" r="12" fill={GOLD} />
      <rect x="30" y="110" width="120" height="14" rx="5" fill="#d8b98a" stroke={INK} strokeWidth="2" />
      <rect x="38" y="124" width="8" height="30" fill={INK} />
      <rect x="134" y="124" width="8" height="30" fill={INK} />
      <rect x="46" y="94" width="40" height="16" rx="6" fill="#fff8e8" stroke={INK} strokeWidth="2" />
      <path d="M190 70 l26 -14 l26 14 l-8 44 h-36 Z" fill={RED} stroke={INK} strokeWidth="2" />
      <circle cx="210" cy="86" r="3" fill={GOLD} />
      <circle cx="226" cy="96" r="3" fill={GOLD} />
      <circle cx="214" cy="104" r="3" fill={GOLD} />
      <Person x={150} y={200} shirt={GOLD} />
      <Bubble x={60} y={40} text="早" />
    </g>
  ),
  evening: (
    <g>
      <Room wall="#e9e1d8" />
      <rect x="250" y="110" width="130" height="40" rx="8" fill={JADE} opacity="0.35" stroke={INK} strokeWidth="2" />
      <rect x="240" y="134" width="150" height="32" rx="8" fill={JADE} opacity="0.5" stroke={INK} strokeWidth="2" />
      <rect x="40" y="120" width="10" height="60" fill={INK} />
      <circle cx="45" cy="112" r="20" fill="#fbe6a8" stroke={INK} strokeWidth="2" />
      <circle cx="45" cy="112" r="30" fill="#fbe6a8" opacity="0.25" />
      <Person x={140} y={196} shirt={RED} />
      <Person x={196} y={196} shirt={GOLD} flip />
      <Bubble x={60} y={36} text="晚上" />
    </g>
  ),
  run: (
    <g>
      <rect x="0" y="0" width="400" height="220" fill="#dcebf4" />
      <rect x="0" y="150" width="400" height="70" fill="#b8b8b0" />
      <rect x="30" y="52" width="130" height="98" fill="#fff8e8" stroke={INK} strokeWidth="2" />
      <rect x="44" y="66" width="24" height="24" fill="#cfe0e8" stroke={INK} strokeWidth="1.5" />
      <rect x="84" y="66" width="24" height="24" fill="#cfe0e8" stroke={INK} strokeWidth="1.5" />
      <rect x="124" y="66" width="24" height="24" fill="#cfe0e8" stroke={INK} strokeWidth="1.5" />
      <rect x="86" y="104" width="18" height="46" fill={INK} />
      <rect x="78" y="94" width="34" height="10" fill={RED} />
      <path d="M270 110 l18 -12 l18 12 l-6 44 h-24 Z" fill={JADE} stroke={INK} strokeWidth="2" />
      <circle cx="288" cy="90" r="14" fill={SKIN} stroke={INK} strokeWidth="2" />
      <path d="M276 86 Q278 72 288 72 Q298 72 300 86 Q292 80 288 80 Q284 80 276 86 Z" fill={INK} />
      <circle cx="283" cy="89" r="1.6" fill={INK} />
      <circle cx="293" cy="89" r="1.6" fill={INK} />
      <path d="M284 95 Q288 98 292 95" stroke={INK} strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M266 122 l-16 12 M310 122 l14 8" stroke={INK} strokeWidth="5" strokeLinecap="round" />
      <path d="M282 154 l-14 18 M294 154 l14 18" stroke={INK} strokeWidth="5" strokeLinecap="round" />
      <Bubble x={190} y={40} text="医院" />
    </g>
  ),
  family: (
    <g>
      <Room wall="#eef0dd" />
      <rect x="230" y="104" width="140" height="52" rx="10" fill={JADE} opacity="0.35" stroke={INK} strokeWidth="2" />
      <rect x="220" y="126" width="160" height="34" rx="8" fill={JADE} opacity="0.5" stroke={INK} strokeWidth="2" />
      <rect x="40" y="40" width="86" height="54" rx="4" fill={INK} />
      <rect x="48" y="48" width="70" height="38" fill="#cfe0e8" />
      <Person x={130} y={196} shirt={RED} />
      <g transform="translate(210 212) scale(0.68)">
        <Person x={0} y={0} shirt={GOLD} />
      </g>
      <Bubble x={60} y={112} text="儿子" />
    </g>
  ),
  lobby: (
    <g>
      <Room wall="#eef0f2" />
      <rect x="280" y="50" width="84" height="120" rx="3" fill="#e8d3ae" stroke={INK} strokeWidth="2" />
      <rect x="292" y="62" width="60" height="46" fill="#fff8e8" stroke={INK} strokeWidth="2" />
      <circle cx="354" cy="116" r="3.5" fill={INK} />
      <path d="M30 170 H150 V150 H170 V130 H190 V110 H210 V170" stroke={INK} strokeWidth="3" fill="none" />
      <rect x="60" y="132" width="40" height="34" rx="3" fill={GOLD} stroke={INK} strokeWidth="2" />
      <path d="M70 132 V144 M90 132 V144" stroke={INK} strokeWidth="2" />
      <Person x={240} y={196} shirt={RED} />
      <Bubble x={60} y={40} text="包" />
    </g>
  ),
  campus: (
    <g>
      <rect x="0" y="0" width="400" height="220" fill="#dcebf4" />
      <rect x="0" y="140" width="400" height="80" fill="#cfe0c3" />
      <rect x="56" y="52" width="190" height="88" fill="#f6e8ce" stroke={INK} strokeWidth="2" />
      <path d="M44 52 L151 24 L258 52 Z" fill={RED} stroke={INK} strokeWidth="2" />
      <rect x="80" y="70" width="14" height="70" fill="#fff8e8" stroke={INK} strokeWidth="2" />
      <rect x="118" y="70" width="14" height="70" fill="#fff8e8" stroke={INK} strokeWidth="2" />
      <rect x="170" y="70" width="14" height="70" fill="#fff8e8" stroke={INK} strokeWidth="2" />
      <rect x="208" y="70" width="14" height="70" fill="#fff8e8" stroke={INK} strokeWidth="2" />
      <rect x="148" y="104" width="24" height="36" fill={INK} opacity="0.7" />
      <rect x="286" y="112" width="7" height="38" fill="#8a6a3f" />
      <circle cx="289" cy="92" r="24" fill={JADE} />
      <Person x={300} y={200} shirt={RED} />
      <Person x={356} y={200} shirt={GOLD} flip />
      <Bubble x={300} y={26} text="大学" />
    </g>
  ),
  family2: (
    <g>
      <Room wall="#eef0dd" />
      <rect x="40" y="40" width="90" height="56" rx="4" fill={INK} />
      <rect x="48" y="48" width="74" height="40" fill="#cfe0e8" />
      <rect x="240" y="104" width="130" height="50" rx="10" fill={JADE} opacity="0.35" stroke={INK} strokeWidth="2" />
      <rect x="230" y="126" width="150" height="32" rx="8" fill={JADE} opacity="0.5" stroke={INK} strokeWidth="2" />
      <Person x={150} y={196} shirt={GOLD} hair="#6b6b6b" />
      <g transform="translate(216 212) scale(0.66)">
        <Person x={0} y={0} shirt={RED} longHair />
      </g>
      <Bubble x={60} y={112} text="爸爸" />
    </g>
  ),
  bedroom: (
    <g>
      <Room wall="#f3e6cf" />
      <rect x="46" y="122" width="170" height="26" rx="4" fill="#fff8e8" stroke={INK} strokeWidth="2" />
      <rect x="46" y="148" width="170" height="10" fill="#d8b98a" stroke={INK} strokeWidth="2" />
      <rect x="56" y="108" width="46" height="18" rx="6" fill="#fff8e8" stroke={INK} strokeWidth="2" />
      <rect x="70" y="126" width="130" height="18" rx="4" fill={RED} opacity="0.35" />
      <rect x="238" y="106" width="44" height="48" rx="3" fill="#d8b98a" stroke={INK} strokeWidth="2" />
      <rect x="248" y="96" width="24" height="12" fill={GOLD} stroke={INK} strokeWidth="2" />
      <rect x="300" y="70" width="8" height="72" fill={INK} />
      <path d="M282 70 h44 l-8 -18 h-28 Z" fill="#fbe6a8" stroke={INK} strokeWidth="2" />
      <Person x={330} y={196} shirt={JADE} />
      <Bubble x={40} y={40} text="床" />
    </g>
  ),
  mountain: (
    <g>
      <rect x="0" y="0" width="400" height="220" fill="#dcebf4" />
      <path d="M0 150 L90 40 L180 150 Z" fill="#7d9c88" />
      <path d="M120 150 L230 62 L340 150 Z" fill="#6b8a78" />
      <rect x="0" y="150" width="400" height="70" fill="#cfe0c3" />
      <rect x="280" y="96" width="86" height="54" fill="#f6e8ce" stroke={INK} strokeWidth="2" />
      <path d="M272 96 L323 74 L374 96 Z" fill={RED} stroke={INK} strokeWidth="2" />
      <rect x="300" y="118" width="16" height="32" fill="#fff8e8" stroke={INK} strokeWidth="2" />
      <Person x={140} y={200} shirt={RED} />
      <Person x={210} y={200} shirt={GOLD} flip />
      <Bubble x={40} y={30} text="山" />
    </g>
  ),
  ward: (
    <g>
      <Room wall="#eef4f2" />
      <rect x="26" y="30" width="96" height="70" rx="4" fill="#cfe0e8" stroke={INK} strokeWidth="2" />
      <path d="M74 30 V100 M26 65 H122" stroke={INK} strokeWidth="2" />
      <rect x="60" y="120" width="190" height="26" rx="4" fill="#fff8e8" stroke={INK} strokeWidth="2" />
      <rect x="60" y="146" width="190" height="10" fill="#b8c8c4" stroke={INK} strokeWidth="2" />
      <circle cx="96" cy="112" r="13" fill={SKIN} stroke={INK} strokeWidth="2" />
      <path d="M84 110 Q86 98 96 98 Q106 98 108 110 Q100 104 96 104 Q92 104 84 110 Z" fill={INK} />
      <rect x="110" y="118" width="120" height="16" rx="6" fill={JADE} opacity="0.4" />
      <rect x="292" y="80" width="6" height="80" fill={INK} />
      <rect x="280" y="80" width="30" height="26" rx="4" fill="#cfe0e8" stroke={INK} strokeWidth="2" />
      <Person x={330} y={196} shirt={RED} />
      <Bubble x={200} y={26} text="病" />
    </g>
  ),
  meeting: (
    <g>
      <Room wall="#eef0dd" />
      <rect x="30" y="30" width="120" height="80" rx="4" fill="#fff8e8" stroke={INK} strokeWidth="2" />
      <rect x="44" y="82" width="14" height="18" fill={JADE} />
      <rect x="66" y="70" width="14" height="30" fill={GOLD} />
      <rect x="88" y="58" width="14" height="42" fill={RED} />
      <path d="M44 52 H136" stroke="#c9bfae" strokeWidth="2" />
      <rect x="120" y="118" width="240" height="14" rx="6" fill="#d8b98a" stroke={INK} strokeWidth="2" />
      <rect x="132" y="132" width="9" height="34" fill={INK} />
      <rect x="340" y="132" width="9" height="34" fill={INK} />
      <rect x="210" y="96" width="52" height="22" rx="3" fill={INK} />
      <rect x="218" y="101" width="36" height="12" fill="#8fb9c9" />
      <rect x="278" y="100" width="34" height="16" rx="2" fill="#fff8e8" stroke={INK} strokeWidth="2" />
      <Person x={180} y={196} shirt={RED} />
      <Person x={300} y={196} shirt={GOLD} flip />
      <Bubble x={200} y={36} text="公司" />
    </g>
  ),
  grocery: (
    <g>
      <Room wall="#f3e6cf" />
      <rect x="24" y="34" width="130" height="112" rx="4" fill="#d8b98a" stroke={INK} strokeWidth="2" />
      <path d="M24 72 H154 M24 108 H154" stroke={INK} strokeWidth="2" />
      <rect x="36" y="46" width="20" height="24" rx="3" fill="#b8432f" stroke={INK} strokeWidth="2" />
      <rect x="64" y="46" width="20" height="24" rx="3" fill="#b8432f" stroke={INK} strokeWidth="2" />
      <rect x="92" y="48" width="26" height="20" rx="2" fill="#fff8e8" stroke={INK} strokeWidth="2" />
      <path d="M92 58 H118" stroke={RED} strokeWidth="3" />
      <rect x="36" y="82" width="34" height="24" rx="3" fill="#efe0c8" stroke={INK} strokeWidth="2" />
      <text x="53" y="99" textAnchor="middle" fontSize="13" fill={INK} fontFamily="'Noto Serif SC','Songti SC',serif">
        米
      </text>
      <rect x="84" y="82" width="22" height="24" rx="3" fill={JADE} opacity="0.5" stroke={INK} strokeWidth="2" />
      <rect x="176" y="120" width="190" height="12" rx="5" fill="#d8b98a" stroke={INK} strokeWidth="2" />
      <Person x={250} y={196} shirt={RED} />
      <Person x={330} y={196} shirt={GOLD} flip />
      <Bubble x={200} y={36} text="店" />
    </g>
  ),
  living2: (
    <g>
      <Room wall="#eef0dd" />
      <rect x="40" y="34" width="46" height="36" rx="3" fill="#fff8e8" stroke={INK} strokeWidth="2" />
      <circle cx="63" cy="50" r="8" fill={SKIN} stroke={INK} strokeWidth="1.6" />
      <rect x="98" y="40" width="38" height="30" rx="3" fill="#fff8e8" stroke={INK} strokeWidth="2" />
      <circle cx="117" cy="53" r="7" fill={SKIN} stroke={INK} strokeWidth="1.6" />
      <rect x="250" y="36" width="90" height="46" rx="6" fill={INK} />
      <circle cx="272" cy="60" r="10" fill="#8fb9c9" />
      <circle cx="292" cy="60" r="10" fill="#8fb9c9" />
      <path d="M312 50 v16" stroke={GOLD} strokeWidth="3" />
      <rect x="230" y="120" width="150" height="46" rx="10" fill={JADE} opacity="0.35" stroke={INK} strokeWidth="2" />
      <rect x="220" y="140" width="170" height="30" rx="8" fill={JADE} opacity="0.5" stroke={INK} strokeWidth="2" />
      <Person x={150} y={196} shirt={GOLD} />
      <Bubble x={60} y={112} text="家" />
    </g>
  ),
  office2: (
    <g>
      <Room wall="#eef0dd" />
      <rect x="40" y="34" width="86" height="58" rx="4" fill="#fff8e8" stroke={INK} strokeWidth="2" />
      <path d="M52 54 H114 M52 68 H100" stroke="#c9bfae" strokeWidth="2" />
      <rect x="250" y="120" width="120" height="12" rx="6" fill="#d8b98a" stroke={INK} strokeWidth="2" />
      <rect x="262" y="132" width="8" height="30" fill={INK} />
      <rect x="352" y="132" width="8" height="30" fill={INK} />
      <rect x="286" y="94" width="30" height="26" rx="4" fill={INK} />
      <rect x="292" y="99" width="18" height="16" fill="#8fb9c9" />
      <path d="M318 84 q6 -8 12 0" stroke={JADE} strokeWidth="2.4" fill="none" />
      <Person x={160} y={196} shirt={RED} />
      <Bubble x={60} y={112} text="自己" />
    </g>
  ),
  water: (
    <g>
      <Room wall="#f3e6cf" />
      <rect x="30" y="40" width="150" height="110" rx="4" fill="#d8b98a" stroke={INK} strokeWidth="2" />
      <path d="M30 78 H180" stroke={INK} strokeWidth="2" />
      <rect x="44" y="52" width="22" height="26" rx="4" fill="#cfe0e8" stroke={INK} strokeWidth="2" />
      <rect x="78" y="52" width="22" height="26" rx="4" fill="#cfe0e8" stroke={INK} strokeWidth="2" />
      <rect x="112" y="52" width="22" height="26" rx="4" fill="#cfe0e8" stroke={INK} strokeWidth="2" />
      <rect x="210" y="124" width="170" height="12" rx="6" fill="#d8b98a" stroke={INK} strokeWidth="2" />
      <Person x={250} y={196} shirt={GOLD} />
      <Person x={330} y={196} shirt={RED} flip />
      <Bubble x={220} y={40} text="水" />
    </g>
  ),
  cafe2: (
    <g>
      <Room wall="#f6e3d8" />
      <rect x="36" y="30" width="120" height="70" rx="4" fill="#fff8e8" stroke={INK} strokeWidth="2" />
      <path d="M46 46 H146 M46 60 H146 M46 74 H120" stroke="#c9bfae" strokeWidth="2" />
      <rect x="250" y="120" width="130" height="12" rx="6" fill="#d8b98a" stroke={INK} strokeWidth="2" />
      <rect x="262" y="132" width="8" height="30" fill={INK} />
      <rect x="360" y="132" width="8" height="30" fill={INK} />
      <rect x="276" y="104" width="20" height="16" rx="3" fill="#fff8e8" stroke={INK} strokeWidth="2" />
      <rect x="308" y="104" width="20" height="16" rx="3" fill="#fff8e8" stroke={INK} strokeWidth="2" />
      <Person x={150} y={196} shirt={JADE} />
      <Bubble x={60} y={112} text="周" />
    </g>
  ),
  letter: (
    <g>
      <Room wall="#eef0dd" />
      <rect x="60" y="118" width="180" height="14" rx="6" fill="#d8b98a" stroke={INK} strokeWidth="2" />
      <rect x="72" y="132" width="8" height="30" fill={INK} />
      <rect x="220" y="132" width="8" height="30" fill={INK} />
      <rect x="96" y="92" width="72" height="26" rx="2" fill="#fff8e8" stroke={INK} strokeWidth="2" />
      <path d="M96 92 L132 110 L168 92" stroke={INK} strokeWidth="2" fill="none" />
      <rect x="250" y="40" width="80" height="50" rx="4" fill="#fff8e8" stroke={INK} strokeWidth="2" />
      <circle cx="278" cy="66" r="10" fill={SKIN} stroke={INK} strokeWidth="1.6" />
      <Person x={300} y={196} shirt={GOLD} />
      <Bubble x={60} y={40} text="信" />
    </g>
  ),
  teamwork: (
    <g>
      <rect x="0" y="0" width="400" height="220" fill="#dcebf4" />
      <rect x="0" y="150" width="400" height="70" fill="#cfe0c3" />
      <Person x={150} y={196} shirt={RED} />
      <Person x={210} y={196} shirt={GOLD} flip />
      <rect x="168" y="140" width="34" height="30" rx="3" fill="#d8b98a" stroke={INK} strokeWidth="2" />
      <Bubble x={60} y={30} text="一起" />
    </g>
  ),
  mind: (
    <g>
      <Room wall="#eef0dd" />
      <rect x="250" y="120" width="130" height="12" rx="6" fill="#d8b98a" stroke={INK} strokeWidth="2" />
      <path d="M300 46 a20 20 0 1 1 12 36 v14 h-24 v-14 a20 20 0 0 1 12 -36 Z" fill="#fbe6a8" stroke={INK} strokeWidth="2" />
      <path d="M292 100 h18 M296 108 h10" stroke={INK} strokeWidth="2" />
      <Person x={150} y={196} shirt={JADE} />
      <Bubble x={60} y={40} text="想" />
    </g>
  ),
  centre: (
    <g>
      <Room wall="#eef0f2" />
      <rect x="40" y="40" width="200" height="70" rx="6" fill={JADE} opacity="0.25" stroke={INK} strokeWidth="2" />
      <text x="140" y="88" textAnchor="middle" fontSize="26" fill={INK} fontFamily="'Noto Serif SC','Songti SC',serif">
        中心
      </text>
      <rect x="60" y="130" width="180" height="14" rx="6" fill="#d8b98a" stroke={INK} strokeWidth="2" />
      <Person x={280} y={196} shirt={RED} />
      <Bubble x={230} y={124} text="信息" />
    </g>
  ),
  comeover: (
    <g>
      <Room wall="#eef0dd" />
      <rect x="40" y="30" width="100" height="60" rx="4" fill="#fff8e8" stroke={INK} strokeWidth="2" />
      <path d="M52 46 H128 M52 60 H128" stroke="#c9bfae" strokeWidth="2" />
      <circle cx="250" cy="60" r="22" fill="#fff8e8" stroke={INK} strokeWidth="2" />
      <path d="M250 48 V60 L260 66" stroke={INK} strokeWidth="2" fill="none" />
      <rect x="290" y="130" width="80" height="12" rx="6" fill="#d8b98a" stroke={INK} strokeWidth="2" />
      <Person x={160} y={196} shirt={GOLD} />
      <Person x={330} y={196} shirt={RED} flip />
      <Bubble x={60} y={112} text="来" />
    </g>
  ),
  news: (
    <g>
      <Room wall="#eef0dd" />
      <rect x="40" y="44" width="120" height="72" rx="6" fill={INK} />
      <rect x="48" y="52" width="104" height="56" fill="#8fb9c9" />
      <path d="M60 92 h30 M60 82 h50" stroke="#fff8e8" strokeWidth="3" />
      <rect x="230" y="120" width="140" height="44" rx="10" fill={JADE} opacity="0.35" stroke={INK} strokeWidth="2" />
      <rect x="220" y="142" width="160" height="30" rx="8" fill={JADE} opacity="0.5" stroke={INK} strokeWidth="2" />
      <Person x={320} y={196} shirt={RED} />
      <Bubble x={60} y={132} text="新闻" />
    </g>
  ),
  teacher2: (
    <g>
      <rect x="0" y="0" width="400" height="220" fill="#dcebf4" />
      <rect x="0" y="140" width="400" height="80" fill="#cfe0c3" />
      <rect x="40" y="40" width="150" height="90" rx="4" fill="#2f3b33" stroke={INK} strokeWidth="2" />
      <path d="M60 66 H170 M60 86 H150" stroke="#fff8e8" strokeWidth="3" />
      <path d="M250 54 l34 -18 l34 18 l-8 8 l-26 -14 l-26 14 Z" fill={INK} />
      <rect x="280" y="54" width="8" height="14" fill={GOLD} />
      <Person x={230} y={196} shirt={RED} />
      <Person x={320} y={196} shirt={GOLD} flip />
      <Bubble x={220} y={100} text="老师" />
    </g>
  ),
  health: (
    <g>
      <Room wall="#eef4f2" />
      <rect x="40" y="36" width="130" height="86" rx="6" fill={INK} />
      <rect x="48" y="44" width="114" height="70" fill="#8fb9c9" />
      <path d="M105 78 l-10 -12 a8 8 0 0 1 10 -10 a8 8 0 0 1 10 10 l-10 12 Z" fill={RED} />
      <Person x={280} y={196} shirt={JADE} />
      <Bubble x={220} y={140} text="健康" />
    </g>
  ),
  city: (
    <g>
      <rect x="0" y="0" width="400" height="220" fill="#dcebf4" />
      <rect x="0" y="150" width="400" height="70" fill="#b8b8b0" />
      <rect x="30" y="60" width="90" height="90" fill="#f6e8ce" stroke={INK} strokeWidth="2" />
      <rect x="140" y="80" width="80" height="70" fill="#efe0c8" stroke={INK} strokeWidth="2" />
      <rect x="240" y="50" width="70" height="100" fill="#f6e8ce" stroke={INK} strokeWidth="2" />
      <Person x={320} y={200} shirt={RED} />
      <Bubble x={30} y={20} text="市" />
    </g>
  ),
  young: (
    <g>
      <Room wall="#f3e6cf" />
      <rect x="40" y="40" width="120" height="100" rx="4" fill="#d8b98a" stroke={INK} strokeWidth="2" />
      <path d="M40 80 H160" stroke={INK} strokeWidth="2" />
      <rect x="60" y="56" width="24" height="22" rx="3" fill="#cfe0e8" stroke={INK} strokeWidth="2" />
      <Person x={250} y={196} shirt={GOLD} />
      <Bubble x={210} y={40} text="年轻" />
    </g>
  ),
  exercise: (
    <g>
      <rect x="0" y="0" width="400" height="220" fill="#dcebf4" />
      <rect x="0" y="150" width="400" height="70" fill="#cfe0c3" />
      <Person x={140} y={200} shirt={RED} />
      <circle cx="230" cy="180" r="12" fill={GOLD} stroke={INK} strokeWidth="2" />
      <path d="M250 120 l20 -10" stroke={INK} strokeWidth="3" />
      <Bubble x={280} y={50} text="运动" />
    </g>
  ),
  education: (
    <g>
      <Room wall="#eef0dd" />
      <rect x="40" y="34" width="170" height="90" rx="4" fill="#2f3b33" stroke={INK} strokeWidth="2" />
      <path d="M60 60 H180 M60 80 H150" stroke="#fff8e8" strokeWidth="3" />
      <rect x="250" y="130" width="120" height="12" rx="6" fill="#d8b98a" stroke={INK} strokeWidth="2" />
      <Person x={180} y={196} shirt={JADE} />
      <Bubble x={280} y={30} text="教育" />
    </g>
  ),
  shoes: (
    <g>
      <Room wall="#f3e6cf" />
      <rect x="30" y="40" width="130" height="100" rx="4" fill="#d8b98a" stroke={INK} strokeWidth="2" />
      <path d="M30 84 H160 M30 120 H160" stroke={INK} strokeWidth="2" />
      <path d="M48 66 h30 v14 h-30 Z" fill={INK} />
      <path d="M96 66 h30 v14 h-30 Z" fill={RED} />
      <Person x={260} y={196} shirt={GOLD} />
      <Bubble x={220} y={40} text="鞋" />
    </g>
  ),
  cooking: (
    <g>
      <Room wall="#f6e3d8" />
      <rect x="40" y="110" width="120" height="14" rx="6" fill="#d8b98a" stroke={INK} strokeWidth="2" />
      <path d="M60 96 h60 v14 h-60 Z" fill={INK} />
      <rect x="200" y="80" width="26" height="46" rx="4" fill={JADE} stroke={INK} strokeWidth="2" />
      <rect x="206" y="68" width="14" height="14" fill={INK} />
      <Person x={290} y={196} shirt={RED} />
      <Bubble x={230} y={30} text="油" />
    </g>
  ),
  pets2: (
    <g>
      <Room wall="#eef0dd" />
      <ellipse cx="100" cy="150" rx="30" ry="22" fill={GOLD} stroke={INK} strokeWidth="2" />
      <circle cx="80" cy="126" r="12" fill={GOLD} stroke={INK} strokeWidth="2" />
      <path d="M74 118 l-4 -10 M86 118 l4 -10" stroke={RED} strokeWidth="3" />
      <circle cx="250" cy="150" r="26" fill="#cfe0e8" opacity="0.7" stroke={INK} strokeWidth="2" />
      <Person x={320} y={196} shirt={JADE} />
      <Bubble x={60} y={40} text="鸡" />
    </g>
  ),
  match: (
    <g>
      <rect x="0" y="0" width="400" height="220" fill="#dcebf4" />
      <rect x="0" y="160" width="400" height="60" fill="#cfe0c3" />
      <path d="M120 160 V80 M280 160 V80 M120 110 H280" stroke={INK} strokeWidth="3" fill="none" />
      <circle cx="200" cy="90" r="10" fill={GOLD} stroke={INK} strokeWidth="2" />
      <Person x={120} y={200} shirt={RED} />
      <Person x={280} y={200} shirt={JADE} flip />
      <Bubble x={170} y={24} text="比赛" />
    </g>
  ),
  grow: (
    <g>
      <rect x="0" y="0" width="400" height="220" fill="#dcebf4" />
      <rect x="0" y="150" width="400" height="70" fill="#cfe0c3" />
      <path d="M120 60 l40 -22 l40 22 l-8 8 l-32 -16 l-32 16 Z" fill={INK} />
      <Person x={160} y={200} shirt={RED} />
      <Person x={250} y={200} shirt={GOLD} flip />
      <Bubble x={60} y={30} text="长大" />
    </g>
  ),
  care: (
    <g>
      <Room wall="#eef0dd" />
      <rect x="60" y="120" width="160" height="46" rx="10" fill={JADE} opacity="0.35" stroke={INK} strokeWidth="2" />
      <path d="M200 78 l-10 -12 a8 8 0 0 1 10 -10 a8 8 0 0 1 10 10 l-10 12 Z" fill={RED} />
      <Person x={300} y={196} shirt={GOLD} />
      <Bubble x={60} y={40} text="照顾" />
    </g>
  ),
  gift: (
    <g>
      <Room wall="#f3e6cf" />
      <rect x="60" y="120" width="110" height="46" rx="4" fill={JADE} stroke={INK} strokeWidth="2" />
      <rect x="90" y="96" width="50" height="30" rx="3" fill={RED} stroke={INK} strokeWidth="2" />
      <path d="M115 96 v30 M90 108 h50" stroke={GOLD} strokeWidth="3" />
      <Person x={300} y={196} shirt={GOLD} />
      <Bubble x={200} y={36} text="礼物" />
    </g>
  ),
  manager: (
    <g>
      <Room wall="#eef0dd" />
      <rect x="40" y="30" width="140" height="80" rx="4" fill="#fff8e8" stroke={INK} strokeWidth="2" />
      <path d="M60 90 l20 -24 l20 10 l24 -30" stroke={JADE} strokeWidth="4" fill="none" />
      <rect x="200" y="120" width="170" height="12" rx="6" fill="#d8b98a" stroke={INK} strokeWidth="2" />
      <Person x={280} y={196} shirt={RED} />
      <Bubble x={220} y={30} text="经理" />
    </g>
  ),
  website: (
    <g>
      <Room wall="#eef4f2" />
      <rect x="50" y="50" width="150" height="100" rx="6" fill={INK} />
      <rect x="58" y="58" width="134" height="84" fill="#cfe0e8" />
      <circle cx="125" cy="100" r="22" fill="none" stroke={JADE} strokeWidth="3" />
      <path d="M103 100 h44 M125 78 v44" stroke={JADE} strokeWidth="3" />
      <Person x={290} y={196} shirt={GOLD} />
      <Bubble x={230} y={36} text="网站" />
    </g>
  ),
  sun: (
    <g>
      <rect x="0" y="0" width="400" height="220" fill="#dcebf4" />
      <circle cx="120" cy="60" r="34" fill={GOLD} />
      <rect x="0" y="150" width="400" height="70" fill="#b8b8b0" />
      <Person x={230} y={200} shirt={RED} />
      <Person x={300} y={200} shirt={GOLD} flip />
      <Bubble x={200} y={120} text="太阳" />
    </g>
  ),
  fitting: (
    <g>
      <rect x="0" y="0" width="400" height="220" fill="#dcebf4" />
      <rect x="0" y="150" width="400" height="70" fill="#cfe0c3" />
      <rect x="250" y="120" width="80" height="10" rx="3" fill="#c99a6a" />
      <rect x="258" y="130" width="6" height="20" fill={INK} />
      <rect x="316" y="130" width="6" height="20" fill={INK} />
      <Person x={150} y={200} shirt={RED} />
      <Bubble x={60} y={30} text="合适" />
    </g>
  ),
  bike: (
    <g>
      <rect x="0" y="0" width="400" height="220" fill="#dcebf4" />
      <rect x="0" y="160" width="400" height="60" fill="#b8b8b0" />
      <circle cx="140" cy="150" r="26" fill="none" stroke={INK} strokeWidth="4" />
      <circle cx="230" cy="150" r="26" fill="none" stroke={INK} strokeWidth="4" />
      <path d="M140 150 l30 -40 h30 l30 40 M170 110 h-40" stroke={INK} strokeWidth="4" fill="none" />
      <Person x={300} y={200} shirt={RED} />
      <Bubble x={40} y={30} text="骑" />
    </g>
  ),
  rent: (
    <g>
      <Room wall="#f3e6cf" />
      <rect x="40" y="120" width="130" height="46" rx="8" fill={JADE} opacity="0.4" stroke={INK} strokeWidth="2" />
      <circle cx="250" cy="110" r="16" fill="none" stroke={GOLD} strokeWidth="5" />
      <path d="M250 126 v26" stroke={GOLD} strokeWidth="5" />
      <Person x={320} y={196} shirt={RED} />
      <Bubble x={60} y={40} text="租" />
    </g>
  ),
  lake: (
    <g>
      <rect x="0" y="0" width="400" height="220" fill="#dcebf4" />
      <rect x="0" y="120" width="400" height="100" fill="#8fb9c9" />
      <path d="M120 130 l40 -20 l40 20 Z" fill={RED} stroke={INK} strokeWidth="2" />
      <path d="M150 130 v20" stroke={INK} strokeWidth="3" />
      <Person x={300} y={200} shirt={GOLD} />
      <Bubble x={60} y={30} text="湖" />
    </g>
  ),
  homework: (
    <g>
      <Room wall="#eef0dd" />
      <rect x="60" y="110" width="160" height="14" rx="6" fill="#d8b98a" stroke={INK} strokeWidth="2" />
      <rect x="90" y="80" width="60" height="30" rx="2" fill="#fff8e8" stroke={INK} strokeWidth="2" />
      <path d="M100 88 H140 M100 96 H130" stroke={INK} strokeWidth="2" />
      <Person x={290} y={196} shirt={RED} />
      <Bubble x={60} y={40} text="作业" />
    </g>
  ),
  novel: (
    <g>
      <Room wall="#f6e3d8" />
      <rect x="60" y="100" width="70" height="50" rx="3" fill={JADE} stroke={INK} strokeWidth="2" />
      <path d="M95 100 V150" stroke={INK} strokeWidth="2" />
      <rect x="240" y="100" width="20" height="20" rx="3" fill="#fff8e8" stroke={INK} strokeWidth="2" />
      <Person x={320} y={196} shirt={RED} />
      <Bubble x={200} y={40} text="小说" />
    </g>
  ),
  queue: (
    <g>
      <Room wall="#eef0dd" />
      <rect x="280" y="100" width="100" height="14" rx="6" fill="#d8b98a" stroke={INK} strokeWidth="2" />
      <Person x={80} y={200} shirt={RED} />
      <Person x={140} y={200} shirt={GOLD} />
      <Person x={200} y={200} shirt={JADE} />
      <Bubble x={60} y={40} text="排队" />
    </g>
  ),
  bowl: (
    <g>
      <Room wall="#f3e6cf" />
      <rect x="60" y="130" width="120" height="12" rx="6" fill="#d8b98a" stroke={INK} strokeWidth="2" />
      <path d="M90 130 a30 22 0 0 0 60 0 Z" fill="#fff8e8" stroke={INK} strokeWidth="2" />
      <Person x={290} y={196} shirt={RED} />
      <Bubble x={200} y={40} text="碗" />
    </g>
  ),
  authors: (
    <g>
      <Room wall="#eef0dd" />
      <rect x="30" y="40" width="120" height="110" rx="4" fill="#d8b98a" stroke={INK} strokeWidth="2" />
      <path d="M30 76 H150 M30 112 H150" stroke={INK} strokeWidth="2" />
      <rect x="44" y="50" width="16" height="22" fill={RED} />
      <rect x="68" y="50" width="16" height="22" fill={JADE} />
      <Person x={280} y={196} shirt={GOLD} />
      <Bubble x={200} y={40} text="作家" />
    </g>
  ),
  captain: (
    <g>
      <rect x="0" y="0" width="400" height="220" fill="#dcebf4" />
      <rect x="0" y="160" width="400" height="60" fill="#cfe0c3" />
      <circle cx="200" cy="140" r="12" fill={GOLD} stroke={INK} strokeWidth="2" />
      <path d="M180 120 l30 -20" stroke={RED} strokeWidth="4" />
      <Person x={140} y={200} shirt={RED} />
      <Bubble x={60} y={30} text="队长" />
    </g>
  ),
  principal: (
    <g>
      <rect x="0" y="0" width="400" height="220" fill="#dcebf4" />
      <rect x="0" y="150" width="400" height="70" fill="#cfe0c3" />
      <rect x="40" y="60" width="120" height="90" fill="#f6e8ce" stroke={INK} strokeWidth="2" />
      <path d="M32 60 L100 36 L168 60 Z" fill={RED} stroke={INK} strokeWidth="2" />
      <circle cx="270" cy="150" r="22" fill="none" stroke={INK} strokeWidth="4" />
      <circle cx="330" cy="150" r="22" fill="none" stroke={INK} strokeWidth="4" />
      <path d="M270 150 l30 -30 h20 l10 30" stroke={INK} strokeWidth="3" fill="none" />
      <Bubble x={210} y={40} text="校长" />
    </g>
  ),
  science: (
    <g>
      <Room wall="#eef4f2" />
      <path d="M150 70 h40 l-6 40 l20 40 h-68 l20 -40 Z" fill="#cfe0e8" stroke={INK} strokeWidth="2" />
      <rect x="158" y="58" width="24" height="12" rx="3" fill={INK} />
      <Person x={280} y={196} shirt={JADE} />
      <Bubble x={60} y={40} text="科学" />
    </g>
  ),
  computer: (
    <g>
      <Room wall="#eef0dd" />
      <rect x="60" y="110" width="150" height="14" rx="6" fill="#d8b98a" stroke={INK} strokeWidth="2" />
      <rect x="90" y="70" width="80" height="40" rx="3" fill={INK} />
      <rect x="96" y="76" width="68" height="28" fill="#8fb9c9" />
      <Person x={300} y={196} shirt={RED} />
      <Bubble x={200} y={30} text="计算机" />
    </g>
  ),
  jokes: (
    <g>
      <Room wall="#eef0dd" />
      <rect x="50" y="50" width="130" height="90" rx="6" fill={INK} />
      <rect x="58" y="58" width="114" height="74" fill="#fbe6a8" />
      <circle cx="95" cy="90" r="6" fill={INK} />
      <circle cx="135" cy="90" r="6" fill={INK} />
      <path d="M90 106 q25 18 50 0" stroke={INK} strokeWidth="3" fill="none" />
      <Person x={300} y={196} shirt={RED} />
      <Bubble x={210} y={40} text="笑话" />
    </g>
  ),
  cart: (
    <g>
      <Room wall="#f3e6cf" />
      <rect x="30" y="40" width="110" height="100" rx="4" fill="#d8b98a" stroke={INK} strokeWidth="2" />
      <path d="M30 80 H140 M30 120 H140" stroke={INK} strokeWidth="2" />
      <path d="M220 120 h80 l-10 40 h-60 Z" fill="#cfe0e8" opacity="0.7" stroke={INK} strokeWidth="2" />
      <Person x={330} y={196} shirt={RED} />
      <Bubble x={60} y={150} text="超市" />
    </g>
  ),
  tourist: (
    <g><rect width="400" height="220" fill="#dcebf4" /><rect y="150" width="400" height="70" fill="#cfe0c3" />
      <rect x="250" y="80" width="60" height="44" rx="4" fill={INK} /><circle cx="280" cy="102" r="14" fill="#8fb9c9" />
      <Person x={140} y={200} shirt={RED} /><Bubble x={60} y={30} text="游客" /></g>
  ),
  business: (
    <g><Room wall="#eef0dd" /><rect x="220" y="120" width="150" height="12" rx="6" fill="#d8b98a" stroke={INK} strokeWidth="2" />
      <path d="M255 108 l10 -20 l10 20 Z" fill={RED} /><Person x={120} y={196} shirt={INK} /><Bubble x={60} y={30} text="商人" /></g>
  ),
  sea: (
    <g><rect width="400" height="220" fill="#dcebf4" /><rect y="120" width="400" height="100" fill="#8fb9c9" />
      <circle cx="320" cy="56" r="26" fill={GOLD} /><Person x={150} y={200} shirt={RED} /><Bubble x={60} y={30} text="大海" /></g>
  ),
  intern: (
    <g><Room wall="#eef4f2" /><rect x="40" y="120" width="150" height="12" rx="6" fill="#d8b98a" stroke={INK} strokeWidth="2" />
      <rect x="70" y="80" width="60" height="30" rx="3" fill="#fff8e8" stroke={INK} strokeWidth="2" />
      <Person x={280} y={196} shirt={JADE} /><Bubble x={220} y={40} text="实习" /></g>
  ),
  snow: (
    <g><rect width="400" height="220" fill="#dcebf4" /><rect y="160" width="400" height="60" fill="#fff8e8" />
      <circle cx="90" cy="50" r="5" fill="#fff" /><circle cx="180" cy="80" r="5" fill="#fff" /><circle cx="300" cy="46" r="5" fill="#fff" />
      <Person x={220} y={200} shirt={RED} /><Bubble x={60} y={30} text="下雪" /></g>
  ),
  gym: (
    <g><Room wall="#eef0dd" /><rect x="120" y="140" width="120" height="12" rx="6" fill={INK} />
      <circle cx="120" cy="146" r="18" fill={INK} /><circle cx="240" cy="146" r="18" fill={INK} />
      <Person x={300} y={196} shirt={RED} /><Bubble x={60} y={40} text="体育馆" /></g>
  ),
  zoo: (
    <g><rect width="400" height="220" fill="#dcebf4" /><rect y="150" width="400" height="70" fill="#cfe0c3" />
      <path d="M40 110 h300 M70 110 v40 M130 110 v40 M190 110 v40 M250 110 v40 M310 110 v40" stroke={INK} strokeWidth="3" />
      <Person x={320} y={200} shirt={GOLD} /><Bubble x={60} y={30} text="动物园" /></g>
  ),
  chopsticks: (
    <g><Room wall="#f3e6cf" /><rect x="80" y="130" width="160" height="12" rx="6" fill="#d8b98a" stroke={INK} strokeWidth="2" />
      <path d="M100 130 a20 16 0 0 0 40 0 Z" fill="#fff8e8" stroke={INK} strokeWidth="2" />
      <path d="M150 118 l40 -8 M150 124 l40 -2" stroke={INK} strokeWidth="3" />
      <Person x={300} y={196} shirt={RED} /><Bubble x={200} y={40} text="筷子" /></g>
  ),
  dumplings: (
    <g><Room wall="#eef0dd" /><ellipse cx="160" cy="140" rx="60" ry="14" fill="#fff8e8" stroke={INK} strokeWidth="2" />
      <circle cx="140" cy="132" r="10" fill={GOLD} /><circle cx="170" cy="134" r="10" fill={GOLD} /><circle cx="200" cy="132" r="10" fill={GOLD} />
      <Person x={310} y={196} shirt={JADE} /><Bubble x={200} y={30} text="饺子" /></g>
  ),
  toast: (
    <g><Room wall="#f6e3d8" /><path d="M120 120 l14 -30 l14 30 Z" fill="#fff8e8" stroke={INK} strokeWidth="2" />
      <path d="M240 120 l14 -30 l14 30 Z" fill="#fff8e8" stroke={INK} strokeWidth="2" />
      <Person x={200} y={196} shirt={RED} /><Bubble x={60} y={30} text="干杯" /></g>
  ),
  climb: (
    <g><rect width="400" height="220" fill="#dcebf4" /><path d="M60 190 L160 60 L260 190 Z" fill="#7d9c88" />
      <rect y="190" width="400" height="30" fill="#cfe0c3" /><Person x={170} y={200} shirt={RED} /><Bubble x={40} y={30} text="爬山" /></g>
  ),
  medicine: (
    <g><Room wall="#eef4f2" /><rect x="80" y="90" width="90" height="70" rx="6" fill="#fff8e8" stroke={INK} strokeWidth="2" />
      <path d="M125 100 v50 M100 125 h50" stroke={RED} strokeWidth="8" />
      <Person x={300} y={196} shirt={JADE} /><Bubble x={220} y={40} text="中医" /></g>
  ),
  exchange: (
    <g><Room wall="#eef0dd" /><rect x="40" y="40" width="160" height="90" rx="4" fill="#2f3b33" stroke={INK} strokeWidth="2" />
      <path d="M60 70 H180 M60 90 H150" stroke="#fff8e8" strokeWidth="3" />
      <Person x={290} y={196} shirt={GOLD} /><Bubble x={220} y={150} text="留学生" /></g>
  ),
  money: (
    <g><Room wall="#f3e6cf" /><rect x="60" y="90" width="70" height="34" rx="3" fill="#cfe0a8" stroke={INK} strokeWidth="2" />
      <rect x="100" y="110" width="70" height="34" rx="3" fill="#cfe0a8" stroke={INK} strokeWidth="2" />
      <Person x={300} y={196} shirt={RED} /><Bubble x={200} y={30} text="一万" /></g>
  ),
  done: (
    <g><Room wall="#eef0dd" /><rect x="60" y="70" width="100" height="80" rx="3" fill="#fff8e8" stroke={INK} strokeWidth="2" />
      <path d="M80 100 l12 12 l24 -26 M80 130 l12 12 l24 -26" stroke={JADE} strokeWidth="5" fill="none" />
      <Person x={300} y={196} shirt={GOLD} /><Bubble x={210} y={150} text="全部" /></g>
  ),
  weekend: (
    <g><Room wall="#f3e6cf" /><rect x="60" y="60" width="140" height="100" rx="4" fill="#fff8e8" stroke={INK} strokeWidth="2" />
      <path d="M60 90 H200 M95 60 V100 M140 60 V100" stroke={INK} strokeWidth="2" />
      <Person x={300} y={196} shirt={RED} /><Bubble x={210} y={30} text="周末" /></g>
  ),
  seasons: (
    <g><rect width="400" height="220" fill="#dcebf4" /><circle cx="100" cy="60" r="28" fill={GOLD} />
      <circle cx="300" cy="60" r="6" fill="#fff" /><circle cx="260" cy="90" r="5" fill="#fff" />
      <Person x={200} y={200} shirt={JADE} /><Bubble x={220} y={140} text="夏天" /></g>
  ),
  spring: (
    <g><rect width="400" height="220" fill="#dcebf4" /><rect y="150" width="400" height="70" fill="#cfe0c3" />
      <circle cx="100" cy="130" r="10" fill="#e9a49a" /><circle cx="300" cy="136" r="10" fill={GOLD} />
      <Person x={200} y={200} shirt={RED} /><Bubble x={60} y={30} text="春天" /></g>
  ),
  autumn: (
    <g><rect width="400" height="220" fill="#f6e3d8" /><rect y="160" width="400" height="60" fill="#d8b98a" />
      <path d="M100 70 l10 10 l-10 10 l-10 -10 Z" fill={RED} /><path d="M300 90 l10 10 l-10 10 l-10 -10 Z" fill={GOLD} />
      <Person x={200} y={200} shirt={JADE} /><Bubble x={60} y={30} text="秋天" /></g>
  ),
  festival: (
    <g><Room wall="#f6e3d8" /><rect x="150" y="40" width="40" height="56" rx="18" fill={RED} />
      <path d="M170 40 V100" stroke={INK} strokeWidth="2" /><Person x={280} y={196} shirt={GOLD} /><Bubble x={60} y={40} text="春节" /></g>
  ),
  because: (
    <g><Room wall="#eef0dd" /><rect x="60" y="80" width="70" height="50" rx="4" fill="#fff8e8" stroke={INK} strokeWidth="2" />
      <rect x="220" y="80" width="70" height="50" rx="4" fill="#fff8e8" stroke={INK} strokeWidth="2" />
      <path d="M130 105 H220" stroke={JADE} strokeWidth="4" /><Person x={320} y={196} shirt={RED} /><Bubble x={140} y={30} text="因为" /></g>
  ),
  others: (
    <g><Room wall="#eef0dd" /><Person x={90} y={200} shirt={RED} /><Person x={160} y={200} shirt={GOLD} /><Person x={230} y={200} shirt={JADE} />
      <Bubble x={270} y={30} text="其他" /></g>
  ),
  although: (
    <g><Room wall="#eef0dd" /><rect x="90" y="80" width="60" height="60" rx="4" fill={JADE} opacity="0.4" stroke={INK} strokeWidth="2" />
      <rect x="220" y="80" width="60" height="60" rx="4" fill={GOLD} opacity="0.4" stroke={INK} strokeWidth="2" />
      <Person x={320} y={196} shirt={RED} /><Bubble x={150} y={30} text="虽然" /></g>
  ),
  crowd: (
    <g><Room wall="#eef0dd" /><Person x={70} y={200} shirt={RED} /><Person x={120} y={200} shirt={GOLD} /><Person x={170} y={200} shirt={JADE} />
      <Person x={220} y={200} shirt={RED} /><Person x={270} y={200} shirt={GOLD} /><Bubble x={280} y={30} text="越来越" /></g>
  ),
  same: (
    <g><Room wall="#eef0dd" /><rect x="60" y="90" width="60" height="60" rx="4" fill="#fff8e8" stroke={INK} strokeWidth="2" />
      <rect x="220" y="90" width="60" height="60" rx="4" fill="#fff8e8" stroke={INK} strokeWidth="2" />
      <Person x={320} y={196} shirt={JADE} /><Bubble x={140} y={30} text="差不多" /></g>
  ),
  time: (
    <g><Room wall="#eef0dd" /><circle cx="140" cy="110" r="40" fill="#fff8e8" stroke={INK} strokeWidth="3" />
      <path d="M140 110 V86 M140 110 l18 10" stroke={INK} strokeWidth="3" />
      <Person x={300} y={196} shirt={RED} /><Bubble x={220} y={40} text="正好" /></g>
  ),
  cloud: (
    <g><rect width="400" height="220" fill="#dcebf4" /><ellipse cx="120" cy="70" rx="40" ry="22" fill="#fff" />
      <ellipse cx="300" cy="60" rx="46" ry="24" fill="#fff" /><path d="M120 110 v20 M160 110 v20 M260 110 v20" stroke="#8fb9c9" strokeWidth="4" />
      <Person x={200} y={200} shirt={RED} /><Bubble x={210} y={140} text="多云" /></g>
  ),
  cold: (
    <g><rect width="400" height="220" fill="#dcebf4" /><rect y="170" width="400" height="50" fill="#fff8e8" />
      <circle cx="140" cy="120" r="24" fill="#fff" stroke={INK} strokeWidth="2" /><circle cx="140" cy="88" r="18" fill="#fff" stroke={INK} strokeWidth="2" />
      <Person x={300} y={200} shirt={RED} /><Bubble x={60} y={30} text="零下" /></g>
  ),
  sms: (
    <g><Room wall="#eef4f2" /><rect x="130" y="60" width="70" height="110" rx="10" fill={INK} />
      <rect x="138" y="70" width="54" height="86" fill="#cfe0e8" />
      <Person x={300} y={196} shirt={GOLD} /><Bubble x={220} y={40} text="短信" /></g>
  ),
  week: (
    <g><Room wall="#f3e6cf" /><rect x="60" y="60" width="150" height="100" rx="4" fill="#fff8e8" stroke={INK} strokeWidth="2" />
      <path d="M60 92 H210 M60 124 H210" stroke={INK} strokeWidth="2" /><text x="135" y="150" textAnchor="middle" fontSize="22" fill={INK} fontFamily="'Noto Serif SC',serif">7</text>
      <Person x={310} y={196} shirt={JADE} /><Bubble x={220} y={20} text="下周" /></g>
  ),
};

export default function SceneArt({
  unit = 0,
  variant,
  className,
  hideBubbles = false,
}: {
  unit?: number;
  variant?: string;
  className?: string;
  hideBubbles?: boolean;
}) {
  const scenes = [
    // 0 — first day of class
    <g key="0">
      <Room wall="#f7ead2" />
      <Window x={28} y={24} w={92} h={70} />
      <rect x="250" y="34" width="108" height="62" rx="4" fill={JADE} opacity="0.9" />
      <text x="304" y="72" textAnchor="middle" fontSize="22" fill="#fff8e8" fontFamily="'Noto Serif SC','Songti SC',serif">
        你好
      </text>
      <rect x="236" y="146" width="132" height="10" rx="5" fill={GOLD} />
      <rect x="246" y="156" width="8" height="26" fill={INK} />
      <rect x="350" y="156" width="8" height="26" fill={INK} />
      <rect x="262" y="130" width="16" height="16" rx="4" fill="#fff8e8" stroke={INK} strokeWidth="2" />
      <rect x="330" y="130" width="16" height="16" rx="4" fill="#fff8e8" stroke={INK} strokeWidth="2" />
      <Person x={120} y={190} shirt={RED} />
      <Person x={286} y={190} shirt={GOLD} flip />
      <Bubble x={44} y={112} text="你好" />
    </g>,

    // 1 — at home
    <g key="1">
      <Room wall="#f3e6cf" />
      <rect x="24" y="40" width="86" height="116" rx="6" fill="#e8d3ae" stroke={INK} strokeWidth="2" />
      <rect x="34" y="54" width="66" height="8" fill="#fff8e8" />
      <rect x="34" y="78" width="66" height="8" fill="#fff8e8" />
      <rect x="34" y="102" width="66" height="8" fill="#fff8e8" />
      <rect x="34" y="126" width="42" height="8" fill={RED} opacity="0.7" />
      <rect x="236" y="120" width="126" height="12" rx="6" fill="#d8b98a" stroke={INK} strokeWidth="2" />
      <rect x="248" y="132" width="8" height="26" fill={INK} />
      <rect x="342" y="132" width="8" height="26" fill={INK} />
      <rect x="262" y="96" width="46" height="24" rx="3" fill={INK} />
      <rect x="268" y="100" width="34" height="16" fill="#8fb9c9" />
      <rect x="322" y="104" width="18" height="16" rx="3" fill="#fff8e8" stroke={INK} strokeWidth="2" />
      <Person x={130} y={190} shirt={JADE} />
      <Person x={292} y={190} shirt={RED} flip />
      <Bubble x={150} y={80} text="什么" />
    </g>,

    // 2 — at school
    <g key="2">
      <Room wall="#eef0dd" />
      <rect x="34" y="30" width="150" height="86" rx="4" fill="#2f3b33" stroke={INK} strokeWidth="2" />
      <text x="109" y="78" textAnchor="middle" fontSize="26" fill="#fff8e8" fontFamily="'Noto Serif SC','Songti SC',serif">
        老师好
      </text>
      <rect x="34" y="116" width="150" height="6" rx="3" fill={GOLD} />
      <rect x="238" y="150" width="122" height="10" rx="5" fill="#d8b98a" />
      <rect x="250" y="160" width="7" height="24" fill={INK} />
      <rect x="340" y="160" width="7" height="24" fill={INK} />
      <rect x="286" y="132" width="24" height="18" rx="3" fill="#fff8e8" stroke={INK} strokeWidth="2" />
      <Person x={124} y={194} shirt={JADE} />
      <Person x={296} y={194} shirt={RED} flip />
      <Bubble x={250} y={64} text="他是谁" />
    </g>,

    // 3 — café
    <g key="3">
      <Room wall="#f6e3d8" />
      <rect x="0" y="128" width="400" height="12" fill="#d8b98a" stroke={INK} strokeWidth="2" />
      <rect x="60" y="92" width="30" height="36" rx="4" fill="#fff8e8" stroke={INK} strokeWidth="2" />
      <path d="M90 100 q14 10 0 20" stroke={INK} strokeWidth="2" fill="none" />
      <rect x="118" y="98" width="30" height="30" rx="4" fill={JADE} stroke={INK} strokeWidth="2" />
      <path d="M148 106 q12 8 0 16" stroke={INK} strokeWidth="2" fill="none" />
      <circle cx="200" cy="118" r="12" fill={RED} stroke={INK} strokeWidth="2" />
      <path d="M200 106 q2 -8 8 -10" stroke={JADE} strokeWidth="3" fill="none" strokeLinecap="round" />
      <Person x={136} y={196} shirt={GOLD} />
      <Person x={286} y={196} shirt={RED} flip />
      <Bubble x={58} y={40} text="喝什么" />
      <Bubble x={286} y={36} text="茶" fill="#e7f0ea" />
    </g>,

    // 4 — station
    <g key="4">
      <Room wall="#e7ecf2" />
      <rect x="0" y="150" width="400" height="70" fill="#d9d2c4" />
      <rect x="0" y="150" width="400" height="6" fill={INK} opacity="0.35" />
      <circle cx="326" cy="64" r="34" fill="#fff8e8" stroke={INK} strokeWidth="2.4" />
      <path d="M326 64 V44" stroke={INK} strokeWidth="3" strokeLinecap="round" />
      <path d="M326 64 L344 72" stroke={RED} strokeWidth="3" strokeLinecap="round" />
      <circle cx="326" cy="64" r="3" fill={INK} />
      <rect x="40" y="46" width="120" height="70" rx="8" fill="#cfe0e8" stroke={INK} strokeWidth="2" />
      <rect x="52" y="58" width="40" height="26" rx="3" fill="#fff8e8" opacity="0.8" />
      <rect x="100" y="58" width="48" height="26" rx="3" fill="#fff8e8" opacity="0.8" />
      <text x="100" y="104" textAnchor="middle" fontSize="13" fill={INK}>
        3:30
      </text>
      <Person x={148} y={196} shirt={RED} />
      <Person x={272} y={196} shirt={JADE} flip />
      <Bubble x={42} y={128} text="几点" />
    </g>,

    // 5 — airport
    <g key="5">
      <Room wall="#e9eef0" />
      <rect x="26" y="24" width="168" height="96" rx="8" fill="#cfe0e8" stroke={INK} strokeWidth="2.4" />
      <path d="M70 86 L150 58 L128 92 Z" fill="#fff8e8" stroke={INK} strokeWidth="2" />
      <path d="M110 76 L96 62" stroke={INK} strokeWidth="2" />
      <rect x="210" y="150" width="150" height="10" rx="5" fill={GOLD} />
      <rect x="230" y="160" width="8" height="26" fill={INK} />
      <rect x="332" y="160" width="8" height="26" fill={INK} />
      <rect x="236" y="96" width="26" height="42" rx="4" fill={RED} stroke={INK} strokeWidth="2" />
      <rect x="238" y="88" width="22" height="10" rx="3" fill={RED} stroke={INK} strokeWidth="2" />
      <rect x="276" y="104" width="34" height="34" rx="4" fill="#d8b98a" stroke={INK} strokeWidth="2" />
      <Person x={166} y={196} shirt={JADE} />
      <Person x={300} y={196} shirt={GOLD} flip />
      <Bubble x={210} y={36} text="去中国" />
    </g>,
  ];

  const art = (variant && VARIANTS[variant]) || scenes[unit] || scenes[0];

  return (
    <svg
      viewBox="0 0 400 220"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      {hideBubbles ? <g className="no-bubbles">{art}</g> : art}
    </svg>
  );
}
