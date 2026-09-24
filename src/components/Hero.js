'use client';

import React from 'react';
import { Target, BarChart3, Trophy, Users } from 'lucide-react';

export default function Hero({ onStartAudit, onOpenMobileForm }) {
  return (
    <section className="relative bg-brand-surface pt-8 pb-10 sm:pt-10 sm:pb-12 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left Column: Heading, Value Badges & Mobile Direct Form Action */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Top Micro-Tag */}
            <div className="mb-4">
              <span className="inline-block px-4 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/30 text-xs sm:text-sm font-bold tracking-wider text-brand-primary uppercase">
                2-MINUTE ASSESSMENT FOR REAL ESTATE PROFESSIONALS
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-brand-dark leading-tight mb-5">
              Stop Losing Your Buyers to{' '}
              <span className="text-brand-primary">Other Agents</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-stone-600 font-medium leading-relaxed mb-6 max-w-xl">
              Check if your hard-earned leads are slipping away and see how an owned website can save you lakhs every year.
            </p>

            {/* 3 Core Value Badges */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6">
              <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white border border-stone-200 shadow-sm text-stone-800">
                <Target className="w-5 h-5 text-brand-primary shrink-0" />
                <span className="text-sm sm:text-base font-semibold">More Exclusive Leads</span>
              </div>

              <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white border border-stone-200 shadow-sm text-stone-800">
                <BarChart3 className="w-5 h-5 text-brand-primary shrink-0" />
                <span className="text-sm sm:text-base font-semibold">Lower Marketing Costs</span>
              </div>

              <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white border border-stone-200 shadow-sm text-stone-800">
                <Trophy className="w-5 h-5 text-brand-primary shrink-0" />
                <span className="text-sm sm:text-base font-semibold">Stronger Brand Authority</span>
              </div>
            </div>
          </div>

          {/* Right Column: Professional Real Estate Photography */}
          <div className="lg:col-span-5 relative hidden sm:block">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-stone-200 h-56 lg:h-72">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80"
                alt="Professional Real Estate Photography"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/60 via-brand-primary/20 to-transparent" />

              {/* Floating Trust Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/30">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-brand-accent/20 flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-brand-dark leading-tight">
                      Top real estate firms get <span className="text-brand-primary">4-5 organic leads daily</span> from their own website.
                    </p>
                    <p className="text-xs font-bold text-brand-accent mt-1">
                      Are you?
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
