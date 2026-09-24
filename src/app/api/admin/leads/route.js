import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Audit from "@/lib/models/Audit";

export async function GET() {
  try {
    await connectDB();

    const leads = await Audit.find({}).sort({ createdAt: -1 }).lean();

    const totalLeads = leads.length;
    const highRiskCount = leads.filter((l) => l.riskLevel === "high").length;
    const moderateRiskCount = leads.filter((l) => l.riskLevel === "moderate").length;
    const lowRiskCount = leads.filter((l) => l.riskLevel === "low").length;
    const avgScore =
      totalLeads > 0
        ? (leads.reduce((acc, curr) => acc + (curr.score || 0), 0) / totalLeads).toFixed(1)
        : 0;

    return NextResponse.json(
      {
        success: true,
        stats: {
          totalLeads,
          highRiskCount,
          moderateRiskCount,
          lowRiskCount,
          avgScore,
        },
        leads,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching admin leads:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to fetch leads" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const leadId = searchParams.get("leadId");

    if (!leadId) {
      return NextResponse.json(
        { success: false, error: "leadId is required" },
        { status: 400 }
      );
    }

    await connectDB();
    const deleted = await Audit.findOneAndDelete({ leadId });

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Lead record not found" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: `Lead ${leadId} deleted successfully`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting lead:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to delete lead" },
      { status: 500 }
    );
  }
}
