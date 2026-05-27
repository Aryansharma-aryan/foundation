import mongoose from "mongoose";

const visitSchema = new mongoose.Schema(
  {
    visitorId: { type: String, required: true, index: true },
    path: { type: String, required: true, index: true },
    referrer: String,
    userAgent: String,
  },
  { timestamps: true },
);

const Visit = mongoose.models.Visit || mongoose.model("Visit", visitSchema);

export default Visit;
