import mongoose from "mongoose";
import Donation from "../models/Donation.js";

const verifiedPayments = new Map();

export const saveDonation = async (donation) => {
  if (mongoose.connection.readyState === 1) {
    return Donation.create(donation);
  }

  verifiedPayments.set(donation.invoiceId, {
    ...donation,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return verifiedPayments.get(donation.invoiceId);
};

export const findDonation = async (invoiceId) => {
  if (mongoose.connection.readyState === 1) {
    return Donation.findOne({ invoiceId }).lean();
  }

  return verifiedPayments.get(invoiceId);
};

export const findAllDonations = async () => {
  if (mongoose.connection.readyState === 1) {
    return Donation.find({}).sort({ createdAt: -1 }).lean();
  }

  return [...verifiedPayments.values()].sort(
    (first, second) => new Date(second.createdAt) - new Date(first.createdAt),
  );
};
