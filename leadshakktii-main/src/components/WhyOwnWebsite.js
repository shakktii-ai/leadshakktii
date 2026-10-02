'use client';

import React from 'react';
import {
  TbTargetArrow,
  TbPigMoney,
  TbAward,
  TbUsersGroup,
} from 'react-icons/tb';

export default function WhyOwnWebsite() {
  const benefits = [
    {
      icon: <TbTargetArrow className="w-7 h-7 text-emerald-600" />,
      bg: 'bg-emerald-50 border-emerald-200/80 group-hover:bg-emerald-100/80',
      title: 'Exclusive Leads',
      description: 'No more shared numbers from portals. Every inquiry is 100% private to your firm.',
    },
    {
      icon: <TbPigMoney className="w-7 h-7 text-amber-600" />,
      bg: 'bg-amber-50 border-amber-200/80 group-hover:bg-amber-100/80',
      title: 'Lower Costs',
      description: 'Stop wasting money on expensive portal packages with diminishing buyer returns.',
    },
    {
      icon: <TbAward className="w-7 h-7 text-indigo-600" />,
      bg: 'bg-indigo-50 border-indigo-200/80 group-hover:bg-indigo-100/80',
      title: 'Stronger Brand',
      description: 'Be the #1 trusted micro-market authority in your area with a branded web system.',
    },
    {
      icon: <TbUsersGroup className="w-7 h-7 text-teal-600" />,
      bg: 'bg-teal-50 border-teal-200/80 group-hover:bg-teal-100/80',
      title: 'Re-engage Old Leads',
      description: 'Turn your past dormant CRM leads into new bookings with custom project launch pages.',
    },
  ];

  return (
    <section id="why-own-website" className="py-12 sm:py-16 bg-brand-surface border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight">
            Why Real Estate Professionals Build Their Own Website
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-2xl mx-auto font-medium">
            Take back control over your buyer relationships and build a proprietary digital asset.
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-white border border-stone-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-start gap-4 group hover:-translate-y-1"
            >
              <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center shrink-0 transition-colors ${item.bg}`}>
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
