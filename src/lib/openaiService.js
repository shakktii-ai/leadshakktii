import { calculateAuditAnalysis } from "../utils/auditScorer.js";

/**
 * Generates an AI-Powered Lead Protection Audit Report using OpenAI gpt-4o-mini
 * Falls back gracefully to deterministic analysis if OpenAI is unavailable.
 */
export async function generateOpenAIReport({ answers = {}, formData = {} }) {
  // First calculate base deterministic score and data
  const baseAnalysis = calculateAuditAnalysis(answers, formData);
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    console.warn("OPENAI_API_KEY not configured, using rule-based analysis.");
    return baseAnalysis;
  }

  try {
    const prompt = `
You are the Chief Real Estate Growth & Lead Protection Strategist at Shakktii AI.
Analyze the following real estate advisory firm lead audit submission and generate a high-impact, consultative executive diagnostic report.

FIRM DETAILS:
- Advisor / Broker Name: ${formData.fullName || 'Real Estate Professional'}
- Real Estate Firm: ${formData.firmName || 'Real Estate Firm'}
- Focus Micro-Market / Area: ${formData.microMarket || 'Local Micro-Market'}
- Old CRM / Database Leads: ${formData.crmLeadVolume || 'Not specified'}
- Calculated Risk Score: ${baseAnalysis.totalScore} / 50 (${baseAnalysis.riskLevel.toUpperCase()} RISK)
- Dynamic Calculated Leakage Baseline: ${baseAnalysis.estimatedLeakage}

QUESTIONS & ANSWERS SUBMITTED:
${baseAnalysis.answersSummary
  .map(
    (a, idx) =>
      `Q${idx + 1} (${a.category}): "${a.question}" -> Chosen Answer: "${a.selectedOptionText}" (Risk points: ${a.riskPoints}/5)`
  )
  .join("\n")}

Respond ONLY with a valid JSON object formatted as follows (no markdown fences, pure JSON):
{
  "summaryHeadline": "A powerful 8-12 word executive diagnostic headline specifically referencing ${formData.firmName || 'their firm'} and ${formData.microMarket || 'their micro-market'}",
  "summaryText": "A 3-4 sentence consultative diagnostic assessment addressing ${formData.firmName || 'their firm'} and ${formData.microMarket || 'their micro-market'}, explaining where their high-intent buyers are currently leaking to competing brokers/portals and how an owned website system eliminates this leakage.",
  "estimatedLeakage": "${baseAnalysis.estimatedLeakage}",
  "leakageAreas": [
    {
      "id": "portal-exclusivity",
      "name": "Portal Lead Exclusivity",
      "severity": "${baseAnalysis.leakageAreas[0]?.severity || 'critical'}",
      "description": "Specific finding based on their Q1 portal answer",
      "whatItMeans": "${baseAnalysis.leakageAreas[0]?.whatItMeans || ''}",
      "whyItMatters": "${baseAnalysis.leakageAreas[0]?.whyItMatters || ''}",
      "businessImpact": "Wastes up to 40% of ad budget on non-exclusive shared contacts",
      "recommendation": "Deploy a dedicated micro-market property landing platform"
    },
    {
      "id": "client-diversion",
      "name": "Client Diversion Prevention",
      "severity": "${baseAnalysis.leakageAreas[1]?.severity || 'critical'}",
      "description": "Specific finding based on their Q2 PDF/brochure sharing answer",
      "whatItMeans": "${baseAnalysis.leakageAreas[1]?.whatItMeans || ''}",
      "whyItMatters": "${baseAnalysis.leakageAreas[1]?.whyItMatters || ''}",
      "businessImpact": "Direct loss of warm buyer relationships to rival local agents",
      "recommendation": "Replace PDF sharing with branded website links"
    },
    {
      "id": "crm-reactivation",
      "name": "CRM Database Reactivation",
      "severity": "${baseAnalysis.leakageAreas[2]?.severity || 'moderate'}",
      "description": "Specific finding based on their Q3 database answer regarding ${formData.crmLeadVolume || 'their past leads'}",
      "whatItMeans": "${baseAnalysis.leakageAreas[2]?.whatItMeans || ''}",
      "whyItMatters": "${baseAnalysis.leakageAreas[2]?.whyItMatters || ''}",
      "businessImpact": "Unmonetized historical contacts buying from competing brokers",
      "recommendation": "Broadcast launch landing pages with real-time intent triggers"
    },
    {
      "id": "mobile-ux",
      "name": "Mobile Property UX & Speed",
      "severity": "${baseAnalysis.leakageAreas[3]?.severity || 'moderate'}",
      "description": "Specific finding based on their Q7 mobile property experience answer",
      "whatItMeans": "${baseAnalysis.leakageAreas[3]?.whatItMeans || ''}",
      "whyItMatters": "${baseAnalysis.leakageAreas[3]?.whyItMatters || ''}",
      "businessImpact": "High mobile drop-off between inquiry and physical site visits",
      "recommendation": "Adopt responsive mobile-first interactive property pages"
    }
  ],
  "recommendations": [
    {
      "id": "rec-1",
      "title": "Step 1 Title specifically for ${formData.microMarket || 'their market'}",
      "description": "Actionable strategic recommendation",
      "impact": "Measurable business impact (e.g. Stops 4-to-1 broker lead sharing & reduces CAC by 60%)",
      "urgency": "Immediate"
    },
    {
      "id": "rec-2",
      "title": "Step 2 Title",
      "description": "Actionable strategic recommendation",
      "impact": "Measurable business impact",
      "urgency": "Immediate"
    },
    {
      "id": "rec-3",
      "title": "Step 3 Title for their database or SEO",
      "description": "Actionable strategic recommendation",
      "impact": "Measurable business impact",
      "urgency": "Medium-term"
    }
  ],
  "aiExecutiveAdvice": "A 2-sentence direct strategic takeaway for ${formData.fullName || 'the advisor'} on why launching their owned micro-market platform in ${formData.microMarket || 'their area'} is their highest ROI move."
}
`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are an expert AI real estate diagnostic analyst for Shakktii AI. You output strictly valid, clean JSON with zero conversational filler.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        response_format: { type: "json_object" },
        temperature: 0.6,
        max_tokens: 1200,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.warn("OpenAI API returned non-200:", response.status, errText);
      return baseAnalysis;
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content;

    if (!content) {
      return baseAnalysis;
    }

    const aiResult = JSON.parse(content);

    // Merge AI generated fields with verified deterministic score metrics and expandable details
    const mergedLeakageAreas = baseAnalysis.leakageAreas.map((baseArea, i) => {
      const aiArea = aiResult.leakageAreas?.[i];
      if (!aiArea) return baseArea;
      return {
        ...baseArea,
        name: aiArea.name || baseArea.name,
        severity: aiArea.severity || baseArea.severity,
        description: aiArea.description || baseArea.description,
        whatItMeans: aiArea.whatItMeans || baseArea.whatItMeans,
        whyItMatters: aiArea.whyItMatters || baseArea.whyItMatters,
        businessImpact: aiArea.businessImpact || baseArea.businessImpact,
        recommendation: aiArea.recommendation || baseArea.recommendation,
      };
    });

    const mergedRecommendations = baseAnalysis.recommendations.map((baseRec, i) => {
      const aiRec = aiResult.recommendations?.[i];
      if (!aiRec) return baseRec;
      return {
        ...baseRec,
        title: aiRec.title || baseRec.title,
        description: aiRec.description || baseRec.description,
        impact: aiRec.impact || baseRec.impact,
        urgency: aiRec.urgency || baseRec.urgency,
      };
    });

    return {
      ...baseAnalysis,
      isAiGenerated: true,
      summaryHeadline: aiResult.summaryHeadline || baseAnalysis.summaryHeadline,
      summaryText: aiResult.summaryText || baseAnalysis.summaryText,
      estimatedLeakage: aiResult.estimatedLeakage || baseAnalysis.estimatedLeakage,
      aiExecutiveAdvice: aiResult.aiExecutiveAdvice || "",
      leakageAreas: mergedLeakageAreas,
      recommendations: mergedRecommendations,
    };
  } catch (error) {
    console.error("OpenAI report generation error, falling back to base analysis:", error);
    return baseAnalysis;
  }
}
