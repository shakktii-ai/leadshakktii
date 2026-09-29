'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  X,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  TrendingDown,
  PhoneCall,
  RotateCcw,
  Sparkles,
  ChevronDown,
  Copy,
  Check,
  ExternalLink,
  Layers,
  ArrowUpRight,
  HelpCircle,
  BarChart3,
} from 'lucide-react';

export default function ResultsModal({
  isOpen,
  onClose,
  analysis,
  formData = {},
  reportId = '',
  onRetake,
}) {
  const [expandedLeakage, setExpandedLeakage] = useState({ 0: true });
  const [expandedRecs, setExpandedRecs] = useState({ 0: true });
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen || !analysis) return null;

  const currentReportId = reportId || analysis.reportId || analysis.leadId || 'RPT-PREVIEW';
  const totalScore = analysis.totalScore ?? 0;
  const maxScore = 50;
  const riskPercentage = Math.round((totalScore / maxScore) * 100);

  const isHighRisk = totalScore >= 34;
  const isModerateRisk = totalScore >= 17 && totalScore < 34;

  const getRiskBadge = () => {
    if (isHighRisk) {
      return {
        bg: 'bg-rose-50 text-rose-800 border-rose-200',
        ring: 'text-rose-600 stroke-rose-500',
        icon: <ShieldAlert className="w-5 h-5 text-rose-600" />,
        label: 'High Risk Profile · Several Areas Need Attention',
        status: 'Critical Lead Leakage',
      };
    }
    if (isModerateRisk) {
      return {
        bg: 'bg-amber-50 text-amber-900 border-amber-200',
        ring: 'text-amber-600 stroke-amber-500',
        icon: <AlertTriangle className="w-5 h-5 text-amber-600" />,
        label: 'Moderate Risk · Opportunities to Improve',
        status: 'Active Revenue Leakage',
      };
    }
    return {
      bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      ring: 'text-emerald-600 stroke-emerald-500',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
      label: 'Low Risk · Digital Foundations in Place',
      status: 'Optimal Protection',
    };
  };

  const riskBadge = getRiskBadge();

  // SVG Gauge calculations
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (riskPercentage / 100) * circumference;

  const toggleLeakage = (idx) => {
    setExpandedLeakage((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const toggleRec = (idx) => {
    setExpandedRecs((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const handleCopyReportId = () => {
    if (typeof window !== 'undefined' && currentReportId) {
      const url = `${window.location.origin}/report/${currentReportId}`;
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const whatsappMessage = `Hi Shakktii AI, I completed the Lead Protection Audit for ${formData.firmName || 'my real estate firm'}. My Report ID is ${currentReportId}. Send my report.`;
  const whatsappUrl = `https://wa.me/+918446078867?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-6 sm:my-8">

        {/* Modal Header */}
        <div className="bg-[#0B2B68] text-white p-5 sm:p-7 relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-2.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/30 text-blue-100 text-[11px] font-semibold border border-blue-400/40 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>Shakktii AI Real Estate Growth Diagnostic</span>
            </div>

            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10 text-white/90 text-[11px] font-mono font-medium">
              ID: {currentReportId}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white mb-1.5 leading-tight">
            {analysis.summaryHeadline || `Lead Protection Assessment for ${formData.firmName || 'Your Agency'}`}
          </h2>

          <p className="text-xs sm:text-sm text-blue-100/90">
            Target Focus: <strong className="text-white">{formData.microMarket || 'Local Micro-Market'}</strong> · Advisor: <strong className="text-white">{formData.fullName || 'Broker'}</strong>
          </p>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-7 space-y-6 max-h-[75vh] overflow-y-auto">

          {/* AI Executive Strategy Takeaway */}
          {analysis.aiExecutiveAdvice && (
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50/60 to-blue-50 border border-blue-200/80 text-blue-950 flex items-start gap-3.5 shadow-2xs">
              <div className="w-9 h-9 rounded-xl bg-[#0B2B68] text-[#E7C579] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#0B2B68] block mb-1">
                  AI Strategic Takeaway for {formData.firmName || 'Your Agency'}
                </span>
                <p className="text-xs sm:text-sm font-medium leading-relaxed text-slate-800">
                  {analysis.aiExecutiveAdvice}
                </p>
              </div>
            </div>
          )}

          {/* Score Donut Gauge & Dynamic Leakage Cards */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
            
            {/* Circular Score Gauge Card (7 Cols) */}
            <div className="md:col-span-7 p-5 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row items-center gap-5 justify-between">
              
              {/* Circular SVG Gauge */}
              <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {/* Background Track */}
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    className="stroke-stone-200"
                    strokeWidth="9"
                    fill="transparent"
                  />
                  {/* Active Progress Ring */}
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    className={`transition-all duration-1000 ease-out ${riskBadge.ring}`}
                    strokeWidth="9"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>

                {/* Score Text in Center */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none">
                  <span className="text-2xl sm:text-3xl font-extrabold text-stone-900 leading-none">
                    {totalScore}
                  </span>
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mt-0.5">
                    / {maxScore} pts
                  </span>
                </div>
              </div>

              {/* Status Details */}
              <div className="flex-1 text-center sm:text-left">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                  Lead Protection Status
                </span>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-bold mb-1.5 shadow-2xs bg-white">
                  {riskBadge.icon}
                  <span>{analysis.statusLabel || riskBadge.status}</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed font-medium">
                  {riskPercentage}% vulnerability index based on your evaluated channel workflows.
                </p>
              </div>

            </div>

            {/* Dynamic Estimated Leakage Card (5 Cols) */}
            <div className="md:col-span-5 p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-rose-500/10 to-amber-500/5 border border-amber-200/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900">
                    Estimated Leakage
                  </span>
                  <TrendingDown className="w-5 h-5 text-rose-600" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#0B2B68] leading-tight">
                  {analysis.estimatedLeakage || '₹18 Lakhs - ₹38 Lakhs / yr'}
                </div>
                {analysis.estimatedMonthlyLeakage && (
                  <span className="text-xs font-semibold text-rose-700 block mt-0.5">
                    ~ {analysis.estimatedMonthlyLeakage}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-stone-600 mt-2 leading-relaxed">
                Brokerage revenue lost to competing brokers intercepting non-exclusive buyer traffic.
              </p>
            </div>

          </div>

          {/* Operational & Economics Baseline */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-3">
              Your Firm's Portal &amp; Commission Economics
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-100">
                <span className="text-[10px] uppercase font-bold text-stone-400 block">Monthly Portal Spend</span>
                <span className="text-sm sm:text-base font-extrabold text-[#0B2B68] block mt-0.5">
                  {(() => {
                    const val = formData.monthlyPortalSpend || analysis.leakageMetrics?.portalSpendFormatted || analysis.formData?.monthlyPortalSpend;
                    if (!val) return '—';
                    const s = String(val).trim();
                    return s.startsWith('₹') ? s : `₹${s}`;
                  })()}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-100">
                <span className="text-[10px] uppercase font-bold text-stone-400 block">Buyer Leads / Month</span>
                <span className="text-sm sm:text-base font-extrabold text-stone-900 block mt-0.5">
                  {(() => {
                    const val = formData.monthlyBuyerLeads || analysis.leakageMetrics?.buyerLeadsMonthly || analysis.formData?.monthlyBuyerLeads;
                    if (!val) return '—';
                    const s = String(val).trim();
                    return s.toLowerCase().includes('lead') ? s : `${s} leads`;
                  })()}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-100">
                <span className="text-[10px] uppercase font-bold text-stone-400 block">Avg Cost / Lead (CPL)</span>
                <span className="text-sm sm:text-base font-extrabold text-amber-700 block mt-0.5">
                  {analysis.leakageMetrics?.costPerLeadFormatted ||
                    (analysis.leakageMetrics?.costPerLead ? `₹${analysis.leakageMetrics.costPerLead.toLocaleString('en-IN')}` : '—')}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-100">
                <span className="text-[10px] uppercase font-bold text-stone-400 block">Avg Brokerage / Deal</span>
                <span className="text-sm sm:text-base font-extrabold text-emerald-700 block mt-0.5">
                  {(() => {
                    const val = formData.brokeragePerBooking || analysis.leakageMetrics?.brokerageFormatted || analysis.formData?.brokeragePerBooking;
                    if (!val) return '—';
                    const s = String(val).trim();
                    return s.startsWith('₹') ? s : `₹${s}`;
                  })()}
                </span>
              </div>
            </div>
          </div>

          {/* Assessment Narrative */}
          {analysis.summaryText && (
            <div className="p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200/90 text-stone-700 text-xs sm:text-sm leading-relaxed font-medium">
              <p>{analysis.summaryText}</p>
            </div>
          )}

          {/* EXPANDABLE SECTION 1: Vulnerability Diagnostics */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-stone-700 flex items-center gap-2">
                <Layers className="w-4 h-4 text-brand-primary" />
                <span>Micro-Market Vulnerability Diagnostics (Click to Expand)</span>
              </h3>
              <span className="text-[11px] text-stone-400 font-medium">
                4 Core Channels
              </span>
            </div>

            <div className="space-y-2.5">
              {analysis.leakageAreas && analysis.leakageAreas.map((area, idx) => {
                const isExpanded = !!expandedLeakage[idx];
                const isCrit = area.severity === 'critical';
                const isMod = area.severity === 'moderate';

                return (
                  <div
                    key={area.id || idx}
                    className="rounded-2xl border border-stone-200 bg-white overflow-hidden shadow-2xs transition-all"
                  >
                    {/* Expandable Header */}
                    <button
                      type="button"
                      onClick={() => toggleLeakage(idx)}
                      className="w-full text-left p-4 flex items-center justify-between gap-3 hover:bg-stone-50/80 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                            isCrit ? 'bg-rose-500' : isMod ? 'bg-amber-500' : 'bg-emerald-500'
                          }`}
                        />
                        <div className="min-w-0">
                          <span className="font-bold text-xs sm:text-sm text-stone-900 block truncate">
                            {area.name}
                          </span>
                          <span className="text-[11px] text-stone-500 font-medium line-clamp-1">
                            {area.description}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span
                          className={`text-[10px] uppercase font-extrabold px-2.5 py-0.5 rounded-full ${
                            isCrit
                              ? 'bg-rose-100 text-rose-800'
                              : isMod
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {area.severity}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-stone-400 transition-transform duration-200 ${
                            isExpanded ? 'transform rotate-180 text-stone-800' : ''
                          }`}
                        />
                      </div>
                    </button>

                    {/* Detailed Expanded Content */}
                    {isExpanded && (
                      <div className="px-4 pb-4 pt-1 bg-stone-50/60 border-t border-stone-100 text-xs sm:text-sm space-y-3 animate-in fade-in duration-150">
                        {area.whatItMeans && (
                          <div>
                            <strong className="text-stone-800 block font-semibold text-[11px] uppercase tracking-wider mb-0.5">
                              What this issue means:
                            </strong>
                            <p className="text-stone-600 leading-relaxed">{area.whatItMeans}</p>
                          </div>
                        )}

                        {area.whyItMatters && (
                          <div>
                            <strong className="text-stone-800 block font-semibold text-[11px] uppercase tracking-wider mb-0.5">
                              Why it matters to your firm:
                            </strong>
                            <p className="text-stone-600 leading-relaxed">{area.whyItMatters}</p>
                          </div>
                        )}

                        {area.businessImpact && (
                          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-950 font-medium">
                            ⚡ <strong>Business Impact:</strong> {area.businessImpact}
                          </div>
                        )}

                        {area.recommendation && (
                          <div className="p-3 rounded-xl bg-blue-50 border border-blue-200/80 text-blue-950 font-medium">
                            💡 <strong>Recommended Action:</strong> {area.recommendation}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* EXPANDABLE SECTION 2: Recommended 3-Step Strategy */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-stone-700 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-accent" />
                <span>Tailored Action Plan (Click to Expand)</span>
              </h3>
              <span className="text-[11px] text-stone-400 font-medium">
                Target: {analysis.goalQuarter || 'Immediate ROI'}
              </span>
            </div>

            <div className="space-y-2.5">
              {analysis.recommendations && analysis.recommendations.map((rec, idx) => {
                const isExpanded = !!expandedRecs[idx];

                return (
                  <div
                    key={rec.id || idx}
                    className="rounded-2xl border border-stone-200 bg-white overflow-hidden shadow-2xs transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => toggleRec(idx)}
                      className="w-full text-left p-4 flex items-center justify-between gap-3 hover:bg-stone-50/80 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="w-6 h-6 rounded-full bg-[#0B2B68] text-[#E7C579] flex items-center justify-center text-xs font-bold shrink-0">
                          {idx + 1}
                        </span>
                        <div className="min-w-0">
                          <span className="font-bold text-xs sm:text-sm text-stone-900 block truncate">
                            {rec.title}
                          </span>
                          <span className="text-[11px] text-stone-500 font-medium line-clamp-1">
                            {rec.description}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-stone-100 text-stone-700 border border-stone-200">
                          {rec.urgency || 'Immediate'}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-stone-400 transition-transform duration-200 ${
                            isExpanded ? 'transform rotate-180 text-stone-800' : ''
                          }`}
                        />
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="px-4 pb-4 pt-1 bg-blue-50/40 border-t border-blue-100 text-xs sm:text-sm space-y-2.5 animate-in fade-in duration-150">
                        <p className="text-stone-700 leading-relaxed font-medium">
                          {rec.description}
                        </p>

                        {rec.impact && (
                          <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 font-semibold text-xs flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>Expected Result: {rec.impact}</span>
                          </div>
                        )}

                        {rec.timeline && (
                          <span className="text-[11px] text-stone-500 block font-medium">
                            ⏱️ Deployment Timeline: {rec.timeline}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* VISUAL GRAPHIC: Rented Portal vs Owned Website Model */}
          <div className="p-4 sm:p-5 rounded-2xl bg-stone-900 text-white space-y-3 shadow-md">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block">
              Strategic Model Comparison
            </span>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                <span className="text-rose-400 font-bold block">❌ Rented Portal Model:</span>
                <ul className="space-y-1 text-stone-300">
                  <li>• Same buyer lead sold to 4–5 brokers</li>
                  <li>• Monthly recurring recharge costs</li>
                  <li>• Zero compounding brand asset</li>
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-white/10 border border-emerald-400/30 space-y-1.5">
                <span className="text-emerald-400 font-bold block">✅ Owned Website System:</span>
                <ul className="space-y-1 text-stone-200">
                  <li>• 100% exclusive buyer inquiries</li>
                  <li>• Automatic click-tracking & CRM monetization</li>
                  <li>• 4–5 daily organic leads on Google SEO</li>
                </ul>
              </div>
            </div>
          </div>

          {/* REPORT SHARING & ACTIONS BAR */}
          <div className="pt-2 border-t border-stone-200 space-y-3">
            
            {/* Report URL & Copy Tool */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-stone-100 border border-stone-200 text-xs">
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-bold text-stone-600">Report Link:</span>
                <span className="font-mono text-stone-800 truncate max-w-[200px] sm:max-w-xs">
                  /report/{currentReportId}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyReportId}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-stone-700 hover:text-stone-900 font-bold border border-stone-200 shadow-2xs cursor-pointer transition-colors"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Link Copied!' : 'Copy Link'}</span>
                </button>

                <Link
                  href={`/report/${currentReportId}`}
                  target="_blank"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#0B2B68] text-white font-bold hover:bg-[#1550c7] shadow-2xs transition-colors"
                >
                  <span>Open Full View</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Main Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
              <button
                type="button"
                onClick={onRetake}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-semibold text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Diagnostic</span>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs sm:text-sm font-bold shadow-lg transition-all animate-button-blink cursor-pointer"
              >
                <PhoneCall className="w-4 h-4 animate-bounce" />
                <span>Send My Report on WhatsApp</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

