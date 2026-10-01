import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Audit from "@/lib/models/Audit";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const phone = searchParams.get("phone");

    if (!id && !phone) {
      return NextResponse.json(
        { success: false, error: "Please provide either an 'id' (Report ID / Lead ID) or 'phone' number." },
        { status: 400 }
      );
    }

    await connectDB();

    let audit = null;

    if (id) {
      // Find by reportId or leadId
      audit = await Audit.findOne({
        $or: [{ reportId: id }, { leadId: id }],
      }).lean();
    } else if (phone) {
      const cleaned = String(phone).replace(/\D/g, "");
      const tenDigits = cleaned.slice(-10);

      if (tenDigits.length < 10) {
        return NextResponse.json(
          { success: false, error: "Invalid phone number. Please provide a valid 10-digit number." },
          { status: 400 }
        );
      }

      // Search matching phone with or without country code (+91)
      audit = await Audit.findOne({
        whatsappNumber: { $regex: tenDigits },
      })
        .sort({ createdAt: -1 })
        .lean();
    }

    if (!audit) {
      return NextResponse.json(
        {
          success: false,
          error: "No audit report found matching the provided details.",
        },
        { status: 404 }
      );
    }

    const reportId = audit.reportId || audit.leadId;
    const reportUrl = `/report/${reportId}`;

    return NextResponse.json(
      {
        success: true,
        reportId,
        reportUrl,
        report: audit,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching report:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Internal server error fetching report" },
      { status: 500 }
    );
  }
}
