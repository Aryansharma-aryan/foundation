import nodemailer from "nodemailer";
import { createInvoicePdfBuffer } from "../utils/invoicePdf.js";

const adminEmail = process.env.ADMIN_EMAIL || "info@davisgirdharfoundation.com";

const isEmailConfigured = () =>
  process.env.SMTP_HOST &&
  process.env.SMTP_PORT &&
  process.env.SMTP_USER &&
  process.env.SMTP_PASS;

const getTransporter = () =>
  nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

const sendMail = async (mailOptions) => {
  if (!isEmailConfigured()) {
    console.warn("SMTP is not configured. Email skipped:", mailOptions.subject);
    return { skipped: true };
  }

  const transporter = getTransporter();
  return transporter.sendMail({
    from: process.env.MAIL_FROM || `"Davis Girdhar Foundation" <${process.env.SMTP_USER}>`,
    ...mailOptions,
  });
};

export const sendContactNotification = async (contactMessage) =>
  sendMail({
    to: adminEmail,
    replyTo: contactMessage.email,
    subject: `New contact message: ${contactMessage.topic}`,
    html: `
      <div style="font-family:Arial,sans-serif;color:#33241a;line-height:1.6">
        <h2>New quick message received</h2>
        <p><strong>Name:</strong> ${contactMessage.fullName}</p>
        <p><strong>Email:</strong> ${contactMessage.email}</p>
        <p><strong>Phone:</strong> ${contactMessage.phone}</p>
        <p><strong>Topic:</strong> ${contactMessage.topic}</p>
        <p><strong>Message:</strong></p>
        <p>${contactMessage.message}</p>
      </div>
    `,
  });

export const sendDonationReceiptEmail = async (donation) => {
  const receiptBuffer = await createInvoicePdfBuffer(donation);

  return sendMail({
    to: adminEmail,
    subject: `Donation receipt generated: ${donation.invoiceId}`,
    html: `
      <div style="font-family:Arial,sans-serif;color:#33241a;line-height:1.6">
        <h2>Donation payment verified</h2>
        <p><strong>Receipt:</strong> ${donation.invoiceId}</p>
        <p><strong>Donor:</strong> ${donation.donor?.fullName || "N/A"}</p>
        <p><strong>Email:</strong> ${donation.donor?.email || "N/A"}</p>
        <p><strong>Phone:</strong> ${donation.donor?.phone || "N/A"}</p>
        <p><strong>Payment ID:</strong> ${donation.paymentId}</p>
        <p>The receipt PDF is attached.</p>
      </div>
    `,
    attachments: [
      {
        filename: `${donation.invoiceId}.pdf`,
        content: receiptBuffer,
        contentType: "application/pdf",
      },
    ],
  });
};
