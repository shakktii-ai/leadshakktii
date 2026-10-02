'use client';

import React from 'react';
import Image from "next/image";
import Link from 'next/link';
import { FaLinkedin, FaWhatsapp } from 'react-icons/fa6';
import { HiOutlineGlobeAlt, HiOutlineLockClosed } from 'react-icons/hi2';

export default function Footer() {
  return (
    <footer id="footer-section" className="bg-white border-t border-stone-200 pt-8 pb-4 sm:py-12 text-slate-600 text-sm scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Contact & Brand Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-stone-100 items-start">
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-2">
              <Image
                src="/images/image.png"
                alt="Shakktii AI"
                width={420}
                height={300}
                priority
                className="h-16 w-auto object-contain"
              />
            </div>
            <p className="text-sm text-stone-600 max-w-md leading-relaxed font-medium">
              Empowering top real estate channel partners and advisory firms with owned digital web platforms, dedicated micro-market SEO, and exclusive buyer inquiry systems.
            </p>
          </div>

          {/* Quick Contact Info */}
          <div className="md:col-span-6 flex flex-col sm:flex-row sm:items-center md:justify-end gap-4 sm:gap-8">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block">Direct Contact</span>
              <a
                href="https://wa.me/+918446078867?text=Hi%20Shakktii%20AI%2C%20I%20would%20like%20to%20know%20more%20about%20your%20real%20estate%20website%20system."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-primary hover:text-brand-secondary transition-colors"
              >
                <FaWhatsapp className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp: +91 84460 78867</span>
              </a>
              <div className="flex items-center gap-2 text-sm text-stone-600">
                <HiOutlineGlobeAlt className="w-4 h-4 text-stone-400" />
                <a href="https://www.shakktii.in/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary font-medium">
                  www.shakktii.in
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Socials */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <p>
              © 2026 Shakktii AI. All rights reserved. <span className="hidden md:inline">| Build Smarter. Sell Faster.</span>
            </p>
            <span className="text-stone-300">·</span>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1 text-stone-400 hover:text-brand-primary transition-colors"
              title="Admin Portal"
            >
              <HiOutlineLockClosed className="w-3.5 h-3.5" />
              <span>Admin</span>
            </Link>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            {/* LinkedIn Icon */}
            <a
              href="https://www.linkedin.com/company/shakktii-ai/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-brand-primary transition-colors flex items-center gap-1.5 font-semibold text-xs sm:text-sm"
            >
              <FaLinkedin className="w-4 h-4 text-[#0A66C2]" />
              <span>LinkedIn</span>
            </a>

            {/* Official Website */}
            <a
              href="https://www.shakktii.in/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Website"
              className="hover:text-brand-primary transition-colors flex items-center gap-1.5 font-semibold text-xs sm:text-sm"
            >
              <HiOutlineGlobeAlt className="w-4 h-4 text-emerald-600" />
              <span>Official Website</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
