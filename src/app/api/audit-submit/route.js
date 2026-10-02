import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Audit from "@/lib/models/Audit";
import { generateOpenAIReport } from "@/lib/openaiService";
import { memoryStore } from "@/lib/memoryStore";

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

    // Generate personalized AI Diagnostic Report using OpenAI or fallback rule engine
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

    const auditPayload = {
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
      createdAt: new Date().toISOString(),
    };

    // 1. Always save to in-memory store for instant zero-config availability
    memoryStore.saveAudit(auditPayload);

    // 2. If MongoDB is configured, save to database as well
    try {
      const conn = await connectDB();
      if (conn) {
        await Audit.create(auditPayload);
      }
    } catch (dbError) {
      console.warn("MongoDB persistence skipped, saved in memory store:", dbError?.message);
    }

    // Return the response with unique reportId and reportUrl
    return NextResponse.json(
      {
        success: true,
        message: "Audit successfully generated",
        leadId,
        reportId,
        reportUrl: `/report/${reportId}`,
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
