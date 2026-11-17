import React, { useState } from 'react';
import { MessageCircle, ArrowRight, User, Phone as PhoneIcon } from 'lucide-react';
import { GYM_INFO, TIMINGS } from '../data';
import { createLead } from '../lib/supabase';

export const FreeTrialForm: React.FC = () => {
  // 3-Tap Form State
  const [goal, setGoal] = useState<'Weight loss' | 'Muscle gain' | 'General fitness'>('Weight loss');
  const [batch, setBatch] = useState<string>('Morning');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  // Form Submission -> WhatsApp & Supabase lead record
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Persist lead to Supabase leads table
    createLead({
      name: name.trim() || 'Website Visitor',
      phone: phone.trim() || 'WhatsApp Lead',
      goal,
      batch,
      source: 'website',
      status: 'new',
    }).catch(() => {});

    let text = `Hi Well Flabb, I'd like a free trial.`;
    if (name.trim()) text += ` Name: ${name.trim()}.`;
    if (phone.trim()) text += ` Phone: ${phone.trim()}.`;
    text += ` Goal: ${goal}. Batch: ${batch}.`;

    const encoded = encodeURIComponent(text);
    window.open(`${GYM_INFO.whatsappBase}?text=${encoded}`, '_blank');
  };

  return (
    <section id="free-trial" className="py-[56px] px-5 md:py-24 md:px-8 relative overflow-hidden bg-[#0F1115]">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#E4572E]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 md:mb-16">
          <p className="eyebrow mb-2">ZERO RISK · 100% FREE</p>
          <h2>
            CLAIM YOUR 1-DAY <span className="heading-accent">FREE TRIAL</span>
          </h2>
          <p className="text-[#9EABB8] text-base mt-2">
            Experience Coach Rahul&apos;s personal guidance before you decide. 3 quick taps to reserve your free trial on WhatsApp.
          </p>
        </div>

        {/* Focused Free Trial Form Card */}
        <div className="max-w-2xl mx-auto rounded-2xl bg-[#1A1D23] border border-[#2B303C] p-6 sm:p-8 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)]">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#2B303C]">
            <div>
              <h3 className="text-xl sm:text-2xl text-white">RESERVE TRIAL PASS</h3>
              <p className="text-xs text-[#9EABB8]">No payment required</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#E4572E]/10 border border-[#E4572E]/30 text-xs font-bold text-[#E4572E] uppercase">
              Instant WhatsApp Pass
            </span>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-5">
            
            {/* Step 1: Goal Chips (Tap 1) */}
            <div>
              <label className="block text-xs font-bold text-[#17BEBB] uppercase tracking-wider mb-2">
                1. Select Your Fitness Goal
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Weight loss', 'Muscle gain', 'General fitness'] as const).map((g) => {
                  const isSelected = goal === g;
                  return (
                    <button
                      type="button"
                      key={g}
                      onClick={() => setGoal(g)}
                      className={`min-h-[46px] px-2 py-2.5 rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center border active:scale-95 ${
                        isSelected
                          ? 'bg-[#E4572E] border-[#E4572E] text-white shadow-md shadow-[#E4572E]/30'
                          : 'bg-[#0F1115] border-[#2B303C] text-[#9EABB8] hover:text-white hover:border-[#17BEBB]/60'
                      }`}
                    >
                      {g}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Preferred Batch Chips (Tap 2) */}
            <div>
              <label className="block text-xs font-bold text-[#17BEBB] uppercase tracking-wider mb-2">
                2. Choose Preferred Batch
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { label: `Morning (${TIMINGS.morning.time})`, val: 'Morning' },
                  { label: `Evening (${TIMINGS.evening.time})`, val: 'Evening' },
                ].map((b) => {
                  const isSelected = batch === b.val;
                  return (
                    <button
                      type="button"
                      key={b.val}
                      onClick={() => setBatch(b.val)}
                      className={`min-h-[46px] px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center border active:scale-95 ${
                        isSelected
                          ? 'bg-[#17BEBB] border-[#17BEBB] text-[#0F1115] font-extrabold shadow-md'
                          : 'bg-[#0F1115] border-[#2B303C] text-[#9EABB8] hover:text-white hover:border-[#17BEBB]/60'
                      }`}
                    >
                      {b.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Contact Details (font-size 16px minimum, numeric keypad for phone) */}
            <div>
              <label className="block text-xs font-bold text-[#17BEBB] uppercase tracking-wider mb-2">
                3. Your Contact (Optional - Fast Submit)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="relative">
                  <User className="w-4 h-4 text-[#9EABB8] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    autoComplete="name"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0F1115] border border-[#2B303C] focus:border-[#E4572E] text-white text-base placeholder-[#9EABB8]/50 focus:outline-none transition-colors"
                  />
                </div>
                <div className="relative">
                  <PhoneIcon className="w-4 h-4 text-[#9EABB8] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone number"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0F1115] border border-[#2B303C] focus:border-[#E4572E] text-white text-base placeholder-[#9EABB8]/50 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button (Thumb zone, full width on phones, min 48px) */}
            <button
              type="submit"
              className="pulse-free-trial w-full min-h-[52px] py-3.5 px-6 rounded-xl bg-[#E4572E] hover:bg-[#cf4720] text-white font-extrabold text-base tracking-wide flex items-center justify-center gap-2 shadow-xl shadow-[#E4572E]/30 transition-transform active:scale-95 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-white/20" />
              <span>Submit &amp; Open WhatsApp ({goal})</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <p className="text-center text-[11px] text-[#9EABB8]">
              Opens WhatsApp prefilled to chat directly with Coach Rahul.
            </p>
          </form>
        </div>

      </div>
    </section>
  );
};
