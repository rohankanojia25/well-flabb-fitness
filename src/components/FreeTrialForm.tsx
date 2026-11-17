import React, { useState } from 'react';
import { MessageCircle, Flame, Calculator, ArrowRight, User, Phone as PhoneIcon } from 'lucide-react';
import { GYM_INFO, TIMINGS } from '../data';
import { createLead } from '../lib/supabase';

export const FreeTrialForm: React.FC = () => {
  // 3-Tap Form State
  const [goal, setGoal] = useState<'Weight loss' | 'Muscle gain' | 'General fitness'>('Weight loss');
  const [batch, setBatch] = useState<string>('Morning');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  // Interactive Weight Loss Calculator State (Sliders + Steppers, NO manual typing)
  const [currentWeight, setCurrentWeight] = useState<number>(78); // kg
  const [targetWeight, setTargetWeight] = useState<number>(68); // kg
  const [activityDays, setActivityDays] = useState<number>(4); // days/week

  // Calculate estimated timeline (healthy 0.5 - 0.8 kg / week with guided diet + workouts)
  const weightToLose = Math.max(0, currentWeight - targetWeight);
  const estimatedWeeks = weightToLose > 0 ? Math.ceil(weightToLose / (0.6 + (activityDays >= 4 ? 0.2 : 0))) : 0;
  const estimatedMonths = (estimatedWeeks / 4.3).toFixed(1);

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

  const handleCalculatorWhatsApp = () => {
    const text = `Hi Well Flabb, I used your weight-loss calculator: Current ${currentWeight}kg, Target ${targetWeight}kg (Goal: Lose ${weightToLose}kg). Can coach Rahul help me plan my diet and free trial?`;
    window.open(`${GYM_INFO.whatsappBase}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="free-trial" className="py-16 md:py-24 relative overflow-hidden bg-[#0F1115]">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#E4572E]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
          <p className="eyebrow mb-2">ZERO RISK • 100% FREE</p>
          <h2>
            CLAIM YOUR 1-DAY <span className="heading-accent">FREE TRIAL</span>
          </h2>
          <p className="text-[#9EABB8] text-base mt-2">
            Experience Coach Rahul's personal guidance before you decide. 3 quick taps to reserve your free trial on WhatsApp.
          </p>
        </div>

        {/* 2-Column Desktop Grid: Left Form, Right Weight-Loss Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          
          {/* Left Column: 3-Tap Free Trial Form */}
          <div className="lg:col-span-7 rounded-2xl bg-[#1A1D23] border border-[#2B303C] p-6 sm:p-8 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)]">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#2B303C]">
              <div>
                <h3 className="text-2xl text-white">RESERVE TRIAL PASS</h3>
                <p className="text-xs text-[#9EABB8]">No credit card or payment required</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#E4572E]/10 border border-[#E4572E]/30 text-xs font-bold text-[#E4572E] uppercase">
                Instant WhatsApp Pass
              </span>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              
              {/* Step 1: Goal Chips (Tap 1) */}
              <div>
                <label className="block text-xs font-bold text-[#17BEBB] uppercase tracking-wider mb-2.5">
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
                <label className="block text-xs font-bold text-[#17BEBB] uppercase tracking-wider mb-2.5">
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

              {/* Step 3: Contact Details (Name + Phone with tel keypad) */}
              <div>
                <label className="block text-xs font-bold text-[#17BEBB] uppercase tracking-wider mb-2.5">
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
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0F1115] border border-[#2B303C] focus:border-[#E4572E] text-white text-sm placeholder-[#9EABB8]/50 focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="relative">
                    <PhoneIcon className="w-4 h-4 text-[#9EABB8] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      inputMode="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone number"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0F1115] border border-[#2B303C] focus:border-[#E4572E] text-white text-sm placeholder-[#9EABB8]/50 focus:outline-none transition-colors"
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
                <span>Submit & Open WhatsApp ({goal})</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <p className="text-center text-[11px] text-[#9EABB8]">
                Opens WhatsApp prefilled with your goal and batch choice to chat directly with Coach Rahul.
              </p>
            </form>
          </div>

          {/* Right Column: Weight-Loss Calculator (Sliders & Steppers, No Typing) */}
          <div className="lg:col-span-5 rounded-2xl bg-[#1A1D23] border border-[#2B303C] p-6 sm:p-8 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)]">
            <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-[#2B303C]">
              <div className="w-9 h-9 rounded-lg bg-[#17BEBB]/10 border border-[#17BEBB]/30 flex items-center justify-center text-[#17BEBB]">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl text-white">FAT-LOSS TIMELINE</h3>
                <p className="text-[11px] text-[#9EABB8]">Interactive projection slider (no typing)</p>
              </div>
            </div>

            <div className="space-y-5">
              
              {/* Slider 1: Current Weight */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs text-[#9EABB8] font-semibold">Current Weight</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setCurrentWeight(Math.max(45, currentWeight - 1))}
                      className="w-7 h-7 rounded bg-[#0F1115] border border-[#2B303C] text-white text-xs flex items-center justify-center font-bold active:scale-90"
                    >
                      -
                    </button>
                    <span className="font-mono text-base font-bold text-white w-12 text-center">
                      {currentWeight} kg
                    </span>
                    <button
                      type="button"
                      onClick={() => setCurrentWeight(Math.min(160, currentWeight + 1))}
                      className="w-7 h-7 rounded bg-[#0F1115] border border-[#2B303C] text-white text-xs flex items-center justify-center font-bold active:scale-90"
                    >
                      +
                    </button>
                  </div>
                </div>
                <input
                  type="range"
                  min={45}
                  max={160}
                  value={currentWeight}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setCurrentWeight(val);
                    if (val <= targetWeight) setTargetWeight(val - 1);
                  }}
                  className="w-full accent-[#E4572E] bg-[#0F1115] h-2 rounded-lg cursor-pointer"
                />
              </div>

              {/* Slider 2: Target Weight */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs text-[#9EABB8] font-semibold">Target Weight</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setTargetWeight(Math.max(40, targetWeight - 1))}
                      className="w-7 h-7 rounded bg-[#0F1115] border border-[#2B303C] text-white text-xs flex items-center justify-center font-bold active:scale-90"
                    >
                      -
                    </button>
                    <span className="font-mono text-base font-bold text-[#17BEBB] w-12 text-center">
                      {targetWeight} kg
                    </span>
                    <button
                      type="button"
                      onClick={() => setTargetWeight(Math.min(currentWeight - 1, targetWeight + 1))}
                      className="w-7 h-7 rounded bg-[#0F1115] border border-[#2B303C] text-white text-xs flex items-center justify-center font-bold active:scale-90"
                    >
                      +
                    </button>
                  </div>
                </div>
                <input
                  type="range"
                  min={40}
                  max={Math.max(41, currentWeight - 1)}
                  value={targetWeight}
                  onChange={(e) => setTargetWeight(Number(e.target.value))}
                  className="w-full accent-[#17BEBB] bg-[#0F1115] h-2 rounded-lg cursor-pointer"
                />
              </div>

              {/* Stepper: Workout Days per week */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-[#9EABB8] font-semibold">Workout Days / Week</span>
                  <span className="font-mono text-xs font-bold text-white">{activityDays} Days</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[3, 4, 5, 6].map((days) => (
                    <button
                      key={days}
                      type="button"
                      onClick={() => setActivityDays(days)}
                      className={`py-1.5 rounded-lg text-xs font-bold transition-all active:scale-95 ${
                        activityDays === days
                          ? 'bg-[#17BEBB] text-[#0F1115]'
                          : 'bg-[#0F1115] border border-[#2B303C] text-[#9EABB8]'
                      }`}
                    >
                      {days} Days
                    </button>
                  ))}
                </div>
              </div>

              {/* Projection Result Card */}
              <div className="p-4 rounded-xl bg-[#0F1115] border border-[#2B303C] text-center">
                <p className="text-[11px] font-bold text-[#9EABB8] uppercase tracking-wider mb-1">
                  Estimated Guided Timeline
                </p>
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Flame className="w-5 h-5 text-[#E4572E]" />
                  <span className="text-3xl font-heading text-white tracking-wider">
                    ~{estimatedMonths} MONTHS
                  </span>
                  <span className="text-xs text-[#17BEBB] font-mono">({estimatedWeeks} wks)</span>
                </div>
                <p className="text-xs text-[#9EABB8]">
                  To lose <strong className="text-white">{weightToLose} kg</strong> safely with Rahul's floor coaching & meal plan.
                </p>
              </div>

              {/* WhatsApp Calculator Plan CTA */}
              <button
                type="button"
                onClick={handleCalculatorWhatsApp}
                className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-[#232730] hover:bg-[#17BEBB] text-[#17BEBB] hover:text-[#0F1115] border border-[#17BEBB]/40 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Discuss This Goal With Rahul</span>
              </button>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
