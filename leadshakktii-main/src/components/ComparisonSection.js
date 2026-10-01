'use client';

import React from 'react';
import { Check, X, ShieldAlert, Sparkles, Building, ArrowRight } from 'lucide-react';

export default function ComparisonSection({ onStartAudit }) {
  const comparisons = [
    {
      factor: 'Lead Exclusivity',
      portal: 'Shared simultaneously with 4 to 5 rival channel partners',
      owned: '100% exclusive direct inquiries delivered only to your private CRM',
    },
    {
      factor: 'Buyer Retention',
      portal: 'Buyers search other project names and get intercepted by competitor ads',
      owned: 'Clients browse multiple local projects within your own branded ecosystem',
    },
    {
      factor: 'Ad Conversion Quality',
      portal: 'Generic instant lead forms with 40%+ invalid or casual numbers',
      owned: 'Detailed project pages qualify buyers via floor plans, unit types & pricing',
    },
    {
      factor: 'When Ad Spend Pauses',
      portal: 'Inquiries immediately drop to zero with zero residual value',
      owned: 'Evergreen organic search and SEO continue bringing high-intent buyers',
    },
    {
      factor: 'Developer Mandates',
      portal: 'Generic offline profile that struggles to stand out to Grade-A builders',
      owned: 'Institutional digital presentation demonstrating dedicated micro-market reach',
    },
    {
      factor: 'Past Lead Monetization',
      portal: 'Forced to recharge paid packages whenever a new launch occurs',
      owned: 'Branded launch pages reactivate dormant database contacts at zero ad cost',
    },
  ];

  return (
    <section id="portal-vs-owned" className="py-16 sm:py-24 bg-[#F8F7F3] border-b border-[#142E55]/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#10233D]/5 border border-[#142E55]/15 text-[#142E55] text-xs sm:text-sm font-semibold mb-4">
            <Building className="w-4 h-4 text-[#E7C579]" />
            <span>Strategic Architecture Comparison</span>
          </div>

          <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl text-[#10233D] font-normal leading-tight mb-4">
            The Rented Portal Trap vs. An Owned Website System
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            See the structural difference between paying monthly portal rent and investing in your own proprietary digital asset.
          </p>
        </div>

        {/* Comparison Table / Grid */}
        <div className="bg-white rounded-2xl border border-[#142E55]/15 shadow-xl shadow-[#10233D]/5 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-1 md:grid-cols-12 border-b border-slate-200 bg-[#10233D] text-white">
            <div className="md:col-span-4 p-5 sm:p-6 flex items-center font-bold text-sm sm:text-base uppercase tracking-wider text-slate-300">
              Operational Dimension
            </div>
            <div className="md:col-span-4 p-5 sm:p-6 bg-[#0B192C] border-t md:border-t-0 md:border-l border-white/10 flex items-center gap-2 text-rose-300 font-bold text-sm sm:text-base">
              <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0" />
              <span>The Rented Portal Trap</span>
            </div>
            <div className="md:col-span-4 p-5 sm:p-6 bg-[#142E55] border-t md:border-t-0 md:border-l border-white/10 flex items-center gap-2 text-[#E7C579] font-bold text-sm sm:text-base">
              <Sparkles className="w-5 h-5 text-[#E7C579]" />
              <span>The Shakktii Owned System</span>
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-slate-100 text-sm">
            {comparisons.map((row, idx) => (
              <div
                key={row.factor}
                className={`grid grid-cols-1 md:grid-cols-12 ${
                  idx % 2 === 0 ? 'bg-white' : 'bg-[#F8F7F3]/60'
                }`}
              >
                {/* Dimension */}
                <div className="md:col-span-4 p-4 sm:p-6 font-semibold text-[#10233D] flex items-center">
                  {row.factor}
                </div>

                {/* Portal */}
                <div className="md:col-span-4 p-4 sm:p-6 bg-rose-50/30 md:border-l border-slate-100 flex items-start gap-3 text-slate-600">
                  <div className="w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-3.5 h-3.5 text-rose-600" />
                  </div>
                  <span className="leading-relaxed">{row.portal}</span>
                </div>

                {/* Owned */}
                <div className="md:col-span-4 p-4 sm:p-6 bg-emerald-50/30 md:border-l border-slate-100 flex items-start gap-3 text-[#10233D] font-medium">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-emerald-700" />
                  </div>
                  <span className="leading-relaxed">{row.owned}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Callout */}
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={onStartAudit}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#10233D] text-[#E7C579] font-bold text-sm sm:text-base hover:bg-[#142E55] transition-all shadow-md active:scale-98 cursor-pointer"
          >
            <span>Evaluate Your Firm&apos;s Specific Risk Exposure</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
