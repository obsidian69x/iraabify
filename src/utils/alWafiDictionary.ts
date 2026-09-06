// আধুনিক আরবী-বাংলা অভিধান [আল-মু'জামুল ওয়াফী] — ড. মুহাম্মদ ফজলুর রহমান
export interface WafiEntry {
  maddah: string;
  babSymbol: string;
  babNameAr: string;
  babNameBn: string;
  masdarAr: string;
  meaningBn: string;
  meaningEn: string;
  jinsAr: string;
  aslForm: string;
  ilalRuleAr: string;
  ilalRuleBn: string;
}

export const AL_WAFI_LEXICON: Record<string, WafiEntry> = {
  "كفي": {
    maddah: "ك - ف - ي",
    babSymbol: "[ض]",
    babNameAr: "فَعَلَ - يَفْعِلُ (باب ضَرَبَ)",
    babNameBn: "সুলাসী মুজাররাদ (যারাবা-ইয়াযরিবু)",
    masdarAr: "كِفَايَة",
    meaningBn: "যথেষ্ট হওয়া, রক্ষা করা, অনিষ্ট হতে সুরক্ষা দান করা",
    meaningEn: "To suffice, protect, preserve, defend against harm",
    jinsAr: "নাক্বিসে ইয়ায়ী (ناقص يائي)",
    aslForm: "يَكْفِيُ",
    ilalRuleAr: "استثقلت الضمة على الياء فسكنت فصار (يَكْفِي)",
    ilalRuleBn: "লাম কালিমায় ইয়া হরফের ওপর পেশ ভারী হওয়ায় তা সাকিন হয়ে গেছে (যাম্মাহ মুকাদ্দারা লিস-সিক্বাল)।"
  },
  "قول": {
    maddah: "ق - و - ل",
    babSymbol: "[ن]",
    babNameAr: "فَعَلَ - يَفْعُلُ (باب نَصَرَ)",
    babNameBn: "সুলাসী মুজাররাদ (নাসারা-ইয়ানসুরু)",
    masdarAr: "قَوْل ، مَقَال",
    meaningBn: "বলা, উক্তি করা, অভিমত ব্যক্ত করা, বর্ণনা করা",
    meaningEn: "To say, utter, state, articulate, speak",
    jinsAr: "আজওয়াফে ওয়াবী (أجوف واوي)",
    aslForm: "قَوَلَ",
    ilalRuleAr: "تحركت الواو وانفتح ما قبلها فقلبت ألفا فصار (قَالَ)",
    ilalRuleBn: "আজওয়াফে ওয়াবী কায়েদা: ওয়াও হরকতযুক্ত এবং তার পূর্বে যবর থাকায় ওয়াও আলিফে রূপান্তরিত হয়েছে।"
  },
  "كون": {
    maddah: "ك - و - ن",
    babSymbol: "[ن]",
    babNameAr: "فَعَلَ (فعل ماض ناقص)",
    babNameBn: "আফ'আলে নাক্বিসাহ্",
    masdarAr: "كَوْن ، كِيَان",
    meaningBn: "হওয়া, বিদ্যমান থাকা, ছিল, সৃষ্টি হওয়া",
    meaningEn: "To be, exist, occur, happen",
    jinsAr: "আজওয়াফে ওয়াবী",
    aslForm: "كَوَنَ",
    ilalRuleAr: "تحركت الواو وانفتح ما قبلها فقلبت ألفا فصار (كَانَ)",
    ilalRuleBn: "কাওয়ানা -> কানা। এটি মুবতাদাকে রফ ও খবরকে নসব প্রদান করে।"
  },
  "وقي": {
    maddah: "و - ق - ي",
    babSymbol: "[افتعال]",
    babNameAr: "اِفْتَعَلَ - يَتَّقِي",
    babNameBn: "বাব ইফতি'আল (الإفتعال)",
    masdarAr: "اِتِّقَاء ، تَقْوَى",
    meaningBn: "তাকওয়া অবলম্বন করা, বেঁচে থাকা, ভয় করা, আত্মরক্ষা করা",
    meaningEn: "To fear God, guard against evil, protect oneself, be pious",
    jinsAr: "লাফীফে মাফরূক (لفيف مفروق - মিসাল ও নাক্বিস)",
    aslForm: "اِوْتَقَى",
    ilalRuleAr: "وقعت الواو فاء في وزن افتعل فقلبت تاء وأدغمت في تاء الافتعال فصار (اتَّقَى)",
    ilalRuleBn: "ইবদা'ল: ইফতি'আল বাবের ফা-কালিমায় ওয়াও আসায় তা 'তা' (ت) দ্বারা পরিবর্তিত হয়ে দ্বিতীয় তা-এর সাথে ইদগাম হয়েছে।"
  },
  "قوم": {
    maddah: "ق - و - م",
    babSymbol: "[استفعال]",
    babNameAr: "اِسْتَفْعَلَ - يَسْتَقِيمُ",
    babNameBn: "বাব ইসতিফ'আল (الاستفعال)",
    masdarAr: "اِسْتِقَامَة",
    meaningBn: "অবিচল থাকা, সোজা হওয়া, অটল থাকা, সুদৃঢ় হওয়া",
    meaningEn: "To stand upright, be steadfast, remain firm, adhere to truth",
    jinsAr: "আজওয়াফে ওয়াবী",
    aslForm: "اِسْتَقْوَمَ",
    ilalRuleAr: "نقلت حركة الواو إلى الساكن الصحيح قبلها ثم قلبت ألفا فصار (اسْتَقَامَ)",
    ilalRuleBn: "আইন কালিমার হরকত পূর্বের হরফে স্থানান্তরিত হয়ে ওয়াও আলিফে রূপ নিয়েছে।"
  },
  "كتب": {
    maddah: "ك - ت - ب",
    babSymbol: "[ن]",
    babNameAr: "فَعَلَ - يَكْتُبُ",
    babNameBn: "সুলাসী মুজাররাদ (বাব নাসারা)",
    masdarAr: "كِتَابَة ، كَتْب",
    meaningBn: "লেখা, লিপিবদ্ধ করা, ফরয করা, অবধারিত করা",
    meaningEn: "To write, record, decree, ordain, prescribe",
    jinsAr: "সহীহ সালেম (صحيح سالم)",
    aslForm: "كَتَبَ",
    ilalRuleAr: "صحيح سالم سلمت أصوله من أحرف العلة والهمز والتضعيف",
    ilalRuleBn: "কোনো প্রকার রূপান্তর নেই; সহীহ সালেম।"
  },
  "علم": {
    maddah: "ع - ل - م",
    babSymbol: "[س] / [تفعيل]",
    babNameAr: "فَعِلَ - يَعْلَمُ / فَعَّلَ",
    babNameBn: "বাব সামি'আ / বাব তাফ'ঈল",
    masdarAr: "عِلْم / تَعْلِيم",
    meaningBn: "জানা, অবগত হওয়া, জ্ঞানার্জন করা; শিক্ষা দেওয়া, জানানো",
    meaningEn: "To know, perceive, understand; to teach, instruct",
    jinsAr: "সহীহ",
    aslForm: "عَلِمَ",
    ilalRuleAr: "صحيح سالم",
    ilalRuleBn: "মৌলিক সহীহ ধাতু।"
  },
  "طلب": {
    maddah: "ط - ل - ب",
    babSymbol: "[ن]",
    babNameAr: "فَعَلَ - يَطْلُبُ",
    babNameBn: "সুলাসী মুজাররাদ (বাব নাসারা)",
    masdarAr: "طَلَب",
    meaningBn: "সন্ধান করা, খোঁজা, চাওয়া, অন্বেষণ করা",
    meaningEn: "To seek, demand, search, pursue, request",
    jinsAr: "সহীহ",
    aslForm: "طَلَبَ",
    ilalRuleAr: "صحيح سالم",
    ilalRuleBn: "মৌলিক সহীহ ধাতু।"
  },
  "اله": {
    maddah: "أ - ل - ه",
    babSymbol: "إسم الجلالة",
    babNameAr: "الفِعَال",
    babNameBn: "ইসমে জালালাহ",
    masdarAr: "أُلُوهِيَّة",
    meaningBn: "মহান আল্লাহ, একমাত্র উপাস্য সত্তা, বিশ্বজগতের স্রষ্টা",
    meaningEn: "Allah, The Supreme God, The Absolute Sovereign Creator",
    jinsAr: "সহীহ",
    aslForm: "الإِلَاه",
    ilalRuleAr: "حذفت الهمزة تخفيفا لكثرة الاستعمال وأدغمت اللام في اللام فصار (الله)",
    ilalRuleBn: "অতিরিক্ত ব্যবহারের কারণে হামযা বিলুপ্ত করে লামকে লামের সাথে ইদগাম করা হয়েছে।"
  }
};

export function lookupWafiLexiconByRoot(cleanRoot: string): WafiEntry | null {
  const norm = cleanRoot.replace(/\s*-\s*/g, "");
  return AL_WAFI_LEXICON[norm] || null;
}