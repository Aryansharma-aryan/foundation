import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { findAllContactMessages } from "../repositories/contactRepository.js";
import { findAllDonations } from "../repositories/donationRepository.js";
import { cleanString } from "../utils/sanitize.js";
import { streamPaymentStatementPdf } from "../utils/paymentStatementPdf.js";

const periodDefinitions = [
  { key: "last24Hours", label: "Last 24 hours", days: 1 },
  { key: "last7Days", label: "Last 7 days", days: 7 },
  { key: "last30Days", label: "Last 30 days", days: 30 },
];

const getDonorKey = (donation) =>
  cleanString(donation?.donor?.email || donation?.donor?.phone || donation?.donor?.fullName).toLowerCase();

const buildDonationAnalytics = (donations) => {
  const now = Date.now();

  return periodDefinitions.map((period) => {
    const startsAt = new Date(now - period.days * 24 * 60 * 60 * 1000);
    const periodDonations = donations.filter((donation) => new Date(donation.createdAt) >= startsAt);
    const uniqueDonors = new Set(periodDonations.map(getDonorKey).filter(Boolean));

    return {
      key: period.key,
      label: period.label,
      startsAt,
      userCount: uniqueDonors.size,
      paymentCount: periodDonations.length,
      totalAmount: periodDonations.reduce((sum, donation) => sum + (Number(donation.amount) || 0), 0),
    };
  });
};

const makeToken = () =>
  jwt.sign(
    {
      role: "admin",
      email: process.env.ADMIN_EMAIL,
    },
    process.env.JWT_SECRET,
    { expiresIn: "8h" },
  );

export const loginAdmin = async (req, res) => {
  const email = cleanString(req.body?.email).toLowerCase();
  const password = typeof req.body?.password === "string" ? req.body.password : "";

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD_HASH || !process.env.JWT_SECRET) {
    return res.status(500).json({ error: "Admin authentication is not configured." });
  }

  const isEmailValid = email === process.env.ADMIN_EMAIL.toLowerCase();
  const isPasswordValid = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH);

  if (!isEmailValid || !isPasswordValid) {
    return res.status(401).json({ error: "Invalid admin credentials." });
  }

  return res.json({
    token: makeToken(),
    admin: { email: process.env.ADMIN_EMAIL },
  });
};

export const getAdminDonations = async (_req, res) => {
  const donations = await findAllDonations();

  return res.json({
    donations: donations.map((donation) => ({
      invoiceId: donation.invoiceId,
      orderId: donation.orderId,
      paymentId: donation.paymentId,
      amount: donation.amount,
      currency: donation.currency,
      status: donation.status,
      donor: donation.donor,
      billing: donation.billing,
      createdAt: donation.createdAt,
      receiptUrl: `/api/invoices/${donation.invoiceId}/download`,
    })),
  });
};

export const getAdminAnalytics = async (_req, res) => {
  const donations = await findAllDonations();
  const uniqueDonors = new Set(donations.map(getDonorKey).filter(Boolean));

  return res.json({
    totals: {
      users: uniqueDonors.size,
      payments: donations.length,
      receivedAmount: donations.reduce((sum, donation) => sum + (Number(donation.amount) || 0), 0),
    },
    periods: buildDonationAnalytics(donations),
  });
};

export const downloadPaymentStatement = async (_req, res) => {
  const donations = await findAllDonations();
  return streamPaymentStatementPdf(res, donations);
};

export const getAdminContactMessages = async (_req, res) => {
  const messages = await findAllContactMessages();

  return res.json({
    messages: messages.map((message) => ({
      id: message._id,
      fullName: message.fullName,
      phone: message.phone,
      email: message.email,
      topic: message.topic,
      message: message.message,
      status: message.status,
      createdAt: message.createdAt,
    })),
  });
};
