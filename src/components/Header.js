'use client';

import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Clock,
  Sparkles,
} from 'lucide-react';
import Image from 'next/image';

export default function Header({ onStartAudit }) {
  const [secondsLeft, setSecondsLeft] = useState(14 * 60 + 45); // default ~14m 45s

  // Live ticking countdown clock for limited-time offer
  useEffect(() => {
    const TIMER_KEY = 'shakktii_offer_timer_end';
    let target = null;
    try {
      const stored = sessionStorage.getItem(TIMER_KEY);
      if (stored) {
        target = parseInt(stored, 10);
      }
    } catch (e) {}

    // If no target or timer expired, set new 15-minute countdown window
    if (!target || target < Date.now()) {
      target = Date.now() + 14 * 60 * 1000 + 45 * 1000;
      try {
        sessionStorage.setItem(TIMER_KEY, target.toString());
      } catch (e) {}
    }

    const updateTimer = () => {
      const now = Date.now();
      const diff = Math.max(0, Math.floor((target - now) / 1000));
      setSecondsLeft(diff);

      if (diff === 0) {
        target = Date.now() + 15 * 60 * 1000;
        try {
          sessionStorage.setItem(TIMER_KEY, target.toString());
        } catch (e) {}
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimer = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleAuditClick = () => {
    if (onStartAudit) {
      onStartAudit();
    } else {
      const element = document.getElementById('audit-section');
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
    }
  };

  return (
    <header className="sticky top-0 z-50 transition-all duration-300 shadow-xs">
      {/* ------------------------------------------------------------- */}
      {/* 1. TOP URGENCY / LIMITED TIME OFFER BANNER WITH TICKING CLOCK */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-gradient-to-r from-emerald-950 via-brand-primary to-emerald-900 text-white text-xs py-2 px-3 sm:px-6 border-b border-emerald-700/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          {/* Left: Offer text with pulsing badge */}
          <div className="flex items-center gap-2 min-w-0">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-400 text-stone-950 text-[10px] sm:text-xs font-black tracking-wider uppercase shadow-xs shrink-0">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
              </span>
              Limited Offer
            </span>
            <p className="text-white/95 font-medium text-[11px] sm:text-xs truncate">
              Grab your <span className="text-amber-300 font-bold underline decoration-amber-400/50">Free Lead Report &amp; Consultation</span>
            </p>
          </div>

          {/* Right: Live Countdown Clock + Action button */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-black/40 border border-emerald-400/30 text-white font-mono font-bold text-xs tracking-wider shadow-inner">
              <Clock className="w-3.5 h-3.5 text-amber-400 animate-pulse shrink-0" />
              <span className="text-amber-300 text-[11px] sm:text-xs">{formatTimer(secondsLeft)}</span>
            </div>

            <button
              type="button"
              onClick={handleAuditClick}
              className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 text-xs font-extrabold shadow-sm hover:shadow transition-all cursor-pointer"
            >
              <span>Claim Free</span>
              <ArrowRight className="w-3 h-3 text-stone-950" />
            </button>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. MAIN CLEAN NAVBAR (LOGO + CTA BUTTON) */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white/95 backdrop-blur-md border-b border-stone-200/80 text-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo / Branding */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none"
              aria-label="Shakktii AI Home"
            >
              <div className="flex items-center">
                <Image
                  src="/images/image.png"
                  alt="Shakktii AI Logo"
                  width={220}
                  height={300}
                  priority
                  className="h-12 sm:h-15 w-auto object-contain transition-transform group-hover:scale-[1.02]"
                />
              </div>
            </a>

            {/* Header Action Button (Desktop & Mobile) */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={handleAuditClick}
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-emerald-800 hover:to-brand-primary text-white font-extrabold text-xs sm:text-sm shadow-md shadow-brand-primary/20 hover:shadow-lg active:scale-[0.98] transition-all cursor-pointer focus:outline-none"
              >
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300" />
                <span>Get Free Audit</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
