import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Star, Phone, MessageCircle, ArrowRight, ShieldCheck, Dumbbell } from 'lucide-react';
import { GYM_INFO } from '../data';

interface HeroProps {
  onOpenTrial: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTrial }) => {
  // Animated counters for 5.0 and 54 members
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 1400; // ms

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setRating(Number((ease * 5.0).toFixed(1)));
      setReviews(Math.floor(ease * 54));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setRating(5.0);
        setReviews(54);
      }
    };

    const rafId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(rafId);
  }, []);

  // Word-by-word headline animation
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
    <section className="relative pt-20 sm:pt-24 lg:pt-28 pb-8 sm:pb-12 lg:pb-16 min-h-[100dvh] flex flex-col justify-between overflow-hidden">
      {/* Subtle background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#E4572E]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-10 -right-10 w-72 h-72 bg-[#17BEBB]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex-1 flex flex-col justify-center">
        {/* Desktop 2-column, Mobile Phone-first stacked layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          
          {/* Content Column (Phone first screen priority) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Top Pill: Rating & Location */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="eyebrow inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A1D23] border border-[#2B303C]">
                <Dumbbell className="w-3.5 h-3.5 text-[#E4572E]" />
                TRAINER-LED GYM • CHANDER NAGAR, KRISHNA NAGAR
              </span>

              {/* Live Countup Rating Pill */}
              <a
                href={GYM_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1A1D23] border border-[#2B303C] text-xs font-semibold hover:border-[#17BEBB] transition-colors"
                title="View 5.0 Google Reviews"
              >
                <div className="flex items-center text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                </div>
                <span className="text-white font-bold">{rating.toFixed(1)}</span>
                <span className="text-[#9EABB8] text-[11px]">on Google ({reviews} members)</span>
              </a>
            </div>

            {/* Word-by-word rising headline */}
            <h1 className="text-white tracking-tight leading-[1.02] mb-3 sm:mb-4 flex flex-wrap gap-x-2.5 gap-y-1">
              {headlineWords.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 28, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.05 + i * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`inline-block ${word.isAccent ? 'heading-accent underline decoration-[#E4572E]/40 decoration-wavy' : ''}`}
                >
                  {word.text}
                </motion.span>
              ))}
            </h1>

            {/* Subline */}
            <p className="text-base sm:text-lg text-[#9EABB8] mb-5 sm:mb-6 leading-relaxed max-w-xl">
              <strong className="text-white font-semibold">5.0 on Google from 54 members.</strong> Personal attention, custom diet guidance, and a friendly, comfortable space for both men and women in Delhi.
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

            {/* Quick trust micro-bullets */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#9EABB8] pt-1">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#17BEBB]" />
                Zero Machine Intimidation
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#17BEBB]" />
                Women-Friendly & Safe
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#17BEBB]" />
                Trainer Coach Rahul on Floor
              </span>
            </div>
          </div>

          {/* Hero Visual Column (Max 40-45vh on phone, placed below buttons so first screen buttons are immediately accessible) */}
          <div className="lg:col-span-5 mt-2 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-2xl overflow-hidden border border-[#2B303C] bg-[#1A1D23] shadow-2xl max-h-[38vh] sm:max-h-[45vh] lg:max-h-[500px]"
            >
              {/* Gym Image */}
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop"
                alt="Well Flabb Fitness Club floor training area [GYM PHOTO]"
                className="w-full h-full object-cover aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] transition-transform duration-700 hover:scale-105"
                loading="eager"
                fetchPriority="high"
                width={1200}
                height={900}
              />
              {/* Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1115] via-transparent to-transparent opacity-80" />

              {/* Floating verified badge tag */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-3 rounded-xl bg-[#0F1115]/90 backdrop-blur-md border border-[#2B303C] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#E4572E] flex items-center justify-center text-white font-bold text-xs">
                    WF
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white leading-tight">Well Flabb Floor Area</p>
                    <p className="text-[10px] text-[#17BEBB] font-semibold">[GYM PHOTO] • Trainer On-Duty</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-extrabold text-[#E4572E] uppercase">Free 1-Day Pass</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
