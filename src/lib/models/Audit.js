import mongoose, { Schema } from "mongoose";

const AuditSchema = new Schema(
  {
    leadId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    reportId: {
      type: String,
      unique: true,
      sparse: true,
      index: true,
    },
    fullName: { type: String, required: true },
    firmName: { type: String, required: true },
    microMarket: { type: String, default: "" },
    whatsappNumber: { type: String, required: true, index: true },
    crmLeadVolume: { type: Schema.Types.Mixed },
    monthlyPortalSpend: { type: String, default: "" },
    monthlyBuyerLeads: { type: String, default: "" },
    brokeragePerBooking: { type: String, default: "" },

    // Store all submitted answers
    answers: {
      type: Schema.Types.Mixed,
      default: {},
    },

    // Store the submitted form details
    formData: {
      type: Schema.Types.Mixed,
      required: true,
    },

    // Store calculated audit results
    analysis: {
      type: Schema.Types.Mixed,
      required: true,
    },

    score: Number,
    riskLevel: String,
    statusLabel: String,
    answersCount: Number,
  },
  { timestamps: true }
);

// Fallback index to ensure fast search by phone and reportId
AuditSchema.index({ whatsappNumber: 1, createdAt: -1 });

const Audit = mongoose.models.Audit || mongoose.model("Audit", AuditSchema);

export default Audit;

