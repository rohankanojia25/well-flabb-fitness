import React, { useState, useMemo } from 'react';
import { Calculator, MessageCircle, ArrowRight, Activity, Scale, ShieldAlert, Sparkles } from 'lucide-react';
import { GYM_INFO } from '../data';

export const WeightLossCalculator: React.FC = () => {
  // Inputs state
  const [age, setAge] = useState<number>(28);
  const [gender, setGender] = useState<'Male' | 'Female'>('Male');
  const [heightCm, setHeightCm] = useState<number>(170);
  const [weightKg, setWeightKg] = useState<number>(82);
  const [goalWeightKg, setGoalWeightKg] = useState<number>(72);
  const [activityLevel, setActivityLevel] = useState<string>('Moderate (3-5 days/wk)');

  // Activity level options
  const activityOptions = [
    { label: 'Sedentary', sub: 'Little or no exercise' },
    { label: 'Light (1-2 days/wk)', sub: 'Light walking or workouts' },
    { label: 'Moderate (3-5 days/wk)', sub: 'Regular gym sessions' },
    { label: 'Very Active (6+ days/wk)', sub: 'Intense training / sports' },
  ];

  // Calculations (Live updating)
  const { bmi, bmiCategory, bmiColor, weightToLose, minWeeks, maxWeeks, avgWeeks } = useMemo(() => {
    const heightM = heightCm / 100;
    const computedBmi = heightM > 0 ? Number((weightKg / (heightM * heightM)).toFixed(1)) : 0;

    let category = 'Normal';
    let color = 'text-[#17BEBB]';
    if (computedBmi < 18.5) {
      category = 'Underweight';
      color = 'text-amber-400';
    } else if (computedBmi >= 18.5 && computedBmi < 25) {
      category = 'Normal';
      color = 'text-[#17BEBB]';
    } else if (computedBmi >= 25 && computedBmi < 30) {
      category = 'Overweight';
      color = 'text-[#E4572E]';
    } else {
      category = 'Obese';
      color = 'text-red-400';
    }

    const toLose = Math.max(0, weightKg - goalWeightKg);
    const minW = toLose > 0 ? Math.ceil(toLose / 1.0) : 0;
    const maxW = toLose > 0 ? Math.ceil(toLose / 0.5) : 0;
    const avgW = toLose > 0 ? Math.round(toLose / 0.75) : 0;

    return {
      bmi: computedBmi,
      bmiCategory: category,
      bmiColor: color,
      weightToLose: toLose,
      minWeeks: minW,
      maxWeeks: maxW,
      avgWeeks: avgW,
    };
  }, [heightCm, weightKg, goalWeightKg]);

  // WhatsApp Message Generation
  const handleWhatsAppShare = () => {
    const message = [
      `Hi Well Flabb, I calculated my weight-loss plan on your website:`,
      `• Age: ${age} yrs`,
      `• Gender: ${gender}`,
      `• Height: ${heightCm} cm`,
      `• Current Weight: ${weightKg} kg`,
      `• Goal Weight: ${goalWeightKg} kg (Target loss: ${weightToLose} kg)`,
      `• Activity Level: ${activityLevel}`,
      `• Current BMI: ${bmi} (${bmiCategory})`,
      `• Safe Weekly Loss Range: 0.5 - 1.0 kg/week`,
      `• Estimated Timeline: ${minWeeks} to ${maxWeeks} weeks (~${avgWeeks} weeks)`,
      `I'd like coach Rahul to build my customized diet and workout plan!`,
    ].join('\n');

    const url = `${GYM_INFO.whatsappBase}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="weight-loss-plan" className="py-[56px] px-5 md:py-24 md:px-8 bg-[#0F1115] relative overflow-hidden border-t border-[#2B303C]/60">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#17BEBB]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 md:mb-14">
          <p className="eyebrow mb-2">CUSTOM CALCULATOR</p>
          <h2>
            WHAT&apos;S YOUR <span className="heading-accent">WEIGHT-LOSS PLAN?</span>
          </h2>
          <p className="text-[#9EABB8] text-base mt-2">
            Input your details below to see your BMI, safe weekly loss rate, and a realistic timeframe to reach your target weight.
          </p>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          
          {/* Left Column: Interactive Inputs (Phone-friendly, large targets) */}
          <div className="lg:col-span-7 rounded-2xl bg-[#1A1D23] border border-[#2B303C] p-5 sm:p-8 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)]">
            <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-[#2B303C]">
              <div className="w-9 h-9 rounded-lg bg-[#E4572E]/10 border border-[#E4572E]/30 flex items-center justify-center text-[#E4572E]">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl text-white">YOUR BODY METRICS</h3>
                <p className="text-xs text-[#9EABB8]">Fast tap &amp; slider controls</p>
              </div>
            </div>

            <div className="space-y-5">
              
              {/* Row 1: Gender & Age */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Gender */}
                <div>
                  <label className="block text-xs font-bold text-[#17BEBB] uppercase tracking-wider mb-2">
                    Gender
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['Male', 'Female'] as const).map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setGender(g)}
                        className={`min-h-[46px] rounded-xl text-sm font-bold transition-all flex items-center justify-center border active:scale-95 ${
                          gender === g
                            ? 'bg-[#E4572E] border-[#E4572E] text-white shadow-md'
                            : 'bg-[#0F1115] border-[#2B303C] text-[#9EABB8] hover:text-white'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Age */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-bold text-[#17BEBB] uppercase tracking-wider">
                      Age (Years)
                    </label>
                    <span className="text-sm font-bold text-white">{age} yrs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setAge((prev) => Math.max(16, prev - 1))}
                      className="w-11 h-11 rounded-xl bg-[#0F1115] border border-[#2B303C] text-white text-lg font-bold flex items-center justify-center active:scale-90"
                      aria-label="Decrease Age"
                    >
                      -
                    </button>
                    <input
                      type="range"
                      min={16}
                      max={75}
                      value={age}
                      onChange={(e) => setAge(Number(e.target.value))}
                      className="flex-1 accent-[#E4572E] bg-[#0F1115] h-2.5 rounded-lg cursor-pointer"
                    />
                    <button
                      type="button"
                      onClick={() => setAge((prev) => Math.min(75, prev + 1))}
                      className="w-11 h-11 rounded-xl bg-[#0F1115] border border-[#2B303C] text-white text-lg font-bold flex items-center justify-center active:scale-90"
                      aria-label="Increase Age"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Height (cm) */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-[#17BEBB] uppercase tracking-wider">
                    Height (cm)
                  </label>
                  <span className="text-base font-bold text-white">{heightCm} cm</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setHeightCm((prev) => Math.max(130, prev - 1))}
                    className="w-11 h-11 rounded-xl bg-[#0F1115] border border-[#2B303C] text-white text-lg font-bold flex items-center justify-center active:scale-90"
                    aria-label="Decrease Height"
                  >
                    -
                  </button>
                  <input
                    type="range"
                    min={130}
                    max={215}
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    className="flex-1 accent-[#17BEBB] bg-[#0F1115] h-2.5 rounded-lg cursor-pointer"
                  />
                  <button
                    type="button"
                    onClick={() => setHeightCm((prev) => Math.min(215, prev + 1))}
                    className="w-11 h-11 rounded-xl bg-[#0F1115] border border-[#2B303C] text-white text-lg font-bold flex items-center justify-center active:scale-90"
                    aria-label="Increase Height"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Weight (kg) & Goal Weight (kg) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Current Weight */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-bold text-[#17BEBB] uppercase tracking-wider">
                      Current Weight (kg)
                    </label>
                    <span className="text-base font-bold text-white">{weightKg} kg</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const next = Math.max(45, weightKg - 1);
                        setWeightKg(next);
                        if (goalWeightKg >= next) setGoalWeightKg(next - 1);
                      }}
                      className="w-11 h-11 rounded-xl bg-[#0F1115] border border-[#2B303C] text-white text-lg font-bold flex items-center justify-center active:scale-90"
                      aria-label="Decrease Current Weight"
                    >
                      -
                    </button>
                    <input
                      type="range"
                      min={45}
                      max={160}
                      value={weightKg}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setWeightKg(val);
                        if (val <= goalWeightKg) setGoalWeightKg(val - 1);
                      }}
                      className="flex-1 accent-[#E4572E] bg-[#0F1115] h-2.5 rounded-lg cursor-pointer"
                    />
                    <button
                      type="button"
                      onClick={() => setWeightKg((prev) => Math.min(160, prev + 1))}
                      className="w-11 h-11 rounded-xl bg-[#0F1115] border border-[#2B303C] text-white text-lg font-bold flex items-center justify-center active:scale-90"
                      aria-label="Increase Current Weight"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Goal Weight */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-bold text-[#17BEBB] uppercase tracking-wider">
                      Goal Weight (kg)
                    </label>
                    <span className="text-base font-bold text-[#17BEBB]">{goalWeightKg} kg</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setGoalWeightKg((prev) => Math.max(40, prev - 1))}
                      className="w-11 h-11 rounded-xl bg-[#0F1115] border border-[#2B303C] text-white text-lg font-bold flex items-center justify-center active:scale-90"
                      aria-label="Decrease Goal Weight"
                    >
                      -
                    </button>
                    <input
                      type="range"
                      min={40}
                      max={Math.max(41, weightKg - 1)}
                      value={goalWeightKg}
                      onChange={(e) => setGoalWeightKg(Number(e.target.value))}
                      className="flex-1 accent-[#17BEBB] bg-[#0F1115] h-2.5 rounded-lg cursor-pointer"
                    />
                    <button
                      type="button"
                      onClick={() => setGoalWeightKg((prev) => Math.min(weightKg - 1, prev + 1))}
                      className="w-11 h-11 rounded-xl bg-[#0F1115] border border-[#2B303C] text-white text-lg font-bold flex items-center justify-center active:scale-90"
                      aria-label="Increase Goal Weight"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Activity Level */}
              <div>
                <label className="block text-xs font-bold text-[#17BEBB] uppercase tracking-wider mb-2">
                  Daily Activity Level
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activityOptions.map((opt) => {
                    const isSelected = activityLevel === opt.label;
                    return (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => setActivityLevel(opt.label)}
                        className={`p-3 rounded-xl text-left border transition-all active:scale-95 ${
                          isSelected
                            ? 'bg-[#17BEBB]/15 border-[#17BEBB] text-white'
                            : 'bg-[#0F1115] border-[#2B303C] text-[#9EABB8] hover:border-[#17BEBB]/60'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white">{opt.label}</span>
                          {isSelected && <span className="w-2 h-2 rounded-full bg-[#17BEBB]" />}
                        </div>
                        <span className="text-[11px] text-[#9EABB8] block mt-0.5">{opt.sub}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Live Results & WhatsApp Action */}
          <div className="lg:col-span-5 rounded-2xl bg-[#1A1D23] border border-[#2B303C] p-5 sm:p-8 flex flex-col justify-between shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] space-y-5">
            
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#2B303C]">
                <div>
                  <h3 className="text-xl sm:text-2xl text-white">YOUR ESTIMATED PLAN</h3>
                  <p className="text-xs text-[#9EABB8]">Real-time results based on safe guidelines</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#17BEBB]/10 border border-[#17BEBB]/30 text-xs font-bold text-[#17BEBB] uppercase">
                  Live
                </span>
              </div>

              {/* Results Grid */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="p-3.5 rounded-xl bg-[#0F1115] border border-[#2B303C]">
                  <div className="flex items-center gap-1.5 text-xs text-[#9EABB8] mb-1">
                    <Activity className="w-3.5 h-3.5 text-[#17BEBB]" />
                    <span>Your BMI</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-heading text-white tracking-wide">
                    {bmi}
                  </div>
                  <span className={`text-xs font-bold uppercase tracking-wider ${bmiColor}`}>
                    {bmiCategory}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0F1115] border border-[#2B303C]">
                  <div className="flex items-center gap-1.5 text-xs text-[#9EABB8] mb-1">
                    <Scale className="w-3.5 h-3.5 text-[#E4572E]" />
                    <span>Target Loss</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-heading text-[#E4572E] tracking-wide">
                    {weightToLose} <span className="text-sm font-sans text-white">KG</span>
                  </div>
                  <span className="text-[11px] text-[#9EABB8]">
                    {weightKg}kg → {goalWeightKg}kg
                  </span>
                </div>
              </div>

              {/* Safe Weekly Loss Range & Estimated Weeks */}
              <div className="space-y-2.5">
                <div className="p-3 rounded-xl bg-[#0F1115] border border-[#2B303C]">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-semibold text-[#9EABB8]">Safe Weekly Loss Range</span>
                    <span className="text-xs font-bold text-[#17BEBB]">0.5 – 1.0 kg/wk</span>
                  </div>
                  <p className="text-[11px] text-[#9EABB8]">
                    Adhering to certified fitness norms for fat loss without muscle depletion.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#1A1D23] to-[#0F1115] border-2 border-[#17BEBB]/40">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Estimated Weeks to Goal
                    </span>
                    <span className="font-heading text-2xl text-[#17BEBB] tracking-wider">
                      {minWeeks} – {maxWeeks} WEEKS
                    </span>
                  </div>
                  <p className="text-xs text-[#9EABB8]">
                    At an average safe pace (~0.75 kg/week), achieve your {goalWeightKg}kg target in approximately <strong className="text-white font-bold">{avgWeeks} weeks</strong>.
                  </p>
                </div>
              </div>

              {/* Note about Coach Rahul building diet & workout plan */}
              <div className="mt-3 p-3.5 rounded-xl bg-[#E4572E]/10 border border-[#E4572E]/30 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#E4572E] shrink-0 mt-0.5" />
                <p className="text-xs text-white leading-relaxed">
                  <strong className="text-[#E4572E] font-bold">Trainer-Built Plan:</strong> Well Flabb&apos;s coach Rahul personally designs your customized Indian diet chart and progressive floor workout to hit this goal safely.
                </p>
              </div>
            </div>

            {/* Bottom Button + Disclaimer */}
            <div className="space-y-2.5 pt-1">
              <button
                type="button"
                onClick={handleWhatsAppShare}
                className="pulse-free-trial w-full min-h-[50px] py-3 px-6 rounded-xl bg-[#E4572E] hover:bg-[#cf4720] text-white font-extrabold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2 shadow-xl shadow-[#E4572E]/30 transition-transform active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-white/20" />
                <span>Get My Plan on WhatsApp</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <p className="text-center text-[11px] text-[#9EABB8]/90 flex items-center justify-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-[#17BEBB] shrink-0" />
                <span>Estimates only. Consult a doctor for medical conditions.</span>
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
