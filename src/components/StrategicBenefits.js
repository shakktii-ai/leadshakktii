'use client';

import React from 'react';
import { Smartphone, Search, Zap, Layers, BarChart3, Users } from 'lucide-react';

export default function StrategicBenefits({ onStartAudit }) {
  const capabilities = [
    {
      icon: <Smartphone className="w-6 h-6 text-brand-accent" />,
      title: 'Mobile-First Property Showcases',
      description:
        'Over 82% of premium buyers browse real estate on smartphones. Ultra-fast interactive floor plans, amenity filters, and location maps deliver an app-like experience without app store downloads.',
    },
    {
      icon: <Search className="w-6 h-6 text-brand-accent" />,
      title: 'Hyperlocal SEO Dominance',
      description:
        'Rank for high-intent search terms like "3 BHK in [Micro-Market]" or "Upcoming luxury towers in [Area]", capturing organic buyers before national aggregators intercept them.',
    },
    {
      icon: <Zap className="w-6 h-6 text-brand-accent" />,
      title: 'Direct WhatsApp CRM Sync',
      description:
        'Every lead inquiry, floor plan download, and callback request routes instantly to your sales team’s WhatsApp with project name and unit preference pre-filled.',
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-brand-accent" />,
      title: 'Real-Time Buyer Tracking',
      description:
        'Discover which projects have high visitor engagement, which price brackets receive the most inquiries, and which past CRM clients are actively looking for property.',
    },
    {
      icon: <Layers className="w-6 h-6 text-brand-accent" />,
      title: 'Custom Pre-Launch Landing Pages',
      description:
        'Deploy dedicated, high-converting launch portals for new builder tie-ups in under 24 hours, giving you unmatched speed-to-market over competitor channel partners.',
    },
    {
      icon: <Users className="w-6 h-6 text-brand-accent" />,
      title: 'Institutional Grade Advisory Image',
      description:
        'Elevate your firm above the sea of unverified brokers. High-net-worth investors and Grade-A builders immediately recognize your digital infrastructure as top tier.',
    },
  ];

  return (
    <section id="solutions-section" className="py-14 sm:py-20 bg-white border-b border-stone-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs sm:text-sm font-bold uppercase tracking-wider mb-4">
            <Zap className="w-4 h-4 text-brand-accent" />
            <span>Modern Property Marketing Solutions</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-brand-dark font-extrabold tracking-tight leading-tight mb-4">
            Engineered Specifically for High-Volume Channel Partners
          </h2>

          <p className="text-base sm:text-lg text-stone-600 font-medium leading-relaxed">
            Every solution is architected to protect your buyer relationships, maximize commission margins, and eliminate portal leakage.
          </p>
        </div>

        {/* 6 Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="p-6 sm:p-7 rounded-2xl bg-brand-surface border border-stone-200 hover:border-brand-primary/30 hover:bg-white hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-primary flex items-center justify-center mb-5 shadow-xs group-hover:scale-105 transition-transform">
                {cap.icon}
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-2.5">
                {cap.title}
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed font-medium">
                {cap.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
