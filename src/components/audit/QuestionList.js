'use client';

import React from 'react';
import {
  CheckCircle2,
  Check,
  Target,
  Database,
  Search,
  Megaphone,
  Shield,
  Smartphone,
  Pause,
  Handshake,
  Lightbulb,
} from 'lucide-react';
import { AUDIT_QUESTIONS } from '@/data/auditQuestions';

// Premium icon map
const ICON_MAP = {
  coins: <Target className="w-5 h-5" />,
  users: <Handshake className="w-5 h-5" />,
  database: <Database className="w-5 h-5" />,
  search: <Search className="w-5 h-5" />,
  megaphone: <Megaphone className="w-5 h-5" />,
  shield: <Shield className="w-5 h-5" />,
  smartphone: <Smartphone className="w-5 h-5" />,
  'pause-circle': <Pause className="w-5 h-5" />,
  handshake: <Handshake className="w-5 h-5" />,
  target: <Target className="w-5 h-5" />,
};

const OPTION_LABELS = ['A', 'B', 'C', 'D'];

export default function QuestionList({ selectedAnswers = {}, onSelectOption }) {
  return (
    <div className="space-y-6">
      {AUDIT_QUESTIONS.map((item, qIndex) => {
        const isAnswered = !!selectedAnswers[item.id];
        const selectedOpt = selectedAnswers[item.id];
        const icon = ICON_MAP[item.iconType] ?? <Target className="w-5 h-5" />;

        return (
          <div
            key={item.id}
            id={`question-${item.id}`}
            className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden shadow-xs ${
              isAnswered
                ? 'border-brand-primary/40 shadow-md ring-1 ring-brand-primary/10'
                : 'border-stone-200/90 hover:border-stone-300 hover:shadow-sm'
            }`}
          >
            {/* Question Header */}
            <div className="p-4 sm:p-6 bg-white border-b border-stone-100">
              {/* Top Row: Icon + Category Badge + Selected Status */}
              <div className="flex items-center justify-between gap-2 mb-2.5 sm:mb-3">
                <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      isAnswered
                        ? 'bg-brand-primary text-white shadow-xs shadow-brand-primary/30'
                        : 'bg-brand-primary/10 text-brand-primary'
                    }`}
                  >
                    {isAnswered ? <Check className="w-4 h-4" /> : icon}
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-stone-100 text-stone-600 text-[10px] sm:text-[11px] font-medium uppercase tracking-wider">
                    <span className="font-semibold">Question {qIndex + 1} of {AUDIT_QUESTIONS.length}</span>
                    <span className="text-stone-300">·</span>
                    <span className="text-brand-primary font-bold">{item.category.split('. ')[1] || item.category}</span>
                  </span>
                </div>

                {isAnswered && (
                  <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded-full shrink-0">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Selected</span>
                  </span>
                )}
              </div>

              {/* Full Width Question Text (+1-2px font size, clear leading) */}
              <h3 className="text-[17px] sm:text-[22px] font-extrabold text-brand-dark leading-snug w-full">
                {item.question}
              </h3>

              {/* Contextual Eye-Opener note - 100% Full Width on Mobile & Desktop */}
              {item.eyeOpener && (
                <div className="mt-3 sm:mt-3.5 w-full flex items-start gap-2.5 text-xs sm:text-sm text-stone-600 bg-amber-50/70 border border-amber-200/80 rounded-xl p-3 sm:p-3.5 shadow-2xs">
                  <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item.eyeOpener}</span>
                </div>
              )}
            </div>

            {/* Options List: A/B/C Labels Outside, Clean Compact Answer Boxes */}
            <div className="p-4 sm:p-5 bg-stone-50/50 space-y-2.5 sm:space-y-3">
              {item.options.map((option, idx) => {
                const isSelected = selectedOpt === option.id;
                const label = OPTION_LABELS[idx] ?? String(idx + 1);

                return (
                  <div key={option.id} className="flex items-center gap-2.5 sm:gap-3.5 w-full group">
                    {/* A/B/C Label Badge - Positioned OUTSIDE the answer box with larger font size */}
                    <div
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center font-extrabold text-sm sm:text-base shrink-0 transition-all select-none ${
                        isSelected
                          ? 'bg-brand-primary text-white shadow-sm shadow-brand-primary/30 ring-2 ring-brand-primary/20 scale-105'
                          : 'bg-stone-200/80 text-stone-700 group-hover:bg-brand-primary/10 group-hover:text-brand-primary'
                      }`}
                    >
                      {label}
                    </div>

                    {/* Compact, Clean Answer Box */}
                    <button
                      type="button"
                      onClick={() => onSelectOption(item.id, option.id)}
                      className={`flex-1 text-left rounded-xl px-4 py-3 sm:px-4.5 sm:py-3.5 flex items-center justify-between gap-3 border transition-all duration-200 active:scale-[0.99] cursor-pointer shadow-2xs ${
                        isSelected
                          ? 'bg-white border-2 border-brand-primary ring-2 ring-brand-primary/15 shadow-sm'
                          : 'bg-white border border-stone-200 hover:border-brand-primary/40 hover:bg-stone-50/90 hover:shadow-xs'
                      }`}
                    >
                      <p
                        className={`text-xs sm:text-sm leading-relaxed flex-1 ${
                          isSelected
                            ? 'text-brand-dark font-bold'
                            : 'text-stone-700 font-medium group-hover:text-stone-900'
                        }`}
                      >
                        {option.text}
                      </p>

                      {isSelected && (
                        <span className="w-5 h-5 rounded-full bg-brand-primary text-white flex items-center justify-center shrink-0 shadow-xs">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </span>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
