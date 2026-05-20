import razorpay from "../config/razorpay.js";
import { saveDonation } from "../repositories/donationRepository.js";
import { sendDonationReceiptEmail } from "../services/emailService.js";
import { makeInvoiceId } from "../utils/invoiceId.js";
import { sendRazorpayError } from "../utils/razorpayErrors.js";
import { cleanString, isMissingRequiredDetails, normalizeDetails } from "../utils/sanitize.js";
import { verifySignature } from "../utils/signature.js";

export const createOrder = async (req, res) => {
  const amount = Number(req.body?.amount);
  const currency = cleanString(req.body?.currency) || "INR";
  const receipt = cleanString(req.body?.receipt) || `donation_${Date.now()}`;
  const details = normalizeDetails(req.body);

  if (!Number.isInteger(amount) || amount < 100) {
    return res.status(400).json({ error: "Amount must be at least 100 paise." });
  }

  if (isMissingRequiredDetails(details)) {
    return res.status(400).json({ error: "Please provide all required donor and billing details." });
  }

  try {
    const order = await razorpay.orders.create({
      amount,
      currency,
      receipt: receipt.slice(0, 40),
      notes: {
        donor_name: details.donor.fullName,
        donor_email: details.donor.email,
        donor_phone: details.donor.phone,
        billing_city: details.billing.city,
        billing_state: details.billing.state,
        billing_postal_code: details.billing.postalCode,
      },
    });

    return res.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      key_id: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    return sendRazorpayError(res, error, "Unable to create Razorpay order.");
  }
};

export const verifyPayment = async (req, res) => {
  const orderId = cleanString(req.body?.razorpay_order_id);
  const paymentId = cleanString(req.body?.razorpay_payment_id);
  const signature = cleanString(req.body?.razorpay_signature);
  const details = normalizeDetails(req.body);

  if (!orderId || !paymentId || !signature) {
    return res.status(400).json({ error: "Missing Razorpay payment verification fields." });
  }

  if (isMissingRequiredDetails(details)) {
    return res.status(400).json({ error: "Missing required donor or billing details." });
  }

  if (!verifySignature({ orderId, paymentId, signature })) {
    return res.status(400).json({ error: "Payment signature mismatch." });
  }

  try {
    const order = await razorpay.orders.fetch(orderId);
    const invoiceId = makeInvoiceId();
    const donation = await saveDonation({
      invoiceId,
      orderId,
      paymentId,
      amount: order.amount,
      currency: order.currency,
      status: "paid",
      ...details,
    });

    sendDonationReceiptEmail(donation).catch((error) => {
      console.error("Donation receipt email failed.", error);
    });

    return res.json({
      success: true,
      invoice_id: donation.invoiceId,
      download_url: `/api/invoices/${donation.invoiceId}/download`,
    });
  } catch (error) {
    return sendRazorpayError(res, error, "Payment verified, but invoice generation failed.");
  }
};
