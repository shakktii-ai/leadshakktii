import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Audit from "@/lib/models/Audit";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Report ID is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const audit = await Audit.findOne({
      $or: [{ reportId: id }, { leadId: id }],
    }).lean();

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
