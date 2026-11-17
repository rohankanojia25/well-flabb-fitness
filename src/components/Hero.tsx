import React from 'react';
import { motion } from 'motion/react';
import { Phone, MessageCircle, ArrowRight, ShieldCheck, Dumbbell } from 'lucide-react';
import { GYM_INFO } from '../data';

interface HeroProps {
  onOpenTrial: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTrial }) => {
  // 10 words: Reveal with 0.05s stagger, 0.4s duration = completes in ~0.85s (<0.9s)
  const headlineWords = [
    { text: 'Lose', isAccent: false },
    { text: 'the', isAccent: false },
    { text: 'flab', isAccent: true },
    { text: 'with', isAccent: false },
    { text: 'a', isAccent: false },
    { text: 'trainer', isAccent: false },
    { text: 'who', isAccent: false },
    { text: 'actually', isAccent: false },
    { text: 'guides', isAccent: false },
    { text: 'you', isAccent: false },
  ];

  return (
    <section className="relative pt-[calc(64px+env(safe-area-inset-top,0px)+16px)] pb-10 sm:pb-12 lg:pb-16 min-h-[100dvh] flex flex-col justify-between overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#E4572E]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-10 -right-10 w-72 h-72 bg-[#17BEBB]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10 flex-1 flex flex-col justify-center">
        {/* Desktop 2-column, Mobile Phone-first stacked layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          
          {/* Content Column (Phone first screen priority) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Shortened 11px Hero Badge on One Line */}
            <div className="mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A1D23] border border-[#2B303C] text-[11px] font-bold tracking-wider text-[#17BEBB] uppercase whitespace-nowrap">
                <Dumbbell className="w-3.5 h-3.5 text-[#E4572E]" />
                TRAINER-LED GYM · CHANDER NAGAR
              </span>
            </div>

            {/* Word-by-word rising headline with guaranteed word-spacing & no negative tracking */}
            <h1 className="text-white leading-[1.02] mb-3 sm:mb-4">
              {headlineWords.map((word, i) => (
                <React.Fragment key={i}>
                  <motion.span
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: i * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`inline-block mr-[0.25em] font-heading ${
                      word.isAccent
                        ? 'text-[#17BEBB] italic tracking-normal underline decoration-[#E4572E]/50 decoration-wavy'
                        : 'text-white'
                    }`}
                  >
                    {word.text}
                  </motion.span>
                  {/* Real space between words to ensure browser flow */}
                  {' '}
                </React.Fragment>
              ))}
            </h1>

            {/* Clean Subline (No rating copy here; moved exclusively to Reviews) */}
            <p className="text-base sm:text-lg text-[#9EABB8] mb-5 sm:mb-6 leading-relaxed max-w-xl">
              Personal attention, diet guidance and a friendly space for men and women in Chander Nagar.
            </p>

            {/* Primary Action Buttons (Thumb zone: Full width on phone, min 48px tall) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-5">
              <button
                onClick={onOpenTrial}
                className="pulse-free-trial w-full sm:w-auto min-h-[52px] px-7 py-3.5 rounded-xl bg-[#E4572E] hover:bg-[#cf4720] text-white font-extrabold text-base tracking-wide flex items-center justify-center gap-2.5 shadow-xl shadow-[#E4572E]/30 transition-transform active:scale-95"
              >
                <MessageCircle className="w-5 h-5 fill-white/20" />
                <span>Book a Free Trial</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </button>

              <div className="grid grid-cols-2 sm:flex sm:items-center gap-2.5">
                <a
                  href={`tel:${GYM_INFO.phoneRaw}`}
                  className="min-h-[48px] px-5 py-3 rounded-xl bg-[#1A1D23] hover:bg-[#232730] border border-[#2B303C] text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors active:scale-95"
                >
                  <Phone className="w-4 h-4 text-[#17BEBB]" />
                  <span>Call Us</span>
                </a>

                <a
                  href="#plans"
                  className="min-h-[48px] px-5 py-3 rounded-xl bg-transparent hover:bg-[#1A1D23]/60 border border-[#2B303C]/80 text-[#9EABB8] hover:text-white font-semibold text-sm flex items-center justify-center gap-1.5 transition-colors active:scale-95"
                >
                  <span>See Plans</span>
                </a>
              </div>
            </div>

            {/* Micro trust indicators */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#9EABB8] pt-1">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#17BEBB]" />
                Zero Machine Intimidation
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#17BEBB]" />
                Women-Friendly &amp; Safe
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#17BEBB]" />
                Trainer Coach Rahul on Floor
              </span>
            </div>
          </div>

          {/* Hero Visual Column (Capped at 40vh on phone, placed below buttons) */}
          <div className="lg:col-span-5 mt-2 lg:mt-0">
            <div className="relative rounded-2xl overflow-hidden border border-[#2B303C] bg-[#1A1D23] shadow-2xl max-h-[38svh] sm:max-h-[40svh] lg:max-h-[480px]">
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop"
                alt="Well Flabb Fitness Club training floor"
                className="w-full h-full object-cover aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3]"
                loading="eager"
                fetchPriority="high"
                width={1200}
                height={900}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1115] via-transparent to-transparent opacity-80" />

              {/* Verified badge tag without placeholder tags */}
              <div 
                className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-3 rounded-xl bg-[#0F1115]/90 border border-[#2B303C] flex items-center justify-between"
                style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#E4572E] flex items-center justify-center text-white font-bold text-xs">
                    WF
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white leading-tight">Well Flabb Floor Area</p>
                    <p className="text-[10px] text-[#17BEBB] font-semibold">Real Training Floor · Trainer On-Duty</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-extrabold text-[#E4572E] uppercase">Free 1-Day Pass</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
