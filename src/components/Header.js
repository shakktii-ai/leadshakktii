'use client';

import React, { useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import Image from "next/image";

export default function Header({ onStartAudit }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleAuditClick = () => {
    if (onStartAudit) {
      onStartAudit();
    } else {
      scrollToSection('audit-section');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 text-slate-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          {/* Logo / Branding */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Shakktii AI Home"
          >
            <div className="flex items-center">
              <Image
                src="/images/image.png"
                alt="Shakktii AI Logo"
                width={250}
                height={350}
                priority
                className="h-14 sm:h-16 w-auto object-contain"
              />
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-[14px] font-semibold text-stone-600">
            <button
              type="button"
              onClick={() => scrollToSection('solutions-section')}
              className="hover:text-brand-primary transition-colors py-2 cursor-pointer focus:outline-none"
            >
              Solutions
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('why-own-website')}
              className="hover:text-brand-primary transition-colors py-2 cursor-pointer focus:outline-none"
            >
              Why Own a Website?
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('demo-section')}
              className="hover:text-brand-primary transition-colors py-2 cursor-pointer focus:outline-none"
            >
              Success Stories
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('footer-section')}
              className="hover:text-brand-primary transition-colors py-2 cursor-pointer focus:outline-none"
            >
              Contact
            </button>
          </nav>

          {/* Header Action Button */}
          <div className="hidden sm:flex items-center gap-4">
            <button
              type="button"
              onClick={handleAuditClick}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-brand-primary hover:bg-brand-secondary text-white font-bold text-sm shadow-sm hover:shadow active:scale-[0.98] transition-all duration-200 cursor-pointer focus:outline-none"
            >
              <span>Get Free Audit</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none min-w-11 min-h-11 flex items-center justify-center"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-4 pb-8 space-y-4 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-2">
            <button
              type="button"
              onClick={() => scrollToSection('solutions-section')}
              className="text-left px-4 py-3.5 rounded-lg text-base sm:text-lg font-semibold text-slate-700 hover:text-brand-primary hover:bg-slate-50"
            >
              Solutions
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('why-own-website')}
              className="text-left px-4 py-3.5 rounded-lg text-base sm:text-lg font-semibold text-slate-700 hover:text-brand-primary hover:bg-slate-50"
            >
              Why Own a Website?
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('demo-section')}
              className="text-left px-4 py-3.5 rounded-lg text-base sm:text-lg font-semibold text-slate-700 hover:text-brand-primary hover:bg-slate-50"
            >
              Success Stories
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('footer-section')}
              className="text-left px-4 py-3.5 rounded-lg text-base sm:text-lg font-semibold text-slate-700 hover:text-brand-primary hover:bg-slate-50"
            >
              Contact
            </button>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                handleAuditClick();
              }}
              className="w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold text-base sm:text-lg shadow-sm"
            >
              <span>Get Free Audit</span>
              <ArrowRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
