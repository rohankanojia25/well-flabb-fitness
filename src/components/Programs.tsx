import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Check, ArrowRight, ChevronDown } from 'lucide-react';
import { PROGRAMS, GYM_INFO } from '../data';

export const Programs: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleDetails = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="programs" className="py-[56px] px-5 md:py-24 md:px-8 bg-[#0F1115] relative overflow-hidden">
      <div className="w-full max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 md:mb-16">
          <p className="eyebrow mb-2">TARGETED TRAINING</p>
          <h2>
            PROGRAMS BUILT FOR YOUR <span className="heading-accent">GOAL</span>
          </h2>
          <p className="text-[#9EABB8] text-base mt-2">
            Whether starting from scratch or breaking a plateau, pick a focused routine coached step-by-step.
          </p>
        </div>

        {/* Swipe row on mobile (peek of next card 84vw), grid on md & lg */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-4 -mx-5 px-5 md:mx-0 md:px-0">
          {PROGRAMS.map((program, idx) => {
            const isExpanded = expandedId === program.id;
            return (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="shrink-0 w-[84vw] max-w-[340px] md:w-auto snap-center rounded-2xl bg-[#1A1D23] border border-[#2B303C] p-5 sm:p-6 flex flex-col justify-between shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] hover:border-[#E4572E]/60 transition-all duration-300 group max-h-[60svh] overflow-y-auto no-scrollbar"
              >
                <div>
                  {/* Badge & Number */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#E4572E] bg-[#E4572E]/10 px-2 py-0.5 rounded">
                      {program.badge}
                    </span>
                    <span className="text-xs text-[#9EABB8] font-mono">0{idx + 1}</span>
                  </div>

                  <h3 className="text-white text-xl sm:text-2xl mb-1.5 group-hover:text-[#17BEBB] transition-colors">
                    {program.title}
                  </h3>

                  {/* Who it's for: strictly one line on mobile */}
                  <div className="mb-3">
                    <p className="text-xs text-[#F5F5F5] truncate leading-tight">
                      <strong className="text-[#9EABB8]">For:</strong> {program.whoItsFor}
                    </p>
                  </div>

                  {/* 3 Bullets */}
                  <ul className="space-y-1.5 mb-3">
                    {program.whatYouGet.slice(0, 3).map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-xs text-[#9EABB8]">
                        <Check className="w-3.5 h-3.5 text-[#17BEBB] shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Expandable "See details" */}
                  <button
                    type="button"
                    onClick={() => toggleDetails(program.id)}
                    className="text-[11px] font-bold text-[#17BEBB] hover:underline flex items-center gap-1 mb-2 md:hidden"
                  >
                    <span>{isExpanded ? 'Hide details' : 'See details'}</span>
                    <ChevronDown className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-[11px] text-[#9EABB8] border-t border-[#2B303C] pt-2 mb-3 space-y-1"
                      >
                        <p className="text-white font-semibold">Full Program Scope:</p>
                        <p>{program.whoItsFor}</p>
                        <p>Includes weekly body recomposition tracking &amp; coach supervision by Rahul.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Action Button: WhatsApp Inquiry */}
                <div className="pt-3 border-t border-[#2B303C]">
                  <a
                    href={`${GYM_INFO.whatsappBase}?text=${encodeURIComponent(program.whatsappMsg)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full min-h-[44px] px-3 py-2.5 rounded-xl bg-[#232730] hover:bg-[#E4572E] text-white font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-1.5 border border-[#2B303C] hover:border-[#E4572E] transition-all duration-200 active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4 text-[#17BEBB] group-hover:text-white" />
                    <span>Ask on WhatsApp</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-0.5 opacity-60" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
