import { AUDIT_QUESTIONS } from '@/data/auditQuestions';

/**
 * Calculates dynamic estimated financial leakage based on CRM lead volume, risk score, and channel points.
 */
export function calculateEstimatedLeakage(totalScore = 0, formData = {}, answersSummary = []) {
  // Volume multiplier based on user's past database
  let baseMin = 6;
  let baseMax = 14;

  const volumeStr = String(formData.crmLeadVolume || '').toLowerCase();
  if (volumeStr.includes('10,000')) {
    baseMin = 35;
    baseMax = 80;
  } else if (volumeStr.includes('5,000')) {
    baseMin = 22;
    baseMax = 50;
  } else if (volumeStr.includes('1,000')) {
    baseMin = 12;
    baseMax = 28;
  } else if (volumeStr.includes('less than') || volumeStr.includes('500')) {
    baseMin = 5;
    baseMax = 12;
  }

  // Risk factor based on 50-point score (from 0.2 to 1.3)
  const scoreFactor = Math.max(0.3, Math.min(1.3, (totalScore / 50) * 1.25));

  // Channel penalties
  const q1 = answersSummary.find((a) => a.questionId === 1)?.riskPoints || 0;
  const q2 = answersSummary.find((a) => a.questionId === 2)?.riskPoints || 0;
  const q3 = answersSummary.find((a) => a.questionId === 3)?.riskPoints || 0;

  let penalty = 1.0;
  if (q1 >= 5) penalty += 0.2;
  if (q2 >= 5) penalty += 0.15;
  if (q3 >= 5) penalty += 0.15;

  const calculatedMinLakhs = Math.round(baseMin * scoreFactor * penalty);
  const calculatedMaxLakhs = Math.round(baseMax * scoreFactor * penalty);

  const finalMin = Math.max(3, calculatedMinLakhs);
  const finalMax = Math.max(finalMin + 5, calculatedMaxLakhs);

  let formattedAnnual = '';
  if (finalMax >= 100) {
    const minCr = (finalMin / 100).toFixed(2);
    const maxCr = (finalMax / 100).toFixed(2);
    formattedAnnual = `₹${minCr} Cr - ₹${maxCr} Cr / yr`;
  } else {
    formattedAnnual = `₹${finalMin} Lakhs - ₹${finalMax} Lakhs / yr`;
  }

  const monthlyMin = Math.round((finalMin * 100000) / 12);
  const monthlyMax = Math.round((finalMax * 100000) / 12);

  const formatMonthly = (val) => {
    if (val >= 100000) {
      return `₹${(val / 100000).toFixed(1)} Lakhs`;
    }
    return `₹${Math.round(val / 1000)}k`;
  };

  const formattedMonthly = `${formatMonthly(monthlyMin)} - ${formatMonthly(monthlyMax)} / mo`;

  return {
    annualFormatted: formattedAnnual,
    monthlyFormatted: formattedMonthly,
    minLakhs: finalMin,
    maxLakhs: finalMax,
    annualRaw: formattedAnnual,
  };
}

export function calculateAuditAnalysis(selectedAnswers = {}, formData = {}) {
  let totalScore = 0;
  const maxScore = 50;

  const answersSummary = AUDIT_QUESTIONS.map((q) => {
    const selectedOptionId = selectedAnswers[q.id];
    const option = q.options.find((opt) => opt.id === selectedOptionId) || q.options[0];

    const points = option ? (option.riskPoints ?? 0) : 0;
    totalScore += points;

    return {
      questionId: q.id,
      category: q.category,
      question: q.question,
      selectedOptionText: option ? option.text : 'Not selected',
      riskPoints: points,
      maxPoints: 5,
    };
  });

  // Calculate dynamic estimated leakage
  const leakageMetrics = calculateEstimatedLeakage(totalScore, formData, answersSummary);
  const estimatedLeakage = leakageMetrics.annualFormatted;
  const estimatedMonthlyLeakage = leakageMetrics.monthlyFormatted;

  let riskLevel = 'low';
  let statusLabel = 'Digital Foundations in Place';
  let summaryHeadline = 'Strong Foundation with High-Margin Expansion Potential';
  let summaryText = `Your advisory firm (${formData.firmName || 'Your Agency'}) currently maintains healthy digital awareness in ${formData.microMarket || 'your micro-market'}. However, you can further insulate your buyer pipelines from portal rent hikes by activating proprietary retargeting workflows.`;

  if (totalScore >= 34) {
    riskLevel = 'high';
    statusLabel = 'Several Areas Need Attention';
    summaryHeadline = 'Significant Buyer Leakage & Heavy Portal Dependency';
    summaryText = `Your firm (${formData.firmName || 'Your Agency'}) is currently vulnerable to buyer diversion in ${formData.microMarket || 'your focus area'}. Multiple channel partners are likely bidding on the same buyer leads, while past inquiries remain dormant. Deploying an owned web ecosystem will immediately stem this revenue leakage.`;
  } else if (totalScore >= 17) {
    riskLevel = 'moderate';
    statusLabel = 'Some Opportunities to Improve';
    summaryHeadline = 'Moderate Revenue Leakage with Clear Growth Levers';
    summaryText = `While ${formData.firmName || 'Your Agency'} has operational momentum in ${formData.microMarket || 'your market'}, high-value buyers are slipping through gaps in PDF sharing, WhatsApp scattering, and rented portal reliance. Converting these touchpoints into an owned digital catalog can unlock 2.5x higher inquiry retention.`;
  }

  // Determine Q10 goal
  const q10SelectedId = selectedAnswers[10];
  const q10Option = AUDIT_QUESTIONS[9]?.options.find((opt) => opt.id === q10SelectedId);
  const goalQuarter = q10Option ? q10Option.text : 'Reduce portal dependency and scale owned inquiries';

  // Leakage areas assessment with rich expandable details
  const q1Points = answersSummary.find((a) => a.questionId === 1)?.riskPoints ?? 0;
  const q2Points = answersSummary.find((a) => a.questionId === 2)?.riskPoints ?? 0;
  const q3Points = answersSummary.find((a) => a.questionId === 3)?.riskPoints ?? 0;
  const q7Points = answersSummary.find((a) => a.questionId === 7)?.riskPoints ?? 0;

  const leakageAreas = [
    {
      id: 'portal-exclusivity',
      name: 'Portal Lead Exclusivity',
      severity: q1Points >= 4 ? 'critical' : q1Points >= 2 ? 'moderate' : 'healthy',
      score: `${q1Points}/5`,
      description:
        q1Points >= 4
          ? 'Buying shared numbers forces price discounting against 4–5 local competitors.'
          : q1Points >= 2
          ? 'Rising cost-per-lead is eroding channel partner margins over time.'
          : 'Direct inquiries protect your commission margins with 100% exclusivity.',
      whatItMeans:
        'National property portals monetize by selling the same buyer inquiry simultaneously to 4 to 5 channel partners, creating an aggressive price war.',
      whyItMatters:
        'When competing brokers receive the same contact within 30 seconds, close rates plummet below 2% and customer acquisition costs double every 12 months.',
      userAnswerImpact:
        q1Points >= 4
          ? 'Your choice indicates you currently experience severe lead sharing competition from portal re-sales.'
          : 'Your firm recognizes portal pricing pressure and needs insulated lead streams.',
      businessImpact: 'Wastes up to 40% of marketing capital on non-exclusive contacts.',
      recommendation:
        'Deploy a direct micro-market property landing platform to capture 100% exclusive buyer leads.',
    },
    {
      id: 'client-diversion',
      name: 'Client Diversion Prevention',
      severity: q2Points >= 4 ? 'critical' : q2Points >= 2 ? 'moderate' : 'healthy',
      score: `${q2Points}/5`,
      description:
        q2Points >= 4
          ? 'Sending PDFs or raw project names prompts clients to search online, where other brokers intercept them.'
          : q2Points >= 2
          ? 'Verbal project recommendations lack visual retention and brand anchoring.'
          : 'Branded catalog links keep client browsing contained inside your ecosystem.',
      whatItMeans:
        'When you send generic builder PDFs or project names on WhatsApp, buyers search Google where competitor paid ads and rival portals intercept them.',
      whyItMatters:
        'Over 35% of warm client referrals are lost mid-funnel because the client discovers another agent while researching the project independently.',
      userAnswerImpact:
        q2Points >= 4
          ? 'Sending unbranded brochures creates a direct exit route for your high-intent buyers.'
          : 'Client containment can be significantly improved with interactive web previews.',
      businessImpact: 'Direct leakage of warm buyer relationships to rival local advisors.',
      recommendation:
        'Replace all PDF sharing with branded website property links containing instant WhatsApp call-to-actions.',
    },
    {
      id: 'crm-reactivation',
      name: 'CRM Database Reactivation',
      severity: q3Points >= 4 ? 'critical' : q3Points >= 2 ? 'moderate' : 'healthy',
      score: `${q3Points}/5`,
      description:
        q3Points >= 4
          ? `Your ${formData.crmLeadVolume || 'existing database'} is underutilized, forcing recurring spends on new ad packages.`
          : q3Points >= 2
          ? 'Unsegmented WhatsApp blasts often result in low open rates and buyer fatigue.'
          : 'Interactive launch pages track past client re-engagement automatically.',
      whatItMeans:
        'Historical buyer inquiries stored in your CRM or phonebook represent pre-qualified buyers who are already familiar with your agency.',
      whyItMatters:
        'Re-engaging warm past leads costs 80% less than buying fresh portal packs and yields 3x higher trust during new project launches.',
      userAnswerImpact:
        `For your ${formData.crmLeadVolume || 'contact database'}, automated web tracking can unlock 10–15 fresh site visits per launch without new ad spend.`,
      businessImpact: 'Missed revenue from dormant buyer contacts who are actively purchasing elsewhere.',
      recommendation:
        'Deploy curated project launch broadcast links that trigger real-time alerts when past leads browse 3BHK or 4BHK units.',
    },
    {
      id: 'mobile-ux',
      name: 'Mobile Property UX & Speed',
      severity: q7Points >= 4 ? 'critical' : q7Points >= 2 ? 'moderate' : 'healthy',
      score: `${q7Points}/5`,
      description:
        q7Points >= 4
          ? 'Heavy PDFs slow down mobile buyers on 4G/5G connections and clutter storage.'
          : q7Points >= 2
          ? 'Unorganized WhatsApp image threads lose critical floor plan and pricing context.'
          : 'Fast mobile web catalogs provide instant floor plan and amenity previews.',
      whatItMeans:
        'Over 82% of modern property discovery and floor plan evaluation occurs on smartphones while buyers are on the go.',
      whyItMatters:
        'Clunky downloads and disorganized WhatsApp chats cause friction; high-speed mobile web catalogs double site-visit appointment confirmations.',
      userAnswerImpact:
        q7Points >= 4
          ? 'Heavy PDF downloads create friction that discourages affluent mobile users from reviewing layouts.'
          : 'Fast interactive mobile property catalogs will accelerate client decision-making.',
      businessImpact: 'High drop-off between initial client interest and scheduled site visits.',
      recommendation:
        'Adopt mobile-first interactive property pages that open in under 1 second with responsive master layouts and pricing calculators.',
    },
  ];

  // Dynamic recommendations based on score and specific responses
  const recommendations = [];

  if (q1Points >= 3 || totalScore >= 25) {
    recommendations.push({
      id: 'rec-1',
      title: `Deploy a Dedicated ${formData.microMarket || 'Micro-Market'} Property Hub`,
      description: `Replace rented portal spending with an owned digital storefront featuring all prime projects in ${formData.microMarket || 'your focus zone'}. Capture direct buyer intent before portals can sell the contact to rival agents.`,
      whatItMeans: 'Building a proprietary digital catalog dedicated solely to your focus micro-market.',
      whyItMatters: 'Completely eliminates portal dependency and shields your buyer inquiries from competitors.',
      impact: 'Stops 4-to-1 broker lead sharing & reduces customer acquisition cost by up to 60%',
      urgency: 'Immediate',
      timeline: 'Turnkey deployment within 5 to 7 days',
    });
  } else {
    recommendations.push({
      id: 'rec-1',
      title: `Consolidate Micro-Market SEO Leadership in ${formData.microMarket || 'Your Region'}`,
      description: `Target high-intent luxury buyer keywords for specific towers, upcoming infrastructure corridors, and pre-launch inventory to maintain dominant organic positioning.`,
      whatItMeans: 'Hyperlocal Google search optimization tailored to high-ticket buyers in your area.',
      whyItMatters: 'Generates organic, verified buyer inquiries every week without continuous ad spend.',
      impact: 'Attracts high-ticket HNIs searching for verified localized advisory',
      urgency: 'Strategic',
      timeline: '2 to 3 weeks implementation',
    });
  }

  if (q2Points >= 3 || q7Points >= 3) {
    recommendations.push({
      id: 'rec-2',
      title: 'Replace Raw PDF Sharing with Interactive Branded Project Links',
      description:
        'When buyers ask for comparable options, share a clean, high-speed mobile link under your firm name. Buyers explore floor plans, master layouts, and location maps without leaving your ecosystem.',
      whatItMeans: 'Upgrading your daily WhatsApp client communication with bespoke digital links.',
      whyItMatters: 'Keeps 100% of client browsing contained within your agency brand.',
      impact: 'Eliminates competitor interception on Google & doubles client response rate',
      urgency: 'Immediate',
      timeline: 'Immediate adoption across sales team',
    });
  } else {
    recommendations.push({
      id: 'rec-2',
      title: 'Implement Interactive Floor Plan & Virtual Tour Hubs',
      description:
        'Enhance your property presentations with responsive 2D/3D master layout viewers and direct WhatsApp site visit scheduling widgets.',
      whatItMeans: 'Interactive property visualizers for high-value residential inventory.',
      whyItMatters: 'Pre-qualifies buyers before taking them on physical site visits.',
      impact: 'Shortens consideration cycles and accelerates in-person site visits',
      urgency: 'Medium-term',
      timeline: '1 to 2 weeks deployment',
    });
  }

  if (formData.crmLeadVolume === '5,000 to 10,000+ leads' || formData.crmLeadVolume === '10,000+ leads' || q3Points >= 3) {
    recommendations.push({
      id: 'rec-3',
      title: `Reactivate Your ${formData.crmLeadVolume || 'Past CRM Database'} with Launch Landing Pages`,
      description: `Rather than spending on fresh portal packs, deploy curated project launch links to your existing contacts. Track who opens, views 3BHK floor plans, and requests callbacks in real time.`,
      whatItMeans: 'Monetizing your historical buyer contact list using smart web tracking.',
      whyItMatters: 'Extracts high-margin brokerage revenue from contacts you already own.',
      impact: 'Generates instant, zero-ad-cost site visits from warm buyer relationships',
      urgency: 'Immediate',
      timeline: 'Ready to broadcast within 48 hours',
    });
  } else {
    recommendations.push({
      id: 'rec-3',
      title: 'Establish Developer Mandate Digital Presentation Kit',
      description:
        'Package your digital traffic analytics and micro-market reach into a professional pitch deck to negotiate sole-selling rights and higher developer commissions.',
      whatItMeans: 'Showcasing proprietary digital distribution power to Tier-1 developers.',
      whyItMatters: 'Unlocks exclusive developer mandates and premium commission slabs.',
      impact: 'Secures exclusive developer mandates with institutional credibility',
      urgency: 'Strategic',
      timeline: '1 week preparation',
    });
  }

  return {
    totalScore,
    maxScore,
    riskLevel,
    statusLabel,
    summaryHeadline,
    summaryText,
    estimatedLeakage,
    estimatedMonthlyLeakage,
    leakageMetrics,
    answersSummary,
    goalQuarter,
    recommendations,
    leakageAreas,
  };
}

