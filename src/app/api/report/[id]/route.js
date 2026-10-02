import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Audit from "@/lib/models/Audit";
import { memoryStore } from "@/lib/memoryStore";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Report ID is required" },
        { status: 400 }
      );
    }

    let audit = null;

    // 1. Try querying MongoDB if available
    try {
      const conn = await connectDB();
      if (conn) {
        audit = await Audit.findOne({
          $or: [{ reportId: id }, { leadId: id }],
        }).lean();
      }
    } catch (dbError) {
      console.warn("MongoDB query error, falling back to memory store:", dbError?.message);
    }

    // 2. If not found in DB or DB not configured, check memory store
    if (!audit) {
      audit = memoryStore.findAuditById(id);
    }

    if (!audit) {
      return NextResponse.json(
        { success: false, error: "Report not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        reportId: audit.reportId || audit.leadId,
        report: audit,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching report by id:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
