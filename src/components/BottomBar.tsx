import React from 'react';
import { Phone, MessageCircle, Navigation } from 'lucide-react';
import { GYM_INFO } from '../data';

interface BottomBarProps {
  onOpenTrial: () => void;
}

export const BottomBar: React.FC<BottomBarProps> = ({ onOpenTrial }) => {
  return (
    <aside
      aria-label="Quick Mobile Actions"
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#0F1115]/95 border-t border-[#2B303C] shadow-[0_-5px_20px_rgba(0,0,0,0.6)]"
      style={{
        height: 'calc(64px + env(safe-area-inset-bottom, 0px))',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
    >
      <div className="h-16 max-w-md mx-auto px-4 grid grid-cols-3 items-center">
        
        {/* Action 1: Call */}
        <a
          href={`tel:${GYM_INFO.phoneRaw}`}
          className="flex flex-col items-center justify-center gap-1 text-[#9EABB8] hover:text-white active:scale-95 transition-transform"
          aria-label="Call Well Flabb Gym"
        >
          <div className="w-8 h-8 rounded-full bg-[#1A1D23] border border-[#2B303C] flex items-center justify-center text-[#17BEBB]">
            <Phone className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-bold tracking-tight">Call</span>
        </a>

        {/* Action 2: Free Trial (Center, Orange #E4572E, Larger) */}
        <div className="flex justify-center -mt-4">
          <button
            onClick={onOpenTrial}
            className="pulse-free-trial w-14 h-14 rounded-full bg-[#E4572E] text-white flex flex-col items-center justify-center shadow-lg shadow-[#E4572E]/40 border-2 border-[#0F1115] active:scale-95 transition-transform cursor-pointer"
            aria-label="Book Free Trial on WhatsApp"
          >
            <MessageCircle className="w-6 h-6 fill-white/20" />
            <span className="text-[9px] font-extrabold uppercase tracking-tight -mt-0.5">Trial</span>
          </button>
        </div>

        {/* Action 3: Directions */}
        <a
          href={GYM_INFO.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 text-[#9EABB8] hover:text-white active:scale-95 transition-transform"
          aria-label="Directions to Well Flabb Gym"
        >
          <div className="w-8 h-8 rounded-full bg-[#1A1D23] border border-[#2B303C] flex items-center justify-center text-[#17BEBB]">
            <Navigation className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-bold tracking-tight">Directions</span>
        </a>

      </div>
    </aside>
  );
};
