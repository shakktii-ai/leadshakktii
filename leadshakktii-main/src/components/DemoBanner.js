'use client';

import React from 'react';
import { ArrowRight, Trophy } from 'lucide-react';

export default function DemoBanner() {
  const handleScheduleDemo = () => {
    window.open(
      `https://wa.me/+918446078867?text=${encodeURIComponent(
        'Hi Shakktii AI, I would like to schedule a 1-on-1 demo of the real estate website system.'
      )}`,
      '_blank'
    );
  };

  return (
    <section id="demo-section" className="py-8 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Deep Emerald Container with Professional Background */}
        <div className="relative rounded-3xl overflow-hidden bg-brand-primary text-white shadow-2xl p-8 sm:p-10 lg:p-12">

          {/* Professional Real Estate Image with Dark Gradient Overlay */}
          <div className="absolute inset-y-0 right-0 w-full lg:w-1/2 opacity-30 lg:opacity-40 mix-blend-luminosity pointer-events-none">
            <img
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
              alt="Professional Real Estate"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-primary via-brand-primary/90 to-transparent" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Content */}
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-brand-accent/20 border border-brand-accent/40 text-[11px] font-bold tracking-widest uppercase text-brand-accent mb-3">
                <Trophy className="w-3.5 h-3.5" />
                <span>SUCCESS STORIES &amp; DEMO</span>
              </span>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
                Real Estate Channel Partner Growth
              </h3>

              <p className="text-base sm:text-lg text-brand-accent-light font-medium leading-relaxed mb-8 max-w-xl">
                See how top real estate advisory firms run their own website machine and generate 4–5 organic buyer leads daily with zero portal dependency.
              </p>

              <button
                type="button"
                onClick={handleScheduleDemo}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-brand-accent hover:bg-brand-accent-light active:scale-[0.98] text-brand-dark font-bold text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all cursor-pointer"
              >
                <span>Schedule 1-on-1 Demo Now</span>
                <ArrowRight className="w-5 h-5 text-brand-dark" />
              </button>
            </div>

            {/* Right Stats (3 metric cards) */}
            <div className="lg:col-span-5">
              <div className="grid grid-cols-3 gap-3 sm:gap-4 bg-white/95 backdrop-blur-md rounded-2xl p-5 sm:p-6 text-brand-dark shadow-xl border border-white/30">

                {/* Stat 1 */}
                <div className="text-center px-1">
                  <span className="text-2xl sm:text-4xl font-extrabold text-brand-primary block">
                    4-5
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-stone-600 block mt-1 leading-tight">
                    Organic Leads Daily
                  </span>
                </div>

                {/* Stat 2 */}
                <div className="text-center px-1 border-x border-stone-200">
                  <span className="text-2xl sm:text-4xl font-extrabold text-brand-primary block">
                    2x
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-stone-600 block mt-1 leading-tight">
                    More Site Visits
                  </span>
                </div>

                {/* Stat 3 */}
                <div className="text-center px-1">
                  <span className="text-xl sm:text-3xl font-extrabold text-brand-primary block">
                    Upto 60%
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-stone-600 block mt-1 leading-tight">
                    Lower Marketing Cost
                  </span>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
