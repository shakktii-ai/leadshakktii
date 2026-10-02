import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Audit from "@/lib/models/Audit";
import { memoryStore } from "@/lib/memoryStore";

export async function GET() {
  try {
    let leads = [];

    // 1. Try querying MongoDB if available
    try {
      const conn = await connectDB();
      if (conn) {
        leads = await Audit.find({}).sort({ createdAt: -1 }).lean();
      }
    } catch (dbError) {
      console.warn("MongoDB admin query error, falling back to memory store:", dbError?.message);
    }

    // 2. Merge or fallback to memoryStore if no DB records found
    if (!leads || leads.length === 0) {
      leads = memoryStore.getAllAudits();
    }

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

    let deleted = null;

    try {
      const conn = await connectDB();
      if (conn) {
        deleted = await Audit.findOneAndDelete({ leadId });
      }
    } catch (dbError) {
      console.warn("MongoDB delete error, falling back to memory store:", dbError?.message);
    }

    if (!deleted) {
      deleted = memoryStore.deleteAudit(leadId);
    }

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Lead record not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Lead record deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting lead:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
