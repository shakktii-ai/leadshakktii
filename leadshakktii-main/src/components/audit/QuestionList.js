'use client';

import React, { useState } from 'react';
import {
  CheckCircle2,
  Check,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Rocket,
  Lock,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import {
  HiOutlineCurrencyRupee,
  HiOutlineUserGroup,
  HiOutlineCircleStack,
  HiOutlineMagnifyingGlass,
  HiOutlineMegaphone,
  HiOutlineShieldCheck,
  HiOutlineDevicePhoneMobile,
  HiOutlinePauseCircle,
  HiOutlineCursorArrowRays,
  HiOutlineLightBulb,
  HiSparkles,
  HiCheck,
} from 'react-icons/hi2';
import { TbCoinRupee, TbTargetArrow, TbUsersGroup } from 'react-icons/tb';
import { FaHandshake } from 'react-icons/fa6';
import { AUDIT_QUESTIONS, CRM_LEAD_OPTIONS } from '@/data/auditQuestions';

// Premium high-fidelity icon map
const ICON_MAP = {
  coins: <HiOutlineCurrencyRupee className="w-5 h-5 text-amber-500" />,
  users: <HiOutlineUserGroup className="w-5 h-5 text-blue-500" />,
  database: <HiOutlineCircleStack className="w-5 h-5 text-indigo-500" />,
  search: <HiOutlineMagnifyingGlass className="w-5 h-5 text-emerald-500" />,
  megaphone: <HiOutlineMegaphone className="w-5 h-5 text-rose-500" />,
  shield: <HiOutlineShieldCheck className="w-5 h-5 text-emerald-600" />,
  smartphone: <HiOutlineDevicePhoneMobile className="w-5 h-5 text-purple-500" />,
  'pause-circle': <HiOutlinePauseCircle className="w-5 h-5 text-amber-600" />,
  handshake: <FaHandshake className="w-5 h-5 text-teal-600" />,
  target: <HiOutlineCursorArrowRays className="w-5 h-5 text-emerald-600" />,
};

const OPTION_LABELS = ['A', 'B', 'C', 'D'];

export default function QuestionList({
  selectedAnswers = {},
  onSelectOption,
  formData = {},
  onUpdateFormData = () => {},
  onSubmitLead,
  isSubmitting = false,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formErrors, setFormErrors] = useState({});
  const [formTouched, setFormTouched] = useState({});

  const totalQuestions = AUDIT_QUESTIONS.length;
  const isFinalStep = currentIndex === totalQuestions;
  const currentItem = !isFinalStep ? AUDIT_QUESTIONS[currentIndex] : null;
  const isCurrentAnswered = currentItem ? !!selectedAnswers[currentItem.id] : false;
  const isFirst = currentIndex === 0;

  const answeredCount = Object.keys(selectedAnswers).length;
  const allAnswered = answeredCount === totalQuestions;
  const unansweredCount = totalQuestions - answeredCount;
  const progressPercent = Math.round(
    ((answeredCount + (isFinalStep ? 1 : 0)) / (totalQuestions + 1)) * 100
  );

  const handleOptionClick = (questionId, optionId) => {
    onSelectOption(questionId, optionId);

    // Smoothly advance to next question or final form
    setTimeout(() => {
      setCurrentIndex((prev) => Math.min(totalQuestions, prev + 1));
    }, 300);
  };

  const handleNext = () => {
    // Only advance to final form step if all questions are answered
    if (currentIndex === totalQuestions - 1 && !allAnswered) {
      // Jump to the first unanswered question instead
      const firstUnanswered = AUDIT_QUESTIONS.findIndex((q) => !selectedAnswers[q.id]);
      if (firstUnanswered !== -1) setCurrentIndex(firstUnanswered);
      return;
    }
    if (currentIndex < totalQuestions) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const validateForm = () => {
    const errs = {};
    if (!formData.fullName?.trim()) errs.fullName = 'Please enter your full name.';
    if (!formData.firmName?.trim()) errs.firmName = 'Please enter your firm name.';
    if (!formData.microMarket?.trim()) errs.microMarket = 'Please enter your focus micro-market / area.';

    const cleanedPhone = (formData.whatsappNumber || '').replace(/\D/g, '');
    const validIndianPhone = /^[6-9]\d{9}$/.test(cleanedPhone);
    if (!formData.whatsappNumber?.trim()) {
      errs.whatsappNumber = 'Please enter your WhatsApp number.';
    } else if (!validIndianPhone) {
      errs.whatsappNumber = 'Please enter a valid 10-digit mobile number.';
    }

    if (!formData.crmLeadVolume || formData.crmLeadVolume === 'Select range') {
      errs.crmLeadVolume = 'Please select your lead volume.';
    }

    if (!formData.consent) {
      errs.consent = 'Please agree to receive your lead audit report.';
    }
    return errs;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Block if any questions still unanswered
    if (!allAnswered) {
      const firstUnanswered = AUDIT_QUESTIONS.findIndex((q) => !selectedAnswers[q.id]);
      if (firstUnanswered !== -1) setCurrentIndex(firstUnanswered);
      return;
    }

    const touchedAll = {
      fullName: true,
      firmName: true,
      microMarket: true,
      whatsappNumber: true,
      crmLeadVolume: true,
      consent: true,
    };
    setFormTouched(touchedAll);

    const validationErrors = validateForm();
    setFormErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0 && onSubmitLead) {
      await onSubmitLead(formData);
    }
  };

  const stepperContainerRef = React.useRef(null);

  // Auto-scroll active stepper pill into view on mobile
  React.useEffect(() => {
    if (stepperContainerRef.current) {
      const activeBtn = stepperContainerRef.current.querySelector('[data-active="true"]');
      if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [currentIndex]);

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* ------------------------------------------------------------- */}
      {/* ATTRACTIVE ANIMATED QUESTION STEPPER & PROGRESS BAR */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white rounded-2xl p-4 sm:p-5.5 border border-stone-200/90 shadow-md shadow-stone-200/40 transition-all">
        {/* Top Header: Step Counter + Dynamic Status Badge */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 min-w-0 flex-wrap">
            <span className="relative flex h-3 w-3 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>
            <span className="text-sm sm:text-base font-black text-brand-dark tracking-tight">
              {isFinalStep ? 'Final Step: Report Delivery' : `Question ${currentIndex + 1} of ${totalQuestions}`}
            </span>
            <span className="text-stone-300 hidden sm:inline">·</span>
            <span className="text-xs sm:text-sm font-semibold text-stone-500 hidden sm:inline">
              {answeredCount}/{totalQuestions} Answered
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-50 via-teal-50 to-amber-50 border border-emerald-300/80 text-emerald-900 text-xs font-black shadow-2xs shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>{progressPercent}%</span>
            <span className="font-semibold text-emerald-700 hidden xs:inline">Done</span>
          </div>
        </div>

        {/* Animated Glowing Progress Bar with Shimmer Beam */}
        <div className="relative w-full bg-stone-100 h-3 rounded-full overflow-hidden mb-4 p-0.5 shadow-inner ring-1 ring-stone-200/60">
          <div
            className="h-full bg-gradient-to-r from-brand-primary via-emerald-500 to-amber-400 rounded-full transition-all duration-500 ease-out relative overflow-hidden shadow-xs"
            style={{ width: `${Math.max(6, progressPercent)}%` }}
          >
            {/* Animated Shimmer beam moving across */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
          </div>
        </div>

        {/* Numbered Step Pills Bar with Active Auto-Scroll */}
        <div
          ref={stepperContainerRef}
          className="flex items-center justify-between gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none scroll-smooth"
        >
          {AUDIT_QUESTIONS.map((q, idx) => {
            const isDone = !!selectedAnswers[q.id];
            const isCurrent = idx === currentIndex;

            return (
              <button
                key={q.id}
                type="button"
                data-active={isCurrent}
                onClick={() => setCurrentIndex(idx)}
                className={`flex-1 min-w-[32px] sm:min-w-[38px] h-9 sm:h-10 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center transition-all duration-200 cursor-pointer select-none ${
                  isCurrent
                    ? 'bg-gradient-to-br from-brand-primary to-brand-secondary text-white shadow-lg shadow-brand-primary/30 ring-2 ring-brand-primary/40 scale-105 -translate-y-0.5'
                    : isDone
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/90 hover:bg-emerald-100'
                    : 'bg-stone-100/90 text-stone-600 hover:bg-stone-200'
                }`}
                title={`Question ${idx + 1}`}
              >
                {isDone && !isCurrent ? (
                  <Check className="w-4 h-4 stroke-[3] text-emerald-600" />
                ) : (
                  idx + 1
                )}
              </button>
            );
          })}

          {/* Final Step: Get Report Pill — only active when all answered */}
          <button
            type="button"
            data-active={isFinalStep}
            onClick={() => {
              if (allAnswered) {
                setCurrentIndex(totalQuestions);
              } else {
                // Jump to first unanswered question
                const firstUnanswered = AUDIT_QUESTIONS.findIndex((q) => !selectedAnswers[q.id]);
                if (firstUnanswered !== -1) setCurrentIndex(firstUnanswered);
              }
            }}
            className={`px-3 sm:px-4 h-9 sm:h-10 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer shrink-0 select-none ${
              isFinalStep
                ? 'bg-gradient-to-r from-emerald-600 to-brand-primary text-white shadow-lg shadow-emerald-900/30 ring-2 ring-emerald-500/40 scale-105 -translate-y-0.5'
                : allAnswered
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 font-black hover:bg-emerald-200 animate-pulse'
                : 'bg-stone-100/90 text-stone-400 cursor-not-allowed opacity-60'
            }`}
            title={allAnswered ? 'Get Your Report' : `Answer ${unansweredCount} more question${unansweredCount > 1 ? 's' : ''} first`}
          >
            <Rocket className="w-3.5 h-3.5" />
            <span>Report</span>
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* ACTIVE QUESTION CARD (Steps 0 to 9) */}
      {/* ------------------------------------------------------------- */}
      {!isFinalStep && currentItem ? (
        <div
          id={`question-${currentItem.id}`}
          className="bg-white rounded-2xl border border-brand-primary/20 shadow-lg shadow-brand-primary/5 transition-all duration-300 overflow-hidden"
        >
          {/* Question Header */}
          <div className="p-5 sm:p-7 bg-white border-b border-stone-100">
            <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4">
              <div className="flex items-center gap-2 min-w-0">
                <div
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    isCurrentAnswered
                      ? 'bg-brand-primary text-white shadow-xs shadow-brand-primary/30'
                      : 'bg-brand-primary/10 text-brand-primary'
                  }`}
                >
                  {isCurrentAnswered ? (
                    <Check className="w-4 h-4 stroke-[3]" />
                  ) : (
                    ICON_MAP[currentItem.iconType] ?? <Target className="w-4 h-4" />
                  )}
                </div>

                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-100 text-stone-700 text-xs font-semibold uppercase tracking-wider">
                  <span className="font-bold text-brand-primary">
                    {currentItem.category.split('. ')[1] || currentItem.category}
                  </span>
                </span>
              </div>

              {isCurrentAnswered && (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Selected</span>
                </span>
              )}
            </div>

            {/* Question Heading */}
            <h3 className="text-lg sm:text-2xl font-extrabold text-brand-dark leading-snug w-full">
              {currentIndex + 1}. {currentItem.question}
            </h3>

            {/* Eye-Opener Insight */}
            {currentItem.eyeOpener && (
              <div className="mt-3.5 sm:mt-4 w-full flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-stone-700 bg-amber-50/80 border border-amber-200/90 rounded-xl p-3 sm:p-4 shadow-2xs">
                <HiOutlineLightBulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed font-medium">{currentItem.eyeOpener}</span>
              </div>
            )}
          </div>

          {/* Options List */}
          <div className="p-4 sm:p-6 bg-stone-50/60 space-y-3 sm:space-y-3.5">
            {currentItem.options.map((option, idx) => {
              const isSelected = selectedAnswers[currentItem.id] === option.id;
              const label = OPTION_LABELS[idx] ?? String(idx + 1);

              return (
                <div key={option.id} className="flex items-center gap-2.5 sm:gap-3.5 w-full group">
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-extrabold text-base sm:text-lg shrink-0 transition-all select-none ${
                      isSelected
                        ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/30 ring-2 ring-brand-primary/20 scale-105'
                        : 'bg-stone-200/90 text-stone-700 group-hover:bg-brand-primary/10 group-hover:text-brand-primary'
                    }`}
                  >
                    {label}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleOptionClick(currentItem.id, option.id)}
                    className={`flex-1 text-left rounded-xl px-4.5 py-4 sm:px-5 sm:py-4.5 flex items-center justify-between gap-3.5 border transition-all duration-200 active:scale-[0.99] cursor-pointer shadow-xs min-h-[60px] sm:min-h-[64px] ${
                      isSelected
                        ? 'bg-white border-2 border-brand-primary ring-2 ring-brand-primary/15 shadow-md'
                        : 'bg-white border border-stone-200 hover:border-brand-primary/40 hover:bg-stone-50 hover:shadow-sm'
                    }`}
                  >
                    <p
                      className={`text-[15px] sm:text-base leading-relaxed flex-1 ${
                        isSelected
                          ? 'text-brand-dark font-bold'
                          : 'text-stone-700 font-medium group-hover:text-stone-900'
                      }`}
                    >
                      {option.text}
                    </p>

                    {isSelected && (
                      <span className="w-6 h-6 rounded-full bg-brand-primary text-white flex items-center justify-center shrink-0 shadow-xs">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </span>
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Bottom Actions: Previous & Next */}
          <div className="p-4 sm:p-6 bg-white border-t border-stone-100 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handlePrev}
              disabled={isFirst}
              className={`inline-flex items-center gap-2 px-4 sm:px-5 py-3 rounded-xl text-sm sm:text-base font-bold transition-all min-h-[48px] cursor-pointer ${
                isFirst
                  ? 'opacity-40 pointer-events-none text-stone-400 bg-stone-100'
                  : 'text-stone-700 bg-stone-100 hover:bg-stone-200 active:scale-98'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              className={`inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 rounded-xl text-sm sm:text-base font-extrabold transition-all shadow-md active:scale-98 cursor-pointer min-h-[48px] ${
                currentIndex === totalQuestions - 1
                  ? allAnswered
                    ? 'bg-gradient-to-r from-emerald-700 to-brand-primary hover:from-brand-primary hover:to-emerald-700 text-white shadow-emerald-900/20'
                    : 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-900/20'
                  : 'bg-brand-primary hover:bg-brand-secondary text-white'
              }`}
            >
              <span>
                {currentIndex === totalQuestions - 1
                  ? allAnswered
                    ? 'Proceed to Get Report'
                    : `Answer ${unansweredCount} Remaining Question${unansweredCount > 1 ? 's' : ''}`
                  : 'Next Question'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* ------------------------------------------------------------- */
        /* INTEGRATED FINAL STEP: Lead Details & Report Generation Form */
        /* ------------------------------------------------------------- */
        <div className="bg-white rounded-2xl border border-brand-primary/20 shadow-xl shadow-stone-200/50 overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-300">
          {/* Incomplete answers warning banner */}
          {!allAnswered && (
            <div className="bg-amber-50 border-b border-amber-200 p-4 flex items-start gap-3">
              <span className="text-amber-500 text-lg shrink-0">⚠️</span>
              <div className="flex-1">
                <p className="text-sm font-bold text-amber-800">
                  {unansweredCount} question{unansweredCount > 1 ? 's' : ''} not answered yet
                </p>
                <p className="text-xs text-amber-700 mt-0.5">
                  Please answer all {totalQuestions} questions to get your personalized audit report.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const firstUnanswered = AUDIT_QUESTIONS.findIndex((q) => !selectedAnswers[q.id]);
                  if (firstUnanswered !== -1) setCurrentIndex(firstUnanswered);
                }}
                className="shrink-0 text-xs font-bold text-amber-800 underline hover:text-amber-900 cursor-pointer"
              >
                Go Back & Answer →
              </button>
            </div>
          )}
          {/* Form Fields */}
          <form onSubmit={handleFormSubmit} className="p-5 sm:p-8 space-y-5">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-bold text-brand-dark mb-2">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName || ''}
                onChange={(e) => onUpdateFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                placeholder="Enter your name"
                className={`w-full px-4 py-3.5 rounded-xl border text-base text-brand-dark placeholder:text-stone-400 focus:outline-none focus:ring-2 min-h-[52px] ${
                  formErrors.fullName && formTouched.fullName
                    ? 'border-red-400 bg-red-50/20 focus:ring-red-100'
                    : 'border-stone-300 focus:border-brand-primary focus:ring-brand-primary/20 bg-white'
                }`}
              />
              {formErrors.fullName && formTouched.fullName && (
                <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{formErrors.fullName}</span>
                </p>
              )}
            </div>

            {/* Firm Name */}
            <div>
              <label htmlFor="firmName" className="block text-sm font-bold text-brand-dark mb-2">
                Real Estate Firm Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="firmName"
                name="firmName"
                value={formData.firmName || ''}
                onChange={(e) => onUpdateFormData((prev) => ({ ...prev, firmName: e.target.value }))}
                placeholder="Enter your firm name"
                className={`w-full px-4 py-3.5 rounded-xl border text-base text-brand-dark placeholder:text-stone-400 focus:outline-none focus:ring-2 min-h-[52px] ${
                  formErrors.firmName && formTouched.firmName
                    ? 'border-red-400 bg-red-50/20 focus:ring-red-100'
                    : 'border-stone-300 focus:border-brand-primary focus:ring-brand-primary/20 bg-white'
                }`}
              />
              {formErrors.firmName && formTouched.firmName && (
                <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{formErrors.firmName}</span>
                </p>
              )}
            </div>

            {/* Micro Market */}
            <div>
              <label htmlFor="microMarket" className="block text-sm font-bold text-brand-dark mb-2">
                Your Focus Micro-Market / Area <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="microMarket"
                name="microMarket"
                value={formData.microMarket || ''}
                onChange={(e) => onUpdateFormData((prev) => ({ ...prev, microMarket: e.target.value }))}
                placeholder="e.g. South Pune, Baner-Balewadi or Whitefield"
                className={`w-full px-4 py-3.5 rounded-xl border text-base text-brand-dark placeholder:text-stone-400 focus:outline-none focus:ring-2 min-h-[52px] ${
                  formErrors.microMarket && formTouched.microMarket
                    ? 'border-red-400 bg-red-50/20 focus:ring-red-100'
                    : 'border-stone-300 focus:border-brand-primary focus:ring-brand-primary/20 bg-white'
                }`}
              />
              {formErrors.microMarket && formTouched.microMarket && (
                <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{formErrors.microMarket}</span>
                </p>
              )}
            </div>

            {/* WhatsApp Number */}
            <div>
              <label htmlFor="whatsappNumber" className="block text-sm font-bold text-brand-dark mb-2">
                WhatsApp Number <span className="text-red-500">*</span>
              </label>
              <div className="flex rounded-xl border overflow-hidden focus-within:ring-2 focus-within:ring-brand-primary/20 focus-within:border-brand-primary border-stone-300 min-h-[52px]">
                <span className="inline-flex items-center px-4 bg-stone-100 text-stone-800 font-bold text-sm border-r border-stone-300 select-none">
                  +91
                </span>
                <input
                  type="tel"
                  inputMode="numeric"
                  id="whatsappNumber"
                  name="whatsappNumber"
                  maxLength={10}
                  value={formData.whatsappNumber || ''}
                  onChange={(e) => {
                    const numericOnly = e.target.value.replace(/\D/g, '').slice(0, 10);
                    onUpdateFormData((prev) => ({ ...prev, whatsappNumber: numericOnly }));
                  }}
                  placeholder="Enter 10-digit number"
                  className="w-full px-4 py-3.5 bg-white text-base text-brand-dark placeholder:text-stone-400 focus:outline-none"
                />
              </div>
              {formErrors.whatsappNumber && formTouched.whatsappNumber && (
                <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{formErrors.whatsappNumber}</span>
                </p>
              )}
            </div>

            {/* CRM / Phone Leads Volume */}
            <div>
              <label className="block text-sm font-bold text-brand-dark mb-2">
                How Many Old Leads in Your CRM / Phone? <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
                {CRM_LEAD_OPTIONS.filter((opt) => opt !== 'Select range').map((opt) => {
                  const isSelected = formData.crmLeadVolume === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => onUpdateFormData((prev) => ({ ...prev, crmLeadVolume: opt }))}
                      className={`p-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all flex items-center justify-between cursor-pointer min-h-[46px] ${
                        isSelected
                          ? 'border-brand-primary bg-brand-primary/10 text-brand-dark ring-1 ring-brand-primary'
                          : 'border-stone-200 bg-white text-stone-700 hover:border-brand-primary/40'
                      }`}
                    >
                      <span>{opt}</span>
                      {isSelected && <Check className="w-4 h-4 text-brand-primary shrink-0" />}
                    </button>
                  );
                })}
              </div>
              {formErrors.crmLeadVolume && formTouched.crmLeadVolume && (
                <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{formErrors.crmLeadVolume}</span>
                </p>
              )}
            </div>

            {/* Consent */}
            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  id="consent"
                  name="consent"
                  checked={formData.consent !== false}
                  onChange={(e) => onUpdateFormData((prev) => ({ ...prev, consent: e.target.checked }))}
                  className="w-5 h-5 mt-0.5 rounded border-stone-300 text-brand-primary focus:ring-brand-primary cursor-pointer"
                />
                <span className="text-xs text-stone-600 leading-relaxed">
                  I agree to receive my personalized Lead Audit Report on WhatsApp.
                </span>
              </label>
              {formErrors.consent && formTouched.consent && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{formErrors.consent}</span>
                </p>
              )}
            </div>

            {/* Actions: Back & Submit */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={() => setCurrentIndex(totalQuestions - 1)}
                disabled={isSubmitting}
                className="w-full sm:w-auto px-5 py-4 rounded-xl text-sm font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 transition-all cursor-pointer min-h-[52px]"
              >
                ← Back to Questions
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-base font-extrabold bg-gradient-to-r from-brand-primary to-emerald-700 hover:from-emerald-700 hover:to-brand-primary text-white shadow-xl hover:shadow-2xl transition-all cursor-pointer min-h-[56px]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-white" />
                    <span>Generating Custom Audit...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-brand-accent" />
                    <span>Show Me How to Stop Lead Leakage</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>

            {/* Privacy Note */}
            <div className="flex items-center justify-center gap-2 pt-2 text-xs text-stone-500 text-center">
              <Lock className="w-3.5 h-3.5 text-stone-400" />
              <span>Strict Privacy · Zero Spam · Never shared with rival brokers</span>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
