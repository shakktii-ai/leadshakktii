'use client';

import React, { useState, useMemo } from 'react';
import { AUDIT_QUESTIONS } from '@/data/auditQuestions';
import { calculateAuditAnalysis } from '@/utils/auditScorer';
import QuestionList from './QuestionList';
import LeadCaptureSidebar from './LeadCaptureSidebar';
import ResultsModal from './ResultsModal';
import MobileFormDrawer from './MobileFormDrawer';
import { Sparkles, CheckCircle } from 'lucide-react';

const INITIAL_FORM_STATE = {
  fullName: '',
  firmName: '',
  microMarket: '',
  whatsappNumber: '',
  crmLeadVolume: '',
  consent: true,
};

export default function AuditContainer({
  isMobileFormOpen = false,
  onCloseMobileForm = () => {},
}) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [analysis, setAnalysis] = useState(null);
  const [reportId, setReportId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResultsModal, setShowResultsModal] = useState(false);

  const totalQuestions = AUDIT_QUESTIONS.length;

  // Count answered questions
  const answeredCount = useMemo(() => {
    return Object.keys(selectedAnswers).length;
  }, [selectedAnswers]);

  // Current progress calculation
  const currentProgress = answeredCount;
  const progressPercentage = Math.round((currentProgress / totalQuestions) * 100);

  const handleSelectOption = (questionId, optionId) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const handleLeadSubmit = async (submittedFormData) => {
    setFormData(submittedFormData);
    setIsSubmitting(true);

    try {
      // Calculate initial client analysis as baseline/fallback
      let finalAnalysis = calculateAuditAnalysis(selectedAnswers, submittedFormData);
      let assignedReportId = `RPT-${Date.now().toString(36).toUpperCase()}`;

      // Submit to backend API which triggers OpenAI report generation and MongoDB save
      try {
        const response = await fetch('/api/audit-submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            answers: selectedAnswers,
            formData: submittedFormData,
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          console.error('API submission returned error:', data.error);
        } else {
          console.log('Lead audit saved successfully with ID:', data.leadId);
          if (data.reportId || data.leadId) {
            assignedReportId = data.reportId || data.leadId;
          }
          if (data.analysis) {
            finalAnalysis = data.analysis;
          }
        }
      } catch (e) {
        console.warn('API post error, continuing with fallback analysis:', e);
      }

      setReportId(assignedReportId);
      setAnalysis(finalAnalysis);
      setShowResultsModal(true);
      // Clear all selected question options after report generation
      setSelectedAnswers({});
    } catch (err) {
      console.error('Audit submit error:', err);
      const fallbackAnalysis = calculateAuditAnalysis(selectedAnswers, submittedFormData);
      setAnalysis(fallbackAnalysis);
      setShowResultsModal(true);
      // Clear all selected question options after report generation
      setSelectedAnswers({});
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setShowResultsModal(false);
    setAnalysis(null);
    setFormData(INITIAL_FORM_STATE);
    const el = document.getElementById('audit-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section id="audit-section" className="py-8 sm:py-12 bg-slate-50/70 border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Progress Bar & Header Banner */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200 shadow-xs mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold text-xs">
                <Sparkles className="w-4 h-4" />
              </span>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
                  Diagnostic Progress
                </span>
                <span className="text-sm font-extrabold text-brand-dark">
                  {answeredCount === totalQuestions
                    ? 'All 10 Questions Evaluated!'
                    : `${answeredCount} of ${totalQuestions} Questions Answered`}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <span className="text-xs font-extrabold text-brand-primary bg-brand-primary/10 px-3 py-1 rounded-full">
                {progressPercentage}% Completed
              </span>
            </div>
          </div>

          {/* Progress Bar Track */}
          <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full transition-all duration-400 ease-out"
              style={{ width: `${Math.max(5, progressPercentage)}%` }}
            />
          </div>
        </div>

        {/* 2-Column Grid: Left Questions, Right Sticky Lead Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column (7 cols): Questions with Eye-Openers */}
          <div className="lg:col-span-7 space-y-8">
            <QuestionList
              selectedAnswers={selectedAnswers}
              onSelectOption={handleSelectOption}
            />

            {/* In-flow Form on Mobile (Shown right below questions for seamless mobile filling) */}
            <div className="block lg:hidden pt-4">
              <LeadCaptureSidebar
                onSubmit={handleLeadSubmit}
                isSubmitting={isSubmitting}
                isMobileModal={false}
              />
            </div>
          </div>

          {/* Right Column (5 cols): Sticky Lead Capture Form & Promo Card on Desktop */}
          <div className="hidden lg:block lg:col-span-5">
            <LeadCaptureSidebar
              onSubmit={handleLeadSubmit}
              isSubmitting={isSubmitting}
            />
          </div>

        </div>

      </div>

      {/* Mobile Form Drawer (Slide-up modal when tapping 'Fill Form' on mobile header / hero / sticky bar) */}
      <MobileFormDrawer
        isOpen={isMobileFormOpen}
        onClose={onCloseMobileForm}
        onSubmit={handleLeadSubmit}
        isSubmitting={isSubmitting}
      />

      {/* Interactive Personalized Results Modal */}
      {analysis && (
        <ResultsModal
          isOpen={showResultsModal}
          onClose={() => setShowResultsModal(false)}
          analysis={analysis}
          formData={formData}
          reportId={reportId}
          onRetake={handleRetake}
        />
      )}
    </section>
  );
}
