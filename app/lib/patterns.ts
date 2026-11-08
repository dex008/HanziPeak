export type Pattern = {
  unit: number;
  hanzi: string;
  pinyin: string;
  en: string;
  id: string;
  tokens: string[];
};

/** One model sentence per unit, used as a guided intro and a sentence-building exercise. */
export const PATTERNS: Record<number, Pattern> = {
  0: {
    unit: 0,
    hanzi: "你好！我叫小明。",
    pinyin: "Nǐ hǎo! Wǒ jiào Xiǎomíng.",
    en: "Hello! My name is Xiao Ming.",
    id: "Halo! Nama saya Xiao Ming.",
    tokens: ["你好", "我", "叫", "小明"],
  },
  1: {
    unit: 1,
    hanzi: "我是学生。",
    pinyin: "Wǒ shì xuésheng.",
    en: "I am a student.",
    id: "Saya seorang pelajar.",
    tokens: ["我", "是", "学生"],
  },
  2: {
    unit: 2,
    hanzi: "他是我的朋友。",
    pinyin: "Tā shì wǒ de péngyou.",
    en: "He is my friend.",
    id: "Dia teman saya.",
    tokens: ["他", "是", "我", "的", "朋友"],
  },
  3: {
    unit: 3,
    hanzi: "我喜欢喝茶。",
    pinyin: "Wǒ xǐhuan hē chá.",
    en: "I like drinking tea.",
    id: "Saya suka minum teh.",
    tokens: ["我", "喜欢", "喝", "茶"],
  },
  4: {
    unit: 4,
    hanzi: "今天天气很好。",
    pinyin: "Jīntiān tiānqì hěn hǎo.",
    en: "The weather is very nice today.",
    id: "Cuaca hari ini sangat bagus.",
    tokens: ["今天", "天气", "很", "好"],
  },
  5: {
    unit: 5,
    hanzi: "我想去中国。",
    pinyin: "Wǒ xiǎng qù Zhōngguó.",
    en: "I want to go to China.",
    id: "Saya ingin pergi ke Tiongkok.",
    tokens: ["我", "想", "去", "中国"],
  },
};
