'use client';

import React, { useState, useMemo } from 'react';
import { AUDIT_QUESTIONS } from '@/data/auditQuestions';
import { calculateAuditAnalysis } from '@/utils/auditScorer';
import QuestionList from './QuestionList';
import ResultsModal from './ResultsModal';
import MobileFormDrawer from './MobileFormDrawer';
import { Sparkles, CheckCircle } from 'lucide-react';

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

export default function AuditContainer({
  isMobileFormOpen = false,
  onCloseMobileForm = () => {},
}) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [submittedLeadData, setSubmittedLeadData] = useState(null);
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
    // Block report generation unless all questions are answered
    if (answeredCount < totalQuestions) {
      // Scroll to the questions section so user answers them
      const el = document.getElementById('audit-section');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    const combinedData = { ...formData, ...submittedFormData };
    setFormData(combinedData);
    setSubmittedLeadData(combinedData);
    setIsSubmitting(true);

    try {
      // Calculate initial client analysis as baseline/fallback
      let finalAnalysis = calculateAuditAnalysis(selectedAnswers, combinedData);
      let assignedReportId = `RPT-${Date.now().toString(36).toUpperCase()}`;

      // Submit to backend API which triggers OpenAI report generation and MongoDB save
      try {
        const response = await fetch('/api/audit-submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            answers: selectedAnswers,
            formData: combinedData,
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
      const fallbackAnalysis = calculateAuditAnalysis(selectedAnswers, combinedData);
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
    <section id="audit-section" className="pt-3 pb-8 sm:pt-5 sm:pb-12 bg-slate-50/70 border-b border-stone-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <QuestionList
          selectedAnswers={selectedAnswers}
          onSelectOption={handleSelectOption}
          formData={formData}
          onUpdateFormData={setFormData}
          onSubmitLead={handleLeadSubmit}
          isSubmitting={isSubmitting}
        />
      </div>

      {/* Mobile Form Drawer (Slide-up modal when tapping 'Fill Form' on mobile header / hero / sticky bar) */}
      <MobileFormDrawer
        isOpen={isMobileFormOpen}
        onClose={onCloseMobileForm}
        formData={formData}
        onUpdateFormData={setFormData}
        onSubmit={handleLeadSubmit}
        isSubmitting={isSubmitting}
      />

      {/* Interactive Personalized Results Modal */}
      {analysis && (
        <ResultsModal
          isOpen={showResultsModal}
          onClose={() => setShowResultsModal(false)}
          analysis={analysis}
          formData={submittedLeadData || formData}
          reportId={reportId}
          onRetake={handleRetake}
        />
      )}
    </section>
  );
}
