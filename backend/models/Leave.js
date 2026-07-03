import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    leaveType: {
      type: String,
      enum: [
        "Sick",
        "Casual",
        "Annual",
      ],
      required: true,
    },

    startDate: Date,

    endDate: Date,

    reason: String,

    status: {
      type: String,
      enum: [
        "Pending",
        "Approved",
        "Rejected",
        "Cancelled",
      ],

      default: "Pending",
    },

    managerComments: String,
  },

  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Leave",
  leaveSchema
);