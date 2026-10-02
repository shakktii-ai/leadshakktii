import React from 'react';
import { Quote } from 'lucide-react';

export default function EditorialQuote() {
  return (
    <section className="bg-[#F8F7F3] border-y border-[#142E55]/10 py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#10233D] text-[#E7C579] mb-6 shadow-sm">
          <Quote className="w-5 h-5 fill-[#E7C579]" />
        </div>

        <blockquote className="font-serif-heading text-xl sm:text-2xl md:text-3xl text-[#172943] leading-snug sm:leading-relaxed font-normal mb-6 text-balance">
          &ldquo;A professional website is not just a digital presence. It&apos;s a place to showcase your properties, connect with buyers and build your own brand.&rdquo;
        </blockquote>

        <div className="flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-[#E7C579]" />
          <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#142E55]">
            The Shakktii AI Real Estate Advisory Philosophy
          </p>
          <div className="h-px w-12 bg-[#E7C579]" />
        </div>
      </div>
    </section>
  );
}
