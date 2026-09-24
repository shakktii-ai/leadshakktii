import { AUDIT_QUESTIONS } from '@/data/auditQuestions';

export function calculateAuditAnalysis(selectedAnswers = {}, formData = {}) {
  let totalScore = 0;
  const maxScore = 18;

  const answersSummary = AUDIT_QUESTIONS.map((q) => {
    const selectedOptionId = selectedAnswers[q.id];
    const option = q.options.find((opt) => opt.id === selectedOptionId) || q.options[0];

    // Q10 doesn't affect risk score
    const points = q.id === 10 ? 0 : (option ? option.riskPoints : 0);
    totalScore += points;

    return {
      questionId: q.id,
      category: q.category,
      question: q.question,
      selectedOptionText: option ? option.text : 'Not selected',
      riskPoints: points,
    };
  });

  let riskLevel = 'low';
  let statusLabel = 'Digital Foundations in Place';
  let summaryHeadline = 'Strong Foundation with High-Margin Expansion Potential';
  let summaryText = `Your advisory firm (${formData.firmName || 'Your Agency'}) currently maintains healthy digital awareness in ${formData.microMarket || 'your micro-market'}. However, you can further insulate your buyer pipelines from portal rent hikes by activating proprietary retargeting workflows.`;

  if (totalScore >= 13) {
    riskLevel = 'high';
    statusLabel = 'Several Areas Need Attention';
    summaryHeadline = 'Significant Buyer Leakage & Heavy Portal Dependency';
    summaryText = `Your firm (${formData.firmName || 'Your Agency'}) is currently vulnerable to buyer diversion in ${formData.microMarket || 'your focus area'}. Multiple channel partners are likely bidding on the same buyer leads, while past inquiries remain dormant. Deploying an owned web ecosystem will immediately stem this revenue leakage.`;
  } else if (totalScore >= 7) {
    riskLevel = 'moderate';
    statusLabel = 'Some Opportunities to Improve';
    summaryHeadline = 'Moderate Revenue Leakage with Clear Growth Levers';
    summaryText = `While ${formData.firmName || 'Your Agency'} has operational momentum in ${formData.microMarket || 'your market'}, high-value buyers are slipping through gaps in PDF sharing, WhatsApp scattering, and rented portal reliance. Converting these touchpoints into an owned digital catalog can unlock 2.5x higher inquiry retention.`;
  }

  // Determine Q10 goal
  const q10SelectedId = selectedAnswers[10];
  const q10Option = AUDIT_QUESTIONS[9]?.options.find((opt) => opt.id === q10SelectedId);
  const goalQuarter = q10Option ? q10Option.text : 'Reduce portal dependency and scale owned inquiries';

  // Leakage areas assessment
  const q1Points = answersSummary.find((a) => a.questionId === 1)?.riskPoints ?? 0;
  const q2Points = answersSummary.find((a) => a.questionId === 2)?.riskPoints ?? 0;
  const q3Points = answersSummary.find((a) => a.questionId === 3)?.riskPoints ?? 0;
  const q5Points = answersSummary.find((a) => a.questionId === 5)?.riskPoints ?? 0;
  const q7Points = answersSummary.find((a) => a.questionId === 7)?.riskPoints ?? 0;

  const leakageAreas = [
    {
      name: 'Portal Lead Exclusivity',
      severity: q1Points === 2 ? 'critical' : q1Points === 1 ? 'moderate' : 'healthy',
      description:
        q1Points === 2
          ? 'Buying shared numbers forces price discounting against 4–5 local competitors.'
          : q1Points === 1
          ? 'Rising cost-per-lead is eroding channel partner margins over time.'
          : 'Direct inquiries protect your commission margins with 100% exclusivity.',
    },
    {
      name: 'Client Diversion Prevention',
      severity: q2Points === 2 ? 'critical' : q2Points === 1 ? 'moderate' : 'healthy',
      description:
        q2Points === 2
          ? 'Sending PDFs or raw project names prompts clients to search online, where other brokers intercept them.'
          : q2Points === 1
          ? 'Verbal project recommendations lack visual retention and brand anchoring.'
          : 'Branded catalog links keep client browsing contained inside your ecosystem.',
    },
    {
      name: 'CRM Database Reactivation',
      severity: q3Points === 2 ? 'critical' : q3Points === 1 ? 'moderate' : 'healthy',
      description:
        q3Points === 2
          ? `Your ${formData.crmLeadVolume || 'existing database'} is underutilized, forcing recurring spends on new ad packages.`
          : q3Points === 1
          ? 'Unsegmented WhatsApp blasts often result in low open rates and buyer fatigue.'
          : 'Interactive launch pages track past client re-engagement automatically.',
    },
    {
      name: 'Mobile Property UX',
      severity: q7Points === 2 ? 'critical' : q7Points === 1 ? 'moderate' : 'healthy',
      description:
        q7Points === 2
          ? 'Heavy PDFs slow down mobile buyers on 4G/5G connections.'
          : q7Points === 1
          ? 'Unorganized WhatsApp image threads lose critical floor plan and pricing context.'
          : 'Fast mobile web catalogs provide instant floor plan and amenity previews.',
    },
  ];

  // Dynamic recommendations based on score and specific responses
  const recommendations = [];

  if (q1Points > 0 || totalScore >= 10) {
    recommendations.push({
      title: `Deploy a Dedicated ${formData.microMarket || 'Micro-Market'} Property Hub`,
      description: `Replace rented portal spending with an owned digital storefront featuring all prime projects in ${formData.microMarket || 'your focus zone'}. Capture direct buyer intent before portals can sell the contact to rival agents.`,
      impact: 'Stops 4-to-1 broker lead sharing & reduces customer acquisition cost by up to 60%',
      urgency: 'Immediate',
    });
  } else {
    recommendations.push({
      title: `Consolidate Micro-Market SEO Leadership in ${formData.microMarket || 'Your Region'}`,
      description: `Target high-intent luxury buyer keywords for specific towers, upcoming infrastructure corridors, and pre-launch inventory to maintain dominant organic positioning.`,
      impact: 'Attracts high-ticket HNIs searching for verified localized advisory',
      urgency: 'Strategic',
    });
  }

  if (q2Points > 0 || q7Points > 0) {
    recommendations.push({
      title: 'Replace Raw PDF Sharing with Interactive Branded Project Links',
      description:
        'When buyers ask for comparable options, share a clean, high-speed mobile link under your firm name. Buyers explore floor plans, master layouts, and location maps without leaving your ecosystem.',
      impact: 'Eliminates competitor interception on Google & doubles client response rate',
      urgency: 'Immediate',
    });
  } else {
    recommendations.push({
      title: 'Implement Interactive Floor Plan & Virtual Tour Hubs',
      description:
        'Enhance your property presentations with responsive 2D/3D master layout viewers and direct WhatsApp site visit scheduling widgets.',
      impact: 'Shortens consideration cycles and accelerates in-person site visits',
      urgency: 'Medium-term',
    });
  }

  if (formData.crmLeadVolume === '5,000 to 10,000+ leads' || formData.crmLeadVolume === '1,000 to 5,000 leads' || q3Points > 0) {
    recommendations.push({
      title: `Reactivate Your ${formData.crmLeadVolume || 'Past CRM Database'} with Launch Landing Pages`,
      description: `Rather than spending on fresh portal packs, deploy curated project launch links to your existing contacts. Track who opens, views 3BHK floor plans, and requests callbacks in real time.`,
      impact: 'Generates instant, zero-ad-cost site visits from warm buyer relationships',
      urgency: 'Immediate',
    });
  } else {
    recommendations.push({
      title: 'Establish Developer Mandate Digital Presentation Kit',
      description:
        'Package your digital traffic analytics and micro-market reach into a professional pitch deck to negotiate sole-selling rights and higher developer commissions.',
      impact: 'Secures exclusive developer mandates with institutional credibility',
      urgency: 'Strategic',
    });
  }

  return {
    totalScore,
    maxScore,
    riskLevel,
    statusLabel,
    summaryHeadline,
    summaryText,
    answersSummary,
    goalQuarter,
    recommendations,
    leakageAreas,
  };
}
