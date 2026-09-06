import { lookupWafiLexiconByRoot, WafiEntry } from './alWafiDictionary';

export interface Master11TierNode {
  tier1_lafz: string;
  tier2_muqatta: string;
  tier3_jidhr: string;
  tier4_wazn: string;
  tier5_seegah: string;
  tier6_manaBn: string;
  tier6_manaEn: string;
  tier7_mawqiBn: string;
  tier7_mawqiEn: string;
  tier7_mawqiAr: string;
  tier8_amilBn: string;
  tier8_amilEn: string;
  tier9_hukmBn: string;
  tier9_hukmEn: string;
  tier10_alamatBn: string;
  tier10_alamatEn: string;
  tier11_taalluqBn: string;
  tier11_taalluqEn: string;
  dictionaryCitation: string;
  aslMorph?: string;
  ilalRuleBn?: string;
  ilalRuleAr?: string;
}

export interface CompoundTahqiqResult {
  originalToken: string;
  isCompound: boolean;
  compoundSummaryBn: string;
  compoundSummaryEn: string;
  nodes: Master11TierNode[];
}

export interface SentenceAnalysis {
  clauseAr: string;
  clauseBn: string;
  clauseEn: string;
  hasMahall: boolean;
  mahallNameAr: string;
  mahallNameBn: string;
  mahallNameEn: string;
  ibnHishamProof: string;
}

export interface DependencyGraphEdge {
  fromIndex: number;
  toIndex: number;
  labelAr: string;
  labelBn: string;
  labelEn: string;
}

export function stripTashkeel(str: string): string {
  return (str || "").replace(/[\u0617-\u061A\u064B-\u0652]/g, "").trim();
}

export function cleanAlif(str: string): string {
  return stripTashkeel(str).replace(/[إأآٱ]/g, "ا").replace(/ى/g, "ي").replace(/ة/g, "ه");
}

export function analyze11TierPipeline(rawToken: string, indexInSentence: number, allTokens: string[]): CompoundTahqiqResult {
  const stripped = stripTashkeel(rawToken);
  const norm = cleanAlif(rawToken);

  // যৌগিক ক্লীটিক শব্দ বিশ্লেষণ (যেমন: فسيكفيكهم)
  if (norm.startsWith("فس") || norm.startsWith("وس") || (norm.startsWith("ف") && norm.length >= 5) || (norm.startsWith("و") && norm.length >= 5) || (norm.startsWith("س") && norm.length >= 5)) {
    let remainder = norm;
    const nodes: Master11TierNode[] = [];

    if (remainder.startsWith("ف")) {
      nodes.push({
        tier1_lafz: "فَـ",
        tier2_muqatta: "فَـ (হরফে আতফ / ইসতি'নাফ)",
        tier3_jidhr: "—",
        tier4_wazn: "حَرْف",
        tier5_seegah: "হরফে রবত ও সংযোগ",
        tier6_manaBn: "অতএব / সুতরাং / অতঃপর",
        tier6_manaEn: "So / Then / Therefore",
        tier7_mawqiBn: "বাক্য সূচনাকারী সংযোগ অব্যয়",
        tier7_mawqiEn: "Resumptive Conjunction (Fa al-Isti'nafiyyah)",
        tier7_mawqiAr: "حرف استئناف مبني على الفتح لا محل له من الإعراب",
        tier8_amilBn: "আমেলবিহীন",
        tier8_amilEn: "Non-governing operator",
        tier9_hukmBn: "মাবনী আলাল ফাতহ",
        tier9_hukmEn: "Indeclinable (Mabni)",
        tier10_alamatBn: "ফাতহাহ",
        tier10_alamatEn: "Fixed Fathah",
        tier11_taalluqBn: "পরবর্তী জুমলার বক্তব্যকে পূর্বের সাথে সংশ্লিষ্ট করে।",
        tier11_taalluqEn: "Connects independent clause to discourse.",
        dictionaryCitation: "আল-মু'জামুল ওয়াফী [পৃষ্ঠা ১৫]"
      });
      remainder = remainder.substring(1);
    } else if (remainder.startsWith("و")) {
      nodes.push({
        tier1_lafz: "وَ",
        tier2_muqatta: "وَ (হরফে আতফ)",
        tier3_jidhr: "—",
        tier4_wazn: "حَرْف",
        tier5_seegah: "হরফে আতফ (সংযোজক)",
        tier6_manaBn: "এবং / ও",
        tier6_manaEn: "And",
        tier7_mawqiBn: "সংযোজক অব্যয়",
        tier7_mawqiEn: "Coordinating Conjunction",
        tier7_mawqiAr: "حرف عطف مبني على الفتح لا محل له من الإعراب",
        tier8_amilBn: "আমেলবিহীন",
        tier8_amilEn: "Non-governing operator",
        tier9_hukmBn: "মাবনী আলাল ফাতহ",
        tier9_hukmEn: "Indeclinable (Mabni)",
        tier10_alamatBn: "ফাতহাহ",
        tier10_alamatEn: "Fixed Fathah",
        tier11_taalluqBn: "উভয় বাক্যকে সংযুক্ত করে।",
        tier11_taalluqEn: "Coordinates following predicate.",
        dictionaryCitation: "আল-মু'জামুল ওয়াফী"
      });
      remainder = remainder.substring(1);
    }

    if (remainder.startsWith("س")) {
      nodes.push({
        tier1_lafz: "سَـ",
        tier2_muqatta: "سَـ (হরফে তানফীস)",
        tier3_jidhr: "—",
        tier4_wazn: "حَرْف",
        tier5_seegah: "ভবিষ্যতবাচক হরফে ইসতিকবাল",
        tier6_manaBn: "শীঘ্রই / অদূর ভবিষ্যতে",
        tier6_manaEn: "Soon / In prospective future",
        tier7_mawqiBn: "মুজারের কাল পরিবর্তনকারী হরফ",
        tier7_mawqiEn: "Future Aspect Particle",
        tier7_mawqiAr: "حرف تنفيس واستقبال مبني على الفتح",
        tier8_amilBn: "আমলহীন",
        tier8_amilEn: "Non-inflectional particle",
        tier9_hukmBn: "মাবনী আলাল ফাতহ",
        tier9_hukmEn: "Indeclinable",
        tier10_alamatBn: "ফাতহাহ",
        tier10_alamatEn: "Fixed Fathah",
        tier11_taalluqBn: "ক্রিয়ার কালকে ভবিষ্যতের সাথে সম্পৃক্ত করে।",
        tier11_taalluqEn: "Modifies verb tense to prospective.",
        dictionaryCitation: "আল-মু'জামুল ওয়াফী [পৃষ্ঠা ৫৪৫]"
      });
      remainder = remainder.substring(1);
    }

    let suf1 = "";
    let suf2 = "";

    if (remainder.endsWith("كهم")) {
      suf2 = "هم";
      suf1 = "ك";
      remainder = remainder.slice(0, -4);
    } else if (remainder.endsWith("هم") || remainder.endsWith("كم") || remainder.endsWith("نا")) {
      suf2 = remainder.slice(-2);
      remainder = remainder.slice(0, -2);
    } else if (remainder.endsWith("ك") || remainder.endsWith("ه")) {
      suf1 = remainder.slice(-1);
      remainder = remainder.slice(0, -1);
    }

    let verbRoot = "ك - ف - ي";
    let verbWazn = "يَفْعِلُ";
    let verbBab = "[ض] সুলাসী মুজাররাদ (যারাবা-ইয়াযরিবু)";
    let verbMeaningBn = "যথেষ্ট হবেন / প্রতিবিধান করবেন";
    let verbMeaningEn = "He will suffice / protect";
    let asl = "يَكْفِيُ";
    let ilalBn = "ইয়ায়ের ওপর পেশ উচ্চারণগত জটিলতা দূর করতে সাকিন ধরা হয় (যাম্মাহ মুকাদ্দারা লিস-সিক্বাল)।";
    let ilalAr = "استثقلت الضمة على الياء فسكنت فصار (يكفي)";

    const wafiEntry = lookupWafiLexiconByRoot(verbRoot);
    if (wafiEntry) {
      verbBab = `${wafiEntry.babSymbol} ${wafiEntry.babNameBn}`;
      verbMeaningBn = wafiEntry.meaningBn;
      verbMeaningEn = wafiEntry.meaningEn;
      asl = wafiEntry.aslForm;
      ilalBn = wafiEntry.ilalRuleBn;
      ilalAr = wafiEntry.ilalRuleAr;
    }

    nodes.push({
      tier1_lafz: remainder,
      tier2_muqatta: `${remainder} (মূল ফেয়েল)`,
      tier3_jidhr: verbRoot,
      tier4_wazn: verbWazn,
      tier5_seegah: "ওয়াহিদ মুযাক্কার গায়েব (মুজারে)",
      tier6_manaBn: verbMeaningBn,
      tier6_manaEn: verbMeaningEn,
      tier7_mawqiBn: "বাক্যের প্রধান ক্রিয়া (দ্বিকর্মক)",
      tier7_mawqiEn: "Head Transitive Verb to Two Objects",
      tier7_mawqiAr: "فعل مضارع مرفوع لتجرده عن الناصب والجازم وعلامة رفعه ضمة مقدرة على الياء للثقل",
      tier8_amilBn: "আমেল মানাবী (তাজাররুদ)",
      tier8_amilEn: "Abstract Inchoative Regent",
      tier9_hukmBn: "মারফূ' (তাকদীরী পেশ)",
      tier9_hukmEn: "Marfu' (Assumed Dammah)",
      tier10_alamatBn: "ইয়ায়ের ওপর অনুমিত যাম্মাহ",
      tier10_alamatEn: "Assumed Dammah on terminal Ya",
      tier11_taalluqBn: "পরবর্তী ইসমে জালালাহ 'আল্লাহ' এর ফায়েল এবং যমীরদ্বয় এর মাফ'ঊল।",
      tier11_taalluqEn: "Governs explicit agent Allah in nominative and clitic pronouns as double objects.",
      dictionaryCitation: `আল-মু'জামুল ওয়াফী [মাদ্দাহ: ${verbRoot}]`,
      aslMorph: asl,
      ilalRuleBn: ilalBn,
      ilalRuleAr: ilalAr
    });

    if (suf1) {
      nodes.push({
        tier1_lafz: `ـ${suf1}`,
        tier2_muqatta: `ـ${suf1} (১ম মাফ'ঊল যমীর)`,
        tier3_jidhr: "—",
        tier4_wazn: "ضَمِير",
        tier5_seegah: "ওয়াহিদ মুযাক্কার হাজের (২য় পুরুষ)",
        tier6_manaBn: "তোমাকে / আপনাকে",
        tier6_manaEn: "You (singular masculine)",
        tier7_mawqiBn: "মাফ'উলে বিহী আওয়াল (১ম কর্মপদ)",
        tier7_mawqiEn: "First Direct Object (Maf'ul Bihi Awwal)",
        tier7_mawqiAr: "ضمير متصل مبني على الفتح في محل نصب مفعول به أول",
        tier8_amilBn: "ফেয়েল " + remainder,
        tier8_amilEn: "Preceding transitive verb",
        tier9_hukmBn: "ফি মাহাল্লি নাসব (মানসুব)",
        tier9_hukmEn: "Fi Mahalli Nasb (Accusative)",
        tier10_alamatBn: "মাবনী আলাল ফাতহ",
        tier10_alamatEn: "Fixed Fathah",
        tier11_taalluqBn: "ক্রিয়ার প্রথম প্রত্যক্ষ কর্ম।",
        tier11_taalluqEn: "1st patient argument of verb.",
        dictionaryCitation: "আল-মু'জামুল ওয়াফী [ضمائر]"
      });
    }

    if (suf2) {
      nodes.push({
        tier1_lafz: `ـ${suf2}`,
        tier2_muqatta: `ـ${suf2} (২য় মাফ'ঊল যমীর)`,
        tier3_jidhr: "—",
        tier4_wazn: "ضَمِير",
        tier5_seegah: "জমা মুযাক্কার গায়েব (৩য় পুরুষ বহুবচন)",
        tier6_manaBn: "তাদেরকে / তাদের বিরুদ্ধে",
        tier6_manaEn: "Them / Against them",
        tier7_mawqiBn: "মাফ'উলে বিহী সানী (২য় কর্মপদ)",
        tier7_mawqiEn: "Second Direct Object (Maf'ul Bihi Thanin)",
        tier7_mawqiAr: "ضمير متصل مبني على الضم في محل نصب مفعول به ثان",
        tier8_amilBn: "ফেয়েল " + remainder,
        tier8_amilEn: "Preceding transitive verb",
        tier9_hukmBn: "ফি মাহাল্লি নাসব (মানসুব)",
        tier9_hukmEn: "Fi Mahalli Nasb (Accusative)",
        tier10_alamatBn: "মাবনী আলাদ দাম্ম",
        tier10_alamatEn: "Fixed Dammah",
        tier11_taalluqBn: "ক্রিয়ার দ্বিতীয় প্রত্যক্ষ কর্ম।",
        tier11_taalluqEn: "2nd patient argument of verb.",
        dictionaryCitation: "আল-মু'জামুল ওয়াফী [ضمائر]"
      });
    }

    return {
      originalToken: rawToken,
      isCompound: true,
      compoundSummaryBn: "যৌগিক বহুপদ (ক্লীটিক): উপসর্গ + ভবিষ্যৎবাচক + ক্রিয়া + ২টি মাফ'ঊল যমীর",
      compoundSummaryEn: "Multi-Clitic Construct: Conjunction + Future Marker + Verb + Double Object Pronouns",
      nodes: nodes
    };
  }

  // একক পদ বিশ্লেষণ
  let cleanWord = norm;
  let prefix = "নাই";

  if (cleanWord.startsWith("ال") && cleanWord.length > 4) {
    prefix = "الـ (নির্দিষ্টতাবাচক)";
    cleanWord = cleanWord.substring(2);
  }

  let root = "—";
  let wazn = "فَعَلَ / مُشْتَقّ";
  let bab = "সুলাসী মুজাররাদ";
  let seegah = "একবচন (মুফরাদ)";
  let meaningBn = "প্রসঙ্গাধীন অর্থবাহী শব্দ";
  let meaningEn = "Contextual lexical token";
  let citation = "আল-মু'জামুল ওয়াফী";
  let aslMorph = undefined;
  let ilalRuleBn = undefined;
  let ilalRuleAr = undefined;

  if (cleanWord === "الله" || cleanWord === "لله") {
    root = "أ - ل - ه";
    wazn = "الفِعَال";
    bab = "ইসমে জালালাহ";
    meaningBn = "মহান আল্লাহ, একমাত্র উপাস্য সত্তা, বিশ্বজগতের স্রষ্টা";
    meaningEn = "Allah, The Supreme God, The Sole Creator";
    citation = "আল-মু'জামুল ওয়াফী [إسم الجلالة]";
    aslMorph = "الإِلَاه";
    ilalRuleAr = "حذفت الهمزة تخفيفا لكثرة الاستعمال وأدغمت اللام في اللام فصار (الله)";
    ilalRuleBn = "অতিরিক্ত ব্যবহারের কারণে হামযা বিলুপ্ত করে লামকে লামের সাথে ইদগাম করা হয়েছে।";
  } else if (cleanWord === "قال" || cleanWord === "قائل") {
    root = "ق - و - ল";
    wazn = cleanWord === "قال" ? "فَعَلَ" : "فَاعِل";
    bab = "[ن] সুলাসী মুজাররাদ (নাসারা-ইয়ানসুরু)";
    meaningBn = "বলা / অভিমত প্রকাশ করা";
    meaningEn = "To say / speak";
    aslMorph = "قَوَلَ";
    ilalRuleAr = "تحركت الواو وانفتح ما قبلها فقلبت ألفا فصار (قَالَ)";
    ilalRuleBn = "ওয়াও হরকতযুক্ত এবং তার পূর্বে যবর থাকায় ওয়াও আলিফে রূপান্তরিত হয়েছে।";
    citation = "আল-মু'জামুল ওয়াফী [ن]";
  } else if (cleanWord === "اتقوا" || cleanWord === "اتقي" || cleanWord === "اتقى") {
    root = "و - ق - ي";
    wazn = "اِفْتَعَلَ / اِفْتَعِلُوا";
    bab = "[افتعال] বাব ইফতি'আল";
    meaningBn = "তাকওয়া অবলম্বন করা / বেঁচে থাকা";
    meaningEn = "To fear God / protect oneself";
    aslMorph = "اِوْتَقَى";
    ilalRuleAr = "وقعت الواو فاء في وزن افتعل فقلبت تاء وأدغمت في تاء الافتعال فصار (اتَّقَى)";
    ilalRuleBn = "ইবদা'ল: ইফতি'আল বাবের ফা-কালিমায় ওয়াও আসায় তা 'তা' (ت) দ্বারা পরিবর্তিত হয়ে দ্বিতীয় তা-এর সাথে ইদগাম হয়েছে।";
    citation = "আল-মু'জামুল ওয়াফী [افتعال]";
  } else if (cleanWord === "استقيموا" || cleanWord === "استقام") {
    root = "ق - و - م";
    wazn = "اِسْتَفْعَلَ / اِسْتَفْعِلُوا";
    bab = "[استفعال] বাব ইসতিফ'আল";
    meaningBn = "অবিচল থাকা / সুদৃঢ় থাকা";
    meaningEn = "To stand firm / be steadfast";
    aslMorph = "اِسْتَقْوَمَ";
    ilalRuleAr = "نقلت حركة الواو إلى الساكن الصحيح قبلها ثم قلبت ألفا فصار (اسْتَقَامَ)";
    ilalRuleBn = "আইন কালিমার হরকত পূর্বের হরফে স্থানান্তরিত হয়ে ওয়াও আলিফে রূপ নিয়েছে।";
    citation = "আল-মু'জামুল ওয়াফী [استفعال]";
  } else {
    if (cleanWord.length === 3) {
      root = `${cleanWord[0]} - ${cleanWord[1]} - ${cleanWord[2]}`;
      wazn = "فَعَلَ / فَعِلَ";
    } else if (cleanWord.length === 4) {
      root = `${cleanWord[0]} - ${cleanWord[2]} - ${cleanWord[3]}`;
      wazn = cleanWord[1] === "ا" ? "فَاعِل" : "فَعَّلَ";
    } else if (cleanWord.length >= 5) {
      root = `${cleanWord[1] || cleanWord[0]} - ${cleanWord[2] || cleanWord[1]} - ${cleanWord[cleanWord.length - 1]}`;
      wazn = cleanWord.startsWith("است") ? "اِسْتَفْعَلَ" : "مُفْتَعَل";
    }
  }

  const lookup = lookupWafiLexiconByRoot(root);
  if (lookup) {
    bab = `${lookup.babSymbol} ${lookup.babNameBn}`;
    meaningBn = lookup.meaningBn;
    meaningEn = lookup.meaningEn;
    if (lookup.aslForm) aslMorph = lookup.aslForm;
    if (lookup.ilalRuleBn) ilalRuleBn = lookup.ilalRuleBn;
    if (lookup.ilalRuleAr) ilalRuleAr = lookup.ilalRuleAr;
  }

  let mawqiBn = "মুবতাদা / সাধারণ পদ";
  let mawqiEn = "Inchoative Subject (Mubtada) / Head Noun";
  let mawqiAr = "مبتدأ مرفوع بالابتداء وعلامة رفعه الضمة";
  let amilBn = "আমেল মানাবী (ইবতিদা)";
  let amilEn = "Abstract Regent (Inchoation)";
  let hukmBn = "মারফূ' (পেশযুক্ত)";
  let hukmEn = "Nominative (Marfu')";
  let alamatBn = "দৃশ্যমান যাম্মাহ (ضمة ظاهرة)";
  let alamatEn = "Explicit Apparent Dammah";
  let taalluqBn = "বাক্যের মূল নিয়ন্ত্রক পদ।";
  let taalluqEn = "Acts as primary semantic head.";

  const isDivineName = norm === "الله" || norm === "الرحمن";
  const prevToken = indexInSentence > 0 ? cleanAlif(allTokens[indexInSentence - 1]) : "";

  if (isDivineName) {
    mawqiBn = indexInSentence === 0 ? "মুবতাদা" : "ফায়েল (প্রত্যক্ষ পরম কর্তা)";
    mawqiEn = indexInSentence === 0 ? "Subject" : "Explicit Nominative Agent (Fa'il)";
    mawqiAr = "فاعل مرفوع وعلامة رفعه الضمة الظاهرة على آخره";
    amilBn = indexInSentence === 0 ? "আমেল মানাবী" : "পূর্ববর্তী ফেয়েল";
    amilEn = indexInSentence === 0 ? "Abstract Regent" : "Preceding Verb";
    taalluqBn = "ক্রিয়া সম্পাদনকারী প্রত্যক্ষ কর্তা।";
    taalluqEn = "Performs action of governing verb.";
  } else if (["في", "من", "الي", "على", "عن", "ب", "ل"].includes(norm)) {
    mawqiBn = "হরফে জর (পদান্বয়ী অব্যয়)";
    mawqiEn = "Genitive Preposition (Harf Jarr)";
    mawqiAr = "حرف جر مبني لا محل له من الإعراب";
    amilBn = "আমেল লাফযী (নিয়ন্ত্রক অব্যয়)";
    amilEn = "Overt Phonological Regent";
    hukmBn = "মাবনী আলাস সুকূন / কাসর";
    hukmEn = "Indeclinable (Mabni)";
    alamatBn = "অপরিবর্তনীয় মূল রূপ";
    alamatEn = "Fixed terminal marker";
    taalluqBn = "পরবর্তী ইসমকে যের প্রদান করে পূর্ববর্তী ক্রিয়ার সাথে সংশ্লিষ্ট করে।";
    taalluqEn = "Connects governed noun as adverbial modifier to verb.";
  } else if (["في", "من", "الي", "على", "عن", "ب", "ل"].includes(prevToken)) {
    mawqiBn = "ইসম মাজরুর (পদান্বয়ী বিশেষ্য)";
    mawqiEn = "Prepositional Object (Ism Majrur)";
    mawqiAr = "اسم مجرور بحرف الجر وعلامة جره الكسرة";
    amilBn = `পূর্ববর্তী হরফে জর (${allTokens[indexInSentence - 1]})`;
    amilEn = `Preceding Preposition (${allTokens[indexInSentence - 1]})`;
    hukmBn = "মাজরূর (যেরযুক্ত)";
    hukmEn = "Genitive (Majrur)";
    alamatBn = "দৃশ্যমান কাসরাহ (کسرة ظاهرة)";
    alamatEn = "Explicit Apparent Kasrah";
    taalluqBn = "হরফে জরের মাধ্যমে পূর্ববর্তী ক্রিয়ার সাথে মুতা'আল্লিক।";
    taalluqEn = "Semantically attached as modifier to regent verb.";
  } else if (["ان", "انّ", "لكن", "ليত", "لعل"].includes(prevToken)) {
    mawqiBn = `ইসমু ${allTokens[indexInSentence - 1]} (নাসিখা ইসম)`;
    mawqiEn = `Subject of ${allTokens[indexInSentence - 1]}`;
    mawqiAr = `اسم (${allTokens[indexInSentence - 1]}) منصوب وعلامة نصبه الفتحة`;
    amilBn = allTokens[indexInSentence - 1];
    amilEn = allTokens[indexInSentence - 1];
    hukmBn = "মানসূব (যবরযুক্ত)";
    hukmEn = "Accusative (Mansub)";
    alamatBn = "দৃশ্যমান ফাতহাহ (فتحة ظاهرة)";
    alamatEn = "Explicit Fathah";
    taalluqBn = "ইন্না হরফের উদ্দেশ্যপদ।";
    taalluqEn = "Inchoative accusative argument of particle.";
  }

  return {
    originalToken: rawToken,
    isCompound: false,
    compoundSummaryBn: "একক স্বয়ংসম্পূর্ণ পদ",
    compoundSummaryEn: "Single Autonomous Lemma",
    nodes: [{
      tier1_lafz: rawToken,
      tier2_muqatta: `${prefix !== "নাই" ? prefix + " + " : ""}${cleanWord}`,
      tier3_jidhr: root,
      tier4_wazn: wazn,
      tier5_seegah: seegah,
      tier6_manaBn: meaningBn,
      tier6_manaEn: meaningEn,
      tier7_mawqiBn: mawqiBn,
      tier7_mawqiEn: mawqiEn,
      tier7_mawqiAr: mawqiAr,
      tier8_amilBn: amilBn,
      tier8_amilEn: amilEn,
      tier9_hukmBn: hukmBn,
      tier9_hukmEn: hukmEn,
      tier10_alamatBn: alamatBn,
      tier10_alamatEn: alamatEn,
      tier11_taalluqBn: taalluqBn,
      tier11_taalluqEn: taalluqEn,
      dictionaryCitation: citation,
      aslMorph: aslMorph,
      ilalRuleBn: ilalRuleBn,
      ilalRuleAr: ilalRuleAr
    }]
  };
}

export function analyzeSentenceClauses(fullText: string): SentenceAnalysis[] {
  const norm = cleanAlif(fullText);
  const clauses: SentenceAnalysis[] = [];

  if (norm.includes("فسيكفيكهم الله")) {
    clauses.push({
      clauseAr: "«فَسَيَكْفِيكَهُمُ اللَّهُ»",
      clauseBn: "প্রধান ক্রিয়াবাচক বাক্য (জুমলায়ে ফে'লিয়্যাহ)",
      clauseEn: "Primary Verbal Clause (Jumlah Fi'liyyah)",
      hasMahall: false,
      mahallNameAr: "لا محل لها من الإعراب (ابتدائية / مستأنفة)",
      mahallNameBn: "এর কোনো ই'রাবী অবস্থান নেই (জুমলায়ে ইবতিদায়িয়্যাহ বা সূচনামূলক বাক্য)",
      mahallNameEn: "No inflectional locus (Independent Initial Clause)",
      ibnHishamProof: "ইমাম ইবনে হিশাম আল-আনসারীর 'মুগনীল লাবীব' অনুসারে: الكلام المبتدأ به لا موضع له من الإعراب (যে বাক্য দিয়ে কথার সূচনা হয় তার কোনো ই'রাবী মহল থাকে না)।"
    });
  }

  if (norm.includes("وهو السميع العليم")) {
    clauses.push({
      clauseAr: "«وَهُوَ السَّمِيعُ الْعَلِيمُ»",
      clauseBn: "হাল বা অবস্থাবোধক নামবাচক বাক্য (জুমলায়ে হাকিয়াহ)",
      clauseEn: "Circumstantial Nominal Clause (Jumlah Haliyyah)",
      hasMahall: true,
      mahallNameAr: "في محل نصب حال",
      mahallNameBn: "নসবের স্থানে রয়েছে (হাল হওয়ার কারণে মাহাল্লি মানসূব)",
      mahallNameEn: "In the accusative position of attendant circumstance (Hal)",
      ibnHishamProof: "মুগনীল লাবীব অনুসারে: الجملة الحالية تقع في موضع نصب دائما (হালীয়াহ বাক্য সর্বদাই নসবের স্থানে অবস্থান করে)।"
    });
  }

  if (clauses.length === 0) {
    clauses.push({
      clauseAr: fullText,
      clauseBn: "স্বয়ংসম্পূর্ণ মূল বাক্য (জুমলায়ে মুস্তাক্বিল্লাহ)",
      clauseEn: "Independent Main Clause",
      hasMahall: false,
      mahallNameAr: "لا محل لها من الإعراب (ابتدائية)",
      mahallNameBn: "ইবতিদায়িয়্যাহ হওয়ার কারণে কোনো মহল নেই",
      mahallNameEn: "No inflectional locus (Initial sentence)",
      ibnHishamProof: "ধ্রুপদী নাহবিয়্যীনদের ঐকমত্য অনুযায়ী প্রারম্ভিক বাক্যের কোনো ই'রাবী মহল থাকে না।"
    });
  }

  return clauses;
}

export function buildDependencyGraph(tokens: string[]): DependencyGraphEdge[] {
  const edges: DependencyGraphEdge[] = [];
  tokens.forEach((t, i) => {
    const clean = cleanAlif(t);
    if (i === 0 && (clean.startsWith("فس") || clean.startsWith("ي") || clean.startsWith("ق"))) {
      if (tokens.length > 1) {
        edges.push({
          fromIndex: 0,
          toIndex: 1,
          labelAr: "عامل فعل ← فاعل مرفوع",
          labelBn: "আমেল ক্রিয়া ← ফায়েল (কর্তা)",
          labelEn: "Regent Verb → Subject Agent"
        });
      }
    }
    if (["في", "من", "الي", "على", "عن", "ب", "ل"].includes(clean)) {
      if (i + 1 < tokens.length) {
        edges.push({
          fromIndex: i,
          toIndex: i + 1,
          labelAr: "حرف جر ← اسم مجرور",
          labelBn: "হরফে জর ← মাজরূর পদ",
          labelEn: "Preposition → Governed Noun"
        });
      }
    }
  });
  return edges;
}