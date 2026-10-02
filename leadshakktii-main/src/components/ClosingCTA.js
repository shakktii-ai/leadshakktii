'use client';

import React from 'react';
import { ArrowRight, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';

export default function ClosingCTA({ onStartAudit }) {
  return (
    <section className="relative overflow-hidden bg-[#10233D] text-white py-16 sm:py-24">
      {/* Background Architectural Texture with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=80"
          alt="Modern luxury estate architecture"
          className="w-full h-full object-cover object-center opacity-15 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#10233D] via-[#10233D]/95 to-[#10233D]" />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#E7C579_1px,transparent_1px)] [background-size:20px_20px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#E7C579]/30 text-[#E7C579] text-xs sm:text-sm font-semibold mb-6 backdrop-blur-xs">
          <ShieldCheck className="w-4 h-4 text-[#E7C579]" />
          <span>Stop Revenue Leakage Today</span>
        </div>

        <h2 className="font-serif-heading text-3xl sm:text-5xl text-white font-normal leading-tight mb-6">
          Ready to Build Your Own Exclusive Real Estate Lead Pipeline?
        </h2>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-200 leading-relaxed mb-8 sm:mb-10 text-balance">
          Take the 2-minute diagnostic check to discover where your micro-market inquiries are leaking and how an owned website safeguards your commission margins.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <button
            type="button"
            onClick={onStartAudit}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#E7C579] to-[#d6b365] text-[#10233D] font-bold text-base sm:text-lg shadow-lg hover:brightness-105 active:scale-98 transition-all duration-200 cursor-pointer min-h-[52px]"
          >
            <span>Start My Free Assessment</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-300">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#E7C579]" />
            Takes only 2 minutes
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#E7C579]" />
            100% Free &amp; Confidential
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#E7C579]" />
            Instant Actionable Report
          </span>
        </div>
      </div>
    </section>
  );
}
