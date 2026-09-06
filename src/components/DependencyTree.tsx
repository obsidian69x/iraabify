import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { DependencyGraphEdge } from '../utils/grammarEngine';

interface Props {
  tokens: string[];
  edges: DependencyGraphEdge[];
}

export const DependencyTree: React.FC<Props> = ({ tokens, edges }) => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <div className="bg-[#fdfaf3] border border-[#8c6d46] p-6 rounded shadow-sm flex flex-col gap-6">
      <div className="border-b border-[#c7b299]/60 pb-3">
        <h3 className="text-lg font-bold text-[#614614]">
          {lang === 'bn' ? '🌳 বাক্যতাত্ত্বিক তারকীব ও ডিপেন্ডেন্সি ট্রি গ্রাফ' : lang === 'ar' ? '🌳 شجرة الإعراب والتعلق النحوي التفاعلية' : '🌳 Interactive Syntactic Dependency Tree'}
        </h3>
        <p className="text-xs text-[#5e4c36] mt-0.5">
          {lang === 'bn' 
            ? 'আমেল-মামূলের সম্পর্ক, প্রত্যক্ষ কর্ম (মাফ\'উল) এবং যার-মাজরুরের মুতা\'আল্লাক সংযোগ রেখা।' 
            : lang === 'ar'
            ? 'روابط العوامل النحوية والمعمولات والتعليق الإعرابي لشبه الجملة.'
            : 'Visualizing syntactic governors, agent-patient relations, and prepositional attachments.'}
        </p>
      </div>

      <div className="flex justify-center items-center gap-6 flex-wrap py-4">
        {tokens.map((token, idx) => (
          <motion.div
            key={idx}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="relative flex flex-col items-center bg-[#f7edd9] border-2 border-[#9b722b] px-5 py-3 rounded-lg shadow-sm min-w-[120px]"
          >
            <span className="text-[10px] text-[#8c6d46] font-bold">Node #{idx + 1}</span>
            <span className="font-amiri text-3xl font-bold text-[#2b1f11] my-1">{token}</span>
            <span className="text-[11px] px-2 py-0.5 bg-white border border-[#c7b299] rounded font-semibold text-[#614614]">
              {idx === 0 ? 'عامل أول (Head)' : 'معمول (Dependent)'}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col gap-2 pt-2">
        <span className="text-xs font-bold text-[#8c6d46] uppercase tracking-wider">
          {lang === 'bn' ? 'নাহবী সংযোগ ও সম্পর্ক তালিকা:' : lang === 'ar' ? 'بيان الروابط النحوية:' : 'Identified Syntactic Edges:'}
        </span>
        {edges.length === 0 ? (
          <div className="text-xs text-[#8a7358] italic p-3 bg-[#f7f1e3] rounded border border-[#c7b299]/40">
            {lang === 'bn' ? 'সাধারণ বাক্যে স্বয়ংক্রিয় হেড-ডিপেন্ডেন্ট সম্পর্ক কার্যকর।' : 'Standard head-dependent relation active.'}
          </div>
        ) : (
          edges.map((edge, eIdx) => (
            <div key={eIdx} className="flex items-center justify-between bg-[#f7f1e3] border border-[#c7b299]/60 p-3 rounded text-xs">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#9b722b] text-white rounded font-bold">
                  Node #{edge.fromIndex + 1} ➔ Node #{edge.toIndex + 1}
                </span>
                <span className="font-bold text-[#8f2222]">
                  {lang === 'bn' ? edge.labelBn : lang === 'ar' ? edge.labelAr : edge.labelEn}
                </span>
              </div>
              <span className="font-amiri text-sm text-[#274060] font-semibold" dir="rtl">
                {edge.labelAr}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};