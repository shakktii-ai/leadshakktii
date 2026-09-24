'use client';

import React, { useState } from 'react';
import {
  Rocket,
  ArrowRight,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { CRM_LEAD_OPTIONS } from '@/data/auditQuestions';

const INITIAL_FORM_STATE = {
  fullName: '',
  firmName: '',
  microMarket: '',
  whatsappNumber: '',
  crmLeadVolume: '',
  consent: true,
};

export default function LeadCaptureSidebar({
  onSubmit,
  isSubmitting,
  isMobileModal = false,
}) {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validate = (data) => {
    const newErrors = {};

    if (!data.fullName.trim()) {
      newErrors.fullName = 'Please enter your name.';
    }

    if (!data.firmName.trim()) {
      newErrors.firmName = 'Please enter your firm name.';
    }

    if (!data.microMarket.trim()) {
      newErrors.microMarket = 'Please enter your focus area or micro-market.';
    }

    const cleanedPhone = data.whatsappNumber.replace(/\D/g, '');
    const validIndianPhone = /^[6-9]\d{9}$/.test(cleanedPhone);

    if (!data.whatsappNumber.trim()) {
      newErrors.whatsappNumber = 'Please enter your WhatsApp number.';
    } else if (!validIndianPhone) {
      newErrors.whatsappNumber = 'Please enter a valid 10-digit mobile number.';
    }

    if (!data.crmLeadVolume || data.crmLeadVolume === 'Select range') {
      newErrors.crmLeadVolume = 'Please select your lead volume range.';
    }

    if (!data.consent) {
      newErrors.consent = 'Please agree to receive your lead audit report.';
    }

    return newErrors;
  };

  const handleChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);

    if (touched[field]) {
      const validationErrors = validate(updated);
      setErrors(validationErrors);
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const validationErrors = validate(formData);
    setErrors(validationErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allTouched = {
      fullName: true,
      firmName: true,
      microMarket: true,
      whatsappNumber: true,
      crmLeadVolume: true,
      consent: true,
    };
    setTouched(allTouched);

    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const submittedData = { ...formData };
      await onSubmit(submittedData);
      // Clear all fields on submit
      setFormData(INITIAL_FORM_STATE);
      setTouched({});
      setErrors({});
    }
  };

  return (
    <div id="lead-form-card" className={isMobileModal ? 'w-full' : 'space-y-6 lg:sticky lg:top-24'}>
      {/* Main Lead Capture Form Card */}
      <div className="bg-white rounded-2xl shadow-2xl shadow-stone-300/50 border border-stone-200 overflow-hidden">
        
        {/* Premium Card Header */}
        <div className="bg-gradient-to-br from-brand-primary to-brand-secondary text-white p-6 sm:p-7">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-brand-accent/20 border border-brand-accent/40 flex items-center justify-center">
              <Rocket className="w-7 h-7 text-brand-accent transform -rotate-45" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-accent bg-white/10 px-3 py-1.5 rounded-full">
              Free Assessment Report
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2 leading-snug">
            Get Your Free Micro-Market Lead Audit
          </h3>
          <p className="text-sm text-brand-accent-light font-medium leading-relaxed">
            Fill in your details and get a customized Lead Protection Report on WhatsApp.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-6">
          
          {/* Your Name */}
          <div>
            <label htmlFor="fullName" className="block text-base sm:text-sm font-bold text-brand-dark mb-3">
              Your Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-stone-400">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <input
                type="text"
                id="fullName"
                name="fullName"
                autoComplete="name"
                value={formData.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                onBlur={() => handleBlur('fullName')}
                placeholder="Enter your name"
                className={`w-full pl-14 pr-4 py-4.5 rounded-xl border text-base text-brand-dark placeholder:text-stone-400 focus:outline-none focus:ring-2 min-h-[58px] transition-all ${
                  errors.fullName && touched.fullName
                    ? 'border-red-400 focus:ring-red-100 bg-red-50/30'
                    : 'border-stone-300 focus:border-brand-primary focus:ring-brand-primary/30 bg-white shadow-sm'
                }`}
              />
            </div>
            {errors.fullName && touched.fullName && (
              <p className="text-sm text-red-600 mt-2.5 flex items-center gap-1.5 font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errors.fullName}</span>
              </p>
            )}
          </div>

          {/* Real Estate Firm Name */}
          <div>
            <label htmlFor="firmName" className="block text-base sm:text-sm font-bold text-brand-dark mb-3">
              Real Estate Firm Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-stone-400">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="4" y="2" width="16" height="20" rx="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 22v-4h6v4" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 6h.01" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 6h.01" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <input
                type="text"
                id="firmName"
                name="firmName"
                autoComplete="organization"
                value={formData.firmName}
                onChange={(e) => handleChange('firmName', e.target.value)}
                onBlur={() => handleBlur('firmName')}
                placeholder="Enter your firm name"
                className={`w-full pl-14 pr-4 py-4.5 rounded-xl border text-base text-brand-dark placeholder:text-stone-400 focus:outline-none focus:ring-2 min-h-[58px] transition-all ${
                  errors.firmName && touched.firmName
                    ? 'border-red-400 focus:ring-red-100 bg-red-50/30'
                    : 'border-stone-300 focus:border-brand-primary focus:ring-brand-primary/30 bg-white shadow-sm'
                }`}
              />
            </div>
            {errors.firmName && touched.firmName && (
              <p className="text-sm text-red-600 mt-2.5 flex items-center gap-1.5 font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errors.firmName}</span>
              </p>
            )}
          </div>

          {/* Focus Micro-Market / Area */}
          <div>
            <label htmlFor="microMarket" className="block text-base sm:text-sm font-bold text-brand-dark mb-3">
              Your Focus Micro-Market / Area <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-stone-400">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="10" r="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <input
                type="text"
                id="microMarket"
                name="microMarket"
                value={formData.microMarket}
                onChange={(e) => handleChange('microMarket', e.target.value)}
                onBlur={() => handleBlur('microMarket')}
                placeholder="e.g., South Pune, Baner-Balewadi"
                className={`w-full pl-14 pr-4 py-4.5 rounded-xl border text-base text-brand-dark placeholder:text-stone-400 focus:outline-none focus:ring-2 min-h-[58px] transition-all ${
                  errors.microMarket && touched.microMarket
                    ? 'border-red-400 focus:ring-red-100 bg-red-50/30'
                    : 'border-stone-300 focus:border-brand-primary focus:ring-brand-primary/30 bg-white shadow-sm'
                }`}
              />
            </div>
            {errors.microMarket && touched.microMarket && (
              <p className="text-sm text-red-600 mt-2.5 flex items-center gap-1.5 font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errors.microMarket}</span>
              </p>
            )}
          </div>

          {/* WhatsApp Number */}
          <div>
            <label htmlFor="whatsappNumber" className="block text-base sm:text-sm font-bold text-brand-dark mb-3">
              WhatsApp Number <span className="text-red-500">*</span>
            </label>
            <div className="flex rounded-xl border overflow-hidden focus-within:ring-2 focus-within:ring-brand-primary/30 focus-within:border-brand-primary border-stone-300 min-h-[58px] shadow-sm">
              <span className="inline-flex items-center px-5 bg-stone-100 text-stone-800 font-semibold text-sm border-r border-stone-300 select-none">
                +91
              </span>
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-stone-400">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoComplete="tel"
                  id="whatsappNumber"
                  name="whatsappNumber"
                  maxLength={10}
                  value={formData.whatsappNumber}
                  onChange={(e) => {
                    const numericOnly = e.target.value.replace(/\D/g, '').slice(0, 10);
                    handleChange('whatsappNumber', numericOnly);
                  }}
                  onBlur={() => handleBlur('whatsappNumber')}
                  placeholder="Enter your number"
                  className="w-full pl-14 pr-4 py-4.5 bg-white text-base text-brand-dark placeholder:text-stone-400 focus:outline-none"
                />
              </div>
            </div>
            {errors.whatsappNumber && touched.whatsappNumber && (
              <p className="text-sm text-red-600 mt-2.5 flex items-center gap-1.5 font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errors.whatsappNumber}</span>
              </p>
            )}
          </div>

          {/* How Many Old Leads Do You Have? */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label htmlFor="crmLeadVolume" className="block text-base sm:text-sm font-bold text-brand-dark">
                How Many Old Leads Do You Have? <span className="text-red-500">*</span>
              </label>
              <svg className="w-5 h-5 text-stone-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 17h.01" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <select
              id="crmLeadVolume"
              name="crmLeadVolume"
              value={formData.crmLeadVolume}
              onChange={(e) => handleChange('crmLeadVolume', e.target.value)}
              onBlur={() => handleBlur('crmLeadVolume')}
              className={`w-full px-4 py-4.5 rounded-xl border text-base text-brand-dark bg-white focus:outline-none focus:ring-2 min-h-[58px] cursor-pointer shadow-sm ${
                errors.crmLeadVolume && touched.crmLeadVolume
                  ? 'border-red-400 focus:ring-red-100 bg-red-50/30'
                  : 'border-stone-300 focus:border-brand-primary focus:ring-brand-primary/30'
              }`}
            >
              {CRM_LEAD_OPTIONS.map((opt) => (
                <option key={opt} value={opt === 'Select range' ? '' : opt}>
                  {opt}
                </option>
              ))}
            </select>
            {errors.crmLeadVolume && touched.crmLeadVolume && (
              <p className="text-sm text-red-600 mt-2.5 flex items-center gap-1.5 font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errors.crmLeadVolume}</span>
              </p>
            )}
          </div>

          {/* Consent Checkbox */}
          <div className="pt-3">
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                id="consent"
                name="consent"
                checked={formData.consent}
                onChange={(e) => handleChange('consent', e.target.checked)}
                className="w-6 h-6 mt-0.5 rounded border-stone-300 text-brand-primary focus:ring-brand-primary cursor-pointer"
              />
              <span className="text-base sm:text-sm text-stone-600 leading-relaxed">
                I agree to receive updates from Shakktii AI.
              </span>
            </label>
            {errors.consent && touched.consent && (
              <p className="text-sm text-red-600 mt-2.5 flex items-center gap-1.5 font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errors.consent}</span>
              </p>
            )}
          </div>

          {/* Primary Submit Button */}
          <div className="pt-5">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-3 px-8 py-5 rounded-xl text-base sm:text-base font-bold bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-secondary hover:to-brand-primary active:scale-[0.98] text-white shadow-xl hover:shadow-2xl transition-all cursor-pointer min-h-[68px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin text-white" />
                  <span>Generating Audit Report...</span>
                </>
              ) : (
                <>
                  <span className="text-center leading-snug">
                    Show Me How to Stop Lead Leakage &amp; Build My Own Website System
                  </span>
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </>
              )}
            </button>
          </div>

          {/* Privacy Note */}
          <div className="flex items-center justify-center gap-2.5 pt-4 text-sm text-stone-500 text-center">
            <svg className="w-5 h-5 text-stone-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Your information is 100% secure. We respect your privacy.</span>
          </div>
        </form>
      </div>

      {/* Bottom Promo Card (Only shown in sidebar on desktop) */}
      {!isMobileModal && (
        <div className="relative rounded-2xl overflow-hidden shadow-md border border-slate-200 min-h-[190px] group cursor-pointer">
          <img
            src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80"
            alt="Modern Architectural House"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/30" />
          
          <div className="relative z-10 p-5 flex flex-col justify-between h-full min-h-[190px] text-white">
            <div>
              <h4 className="text-xl font-bold tracking-tight text-white leading-tight">
                Your Website.<br />
                Your Buyers.<br />
                Your Growth.
              </h4>
            </div>

            <div className="flex items-end justify-between gap-3 pt-4">
              <p className="text-xs text-slate-200 font-medium">
                Own Your Market.<br />
                Not Just a Share of It.
              </p>
              <div className="w-9 h-9 rounded-full bg-[#1E60E8] flex items-center justify-center text-white shadow-md group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
