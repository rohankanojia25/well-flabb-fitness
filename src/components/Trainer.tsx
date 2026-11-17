import React from 'react';
import { motion } from 'motion/react';
import { Award, Star, MessageCircle, CheckCircle2, User } from 'lucide-react';
import { GYM_INFO } from '../data';

interface TrainerProps {
  onOpenTrial: () => void;
}

export const Trainer: React.FC<TrainerProps> = ({ onOpenTrial }) => {
  return (
    <section id="trainer" className="py-[56px] px-5 md:py-24 md:px-8 relative overflow-hidden bg-[#1A1D23]/40">
      <div className="w-full max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 md:mb-16">
          <p className="eyebrow mb-2">HEAD COACH &amp; TRAINER</p>
          <h2>
            MEET COACH <span className="heading-accent">RAHUL</span>
          </h2>
          <p className="text-[#9EABB8] text-base mt-2">
            The reason members stick to their goals and leave 5-star Google reviews.
          </p>
        </div>

        {/* Trainer Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto rounded-2xl bg-[#1A1D23] border border-[#2B303C] overflow-hidden shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)]"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8 lg:p-10 items-center">
            
            {/* Trainer Photo Column */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-[280px] aspect-[4/5] rounded-2xl overflow-hidden border-2 border-[#2B303C] bg-[#0F1115] flex flex-col items-center justify-center text-center p-6 group">
                <div className="w-20 h-20 rounded-full bg-[#E4572E]/10 border border-[#E4572E]/30 flex items-center justify-center text-[#E4572E] mb-3">
                  <User className="w-10 h-10" />
                </div>
                <span className="font-heading text-2xl text-white tracking-wide">COACH RAHUL</span>
                <span className="text-xs font-semibold text-[#17BEBB] mt-1">Certified Floor Coach</span>
                <p className="text-[11px] text-[#9EABB8] mt-2 max-w-[200px]">
                  Real floor coach guiding posture, reps, and nutrition daily.
                </p>

                <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-[#E4572E] text-white text-[10px] font-bold uppercase tracking-wider">
                  Lead Coach
                </div>
              </div>
            </div>

            {/* Trainer Details Column */}
            <div className="md:col-span-7 flex flex-col justify-center space-y-4">
              
              {/* Review Mention Callout (Strict rule preserved) */}
              <div className="p-3.5 rounded-xl bg-[#E4572E]/10 border border-[#E4572E]/30 flex items-center gap-3">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400 shrink-0" />
                <p className="text-sm font-semibold text-white italic">
                  &ldquo;Members mention him by name in our reviews.&rdquo;
                </p>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl text-white mb-1">
                  PERSONAL ATTENTION FOR EVERY TRAINEE
                </h3>
                <p className="text-sm text-[#9EABB8] leading-relaxed">
                  Unlike commercial gym chains where trainers ignore you unless you buy costly packages, Coach Rahul is present on the floor for every member. Whether you are lifting a dumbbell for the first time or aiming for a complete body recomposition, you get proper form correction and genuine daily support.
                </p>
              </div>

              {/* Certifications (Clean, no placeholders) */}
              <div className="space-y-2 pt-1">
                <span className="text-xs font-bold text-[#17BEBB] uppercase tracking-wider block">
                  Coaching Focus &amp; Expertise:
                </span>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 rounded-lg bg-[#0F1115] border border-[#2B303C] text-xs text-[#F5F5F5] flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-[#17BEBB]" />
                    Certified Fitness Coach
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-[#0F1115] border border-[#2B303C] text-xs text-[#F5F5F5] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#E4572E]" />
                    Weight Loss &amp; Diet Guidance
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-[#0F1115] border border-[#2B303C] text-xs text-[#F5F5F5] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#E4572E]" />
                    Beginner &amp; Women Safe Training
                  </span>
                </div>
              </div>

              {/* CTA buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={onOpenTrial}
                  className="min-h-[46px] px-5 py-2.5 rounded-xl bg-[#E4572E] hover:bg-[#cf4720] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Work Out With Rahul (Free Trial)</span>
                </button>
                <a
                  href={`${GYM_INFO.whatsappBase}?text=${encodeURIComponent("Hi Rahul, I saw your profile on Well Flabb website and had a question about gym coaching.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[46px] px-5 py-2.5 rounded-xl bg-[#232730] hover:bg-[#2B303C] border border-[#2B303C] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <span>Chat With Rahul</span>
                </a>
              </div>

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
