import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustBanner } from './components/TrustBanner';
import { ServicesSection } from './components/ServicesSection';
import { BudgetSimulator } from './components/BudgetSimulator';
import { BeforeAfterShowcase } from './components/BeforeAfterShowcase';
import { HowItWorks } from './components/HowItWorks';
import { AboutTechnician } from './components/AboutTechnician';
import { Testimonials } from './components/Testimonials';
import { FaqSection } from './components/FaqSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export default function App() {
  const scrollToSimulator = () => {
    const el = document.getElementById('simulador');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-cyan-600 selection:text-white font-sans">
      {/* Top Navigation */}
      <Header onOpenBudgetModal={scrollToSimulator} />

      {/* Main Content Sections */}
      <main>
        <Hero onScrollToSimulator={scrollToSimulator} />
        <TrustBanner />
        <ServicesSection />
        <BudgetSimulator />
        <BeforeAfterShowcase />
        <HowItWorks />
        <AboutTechnician />
        <Testimonials />
        <FaqSection />
        <LocationSection />
      </main>

      {/* Footer & Floating CTA */}
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
