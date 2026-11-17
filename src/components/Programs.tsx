import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle, Check, ArrowRight } from 'lucide-react';
import { PROGRAMS, GYM_INFO } from '../data';

export const Programs: React.FC = () => {
  return (
    <section id="programs" className="py-16 md:py-24 bg-[#0F1115] relative overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
          <p className="eyebrow mb-2">TARGETED TRAINING</p>
          <h2>
            PROGRAMS BUILT FOR YOUR <span className="heading-accent">GOAL</span>
          </h2>
          <p className="text-[#9EABB8] text-base mt-2">
            Whether starting from scratch or breaking a plateau, pick a focused routine coached step-by-step.
          </p>
        </div>

        {/* Swipe row on mobile (peek of next card), grid on md & lg */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-4 -mx-4 px-4 md:mx-0 md:px-0">
          {PROGRAMS.map((program, idx) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="shrink-0 w-[86vw] sm:w-[340px] md:w-auto snap-center rounded-2xl bg-[#1A1D23] border border-[#2B303C] p-6 flex flex-col justify-between shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] hover:border-[#E4572E]/60 transition-all duration-300 group"
            >
              <div>
                {/* Header tag */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#E4572E] bg-[#E4572E]/10 px-2.5 py-1 rounded-md">
                    {program.badge}
                  </span>
                  <span className="text-xs text-[#9EABB8] font-mono">0{idx + 1}</span>
                </div>

                <h3 className="text-white text-2xl mb-2 group-hover:text-[#17BEBB] transition-colors">
                  {program.title}
                </h3>

                {/* Who it's for */}
                <div className="mb-4">
                  <span className="text-[11px] font-bold text-[#9EABB8] uppercase tracking-wider block mb-1">
                    Who it's for:
                  </span>
                  <p className="text-sm text-[#F5F5F5] leading-snug">
                    {program.whoItsFor}
                  </p>
                </div>

                {/* What you get */}
                <div className="mb-6">
                  <span className="text-[11px] font-bold text-[#9EABB8] uppercase tracking-wider block mb-2">
                    What you get:
                  </span>
                  <ul className="space-y-2">
                    {program.whatYouGet.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-[#9EABB8]">
                        <Check className="w-4 h-4 text-[#17BEBB] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button: WhatsApp Inquiry */}
              <div className="pt-4 border-t border-[#2B303C]">
                <a
                  href={`${GYM_INFO.whatsappBase}?text=${encodeURIComponent(program.whatsappMsg)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[46px] px-4 py-2.5 rounded-xl bg-[#232730] hover:bg-[#E4572E] text-white font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 border border-[#2B303C] hover:border-[#E4572E] transition-all duration-200 active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 text-[#17BEBB] group-hover:text-white" />
                  <span>Ask About This on WhatsApp</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-0.5 opacity-60" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Swipe Indicator */}
        <div className="flex items-center justify-center gap-2 mt-2 md:hidden text-xs text-[#9EABB8]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#17BEBB]" />
          <span>Swipe to view all 5 training programs</span>
        </div>

      </div>
    </section>
  );
};
