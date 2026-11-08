export type SceneLine = {
  who: "A" | "B";
  name: string;
  h: string;
  p: string;
  en: string;
  id: string;
};

export type SceneQuestion = {
  en: string;
  id: string;
  options: Array<{ en: string; id: string }>;
  answer: number;
};

export type Scene = {
  unit: number;
  art?: string;
  title: { en: string; id: string };
  place: { en: string; id: string };
  lines: SceneLine[];
  question: SceneQuestion;
};

/** Fallback scene per unit (used when a lesson has no dedicated conversation). */
export const SCENES: Record<number, Scene> = {
  0: {
    unit: 0,
    title: { en: "First day of class", id: "Hari pertama kelas" },
    place: { en: "Language school", id: "Sekolah bahasa" },
    lines: [
      { who: "A", name: "小明", h: "你好！", p: "Nǐ hǎo!", en: "Hello!", id: "Halo!" },
      { who: "B", name: "小美", h: "你好！你好吗？", p: "Nǐ hǎo! Nǐ hǎo ma?", en: "Hello! How are you?", id: "Halo! Apa kabar?" },
      { who: "A", name: "小明", h: "我很好，谢谢。你呢？", p: "Wǒ hěn hǎo, xièxie. Nǐ ne?", en: "I'm fine, thanks. And you?", id: "Saya baik, terima kasih. Kamu?" },
      { who: "B", name: "小美", h: "我也很好。", p: "Wǒ yě hěn hǎo.", en: "I'm fine too.", id: "Saya juga baik." },
    ],
    question: {
      en: "How is Xiao Ming?",
      id: "Bagaimana kabar Xiao Ming?",
      options: [
        { en: "He is fine", id: "Dia baik" },
        { en: "He is busy", id: "Dia sibuk" },
        { en: "He is tired", id: "Dia lelah" },
      ],
      answer: 0,
    },
  },
  1: {
    unit: 1,
    title: { en: "At home", id: "Di rumah" },
    place: { en: "Living room", id: "Ruang tamu" },
    lines: [
      { who: "A", name: "小明", h: "这是什么？", p: "Zhè shì shénme?", en: "What is this?", id: "Ini apa?" },
      { who: "B", name: "小美", h: "这是书。", p: "Zhè shì shū.", en: "This is a book.", id: "Ini buku." },
      { who: "A", name: "小明", h: "那是杯子吗？", p: "Nà shì bēizi ma?", en: "Is that a cup?", id: "Itu gelas?" },
      { who: "B", name: "小美", h: "不是，那是电脑。", p: "Bú shì, nà shì diànnǎo.", en: "No, that's a computer.", id: "Bukan, itu komputer." },
    ],
    question: {
      en: "What is the thing they are talking about first?",
      id: "Benda apa yang pertama dibicarakan?",
      options: [
        { en: "A book", id: "Buku" },
        { en: "A cup", id: "Gelas" },
        { en: "A computer", id: "Komputer" },
      ],
      answer: 0,
    },
  },
  2: {
    unit: 2,
    title: { en: "At school", id: "Di sekolah" },
    place: { en: "Classroom", id: "Ruang kelas" },
    lines: [
      { who: "A", name: "小明", h: "他是谁？", p: "Tā shì shéi?", en: "Who is he?", id: "Dia siapa?" },
      { who: "B", name: "小美", h: "他是我的老师。", p: "Tā shì wǒ de lǎoshī.", en: "He is my teacher.", id: "Dia guru saya." },
      { who: "A", name: "小明", h: "那位是朋友吗？", p: "Nà wèi shì péngyou ma?", en: "Is that person a friend?", id: "Orang itu teman?" },
      { who: "B", name: "小美", h: "是，她是我朋友。", p: "Shì, tā shì wǒ péngyou.", en: "Yes, she is my friend.", id: "Ya, dia teman saya." },
    ],
    question: {
      en: "Who is the man?",
      id: "Siapa pria itu?",
      options: [
        { en: "My teacher", id: "Guru saya" },
        { en: "My friend", id: "Teman saya" },
        { en: "My doctor", id: "Dokter saya" },
      ],
      answer: 0,
    },
  },
  3: {
    unit: 3,
    title: { en: "At the café", id: "Di kafe" },
    place: { en: "Café counter", id: "Meja kafe" },
    lines: [
      { who: "A", name: "小美", h: "你想喝什么？", p: "Nǐ xiǎng hē shénme?", en: "What do you want to drink?", id: "Kamu mau minum apa?" },
      { who: "B", name: "小明", h: "我想喝茶。", p: "Wǒ xiǎng hē chá.", en: "I want tea.", id: "Saya mau teh." },
      { who: "A", name: "小美", h: "你要吃苹果吗？", p: "Nǐ yào chī píngguǒ ma?", en: "Do you want to eat an apple?", id: "Kamu mau makan apel?" },
      { who: "B", name: "小明", h: "不要，谢谢。", p: "Bú yào, xièxie.", en: "No, thanks.", id: "Tidak, terima kasih." },
    ],
    question: {
      en: "What does Xiao Ming want to drink?",
      id: "Xiao Ming mau minum apa?",
      options: [
        { en: "Tea", id: "Teh" },
        { en: "Coffee", id: "Kopi" },
        { en: "Water", id: "Air" },
      ],
      answer: 0,
    },
  },
  4: {
    unit: 4,
    title: { en: "At the station", id: "Di stasiun" },
    place: { en: "Train platform", id: "Peron kereta" },
    lines: [
      { who: "A", name: "小明", h: "现在几点？", p: "Xiànzài jǐ diǎn?", en: "What time is it now?", id: "Sekarang jam berapa?" },
      { who: "B", name: "小美", h: "现在三点。", p: "Xiànzài sān diǎn.", en: "It's three o'clock.", id: "Sekarang jam tiga." },
      { who: "A", name: "小明", h: "火车几点来？", p: "Huǒchē jǐ diǎn lái?", en: "What time does the train come?", id: "Kereta datang jam berapa?" },
      { who: "B", name: "小美", h: "三点半。", p: "Sān diǎn bàn.", en: "Three thirty.", id: "Jam setengah empat." },
    ],
    question: {
      en: "What time is it now?",
      id: "Sekarang jam berapa?",
      options: [
        { en: "Three o'clock", id: "Jam tiga" },
        { en: "Three thirty", id: "Jam setengah empat" },
        { en: "Four o'clock", id: "Jam empat" },
      ],
      answer: 0,
    },
  },
  5: {
    unit: 5,
    title: { en: "At the airport", id: "Di bandara" },
    place: { en: "Departure hall", id: "Ruang keberangkatan" },
    lines: [
      { who: "A", name: "小明", h: "我想去中国。", p: "Wǒ xiǎng qù Zhōngguó.", en: "I want to go to China.", id: "Saya ingin pergi ke Tiongkok." },
      { who: "B", name: "小美", h: "你什么时候去？", p: "Nǐ shénme shíhou qù?", en: "When are you going?", id: "Kapan kamu pergi?" },
      { who: "A", name: "小明", h: "明天。", p: "Míngtiān.", en: "Tomorrow.", id: "Besok." },
      { who: "B", name: "小美", h: "天气很好，去吧！", p: "Tiānqì hěn hǎo, qù ba!", en: "The weather is nice, go!", id: "Cuacanya bagus, pergilah!" },
    ],
    question: {
      en: "When is Xiao Ming going?",
      id: "Kapan Xiao Ming pergi?",
      options: [
        { en: "Tomorrow", id: "Besok" },
        { en: "Today", id: "Hari ini" },
        { en: "Next week", id: "Minggu depan" },
      ],
      answer: 0,
    },
  },
};

/**
 * Lesson-specific conversations for the first five lessons, using only words from
 * those lessons (or earlier). Other lessons fall back to their unit scene.
 */
export const LESSON_SCENES: Record<string, Scene> = {
  l01: {
    unit: 0,
    art: "corridor",
    title: { en: "First greeting", id: "Sapaan pertama" },
    place: { en: "School corridor", id: "Koridor sekolah" },
    lines: [
      { who: "A", name: "小明", h: "你好！你好吗？", p: "Nǐ hǎo! Nǐ hǎo ma?", en: "Hello! How are you?", id: "Halo! Apa kabar?" },
      { who: "B", name: "小美", h: "我很好，谢谢。", p: "Wǒ hěn hǎo, xièxie.", en: "I'm fine, thanks.", id: "Saya baik, terima kasih." },
      { who: "A", name: "小明", h: "我也很好。", p: "Wǒ yě hěn hǎo.", en: "I'm fine too.", id: "Saya juga baik." },
      { who: "B", name: "小美", h: "再见！", p: "Zàijiàn!", en: "Goodbye!", id: "Sampai jumpa!" },
    ],
    question: {
      en: "How is Xiao Mei?",
      id: "Bagaimana kabar Xiao Mei?",
      options: [
        { en: "She is fine", id: "Dia baik" },
        { en: "She is busy", id: "Dia sibuk" },
        { en: "She is tired", id: "Dia lelah" },
      ],
      answer: 0,
    },
  },
  l02: {
    unit: 0,
    art: "classroom",
    title: { en: "Who is she?", id: "Siapa dia?" },
    place: { en: "Classroom", id: "Ruang kelas" },
    lines: [
      { who: "A", name: "小明", h: "这是谁？", p: "Zhè shì shéi?", en: "Who is this?", id: "Ini siapa?" },
      { who: "B", name: "小美", h: "她是我朋友。", p: "Tā shì wǒ péngyou.", en: "She is my friend.", id: "Dia teman saya." },
      { who: "A", name: "小明", h: "她叫什么名字？", p: "Tā jiào shénme míngzi?", en: "What is her name?", id: "Siapa namanya?" },
      { who: "B", name: "小美", h: "她叫小美。", p: "Tā jiào Xiǎoměi.", en: "Her name is Xiao Mei.", id: "Namanya Xiao Mei." },
    ],
    question: {
      en: "Who is the girl?",
      id: "Siapa perempuan itu?",
      options: [
        { en: "Xiao Ming's friend", id: "Teman Xiao Ming" },
        { en: "The teacher", id: "Guru" },
        { en: "The mother", id: "Ibu" },
      ],
      answer: 0,
    },
  },
  l03: {
    unit: 0,
    art: "teacher",
    title: { en: "At school", id: "Di sekolah" },
    place: { en: "Classroom", id: "Ruang kelas" },
    lines: [
      { who: "A", name: "小美", h: "你是学生吗？", p: "Nǐ shì xuésheng ma?", en: "Are you a student?", id: "Kamu pelajar?" },
      { who: "B", name: "小明", h: "是，我是学生。他是老师吗？", p: "Shì, wǒ shì xuésheng. Tā shì lǎoshī ma?", en: "Yes, I'm a student. Is he a teacher?", id: "Ya, saya pelajar. Dia guru?" },
      { who: "A", name: "小美", h: "不是，他也是学生。我们都在学校。", p: "Bú shì, tā yě shì xuésheng. Wǒmen dōu zài xuéxiào.", en: "No, he's a student too. We are both at school.", id: "Bukan, dia juga pelajar. Kami berdua di sekolah." },
    ],
    question: {
      en: "Where are they?",
      id: "Di mana mereka?",
      options: [
        { en: "At school", id: "Di sekolah" },
        { en: "At home", id: "Di rumah" },
        { en: "In China", id: "Di Tiongkok" },
      ],
      answer: 0,
    },
  },
  l04: {
    unit: 0,
    art: "yard",
    title: { en: "A trip to China", id: "Rencana ke Tiongkok" },
    place: { en: "School yard", id: "Halaman sekolah" },
    lines: [
      { who: "A", name: "小美", h: "请问，你想去中国吗？", p: "Qǐngwèn, nǐ xiǎng qù Zhōngguó ma?", en: "Excuse me, do you want to go to China?", id: "Permisi, kamu ingin pergi ke Tiongkok?" },
      { who: "B", name: "小明", h: "想去。", p: "Xiǎng qù.", en: "I want to.", id: "Ingin." },
      { who: "A", name: "小美", h: "对不起，我不能去。", p: "Duìbuqǐ, wǒ bù néng qù.", en: "Sorry, I can't go.", id: "Maaf, saya tidak bisa pergi." },
      { who: "B", name: "小明", h: "没关系。", p: "Méi guānxi.", en: "That's okay.", id: "Tidak apa-apa." },
    ],
    question: {
      en: "Who cannot go?",
      id: "Siapa yang tidak bisa pergi?",
      options: [
        { en: "Xiao Mei", id: "Xiao Mei" },
        { en: "Xiao Ming", id: "Xiao Ming" },
        { en: "The teacher", id: "Guru" },
      ],
      answer: 0,
    },
  },
  l05: {
    unit: 0,
    art: "writing",
    title: { en: "Learning to write", id: "Belajar menulis" },
    place: { en: "Classroom", id: "Ruang kelas" },
    lines: [
      { who: "A", name: "小美", h: "请说，我听。", p: "Qǐng shuō, wǒ tīng.", en: "Please speak, I'm listening.", id: "Silakan bicara, saya mendengar." },
      { who: "B", name: "小明", h: "好，我说。你写。", p: "Hǎo, wǒ shuō. Nǐ xiě.", en: "Okay, I'll speak. You write.", id: "Baik, saya bicara. Kamu menulis." },
      { who: "A", name: "小美", h: "我写什么？", p: "Wǒ xiě shénme?", en: "What do I write?", id: "Saya menulis apa?" },
      { who: "B", name: "小明", h: "你写“你好”。", p: "Nǐ xiě “nǐ hǎo”.", en: "Write “hello”.", id: "Tulis “halo”." },
    ],
    question: {
      en: "What should she write?",
      id: "Apa yang harus dia tulis?",
      options: [
        { en: "你好", id: "你好" },
        { en: "谢谢", id: "谢谢" },
        { en: "再见", id: "再见" },
      ],
      answer: 0,
    },
  },
  l06: {
    unit: 1,
    art: "seats",
    title: { en: "In class", id: "Di kelas" },
    place: { en: "Classroom", id: "Ruang kelas" },
    lines: [
      { who: "A", name: "小美", h: "你做什么？", p: "Nǐ zuò shénme?", en: "What are you doing?", id: "Kamu sedang apa?" },
      { who: "B", name: "小明", h: "我坐。你呢？", p: "Wǒ zuò. Nǐ ne?", en: "I'm sitting. And you?", id: "Saya duduk. Kamu?" },
      { who: "A", name: "小美", h: "我做这个。太好了！", p: "Wǒ zuò zhège. Tài hǎo le!", en: "I'm doing this. Great!", id: "Saya mengerjakan ini. Bagus sekali!" },
      { who: "B", name: "小明", h: "你坐，我看。", p: "Nǐ zuò, wǒ kàn.", en: "You sit, I'll watch.", id: "Kamu duduk, saya lihat." },
    ],
    question: {
      en: "What is Xiao Ming doing?",
      id: "Apa yang dilakukan Xiao Ming?",
      options: [
        { en: "Sitting", id: "Duduk" },
        { en: "Writing", id: "Menulis" },
        { en: "Reading", id: "Membaca" },
      ],
      answer: 0,
    },
  },
  l07: {
    unit: 1,
    art: "home",
    title: { en: "Living in China", id: "Tinggal di Tiongkok" },
    place: { en: "Front door", id: "Pintu rumah" },
    lines: [
      { who: "A", name: "小明", h: "你住中国吗？", p: "Nǐ zhù Zhōngguó ma?", en: "Do you live in China?", id: "Kamu tinggal di Tiongkok?" },
      { who: "B", name: "小美", h: "是，我住中国。", p: "Shì, wǒ zhù Zhōngguó.", en: "Yes, I live in China.", id: "Ya, saya tinggal di Tiongkok." },
      { who: "A", name: "小明", h: "中国大吗？", p: "Zhōngguó dà ma?", en: "Is China big?", id: "Apakah Tiongkok besar?" },
      { who: "B", name: "小美", h: "很大。我们走吗？", p: "Hěn dà. Wǒmen zǒu ma?", en: "Very big. Shall we go?", id: "Sangat besar. Kita pergi?" },
      { who: "A", name: "小明", h: "好，我们回。", p: "Hǎo, wǒmen huí.", en: "Okay, let's go back.", id: "Baik, kita kembali." },
    ],
    question: {
      en: "Where does Xiao Mei live?",
      id: "Di mana Xiao Mei tinggal?",
      options: [
        { en: "In China", id: "Di Tiongkok" },
        { en: "In Beijing", id: "Di Beijing" },
        { en: "At school", id: "Di sekolah" },
      ],
      answer: 0,
    },
  },
  l08: {
    unit: 1,
    art: "weather",
    title: { en: "Beijing weather", id: "Cuaca Beijing" },
    place: { en: "By the window", id: "Dekat jendela" },
    lines: [
      { who: "A", name: "小明", h: "北京热吗？", p: "Běijīng rè ma?", en: "Is Beijing hot?", id: "Apakah Beijing panas?" },
      { who: "B", name: "小美", h: "今天很热。", p: "Jīntiān hěn rè.", en: "It's very hot today.", id: "Hari ini sangat panas." },
      { who: "A", name: "小明", h: "明天呢？", p: "Míngtiān ne?", en: "And tomorrow?", id: "Kalau besok?" },
      { who: "B", name: "小美", h: "明天不热，明天冷。", p: "Míngtiān bú rè, míngtiān lěng.", en: "Tomorrow isn't hot, it's cold.", id: "Besok tidak panas, besok dingin." },
    ],
    question: {
      en: "How is the weather in Beijing today?",
      id: "Bagaimana cuaca di Beijing hari ini?",
      options: [
        { en: "Hot", id: "Panas" },
        { en: "Cold", id: "Dingin" },
        { en: "Rainy", id: "Hujan" },
      ],
      answer: 0,
    },
  },
  l09: {
    unit: 2,
    art: "tea",
    title: { en: "Buying tea", id: "Membeli teh" },
    place: { en: "Tea shop", id: "Kedai teh" },
    lines: [
      { who: "A", name: "小美", h: "你买书吗？", p: "Nǐ mǎi shū ma?", en: "Are you buying a book?", id: "Kamu membeli buku?" },
      { who: "B", name: "小明", h: "我买书。你呢？", p: "Wǒ mǎi shū. Nǐ ne?", en: "I'm buying a book. And you?", id: "Saya membeli buku. Kamu?" },
      { who: "A", name: "小美", h: "我买茶。我有钱。", p: "Wǒ mǎi chá. Wǒ yǒu qián.", en: "I'm buying tea. I have money.", id: "Saya membeli teh. Saya punya uang." },
      { who: "B", name: "小明", h: "好，我们买。", p: "Hǎo, wǒmen mǎi.", en: "Okay, let's buy.", id: "Baik, kita beli." },
    ],
    question: {
      en: "What is Xiao Mei buying?",
      id: "Apa yang dibeli Xiao Mei?",
      options: [
        { en: "Tea", id: "Teh" },
        { en: "A book", id: "Buku" },
        { en: "Rice", id: "Nasi" },
      ],
      answer: 0,
    },
  },
  l10: {
    unit: 2,
    art: "pets",
    title: { en: "Cat and dog", id: "Kucing dan anjing" },
    place: { en: "Living room", id: "Ruang tamu" },
    lines: [
      { who: "A", name: "小明", h: "你家有猫吗？", p: "Nǐ jiā yǒu māo ma?", en: "Do you have a cat at home?", id: "Kamu punya kucing di rumah?" },
      { who: "B", name: "小美", h: "有，我家有猫和狗。", p: "Yǒu, wǒ jiā yǒu māo hé gǒu.", en: "Yes, I have a cat and a dog.", id: "Ya, saya punya kucing dan anjing." },
      { who: "A", name: "小明", h: "我家有狗。", p: "Wǒ jiā yǒu gǒu.", en: "I have a dog at home.", id: "Saya punya anjing di rumah." },
      { who: "B", name: "小美", h: "我家有猫，也有狗。", p: "Wǒ jiā yǒu māo, yě yǒu gǒu.", en: "I have a cat and also a dog.", id: "Saya punya kucing, juga anjing." },
    ],
    question: {
      en: "Which animals live at Xiao Mei's home?",
      id: "Hewan apa yang ada di rumah Xiao Mei?",
      options: [
        { en: "A cat and a dog", id: "Kucing dan anjing" },
        { en: "Only a cat", id: "Hanya kucing" },
        { en: "Only a dog", id: "Hanya anjing" },
      ],
      answer: 0,
    },
  },
  l11: {
    unit: 2,
    art: "office",
    title: { en: "At the office", id: "Di kantor" },
    place: { en: "Desk", id: "Meja kerja" },
    lines: [
      { who: "A", name: "小明", h: "你喜欢工作吗？", p: "Nǐ xǐhuan gōngzuò ma?", en: "Do you like your work?", id: "Kamu suka pekerjaanmu?" },
      { who: "B", name: "小美", h: "喜欢。我觉得工作很好。", p: "Xǐhuan. Wǒ juéde gōngzuò hěn hǎo.", en: "Yes. I think the work is good.", id: "Suka. Menurut saya pekerjaannya bagus." },
      { who: "A", name: "小明", h: "时间快吗？", p: "Shíjiān kuài ma?", en: "Does time go fast?", id: "Apakah waktunya cepat?" },
      { who: "B", name: "小美", h: "很快！", p: "Hěn kuài!", en: "Very fast!", id: "Sangat cepat!" },
    ],
    question: {
      en: "How does Xiao Mei feel about her work?",
      id: "Bagaimana perasaan Xiao Mei tentang pekerjaannya?",
      options: [
        { en: "She likes it", id: "Dia suka" },
        { en: "She dislikes it", id: "Dia tidak suka" },
        { en: "She is tired of it", id: "Dia lelah" },
      ],
      answer: 0,
    },
  },
  l12: {
    unit: 2,
    art: "street",
    title: { en: "Looking for the phone", id: "Mencari telepon" },
    place: { en: "Street", id: "Jalan" },
    lines: [
      { who: "A", name: "小美", h: "你在找什么？", p: "Nǐ zài zhǎo shénme?", en: "What are you looking for?", id: "Kamu mencari apa?" },
      { who: "B", name: "小明", h: "我在找电话。", p: "Wǒ zài zhǎo diànhuà.", en: "I'm looking for my phone.", id: "Saya mencari telepon." },
      { who: "A", name: "小美", h: "你看到了吗？", p: "Nǐ kàn dào le ma?", en: "Did you see it?", id: "Kamu melihatnya?" },
      { who: "B", name: "小明", h: "看到了！在那里。", p: "Kàn dào le! Zài nàlǐ.", en: "I see it! Over there.", id: "Terlihat! Di sana." },
    ],
    question: {
      en: "What is Xiao Ming looking for?",
      id: "Apa yang dicari Xiao Ming?",
      options: [
        { en: "His phone", id: "Teleponnya" },
        { en: "A book", id: "Buku" },
        { en: "His keys", id: "Kuncinya" },
      ],
      answer: 0,
    },
  },
  l13: {
    unit: 3,
    art: "classroom",
    title: { en: "At school", id: "Di sekolah" },
    place: { en: "Classroom", id: "Ruang kelas" },
    lines: [
      { who: "A", name: "小明", h: "你在哪里？", p: "Nǐ zài nǎlǐ?", en: "Where are you?", id: "Kamu di mana?" },
      { who: "B", name: "小美", h: "我在学校里。", p: "Wǒ zài xuéxiào lǐ.", en: "I'm inside the school.", id: "Saya di dalam sekolah." },
      { who: "A", name: "小明", h: "我在学校前面。", p: "Wǒ zài xuéxiào qiánmiàn.", en: "I'm in front of the school.", id: "Saya di depan sekolah." },
      { who: "B", name: "小美", h: "好，我出去。", p: "Hǎo, wǒ chūqù.", en: "Okay, I'm coming out.", id: "Baik, saya keluar." },
    ],
    question: {
      en: "Where is Xiao Mei?",
      id: "Di mana Xiao Mei?",
      options: [
        { en: "Inside the school", id: "Di dalam sekolah" },
        { en: "In front of the school", id: "Di depan sekolah" },
        { en: "Behind the school", id: "Di belakang sekolah" },
      ],
      answer: 0,
    },
  },
  l14: {
    unit: 3,
    art: "cafe",
    title: { en: "Waiting for a friend", id: "Menunggu teman" },
    place: { en: "Café", id: "Kafe" },
    lines: [
      { who: "A", name: "小明", h: "你们等谁？", p: "Nǐmen děng shéi?", en: "Who are you waiting for?", id: "Kalian menunggu siapa?" },
      { who: "B", name: "小美", h: "我们等他。", p: "Wǒmen děng tā.", en: "We're waiting for him.", id: "Kami menunggu dia." },
      { who: "A", name: "小明", h: "他几点来？", p: "Tā jǐ diǎn lái?", en: "What time is he coming?", id: "Dia datang jam berapa?" },
      { who: "B", name: "小美", h: "两点。", p: "Liǎng diǎn.", en: "Two o'clock.", id: "Jam dua." },
    ],
    question: {
      en: "What time is he coming?",
      id: "Jam berapa dia datang?",
      options: [
        { en: "Two o'clock", id: "Jam dua" },
        { en: "Three o'clock", id: "Jam tiga" },
        { en: "Four o'clock", id: "Jam empat" },
      ],
      answer: 0,
    },
  },
  l15: {
    unit: 3,
    art: "phone",
    title: { en: "At home", id: "Di rumah" },
    place: { en: "Living room", id: "Ruang tamu" },
    lines: [
      { who: "A", name: "小美", h: "你喝茶吗？", p: "Nǐ hē chá ma?", en: "Will you have tea?", id: "Kamu minum teh?" },
      { who: "B", name: "小明", h: "我没喝。我还不想喝。", p: "Wǒ méi hē. Wǒ hái bù xiǎng hē.", en: "I haven't. I don't want any yet.", id: "Belum. Saya belum mau." },
      { who: "A", name: "小美", h: "你喝吧。", p: "Nǐ hē ba.", en: "Go ahead, drink.", id: "Minumlah." },
      { who: "B", name: "小明", h: "好，我就喝。真好！", p: "Hǎo, wǒ jiù hē. Zhēn hǎo!", en: "Okay, I'll have some. So good!", id: "Baik, saya minum. Enak sekali!" },
    ],
    question: {
      en: "Has Xiao Ming had tea yet?",
      id: "Apakah Xiao Ming sudah minum teh?",
      options: [
        { en: "Not yet", id: "Belum" },
        { en: "Yes, already", id: "Sudah" },
        { en: "He doesn't want any", id: "Dia tidak mau" },
      ],
      answer: 0,
    },
  },
  l16: {
    unit: 3,
    art: "park",
    title: { en: "Let's go together", id: "Ayo pergi bersama" },
    place: { en: "Park", id: "Taman" },
    lines: [
      { who: "A", name: "小明", h: "我们一起走吧。", p: "Wǒmen yìqǐ zǒu ba.", en: "Let's go together.", id: "Ayo pergi bersama." },
      { who: "B", name: "小美", h: "好，你的车在这里吗？", p: "Hǎo, nǐ de chē zài zhèlǐ ma?", en: "Okay, is your car here?", id: "Baik, mobilmu di sini?" },
      { who: "A", name: "小明", h: "车在那里。", p: "Chē zài nàlǐ.", en: "The car is over there.", id: "Mobilnya di sana." },
      { who: "B", name: "小美", h: "我看到了。", p: "Wǒ kàn dào le.", en: "I see it.", id: "Saya melihatnya." },
    ],
    question: {
      en: "Where is the car?",
      id: "Di mana mobilnya?",
      options: [
        { en: "Over there", id: "Di sana" },
        { en: "Here", id: "Di sini" },
        { en: "At home", id: "Di rumah" },
      ],
      answer: 0,
    },
  },
  l17: {
    unit: 3,
    art: "shop",
    title: { en: "At the bookshop", id: "Di toko buku" },
    place: { en: "Bookshop", id: "Toko buku" },
    lines: [
      { who: "A", name: "小明", h: "这本书多少钱？", p: "Zhè běn shū duōshao qián?", en: "How much is this book?", id: "Berapa harga buku ini?" },
      { who: "B", name: "小美", h: "三块。", p: "Sān kuài.", en: "Three yuan.", id: "Tiga yuan." },
      { who: "A", name: "小明", h: "我要这本。还有别的吗？", p: "Wǒ yào zhè běn. Háiyǒu bié de ma?", en: "I'll take this one. Do you have others?", id: "Saya mau yang ini. Ada yang lain?" },
      { who: "B", name: "小美", h: "没有了，这是最后的一本。", p: "Méiyǒu le, zhè shì zuìhòu de yì běn.", en: "No more, this is the last one.", id: "Tidak ada, ini yang terakhir." },
    ],
    question: {
      en: "How much is the book?",
      id: "Berapa harga bukunya?",
      options: [
        { en: "Three yuan", id: "Tiga yuan" },
        { en: "Five yuan", id: "Lima yuan" },
        { en: "Ten yuan", id: "Sepuluh yuan" },
      ],
      answer: 0,
    },
  },
  l18: {
    unit: 3,
    art: "desk",
    title: { en: "Tall and short", id: "Tinggi dan pendek" },
    place: { en: "Desk", id: "Meja" },
    lines: [
      { who: "A", name: "小美", h: "你有多高？", p: "Nǐ yǒu duō gāo?", en: "How tall are you?", id: "Berapa tinggi kamu?" },
      { who: "B", name: "小明", h: "我很高。", p: "Wǒ hěn gāo.", en: "I'm very tall.", id: "Saya sangat tinggi." },
      { who: "A", name: "小美", h: "请先放这里。", p: "Qǐng xiān fàng zhèlǐ.", en: "Please put it here first.", id: "Tolong taruh di sini dulu." },
      { who: "B", name: "小明", h: "好，我拿。", p: "Hǎo, wǒ ná.", en: "Okay, I'll take it.", id: "Baik, saya ambil." },
    ],
    question: {
      en: "What is Xiao Ming asked to do?",
      id: "Apa yang diminta Xiao Ming lakukan?",
      options: [
        { en: "Put the thing here", id: "Meletakkan barang di sini" },
        { en: "Read a book", id: "Membaca buku" },
        { en: "Write his name", id: "Menulis namanya" },
      ],
      answer: 0,
    },
  },
  l19: {
    unit: 3,
    art: "airport",
    title: { en: "Ready to go home", id: "Siap pulang" },
    place: { en: "Airport", id: "Bandara" },
    lines: [
      { who: "A", name: "小美", h: "您去哪儿？", p: "Nín qù nǎr?", en: "Where are you going?", id: "Anda mau ke mana?" },
      { who: "B", name: "小明", h: "我回家。", p: "Wǒ huí jiā.", en: "I'm going home.", id: "Saya pulang." },
      { who: "A", name: "小美", h: "您准备好了吗？", p: "Nín zhǔnbèi hǎo le ma?", en: "Are you ready?", id: "Anda sudah siap?" },
      { who: "B", name: "小明", h: "准备好了。谢谢您！", p: "Zhǔnbèi hǎo le. Xièxie nín!", en: "Ready. Thank you!", id: "Sudah siap. Terima kasih!" },
    ],
    question: {
      en: "What is Xiao Ming doing?",
      id: "Apa yang dilakukan Xiao Ming?",
      options: [
        { en: "Going home", id: "Pulang ke rumah" },
        { en: "Working", id: "Bekerja" },
        { en: "Sleeping", id: "Tidur" },
      ],
      answer: 0,
    },
  },
  l20: {
    unit: 3,
    art: "road",
    title: { en: "At the door", id: "Di pintu" },
    place: { en: "Street", id: "Jalan" },
    lines: [
      { who: "A", name: "小明", h: "你在门口吗？", p: "Nǐ zài ménkǒu ma?", en: "Are you at the door?", id: "Kamu di pintu?" },
      { who: "B", name: "小美", h: "是，我在门口。", p: "Shì, wǒ zài ménkǒu.", en: "Yes, I'm at the door.", id: "Ya, saya di pintu." },
      { who: "A", name: "小明", h: "路上人多吗？", p: "Lùshang rén duō ma?", en: "Are there many people on the road?", id: "Di jalan banyak orang?" },
      { who: "B", name: "小美", h: "有些，我在等人。", p: "Yǒuxiē, wǒ zài děng rén.", en: "Some, I'm waiting for someone.", id: "Ada beberapa, saya menunggu orang." },
    ],
    question: {
      en: "Where is Xiao Mei?",
      id: "Di mana Xiao Mei?",
      options: [
        { en: "At the door", id: "Di pintu" },
        { en: "On the road", id: "Di jalan" },
        { en: "At home", id: "Di rumah" },
      ],
      answer: 0,
    },
  },
  l21: {
    unit: 4,
    art: "morning",
    title: { en: "Morning", id: "Pagi hari" },
    place: { en: "Bedroom", id: "Kamar" },
    lines: [
      { who: "A", name: "小美", h: "你早！你穿什么？", p: "Nǐ zǎo! Nǐ chuān shénme?", en: "Morning! What are you wearing?", id: "Pagi! Kamu memakai apa?" },
      { who: "B", name: "小明", h: "我穿花衣服。", p: "Wǒ chuān huā yīfu.", en: "I'm wearing a floral shirt.", id: "Saya memakai baju bunga." },
      { who: "A", name: "小美", h: "你身上是什么？", p: "Nǐ shēnshang shì shénme?", en: "What's that on you?", id: "Apa itu di badanmu?" },
      { who: "B", name: "小明", h: "是花。", p: "Shì huā.", en: "It's a flower.", id: "Itu bunga." },
    ],
    question: {
      en: "What is Xiao Ming wearing?",
      id: "Apa yang dipakai Xiao Ming?",
      options: [
        { en: "A floral shirt", id: "Baju bunga" },
        { en: "A red shirt", id: "Baju merah" },
        { en: "A hat", id: "Topi" },
      ],
      answer: 0,
    },
  },
  l22: {
    unit: 4,
    art: "evening",
    title: { en: "Evening at home", id: "Malam di rumah" },
    place: { en: "Living room", id: "Ruang tamu" },
    lines: [
      { who: "A", name: "小明", h: "晚上好！你妈妈在吗？", p: "Wǎnshang hǎo! Nǐ māma zài ma?", en: "Good evening! Is your mother home?", id: "Selamat malam! Ibumu di rumah?" },
      { who: "B", name: "小美", h: "不在，她学打球。", p: "Bú zài, tā xué dǎ qiú.", en: "No, she's learning to play ball.", id: "Tidak, dia belajar main bola." },
      { who: "A", name: "小明", h: "难吗？", p: "Nán ma?", en: "Is it hard?", id: "Sulit?" },
      { who: "B", name: "小美", h: "不难。", p: "Bù nán.", en: "Not hard.", id: "Tidak sulit." },
    ],
    question: {
      en: "What is Xiao Mei's mother doing?",
      id: "Apa yang dilakukan ibu Xiao Mei?",
      options: [
        { en: "Learning to play ball", id: "Belajar main bola" },
        { en: "Working", id: "Bekerja" },
        { en: "Sleeping", id: "Tidur" },
      ],
      answer: 0,
    },
  },
  l23: {
    unit: 4,
    art: "run",
    title: { en: "To the hospital", id: "Ke rumah sakit" },
    place: { en: "Street", id: "Jalan" },
    lines: [
      { who: "A", name: "小美", h: "先生，您去哪儿？", p: "Xiānsheng, nín qù nǎr?", en: "Sir, where are you going?", id: "Tuan, Anda mau ke mana?" },
      { who: "B", name: "小明", h: "我去医院。", p: "Wǒ qù yīyuàn.", en: "I'm going to the hospital.", id: "Saya ke rumah sakit." },
      { who: "A", name: "小美", h: "医院远吗？", p: "Yīyuàn yuǎn ma?", en: "Is the hospital far?", id: "Rumah sakitnya jauh?" },
      { who: "B", name: "小明", h: "不远，我跑回家。", p: "Bù yuǎn, wǒ pǎo huí jiā.", en: "Not far, I'll run home.", id: "Tidak jauh, saya lari pulang." },
    ],
    question: {
      en: "Where is Xiao Ming going?",
      id: "Ke mana Xiao Ming pergi?",
      options: [
        { en: "To the hospital", id: "Ke rumah sakit" },
        { en: "Home", id: "Ke rumah" },
        { en: "To school", id: "Ke sekolah" },
      ],
      answer: 0,
    },
  },
  l24: {
    unit: 4,
    art: "family",
    title: { en: "My son", id: "Anakku" },
    place: { en: "Home", id: "Rumah" },
    lines: [
      { who: "A", name: "小明", h: "你儿子几岁？", p: "Nǐ érzi jǐ suì?", en: "How old is your son?", id: "Berapa usia anakmu?" },
      { who: "B", name: "小美", h: "他两岁。", p: "Tā liǎng suì.", en: "He is two.", id: "Dia dua tahun." },
      { who: "A", name: "小明", h: "他记得那首歌吗？", p: "Tā jìde nà shǒu gē ma?", en: "Does he remember that song?", id: "Dia ingat lagu itu?" },
      { who: "B", name: "小美", h: "记得，他明白。", p: "Jìde, tā míngbai.", en: "Yes, he understands.", id: "Ingat, dia mengerti." },
    ],
    question: {
      en: "How old is Xiao Mei's son?",
      id: "Berapa usia anak Xiao Mei?",
      options: [
        { en: "Two years old", id: "Dua tahun" },
        { en: "Three years old", id: "Tiga tahun" },
        { en: "Eight years old", id: "Delapan tahun" },
      ],
      answer: 0,
    },
  },
  l25: {
    unit: 4,
    art: "lobby",
    title: { en: "On the second floor", id: "Di lantai dua" },
    place: { en: "Building lobby", id: "Lobi gedung" },
    lines: [
      { who: "A", name: "小美", h: "下午你出去吗？", p: "Xiàwǔ nǐ chūqù ma?", en: "Are you going out this afternoon?", id: "Sore ini kamu keluar?" },
      { who: "B", name: "小明", h: "是，我在二楼。", p: "Shì, wǒ zài èr lóu.", en: "Yes, I'm on the second floor.", id: "Ya, saya di lantai dua." },
      { who: "A", name: "小美", h: "你的包在哪里？", p: "Nǐ de bāo zài nǎlǐ?", en: "Where is your bag?", id: "Di mana tasmu?" },
      { who: "B", name: "小明", h: "在那里。", p: "Zài nàlǐ.", en: "Over there.", id: "Di sana." },
    ],
    question: {
      en: "Where is Xiao Ming's bag?",
      id: "Di mana tas Xiao Ming?",
      options: [
        { en: "Over there", id: "Di sana" },
        { en: "Here", id: "Di sini" },
        { en: "At home", id: "Di rumah" },
      ],
      answer: 0,
    },
  },
  l26: {
    unit: 5,
    art: "campus",
    title: { en: "On campus", id: "Di kampus" },
    place: { en: "University", id: "Universitas" },
    lines: [
      { who: "A", name: "小美", h: "你在大学学习吗？", p: "Nǐ zài dàxué xuéxí ma?", en: "Do you study at university?", id: "Kamu kuliah di universitas?" },
      { who: "B", name: "小明", h: "是，我学习。", p: "Shì, wǒ xuéxí.", en: "Yes, I study.", id: "Ya, saya belajar." },
      { who: "A", name: "小美", h: "你今年忙吗？", p: "Nǐ jīnnián máng ma?", en: "Are you busy this year?", id: "Tahun ini sibuk?" },
      { who: "B", name: "小明", h: "很忙。我马上回去。", p: "Hěn máng. Wǒ mǎshàng huíqù.", en: "Very busy. I'm going back right away.", id: "Sangat sibuk. Saya segera kembali." },
    ],
    question: {
      en: "Where does Xiao Ming study?",
      id: "Di mana Xiao Ming belajar?",
      options: [
        { en: "At university", id: "Di universitas" },
        { en: "At school", id: "Di sekolah" },
        { en: "At home", id: "Di rumah" },
      ],
      answer: 0,
    },
  },
  l27: {
    unit: 5,
    art: "family2",
    title: { en: "At home", id: "Di rumah" },
    place: { en: "Living room", id: "Ruang tamu" },
    lines: [
      { who: "A", name: "小明", h: "你爸爸在家吗？", p: "Nǐ bàba zài jiā ma?", en: "Is your father home?", id: "Ayahmu di rumah?" },
      { who: "B", name: "小美", h: "在，他和女儿说话。", p: "Zài, tā hé nǚ'ér shuōhuà.", en: "Yes, he's talking with his daughter.", id: "Ya, dia berbicara dengan putrinya." },
      { who: "A", name: "小明", h: "你看见汽车了吗？", p: "Nǐ kànjiàn qìchē le ma?", en: "Did you see the car?", id: "Kamu melihat mobilnya?" },
      { who: "B", name: "小美", h: "看见了，是白色的。", p: "Kànjiàn le, shì báisè de.", en: "Yes, it's white.", id: "Ya, warnanya putih." },
    ],
    question: {
      en: "What colour is the car?",
      id: "Apa warna mobilnya?",
      options: [
        { en: "White", id: "Putih" },
        { en: "Black", id: "Hitam" },
        { en: "Red", id: "Merah" },
      ],
      answer: 0,
    },
  },
  l28: {
    unit: 5,
    art: "bedroom",
    title: { en: "Ticket and sleep", id: "Tiket dan tidur" },
    place: { en: "Bedroom", id: "Kamar" },
    lines: [
      { who: "A", name: "小美", h: "你去年去哪里？", p: "Nǐ qùnián qù nǎlǐ?", en: "Where did you go last year?", id: "Tahun lalu kamu ke mana?" },
      { who: "B", name: "小明", h: "我去中国。", p: "Wǒ qù Zhōngguó.", en: "I went to China.", id: "Saya ke Tiongkok." },
      { who: "A", name: "小美", h: "你买票了吗？", p: "Nǐ mǎi piào le ma?", en: "Did you buy a ticket?", id: "Kamu beli tiket?" },
      { who: "B", name: "小明", h: "买了。我回到家里睡觉。", p: "Mǎi le. Wǒ huídào jiālǐ shuìjiào.", en: "Yes. I went home and slept.", id: "Sudah. Saya pulang ke rumah dan tidur." },
    ],
    question: {
      en: "Where is Xiao Ming now?",
      id: "Di mana Xiao Ming sekarang?",
      options: [
        { en: "At home", id: "Di rumah" },
        { en: "In China", id: "Di Tiongkok" },
        { en: "At the station", id: "Di stasiun" },
      ],
      answer: 0,
    },
  },
  l29: {
    unit: 5,
    art: "mountain",
    title: { en: "The serious teacher", id: "Guru yang serius" },
    place: { en: "School yard", id: "Halaman sekolah" },
    lines: [
      { who: "A", name: "小明", h: "老师教什么？", p: "Lǎoshī jiāo shénme?", en: "What does the teacher teach?", id: "Guru mengajar apa?" },
      { who: "B", name: "小美", h: "他教我们。", p: "Tā jiāo wǒmen.", en: "He teaches us.", id: "Dia mengajar kami." },
      { who: "A", name: "小明", h: "你认真吗？", p: "Nǐ rènzhēn ma?", en: "Are you serious about it?", id: "Kamu serius?" },
      { who: "B", name: "小美", h: "认真，我不忘。", p: "Rènzhēn, wǒ bú wàng.", en: "Yes, I don't forget.", id: "Serius, saya tidak lupa." },
    ],
    question: {
      en: "What does the teacher do?",
      id: "Apa yang dilakukan guru?",
      options: [
        { en: "He teaches them", id: "Dia mengajar mereka" },
        { en: "He studies", id: "Dia belajar" },
        { en: "He works in a hospital", id: "Dia bekerja di rumah sakit" },
      ],
      answer: 0,
    },
  },
  l30: {
    unit: 5,
    art: "ward",
    title: { en: "At the hospital", id: "Di rumah sakit" },
    place: { en: "Hospital room", id: "Kamar rumah sakit" },
    lines: [
      { who: "A", name: "小美", h: "病人好吗？", p: "Bìngrén hǎo ma?", en: "Is the patient okay?", id: "Apakah pasien baik?" },
      { who: "B", name: "小明", h: "他很累。", p: "Tā hěn lèi.", en: "He is very tired.", id: "Dia sangat lelah." },
      { who: "A", name: "小美", h: "打开门吧，有风。", p: "Dǎkāi mén ba, yǒu fēng.", en: "Open the door, there's a breeze.", id: "Buka pintunya, ada angin." },
      { who: "B", name: "小明", h: "好，我回去。", p: "Hǎo, wǒ huíqù.", en: "Okay, I'm going back.", id: "Baik, saya kembali." },
    ],
    question: {
      en: "How is the patient?",
      id: "Bagaimana kondisi pasien?",
      options: [
        { en: "Very tired", id: "Sangat lelah" },
        { en: "Hungry", id: "Lapar" },
        { en: "Happy", id: "Senang" },
      ],
      answer: 0,
    },
  },
  "h2-01": {
    unit: 0,
    art: "meeting",
    title: { en: "A new plan", id: "Rencana baru" },
    place: { en: "Office", id: "Kantor" },
    lines: [
      { who: "A", name: "小美", h: "你今天在公司吗？", p: "Nǐ jīntiān zài gōngsī ma?", en: "Are you at the office today?", id: "Kamu di kantor hari ini?" },
      { who: "B", name: "小明", h: "在。我有一个新计划。", p: "Zài. Wǒ yǒu yí gè xīn jìhuà.", en: "Yes. I have a new plan.", id: "Ya. Saya punya rencana baru." },
      { who: "A", name: "小美", h: "什么问题？", p: "Shénme wèntí?", en: "What's the problem?", id: "Masalahnya apa?" },
      { who: "B", name: "小明", h: "我需要帮助。", p: "Wǒ xūyào bāngzhù.", en: "I need help.", id: "Saya butuh bantuan." },
    ],
    question: {
      en: "What does Xiao Ming need?",
      id: "Apa yang dibutuhkan Xiao Ming?",
      options: [
        { en: "Help", id: "Bantuan" },
        { en: "Money", id: "Uang" },
        { en: "A new phone", id: "Telepon baru" },
      ],
      answer: 0,
    },
  },
  "h2-02": {
    unit: 0,
    art: "grocery",
    title: { en: "At the shop", id: "Di toko" },
    place: { en: "Shop", id: "Toko" },
    lines: [
      { who: "A", name: "小明", h: "这个店的服务好吗？", p: "Zhège diàn de fúwù hǎo ma?", en: "Is the service at this shop good?", id: "Pelayanan toko ini bagus?" },
      { who: "B", name: "小美", h: "很好。你要买什么？", p: "Hěn hǎo. Nǐ yào mǎi shénme?", en: "Very good. What do you want to buy?", id: "Sangat bagus. Kamu mau beli apa?" },
      { who: "A", name: "小明", h: "我要米和药。", p: "Wǒ yào mǐ hé yào.", en: "I want rice and medicine.", id: "Saya mau beras dan obat." },
      { who: "B", name: "小美", h: "好，一共三块。", p: "Hǎo, yígòng sān kuài.", en: "Okay, three yuan in total.", id: "Baik, totalnya tiga yuan." },
    ],
    question: {
      en: "What does Xiao Ming buy?",
      id: "Apa yang dibeli Xiao Ming?",
      options: [
        { en: "Rice and medicine", id: "Beras dan obat" },
        { en: "Noodles and wine", id: "Mi dan anggur" },
        { en: "Tea and water", id: "Teh dan air" },
      ],
      answer: 0,
    },
  },
  "h2-03": {
    unit: 0,
    art: "living2",
    title: { en: "Family photos", id: "Foto keluarga" },
    place: { en: "Living room", id: "Ruang tamu" },
    lines: [
      { who: "A", name: "小美", h: "这是你的家庭照片吗？", p: "Zhè shì nǐ de jiātíng zhàopiàn ma?", en: "Is this your family photo?", id: "Ini foto keluargamu?" },
      { who: "B", name: "小明", h: "是，这是我妈妈。", p: "Shì, zhè shì wǒ māma.", en: "Yes, this is my mother.", id: "Ya, ini ibuku." },
      { who: "A", name: "小美", h: "她在听音乐吗？", p: "Tā zài tīng yīnyuè ma?", en: "Is she listening to music?", id: "Dia sedang mendengarkan musik?" },
      { who: "B", name: "小明", h: "是，她喜欢音乐。", p: "Shì, tā xǐhuan yīnyuè.", en: "Yes, she likes music.", id: "Ya, dia suka musik." },
    ],
    question: {
      en: "What is Xiao Ming's mother doing?",
      id: "Apa yang dilakukan ibu Xiao Ming?",
      options: [
        { en: "Listening to music", id: "Mendengarkan musik" },
        { en: "Cooking", id: "Memasak" },
        { en: "Reading", id: "Membaca" },
      ],
      answer: 0,
    },
  },
  "h2-04": {
    unit: 0,
    art: "park",
    title: { en: "Happy tears", id: "Air mata bahagia" },
    place: { en: "Park", id: "Taman" },
    lines: [
      { who: "A", name: "小明", h: "你开心吗？", p: "Nǐ kāixīn ma?", en: "Are you happy?", id: "Kamu senang?" },
      { who: "B", name: "小美", h: "很开心！我很快乐。", p: "Hěn kāixīn! Wǒ hěn kuàilè.", en: "Very happy! I'm very happy.", id: "Sangat senang! Saya sangat bahagia." },
      { who: "A", name: "小明", h: "你为什么哭？", p: "Nǐ wèishénme kū?", en: "Why are you crying?", id: "Kenapa kamu menangis?" },
      { who: "B", name: "小美", h: "我太高兴了。", p: "Wǒ tài gāoxìng le.", en: "I'm just too happy.", id: "Saya terlalu senang." },
    ],
    question: {
      en: "How does Xiao Mei feel?",
      id: "Bagaimana perasaan Xiao Mei?",
      options: [
        { en: "Very happy", id: "Sangat senang" },
        { en: "Sad", id: "Sedih" },
        { en: "Tired", id: "Lelah" },
      ],
      answer: 0,
    },
  },
  "h2-05": {
    unit: 0,
    art: "road",
    title: { en: "By the road", id: "Di pinggir jalan" },
    place: { en: "Street", id: "Jalan" },
    lines: [
      { who: "A", name: "小美", h: "你看见我的电话了吗？", p: "Nǐ kànjiàn wǒ de diànhuà le ma?", en: "Did you see my phone?", id: "Kamu lihat teleponku?" },
      { who: "B", name: "小明", h: "没有。你放在哪里？", p: "Méiyǒu. Nǐ fàng zài nǎlǐ?", en: "No. Where did you put it?", id: "Tidak. Kamu taruh di mana?" },
      { who: "A", name: "小美", h: "我放在道边。", p: "Wǒ fàng zài dàobiān.", en: "I put it by the road.", id: "Saya taruh di pinggir jalan." },
      { who: "B", name: "小明", h: "在那里！我看到了。", p: "Zài nàlǐ! Wǒ kàndào le.", en: "There it is! I see it.", id: "Di sana! Saya lihat." },
    ],
    question: {
      en: "Where is the phone?",
      id: "Di mana teleponnya?",
      options: [
        { en: "By the road", id: "Di pinggir jalan" },
        { en: "At home", id: "Di rumah" },
        { en: "In the shop", id: "Di toko" },
      ],
      answer: 0,
    },
  },
  "h2-06": {
    unit: 1,
    art: "office2",
    title: { en: "Going alone", id: "Pergi sendiri" },
    place: { en: "Office", id: "Kantor" },
    lines: [
      { who: "A", name: "小美", h: "我可以自己去吗？", p: "Wǒ kěyǐ zìjǐ qù ma?", en: "Can I go by myself?", id: "Boleh saya pergi sendiri?" },
      { who: "B", name: "小明", h: "可以，但你得小心。", p: "Kěyǐ, dàn nǐ děi xiǎoxīn.", en: "Yes, but you have to be careful.", id: "Boleh, tapi kamu harus hati-hati." },
      { who: "A", name: "小美", h: "如果晚了怎么办？", p: "Rúguǒ wǎn le zěnme bàn?", en: "What if it gets late?", id: "Kalau terlambat bagaimana?" },
      { who: "B", name: "小明", h: "那你该打电话。", p: "Nà nǐ gāi dǎ diànhuà.", en: "Then you should call.", id: "Kalau begitu kamu harus menelepon." },
    ],
    question: {
      en: "What should Xiao Mei do if it gets late?",
      id: "Apa yang harus dilakukan Xiao Mei jika terlambat?",
      options: [
        { en: "Call", id: "Menelepon" },
        { en: "Go home", id: "Pulang" },
        { en: "Wait", id: "Menunggu" },
      ],
      answer: 0,
    },
  },
  "h2-07": {
    unit: 1,
    art: "water",
    title: { en: "What to bring", id: "Apa yang dibawa" },
    place: { en: "Shop", id: "Toko" },
    lines: [
      { who: "A", name: "小明", h: "你认为我们该带什么？", p: "Nǐ rènwéi wǒmen gāi dài shénme?", en: "What do you think we should bring?", id: "Menurutmu kita harus bawa apa?" },
      { who: "B", name: "小美", h: "应该带水。", p: "Yīnggāi dài shuǐ.", en: "We should bring water.", id: "Sebaiknya bawa air." },
      { who: "A", name: "小明", h: "大家都有吗？", p: "Dàjiā dōu yǒu ma?", en: "Does everyone have some?", id: "Semua orang punya?" },
      { who: "B", name: "小美", h: "所有人都有。", p: "Suǒyǒu rén dōu yǒu.", en: "Everyone has some.", id: "Semua orang punya." },
    ],
    question: {
      en: "What should they bring?",
      id: "Apa yang harus mereka bawa?",
      options: [
        { en: "Water", id: "Air" },
        { en: "Books", id: "Buku" },
        { en: "Money", id: "Uang" },
      ],
      answer: 0,
    },
  },
  "h2-08": {
    unit: 1,
    art: "cafe2",
    title: { en: "After a week", id: "Setelah seminggu" },
    place: { en: "Café", id: "Kafe" },
    lines: [
      { who: "A", name: "小美", h: "见到你很高兴！", p: "Jiàndào nǐ hěn gāoxìng!", en: "Great to see you!", id: "Senang bertemu kamu!" },
      { who: "B", name: "小明", h: "过去一周怎么样？", p: "Guòqù yì zhōu zěnmeyàng?", en: "How was the past week?", id: "Seminggu terakhir bagaimana?" },
      { who: "A", name: "小美", h: "工作完了。", p: "Gōngzuò wán le.", en: "The work is finished.", id: "Pekerjaannya selesai." },
      { who: "B", name: "小明", h: "结果不错！", p: "Jiéguǒ búcuò!", en: "The result is good!", id: "Hasilnya bagus!" },
    ],
    question: {
      en: "How was the result?",
      id: "Bagaimana hasilnya?",
      options: [
        { en: "Good", id: "Bagus" },
        { en: "Bad", id: "Buruk" },
        { en: "Not finished", id: "Belum selesai" },
      ],
      answer: 0,
    },
  },
  "h2-09": {
    unit: 1,
    art: "letter",
    title: { en: "The letter", id: "Surat" },
    place: { en: "Living room", id: "Ruang tamu" },
    lines: [
      { who: "A", name: "小明", h: "你收到信了吗？", p: "Nǐ shōudào xìn le ma?", en: "Did you receive the letter?", id: "Kamu sudah menerima suratnya?" },
      { who: "B", name: "小美", h: "收到了，可是没看。", p: "Shōudào le, kěshì méi kàn.", en: "Yes, but I haven't read it.", id: "Sudah, tapi belum kubaca." },
      { who: "A", name: "小明", h: "为什么？", p: "Wèishénme?", en: "Why?", id: "Kenapa?" },
      { who: "B", name: "小美", h: "人们的要求不同。", p: "Rénmen de yāoqiú bùtóng.", en: "People's requests are different.", id: "Permintaan orang berbeda-beda." },
    ],
    question: {
      en: "Why hasn't Xiao Mei read the letter?",
      id: "Kenapa Xiao Mei belum membaca suratnya?",
      options: [
        { en: "People's requests differ", id: "Permintaan orang berbeda" },
        { en: "She is busy", id: "Dia sibuk" },
        { en: "She lost it", id: "Dia kehilangannya" },
      ],
      answer: 0,
    },
  },
  "h2-10": {
    unit: 1,
    art: "teamwork",
    title: { en: "Hard but together", id: "Sulit tapi bersama" },
    place: { en: "Park", id: "Taman" },
    lines: [
      { who: "A", name: "小美", h: "你能帮我吗？", p: "Nǐ néng bāng wǒ ma?", en: "Can you help me?", id: "Kamu bisa bantu saya?" },
      { who: "B", name: "小明", h: "可以，我试试。", p: "Kěyǐ, wǒ shìshi.", en: "Sure, I'll try.", id: "Boleh, saya coba." },
      { who: "A", name: "小美", h: "这个特别难。", p: "Zhège tèbié nán.", en: "This one is especially hard.", id: "Ini sangat sulit." },
      { who: "B", name: "小明", h: "我们一起努力。", p: "Wǒmen yìqǐ nǔlì.", en: "Let's work hard together.", id: "Kita berusaha bersama." },
    ],
    question: {
      en: "What will they do?",
      id: "Apa yang akan mereka lakukan?",
      options: [
        { en: "Work hard together", id: "Berusaha bersama" },
        { en: "Give up", id: "Menyerah" },
        { en: "Go home", id: "Pulang" },
      ],
      answer: 0,
    },
  },
  "h2-11": {
    unit: 2,
    art: "mind",
    title: { en: "Changed my mind", id: "Berubah pikiran" },
    place: { en: "Office", id: "Kantor" },
    lines: [
      { who: "A", name: "小明", h: "我以为你不来了。", p: "Wǒ yǐwéi nǐ bù lái le.", en: "I thought you weren't coming.", id: "Kupikir kamu tidak datang." },
      { who: "B", name: "小美", h: "我改变主意了。", p: "Wǒ gǎibiàn zhǔyì le.", en: "I changed my mind.", id: "Saya berubah pikiran." },
      { who: "A", name: "小明", h: "这个活动直接影响大家。", p: "Zhège huódòng zhíjiē yǐngxiǎng dàjiā.", en: "This event directly affects everyone.", id: "Acara ini langsung memengaruhi semua." },
      { who: "B", name: "小美", h: "我们组有办法。", p: "Wǒmen zǔ yǒu bànfǎ.", en: "Our group has a way.", id: "Kelompok kami punya cara." },
    ],
    question: {
      en: "What changed?",
      id: "Apa yang berubah?",
      options: [
        { en: "Xiao Mei's mind", id: "Pikiran Xiao Mei" },
        { en: "The office", id: "Kantor" },
        { en: "The plan", id: "Rencana" },
      ],
      answer: 0,
    },
  },
  "h2-12": {
    unit: 2,
    art: "centre",
    title: { en: "The activity centre", id: "Pusat kegiatan" },
    place: { en: "Building lobby", id: "Lobi gedung" },
    lines: [
      { who: "A", name: "小美", h: "这个信息来自哪里？", p: "Zhège xìnxī láizì nǎlǐ?", en: "Where does this information come from?", id: "Informasi ini dari mana?" },
      { who: "B", name: "小明", h: "来自活动中心。", p: "Láizì huódòng zhōngxīn.", en: "From the activity centre.", id: "Dari pusat kegiatan." },
      { who: "A", name: "小美", h: "卡住了吗？", p: "Kǎ zhù le ma?", en: "Is it stuck?", id: "Macet?" },
      { who: "B", name: "小明", h: "是，你能带来检查吗？", p: "Shì, nǐ néng dàilái jiǎnchá ma?", en: "Yes, can you bring it to check?", id: "Ya, bisa kamu bawa untuk diperiksa?" },
    ],
    question: {
      en: "Where is the information from?",
      id: "Dari mana informasinya?",
      options: [
        { en: "The activity centre", id: "Pusat kegiatan" },
        { en: "The bank", id: "Bank" },
        { en: "The shop", id: "Toko" },
      ],
      answer: 0,
    },
  },
  "h2-13": {
    unit: 2,
    art: "comeover",
    title: { en: "Come over for a while", id: "Datang sebentar" },
    place: { en: "Classroom", id: "Ruang kelas" },
    lines: [
      { who: "A", name: "小明", h: "你愿意过来吗？", p: "Nǐ yuànyì guòlái ma?", en: "Are you willing to come over?", id: "Kamu mau datang?" },
      { who: "B", name: "小美", h: "可以，我留一会儿。", p: "Kěyǐ, wǒ liú yíhuìr.", en: "Sure, I'll stay a while.", id: "Boleh, saya tinggal sebentar." },
      { who: "A", name: "小明", h: "这很正常。", p: "Zhè hěn zhèngcháng.", en: "That's very normal.", id: "Itu sangat normal." },
      { who: "B", name: "小美", h: "好像挺简单。", p: "Hǎoxiàng tǐng jiǎndān.", en: "Seems quite simple.", id: "Sepertinya cukup mudah." },
    ],
    question: {
      en: "Is Xiao Mei coming?",
      id: "Apakah Xiao Mei mau datang?",
      options: [
        { en: "Yes, for a while", id: "Ya, sebentar" },
        { en: "No", id: "Tidak" },
        { en: "Only tomorrow", id: "Besok saja" },
      ],
      answer: 0,
    },
  },
  "h2-14": {
    unit: 2,
    art: "news",
    title: { en: "The news", id: "Berita" },
    place: { en: "Living room", id: "Ruang tamu" },
    lines: [
      { who: "A", name: "小明", h: "欢迎！你看新闻了吗？", p: "Huānyíng! Nǐ kàn xīnwén le ma?", en: "Welcome! Did you watch the news?", id: "Selamat datang! Kamu lihat berita?" },
      { who: "B", name: "小美", h: "看到了，很清楚。", p: "Kàndào le, hěn qīngchu.", en: "Yes, very clearly.", id: "Sudah, sangat jelas." },
      { who: "A", name: "小明", h: "你眼睛怎么了？", p: "Nǐ yǎnjing zěnme le?", en: "What's wrong with your eyes?", id: "Matamu kenapa?" },
      { who: "B", name: "小美", h: "有点累，一般没事。", p: "Yǒudiǎn lèi, yìbān méi shì.", en: "A bit tired, usually nothing serious.", id: "Sedikit lelah, biasanya tidak apa-apa." },
    ],
    question: {
      en: "What did Xiao Mei watch?",
      id: "Apa yang ditonton Xiao Mei?",
      options: [
        { en: "The news", id: "Berita" },
        { en: "A movie", id: "Film" },
        { en: "A match", id: "Pertandingan" },
      ],
      answer: 0,
    },
  },
  "h2-15": {
    unit: 2,
    art: "teacher2",
    title: { en: "Becoming a teacher", id: "Menjadi guru" },
    place: { en: "Campus", id: "Kampus" },
    lines: [
      { who: "A", name: "小美", h: "你怕吗？", p: "Nǐ pà ma?", en: "Are you afraid?", id: "Kamu takut?" },
      { who: "B", name: "小明", h: "不怕，我做到了。", p: "Bú pà, wǒ zuòdào le.", en: "No, I did it.", id: "Tidak, saya berhasil." },
      { who: "A", name: "小美", h: "经过努力，你变成老师了。", p: "Jīngguò nǔlì, nǐ biànchéng lǎoshī le.", en: "Through hard work, you became a teacher.", id: "Berkat usaha, kamu menjadi guru." },
      { who: "B", name: "小明", h: "谢谢！我只能努力。", p: "Xièxie! Wǒ zhǐ néng nǔlì.", en: "Thanks! I could only work hard.", id: "Terima kasih! Saya hanya bisa berusaha." },
    ],
    question: {
      en: "What did Xiao Ming achieve?",
      id: "Apa yang dicapai Xiao Ming?",
      options: [
        { en: "Became a teacher", id: "Menjadi guru" },
        { en: "Bought a school", id: "Membeli sekolah" },
        { en: "Passed an exam", id: "Lulus ujian" },
      ],
      answer: 0,
    },
  },
  "h2-16": {
    unit: 3,
    art: "health",
    title: { en: "The health programme", id: "Program kesehatan" },
    place: { en: "Café", id: "Kafe" },
    lines: [
      { who: "A", name: "小明", h: "这个节目说明什么？", p: "Zhège jiémù shuōmíng shénme?", en: "What does this programme explain?", id: "Program ini menjelaskan apa?" },
      { who: "B", name: "小美", h: "说明健康很重要。", p: "Shuōmíng jiànkāng hěn zhòngyào.", en: "That health is very important.", id: "Bahwa kesehatan sangat penting." },
      { who: "A", name: "小明", h: "时间很短吗？", p: "Shíjiān hěn duǎn ma?", en: "Is it short?", id: "Waktunya singkat?" },
      { who: "B", name: "小美", h: "很短，你的意见呢？", p: "Hěn duǎn, nǐ de yìjiàn ne?", en: "Very short. What's your opinion?", id: "Sangat singkat. Pendapatmu?" },
    ],
    question: {
      en: "What does the programme explain?",
      id: "Apa yang dijelaskan program itu?",
      options: [
        { en: "Health matters", id: "Kesehatan penting" },
        { en: "Money matters", id: "Uang penting" },
        { en: "Travel", id: "Perjalanan" },
      ],
      answer: 0,
    },
  },
  "h2-17": {
    unit: 3,
    art: "city",
    title: { en: "Checking the city", id: "Memeriksa kota" },
    place: { en: "Street", id: "Jalan" },
    lines: [
      { who: "A", name: "小美", h: "你查了吗？", p: "Nǐ chá le ma?", en: "Did you check?", id: "Kamu sudah cek?" },
      { who: "B", name: "小明", h: "查了，市里很热闹。", p: "Chá le, shì lǐ hěn rènao.", en: "Yes, the city is lively.", id: "Sudah, kotanya ramai." },
      { who: "A", name: "小美", h: "我们去讨论吧。", p: "Wǒmen qù tǎolùn ba.", en: "Let's go discuss it.", id: "Ayo kita diskusikan." },
      { who: "B", name: "小明", h: "好，比如现在？", p: "Hǎo, bǐrú xiànzài?", en: "Okay, like right now?", id: "Baik, seperti sekarang?" },
    ],
    question: {
      en: "What did Xiao Ming check?",
      id: "Apa yang dicek Xiao Ming?",
      options: [
        { en: "The city", id: "Kota" },
        { en: "The office", id: "Kantor" },
        { en: "The shop", id: "Toko" },
      ],
      answer: 0,
    },
  },
  "h2-18": {
    unit: 3,
    art: "young",
    title: { en: "Keep it up", id: "Semangat" },
    place: { en: "Shop", id: "Toko" },
    lines: [
      { who: "A", name: "小明", h: "加油！你年轻，有条件。", p: "Jiāyóu! Nǐ niánqīng, yǒu tiáojiàn.", en: "Go for it! You're young and have what it takes.", id: "Semangat! Kamu muda dan punya syaratnya." },
      { who: "B", name: "小美", h: "谢谢！晚安。", p: "Xièxie! Wǎn'ān.", en: "Thanks! Good night.", id: "Terima kasih! Selamat malam." },
      { who: "A", name: "小明", h: "你会画画吗？", p: "Nǐ huì huà huà ma?", en: "Can you draw?", id: "Kamu bisa menggambar?" },
      { who: "B", name: "小美", h: "会，我看了广告。", p: "Huì, wǒ kàn le guǎnggào.", en: "Yes, I saw the advert.", id: "Bisa, saya lihat iklannya." },
    ],
    question: {
      en: "What did Xiao Mei look at?",
      id: "Apa yang dilihat Xiao Mei?",
      options: [
        { en: "An advert", id: "Iklan" },
        { en: "A book", id: "Buku" },
        { en: "A photo", id: "Foto" },
      ],
      answer: 0,
    },
  },
  "h2-19": {
    unit: 3,
    art: "exercise",
    title: { en: "Exercise is right", id: "Olahraga itu benar" },
    place: { en: "Park", id: "Taman" },
    lines: [
      { who: "A", name: "小美", h: "你运动吗？", p: "Nǐ yùndòng ma?", en: "Do you exercise?", id: "Kamu olahraga?" },
      { who: "B", name: "小明", h: "运动是正确的。", p: "Yùndòng shì zhèngquè de.", en: "Exercise is the right thing.", id: "Olahraga itu benar." },
      { who: "A", name: "小美", h: "办公室远吗？", p: "Bàngōngshì yuǎn ma?", en: "Is the office far?", id: "Kantornya jauh?" },
      { who: "B", name: "小明", h: "不远，我走路去。", p: "Bù yuǎn, wǒ zǒulù qù.", en: "Not far, I walk there.", id: "Tidak jauh, saya jalan kaki." },
    ],
    question: {
      en: "How does Xiao Ming get to the office?",
      id: "Bagaimana Xiao Ming ke kantor?",
      options: [
        { en: "On foot", id: "Jalan kaki" },
        { en: "By car", id: "Naik mobil" },
        { en: "By bus", id: "Naik bus" },
      ],
      answer: 0,
    },
  },
  "h2-20": {
    unit: 3,
    art: "education",
    title: { en: "Caring about education", id: "Peduli pendidikan" },
    place: { en: "Classroom", id: "Ruang kelas" },
    lines: [
      { who: "A", name: "小明", h: "你关心教育吗？", p: "Nǐ guānxīn jiàoyù ma?", en: "Do you care about education?", id: "Kamu peduli pendidikan?" },
      { who: "B", name: "小美", h: "关心，孩子是未来。", p: "Guānxīn, háizi shì wèilái.", en: "Yes, children are the future.", id: "Peduli, anak adalah masa depan." },
      { who: "A", name: "小明", h: "留下吃饭吧。", p: "Liúxià chīfàn ba.", en: "Stay for a meal.", id: "Tinggal makan dulu." },
      { who: "B", name: "小美", h: "好，今天日子好。", p: "Hǎo, jīntiān rìzi hǎo.", en: "Okay, today is a good day.", id: "Baik, hari ini hari yang baik." },
    ],
    question: {
      en: "What does Xiao Mei care about?",
      id: "Apa yang dipedulikan Xiao Mei?",
      options: [
        { en: "Education", id: "Pendidikan" },
        { en: "Money", id: "Uang" },
        { en: "Travel", id: "Perjalanan" },
      ],
      answer: 0,
    },
  },
  "h2-21": {
    unit: 4,
    art: "shoes",
    title: { en: "Where are your shoes?", id: "Di mana sepatumu" },
    place: { en: "Shop", id: "Toko" },
    lines: [
      { who: "A", name: "小美", h: "你的鞋呢？", p: "Nǐ de xié ne?", en: "Where are your shoes?", id: "Sepatumu mana?" },
      { who: "B", name: "小明", h: "在街边。", p: "Zài jiēbiān.", en: "By the street.", id: "Di pinggir jalan." },
      { who: "A", name: "小美", h: "通知大家了吗？", p: "Tōngzhī dàjiā le ma?", en: "Did you notify everyone?", id: "Sudah memberi tahu semua?" },
      { who: "B", name: "小明", h: "通知了，腿很累。", p: "Tōngzhī le, tuǐ hěn lèi.", en: "Yes, my legs are tired.", id: "Sudah, kaki saya lelah." },
    ],
    question: {
      en: "Where are the shoes?",
      id: "Di mana sepatunya?",
      options: [
        { en: "By the street", id: "Di pinggir jalan" },
        { en: "At home", id: "Di rumah" },
        { en: "In the shop", id: "Di toko" },
      ],
      answer: 0,
    },
  },
  "h2-22": {
    unit: 4,
    art: "cooking",
    title: { en: "Cooking with science", id: "Memasak dengan sains" },
    place: { en: "Tea shop", id: "Kedai teh" },
    lines: [
      { who: "A", name: "小明", h: "听说你会做饭？", p: "Tīngshuō nǐ huì zuòfàn?", en: "I heard you can cook?", id: "Katanya kamu bisa masak?" },
      { who: "B", name: "小美", h: "会，用油和科学。", p: "Huì, yòng yóu hé kēxué.", en: "Yes, with oil and science.", id: "Bisa, pakai minyak dan sains." },
      { who: "A", name: "小明", h: "喂，心情好吗？", p: "Wèi, xīnqíng hǎo ma?", en: "Hey, how's your mood?", id: "Hei, suasana hatimu baik?" },
      { who: "B", name: "小美", h: "很好。", p: "Hěn hǎo.", en: "Very good.", id: "Sangat baik." },
    ],
    question: {
      en: "How is Xiao Mei's mood?",
      id: "Bagaimana suasana hati Xiao Mei?",
      options: [
        { en: "Good", id: "Baik" },
        { en: "Bad", id: "Buruk" },
        { en: "Tired", id: "Lelah" },
      ],
      answer: 0,
    },
  },
  "h2-23": {
    unit: 4,
    art: "pets2",
    title: { en: "Keeping chickens", id: "Memelihara ayam" },
    place: { en: "Home", id: "Rumah" },
    lines: [
      { who: "A", name: "小美", h: "你打算养鸡吗？", p: "Nǐ dǎsuàn yǎng jī ma?", en: "Do you plan to keep chickens?", id: "Kamu berencana memelihara ayam?" },
      { who: "B", name: "小明", h: "不行，房子小。", p: "Bùxíng, fángzi xiǎo.", en: "No, the house is small.", id: "Tidak, rumahnya kecil." },
      { who: "A", name: "小美", h: "那养鱼？", p: "Nà yǎng yú?", en: "Then fish?", id: "Kalau ikan?" },
      { who: "B", name: "小明", h: "好，我小心。", p: "Hǎo, wǒ xiǎoxīn.", en: "Okay, I'll be careful.", id: "Baik, saya hati-hati." },
    ],
    question: {
      en: "What will Xiao Ming keep?",
      id: "Apa yang akan dipelihara Xiao Ming?",
      options: [
        { en: "Fish", id: "Ikan" },
        { en: "Chickens", id: "Ayam" },
        { en: "A dog", id: "Anjing" },
      ],
      answer: 0,
    },
  },
  "h2-24": {
    unit: 4,
    art: "match",
    title: { en: "The match tomorrow", id: "Pertandingan besok" },
    place: { en: "Lobby", id: "Lobi" },
    lines: [
      { who: "A", name: "小明", h: "明天举行比赛。", p: "Míngtiān jǔxíng bǐsài.", en: "There's a match tomorrow.", id: "Besok ada pertandingan." },
      { who: "B", name: "小美", h: "你有想法吗？", p: "Nǐ yǒu xiǎngfǎ ma?", en: "Do you have an idea?", id: "Kamu punya ide?" },
      { who: "A", name: "小明", h: "有，借我网。", p: "Yǒu, jiè wǒ wǎng.", en: "Yes, lend me the net.", id: "Ada, pinjam jaringnya." },
      { who: "B", name: "小美", h: "顺利！", p: "Shùnlì!", en: "Good luck!", id: "Semoga lancar!" },
    ],
    question: {
      en: "What is happening tomorrow?",
      id: "Apa yang diadakan besok?",
      options: [
        { en: "A match", id: "Pertandingan" },
        { en: "A class", id: "Kelas" },
        { en: "A meeting", id: "Rapat" },
      ],
      answer: 0,
    },
  },
  "h2-25": {
    unit: 4,
    art: "grow",
    title: { en: "When I grow up", id: "Saat besar nanti" },
    place: { en: "Campus", id: "Kampus" },
    lines: [
      { who: "A", name: "小美", h: "你长大了想做什么？", p: "Nǐ zhǎngdà le xiǎng zuò shénme?", en: "What do you want to do when you grow up?", id: "Kalau besar mau jadi apa?" },
      { who: "B", name: "小明", h: "学科学。", p: "Xué kēxué.", en: "Study science.", id: "Belajar sains." },
      { who: "A", name: "小美", h: "头发真好看。", p: "Tóufa zhēn hǎokàn.", en: "Your hair looks nice.", id: "Rambutmu bagus." },
      { who: "B", name: "小明", h: "谢谢，我取得了成绩。", p: "Xièxie, wǒ qǔdé le chéngjì.", en: "Thanks, I got good results.", id: "Terima kasih, saya dapat hasil bagus." },
    ],
    question: {
      en: "What does Xiao Ming want to study?",
      id: "Apa yang ingin dipelajari Xiao Ming?",
      options: [
        { en: "Science", id: "Sains" },
        { en: "Music", id: "Musik" },
        { en: "Art", id: "Seni" },
      ],
      answer: 0,
    },
  },
  "h2-26": {
    unit: 5,
    art: "care",
    title: { en: "Taking care of her", id: "Merawatnya" },
    place: { en: "Living room", id: "Ruang tamu" },
    lines: [
      { who: "A", name: "小明", h: "你想起她了吗？", p: "Nǐ xiǎngqǐ tā le ma?", en: "Did you think of her?", id: "Kamu teringat dia?" },
      { who: "B", name: "小美", h: "想起了，我照顾她一生。", p: "Xiǎngqǐ le, wǒ zhàogù tā yìshēng.", en: "Yes, I cared for her all my life.", id: "Teringat, saya merawatnya seumur hidup." },
      { who: "A", name: "小明", h: "你急什么？", p: "Nǐ jí shénme?", en: "What's the hurry?", id: "Kenapa buru-buru?" },
      { who: "B", name: "小美", h: "她疼。", p: "Tā téng.", en: "She's in pain.", id: "Dia sakit." },
    ],
    question: {
      en: "Who is in pain?",
      id: "Siapa yang kesakitan?",
      options: [
        { en: "Her", id: "Dia (perempuan)" },
        { en: "Xiao Ming", id: "Xiao Ming" },
        { en: "The doctor", id: "Dokter" },
      ],
      answer: 0,
    },
  },
  "h2-27": {
    unit: 5,
    art: "gift",
    title: { en: "The gift at the hotel", id: "Hadiah di hotel" },
    place: { en: "Airport", id: "Bandara" },
    lines: [
      { who: "A", name: "小美", h: "礼物在酒店吗？", p: "Lǐwù zài jiǔdiàn ma?", en: "Is the gift at the hotel?", id: "Hadiahnya di hotel?" },
      { who: "B", name: "小明", h: "在，交通方便。", p: "Zài, jiāotōng fāngbiàn.", en: "Yes, transport is convenient.", id: "Ya, transportasinya mudah." },
      { who: "A", name: "小美", h: "几点出发？", p: "Jǐ diǎn chūfā?", en: "What time do we leave?", id: "Jam berapa berangkat?" },
      { who: "B", name: "小明", h: "八点，到了接我。", p: "Bā diǎn, dào le jiē wǒ.", en: "Eight, pick me up when you arrive.", id: "Jam delapan, jemput saya saat tiba." },
    ],
    question: {
      en: "Where is the gift?",
      id: "Di mana hadiahnya?",
      options: [
        { en: "At the hotel", id: "Di hotel" },
        { en: "At home", id: "Di rumah" },
        { en: "At the airport", id: "Di bandara" },
      ],
      answer: 0,
    },
  },
  "h2-28": {
    unit: 5,
    art: "manager",
    title: { en: "The manager is pleased", id: "Manajer puas" },
    place: { en: "Office", id: "Kantor" },
    lines: [
      { who: "A", name: "小明", h: "经理满意吗？", p: "Jīnglǐ mǎnyì ma?", en: "Is the manager satisfied?", id: "Manajernya puas?" },
      { who: "B", name: "小美", h: "满意，成绩提高了。", p: "Mǎnyì, chéngjì tígāo le.", en: "Yes, results improved.", id: "Puas, hasilnya meningkat." },
      { who: "A", name: "小明", h: "墙亮吗？", p: "Qiáng liàng ma?", en: "Is the wall bright?", id: "Dindingnya terang?" },
      { who: "B", name: "小美", h: "很亮。", p: "Hěn liàng.", en: "Very bright.", id: "Sangat terang." },
    ],
    question: {
      en: "How does the manager feel?",
      id: "Bagaimana perasaan manajer?",
      options: [
        { en: "Satisfied", id: "Puas" },
        { en: "Angry", id: "Marah" },
        { en: "Tired", id: "Lelah" },
      ],
      answer: 0,
    },
  },
  "h2-29": {
    unit: 5,
    art: "website",
    title: { en: "A good website", id: "Situs yang bagus" },
    place: { en: "Living room", id: "Ruang tamu" },
    lines: [
      { who: "A", name: "小美", h: "这个网站好吗？", p: "Zhège wǎngzhàn hǎo ma?", en: "Is this website good?", id: "Situs ini bagus?" },
      { who: "B", name: "小明", h: "好，颜色漂亮。", p: "Hǎo, yánsè piàoliang.", en: "Yes, the colours are nice.", id: "Bagus, warnanya cantik." },
      { who: "A", name: "小美", h: "多么方便！", p: "Duōme fāngbiàn!", en: "How convenient!", id: "Betapa praktisnya!" },
      { who: "B", name: "小明", h: "是的，实际很好。", p: "Shì de, shíjì hěn hǎo.", en: "Yes, in practice it's very good.", id: "Ya, praktiknya bagus." },
    ],
    question: {
      en: "How is the website?",
      id: "Bagaimana situsnya?",
      options: [
        { en: "Good and convenient", id: "Bagus dan praktis" },
        { en: "Slow", id: "Lambat" },
        { en: "Expensive", id: "Mahal" },
      ],
      answer: 0,
    },
  },
  "h2-30": {
    unit: 5,
    art: "sun",
    title: { en: "The sun is brighter", id: "Matahari lebih terang" },
    place: { en: "Street", id: "Jalan" },
    lines: [
      { who: "A", name: "小明", h: "灯太亮了。", p: "Dēng tài liàng le.", en: "The lamp is too bright.", id: "Lampunya terlalu terang." },
      { who: "B", name: "小美", h: "太阳更大。", p: "Tàiyáng gèng dà.", en: "The sun is bigger.", id: "Matahari lebih besar." },
      { who: "A", name: "小明", h: "爬上去方便吗？", p: "Pá shàngqù fāngbiàn ma?", en: "Is it easy to climb up?", id: "Mudah naik ke atas?" },
      { who: "B", name: "小美", h: "随便喊我。", p: "Suíbiàn hǎn wǒ.", en: "Just call me.", id: "Panggil saja saya." },
    ],
    question: {
      en: "What is brighter?",
      id: "Apa yang lebih terang?",
      options: [
        { en: "The sun", id: "Matahari" },
        { en: "The lamp", id: "Lampu" },
        { en: "The phone", id: "Telepon" },
      ],
      answer: 0,
    },
  },
  "h2-31": {
    unit: 6,
    art: "fitting",
    title: { en: "A fitting park", id: "Taman yang cocok" },
    place: { en: "Park", id: "Taman" },
    lines: [
      { who: "A", name: "小明", h: "这个公园合适吗？", p: "Zhège gōngyuán héshì ma?", en: "Is this park suitable?", id: "Taman ini cocok?" },
      { who: "B", name: "小美", h: "合适，很热情。", p: "Héshì, hěn rèqíng.", en: "Yes, very welcoming.", id: "Cocok, sangat ramah." },
      { who: "A", name: "小明", h: "名单上相同吗？", p: "Míngdān shàng xiāngtóng ma?", en: "Is it the same on the list?", id: "Di daftar sama?" },
      { who: "B", name: "小美", h: "相同，我答应了。", p: "Xiāngtóng, wǒ dāying le.", en: "Same, I agreed.", id: "Sama, saya setuju." },
    ],
    question: { en: "Is the park suitable?", id: "Apakah tamannya cocok?", options: [
      { en: "Yes", id: "Ya" }, { en: "No", id: "Tidak" }, { en: "Too small", id: "Terlalu kecil" }], answer: 0 },
  },
  "h2-32": {
    unit: 6,
    art: "bike",
    title: { en: "Riding and the newspaper", id: "Bersepeda dan koran" },
    place: { en: "Street", id: "Jalan" },
    lines: [
      { who: "A", name: "小美", h: "你骑自行车吗？", p: "Nǐ qí zìxíngchē ma?", en: "Do you ride a bike?", id: "Kamu bersepeda?" },
      { who: "B", name: "小明", h: "骑，收入不高。", p: "Qí, shōurù bù gāo.", en: "Yes, my income isn't high.", id: "Iya, penghasilan saya tidak tinggi." },
      { who: "A", name: "小美", h: "报纸响了吗？", p: "Bàozhǐ xiǎng le ma?", en: "Did the newspaper ring?", id: "Korannya berbunyi?" },
      { who: "B", name: "小明", h: "响了，我练听力。", p: "Xiǎng le, wǒ liàn tīnglì.", en: "Yes, I'm practising listening.", id: "Berbunyi, saya latihan mendengar." },
    ],
    question: { en: "What is he practising?", id: "Apa yang dilatih?", options: [
      { en: "Listening", id: "Mendengarkan" }, { en: "Writing", id: "Menulis" }, { en: "Speaking", id: "Berbicara" }], answer: 0 },
  },
  "h2-33": {
    unit: 6,
    art: "rent",
    title: { en: "Renting with a colleague", id: "Menyewa dengan rekan" },
    place: { en: "Office", id: "Kantor" },
    lines: [
      { who: "A", name: "小明", h: "你租房子吗？", p: "Nǐ zū fángzi ma?", en: "Are you renting a place?", id: "Kamu menyewa rumah?" },
      { who: "B", name: "小美", h: "是，和同事一起。", p: "Shì, hé tóngshì yìqǐ.", en: "Yes, with a colleague.", id: "Ya, bersama rekan kerja." },
      { who: "A", name: "小明", h: "球队舒服吗？", p: "Qiúduì shūfu ma?", en: "Is the team comfortable?", id: "Timnya nyaman?" },
      { who: "B", name: "小美", h: "很舒服，体育好。", p: "Hěn shūfu, tǐyù hǎo.", en: "Very, the sports are good.", id: "Sangat, olahraganya bagus." },
    ],
    question: { en: "Who is she renting with?", id: "Dengan siapa dia menyewa?", options: [
      { en: "A colleague", id: "Rekan kerja" }, { en: "Her family", id: "Keluarganya" }, { en: "A teacher", id: "Guru" }], answer: 0 },
  },
  "h2-34": {
    unit: 6,
    art: "lake",
    title: { en: "The road to the lake", id: "Jalan ke danau" },
    place: { en: "Highway", id: "Jalan raya" },
    lines: [
      { who: "A", name: "小明", h: "旅行走公路吗？", p: "Lǚxíng zǒu gōnglù ma?", en: "Do we travel by road?", id: "Perjalanan lewat jalan raya?" },
      { who: "B", name: "小美", h: "是，主人有信心。", p: "Shì, zhǔrén yǒu xìnxīn.", en: "Yes, the host is confident.", id: "Ya, tuan rumah percaya diri." },
      { who: "A", name: "小明", h: "湖美吗？", p: "Hú měi ma?", en: "Is the lake pretty?", id: "Danaunya indah?" },
      { who: "B", name: "小美", h: "很美，我放心了。", p: "Hěn měi, wǒ fàngxīn le.", en: "Very, I'm reassured.", id: "Sangat, saya tenang." },
    ],
    question: { en: "How is the lake?", id: "Bagaimana danaunya?", options: [
      { en: "Pretty", id: "Indah" }, { en: "Dirty", id: "Kotor" }, { en: "Dry", id: "Kering" }], answer: 0 },
  },
  "h2-35": {
    unit: 6,
    art: "homework",
    title: { en: "Three kilometres", id: "Tiga kilometer" },
    place: { en: "Yard", id: "Halaman" },
    lines: [
      { who: "A", name: "小美", h: "院子安静吗？", p: "Yuànzi ānjìng ma?", en: "Is the yard quiet?", id: "Halamannya tenang?" },
      { who: "B", name: "小明", h: "安静，离湖三公里。", p: "Ānjìng, lí hú sān gōnglǐ.", en: "Quiet, three kilometres from the lake.", id: "Tenang, tiga kilometer dari danau." },
      { who: "A", name: "小美", h: "作业多吗？", p: "Zuòyè duō ma?", en: "Is there a lot of homework?", id: "PR-nya banyak?" },
      { who: "B", name: "小明", h: "多，家长有道理。", p: "Duō, jiāzhǎng yǒu dàolǐ.", en: "A lot, the parents have a point.", id: "Banyak, orang tua ada alasannya." },
    ],
    question: { en: "How far is the lake?", id: "Berapa jauh ke danau?", options: [
      { en: "Three kilometres", id: "Tiga kilometer" }, { en: "Three metres", id: "Tiga meter" }, { en: "Thirty kilometres", id: "Tiga puluh kilometer" }], answer: 0 },
  },
  "h2-36": {
    unit: 7,
    art: "novel",
    title: { en: "A moving novel", id: "Novel yang menyentuh" },
    place: { en: "Café", id: "Kafe" },
    lines: [
      { who: "A", name: "小明", h: "这本小说好看吗？", p: "Zhè běn xiǎoshuō hǎokàn ma?", en: "Is this novel good?", id: "Novel ini bagus?" },
      { who: "B", name: "小美", h: "好看，教师也感动。", p: "Hǎokàn, jiàoshī yě gǎndòng.", en: "Yes, even the teacher was moved.", id: "Bagus, guru juga tersentuh." },
      { who: "A", name: "小明", h: "出租车到吗？", p: "Chūzūchē dào ma?", en: "Did the taxi arrive?", id: "Taksinya sampai?" },
      { who: "B", name: "小美", h: "到，提到好事。", p: "Dào, tídào hǎoshì.", en: "Yes, it mentioned a good deed.", id: "Sampai, menyebut hal baik." },
    ],
    question: { en: "Who else was moved?", id: "Siapa lagi yang tersentuh?", options: [
      { en: "The teacher", id: "Guru" }, { en: "The driver", id: "Sopir" }, { en: "The customer", id: "Pelanggan" }], answer: 0 },
  },
  "h2-37": {
    unit: 7,
    art: "queue",
    title: { en: "Sad guests", id: "Tamu yang sedih" },
    place: { en: "Shop", id: "Toko" },
    lines: [
      { who: "A", name: "小明", h: "顾客多吗？", p: "Gùkè duō ma?", en: "Are there many customers?", id: "Pelanggannya banyak?" },
      { who: "B", name: "小美", h: "多，客人也难过。", p: "Duō, kèrén yě nánguò.", en: "Many, and the guests are sad too.", id: "Banyak, tamunya juga sedih." },
      { who: "A", name: "小明", h: "组成什么？", p: "Zǔchéng shénme?", en: "Formed into what?", id: "Membentuk apa?" },
      { who: "B", name: "小美", h: "组成大队伍，不好意思。", p: "Zǔchéng dà duìwǔ, bù hǎoyìsi.", en: "A big queue, sorry.", id: "Antrean panjang, maaf." },
    ],
    question: { en: "How do the guests feel?", id: "Bagaimana perasaan tamu?", options: [
      { en: "Sad", id: "Sedih" }, { en: "Happy", id: "Senang" }, { en: "Angry", id: "Marah" }], answer: 0 },
  },
  "h2-38": {
    unit: 7,
    art: "bowl",
    title: { en: "The accurate request", id: "Permintaan yang tepat" },
    place: { en: "Shop", id: "Toko" },
    lines: [
      { who: "A", name: "小明", h: "请求准确吗？", p: "Qǐngqiú zhǔnquè ma?", en: "Is the request accurate?", id: "Permintaannya tepat?" },
      { who: "B", name: "小美", h: "准确，碰到碗。", p: "Zhǔnquè, pèngdào wǎn.", en: "Accurate, I bumped the bowl.", id: "Tepat, tersenggol mangkuk." },
      { who: "A", name: "小明", h: "蓝色好看吗？", p: "Lánsè hǎokàn ma?", en: "Is the blue nice?", id: "Yang biru bagus?" },
      { who: "B", name: "小美", h: "好看，去广场吧。", p: "Hǎokàn, qù guǎngchǎng ba.", en: "Nice, let's go to the square.", id: "Bagus, ayo ke lapangan." },
    ],
    question: { en: "Where are they going?", id: "Mereka mau ke mana?", options: [
      { en: "The square", id: "Lapangan" }, { en: "The shop", id: "Toko" }, { en: "Home", id: "Rumah" }], answer: 0 },
  },
  "h2-39": {
    unit: 7,
    art: "authors",
    title: { en: "The author event", id: "Acara penulis" },
    place: { en: "Lobby", id: "Lobi" },
    lines: [
      { who: "A", name: "小明", h: "图片里有什么？", p: "Túpiàn lǐ yǒu shénme?", en: "What's in the picture?", id: "Apa isi gambarnya?" },
      { who: "B", name: "小美", h: "车辆很多，出门小心。", p: "Chēliàng hěn duō, chūmén xiǎoxīn.", en: "Many vehicles, be careful going out.", id: "Banyak kendaraan, hati-hati keluar." },
      { who: "A", name: "小明", h: "作家全体来了吗？", p: "Zuòjiā quántǐ lái le ma?", en: "Did all the authors come?", id: "Semua penulis datang?" },
      { who: "B", name: "小美", h: "来了，坐地铁。", p: "Lái le, zuò dìtiě.", en: "Yes, they took the subway.", id: "Datang, naik kereta bawah tanah." },
    ],
    question: { en: "How did they arrive?", id: "Mereka datang naik apa?", options: [
      { en: "Subway", id: "Kereta bawah tanah" }, { en: "Taxi", id: "Taksi" }, { en: "Bus", id: "Bus" }], answer: 0 },
  },
  "h2-40": {
    unit: 7,
    art: "captain",
    title: { en: "The friendly captain", id: "Kapten yang ramah" },
    place: { en: "Classroom", id: "Ruang kelas" },
    lines: [
      { who: "A", name: "小美", h: "今天练习吗？", p: "Jīntiān liànxí ma?", en: "Is there practice today?", id: "Hari ini latihan?" },
      { who: "B", name: "小明", h: "练习，人数很多。", p: "Liànxí, rénshù hěn duō.", en: "Yes, many people.", id: "Latihan, orangnya banyak." },
      { who: "A", name: "小美", h: "队长友好吗？", p: "Duìzhǎng yǒuhǎo ma?", en: "Is the captain friendly?", id: "Kaptennya ramah?" },
      { who: "B", name: "小明", h: "友好，停车对话。", p: "Yǒuhǎo, tíngchē duìhuà.", en: "Friendly, we talked in the car park.", id: "Ramah, ngobrol di parkiran." },
    ],
    question: { en: "How is the captain?", id: "Bagaimana kaptennya?", options: [
      { en: "Friendly", id: "Ramah" }, { en: "Strict", id: "Ketat" }, { en: "Quiet", id: "Pendiam" }], answer: 0 },
  },
  "h2-41": {
    unit: 8,
    art: "principal",
    title: { en: "The principal rides", id: "Kepala sekolah bersepeda" },
    place: { en: "Campus", id: "Kampus" },
    lines: [
      { who: "A", name: "小明", h: "校长骑车吗？", p: "Xiàozhǎng qí chē ma?", en: "Does the principal ride a bike?", id: "Kepala sekolah bersepeda?" },
      { who: "B", name: "小美", h: "骑，市长也是。", p: "Qí, shìzhǎng yě shì.", en: "Yes, and the mayor too.", id: "Iya, walikota juga." },
      { who: "A", name: "小明", h: "相机在花园吗？", p: "Xiàngjī zài huāyuán ma?", en: "Is the camera in the garden?", id: "Kameranya di taman?" },
      { who: "B", name: "小美", h: "在，温度好。", p: "Zài, wēndù hǎo.", en: "Yes, the temperature is nice.", id: "Ada, suhunya bagus." },
    ],
    question: { en: "Where is the camera?", id: "Di mana kameranya?", options: [
      { en: "In the garden", id: "Di taman" }, { en: "In the office", id: "Di kantor" }, { en: "At home", id: "Di rumah" }], answer: 0 },
  },
  "h2-42": {
    unit: 8,
    art: "science",
    title: { en: "The scientist values it", id: "Ilmuwan menghargainya" },
    place: { en: "Home", id: "Rumah" },
    lines: [
      { who: "A", name: "小明", h: "例如洗澡？", p: "Lìrú xǐzǎo?", en: "For example, bathing?", id: "Misalnya mandi?" },
      { who: "B", name: "小美", h: "对，科学家重视。", p: "Duì, kēxuéjiā zhòngshì.", en: "Yes, scientists value it.", id: "Ya, ilmuwan menghargainya." },
      { who: "A", name: "小明", h: "晚餐在大门吗？", p: "Wǎncān zài dàmén ma?", en: "Is dinner at the gate?", id: "Makan malam di gerbang?" },
      { who: "B", name: "小美", h: "是，还有晚会。", p: "Shì, háiyǒu wǎnhuì.", en: "Yes, and there's a party.", id: "Ya, ada pesta juga." },
    ],
    question: { en: "What else is there?", id: "Ada acara apa lagi?", options: [
      { en: "An evening party", id: "Pesta malam" }, { en: "A match", id: "Pertandingan" }, { en: "A class", id: "Kelas" }], answer: 0 },
  },
  "h2-43": {
    unit: 8,
    art: "computer",
    title: { en: "Feeling unwell", id: "Tidak enak badan" },
    place: { en: "Bedroom", id: "Kamar" },
    lines: [
      { who: "A", name: "小明", h: "计算机大吗？", p: "Jìsuànjī dà ma?", en: "Is the computer big?", id: "Komputernya besar?" },
      { who: "B", name: "小美", h: "大小合适，我难受。", p: "Dàxiǎo héshì, wǒ nánshòu.", en: "The size is right, but I feel unwell.", id: "Ukurannya pas, tapi saya tidak enak badan." },
      { who: "A", name: "小明", h: "太太参观吗？", p: "Tàitai cānguān ma?", en: "Is your wife visiting?", id: "Istri kamu ikut berkunjung?" },
      { who: "B", name: "小美", h: "参观，笔记本对面。", p: "Cānguān, bǐjìběn duìmiàn.", en: "Yes, the notebook is opposite.", id: "Ikut, buku catatannya di seberang." },
    ],
    question: { en: "How does she feel?", id: "Bagaimana perasaannya?", options: [
      { en: "Unwell", id: "Tidak enak badan" }, { en: "Great", id: "Sangat baik" }, { en: "Hungry", id: "Lapar" }], answer: 0 },
  },
  "h2-44": {
    unit: 8,
    art: "jokes",
    title: { en: "Jokes on a cloudy day", id: "Lelucon saat mendung" },
    place: { en: "Living room", id: "Ruang tamu" },
    lines: [
      { who: "A", name: "小明", h: "青少年有特点吗？", p: "Qīngshàonián yǒu tèdiǎn ma?", en: "Do teenagers have traits?", id: "Remaja punya ciri khas?" },
      { who: "B", name: "小美", h: "有，阴天讲笑话。", p: "Yǒu, yīntiān jiǎng xiàohua.", en: "Yes, they tell jokes on cloudy days.", id: "Ada, saat mendung bercanda." },
      { who: "A", name: "小明", h: "平常商量吗？", p: "Píngcháng shāngliang ma?", en: "Do you usually discuss things?", id: "Biasanya berdiskusi?" },
      { who: "B", name: "小美", h: "商量，午餐一起吃。", p: "Shāngliang, wǔcān yìqǐ chī.", en: "Yes, we have lunch together.", id: "Diskusi, makan siang bersama." },
    ],
    question: { en: "When do they joke?", id: "Kapan mereka bercanda?", options: [
      { en: "On cloudy days", id: "Saat mendung" }, { en: "At night", id: "Malam" }, { en: "In the morning", id: "Pagi" }], answer: 0 },
  },
  "h2-45": {
    unit: 8,
    art: "cart",
    title: { en: "Queuing on campus", id: "Antre di kampus" },
    place: { en: "Supermarket", id: "Supermarket" },
    lines: [
      { who: "A", name: "小明", h: "排队进校园吗？", p: "Páiduì jìn xiàoyuán ma?", en: "Do we queue to enter campus?", id: "Antre masuk kampus?" },
      { who: "B", name: "小美", h: "是，等到爱人。", p: "Shì, děngdào àirén.", en: "Yes, until my partner arrives.", id: "Ya, menunggu pasangan." },
      { who: "A", name: "小明", h: "超市在球场边？", p: "Chāoshì zài qiúchǎng biān?", en: "Is the supermarket by the field?", id: "Supermarket di samping lapangan?" },
      { who: "B", name: "小美", h: "对，住院后教学。", p: "Duì, zhùyuàn hòu jiàoxué.", en: "Yes, teaching after being hospitalised.", id: "Ya, mengajar setelah dirawat." },
    ],
    question: { en: "Where is the supermarket?", id: "Di mana supermarket?", options: [
      { en: "By the sports field", id: "Samping lapangan" }, { en: "By the lake", id: "Samping danau" }, { en: "In the campus", id: "Di kampus" }], answer: 0 },
  },
  "h2-46": {
    unit: 9, art: "airport",
    title: { en: "Tourists sign up", id: "Turis mendaftar" },
    place: { en: "Airport", id: "Bandara" },
    lines: [
      { who: "A", name: "小明", h: "游客报名了吗？", p: "Yóukè bàomíng le ma?", en: "Did the tourists sign up?", id: "Turisnya mendaftar?" },
      { who: "B", name: "小美", h: "报名了，拿到了票。", p: "Bàomíng le, nádào le piào.", en: "Yes, they got the tickets.", id: "Sudah, dapat tiket." },
      { who: "A", name: "小明", h: "全家都去吗？", p: "Quánjiā dōu qù ma?", en: "Is the whole family going?", id: "Seluruh keluarga pergi?" },
      { who: "B", name: "小美", h: "是，晚上看月亮和星星。", p: "Shì, wǎnshang kàn yuèliang hé xīngxing.", en: "Yes, at night to see the moon and stars.", id: "Ya, malam lihat bulan dan bintang." },
    ],
    question: { en: "What will they see at night?", id: "Apa yang dilihat malam?", options: [
      { en: "Moon and stars", id: "Bulan dan bintang" }, { en: "The sea", id: "Laut" }, { en: "A film", id: "Film" }], answer: 0 },
  },
  "h2-47": {
    unit: 9, art: "classroom",
    title: { en: "The businessman is unhappy", id: "Pengusaha tidak senang" },
    place: { en: "Classroom", id: "Ruang kelas" },
    lines: [
      { who: "A", name: "小美", h: "商人不满吗？", p: "Shāngrén bùmǎn ma?", en: "Is the businessman unhappy?", id: "Pengusahanya tidak senang?" },
      { who: "B", name: "小明", h: "不满，教室常见。", p: "Bùmǎn, jiàoshì chángjiàn.", en: "Unhappy, common in classrooms.", id: "Tidak senang, biasa di kelas." },
      { who: "A", name: "小美", h: "飞机起飞了吗？", p: "Fēijī qǐfēi le ma?", en: "Has the plane taken off?", id: "Pesawatnya sudah lepas landas?" },
      { who: "B", name: "小明", h: "起飞了，走过停车场。", p: "Qǐfēi le, zǒuguò tíngchēchǎng.", en: "Yes, I walked past the car park.", id: "Sudah, saya lewat parkiran." },
    ],
    question: { en: "Where did he walk?", id: "Di mana dia lewat?", options: [
      { en: "The car park", id: "Parkiran" }, { en: "The classroom", id: "Ruang kelas" }, { en: "The airport", id: "Bandara" }], answer: 0 },
  },
  "h2-48": {
    unit: 9, art: "road",
    title: { en: "The sea is far", id: "Laut itu jauh" },
    place: { en: "Road", id: "Jalan" },
    lines: [
      { who: "A", name: "小明", h: "大海远吗？", p: "Dàhǎi yuǎn ma?", en: "Is the sea far?", id: "Lautnya jauh?" },
      { who: "B", name: "小美", h: "远，出租贵。", p: "Yuǎn, chūzū guì.", en: "Far, and taxis are expensive.", id: "Jauh, taksi mahal." },
      { who: "A", name: "小明", h: "旅客穿大衣吗？", p: "Lǚkè chuān dàyī ma?", en: "Do tourists wear coats?", id: "Turisnya pakai mantel?" },
      { who: "B", name: "小美", h: "穿，入口在这月。", p: "Chuān, rùkǒu zài zhè yuè.", en: "Yes, the entrance is this month.", id: "Ya, pintu masuknya bulan ini." },
    ],
    question: { en: "What do tourists wear?", id: "Apa yang dipakai turis?", options: [
      { en: "Coats", id: "Mantel" }, { en: "Hats", id: "Topi" }, { en: "Shorts", id: "Celana pendek" }], answer: 0 },
  },
  "h2-49": {
    unit: 9, art: "campus",
    title: { en: "The director nods", id: "Direktur mengangguk" },
    place: { en: "Campus", id: "Kampus" },
    lines: [
      { who: "A", name: "小美", h: "实习开始了吗？", p: "Shíxí kāishǐ le ma?", en: "Has the internship started?", id: "Magangnya sudah mulai?" },
      { who: "B", name: "小明", h: "开始了，院长点头。", p: "Kāishǐ le, yuànzhǎng diǎntóu.", en: "Yes, the director nodded.", id: "Sudah, direktur mengangguk." },
      { who: "A", name: "小美", h: "音乐会几点？", p: "Yīnyuèhuì jǐ diǎn?", en: "What time is the concert?", id: "Konsernya jam berapa?" },
      { who: "B", name: "小明", h: "八点，院子门口。", p: "Bā diǎn, yuànzi ménkǒu.", en: "Eight, at the yard gate.", id: "Jam delapan, di gerbang halaman." },
    ],
    question: { en: "Who nodded?", id: "Siapa yang mengangguk?", options: [
      { en: "The director", id: "Direktur" }, { en: "The student", id: "Mahasiswa" }, { en: "The singer", id: "Penyanyi" }], answer: 0 },
  },
  "h2-50": {
    unit: 9, art: "bedroom",
    title: { en: "It snowed", id: "Turun salju" },
    place: { en: "Bedroom", id: "Kamar" },
    lines: [
      { who: "A", name: "小明", h: "复习了吗？", p: "Fùxí le ma?", en: "Did you revise?", id: "Sudah belajar ulang?" },
      { who: "B", name: "小美", h: "复习了，护照拿到。", p: "Fùxí le, hùzhào nádào.", en: "Yes, and I got the passport.", id: "Sudah, paspor didapat." },
      { who: "A", name: "小明", h: "下雪了吗？", p: "Xiàxuě le ma?", en: "Did it snow?", id: "Turun salju?" },
      { who: "B", name: "小美", h: "下了，气温低。", p: "Xià le, qìwēn dī.", en: "Yes, the temperature is low.", id: "Ya, suhunya rendah." },
    ],
    question: { en: "How is the weather?", id: "Bagaimana cuacanya?", options: [
      { en: "Snowing", id: "Bersalju" }, { en: "Sunny", id: "Cerah" }, { en: "Raining", id: "Hujan" }], answer: 0 },
  },
  "h2-51": {
    unit: 10, art: "park",
    title: { en: "Old friends at the gym", id: "Teman lama di gym" },
    place: { en: "Park", id: "Taman" },
    lines: [
      { who: "A", name: "小美", h: "体育馆有老朋友。", p: "Tǐyùguǎn yǒu lǎo péngyou.", en: "There's an old friend at the gym.", id: "Ada teman lama di gym." },
      { who: "B", name: "小明", h: "菜单呢？", p: "Càidān ne?", en: "Where's the menu?", id: "Menunya mana?" },
      { who: "A", name: "小美", h: "小声点，我在做笔记。", p: "Xiǎoshēng diǎn, wǒ zài zuò bǐjì.", en: "Quieter, I'm taking notes.", id: "Pelan-pelan, saya mencatat." },
      { who: "B", name: "小明", h: "好，休假送到。", p: "Hǎo, xiūjià sòngdào.", en: "Okay, delivered on holiday.", id: "Baik, dikirim saat libur." },
    ],
    question: { en: "What is she doing?", id: "Apa yang dia lakukan?", options: [
      { en: "Taking notes", id: "Mencatat" }, { en: "Cooking", id: "Memasak" }, { en: "Running", id: "Berlari" }], answer: 0 },
  },
  "h2-52": {
    unit: 10, art: "grocery",
    title: { en: "Photos at the zoo", id: "Foto di kebun binatang" },
    place: { en: "Shop", id: "Toko" },
    lines: [
      { who: "A", name: "小明", h: "打印了吗？", p: "Dǎyìn le ma?", en: "Did you print it?", id: "Sudah dicetak?" },
      { who: "B", name: "小美", h: "打印了，去动物园照相。", p: "Dǎyìn le, qù dòngwùyuán zhàoxiàng.", en: "Yes, to take photos at the zoo.", id: "Sudah, foto di kebun binatang." },
      { who: "A", name: "小明", h: "班长回国吗？", p: "Bānzhǎng huíguó ma?", en: "Is the class monitor going home?", id: "Ketua kelas pulang ke negaranya?" },
      { who: "B", name: "小美", h: "回，天气晴。", p: "Huí, tiānqì qíng.", en: "Yes, the weather is clear.", id: "Ya, cuacanya cerah." },
    ],
    question: { en: "Where are they going?", id: "Mereka ke mana?", options: [
      { en: "The zoo", id: "Kebun binatang" }, { en: "The gym", id: "Gym" }, { en: "The bank", id: "Bank" }], answer: 0 },
  },
  "h2-53": {
    unit: 10, art: "tea",
    title: { en: "Chopsticks and sentences", id: "Sumpit dan kalimat" },
    place: { en: "Tea shop", id: "Kedai teh" },
    lines: [
      { who: "A", name: "小美", h: "开学了，常用词多吗？", p: "Kāixué le, chángyòng cí duō ma?", en: "School started, many common words?", id: "Sekolah mulai, kata umum banyak?" },
      { who: "B", name: "小明", h: "多，句子难。", p: "Duō, jùzi nán.", en: "Many, the sentences are hard.", id: "Banyak, kalimatnya sulit." },
      { who: "A", name: "小美", h: "你请客吗？", p: "Nǐ qǐngkè ma?", en: "Are you treating us?", id: "Kamu yang traktir?" },
      { who: "B", name: "小明", h: "是，用筷子吃饭。", p: "Shì, yòng kuàizi chīfàn.", en: "Yes, eating with chopsticks.", id: "Ya, makan pakai sumpit." },
    ],
    question: { en: "What do they eat with?", id: "Makan pakai apa?", options: [
      { en: "Chopsticks", id: "Sumpit" }, { en: "A spoon", id: "Sendok" }, { en: "Hands", id: "Tangan" }], answer: 0 },
  },
  "h2-54": {
    unit: 10, art: "lobby",
    title: { en: "Dumplings at the station", id: "Pangsit di stasiun" },
    place: { en: "Lobby", id: "Lobi" },
    lines: [
      { who: "A", name: "小明", h: "组长写作文吗？", p: "Zǔzhǎng xiě zuòwén ma?", en: "Is the group leader writing an essay?", id: "Ketua kelompok menulis esai?" },
      { who: "B", name: "小美", h: "写，个子高。", p: "Xiě, gèzi gāo.", en: "Yes, and he's tall.", id: "Ya, dan dia tinggi." },
      { who: "A", name: "小明", h: "地铁站有快餐？", p: "Dìtiězhàn yǒu kuàicān ma?", en: "Is there fast food at the subway station?", id: "Ada makanan cepat saji di stasiun?" },
      { who: "B", name: "小美", h: "有，吃饺子开机。", p: "Yǒu, chī jiǎozi kāijī.", en: "Yes, dumplings then boot up.", id: "Ada, makan pangsit lalu nyalakan." },
    ],
    question: { en: "What do they eat?", id: "Apa yang dimakan?", options: [
      { en: "Dumplings", id: "Pangsit" }, { en: "Noodles", id: "Mi" }, { en: "Rice", id: "Nasi" }], answer: 0 },
  },
  "h2-55": {
    unit: 10, art: "family2",
    title: { en: "Mandarin and a toast", id: "Mandarin dan bersulang" },
    place: { en: "Home", id: "Rumah" },
    lines: [
      { who: "A", name: "小美", h: "碰见谁了？", p: "Pèngjiàn shéi le?", en: "Who did you run into?", id: "Bertemu siapa?" },
      { who: "B", name: "小明", h: "老师，说普通话。", p: "Lǎoshī, shuō pǔtōnghuà.", en: "The teacher, speaking Mandarin.", id: "Guru, bicara Mandarin." },
      { who: "A", name: "小美", h: "排球呢？", p: "Páiqiú ne?", en: "And volleyball?", id: "Kalau voli?" },
      { who: "B", name: "小明", h: "过年干杯！", p: "Guònián gānbēi!", en: "New Year toast!", id: "Bersulang tahun baru!" },
    ],
    question: { en: "What language did they speak?", id: "Bahasa apa yang dipakai?", options: [
      { en: "Mandarin", id: "Mandarin" }, { en: "English", id: "Inggris" }, { en: "Indonesian", id: "Indonesia" }], answer: 0 },
  },
  "h2-56": {
    unit: 11, art: "mountain",
    title: { en: "Sneakers for the climb", id: "Sepatu untuk mendaki" },
    place: { en: "Mountain", id: "Gunung" },
    lines: [
      { who: "A", name: "小明", h: "爬山吗？", p: "Páshān ma?", en: "Are we climbing?", id: "Mendaki?" },
      { who: "B", name: "小美", h: "去，穿球鞋。", p: "Qù, chuān qiúxié.", en: "Yes, wear sneakers.", id: "Ya, pakai sepatu olahraga." },
      { who: "A", name: "小明", h: "黑板写什么？", p: "Hēibǎn xiě shénme?", en: "What's on the blackboard?", id: "Apa tulisan di papan?" },
      { who: "B", name: "小美", h: "写饭馆，普通话流利。", p: "Xiě fànguǎn, pǔtōnghuà liúlì.", en: "A restaurant, fluent Mandarin.", id: "Restoran, Mandarin lancar." },
    ],
    question: { en: "What shoes?", id: "Sepatu apa?", options: [
      { en: "Sneakers", id: "Sepatu olahraga" }, { en: "Leather shoes", id: "Sepatu kulit" }, { en: "Boots", id: "Sepatu bot" }], answer: 0 },
  },
  "h2-57": {
    unit: 11, art: "ward",
    title: { en: "Chinese medicine", id: "Pengobatan Tiongkok" },
    place: { en: "Hospital room", id: "Kamar rumah sakit" },
    lines: [
      { who: "A", name: "小美", h: "中医好吗？", p: "Zhōngyī hǎo ma?", en: "Is Chinese medicine good?", id: "Pengobatan Tiongkok bagus?" },
      { who: "B", name: "小明", h: "好，药水药片都有。", p: "Hǎo, yàoshuǐ yàopiàn dōu yǒu.", en: "Yes, both liquid and pills.", id: "Bagus, ada cairan dan pil." },
      { who: "A", name: "小美", h: "问路叫什么？", p: "Wènlù jiào shénme?", en: "What's asking directions called?", id: "Minta arah namanya apa?" },
      { who: "B", name: "小明", h: "用词典，音节清楚。", p: "Yòng cídiǎn, yīnjié qīngchu.", en: "Use a dictionary, syllables are clear.", id: "Pakai kamus, suku katanya jelas." },
    ],
    question: { en: "What is asked?", id: "Apa yang ditanyakan?", options: [
      { en: "Directions", id: "Arah jalan" }, { en: "The price", id: "Harga" }, { en: "The time", id: "Waktu" }], answer: 0 },
  },
  "h2-58": {
    unit: 11, art: "news",
    title: { en: "Exchange students", id: "Mahasiswa asing" },
    place: { en: "Living room", id: "Ruang tamu" },
    lines: [
      { who: "A", name: "小明", h: "留学生听讲吗？", p: "Liúxuéshēng tīngjiǎng ma?", en: "Do exchange students attend lectures?", id: "Mahasiswa asing ikut kuliah?" },
      { who: "B", name: "小美", h: "听，考生读音好。", p: "Tīng, kǎoshēng dúyīn hǎo.", en: "Yes, the candidate's pronunciation is good.", id: "Ikut, pelafalan pesertanya bagus." },
      { who: "A", name: "小明", h: "西餐还是中餐？", p: "Xīcān háishì zhōngcān?", en: "Western or Chinese food?", id: "Makanan Barat atau Tiongkok?" },
      { who: "B", name: "小美", h: "西餐，生词少。", p: "Xīcān, shēngcí shǎo.", en: "Western, fewer new words.", id: "Barat, kata barunya sedikit." },
    ],
    question: { en: "Which food?", id: "Makanan apa?", options: [
      { en: "Western", id: "Barat" }, { en: "Chinese", id: "Tiongkok" }, { en: "Fast food", id: "Cepat saji" }], answer: 0 },
  },
  "h2-59": {
    unit: 11, art: "shop",
    title: { en: "Ten thousand", id: "Sepuluh ribu" },
    place: { en: "Shop", id: "Toko" },
    lines: [
      { who: "A", name: "小美", h: "以后做什么？", p: "Yǐhòu zuò shénme?", en: "What will you do later?", id: "Nanti mau apa?" },
      { who: "B", name: "小明", h: "以前想学医，当时没钱。", p: "Yǐqián xiǎng xué yī, dāngshí méi qián.", en: "I wanted medicine before, no money then.", id: "Dulu mau belajar kedokteran, waktu itu tidak ada uang." },
      { who: "A", name: "小美", h: "这件衣服多少钱？", p: "Zhè jiàn yīfu duōshao qián?", en: "How much is this piece?", id: "Baju ini berapa?" },
      { who: "B", name: "小明", h: "一万片？太多。", p: "Yí wàn piàn? Tài duō.", en: "Ten thousand? Too much.", id: "Sepuluh ribu? Terlalu banyak." },
    ],
    question: { en: "How much is it?", id: "Berapa harganya?", options: [
      { en: "Ten thousand", id: "Sepuluh ribu" }, { en: "One thousand", id: "Seribu" }, { en: "One hundred", id: "Seratus" }], answer: 0 },
  },
  "h2-60": {
    unit: 11, art: "street",
    title: { en: "All done recently", id: "Semua selesai" },
    place: { en: "Street", id: "Jalan" },
    lines: [
      { who: "A", name: "小明", h: "最近忙吗？", p: "Zuìjìn máng ma?", en: "Busy recently?", id: "Sibuk akhir-akhir ini?" },
      { who: "B", name: "小美", h: "忙，全部做完。", p: "Máng, quánbù zuòwán.", en: "Yes, everything is done.", id: "Sibuk, semua selesai." },
      { who: "A", name: "小明", h: "面前那辆车是谁的？", p: "Miànqián nà liàng chē shì shéi de?", en: "Whose car is that in front?", id: "Mobil di depan itu punya siapa?" },
      { who: "B", name: "小美", h: "许多人的，不少是新的。", p: "Xǔduō rén de, bùshǎo shì xīn de.", en: "Many people's, quite a few are new.", id: "Punya banyak orang, banyak yang baru." },
    ],
    question: { en: "Whose car is it?", id: "Mobil itu punya siapa?", options: [
      { en: "Many people's", id: "Banyak orang" }, { en: "The teacher's", id: "Guru" }, { en: "Nobody's", id: "Tidak ada" }], answer: 0 },
  },
};
