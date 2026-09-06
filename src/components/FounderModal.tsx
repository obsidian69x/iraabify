import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const FounderModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl bg-[#fdfaf3] border-2 border-[#8c6d46] outline outline-1 outline-[#9b722b] outline-offset-4 rounded p-6 shadow-2xl overflow-hidden font-sans"
        >
          {/* Header */}
          <div className="flex justify-between items-start border-b border-[#c7b299] pb-4 mb-4">
            <div>
              <span className="text-xs font-bold text-[#9b722b] tracking-widest uppercase">
                About the Founder
              </span>
              <h2 className="text-2xl font-bold text-[#2b1f11] font-cinzel mt-0.5">
                Mohammad Shafayat Hossain
              </h2>
              <p className="text-xs text-[#614614] font-medium mt-1">
                Dakhil Grade 9 Student (Humanities) • Founder & Lead Architect
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-[#8c6d46] hover:text-black text-xl font-bold px-2 py-1 cursor-pointer transition-colors"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {/* Educational Institution - EXACT ARABIC MADRASA NAME */}
          <div className="mb-4 bg-[#f7edd9] border border-[#c7b299] p-3 rounded text-center">
            <span className="text-xs text-[#8a7358] uppercase font-semibold tracking-wider block mb-1">
              Educational Institution
            </span>
            <span className="font-amiri text-xl text-[#2b1f11] font-bold block" dir="rtl">
              مدرسة نياطولا أنوار العلوم النمانية النموذجية الكاملة
            </span>
          </div>

          {/* Bio & Vision in English */}
          <div className="space-y-4 text-sm leading-relaxed text-[#22180d]">
            <p>
              I am <strong>Mohammad Shafayat Hossain</strong>, a 9th-grade Dakhil student in the Humanities stream at <strong>مدرسة نياطولا أنوار العلوم النمانية النموذجية الكاملة</strong>. My passion lies at the intersection of classical Arabic linguistics and modern computing—specifically software architecture, programming, and artificial intelligence. Driven by a project-first mindset, I explore how software can translate complex intellectual traditions into practical, modern solutions.
            </p>
            
            <p>
              My primary project is <strong>Iʿrābify</strong>, an intelligent grammar analyzer engineered to demystify Ṣarf (morphology), Naḥw (syntax), and Iʿrāb (inflection) through contemporary technology. My mission is to continuously bridge traditional scholarship with cutting-edge engineering to build purposeful, high-impact digital tools.
            </p>

            <div className="bg-[#f7f1e3] p-4 rounded border border-[#c7b299]/70 space-y-2 text-xs">
              <div>
                <strong className="text-[#614614]">Academic Focus:</strong> Dakhil Grade 9 (Humanities Stream)
              </div>
              <div>
                <strong className="text-[#614614]">Core Interests:</strong> Software Architecture, Artificial Intelligence (AI), Natural Language Processing (NLP), and Semitic Philology.
              </div>
              <div>
                <strong className="text-[#614614]">Engineering Vision:</strong> Unifying classical Islamic intellectual heritage with modern code to engineer accessible, real-world tools.
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="mt-5 pt-3 border-t border-[#c7b299]/50 flex justify-between items-center text-xs text-[#5e4c36]">
            <span>I'raabify Project // Est. 2026</span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-[#9b722b] hover:bg-[#755217] text-white rounded font-bold transition-all text-xs cursor-pointer shadow-sm"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};