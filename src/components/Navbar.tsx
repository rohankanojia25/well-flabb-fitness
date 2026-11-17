import React, { useState, useEffect } from 'react';
import { Menu, X, Dumbbell, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenTrial: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTrial }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Programs', href: '#programs' },
    { label: 'Trainer', href: '#trainer' },
    { label: 'Timings', href: '#timings' },
    { label: 'Plans', href: '#plans' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Visit', href: '#visit' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0F1115]/95 border-b border-[#2B303C] shadow-lg'
          : 'bg-[#0F1115]/75'
      }`}
      style={{
        paddingTop: 'env(safe-area-inset-top, 0px)',
        minHeight: 'calc(64px + env(safe-area-inset-top, 0px))',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2.5 group focus:outline-none"
          aria-label="Well Flabb Fitness Club Home"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#E4572E] to-[#cf4720] flex items-center justify-center text-white shadow-md shadow-[#E4572E]/20">
            <Dumbbell className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:rotate-12" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-xl sm:text-2xl tracking-wider text-white leading-none">
              WELL FLABB
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-[#17BEBB] tracking-widest uppercase">
              Fitness Club · Delhi
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-[#F5F5F5]/80 hover:text-[#17BEBB] transition-colors py-1 relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#17BEBB] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onOpenTrial}
            className="pulse-free-trial inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E4572E] hover:bg-[#cf4720] text-white font-bold text-sm tracking-wide shadow-lg shadow-[#E4572E]/25 transition-transform active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Free Trial</span>
          </button>
        </div>

        {/* Mobile Right Controls: Trial Chip + Hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={onOpenTrial}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E4572E] text-white font-bold text-xs tracking-wide shadow-md active:scale-95 cursor-pointer"
          >
            <span>Free Trial</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-lg text-[#F5F5F5] hover:bg-[#1A1D23] active:scale-95 focus:outline-none"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Menu Sheet */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1A1D23] border-b border-[#2B303C] px-5 py-6 space-y-4 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-heading tracking-wider text-[#F5F5F5] hover:text-[#17BEBB] py-2 border-b border-[#2B303C]/50 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-xs text-[#17BEBB] font-semibold">→</span>
              </a>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTrial();
              }}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#E4572E] text-white font-bold text-base tracking-wide shadow-lg active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-5 h-5" />
              <span>Claim Free Trial on WhatsApp</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
