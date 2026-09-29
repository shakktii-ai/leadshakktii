'use client';

import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  Calendar,
  CheckCircle2,
  Printer,
  ExternalLink,
  ArrowRight,
  Sparkles,
  Building2,
  MapPin,
  HelpCircle,
} from 'lucide-react';

export default function ResultsView({
  analysis,
  formData = {},
  onRetake,
  bookingUrl = '',
}) {
  const [showBookingModal, setShowBookingModal] = useState(false);

  const getScoreBadge = () => {
    switch (analysis.riskLevel) {
      case 'low':
        return {
          color: 'bg-emerald-50 text-emerald-800 border-emerald-300',
          icon: <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />,
          progressColor: 'bg-emerald-500',
          label: 'Digital Foundations in Place',
          tagline: 'Low Risk Profile · High Market Insulation',
        };
      case 'moderate':
        return {
          color: 'bg-amber-50 text-amber-800 border-amber-300',
          icon: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />,
          progressColor: 'bg-amber-500',
          label: 'Some Opportunities to Improve',
          tagline: 'Moderate Risk · Active Revenue Leakage',
        };
      case 'high':
      default:
        return {
          color: 'bg-rose-50 text-rose-800 border-rose-300',
          icon: <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0" />,
          progressColor: 'bg-rose-500',
          label: 'Several Areas Need Attention',
          tagline: 'High Risk · Critical Portal & Broker Leakage',
        };
    }
  };

  const badge = getScoreBadge();
  const scorePercent = Math.round((analysis.totalScore / analysis.maxScore) * 100);

  const handlePrint = () => {
    window.print();
  };

  const handleBookingClick = () => {
    if (bookingUrl && bookingUrl.trim().length > 0) {
      window.open(bookingUrl, '_blank', 'noopener,noreferrer');
    } else {
      setShowBookingModal(true);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-xl shadow-[#10233D]/5 border border-[#142E55]/10 overflow-hidden print-page">
      {/* Report Header */}
      <div className="bg-[#10233D] p-6 sm:p-8 lg:p-10 text-white relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-6">
          <div>
            <span className="px-3 py-1 rounded-full bg-[#E7C579]/20 text-[#E7C579] text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-1.5 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Personalized Micro-Market Audit</span>
            </span>
            <h1 className="font-serif-heading text-2xl sm:text-4xl text-white font-normal">
              Your Lead Protection Status
            </h1>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xs text-slate-300 block">Assessment Completed</span>
            <span className="text-sm font-semibold text-[#E7C579]">10 of 10 Questions Evaluated</span>
          </div>
        </div>

        {/* Personalized Candidate Metadata */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white/5 border border-white/10 rounded-xl p-4 text-xs sm:text-sm">
          <div>
            <span className="text-slate-400 block text-[11px] uppercase">Real Estate Firm</span>
            <strong className="text-white font-medium text-sm sm:text-base flex items-center gap-1.5 mt-0.5">
              <Building2 className="w-4 h-4 text-[#E7C579] shrink-0" />
              <span className="truncate">{formData.firmName || 'Proprietary Broker'}</span>
            </strong>
          </div>

          <div>
            <span className="text-slate-400 block text-[11px] uppercase">Focus Micro-Market</span>
            <strong className="text-white font-medium text-sm sm:text-base flex items-center gap-1.5 mt-0.5">
              <MapPin className="w-4 h-4 text-[#E7C579] shrink-0" />
              <span className="truncate">{formData.microMarket || 'Local Micro-Market'}</span>
            </strong>
          </div>

          <div>
            <span className="text-slate-400 block text-[11px] uppercase">Advisor</span>
            <strong className="text-white font-medium text-sm sm:text-base flex items-center gap-1.5 mt-0.5">
              <span className="truncate">{formData.fullName || 'Valued Broker'}</span>
            </strong>
          </div>
        </div>
      </div>

      {/* Main Score & Risk Overview */}
      <div className="p-6 sm:p-8 lg:p-10 space-y-8">
        {/* Score Gauge Card */}
        <div className="bg-[#F8F7F3] rounded-2xl p-6 sm:p-8 border border-[#142E55]/10">
          <div className="flex flex-col md:flex-row items-center gap-6 lg:gap-10">
            {/* Score Numerical Badge */}
            <div className="flex flex-col items-center justify-center shrink-0 w-36 h-36 rounded-2xl bg-white border-2 border-[#10233D]/10 shadow-sm p-4 text-center">
              <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                Risk Score
              </span>
              <div className="flex items-baseline justify-center gap-1 my-1">
                <span className="font-serif-heading text-4xl sm:text-5xl font-bold text-[#10233D]">
                  {analysis.totalScore}
                </span>
                <span className="text-sm text-slate-400 font-medium">/{analysis.maxScore}</span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium">Points</span>
            </div>

            {/* Score Status Label & Description */}
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border font-semibold text-sm mb-3 shadow-xs bg-white">
                {badge.icon}
                <span className="text-[#10233D] font-bold">{analysis.statusLabel}</span>
              </div>

              <h2 className="font-serif-heading text-xl sm:text-2xl text-[#10233D] font-normal mb-2 leading-tight">
                {analysis.summaryHeadline}
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {analysis.summaryText}
              </p>
            </div>
          </div>

          {/* Linear Score Bar with Legend */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <div className="flex justify-between text-xs font-semibold text-slate-500 mb-2">
              <span>0 (Optimal Protection)</span>
              <span>{analysis.maxScore || 50} (Maximum Risk)</span>
            </div>
            <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden relative">
              <div
                className={`h-full rounded-full transition-all duration-700 ${badge.progressColor}`}
                style={{ width: `${Math.max(8, scorePercent)}%` }}
              />
            </div>
            <div className="grid grid-cols-3 text-center text-[11px] text-slate-500 mt-2">
              <div className="text-left font-medium text-emerald-700">0–16: Low Risk</div>
              <div className="text-center font-medium text-amber-700">17–33: Moderate Risk</div>
              <div className="text-right font-medium text-rose-700">34–50: High Risk</div>
            </div>
          </div>
        </div>

        {/* Breakdown of 4 Core Leakage Channels */}
        <div>
          <h3 className="font-serif-heading text-xl text-[#10233D] font-normal mb-4">
            Micro-Market Vulnerability Diagnostics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analysis.leakageAreas.map((area) => {
              const isCrit = area.severity === 'critical';
              const isMod = area.severity === 'moderate';
              return (
                <div
                  key={area.name}
                  className="p-4 sm:p-5 rounded-xl border bg-white shadow-xs flex flex-col justify-between"
                  style={{
                    borderColor: isCrit ? '#FDA4AF' : isMod ? '#FDE68A' : '#A7F3D0',
                    backgroundColor: isCrit ? '#FFF1F2' : isMod ? '#FFFBEB' : '#F0FDF4',
                  }}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-bold text-sm text-[#10233D]">{area.name}</span>
                    <span
                      className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-md ${
                        isCrit
                          ? 'bg-rose-200 text-rose-800'
                          : isMod
                          ? 'bg-amber-200 text-amber-900'
                          : 'bg-emerald-200 text-emerald-800'
                      }`}
                    >
                      {area.severity}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {area.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3 Strategic Recommendations */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif-heading text-xl text-[#10233D] font-normal">
              Recommended Action Plan for {formData.firmName || 'Your Agency'}
            </h3>
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">
              Target Goal: {analysis.goalQuarter}
            </span>
          </div>

          <div className="space-y-3.5">
            {analysis.recommendations.map((rec, index) => (
              <div
                key={rec.title}
                className="p-5 rounded-xl bg-white border border-slate-200 hover:border-[#10233D]/30 transition-all shadow-xs"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-[#10233D] text-[#E7C579] flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                      <h4 className="font-bold text-base text-[#10233D]">{rec.title}</h4>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#F8F7F3] border border-slate-200 text-slate-700">
                        {rec.urgency}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-2.5">
                      {rec.description}
                    </p>
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#142E55] bg-[#F8F7F3] px-3 py-1 rounded-md">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#E7C579] shrink-0" />
                      <span>Impact: {rec.impact}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mandatory Regulatory & Informational Disclaimer */}
        <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-xs text-slate-500 leading-relaxed">
          <p className="font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-slate-400" />
            <span>Directional Self-Assessment Notice:</span>
          </p>
          This report is a directional self-assessment calculated from your operational inputs. It is designed to illustrate digital channel vulnerabilities and lead protection strategies. It does not constitute a formal financial audit, verified brokerage balance sheet review, or a legally binding guarantee of sales conversion.
        </div>

        {/* Primary Action Buttons */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 no-print">
          <button
            type="button"
            onClick={onRetake}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-50 active:scale-98 cursor-pointer min-h-[46px]"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake Assessment</span>
          </button>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-300 text-sm font-medium text-slate-700 hover:bg-slate-50 cursor-pointer min-h-[46px]"
              title="Print or Save PDF"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print Report</span>
            </button>

            <button
              type="button"
              onClick={handleBookingClick}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-[#E7C579] to-[#d6b365] text-[#10233D] font-bold text-sm sm:text-base shadow-md hover:brightness-105 active:scale-98 cursor-pointer min-h-[48px]"
            >
              <Calendar className="w-4 h-4" />
              <span>Book a 1-on-1 Strategy Call</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Strategy Call Booking / Configuration Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#142E55]/20 text-[#10233D] relative">
            <h3 className="font-serif-heading text-2xl text-[#10233D] font-normal mb-2">
              Book Your 1-on-1 Real Estate Strategy Call
            </h3>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              We will review your micro-market score for <strong>{formData.firmName || 'your agency'}</strong> and design a tailored website architecture plan.
            </p>

            <div className="bg-[#F8F7F3] p-4 rounded-xl border border-slate-200 mb-6 space-y-2 text-xs sm:text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Advisory Focus:</span>
                <span className="font-semibold text-[#10233D]">{formData.microMarket || 'Local Micro-Market'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Contact Number:</span>
                <span className="font-semibold text-[#10233D]">+91 {formData.whatsappNumber || 'Your Phone'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Session Duration:</span>
                <span className="font-semibold text-[#10233D]">30 Minutes (Zoom / Google Meet)</span>
              </div>
            </div>

            <div className="space-y-3">
              <a
                href={`https://wa.me/918446078867?text=${encodeURIComponent(
                  `Hi Shakktii AI, I just completed the Lead Protection Audit for ${formData.firmName} (${formData.microMarket}). My score is ${analysis.totalScore}/${analysis.maxScore || 50}. I would like to schedule our strategy call.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#25D366] text-white font-bold text-sm shadow-md hover:brightness-105 active:scale-98 animate-button-blink"
              >
                <span>Confirm Session on WhatsApp</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={() => setShowBookingModal(false)}
                className="w-full py-2.5 text-xs text-slate-500 hover:text-slate-800 font-medium"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
