import React, { useState } from 'react';
import { MapPin, Phone, MessageCircle, Navigation, ExternalLink, Clock, ShieldCheck } from 'lucide-react';
import { GYM_INFO, TIMINGS } from '../data';

export const VisitUs: React.FC = () => {
  const [showInteractiveMap, setShowInteractiveMap] = useState(false);

  return (
    <section id="visit" className="py-16 md:py-24 relative overflow-hidden bg-[#1A1D23]/50">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
          <p className="eyebrow mb-2">LOCATION & CONTACT</p>
          <h2>
            VISIT WELL FLABB <span className="heading-accent">FITNESS</span>
          </h2>
          <p className="text-[#9EABB8] text-base mt-2">
            Located conveniently in Chander Nagar, Krishna Nagar, East Delhi. Walk in for a tour or call ahead.
          </p>
        </div>

        {/* 2-Column Info & Map Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
          
          {/* Contact & Address Details */}
          <div className="lg:col-span-5 rounded-2xl bg-[#1A1D23] border border-[#2B303C] p-6 sm:p-8 flex flex-col justify-between shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)]">
            <div className="space-y-6">
              
              {/* Address item */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#E4572E]/10 border border-[#E4572E]/30 flex items-center justify-center text-[#E4572E] shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#17BEBB] uppercase tracking-wider mb-1">
                    Gym Address
                  </h4>
                  <p className="text-base font-semibold text-white leading-snug">
                    {GYM_INFO.name}
                  </p>
                  <p className="text-sm font-mono text-[#9EABB8] mt-1">
                    {GYM_INFO.address}
                  </p>
                  <p className="text-xs text-[#9EABB8] mt-0.5">
                    Near Krishna Nagar Metro / Main Market, East Delhi
                  </p>
                </div>
              </div>

              {/* Hours item */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#17BEBB]/10 border border-[#17BEBB]/30 flex items-center justify-center text-[#17BEBB] shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#17BEBB] uppercase tracking-wider mb-1">
                    Operating Batches (IST)
                  </h4>
                  <p className="text-sm text-white font-mono">
                    Morning: {TIMINGS.morning.time}
                  </p>
                  <p className="text-sm text-white font-mono">
                    Evening: {TIMINGS.evening.time}
                  </p>
                  <p className="text-xs text-[#9EABB8] mt-1">
                    Weekly Off: <span className="font-mono text-[#E4572E] font-semibold">{TIMINGS.weeklyOff}</span>
                  </p>
                </div>
              </div>

              {/* Phone contact */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#E4572E]/10 border border-[#E4572E]/30 flex items-center justify-center text-[#E4572E] shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#17BEBB] uppercase tracking-wider mb-1">
                    Direct Gym & Coach Line
                  </h4>
                  <a
                    href={`tel:${GYM_INFO.phoneRaw}`}
                    className="text-lg font-bold font-mono text-white hover:text-[#E4572E] transition-colors"
                  >
                    {GYM_INFO.phoneDisplay}
                  </a>
                  <p className="text-xs text-[#9EABB8]">Direct WhatsApp & Phone Support</p>
                </div>
              </div>

            </div>

            {/* Quick Action Buttons */}
            <div className="pt-6 mt-6 border-t border-[#2B303C] space-y-2.5">
              <a
                href={GYM_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[48px] py-3 px-4 rounded-xl bg-[#17BEBB] hover:bg-[#139f9d] text-[#0F1115] font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Driving Directions</span>
              </a>

              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={`tel:${GYM_INFO.phoneRaw}`}
                  className="min-h-[46px] py-2.5 px-3 rounded-xl bg-[#232730] hover:bg-[#2B303C] border border-[#2B303C] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors active:scale-95"
                >
                  <Phone className="w-3.5 h-3.5 text-[#17BEBB]" />
                  <span>Call Now</span>
                </a>
                <a
                  href={`${GYM_INFO.whatsappBase}?text=${encodeURIComponent("Hi Well Flabb, I want to visit your gym in Chander Nagar, Krishna Nagar. What is the exact landmark?")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[46px] py-2.5 px-3 rounded-xl bg-[#232730] hover:bg-[#E4572E] border border-[#2B303C] hover:border-[#E4572E] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors active:scale-95"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#E4572E] group-hover:text-white" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

          </div>

          {/* Map Section (Speed on 4G: Map loads only when tapped!) */}
          <div className="lg:col-span-7 rounded-2xl bg-[#1A1D23] border border-[#2B303C] overflow-hidden min-h-[340px] sm:min-h-[420px] relative flex flex-col justify-between shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)]">
            
            {showInteractiveMap ? (
              <iframe
                title="Well Flabb Fitness Club Google Map"
                src="https://maps.google.com/maps?q=Well+Flabb+Fitness+Club+Krishna+Nagar+Delhi&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full min-h-[380px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              /* High-performance static map preview (Zero heavy iframe payload until tapped) */
              <div className="relative w-full h-full min-h-[380px] flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#1A1D23] via-[#0F1115] to-[#1A1D23] text-center">
                
                {/* Visual Map Grid Pattern */}
                <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#17BEBB_1px,transparent_1px)] [background-size:16px_16px]" />
                
                <div className="relative z-10 max-w-sm flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl bg-[#E4572E]/10 border border-[#E4572E]/30 flex items-center justify-center text-[#E4572E] mb-4 shadow-xl">
                    <MapPin className="w-8 h-8 animate-bounce" />
                  </div>

                  <h3 className="text-2xl text-white mb-1">
                    CHANDER NAGAR, KRISHNA NAGAR
                  </h3>
                  <p className="text-xs text-[#9EABB8] mb-6">
                    Tap below to load the live map or open directly in the Google Maps app with live GPS directions.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 w-full">
                    <button
                      type="button"
                      onClick={() => setShowInteractiveMap(true)}
                      className="min-h-[46px] px-5 py-2.5 rounded-xl bg-[#232730] hover:bg-[#2B303C] border border-[#2B303C] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors active:scale-95"
                    >
                      <span>Load Embedded Map</span>
                    </button>

                    <a
                      href={GYM_INFO.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[46px] px-5 py-2.5 rounded-xl bg-[#E4572E] hover:bg-[#cf4720] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-transform active:scale-95"
                    >
                      <span>Open in Google Maps</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] text-[#9EABB8] border-t border-[#2B303C]/50 pt-2">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#17BEBB]" />
                    Safe Neighborhood Gym
                  </span>
                  <span>East Delhi, PIN 110051</span>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
