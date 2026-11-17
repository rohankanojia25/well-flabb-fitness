import React from 'react';
import { motion } from 'motion/react';
import { Sun, Moon, CalendarX, MessageCircle, ArrowRight } from 'lucide-react';
import { TIMINGS, GYM_INFO } from '../data';

export const Timings: React.FC = () => {
  const morningMsg = `Hi Well Flabb, I'd like to check timing slots for the Morning Batch (${TIMINGS.morning.time}).`;
  const eveningMsg = `Hi Well Flabb, I'd like to check timing slots for the Evening Batch (${TIMINGS.evening.time}).`;

  return (
    <section id="timings" className="py-16 md:py-24 relative overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <p className="eyebrow mb-2">FLEXIBLE HOURS • IST</p>
          <h2>
            DAILY BATCH <span className="heading-accent">TIMINGS</span>
          </h2>
          <p className="text-[#9EABB8] text-base mt-2">
            Tap a batch card below to check slot openings or reserve your preferred workout hour directly on WhatsApp.
          </p>
        </div>

        {/* Two Big Tappable Cards for Morning and Evening */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
          
          {/* Morning Batch Card */}
          <motion.a
            href={`${GYM_INFO.whatsappBase}?text=${encodeURIComponent(morningMsg)}`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileTap={{ scale: 0.98 }}
            className="group block rounded-2xl bg-[#1A1D23] border border-[#2B303C] hover:border-[#E4572E] p-6 sm:p-8 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] transition-all duration-300 relative overflow-hidden"
          >
            {/* Top accent badge */}
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#E4572E]/10 border border-[#E4572E]/30 flex items-center justify-center text-[#E4572E] group-hover:scale-110 transition-transform">
                <Sun className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono font-bold text-[#E4572E] bg-[#E4572E]/10 px-3 py-1 rounded-full uppercase">
                Tap to Book Slot
              </span>
            </div>

            <p className="text-xs font-bold text-[#9EABB8] uppercase tracking-wider mb-1">
              {TIMINGS.morning.title}
            </p>
            <h3 className="text-3xl sm:text-4xl text-white mb-2 tracking-wide font-mono">
              {TIMINGS.morning.time}
            </h3>

            <p className="text-sm text-[#9EABB8] mb-4">
              {TIMINGS.morning.desc}
            </p>

            <div className="pt-4 border-t border-[#2B303C] flex items-center justify-between text-xs text-[#17BEBB] font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <MessageCircle className="w-4 h-4" />
                Select Morning on WhatsApp
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.a>

          {/* Evening Batch Card */}
          <motion.a
            href={`${GYM_INFO.whatsappBase}?text=${encodeURIComponent(eveningMsg)}`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileTap={{ scale: 0.98 }}
            className="group block rounded-2xl bg-[#1A1D23] border border-[#2B303C] hover:border-[#17BEBB] p-6 sm:p-8 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] transition-all duration-300 relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#17BEBB]/10 border border-[#17BEBB]/30 flex items-center justify-center text-[#17BEBB] group-hover:scale-110 transition-transform">
                <Moon className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono font-bold text-[#17BEBB] bg-[#17BEBB]/10 px-3 py-1 rounded-full uppercase">
                Tap to Book Slot
              </span>
            </div>

            <p className="text-xs font-bold text-[#9EABB8] uppercase tracking-wider mb-1">
              {TIMINGS.evening.title}
            </p>
            <h3 className="text-3xl sm:text-4xl text-white mb-2 tracking-wide font-mono">
              {TIMINGS.evening.time}
            </h3>

            <p className="text-sm text-[#9EABB8] mb-4">
              {TIMINGS.evening.desc}
            </p>

            <div className="pt-4 border-t border-[#2B303C] flex items-center justify-between text-xs text-[#E4572E] font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <MessageCircle className="w-4 h-4" />
                Select Evening on WhatsApp
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.a>

        </div>

        {/* Weekly Off Info Banner */}
        <div className="max-w-md mx-auto p-4 rounded-xl bg-[#1A1D23]/60 border border-[#2B303C] flex items-center justify-center gap-3 text-center text-xs text-[#9EABB8]">
          <CalendarX className="w-4 h-4 text-[#E4572E] shrink-0" />
          <span>
            <strong className="text-white">Weekly Rest Day:</strong> Closed on <span className="font-mono text-[#17BEBB] font-semibold">{TIMINGS.weeklyOff}</span> for maintenance & deep sanitization.
          </span>
        </div>

      </div>
    </section>
  );
};
