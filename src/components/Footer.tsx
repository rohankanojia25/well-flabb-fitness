import React from 'react';
import { Dumbbell, Star, MapPin, Phone, MessageCircle, Heart } from 'lucide-react';
import { GYM_INFO, TIMINGS } from '../data';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0A0C0E] border-t border-[#2B303C] pt-12 pb-24 md:pb-12 text-[#9EABB8] text-xs">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#2B303C]/60">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#E4572E] flex items-center justify-center text-white">
                <Dumbbell className="w-4 h-4" />
              </div>
              <span className="font-heading text-xl text-white tracking-wider">
                WELL FLABB FITNESS CLUB
              </span>
            </div>
            
            <p className="text-sm text-[#9EABB8] leading-relaxed max-w-md">
              A trainer-led neighborhood gym in Chander Nagar, Krishna Nagar, Delhi. Personal attention, structured diet guidance, and a safe, welcoming atmosphere for men and women.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#F5F5F5]">
              <div className="flex items-center text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
              </div>
              <span className="font-bold">5.0 / 5.0 Rating</span>
              <span className="text-[#9EABB8]">(54 Google Reviews)</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-2.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-1.5 text-xs">
              <li><a href="#programs" className="hover:text-[#17BEBB] transition-colors">Training Programs</a></li>
              <li><a href="#trainer" className="hover:text-[#17BEBB] transition-colors">Meet Coach Rahul</a></li>
              <li><a href="#timings" className="hover:text-[#17BEBB] transition-colors">Daily IST Timings</a></li>
              <li><a href="#plans" className="hover:text-[#17BEBB] transition-colors">Membership Plans</a></li>
              <li><a href="#reviews" className="hover:text-[#17BEBB] transition-colors">Member Reviews</a></li>
              <li><a href="#visit" className="hover:text-[#17BEBB] transition-colors">Location & Directions</a></li>
              <li><a href="#admin" className="hover:text-[#E4572E] text-[#9EABB8]/70 transition-colors">Staff Admin Portal</a></li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="md:col-span-4 space-y-2.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Gym Timings & Location</h4>
            <div className="space-y-1.5 text-xs">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#E4572E] shrink-0" />
                <span>{GYM_INFO.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#17BEBB] shrink-0" />
                <a href={`tel:${GYM_INFO.phoneRaw}`} className="hover:text-white font-mono">{GYM_INFO.phoneDisplay}</a>
              </p>
              <p className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-[#17BEBB] shrink-0" />
                <a href={GYM_INFO.whatsappBase} target="_blank" rel="noopener noreferrer" className="hover:text-white font-mono">WhatsApp Support (+91 99996 36973)</a>
              </p>
              <p className="text-[11px] text-[#9EABB8]/80 pt-1">
                Morning: {TIMINGS.morning.time} • Evening: {TIMINGS.evening.time} • Closed {TIMINGS.weeklyOff}
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#9EABB8]">
          <p>© {new Date().getFullYear()} Well Flabb Fitness Club. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-[#E4572E] fill-[#E4572E]" /> for healthy transformations in Krishna Nagar, Delhi.
          </p>
        </div>

      </div>
    </footer>
  );
};
