import React from 'react';
import { motion } from 'motion/react';
import { UserCheck, Utensils, HeartHandshake, Smile, CheckCircle2 } from 'lucide-react';
import { WHY_US_ITEMS } from '../data';

const icons = [UserCheck, Utensils, HeartHandshake, Smile];

export const WhyUs: React.FC = () => {
  return (
    <section id="why-us" className="py-16 md:py-24 relative overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
          <p className="eyebrow mb-2">WHY WELL FLABB</p>
          <h2>
            A GYM WHERE YOU ACTUALLY GET <span className="heading-accent">RESULTS</span>
          </h2>
          <p className="text-[#9EABB8] text-base mt-2">
            Most gyms hand you an access card and forget you exist. Here, every workout comes with real coach supervision.
          </p>
        </div>

        {/* Mobile: Horizontal swipe row with scroll-snap & peek; Desktop: 4-card grid */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-4 -mx-4 px-4 md:mx-0 md:px-0">
          {WHY_US_ITEMS.map((item, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="shrink-0 w-[84vw] sm:w-[320px] md:w-auto snap-center rounded-2xl bg-[#1A1D23] border border-[#2B303C] p-6 flex flex-col justify-between shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] hover:border-[#17BEBB]/60 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#E4572E]/10 border border-[#E4572E]/20 flex items-center justify-center text-[#E4572E]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#17BEBB] bg-[#17BEBB]/10 px-2.5 py-1 rounded-md">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-white text-xl mb-2 tracking-wide">
                    {item.title}
                  </h3>

                  <p className="text-[#9EABB8] text-sm leading-relaxed line-clamp-3">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#2B303C]/60 flex items-center gap-2 text-xs text-[#F5F5F5]/80">
                  <CheckCircle2 className="w-4 h-4 text-[#17BEBB] shrink-0" />
                  <span>Standard with all memberships</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Swipe Hint */}
        <div className="flex items-center justify-center gap-2 mt-2 md:hidden text-xs text-[#9EABB8]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E4572E]" />
          <span>Swipe horizontally to explore all 4 pillars</span>
        </div>

      </div>
    </section>
  );
};
