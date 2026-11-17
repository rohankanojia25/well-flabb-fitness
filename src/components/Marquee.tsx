import React from 'react';
import { Sparkles, Flame, Dumbbell, Heart, Award } from 'lucide-react';

export const Marquee: React.FC = () => {
  const items = [
    { label: 'Weight Loss', icon: Flame },
    { label: 'Muscle Gain', icon: Dumbbell },
    { label: 'Beginner Strength', icon: Award },
    { label: "Women's Fitness", icon: Heart },
    { label: 'Personal Training [confirm]', icon: Sparkles },
    { label: 'Custom Diet Guidance', icon: Flame },
    { label: '1-on-1 Floor Coaching', icon: Dumbbell },
  ];

  return (
    <div className="w-full bg-[#1A1D23] border-y border-[#2B303C] py-3.5 overflow-hidden select-none relative">
      <div className="flex w-max animate-marquee space-x-8">
        {[...items, ...items, ...items].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center gap-3 shrink-0">
              <span className="w-2 h-2 rounded-full bg-[#E4572E]" />
              <Icon className="w-4 h-4 text-[#17BEBB]" />
              <span className="font-heading text-lg sm:text-xl tracking-wider text-[#F5F5F5] uppercase">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-marquee {
          animation: marquee 22s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};
