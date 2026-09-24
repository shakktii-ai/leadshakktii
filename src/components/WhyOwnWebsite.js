'use client';

import React from 'react';
import { Target, IndianRupee, TrendingUp, Users } from 'lucide-react';

export default function WhyOwnWebsite() {
  const benefits = [
    {
      icon: <Target className="w-6 h-6 text-brand-primary" />,
      title: 'Exclusive Leads',
      description: 'No more shared numbers from portals.',
    },
    {
      icon: <IndianRupee className="w-6 h-6 text-brand-primary" />,
      title: 'Lower Costs',
      description: 'Stop wasting money on expensive portal packages.',
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-brand-primary" />,
      title: 'Stronger Brand',
      description: 'Be the #1 trusted expert in your area.',
    },
    {
      icon: <Users className="w-6 h-6 text-brand-primary" />,
      title: 'Re-engage Old Leads',
      description: 'Turn your past leads into new bookings.',
    },
  ];

  return (
    <section id="why-own-website" className="py-8 sm:py-10 bg-brand-surface border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark tracking-tight">
            Why Real Estate Professionals Build Their Own Website
          </h2>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {benefits.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-white border border-stone-200 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-start gap-4 group hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center shrink-0 group-hover:bg-brand-primary/20 transition-colors">
                {item.icon}
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-brand-dark mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-stone-600 font-medium leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
