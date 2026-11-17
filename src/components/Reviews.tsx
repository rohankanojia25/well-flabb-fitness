import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote, ExternalLink, CheckCircle } from 'lucide-react';
import { REVIEWS, GYM_INFO } from '../data';

export const Reviews: React.FC = () => {
  return (
    <section id="reviews" className="py-[56px] px-5 md:py-24 md:px-8 relative overflow-hidden bg-[#1A1D23]/30">
      <div className="w-full max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 md:mb-16">
          <p className="eyebrow mb-2">GOOGLE REVIEWS</p>
          <h2>
            WHAT OUR <span className="heading-accent">MEMBERS</span> SAY
          </h2>
          <p className="text-[#9EABB8] text-base mt-2">
            Read direct quotes from verified local members training at Well Flabb Fitness Club in Krishna Nagar.
          </p>

          {/* Rating Shown Once, Read from One Config Constant */}
          <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full bg-[#1A1D23] border border-[#2B303C]">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <span className="text-white font-extrabold text-sm">{GYM_INFO.ratingSummary}</span>
          </div>
        </div>

        {/* Reviews Cards: Swipe row on mobile with scroll-snap & peek, grid on desktop */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-4 -mx-5 px-5 md:mx-0 md:px-0">
          {REVIEWS.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="shrink-0 w-[84vw] max-w-[320px] md:w-auto snap-center rounded-2xl bg-[#1A1D23] border border-[#2B303C] p-6 flex flex-col justify-between shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] hover:border-[#17BEBB]/60 transition-all duration-300 relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#2B303C] group-hover:text-[#17BEBB]/40 transition-colors" />
                </div>

                <blockquote className="text-base sm:text-lg font-medium text-white mb-6 leading-relaxed">
                  &ldquo;{review.quote}&rdquo;
                </blockquote>
              </div>

              <div className="pt-4 border-t border-[#2B303C] flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-[#F5F5F5]">{review.author}</span>
                    <CheckCircle className="w-3 h-3 text-[#17BEBB]" />
                  </div>
                  <span className="text-[10px] text-[#9EABB8]">Verified Delhi Member</span>
                </div>
                <span className="text-[10px] font-bold text-[#17BEBB] bg-[#17BEBB]/10 px-2 py-0.5 rounded">
                  {review.highlight}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Link to all reviews on Google */}
        <div className="text-center mt-6 md:mt-8">
          <a
            href={GYM_INFO.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1A1D23] hover:bg-[#232730] border border-[#2B303C] text-sm font-semibold text-white transition-colors active:scale-95"
          >
            <span>Read all reviews on Google Maps</span>
            <ExternalLink className="w-4 h-4 text-[#17BEBB]" />
          </a>
        </div>

      </div>
    </section>
  );
};
