'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';

export default function FAQSection({ onStartAudit }) {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'Why do I need my own website if I already receive buyer leads on WhatsApp and portals?',
      a: 'Portal packages charge recurring fees for shared leads that are sold to 4–5 channel partners simultaneously. On WhatsApp, sending loose PDFs causes buyers to search project names on Google, where competing brokers’ ads divert them. Your owned website locks buyers inside your branded catalog with 100% exclusive inquiries.',
    },
    {
      q: 'How does an owned website protect buyers from slipping away to competitors?',
      a: 'When a client asks for options in your micro-market, you send them a single, high-speed mobile link showcasing all relevant projects under your brand. Buyers can compare floor plans, amenities, and pricing directly on your platform, preventing them from Googling generic builder names and landing on competitor broker sites.',
    },
    {
      q: 'How can an owned website help revive our past CRM database?',
      a: 'Instead of cold calling or sending spammy generic text blasts, you can share dedicated launch landing pages with your past contacts. You can see in real-time which clients are clicking links and browsing 3BHK or 4BHK units, enabling your sales team to follow up with warm, high-intent prospects.',
    },
    {
      q: 'Can we run Google Ads and Meta Ads to our own property pages?',
      a: 'Yes. Dedicated property landing pages convert at significantly higher rates than generic instant lead forms. Visitors are pre-qualified because they see key project highlights, floor plans, and pricing before submitting their inquiry, drastically reducing invalid inquiries.',
    },
    {
      q: 'How does this assessment calculate our risk score?',
      a: 'The assessment analyzes 9 operational dimensions including portal dependency, client sharing workflows, CRM monetization, and mobile presentation. Points are assigned to highlight vulnerabilities where buyers are currently leaking to competitors, providing you with a clear roadmap to secure your pipeline.',
    },
    {
      q: 'How quickly can our customized micro-market platform be deployed?',
      a: 'Following your strategy consultation, our team structures your micro-market project catalog, floor plan databases, and WhatsApp routing, with typical turnkey deployment within 5 to 7 business days.',
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq-section" className="py-16 sm:py-24 bg-[#F8F7F3] border-b border-[#142E55]/10 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#10233D]/5 border border-[#142E55]/15 text-[#142E55] text-xs sm:text-sm font-semibold mb-4">
            <HelpCircle className="w-4 h-4 text-[#E7C579]" />
            <span>Consultative Guidance</span>
          </div>

          <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#10233D] font-normal leading-tight mb-3">
            Frequently Asked Questions
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Strategic answers for real estate channel partners and advisory firms looking to protect and scale their lead pipelines.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.q}
                className="bg-white rounded-xl border border-[#142E55]/10 overflow-hidden transition-all duration-200 shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E7C579] min-h-[56px]"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif-heading text-base sm:text-lg text-[#10233D] font-normal">
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-[#10233D] text-[#E7C579]' : 'text-slate-600'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Small Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-xs sm:text-sm text-slate-600 mb-4">
            Have questions specific to your micro-market?
          </p>
          <button
            type="button"
            onClick={onStartAudit}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#10233D] text-[#E7C579] font-bold text-sm hover:bg-[#142E55] transition-all shadow-md active:scale-98 cursor-pointer"
          >
            <span>Take the 2-Minute Lead Audit</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
