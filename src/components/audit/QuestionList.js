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
            <div className="p-5 sm:p-6 bg-white border-b border-stone-100">
              <div className="flex items-start gap-4">
                {/* Number & Icon Pill */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    isAnswered
                      ? 'bg-brand-primary text-white shadow-sm shadow-brand-primary/30'
                      : 'bg-brand-primary/10 text-brand-primary'
                  }`}
                >
                  {isAnswered ? <Check className="w-6 h-6" /> : icon}
                </div>

                <div className="flex-1 min-w-0">
                  {/* Category Chip & Done Indicator */}
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-stone-100 text-stone-700 text-xs font-bold uppercase tracking-wider">
                      <span>Question {qIndex + 1} of {AUDIT_QUESTIONS.length}</span>
                      <span className="text-stone-300">·</span>
                      <span className="text-brand-primary font-extrabold">{item.category.split('. ')[1] || item.category}</span>
                    </span>

                    {isAnswered && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-brand-primary bg-brand-primary/10 px-2.5 py-1 rounded-full shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Selected
                      </span>
                    )}
                  </div>

                  {/* Question Text */}
                  <h3 className="text-lg sm:text-xl font-bold text-brand-dark leading-snug">
                    {item.question}
                  </h3>

                  {/* Contextual Eye-Opener note if available */}
                  {item.eyeOpener && (
                    <div className="mt-3 flex items-start gap-2 text-xs sm:text-sm text-stone-500 bg-brand-surface border border-stone-200/80 rounded-lg px-3 py-2">
                      <Lightbulb className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                      <span>{item.eyeOpener}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Options Grid: 3 modern cards on tablet/desktop, stacked on mobile */}
            <div className="p-4 sm:p-5 bg-stone-50/40 grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
              {item.options.map((option, idx) => {
                const isSelected = selectedOpt === option.id;
                const label = OPTION_LABELS[idx] ?? String(idx + 1);

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => onSelectOption(item.id, option.id)}
                    className={`w-full text-left rounded-xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 active:scale-[0.98] cursor-pointer group min-h-[110px] ${
                      isSelected
                        ? 'bg-white border-2 border-brand-primary ring-2 ring-brand-primary/20 shadow-md'
                        : 'bg-white border-2 border-stone-200/90 hover:border-brand-primary/40 hover:bg-stone-50/90 shadow-2xs hover:shadow-xs'
                    }`}
                  >
                    {/* Top Row: Letter badge & Selection check */}
                    <div className="flex items-center justify-between mb-3 w-full">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                          isSelected
                            ? 'bg-brand-primary text-white shadow-sm shadow-brand-primary/30'
                            : 'bg-stone-100 text-stone-600 group-hover:bg-brand-primary/10 group-hover:text-brand-primary'
                        }`}
                      >
                        {isSelected ? <Check className="w-4 h-4" /> : label}
                      </div>

                      {isSelected && (
                        <span className="text-[11px] font-bold uppercase tracking-wider text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded">
                          Active
                        </span>
                      )}
                    </div>

                    {/* Option Text */}
                    <p
                      className={`text-sm sm:text-[15px] leading-relaxed flex-1 ${
                        isSelected
                          ? 'text-brand-dark font-bold'
                          : 'text-stone-700 font-medium group-hover:text-stone-900'
                      }`}
                    >
                      {option.text}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
