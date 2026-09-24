'use client';

import React from 'react';
import {
  X,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  TrendingDown,
  PhoneCall,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

export default function ResultsModal({
  isOpen,
  onClose,
  analysis,
  formData = {},
  onRetake,
}) {
  if (!isOpen || !analysis) return null;

  const isHighRisk = analysis.riskLevel === 'high';
  const isModerateRisk = analysis.riskLevel === 'moderate';

  const getRiskColor = () => {
    if (isHighRisk) return 'text-red-600 bg-red-50 border-red-200';
    if (isModerateRisk) return 'text-amber-700 bg-amber-50 border-amber-200';
    return 'text-emerald-700 bg-emerald-50 border-emerald-200';
  };

  const riskPercentage = Math.round((analysis.totalScore / (analysis.maxScore || 18)) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">

        {/* Modal Header */}
        <div className="bg-[#0B2B68] text-white p-6 sm:p-8 relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 text-xs font-semibold mb-3 border border-blue-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Audit Diagnostic Report Generated</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
            Lead Leakage Assessment for {formData.firmName || 'Your Firm'}
          </h2>
          <p className="text-xs sm:text-sm text-blue-100">
            Target Focus Area: <span className="font-semibold text-white">{formData.microMarket || 'Local Micro-Market'}</span> · Report delivered to WhatsApp (+91 {formData.whatsappNumber})
          </p>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">

          {/* Score & Risk Summary Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Risk Badge */}
            <div className={`p-5 rounded-2xl border ${getRiskColor()} flex flex-col justify-between`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Overall Risk Status</span>
                {isHighRisk ? (
                  <ShieldAlert className="w-6 h-6 text-red-600" />
                ) : (
                  <ShieldCheck className="w-6 h-6 text-emerald-600" />
                )}
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold capitalize">{analysis.statusLabel || `${analysis.riskLevel} Risk`}</span>
                <p className="text-xs mt-1 font-medium opacity-90">
                  {riskPercentage}% estimated lead leakage vulnerability across your channels.
                </p>
              </div>
            </div>

            {/* Estimated Financial Leakage */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Estimated Brokerage Leakage</span>
                <TrendingDown className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#0B2B68]">
                  ₹12 Lakhs - ₹35 Lakhs / yr
                </span>
                <p className="text-xs text-slate-600 mt-1">
                  Estimated annual brokerage lost to competitor brokers intercepting diverted buyers.
                </p>
              </div>
            </div>

          </div>

          {/* Key Vulnerability Findings */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-3">
              Key Leakage Channels Identified
            </h3>
            <div className="space-y-2.5">
              {analysis.leakageAreas && analysis.leakageAreas.length > 0 ? (
                analysis.leakageAreas.map((area, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#1E60E8] shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold text-slate-900">{area.name}: </strong>
                      <span>{area.description}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 rounded-xl bg-slate-50 text-xs text-slate-600">
                  Shared portal dependency and generic PDF brochures are currently diverting high-intent buyers away from your firm.
                </div>
              )}
            </div>
          </div>

          {/* Action Plan & Recommendations */}
          <div className="p-5 rounded-2xl bg-blue-50/80 border border-blue-200 text-slate-800">
            <h4 className="text-sm font-bold text-[#0B2B68] mb-1.5 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#1E60E8]" />
              Recommended 3-Step Strategy
            </h4>
            <ul className="text-xs sm:text-sm space-y-2.5 mt-3 text-slate-700">
              {analysis.recommendations && analysis.recommendations.length > 0 ? (
                analysis.recommendations.slice(0, 3).map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#1E60E8] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div>
                      <strong>{rec.title}: </strong>
                      <span>{rec.description}</span>
                    </div>
                  </li>
                ))
              ) : (
                <>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#1E60E8] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                      1
                    </span>
                    <span><strong>Launch Micro-Market Website:</strong> Create an exclusive property catalog for {formData.microMarket || 'your area'} to contain 100% of your buyer traffic.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#1E60E8] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                      2
                    </span>
                    <span><strong>Reactivate Old Leads:</strong> Broadcast dedicated project links on WhatsApp with tracking triggers.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#1E60E8] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                      3
                    </span>
                    <span><strong>Hyperlocal SEO:</strong> Rank on Google for local project searches to generate 4–5 daily organic buyer leads at zero ad cost.</span>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* CTA Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={onRetake}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Diagnostic</span>
            </button>

            <a
              href={`https://wa.me/+918446078867?text=${encodeURIComponent(
                `Hi Shakktii AI, I completed the Lead Protection Audit for ${formData.firmName || 'my real estate firm'}. I want to discuss building our owned website system.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#1E60E8] hover:bg-[#1550c7] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Book Strategy Call on WhatsApp</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
