'use client';

import React, { useState } from 'react';
import { CRM_LEAD_OPTIONS } from '@/data/auditQuestions';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Lock,
  AlertCircle,
  Loader2,
} from 'lucide-react';

const INITIAL_FORM_STATE = {
  fullName: '',
  firmName: '',
  microMarket: '',
  whatsappNumber: '',
  crmLeadVolume: '',
  monthlyPortalSpend: '',
  monthlyBuyerLeads: '',
  brokeragePerBooking: '',
  consent: true,
};

export default function LeadCaptureForm({
  initialData = INITIAL_FORM_STATE,
  onSubmit,
  onBack,
  isSubmitting,
}) {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validate = (data) => {
    const newErrors = {};

    if (!data.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    }

    if (!data.firmName.trim()) {
      newErrors.firmName = 'Please enter your real estate firm or channel partner name.';
    }

    if (!data.microMarket.trim()) {
      newErrors.microMarket = 'Please specify your primary focus micro-market / area.';
    }

    // Indian WhatsApp number validation (10 digits, starts with 6, 7, 8, or 9)
    const cleanedPhone = data.whatsappNumber.replace(/\D/g, '');
    const validIndianPhone = /^[6-9]\d{9}$/.test(cleanedPhone);

    if (!data.whatsappNumber.trim()) {
      newErrors.whatsappNumber = 'Please enter your 10-digit WhatsApp number.';
    } else if (!validIndianPhone) {
      newErrors.whatsappNumber = 'Please enter a valid 10-digit Indian mobile number (e.g. 9876543210).';
    }

    if (!data.crmLeadVolume) {
      newErrors.crmLeadVolume = 'Please select your current CRM / phone lead volume.';
    }

    if (!data.monthlyPortalSpend?.trim()) {
      newErrors.monthlyPortalSpend = 'Please enter your approx. monthly spend on property portals.';
    }

    if (!data.monthlyBuyerLeads?.trim()) {
      newErrors.monthlyBuyerLeads = 'Please enter approx. buyer leads received per month.';
    }

    if (!data.brokeragePerBooking?.trim()) {
      newErrors.brokeragePerBooking = 'Please enter average brokerage earned per booking.';
    }

    if (!data.consent) {
      newErrors.consent = 'You must agree to be contacted to receive your customized audit.';
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
      monthlyPortalSpend: true,
      monthlyBuyerLeads: true,
      brokeragePerBooking: true,
      consent: true,
    };
    setTouched(allTouched);

    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const submittedData = { ...formData };
      await onSubmit(submittedData);
      setFormData(INITIAL_FORM_STATE);
      setTouched({});
      setErrors({});
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-xl shadow-[#10233D]/5 border border-[#142E55]/10 overflow-hidden transition-all duration-300">
      {/* Top Banner */}
      <div className="bg-[#10233D] px-5 py-5 sm:px-8 sm:py-7 text-white border-b border-[#E7C579]/20">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full bg-[#E7C579]/20 text-[#E7C579] text-xs sm:text-sm font-semibold uppercase tracking-wider">
            Step 2 of 2 · Report Delivery
          </span>
        </div>
        <h2 className="font-serif-heading text-xl sm:text-2xl lg:text-3xl text-white font-normal mb-3 leading-tight">
          Get Your Free Micro-Market Lead Audit &amp; Strategy Call
        </h2>
        <p className="text-slate-300 text-sm sm:text-base font-normal">
          Share your business details to receive a personalized Lead Protection Report.
        </p>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 lg:p-10 space-y-7 sm:space-y-8">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-lg sm:text-xl font-bold text-[#10233D] mb-4">
            Your Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              onBlur={() => handleBlur('fullName')}
              placeholder="e.g. Vikram Singhania"
              className={`w-full pl-16 pr-4 py-5 rounded-xl border text-lg sm:text-xl text-[#10233D] placeholder:text-slate-400 focus:outline-none focus:ring-2 min-h-[64px] ${
                errors.fullName && touched.fullName
                  ? 'border-red-400 focus:ring-red-200'
                  : 'border-slate-300 focus:border-[#10233D] focus:ring-[#10233D]/10'
              }`}
            />
          </div>
          {errors.fullName && touched.fullName && (
            <p className="text-base text-red-600 mt-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              <span>{errors.fullName}</span>
            </p>
          )}
        </div>

        {/* Real Estate Firm Name */}
        <div>
          <label htmlFor="firmName" className="block text-lg sm:text-xl font-bold text-[#10233D] mb-4">
            Real Estate Firm Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
              value={formData.firmName}
              onChange={(e) => handleChange('firmName', e.target.value)}
              onBlur={() => handleBlur('firmName')}
              placeholder="e.g. Prime Realty Advisors"
              className={`w-full pl-16 pr-4 py-5 rounded-xl border text-lg sm:text-xl text-[#10233D] placeholder:text-slate-400 focus:outline-none focus:ring-2 min-h-[64px] ${
                errors.firmName && touched.firmName
                  ? 'border-red-400 focus:ring-red-200'
                  : 'border-slate-300 focus:border-[#10233D] focus:ring-[#10233D]/10'
              }`}
            />
          </div>
          {errors.firmName && touched.firmName && (
            <p className="text-base text-red-600 mt-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              <span>{errors.firmName}</span>
            </p>
          )}
        </div>

        {/* Focus Micro-Market / Area */}
        <div>
          <label htmlFor="microMarket" className="block text-lg sm:text-xl font-bold text-[#10233D] mb-4">
            Your Focus Micro-Market / Area <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
              placeholder="e.g. Whitefield, Bengaluru or Golf Course Road, Gurgaon"
              className={`w-full pl-16 pr-4 py-5 rounded-xl border text-lg sm:text-xl text-[#10233D] placeholder:text-slate-400 focus:outline-none focus:ring-2 min-h-[64px] ${
                errors.microMarket && touched.microMarket
                  ? 'border-red-400 focus:ring-red-200'
                  : 'border-slate-300 focus:border-[#10233D] focus:ring-[#10233D]/10'
              }`}
            />
          </div>
          {errors.microMarket && touched.microMarket && (
            <p className="text-base text-red-600 mt-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              <span>{errors.microMarket}</span>
            </p>
          )}
        </div>

        {/* WhatsApp Number (+91 prefix) */}
        <div>
          <label htmlFor="whatsappNumber" className="block text-lg sm:text-xl font-bold text-[#10233D] mb-4">
            WhatsApp Number <span className="text-red-500">*</span>
          </label>
          <div className="flex rounded-xl border overflow-hidden focus-within:ring-2 focus-within:ring-[#10233D]/10 focus-within:border-[#10233D] border-slate-300 min-h-[64px]">
            <span className="inline-flex items-center px-6 bg-slate-100 text-slate-700 font-semibold text-base border-r border-slate-300 select-none">
              🇮🇳 +91
            </span>
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <input
                type="tel"
                id="whatsappNumber"
                name="whatsappNumber"
                maxLength={10}
                value={formData.whatsappNumber}
                onChange={(e) => {
                  const numericOnly = e.target.value.replace(/\D/g, '').slice(0, 10);
                  handleChange('whatsappNumber', numericOnly);
                }}
                onBlur={() => handleBlur('whatsappNumber')}
                placeholder="9876543210"
                className="w-full pl-16 pr-4 py-5 bg-white text-lg sm:text-xl text-[#10233D] placeholder:text-slate-400 focus:outline-none"
              />
            </div>
          </div>
          {errors.whatsappNumber && touched.whatsappNumber && (
            <p className="text-base text-red-600 mt-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              <span>{errors.whatsappNumber}</span>
            </p>
          )}
          <p className="text-base text-slate-500 mt-3">
            We will send your Lead Protection Audit Report &amp; micro-market playbook directly to this WhatsApp.
          </p>
        </div>

        {/* CRM / Phone Leads Volume */}
        <div>
          <label className="block text-lg sm:text-xl font-bold text-[#10233D] mb-4">
            How Many Old Leads Do You Have in Your Phone / CRM? <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {CRM_LEAD_OPTIONS.map((option) => {
              const isSelected = formData.crmLeadVolume === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleChange('crmLeadVolume', option)}
                  className={`p-5 rounded-xl border text-left text-lg sm:text-lg font-medium transition-all flex items-center justify-between min-h-[64px] cursor-pointer ${
                    isSelected
                      ? 'border-[#10233D] bg-[#F8F7F3] text-[#10233D] ring-1 ring-[#10233D]'
                      : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400'
                  }`}
                >
                  <span>{option}</span>
                  {isSelected && <CheckCircle2 className="w-6 h-6 text-[#10233D]" />}
                </button>
              );
            })}
          </div>
          {errors.crmLeadVolume && touched.crmLeadVolume && (
            <p className="text-base text-red-600 mt-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              <span>{errors.crmLeadVolume}</span>
            </p>
          )}
        </div>

        {/* 1. Approx. monthly spend on property portals? */}
        <div>
          <label htmlFor="monthlyPortalSpend" className="block text-lg sm:text-xl font-bold text-[#10233D] mb-4">
            1. Approx. monthly spend on property portals? <span className="text-red-500">*</span>
          </label>
          <div className="flex rounded-xl border overflow-hidden focus-within:ring-2 focus-within:ring-[#10233D]/10 focus-within:border-[#10233D] border-slate-300 min-h-[64px]">
            <span className="inline-flex items-center px-6 bg-slate-100 text-slate-700 font-bold text-lg border-r border-slate-300 select-none">
              ₹
            </span>
            <input
              type="text"
              inputMode="numeric"
              id="monthlyPortalSpend"
              name="monthlyPortalSpend"
              value={formData.monthlyPortalSpend}
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9,]/g, '');
                handleChange('monthlyPortalSpend', val);
              }}
              onBlur={() => handleBlur('monthlyPortalSpend')}
              placeholder="e.g. 50,000"
              className="w-full px-5 py-5 bg-white text-lg sm:text-xl text-[#10233D] placeholder:text-slate-400 focus:outline-none"
            />
          </div>
          {errors.monthlyPortalSpend && touched.monthlyPortalSpend && (
            <p className="text-base text-red-600 mt-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              <span>{errors.monthlyPortalSpend}</span>
            </p>
          )}
        </div>

        {/* 2. Approx. buyer leads received per month? */}
        <div>
          <label htmlFor="monthlyBuyerLeads" className="block text-lg sm:text-xl font-bold text-[#10233D] mb-4">
            2. Approx. buyer leads received per month? <span className="text-red-500">*</span>
          </label>
          <div className="flex rounded-xl border overflow-hidden focus-within:ring-2 focus-within:ring-[#10233D]/10 focus-within:border-[#10233D] border-slate-300 min-h-[64px]">
            <input
              type="text"
              inputMode="numeric"
              id="monthlyBuyerLeads"
              name="monthlyBuyerLeads"
              value={formData.monthlyBuyerLeads}
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9]/g, '');
                handleChange('monthlyBuyerLeads', val);
              }}
              onBlur={() => handleBlur('monthlyBuyerLeads')}
              placeholder="e.g. 60"
              className="w-full px-5 py-5 bg-white text-lg sm:text-xl text-[#10233D] placeholder:text-slate-400 focus:outline-none"
            />
            <span className="inline-flex items-center px-6 bg-slate-100 text-slate-700 font-semibold text-base border-l border-slate-300 select-none">
              leads
            </span>
          </div>
          {errors.monthlyBuyerLeads && touched.monthlyBuyerLeads && (
            <p className="text-base text-red-600 mt-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              <span>{errors.monthlyBuyerLeads}</span>
            </p>
          )}
        </div>

        {/* 3. Average brokerage earned per booking? */}
        <div>
          <label htmlFor="brokeragePerBooking" className="block text-lg sm:text-xl font-bold text-[#10233D] mb-4">
            3. Average brokerage earned per booking? <span className="text-red-500">*</span>
          </label>
          <div className="flex rounded-xl border overflow-hidden focus-within:ring-2 focus-within:ring-[#10233D]/10 focus-within:border-[#10233D] border-slate-300 min-h-[64px]">
            <span className="inline-flex items-center px-6 bg-slate-100 text-slate-700 font-bold text-lg border-r border-slate-300 select-none">
              ₹
            </span>
            <input
              type="text"
              inputMode="numeric"
              id="brokeragePerBooking"
              name="brokeragePerBooking"
              value={formData.brokeragePerBooking}
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9,]/g, '');
                handleChange('brokeragePerBooking', val);
              }}
              onBlur={() => handleBlur('brokeragePerBooking')}
              placeholder="e.g. 1,50,000"
              className="w-full px-5 py-5 bg-white text-lg sm:text-xl text-[#10233D] placeholder:text-slate-400 focus:outline-none"
            />
          </div>
          {errors.brokeragePerBooking && touched.brokeragePerBooking && (
            <p className="text-base text-red-600 mt-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              <span>{errors.brokeragePerBooking}</span>
            </p>
          )}
        </div>

        {/* Consent Checkbox */}
        <div className="pt-4">
          <label className="flex items-start gap-4 cursor-pointer select-none">
            <input
              type="checkbox"
              id="consent"
              name="consent"
              checked={formData.consent}
              onChange={(e) => handleChange('consent', e.target.checked)}
              onBlur={() => handleBlur('consent')}
              className="w-7 h-7 mt-0.5 rounded border-slate-300 text-[#10233D] focus:ring-[#E7C579] cursor-pointer"
            />
            <span className="text-lg sm:text-sm text-slate-600 leading-relaxed">
              I agree to be contacted by Shakktii AI regarding my assessment and related services.
            </span>
          </label>
          {errors.consent && touched.consent && (
            <p className="text-base text-red-600 mt-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              <span>{errors.consent}</span>
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-5">
          <button
            type="button"
            onClick={onBack}
            disabled={isSubmitting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-5 rounded-xl text-lg sm:text-lg font-medium text-slate-600 hover:text-[#10233D] hover:bg-slate-100 active:scale-98 cursor-pointer min-h-[56px] sm:min-h-[60px]"
          >
            <ArrowLeft className="w-6 h-6" />
            <span>Back to Questions</span>
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-6 rounded-xl text-lg sm:text-lg font-bold bg-[#10233D] text-[#E7C579] hover:bg-[#142E55] active:scale-98 shadow-xl hover:shadow-2xl transition-all cursor-pointer min-h-[64px] sm:min-h-[68px]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-7 h-7 animate-spin text-[#E7C579]" />
                <span>Analyzing Responses...</span>
              </>
            ) : (
              <>
                <span>Show Me How to Stop Lead Leakage &amp; Build My Own Website System</span>
                <ArrowRight className="w-6 h-6" />
              </>
            )}
          </button>
        </div>

        <div className="flex items-center justify-center gap-3 text-base sm:text-base text-slate-500 text-center">
          <Lock className="w-6 h-6" />
          <span>Strict Privacy · Zero Spam Guarantee · Never Shared With Competitors</span>
        </div>
      </form>
    </div>
  );
}
