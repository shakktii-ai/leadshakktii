'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
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
  TrendingDown,
  Layers,
  PhoneCall,
  ChevronDown,
  Copy,
  Check,
  Share2,
  ArrowLeft,
  Loader2,
} from 'lucide-react';

export default function StandaloneReportPage() {
  const params = useParams();
  const router = useRouter();
  const reportId = params?.id;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [auditData, setAuditData] = useState(null);
  const [expandedLeakage, setExpandedLeakage] = useState({ 0: true, 1: false });
  const [expandedRecs, setExpandedRecs] = useState({ 0: true });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!reportId) return;

    const fetchReport = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`/api/report?id=${encodeURIComponent(reportId)}`);
        const data = await res.json();

        if (res.ok && data.success && data.report) {
          setAuditData(data.report);
        } else {
          setError(data.error || 'Diagnostic report could not be found.');
        }
      } catch (err) {
        console.error('Error fetching report:', err);
        setError('Network error loading diagnostic report.');
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [reportId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 flex items-center justify-center mb-4 text-brand-primary animate-pulse">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
        <h2 className="text-xl font-bold text-stone-900">Loading Diagnostic Report...</h2>
        <p className="text-sm text-stone-500 mt-1">Retrieving verified micro-market analysis data</p>
      </div>
    );
  }

  if (error || !auditData) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-stone-200 shadow-xl space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-stone-900">Report Not Found</h2>
          <p className="text-sm text-stone-600">
            {error || 'The requested diagnostic report ID does not exist or has expired.'}
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-primary text-white font-bold text-sm shadow-md hover:bg-brand-secondary transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Take Free Lead Audit</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const analysis = auditData.analysis || {};
  const formData = auditData.formData || {};
  const totalScore = analysis.totalScore ?? auditData.score ?? 0;
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

  // SVG Gauge Calculations
  const radius = 46;
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

  const handleCopy = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const whatsappMessage = `Hi Shakktii AI, I am reviewing my Lead Protection Audit for ${formData.firmName || auditData.firmName}. My Report ID is ${reportId}. Send my report.`;
  const whatsappUrl = `https://wa.me/+918446078867?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 sm:py-12 px-3 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Top Floating Bar for Navigation and Share */}
        <div className="flex items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-stone-200 shadow-xs no-print">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-stone-600 hover:text-stone-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Audit Form</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Link'}</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print Report</span>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold shadow-xs transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Main Report Document Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-stone-200/60 border border-stone-200 overflow-hidden print-page">

          {/* Report Header */}
          <div className="bg-[#0B2B68] text-white p-6 sm:p-10 relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-6">
              <div>
                <span className="px-3 py-1 rounded-full bg-blue-500/30 text-blue-100 text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-1.5 mb-2.5 border border-blue-400/30">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                  <span>Shakktii AI Real Estate Growth Diagnostic</span>
                </span>
                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                  Lead Leakage &amp; Protection Audit
                </h1>
              </div>

              <div className="text-left sm:text-right bg-white/10 sm:bg-transparent p-3 sm:p-0 rounded-xl">
                <span className="text-xs text-blue-200 block font-medium">Report Reference ID</span>
                <span className="text-sm sm:text-base font-mono font-bold text-[#E7C579]">
                  {reportId}
                </span>
                <span className="text-[11px] text-blue-200/80 block mt-0.5">
                  Evaluated on 50-Point Standard
                </span>
              </div>
            </div>

            {/* Candidate Real Estate Firm Metadata */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 text-xs sm:text-sm">
              <div>
                <span className="text-blue-200/70 block text-[11px] uppercase font-semibold">Real Estate Firm</span>
                <strong className="text-white font-bold text-sm sm:text-base flex items-center gap-1.5 mt-0.5">
                  <Building2 className="w-4 h-4 text-[#E7C579] shrink-0" />
                  <span className="truncate">{formData.firmName || auditData.firmName || 'Proprietary Agency'}</span>
                </strong>
              </div>

              <div>
                <span className="text-blue-200/70 block text-[11px] uppercase font-semibold">Focus Micro-Market</span>
                <strong className="text-white font-bold text-sm sm:text-base flex items-center gap-1.5 mt-0.5">
                  <MapPin className="w-4 h-4 text-[#E7C579] shrink-0" />
                  <span className="truncate">{formData.microMarket || auditData.microMarket || 'Local Micro-Market'}</span>
                </strong>
              </div>

              <div>
                <span className="text-blue-200/70 block text-[11px] uppercase font-semibold">Advisor</span>
                <strong className="text-white font-bold text-sm sm:text-base flex items-center gap-1.5 mt-0.5">
                  <span className="truncate">{formData.fullName || auditData.fullName || 'Advisor'}</span>
                </strong>
              </div>
            </div>
          </div>

          {/* Report Body */}
          <div className="p-6 sm:p-10 space-y-8">

            {/* AI Executive Strategy Takeaway */}
            {analysis.aiExecutiveAdvice && (
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50/70 to-blue-50 border border-blue-200/90 text-blue-950 flex items-start gap-4 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-[#0B2B68] text-[#E7C579] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#0B2B68] block mb-1">
                    AI Strategic Takeaway for {formData.firmName || auditData.firmName || 'Your Agency'}
                  </span>
                  <p className="text-sm sm:text-base font-medium leading-relaxed text-slate-800">
                    {analysis.aiExecutiveAdvice}
                  </p>
                </div>
              </div>
            )}

            {/* Score Donut Gauge & Dynamic Estimated Leakage */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
              
              {/* Donut Gauge (7 Cols) */}
              <div className="md:col-span-7 p-6 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row items-center gap-6 justify-between">
                
                {/* Circular SVG Gauge */}
                <div className="relative w-32 h-32 shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 110 110">
                    {/* Background Track */}
                    <circle
                      cx="55"
                      cy="55"
                      r={radius}
                      className="stroke-stone-200"
                      strokeWidth="10"
                      fill="transparent"
                    />
                    {/* Active Progress Ring */}
                    <circle
                      cx="55"
                      cy="55"
                      r={radius}
                      className={`transition-all duration-1000 ease-out ${riskBadge.ring}`}
                      strokeWidth="10"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      fill="transparent"
                    />
                  </svg>

                  {/* Center Score */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none">
                    <span className="text-3xl sm:text-4xl font-extrabold text-stone-900 leading-none">
                      {totalScore}
                    </span>
                    <span className="text-xs font-bold text-stone-400 uppercase tracking-wider mt-0.5">
                      / {maxScore} pts
                    </span>
                  </div>
                </div>

                {/* Score Meta */}
                <div className="flex-1 text-center sm:text-left">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-1">
                    Risk Classification
                  </span>
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border text-sm font-bold mb-2 shadow-2xs bg-white">
                    {riskBadge.icon}
                    <span>{analysis.statusLabel || riskBadge.status}</span>
                  </div>
                  <h3 className="font-bold text-base text-stone-900 mb-1 leading-snug">
                    {analysis.summaryHeadline}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {riskPercentage}% vulnerability index based on 10 evaluated channel parameters.
                  </p>
                </div>
              </div>

              {/* Dynamic Estimated Leakage (5 Cols) */}
              <div className="md:col-span-5 p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 via-rose-500/10 to-amber-500/5 border border-amber-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
                      Estimated Brokerage Leakage
                    </span>
                    <TrendingDown className="w-6 h-6 text-rose-600" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#0B2B68] leading-tight">
                    {analysis.estimatedLeakage || '₹18 Lakhs - ₹38 Lakhs / yr'}
                  </div>
                  {analysis.estimatedMonthlyLeakage && (
                    <span className="text-xs font-semibold text-rose-700 block mt-1">
                      Monthly Leakage Rate: {analysis.estimatedMonthlyLeakage}
                    </span>
                  )}
                </div>
                <p className="text-xs text-stone-600 mt-4 leading-relaxed font-medium">
                  Estimated annual commissions lost to competitor brokers intercepting shared portal contacts and unbranded brochure sharing.
                </p>
              </div>

            </div>

            {/* Operational & Economics Baseline */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-stone-200 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-3">
                Your Agency's Portal Economics &amp; Commission Baseline
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="text-[11px] uppercase font-bold text-stone-400 block">Monthly Portal Spend</span>
                  <span className="text-base sm:text-lg font-extrabold text-[#0B2B68] block mt-0.5">
                    {(() => {
                      const val = formData.monthlyPortalSpend || auditData.monthlyPortalSpend || analysis.leakageMetrics?.portalSpendFormatted || analysis.formData?.monthlyPortalSpend;
                      if (!val) return '—';
                      const s = String(val).trim();
                      return s.startsWith('₹') ? s : `₹${s}`;
                    })()}
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="text-[11px] uppercase font-bold text-stone-400 block">Buyer Leads / Month</span>
                  <span className="text-base sm:text-lg font-extrabold text-stone-900 block mt-0.5">
                    {(() => {
                      const val = formData.monthlyBuyerLeads || auditData.monthlyBuyerLeads || analysis.leakageMetrics?.buyerLeadsMonthly || analysis.formData?.monthlyBuyerLeads;
                      if (!val) return '—';
                      const s = String(val).trim();
                      return s.toLowerCase().includes('lead') ? s : `${s} leads`;
                    })()}
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="text-[11px] uppercase font-bold text-stone-400 block">Avg Cost / Lead (CPL)</span>
                  <span className="text-base sm:text-lg font-extrabold text-amber-700 block mt-0.5">
                    {analysis.leakageMetrics?.costPerLeadFormatted ||
                      (analysis.leakageMetrics?.costPerLead ? `₹${analysis.leakageMetrics.costPerLead.toLocaleString('en-IN')}` : '—')}
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="text-[11px] uppercase font-bold text-stone-400 block">Avg Brokerage / Deal</span>
                  <span className="text-base sm:text-lg font-extrabold text-emerald-700 block mt-0.5">
                    {(() => {
                      const val = formData.brokeragePerBooking || auditData.brokeragePerBooking || analysis.leakageMetrics?.brokerageFormatted || analysis.formData?.brokeragePerBooking;
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
              <div className="p-5 sm:p-6 rounded-2xl bg-stone-50 border border-stone-200 text-stone-700 text-sm sm:text-base leading-relaxed">
                <p>{analysis.summaryText}</p>
              </div>
            )}

            {/* YOUR AUDIT ANSWERS SECTION */}
            {analysis.answersSummary && analysis.answersSummary.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-brand-primary" />
                    <span>Your Audit Answers</span>
                  </h3>
                  <span className="text-xs text-stone-500 font-medium">
                    {analysis.answersSummary.length} Questions Answered
                  </span>
                </div>

                <div className="space-y-2.5">
                  {analysis.answersSummary.map((item, idx) => {
                    const isCrit = item.riskPoints >= 4;
                    const isMod = item.riskPoints >= 2;
                    return (
                      <div
                        key={item.questionId || idx}
                        className="rounded-xl border border-stone-200 bg-white overflow-hidden shadow-xs"
                      >
                        <div className="p-4 sm:p-5 flex items-start gap-4">
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-extrabold shrink-0 mt-0.5 ${
                            isCrit ? 'bg-rose-100 text-rose-700' : isMod ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                          }`}>
                            {idx + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                              {item.category?.split('. ')[1] || item.category}
                            </span>
                            <p className="text-sm sm:text-base font-semibold text-stone-700 leading-snug mb-2.5">
                              {item.question}
                            </p>
                            <div className={`flex items-start gap-2 p-3 rounded-xl border text-sm font-medium leading-snug ${
                              isCrit
                                ? 'bg-rose-50 border-rose-200 text-rose-800'
                                : isMod
                                ? 'bg-amber-50 border-amber-200 text-amber-800'
                                : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                            }`}>
                              <span className="shrink-0">{isCrit ? '⚠️' : isMod ? '🔶' : '✅'}</span>
                              <span>{item.selectedOptionText}</span>
                            </div>
                          </div>
                          <div className={`shrink-0 text-xs font-extrabold px-2.5 py-1 rounded-full mt-0.5 ${
                            isCrit ? 'bg-rose-100 text-rose-700' : isMod ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                          }`}>
                            {item.riskPoints}/{item.maxPoints}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* EXPANDABLE SECTION 1: Vulnerability Diagnostics */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-brand-primary" />
                  <span>Micro-Market Vulnerability Diagnostics</span>
                </h3>
                <span className="text-xs text-stone-500 font-medium">
                  Click to Expand Channel Details
                </span>
              </div>

              <div className="space-y-3">
                {analysis.leakageAreas && analysis.leakageAreas.map((area, idx) => {
                  const isExpanded = !!expandedLeakage[idx];
                  const isCrit = area.severity === 'critical';
                  const isMod = area.severity === 'moderate';

                  return (
                    <div
                      key={area.id || idx}
                      className="rounded-2xl border border-stone-200 bg-white overflow-hidden shadow-2xs transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => toggleLeakage(idx)}
                        className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-3 hover:bg-stone-50/80 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <span
                            className={`w-3 h-3 rounded-full shrink-0 ${
                              isCrit ? 'bg-rose-500' : isMod ? 'bg-amber-500' : 'bg-emerald-500'
                            }`}
                          />
                          <div className="min-w-0">
                            <span className="font-bold text-sm sm:text-base text-stone-900 block truncate">
                              {area.name}
                            </span>
                            <span className="text-xs text-stone-500 font-medium line-clamp-1">
                              {area.description}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <span
                            className={`text-xs uppercase font-extrabold px-3 py-1 rounded-full ${
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
                            className={`w-5 h-5 text-stone-400 transition-transform duration-200 ${
                              isExpanded ? 'transform rotate-180 text-stone-800' : ''
                            }`}
                          />
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="px-5 pb-5 pt-2 bg-stone-50/70 border-t border-stone-100 text-sm space-y-3.5 animate-in fade-in duration-150">
                          {area.whatItMeans && (
                            <div>
                              <strong className="text-stone-800 block font-bold text-xs uppercase tracking-wider mb-1">
                                What this issue means:
                              </strong>
                              <p className="text-stone-600 leading-relaxed">{area.whatItMeans}</p>
                            </div>
                          )}

                          {area.whyItMatters && (
                            <div>
                              <strong className="text-stone-800 block font-bold text-xs uppercase tracking-wider mb-1">
                                Why it matters to your agency:
                              </strong>
                              <p className="text-stone-600 leading-relaxed">{area.whyItMatters}</p>
                            </div>
                          )}

                          {area.businessImpact && (
                            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 font-medium text-xs sm:text-sm">
                              ⚡ <strong>Measurable Business Impact:</strong> {area.businessImpact}
                            </div>
                          )}

                          {area.recommendation && (
                            <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-950 font-medium text-xs sm:text-sm">
                              💡 <strong>Recommended Strategic Fix:</strong> {area.recommendation}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* EXPANDABLE SECTION 2: 3-Step Strategy Recommendations */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-brand-accent" />
                  <span>Recommended Action Plan for {formData.firmName || auditData.firmName}</span>
                </h3>
                <span className="text-xs text-stone-500 font-medium hidden sm:inline">
                  Target: {analysis.goalQuarter || 'Q4 Scale'}
                </span>
              </div>

              <div className="space-y-3">
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
                        className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-3 hover:bg-stone-50/80 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <span className="w-7 h-7 rounded-full bg-[#0B2B68] text-[#E7C579] flex items-center justify-center text-xs font-bold shrink-0">
                            {idx + 1}
                          </span>
                          <div className="min-w-0">
                            <span className="font-bold text-sm sm:text-base text-stone-900 block truncate">
                              {rec.title}
                            </span>
                            <span className="text-xs text-stone-500 font-medium line-clamp-1">
                              {rec.description}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-xs uppercase font-bold px-2.5 py-0.5 rounded bg-stone-100 text-stone-700 border border-stone-200">
                            {rec.urgency || 'Immediate'}
                          </span>
                          <ChevronDown
                            className={`w-5 h-5 text-stone-400 transition-transform duration-200 ${
                              isExpanded ? 'transform rotate-180 text-stone-800' : ''
                            }`}
                          />
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="px-5 pb-5 pt-2 bg-blue-50/40 border-t border-blue-100 text-sm space-y-3 animate-in fade-in duration-150">
                          <p className="text-stone-700 leading-relaxed">
                            {rec.description}
                          </p>

                          {rec.impact && (
                            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 font-semibold text-xs sm:text-sm flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                              <span>Measurable Outcome: {rec.impact}</span>
                            </div>
                          )}

                          {rec.timeline && (
                            <span className="text-xs text-stone-500 block font-medium">
                              ⏱️ Implementation Roadmap: {rec.timeline}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* VISUAL GRAPHIC: Rented Portals vs Owned Website System */}
            <div className="p-6 rounded-2xl bg-stone-900 text-white space-y-4 shadow-lg">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
                Infrastructure Architecture Comparison
              </span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                  <span className="text-rose-400 font-bold block text-sm">❌ Rented Portal Model:</span>
                  <ul className="space-y-1.5 text-stone-300">
                    <li>• Same buyer lead sold to 4–5 brokers simultaneously</li>
                    <li>• 100% recurring monthly recharge expense</li>
                    <li>• Zero long-term SEO search equity built</li>
                    <li>• PDFs divert warm buyers directly to competing agents</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-white/10 border border-emerald-400/30 space-y-2">
                  <span className="text-emerald-400 font-bold block text-sm">✅ Owned Micro-Market Platform:</span>
                  <ul className="space-y-1.5 text-stone-200">
                    <li>• 100% exclusive direct buyer inquiries</li>
                    <li>• Instant floor plan click-tracking on WhatsApp</li>
                    <li>• 4–5 organic buyer inquiries daily on Google SEO</li>
                    <li>• Negotiate higher brokerage slabs with top developers</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Informational Disclaimer */}
            <div className="rounded-2xl bg-stone-50 border border-stone-200 p-4 text-xs text-stone-500 leading-relaxed">
              <p className="font-semibold text-stone-700 mb-1 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-stone-400" />
                <span>Directional Self-Assessment Notice:</span>
              </p>
              This report is a consultative diagnostic self-assessment derived from your operational inputs. It is designed to illustrate digital channel vulnerabilities and lead protection strategies.
            </div>

            {/* Bottom Actions Bar */}
            <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 no-print">
              <Link
                href="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-stone-300 text-xs sm:text-sm font-semibold text-stone-700 hover:bg-stone-50 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Take Another Assessment</span>
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-sm sm:text-base font-bold shadow-lg transition-all animate-button-blink cursor-pointer"
              >
                <PhoneCall className="w-5 h-5 animate-bounce" />
                <span>Send My Report on WhatsApp</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
