'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import AuditContainer from '@/components/audit/AuditContainer';
import WhyOwnWebsite from '@/components/WhyOwnWebsite';
import StrategicBenefits from '@/components/StrategicBenefits';
import ComparisonSection from '@/components/ComparisonSection';
import DemoBanner from '@/components/DemoBanner';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';

export default function Home() {
  const [mobileFormOpen, setMobileFormOpen] = useState(false);

  const scrollToAudit = () => {
    const el = document.getElementById('audit-section');
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleOpenMobileForm = () => {
    setMobileFormOpen(true);
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 pb-16 lg:pb-0">
      {/* 1. Clean Top Navbar with working links */}
      <Header onStartAudit={scrollToAudit} />

      {/* 2. Hero Section */}
      <Hero
        onStartAudit={scrollToAudit}
        onOpenMobileForm={handleOpenMobileForm}
      />

      {/* 3. Main Audit Assessment & Sticky Lead Capture Grid (id="audit-section") */}
      <AuditContainer
        isMobileFormOpen={mobileFormOpen}
        onCloseMobileForm={() => setMobileFormOpen(false)}
      />

      {/* 4. Why Real Estate Professionals Build Their Own Website (id="why-own-website") */}
      <WhyOwnWebsite />

      {/* 5. Marketing Solutions for Real Estate Channel Partners (id="solutions-section") */}
      <StrategicBenefits onStartAudit={scrollToAudit} />

      {/* 6. Portal vs Owned Website Comparison (id="portal-vs-owned") */}
      <ComparisonSection onStartAudit={scrollToAudit} />

      {/* 7. Success Stories & 1-on-1 Demo Banner (id="demo-section") */}
      <DemoBanner />

      {/* 8. Frequently Asked Questions (id="faq-section") */}
      <FAQSection onStartAudit={scrollToAudit} />

      {/* 9. Contact & Information Footer (id="footer-section") */}
      <Footer />
    </main>
  );
}
