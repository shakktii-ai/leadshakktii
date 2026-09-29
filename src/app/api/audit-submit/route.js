import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Audit from "@/lib/models/Audit";
import { generateOpenAIReport } from "@/lib/openaiService";

export async function POST(request) {
  try {
    const body = await request.json();
    const { answers, formData } = body || {};

    if (
      !formData ||
      !formData.fullName?.trim() ||
      !formData.firmName?.trim() ||
      !formData.whatsappNumber
    ) {
      return NextResponse.json(
        { error: "Missing required lead details" },
        { status: 400 }
      );
    }

    // Validate Indian 10-digit mobile number
    const cleanedPhone = String(formData.whatsappNumber).replace(/\D/g, "");

    if (!/^[6-9]\d{9}$/.test(cleanedPhone)) {
      return NextResponse.json(
        {
          error: "Invalid 10-digit Indian WhatsApp number format",
        },
        { status: 400 }
      );
    }

    if (!formData.consent) {
      return NextResponse.json(
        { error: "Consent is required to generate the audit report" },
        { status: 400 }
      );
    }

    // Generate personalized AI Diagnostic Report using OpenAI
    const reportAnalysis = await generateOpenAIReport({
      answers: answers || {},
      formData,
    });

    const leadId = `lead_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 7)}`;

    // Generate a clean, branded Unique Report ID (e.g., RPT-M9X2-K7P)
    const reportId = `RPT-${Date.now().toString(36).toUpperCase()}-${Math.random()
      .toString(36)
      .substring(2, 6)
      .toUpperCase()}`;

    // Connect to MongoDB Atlas
    await connectDB();

    // Save the complete audit submission with AI report to MongoDB
    const savedAudit = await Audit.create({
      leadId,
      reportId,
      fullName: formData.fullName.trim(),
      firmName: formData.firmName.trim(),
      microMarket: formData.microMarket?.trim() || "",
      whatsappNumber: `+91${cleanedPhone}`,
      crmLeadVolume: formData.crmLeadVolume,
      monthlyPortalSpend: formData.monthlyPortalSpend?.trim?.() || String(formData.monthlyPortalSpend || ""),
      monthlyBuyerLeads: formData.monthlyBuyerLeads?.trim?.() || String(formData.monthlyBuyerLeads || ""),
      brokeragePerBooking: formData.brokeragePerBooking?.trim?.() || String(formData.brokeragePerBooking || ""),

      answers: answers || {},
      formData,
      analysis: reportAnalysis,

      score: reportAnalysis.totalScore,
      riskLevel: reportAnalysis.riskLevel,
      statusLabel: reportAnalysis.statusLabel,
      answersCount: Object.keys(answers || {}).length,
    });

    // Return the response with unique reportId and reportUrl
    return NextResponse.json(
      {
        success: true,
        message: "Audit successfully generated with OpenAI and saved to MongoDB",
        leadId: savedAudit.leadId,
        reportId: savedAudit.reportId,
        reportUrl: `/report/${savedAudit.reportId}`,
        analysis: reportAnalysis,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Error in /api/audit-submit:", error);

    return NextResponse.json(
      { error: error?.message || "Internal server error while processing audit" },
      { status: 500 }
    );
  }
}

