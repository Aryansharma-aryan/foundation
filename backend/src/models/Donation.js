import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    invoiceId: { type: String, required: true, unique: true },
    orderId: { type: String, required: true, index: true },
    paymentId: { type: String, required: true, index: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    status: { type: String, default: "paid" },
    donor: {
      fullName: String,
      email: String,
      phone: String,
      note: String,
    },
    billing: {
      addressLine1: String,
      addressLine2: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
      pan: String,
    },
  },
  { timestamps: true },
);

const Donation = mongoose.models.Donation || mongoose.model("Donation", donationSchema);

export default Donation;
