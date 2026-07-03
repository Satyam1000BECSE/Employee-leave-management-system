import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    action: {
      type: String,
      required: true,
    },

    entity: {
      type: String,
      enum: ["Leave", "User"],
    },

    entityId: {
      type: mongoose.Schema.Types.ObjectId,
    },

    details: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "AuditLog",
  auditLogSchema
);