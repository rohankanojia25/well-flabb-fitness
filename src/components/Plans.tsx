import React from 'react';
import { motion } from 'motion/react';
import { Check, MessageCircle, Sparkles, ArrowRight } from 'lucide-react';
import { PLANS, GYM_INFO } from '../data';

export const Plans: React.FC = () => {
  // Mobile order: Quarterly first!
  // Desktop display: Monthly -> Quarterly -> Half-yearly -> Yearly (or keeping Quarterly visually elevated)
  // Let's create desktop order: Monthly (id: monthly), Quarterly (id: quarterly), Half-Yearly (id: half-yearly), Yearly (id: yearly)
  const desktopOrder = [
    PLANS.find((p) => p.id === 'monthly')!,
    PLANS.find((p) => p.id === 'quarterly')!,
    PLANS.find((p) => p.id === 'half-yearly')!,
    PLANS.find((p) => p.id === 'yearly')!,
  ];

  // Mobile order: Quarterly is first!
  const mobileOrder = [
    PLANS.find((p) => p.id === 'quarterly')!,
    PLANS.find((p) => p.id === 'monthly')!,
    PLANS.find((p) => p.id === 'half-yearly')!,
    PLANS.find((p) => p.id === 'yearly')!,
  ];

  return (
    <section id="plans" className="py-16 md:py-24 bg-[#0F1115] relative overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
          <p className="eyebrow mb-2">TRANSPARENT MEMBERSHIPS</p>
          <h2>
            SIMPLE PLANS, NO HIDDEN <span className="heading-accent">FEES</span>
          </h2>
          <p className="text-[#9EABB8] text-base mt-2">
            Every membership includes full gym equipment access, daily floor guidance by Rahul, and personalized diet support.
          </p>
        </div>

        {/* Mobile Swipe Row (Quarterly is FIRST, with scroll snap & peek) */}
        <div className="flex md:hidden overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-4 -mx-4 px-4 gap-4">
          {mobileOrder.map((plan) => (
            <div
              key={`mob-${plan.id}`}
              className={`shrink-0 w-[84vw] snap-center rounded-2xl p-6 flex flex-col justify-between transition-all relative ${
                plan.popular
                  ? 'bg-[#1A1D23] border-2 border-[#E4572E] shadow-[0_10px_30px_-10px_rgba(228,87,46,0.3)]'
                  : 'bg-[#1A1D23] border border-[#2B303C]'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-[#E4572E] text-white text-[10px] font-extrabold uppercase tracking-widest flex items-center gap-1 shadow-md">
                  <Sparkles className="w-3 h-3" />
                  Most Popular Choice
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-heading text-2xl text-white tracking-wide">
                    {plan.title}
                  </span>
                  <span className="text-xs font-semibold text-[#17BEBB] bg-[#17BEBB]/10 px-2 py-0.5 rounded">
                    {plan.duration}
                  </span>
                </div>

                <p className="text-xs text-[#9EABB8] mb-4">
                  {plan.tagline}
                </p>

                {/* Price (Strict rule: Rs [PLACEHOLDER]) */}
                <div className="mb-5 pb-4 border-b border-[#2B303C]">
                  <span className="text-3xl font-extrabold text-white font-mono">
                    {plan.price}
                  </span>
                  <span className="text-xs text-[#9EABB8] ml-1.5">/ {plan.duration}</span>
                </div>

                {/* Feature list */}
                <ul className="space-y-2.5 mb-6">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-[#F5F5F5]">
                      <Check className="w-4 h-4 text-[#17BEBB] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* WhatsApp CTA */}
              <a
                href={`${GYM_INFO.whatsappBase}?text=${encodeURIComponent(plan.whatsappText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full min-h-[48px] py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-md ${
                  plan.popular
                    ? 'bg-[#E4572E] text-white hover:bg-[#cf4720]'
                    : 'bg-[#232730] text-white border border-[#2B303C] hover:bg-[#2B303C]'
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                <span>Join on WhatsApp</span>
              </a>
            </div>
          ))}
        </div>

        {/* Mobile Swipe Hint */}
        <div className="flex items-center justify-center gap-2 mt-2 mb-6 md:hidden text-xs text-[#9EABB8]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E4572E]" />
          <span>Quarterly plan featured first • Swipe to view all 4 options</span>
        </div>

        {/* Desktop 4-column Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {desktopOrder.map((plan, idx) => (
            <motion.div
              key={`desk-${plan.id}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ y: -6, boxShadow: '0 20px 35px -10px rgba(0,0,0,0.7)' }}
              className={`rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 relative ${
                plan.popular
                  ? 'bg-[#1A1D23] border-2 border-[#E4572E] shadow-[0_10px_35px_-10px_rgba(228,87,46,0.35)] scale-105 z-10'
                  : 'bg-[#1A1D23] border border-[#2B303C] hover:border-[#17BEBB]/60'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-[#E4572E] text-white text-[10px] font-extrabold uppercase tracking-widest flex items-center gap-1 shadow-lg">
                  <Sparkles className="w-3 h-3" />
                  Most Popular
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-heading text-2xl text-white tracking-wide">
                    {plan.title}
                  </span>
                  <span className="text-xs font-semibold text-[#17BEBB] bg-[#17BEBB]/10 px-2 py-0.5 rounded">
                    {plan.duration}
                  </span>
                </div>

                <p className="text-xs text-[#9EABB8] mb-4 min-h-[32px]">
                  {plan.tagline}
                </p>

                {/* Price (Strict rule: Rs [PLACEHOLDER]) */}
                <div className="mb-5 pb-4 border-b border-[#2B303C]">
                  <span className="text-3xl font-extrabold text-white font-mono">
                    {plan.price}
                  </span>
                  <span className="text-xs text-[#9EABB8] ml-1.5">/ {plan.duration}</span>
                </div>

                {/* Feature list */}
                <ul className="space-y-2.5 mb-6">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-[#F5F5F5]">
                      <Check className="w-4 h-4 text-[#17BEBB] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* WhatsApp CTA */}
              <a
                href={`${GYM_INFO.whatsappBase}?text=${encodeURIComponent(plan.whatsappText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full min-h-[46px] py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 shadow-md ${
                  plan.popular
                    ? 'bg-[#E4572E] text-white hover:bg-[#cf4720]'
                    : 'bg-[#232730] text-white border border-[#2B303C] hover:bg-[#E4572E]'
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                <span>Join on WhatsApp</span>
                <ArrowRight className="w-3.5 h-3.5 ml-0.5 opacity-70" />
              </a>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
