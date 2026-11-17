import React, { useEffect, useState, lazy, Suspense } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { WhyUs } from './components/WhyUs';
import { Programs } from './components/Programs';
import { WeightLossCalculator } from './components/WeightLossCalculator';
import { Trainer } from './components/Trainer';
import { Timings } from './components/Timings';
import { Plans } from './components/Plans';
import { Reviews } from './components/Reviews';
import { FreeTrialForm } from './components/FreeTrialForm';
import { VisitUs } from './components/VisitUs';
import { Footer } from './components/Footer';
import { BottomBar } from './components/BottomBar';

// Lazy load admin dashboard to keep public website bundle ultra-fast
const AdminDashboard = lazy(() =>
  import('./components/AdminDashboard').then((m) => ({ default: m.AdminDashboard }))
);

export const App: React.FC = () => {
  // Check if viewing /admin route or #admin
  const [isAdminRoute, setIsAdminRoute] = useState<boolean>(() => {
    return (
      typeof window !== 'undefined' &&
      (window.location.pathname.startsWith('/admin') || window.location.hash === '#admin')
    );
  });

  useEffect(() => {
    const checkRoute = () => {
      setIsAdminRoute(
        window.location.pathname.startsWith('/admin') || window.location.hash === '#admin'
      );
    };

    window.addEventListener('popstate', checkRoute);
    window.addEventListener('hashchange', checkRoute);
    return () => {
      window.removeEventListener('popstate', checkRoute);
      window.removeEventListener('hashchange', checkRoute);
    };
  }, []);

  const navigateToSite = () => {
    window.history.pushState({}, '', '/');
    setIsAdminRoute(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Lenis smooth scroll initialization (for public site)
  useEffect(() => {
    if (isAdminRoute) return;

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [isAdminRoute]);

  const scrollToTrial = () => {
    const el = document.getElementById('free-trial');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Render Admin View if on /admin
  if (isAdminRoute) {
    return (
      <Suspense
        fallback={
          <div className="min-h-screen bg-[#0F1115] text-[#9EABB8] flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-[#E4572E] border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <AdminDashboard onBackToSite={navigateToSite} />
      </Suspense>
    );
  }

  // Public Site (Design completely unchanged)
  return (
    <div className="min-h-screen bg-[#0F1115] text-[#F5F5F5] font-sans relative selection:bg-[#E4572E] selection:text-white">
      {/* 1. Header / Navbar */}
      <Navbar onOpenTrial={scrollToTrial} />

      <main className="w-full">
        {/* 2. Hero Section */}
        <Hero onOpenTrial={scrollToTrial} />

        {/* Marquee program strip */}
        <Marquee />

        {/* 3. Why Us */}
        <WhyUs />

        {/* 4. Programs */}
        <Programs />

        {/* What's Your Weight-Loss Plan? Calculator */}
        <WeightLossCalculator />

        {/* 5. Meet Your Trainer */}
        <Trainer onOpenTrial={scrollToTrial} />

        {/* 6. Timings */}
        <Timings />

        {/* 7. Membership Plans */}
        <Plans />

        {/* 8. Reviews */}
        <Reviews />

        {/* 9. Free-Trial Form & Weight Loss Calculator */}
        <FreeTrialForm />

        {/* 10. Visit Us */}
        <VisitUs />
      </main>

      {/* Footer */}
      <Footer />

      {/* Sticky Bottom App Bar on Phones (Call | Free Trial | Directions) */}
      <BottomBar onOpenTrial={scrollToTrial} />
    </div>
  );
};

export default App;
