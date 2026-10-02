'use client';

import React from 'react';
import {
  TbTargetArrow,
  TbPigMoney,
  TbAward,
  TbUsersGroup,
  TbSparkles,
} from 'react-icons/tb';
import { HiArrowDown } from 'react-icons/hi2';

export default function Hero({ onStartAudit, onOpenMobileForm }) {
  return (
    <section className="relative bg-brand-surface pt-6 pb-4 sm:pt-8 sm:pb-6 border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">

          {/* Left Column: Heading, Value Badges & CTA to Start Form */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Top Micro-Tag */}
            <div className="mb-3">
              <span className="inline-block px-3.5 py-1 rounded-full bg-brand-accent/15 border border-brand-accent/30 text-xs sm:text-xs font-black tracking-wider text-brand-primary uppercase">
                2-MINUTE ASSESSMENT FOR REAL ESTATE PROFESSIONALS
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-brand-dark leading-tight mb-3 sm:mb-4">
              Stop Losing Your Buyers to{' '}
              <span className="text-brand-primary">Competitors </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-stone-600 font-medium leading-relaxed mb-4 max-w-xl">
              Check if your hard-earned leads are slipping away and see how an owned website can save you lakhs every year.
            </p>

            {/* 3 Core Value Badges */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-white border border-stone-200 shadow-xs text-stone-800 hover:border-emerald-300 transition-colors">
                <TbTargetArrow className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs sm:text-sm font-bold">More Exclusive Leads</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-white border border-stone-200 shadow-xs text-stone-800 hover:border-amber-300 transition-colors">
                <TbPigMoney className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="text-xs sm:text-sm font-bold">Lower Marketing Costs</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-white border border-stone-200 shadow-xs text-stone-800 hover:border-indigo-300 transition-colors">
                <TbAward className="w-4 h-4 text-indigo-600 shrink-0" />
                <span className="text-xs sm:text-sm font-bold">Stronger Brand Authority</span>
              </div>
            </div>

            {/* High-Impact CTA Button directly focusing on filling the form */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={onStartAudit}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-primary via-emerald-700 to-brand-primary hover:from-emerald-700 hover:to-brand-primary text-white font-extrabold text-base shadow-lg shadow-brand-primary/25 hover:shadow-xl active:scale-[0.98] transition-all cursor-pointer min-h-[50px]"
              >
                <span>Start 2-Min Lead Audit</span>
                <HiArrowDown className="w-4 h-4 animate-bounce" />
              </button>

              <span className="text-xs text-stone-500 font-semibold flex items-center justify-center sm:justify-start gap-1.5">
                <TbSparkles className="w-3.5 h-3.5 text-amber-500" />
                Free customized assessment · 100% confidential
              </span>
            </div>
          </div>

          {/* Right Column: Professional Real Estate Photography */}
          <div className="lg:col-span-5 relative hidden sm:block">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-stone-200 h-52 lg:h-64">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80"
                alt="Professional Real Estate Photography"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/60 via-brand-primary/20 to-transparent" />

              {/* Floating Trust Badge */}
              <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-md border border-white/30">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-brand-accent/20 flex items-center justify-center shrink-0">
                    <TbUsersGroup className="w-5 h-5 text-brand-primary" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-brand-dark leading-tight">
                      Top real estate firms get <span className="text-brand-primary font-black">4-5 organic leads daily</span> from their own website.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
