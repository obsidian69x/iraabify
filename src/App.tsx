import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { SplashScreen } from './components/SplashScreen';
import { FounderModal } from './components/FounderModal';
import { DependencyTree } from './components/DependencyTree';
import { 
  analyze11TierPipeline, 
  analyzeSentenceClauses,
  buildDependencyGraph, 
  CompoundTahqiqResult, 
  SentenceAnalysis,
  DependencyGraphEdge 
} from './utils/grammarEngine';

interface DeepHistoryEntry {
  category: string;
  period: string;
  title: string;
  thesis: string;
  dalil_ar: string;
  dalil_ref: string;
  tashrih: string;
  academic_notes: string;
}

export default function App() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [showSplash, setShowSplash] = useState(true);
  const [showFounder, setShowFounder] = useState(false);
  const [activeTab, setActiveTab] = useState<'tahqiq' | 'tarqeeb' | 'ilal' | 'jumal' | 'tree' | 'history' | 'lexicon'>('tahqiq');
  const [inputText, setInputText] = useState("فَسَيَكْفِيكَهُمُ اللَّهُ وَهُوَ السَّمِيعُ الْعَلِيمُ");

  const [tahqiqResults, setTahqiqResults] = useState<CompoundTahqiqResult[]>(() => {
    const tokens = "فَسَيَكْفِيكَهُمُ اللَّهُ وَهُوَ السَّمِيعُ الْعَلِيمُ".trim().split(/\s+/);
    return tokens.map((tk, idx) => analyze11TierPipeline(tk, idx, tokens));
  });

  const [clauseAnalyses, setClauseAnalyses] = useState<SentenceAnalysis[]>(() => {
    return analyzeSentenceClauses("فَسَيَكْفِيكَهُمُ اللَّهُ وَهُوَ السَّمِيعُ الْعَلِيمُ");
  });

  const [graphEdges, setGraphEdges] = useState<DependencyGraphEdge[]>(() => {
    return buildDependencyGraph("فَسَيَكْفِيكَهُمُ اللَّهُ وَهُوَ السَّمِيعُ الْعَلِيمُ".trim().split(/\s+/));
  });

  const handleExecute = () => {
    if (!inputText.trim()) return;
    const tokens = inputText.trim().split(/\s+/);
    setTahqiqResults(tokens.map((tk, idx) => analyze11TierPipeline(tk, idx, tokens)));
    setClauseAnalyses(analyzeSentenceClauses(inputText));
    setGraphEdges(buildDependencyGraph(tokens));
  };

  const currentTokens = inputText.trim().split(/\s+/);
  const historyRaw = t('history_items', { returnObjects: true });
  const deepEntries: DeepHistoryEntry[] = Array.isArray(historyRaw) ? historyRaw : [];

  return (
    <div className="min-h-screen bg-[#f4ecdc] text-[#22180d] font-siliguri flex flex-col selection:bg-[#9b722b]/25">
      <AnimatePresence>
        {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      </AnimatePresence>

      <FounderModal isOpen={showFounder} onClose={() => setShowFounder(false)} />

      {/* Navigation Header */}
      <header className="bg-[#fdfaf3] border-b-2 border-[#8c6d46] px-6 py-3 sticky top-0 z-40 shadow-sm flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-6">
          <div>
            <h1 className="font-cinzel text-xl font-bold text-[#614614] tracking-wide">{t('title')}</h1>
            <p className="text-xs text-[#5e4c36]">{t('subtitle')}</p>
          </div>

          <div className="flex bg-[#f7edd9] p-1 rounded border border-[#c7b299] flex-wrap gap-1">
            <button
              onClick={() => setActiveTab('tahqiq')}
              className={`px-3 py-1.5 text-xs font-bold rounded transition-all cursor-pointer ${activeTab === 'tahqiq' ? 'bg-[#9b722b] text-white shadow-sm' : 'text-[#614614] hover:bg-[#ede0c5]'}`}
            >
              📖 ১১-স্তরী তাহকীক
            </button>
            <button
              onClick={() => setActiveTab('tarqeeb')}
              className={`px-3 py-1.5 text-xs font-bold rounded transition-all cursor-pointer ${activeTab === 'tarqeeb' ? 'bg-[#9b722b] text-white shadow-sm' : 'text-[#614614] hover:bg-[#ede0c5]'}`}
            >
              ⚖️ শাস্ত্রীয় তারকীব
            </button>
            <button
              onClick={() => setActiveTab('ilal')}
              className={`px-3 py-1.5 text-xs font-bold rounded transition-all cursor-pointer ${activeTab === 'ilal' ? 'bg-[#9b722b] text-white shadow-sm' : 'text-[#614614] hover:bg-[#ede0c5]'}`}
            >
              🔬 তালীলাত ও ইবদাল
            </button>
            <button
              onClick={() => setActiveTab('jumal')}
              className={`px-3 py-1.5 text-xs font-bold rounded transition-all cursor-pointer ${activeTab === 'jumal' ? 'bg-[#9b722b] text-white shadow-sm' : 'text-[#614614] hover:bg-[#ede0c5]'}`}
            >
              📜 জুমলার ই'রাব
            </button>
            <button
              onClick={() => setActiveTab('tree')}
              className={`px-3 py-1.5 text-xs font-bold rounded transition-all cursor-pointer ${activeTab === 'tree' ? 'bg-[#9b722b] text-white shadow-sm' : 'text-[#614614] hover:bg-[#ede0c5]'}`}
            >
              🌳 ডিপেন্ডেন্সি ট্রি
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-3 py-1.5 text-xs font-bold rounded transition-all cursor-pointer ${activeTab === 'history' ? 'bg-[#9b722b] text-white shadow-sm' : 'text-[#614614] hover:bg-[#ede0c5]'}`}
            >
              🏛️ প্রামাণ্য ইতিহাস
            </button>
            <button
              onClick={() => setActiveTab('lexicon')}
              className={`px-3 py-1.5 text-xs font-bold rounded transition-all cursor-pointer ${activeTab === 'lexicon' ? 'bg-[#9b722b] text-white shadow-sm' : 'text-[#614614] hover:bg-[#ede0c5]'}`}
            >
              📊 ওয়াফী অভিধান
            </button>
          </div>
        </div>

        {/* Founder Button & Language Switcher */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFounder(true)}
            className="px-3 py-1 text-xs font-bold rounded border border-[#9b722b] bg-[#f7edd9] text-[#614614] hover:bg-[#9b722b] hover:text-white transition-all cursor-pointer shadow-xs"
          >
            👤 Founder
          </button>

          <div className="flex gap-1 border-l border-[#c7b299] pl-2">
            {[
              { code: 'bn', label: 'বাংলা' },
              { code: 'en', label: 'English' },
              { code: 'ar', label: 'العربية' }
            ].map(l => (
              <button
                key={l.code}
                onClick={() => i18n.changeLanguage(l.code)}
                className={`px-2.5 py-1 text-xs font-semibold rounded border transition-all cursor-pointer ${lang === l.code ? 'bg-[#9b722b] text-white border-[#614614] shadow-xs' : 'bg-[#f7edd9] text-[#614614] border-[#c7b299] hover:bg-[#ede0c5]'}`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="max-w-6xl w-full mx-auto p-6 flex-1 flex flex-col gap-6">
        
        {/* Input Box */}
        <div className="bg-[#fdfaf3] border border-[#8c6d46] p-5 rounded shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-[#8c6d46] uppercase tracking-wider">
              {lang === 'bn' ? 'আরবি বাক্য বা আয়াত প্রবেশ করান:' : lang === 'ar' ? 'أدخل الآية أو العبارة العربية:' : 'Enter Arabic Sentence or Ayah:'}
            </span>
            <div className="flex gap-2">
              <button onClick={() => setInputText("فَسَيَكْفِيكَهُمُ اللَّهُ وَهُوَ السَّمِيعُ الْعَلِيمُ")} className="text-xs px-2.5 py-1 bg-[#f7edd9] text-[#614614] rounded border border-[#c7b299] cursor-pointer hover:bg-[#ede0c5]">কুরআনিক আয়াত</button>
              <button onClick={() => setInputText("إِنَّ طَالِبَ العِلْمِ صَالِحٌ")} className="text-xs px-2.5 py-1 bg-[#f7edd9] text-[#614614] rounded border border-[#c7b299] cursor-pointer hover:bg-[#ede0c5]">জুমলায়ে ইসমিয়্যাহ</button>
              <button onClick={() => setInputText("قَالَ اتَّقُوا اللَّهَ وَاسْتَقِيمُوا")} className="text-xs px-2.5 py-1 bg-[#f7edd9] text-[#614614] rounded border border-[#c7b299] cursor-pointer hover:bg-[#ede0c5]">মু'তাল (দুর্বল বর্ণ)</button>
            </div>
          </div>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            dir="rtl"
            className="w-full bg-[#fcf8f0] border border-[#c7b299] p-4 text-3xl font-amiri rounded focus:border-[#9b722b] outline-none min-h-[90px] leading-relaxed"
            placeholder={t('scribe_placeholder')}
          />
          <button
            onClick={handleExecute}
            className="mt-3 w-full py-3 bg-[#9b722b] hover:bg-[#755217] text-white font-bold rounded shadow transition-all tracking-wide cursor-pointer text-sm"
          >
            {t('btn_analyze')} ➔
          </button>
        </div>

        {/* TAB 1: 11-TIER TAHQIQ */}
        {activeTab === 'tahqiq' && (
          <div className="flex flex-col gap-4">
            <div className="bg-[#fdfaf3] border-l-4 border-[#9b722b] p-4 rounded border border-[#c7b299]/60 flex justify-between items-center flex-wrap gap-2">
              <div>
                <h2 className="text-lg font-bold text-[#614614]">
                  {lang === 'bn' ? '📖 মাস্টার ১১-স্তরী তাহকীক ড্যাশবোর্ড (Master 11-Tier Framework)' : lang === 'ar' ? '📖 منظومة التحقيق الصرفي ذات المستويات الأحد عشر' : '📖 Master 11-Tier Morphosyntactic Framework'}
                </h2>
                <p className="text-xs text-[#5e4c36] mt-0.5">
                  শব্দমূল (جذر), ওজন (ميزان), আল-মু'জামুল ওয়াফীর বাবের প্রতীক [ن, ض, س], মাছদার ও দ্বৈত ভাষার অনুবাদ।
                </p>
              </div>
              <span className="text-xs px-2.5 py-1 bg-[#f7edd9] text-[#614614] border border-[#c7b299] rounded font-semibold">
                অভিধান: আল-মু'জামুল ওয়াফী [ড. ফজলুর রহমান]
              </span>
            </div>

            {tahqiqResults.map((res, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-[#fdfaf3] border border-[#c7b299] p-5 rounded shadow-sm flex flex-col gap-4"
              >
                <div className="flex justify-between items-center border-b border-[#c7b299]/50 pb-3">
                  <div>
                    <span className="font-amiri text-4xl font-bold text-[#2b1f11]">{res.originalToken}</span>
                    <span className="ml-3 text-xs text-[#8f2222] font-semibold">
                      [{lang === 'en' ? res.compoundSummaryEn : res.compoundSummaryBn}]
                    </span>
                  </div>
                  <span className="text-xs px-2.5 py-1 bg-[#9b722b]/10 border border-[#9b722b] text-[#614614] rounded font-bold">
                    {res.isCompound ? (lang === 'en' ? "Compound Morph" : "যৌগিক পদ") : (lang === 'en' ? "Single Morph" : "একক পদ")}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {res.nodes.map((node, nIdx) => (
                    <div key={nIdx} className="bg-[#f7f1e3]/70 border border-[#c7b299]/60 p-3.5 rounded flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-baseline mb-2 border-b border-[#c7b299]/30 pb-1.5">
                          <span className="font-amiri text-2xl font-bold text-[#8f2222]">{node.tier1_lafz}</span>
                          <span className="text-[11px] px-2 py-0.5 bg-white border border-[#c7b299] rounded font-semibold text-[#614614]">
                            {node.tier2_muqatta}
                          </span>
                        </div>
                        
                        <div className="text-xs space-y-1 text-[#22180d]">
                          {node.tier3_jidhr !== "—" && (
                            <div>
                              <span className="text-[#8a7358]">শব্দমূল (মাদ্দাহ/جذر):</span>{' '}
                              <strong className="font-amiri text-lg text-[#8f2222]">{node.tier3_jidhr}</strong>
                            </div>
                          )}
                          {node.tier4_wazn !== "حَرْف" && node.tier4_wazn !== "ضَمِير" && (
                            <div>
                              <span className="text-[#8a7358]">ওযন (الميزان):</span>{' '}
                              <strong className="font-amiri text-base text-[#274060]">{node.tier4_wazn}</strong>
                            </div>
                          )}
                          <div>
                            <span className="text-[#8a7358]">সীগাহ ও রূপ:</span>{' '}
                            <strong>{node.tier5_seegah}</strong>
                          </div>
                          <div>
                            <span className="text-[#8a7358]">অভিধান ও বাব:</span>{' '}
                            <strong className="text-[#614614]">{node.dictionaryCitation}</strong>
                          </div>
                        </div>
                      </div>

                      <div className="mt-2.5 pt-2 border-t border-[#c7b299]/50 text-xs">
                        <div className="text-[#1e5e3a] font-bold">
                          বাংলা অর্থ [ওয়াফী]: {node.tier6_manaBn}
                        </div>
                        {lang === 'en' && (
                          <div className="text-[#274060] font-semibold mt-0.5">
                            English: {node.tier6_manaEn}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* TAB 2: TARQEEB & GOVERNANCE */}
        {activeTab === 'tarqeeb' && (
          <div className="flex flex-col gap-4">
            <div className="bg-[#fdfaf3] border-l-4 border-[#8f2222] p-4 rounded border border-[#c7b299]/60">
              <h2 className="text-lg font-bold text-[#8f2222]">
                {lang === 'bn' ? '⚖️ ধ্রুপদী নাহবী তারকীব ও ই\'রাব ড্যাশবোর্ড (Operator Theory)' : lang === 'ar' ? '⚖️ لوحة التركيب النحوي والإعراب المفصل وفق نظرية العامل' : '⚖️ Classical Syntactic Tarqeeb & Operator Governance'}
              </h2>
              <p className="text-xs text-[#5e4c36] mt-0.5">
                আমেল-মামূল তত্ত্ব (Operator Theory), মারফূ'আত, মানসূবাত, এবং মুতা'আল্লাক সম্পর্ক।
              </p>
            </div>

            {tahqiqResults.map((res, idx) => (
              <div key={idx} className="flex flex-col gap-3">
                {res.nodes.map((node, nIdx) => (
                  <motion.div
                    key={nIdx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: nIdx * 0.04 }}
                    className="bg-[#fdfaf3] border border-[#c7b299] p-5 rounded shadow-sm"
                  >
                    <div className="flex justify-between items-baseline border-b border-[#c7b299]/50 pb-3 mb-3">
                      <div>
                        <span className="font-amiri text-3xl font-bold text-[#2b1f11]">{node.tier1_lafz}</span>
                        <span className="ml-3 text-xs text-[#8f2222] font-semibold">
                          [{node.tier2_muqatta}]
                        </span>
                      </div>
                      <span className="text-xs px-3 py-1 bg-[#8f2222]/10 border border-[#8f2222] text-[#8f2222] rounded font-bold">
                        {lang === 'en' ? node.tier9_hukmEn : node.tier9_hukmBn}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm bg-[#f7f1e3]/60 p-4 rounded border border-[#c7b299]/40 mb-3">
                      <div>
                        <span className="text-xs text-[#8a7358]">১. তারকীবী অবস্থান (الموقع الإعرابي):</span>
                        <strong className="font-bold text-[#8f2222] block text-base mt-0.5">
                          {lang === 'en' ? node.tier7_mawqiEn : node.tier7_mawqiBn}
                        </strong>
                      </div>
                      <div>
                        <span className="text-xs text-[#8a7358]">২. নিয়ন্ত্রক শাসক আমেল (العامل):</span>
                        <strong className="font-semibold text-[#274060] block mt-0.5">
                          {lang === 'en' ? node.tier8_amilEn : node.tier8_amilBn}
                        </strong>
                      </div>
                      <div>
                        <span className="text-xs text-[#8a7358]">৩. ই'রাবের আলামত (العلامة):</span>
                        <strong className="font-semibold text-[#22180d] block mt-0.5">
                          {lang === 'en' ? node.tier10_alamatEn : node.tier10_alamatBn}
                        </strong>
                      </div>
                      <div className="md:col-span-3">
                        <span className="text-xs text-[#8a7358]">৪. মুতা'আল্লাক ও ডিপেন্ডেন্সি (التعلق النحوي والأثر):</span>
                        <span className="text-xs italic text-[#5e4c36] block mt-0.5">
                          {lang === 'en' ? node.tier11_taalluqEn : node.tier11_taalluqBn}
                        </span>
                      </div>
                    </div>

                    <div className="bg-[#faf4e8] border-r-4 border-[#9b722b] p-3 rounded">
                      <div className="font-amiri text-xl text-[#2b1f11] font-semibold text-right leading-relaxed" dir="rtl">
                        {node.tier7_mawqiAr}
                      </div>
                      <div className="text-xs text-[#5e4c36] border-t border-[#c7b299]/40 pt-1.5 mt-1.5">
                        {lang === 'en' 
                          ? `Functions as ${node.tier7_mawqiEn}, governed by ${node.tier8_amilEn} in ${node.tier9_hukmEn} case (${node.tier10_alamatEn}).`
                          : `পদটি বাক্যে ${node.tier7_mawqiBn} হিসেবে আমেল ${node.tier8_amilBn} দ্বারা নিয়ন্ত্রিত হয়ে ${node.tier9_hukmBn} অবস্থায় রয়েছে।`}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: I'LAL & IBDAL LABORATORY */}
        {activeTab === 'ilal' && (
          <div className="flex flex-col gap-4">
            <div className="bg-[#fdfaf3] border-l-4 border-[#1e5e3a] p-4 rounded border border-[#c7b299]/60">
              <h2 className="text-lg font-bold text-[#1e5e3a]">
                🔬 তালীলাত ও ইবদাল ল্যাবরেটরি (I'lāl & Ibdāl Structural Engine)
              </h2>
              <p className="text-xs text-[#5e4c36] mt-0.5">
                দুর্বল বর্ণ (মো'তাল) ও বাবের কারণে মূল হরফের রূপান্তর, বিলোপন এবং ইদগামের নিখুঁত গাণিতিক সূত্র।
              </p>
            </div>

            {tahqiqResults.map((res, idx) => (
              <div key={idx} className="flex flex-col gap-3">
                {res.nodes.map((node, nIdx) => (
                  <motion.div
                    key={nIdx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#fdfaf3] border border-[#c7b299] p-5 rounded shadow-sm"
                  >
                    <div className="flex justify-between items-center border-b border-[#c7b299]/40 pb-3 mb-3">
                      <div>
                        <span className="font-amiri text-3xl font-bold text-[#2b1f11]">{node.tier1_lafz}</span>
                        <span className="ml-3 text-xs text-[#8a7358]">ধাতু: <strong className="font-amiri text-lg text-[#8f2222]">{node.tier3_jidhr}</strong></span>
                      </div>
                      <span className="text-xs px-3 py-1 bg-[#1e5e3a]/10 text-[#1e5e3a] border border-[#1e5e3a] rounded font-bold">
                        {node.aslMorph ? "তালীল বিদ্যমান" : "সহীহ সালেম"}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm bg-[#f7f1e3]/60 p-4 rounded border border-[#c7b299]/40">
                      <div>
                        <span className="text-xs text-[#8a7358]">১. প্রাচীন মূল রূপ (الأصل الصرفي):</span>
                        <strong className="font-amiri text-2xl text-[#8f2222] block mt-1">
                          {node.aslMorph || node.tier1_lafz}
                        </strong>
                      </div>
                      <div>
                        <span className="text-xs text-[#8a7358]">২. চূড়ান্ত বর্তমান রূপ (النتيجة بعد الإعلال):</span>
                        <strong className="font-amiri text-2xl text-[#1e5e3a] block mt-1">
                          {node.tier1_lafz}
                        </strong>
                      </div>
                      <div>
                        <span className="text-xs text-[#8a7358]">৩. তালীলের প্রকার (نوع الإعلال):</span>
                        <strong className="text-[#614614] block mt-1 text-sm">
                          {node.aslMorph ? "إعلال بالقلب / بالنقل / بالحذف" : "লা তালীল (সহীহ)"}
                        </strong>
                      </div>
                      <div className="md:col-span-3 border-t border-[#c7b299]/30 pt-3 mt-1">
                        <span className="text-xs text-[#8a7358] block mb-1">৪. প্রযোজ্য শাস্ত্রীয় কায়েদা ও বিধান:</span>
                        <div className="font-amiri text-lg text-[#2b1f11] text-right" dir="rtl">
                          {node.ilalRuleAr || "صحيح سالم سلمت أصوله من التغيير الصرفي."}
                        </div>
                        <div className="text-xs text-[#5e4c36] mt-1">
                          {node.ilalRuleBn || "এই পদে কোনো দুর্বল হরফের রূপান্তর বা বিলোপন ঘটেনি; এটি তার মৌলিক সহীহ অবস্থায় প্রতিষ্ঠিত।"}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: JUMAL / CLAUSE I'RAB (MUGHNI AL-LABIB) */}
        {activeTab === 'jumal' && (
          <div className="flex flex-col gap-4">
            <div className="bg-[#fdfaf3] border-l-4 border-[#274060] p-4 rounded border border-[#c7b299]/60">
              <h2 className="text-lg font-bold text-[#274060]">
                📜 জুমলার ই'রাব ও বিশ্লেষণ (I'rāb al-Jumal - Mughnī al-Labīb)
              </h2>
              <p className="text-xs text-[#5e4c36] mt-0.5">
                ইমাম ইবনে হিশাম আল-আনসারীর রূপরেখা অনুযায়ী কোন বাক্যের ই'রাবী মহল আছে এবং কোন বাক্যের মহল নেই তার প্রামাণ্য বিশ্লেষণ।
              </p>
            </div>

            {clauseAnalyses.map((cl, cIdx) => (
              <motion.div
                key={cIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#fdfaf3] border border-[#c7b299] p-5 rounded shadow-sm flex flex-col gap-3"
              >
                <div className="flex justify-between items-center border-b border-[#c7b299]/40 pb-3">
                  <span className="font-amiri text-2xl font-bold text-[#2b1f11]">{cl.clauseAr}</span>
                  <span className={`text-xs px-3 py-1 rounded font-bold border ${cl.hasMahall ? 'bg-[#1e5e3a]/10 border-[#1e5e3a] text-[#1e5e3a]' : 'bg-[#8f2222]/10 border-[#8f2222] text-[#8f2222]'}`}>
                    {cl.hasMahall ? "جملة لها محل من الإعراب" : "جملة لا محل لها من الإعراب"}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm bg-[#f7f1e3]/60 p-4 rounded border border-[#c7b299]/40">
                  <div>
                    <span className="text-xs text-[#8a7358]">১. জুমলার প্রকার:</span>
                    <strong className="text-[#614614] block mt-0.5 text-base">
                      {lang === 'en' ? cl.clauseEn : cl.clauseBn}
                    </strong>
                  </div>
                  <div>
                    <span className="text-xs text-[#8a7358]">২. ই'রাবী মহল ও হুকুম:</span>
                    <strong className="font-amiri text-lg text-[#8f2222] block mt-0.5" dir="rtl">
                      {cl.mahallNameAr}
                    </strong>
                  </div>
                  <div className="md:col-span-2 border-t border-[#c7b299]/30 pt-2.5 mt-1">
                    <span className="text-xs text-[#8a7358] block mb-1">৩. মুগনীল লাবীবের শাস্ত্রীয় প্রমাণ ও তাশরীহ:</span>
                    <p className="text-xs text-[#3d2e1e] leading-relaxed italic">
                      {cl.ibnHishamProof}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* TAB 5: DEPENDENCY TREE */}
        {activeTab === 'tree' && (
          <DependencyTree tokens={currentTokens} edges={graphEdges} />
        )}

        {/* TAB 6: SCRIPTURAL HISTORY */}
        {activeTab === 'history' && (
          <div className="flex flex-col gap-6">
            <div className="bg-[#fdfaf3] border border-[#8c6d46] p-6 rounded shadow-sm">
              <h2 className="text-2xl font-bold text-[#614614]">{t('history_title')}</h2>
              <p className="text-sm text-[#5e4c36] mt-1">{t('history_subtitle')}</p>
            </div>

            <div className="relative pl-6 border-l-2 border-[#9b722b]/50 flex flex-col gap-8">
              {deepEntries.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-[#fdfaf3] border border-[#c7b299] p-6 rounded shadow-sm relative flex flex-col gap-4"
                >
                  <div className="absolute -left-[31px] top-6 w-3 h-3 rounded-full bg-[#9b722b] border-2 border-[#f4ecdc]"></div>
                  
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <div>
                      <span className="text-xs font-bold text-[#9b722b] uppercase tracking-wider block">{item.category}</span>
                      <h3 className="text-xl font-bold text-[#2b1f11] mt-0.5">{item.title}</h3>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 bg-[#f7edd9] text-[#614614] border border-[#c7b299] rounded">{item.period}</span>
                  </div>

                  <div className="text-sm font-semibold text-[#1e5e3a] bg-[#1e5e3a]/5 p-3 rounded border border-[#1e5e3a]/20">
                    <strong>তাত্ত্বিক মূলভাব:</strong> {item.thesis}
                  </div>

                  <div className="bg-[#fcf8f0] border-r-4 border-[#9b722b] p-4 rounded text-right shadow-inner">
                    <div className="font-amiri text-2xl text-[#2b1f11] font-bold leading-loose" dir="rtl">{item.dalil_ar}</div>
                    <div className="text-xs font-semibold text-[#8f2222] mt-2 font-siliguri text-left">📖 সনদ ও দলিল সূত্র: {item.dalil_ref}</div>
                  </div>

                  <div className="bg-[#f7f1e3]/60 border border-[#c7b299]/60 p-4 rounded text-xs leading-relaxed text-[#3d2e1e]">
                    <strong className="text-[#614614] block mb-1.5 text-sm">🔍 শাস্ত্রীয় বিশ্লেষণ ও তাফসীর:</strong>
                    {item.tashrih}
                  </div>

                  <div className="text-xs text-[#5e4c36] italic border-t border-[#c7b299]/40 pt-2">
                    <strong>ভাষাতাত্ত্বিক গবেষণা নোট:</strong> {item.academic_notes}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: AL-WAFI LEXICON DEMOGRAPHICS */}
        {activeTab === 'lexicon' && (
          <div className="flex flex-col gap-6">
            <div className="bg-[#fdfaf3] border border-[#8c6d46] p-6 rounded shadow-sm">
              <div className="flex justify-between items-start flex-wrap gap-4 border-b border-[#c7b299]/50 pb-4 mb-4">
                <div>
                  <h2 className="text-xl font-bold text-[#614614]">আধুনিক আরবী-বাংলা অভিধান [আল-মু'জামুল ওয়াফী]</h2>
                  <p className="text-xs text-[#5e4c36] mt-0.5">ড. মুহাম্মদ ফজলুর রহমান • অধ্যাপক, আরবী বিভাগ, ঢাকা বিশ্ববিদ্যালয়</p>
                </div>
                <span className="text-xs px-3 py-1 bg-[#9b722b]/10 text-[#614614] border border-[#9b722b] rounded font-bold">
                  ৪০,০০০ ভুক্তি • সরল বর্ণানুক্রমিক পদ্ধতি
                </span>
              </div>

              <div className="text-sm leading-relaxed text-[#22180d] space-y-2">
                <p>
                  <strong>আল-মু'জামুল ওয়াফী</strong> হলো বাংলাভাষী গবেষক ও শিক্ষার্থীদের জন্য রচিত এক প্রামাণ্য আরবী-বাংলা অভিধান[cite: 2]। এতে প্রতিটি এন্ট্রির সাথে তার <em>মাদ্দাহ</em> (শব্দমূল) এবং সুলাসী মুজাররাদের বাবের প্রতীক যথা: <strong>[ن]</strong> (নাসারা-ইয়ানসুরু), <strong>[ض]</strong> (যারাবা-ইয়াযরিবু), <strong>[س]</strong> (সামি'আ-ইয়াসমা'উ), <strong>[ف]</strong> (ফাতাহা-ইয়াফতাহু), <strong>[ك]</strong> (কারুমা-ইয়াকরুমু), এবং <strong>[ح]</strong> (হাসিবা-ইয়াহসিবু) সরাসরি নির্দেশিত হয়েছে[cite: 2]।
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
                <div className="bg-[#f7f1e3] border border-[#c7b299] p-4 rounded text-center">
                  <div className="font-cinzel text-2xl font-bold text-[#9b722b]">12,305,412</div>
                  <div className="text-xs text-[#5e4c36] mt-1">আল-ফারাহীদীর তাত্ত্বিক সিলিং[cite: 1]</div>
                </div>
                <div className="bg-[#f7f1e3] border border-[#c7b299] p-4 rounded text-center">
                  <div className="font-cinzel text-2xl font-bold text-[#9b722b]">40,000+</div>
                  <div className="text-xs text-[#5e4c36] mt-1">আল-মু'জামুল ওয়াফীর ভুক্তি[cite: 2]</div>
                </div>
                <div className="bg-[#f7f1e3] border border-[#c7b299] p-4 rounded text-center">
                  <div className="font-cinzel text-2xl font-bold text-[#9b722b]">80,000</div>
                  <div className="text-xs text-[#5e4c36] mt-1">লিসানুল আরবের ভুক্তি[cite: 1]</div>
                </div>
                <div className="bg-[#f7f1e3] border border-[#c7b299] p-4 rounded text-center">
                  <div className="font-cinzel text-2xl font-bold text-[#9b722b]">300,000+</div>
                  <div className="text-xs text-[#5e4c36] mt-1">দোহা হিস্টোরিক্যাল ডিকশনারি[cite: 1]</div>
                </div>
                <div className="bg-[#f7f1e3] border border-[#c7b299] p-4 rounded text-center">
                  <div className="font-cinzel text-2xl font-bold text-[#9b722b]">77,430</div>
                  <div className="text-xs text-[#5e4c36] mt-1">কুরআনুল কারীমের শব্দসংখ্যা[cite: 1]</div>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-[#c7b299] bg-[#ede0c5] py-4 text-center text-xs text-[#5e4c36]">
        I'raabify // Classical Arabic Grammar & Scriptural Morphosyntactic Research Engine (EST. 2026)
      </footer>
    </div>
  );
}