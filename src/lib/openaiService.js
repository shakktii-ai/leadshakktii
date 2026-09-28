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
- Calculated Risk Score: ${baseAnalysis.totalScore} / 18 (${baseAnalysis.riskLevel.toUpperCase()} RISK)

QUESTIONS & ANSWERS SUBMITTED:
${baseAnalysis.answersSummary
  .map(
    (a, idx) =>
      `Q${idx + 1} (${a.category}): "${a.question}" -> Chosen Answer: "${a.selectedOptionText}" (Risk points: ${a.riskPoints})`
  )
  .join("\n")}

Respond ONLY with a valid JSON object formatted as follows (no markdown fences, pure JSON):
{
  "summaryHeadline": "A powerful 8-12 word executive diagnostic headline specifically referencing ${formData.firmName || 'their firm'} and ${formData.microMarket || 'their micro-market'}",
  "summaryText": "A 3-4 sentence consultative diagnostic assessment addressing ${formData.firmName || 'their firm'} and ${formData.microMarket || 'their micro-market'}, explaining where their high-intent buyers are currently leaking to competing brokers/portals and how an owned website system eliminates this leakage.",
  "estimatedLeakage": "Estimated annual brokerage revenue lost (e.g. '₹15 Lakhs - ₹35 Lakhs / yr')",
  "leakageAreas": [
    {
      "name": "Portal Lead Exclusivity",
      "severity": "${baseAnalysis.leakageAreas[0]?.severity || 'critical'}",
      "description": "Specific finding based on their Q1 portal answer"
    },
    {
      "name": "Client Diversion Prevention",
      "severity": "${baseAnalysis.leakageAreas[1]?.severity || 'critical'}",
      "description": "Specific finding based on their Q2 PDF/brochure sharing answer"
    },
    {
      "name": "CRM Database Reactivation",
      "severity": "${baseAnalysis.leakageAreas[2]?.severity || 'moderate'}",
      "description": "Specific finding based on their Q3 database answer regarding ${formData.crmLeadVolume || 'their past leads'}"
    },
    {
      "name": "Mobile Property UX",
      "severity": "${baseAnalysis.leakageAreas[3]?.severity || 'moderate'}",
      "description": "Specific finding based on their Q7 mobile property experience answer"
    }
  ],
  "recommendations": [
    {
      "title": "Step 1 Title specifically for ${formData.microMarket || 'their market'}",
      "description": "Actionable strategic recommendation",
      "impact": "Measurable business impact (e.g. Stops 4-to-1 broker lead sharing & reduces CAC by 60%)",
      "urgency": "Immediate"
    },
    {
      "title": "Step 2 Title",
      "description": "Actionable strategic recommendation",
      "impact": "Measurable business impact",
      "urgency": "Immediate"
    },
    {
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

    // Merge AI generated fields with verified deterministic score metrics
    return {
      ...baseAnalysis,
      isAiGenerated: true,
      summaryHeadline: aiResult.summaryHeadline || baseAnalysis.summaryHeadline,
      summaryText: aiResult.summaryText || baseAnalysis.summaryText,
      estimatedLeakage: aiResult.estimatedLeakage || "₹12 Lakhs - ₹35 Lakhs / yr",
      aiExecutiveAdvice: aiResult.aiExecutiveAdvice || "",
      leakageAreas: Array.isArray(aiResult.leakageAreas) && aiResult.leakageAreas.length > 0
        ? aiResult.leakageAreas
        : baseAnalysis.leakageAreas,
      recommendations: Array.isArray(aiResult.recommendations) && aiResult.recommendations.length > 0
        ? aiResult.recommendations
        : baseAnalysis.recommendations,
    };
  } catch (error) {
    console.error("OpenAI report generation error, falling back to base analysis:", error);
    return baseAnalysis;
  }
}
