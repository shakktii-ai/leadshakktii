import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Audit from "@/lib/models/Audit";
import { calculateAuditAnalysis } from "@/utils/auditScorer";

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

    // Recalculate analysis on the server for consistency and security
    const serverAnalysis = calculateAuditAnalysis(
      answers || {},
      formData
    );

    const leadId = `lead_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 7)}`;

    // Connect to MongoDB Atlas
    await connectDB();

    // Save the complete audit submission
    const savedAudit = await Audit.create({
      leadId,
      fullName: formData.fullName.trim(),
      firmName: formData.firmName.trim(),
      microMarket: formData.microMarket?.trim() || "",
      whatsappNumber: `+91${cleanedPhone}`,
      crmLeadVolume: formData.crmLeadVolume,

      answers: answers || {},
      formData,
      analysis: serverAnalysis,

      score: serverAnalysis.totalScore,
      riskLevel: serverAnalysis.riskLevel,
      statusLabel: serverAnalysis.statusLabel,
      answersCount: Object.keys(answers || {}).length,
    });

    // Respond after MongoDB confirms the save
    return NextResponse.json(
      {
        success: true,
        message: "Audit successfully saved to MongoDB",
        leadId: savedAudit.leadId,
        analysis: serverAnalysis,
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
