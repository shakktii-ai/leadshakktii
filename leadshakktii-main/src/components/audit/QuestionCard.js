'use client';

import React, { useEffect } from 'react';
import { ArrowLeft, ArrowRight, Lightbulb, CheckCircle2 } from 'lucide-react';

export default function QuestionCard({
  question,
  currentIndex,
  totalQuestions,
  selectedOptionId,
  onSelectOption,
  onNext,
  onBack,
}) {
  const isFirstQuestion = currentIndex === 0;
  const isLastQuestion = currentIndex === totalQuestions - 1;
  const hasSelectedAnswer = Boolean(selectedOptionId);
  const progressPercentage = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  // Keyboard shortcut listener for fast accessibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key >= '1' && e.key <= String(question.options.length)) {
        const optionIndex = parseInt(e.key, 10) - 1;
        if (question.options[optionIndex]) {
          onSelectOption(question.options[optionIndex].id);
        }
      } else if (e.key === 'Enter' && hasSelectedAnswer) {
        onNext();
      } else if (e.key === 'ArrowLeft' && !isFirstQuestion) {
        onBack();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [question, hasSelectedAnswer, isFirstQuestion, onSelectOption, onNext, onBack]);

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl shadow-stone-300/50 border border-stone-200 overflow-hidden transition-all duration-300">
      {/* Top Header & Dynamic Progress Bar */}
      <div className="bg-gradient-to-br from-brand-primary to-brand-secondary px-6 py-6 text-white">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-full bg-brand-accent/20 border border-brand-accent/40 text-brand-accent text-xs font-bold uppercase tracking-wider">
              {question.category}
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-medium text-brand-accent-light">
              Question <strong className="text-white font-bold">{currentIndex + 1}</strong> of {totalQuestions}
            </span>
          </div>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-brand-accent to-brand-accent-light h-2.5 rounded-full transition-all duration-400 ease-out"
            style={{ width: `${progressPercentage}%` }}
            role="progressbar"
            aria-valuenow={progressPercentage}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>

      {/* Main Question Body */}
      <div className="p-6 sm:p-8 lg:p-10">
        {/* Question Heading */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl text-brand-dark leading-snug font-bold mb-8">
          {question.question}
        </h2>

        {/* Answer Option Cards */}
        <div className="space-y-4 sm:space-y-5 mb-8" role="radiogroup" aria-label={question.question}>
          {question.options.map((option, idx) => {
            const isSelected = selectedOptionId === option.id;
            return (
              <button
                key={option.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => onSelectOption(option.id)}
                className={`w-full text-left p-5 sm:p-6 rounded-xl border-2 transition-all duration-300 flex items-start gap-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary/30 min-h-[68px] ${
                  isSelected
                    ? 'border-brand-primary bg-brand-primary/5 shadow-lg ring-2 ring-brand-primary/20'
                    : 'border-stone-200 bg-white hover:border-brand-primary/50 hover:bg-stone-50 shadow-sm'
                }`}
              >
                {/* Number / Checked Badge */}
                <div
                  className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-base sm:text-lg font-bold transition-colors ${
                    isSelected
                      ? 'bg-brand-primary text-white shadow-md'
                      : 'bg-stone-100 text-stone-600 border border-stone-300'
                  }`}
                >
                  {isSelected ? <CheckCircle2 className="w-7 h-7 text-white" /> : idx + 1}
                </div>

                {/* Option Text */}
                <div className="flex-1">
                  <p
                    className={`text-lg sm:text-xl leading-relaxed ${
                      isSelected ? 'text-brand-dark font-bold' : 'text-stone-700 font-medium'
                    }`}
                  >
                    {option.text}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Contextual Insight Callout */}
        <div className="rounded-xl bg-brand-surface border border-brand-primary/10 p-5 sm:p-6 mb-8 flex items-start gap-4 shadow-sm">
          <div className="w-11 h-11 rounded-xl bg-brand-primary/10 flex items-center justify-center shrink-0 mt-0.5 text-brand-primary">
            <Lightbulb className="w-6 h-6 text-brand-primary" />
          </div>
          <div className="text-base sm:text-lg text-stone-600 leading-relaxed">
            <span className="font-bold text-brand-dark block mb-1">Consultative Insight:</span>
            {question.insight}
          </div>
        </div>

        {/* Navigation Buttons (Back & Next) */}
        <div className="flex items-center justify-between gap-4 pt-6 border-t border-stone-200">
          <button
            type="button"
            onClick={onBack}
            disabled={isFirstQuestion}
            className={`inline-flex items-center gap-3 px-8 py-5 rounded-xl text-lg font-medium transition-all min-h-[56px] ${
              isFirstQuestion
                ? 'opacity-0 pointer-events-none'
                : 'text-stone-600 hover:text-brand-primary hover:bg-stone-100 active:scale-98 cursor-pointer'
            }`}
          >
            <ArrowLeft className="w-6 h-6" />
            <span>Previous</span>
          </button>

          <button
            type="button"
            onClick={onNext}
            disabled={!hasSelectedAnswer}
            className={`inline-flex items-center justify-center gap-3 px-10 py-5 rounded-xl text-lg sm:text-lg font-bold transition-all shadow-lg min-h-[60px] ${
              hasSelectedAnswer
                ? 'bg-gradient-to-r from-brand-primary to-brand-secondary text-white hover:from-brand-secondary hover:to-brand-primary active:scale-98 cursor-pointer hover:shadow-xl'
                : 'bg-stone-200 text-stone-400 cursor-not-allowed shadow-none'
            }`}
          >
            <span>{isLastQuestion ? 'Proceed to Report' : 'Next Question'}</span>
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
