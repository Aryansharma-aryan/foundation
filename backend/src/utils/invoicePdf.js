import PDFDocument from "pdfkit";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const logoPath = path.resolve(__dirname, "../../../client/src/assets/logo.jpeg");

const formatAmount = (amount, currency = "INR") =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format((amount || 0) / 100);

const drawRow = (doc, label, value) => {
  doc.font("Helvetica-Bold").text(`${label}: `, { continued: true });
  doc.font("Helvetica").text(value || "N/A");
};

export const streamInvoicePdf = (res, donation) => {
  const doc = new PDFDocument({ margin: 48, size: "A4" });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename="${donation.invoiceId}.pdf"`);

  doc.pipe(res);

  doc
    .roundedRect(36, 36, 523, 760, 12)
    .lineWidth(1)
    .strokeColor("#f0d7c0")
    .stroke();

  doc.rect(36, 36, 523, 118).fill("#fff6ee");
  doc.fillColor("#33241a");

  try {
    doc.image(logoPath, 58, 56, { width: 72, height: 72, fit: [72, 72] });
  } catch {
    doc.circle(94, 92, 36).fill("#e16a1f");
    doc.fillColor("#ffffff").fontSize(18).font("Helvetica-Bold").text("DGF", 74, 82);
  }

  doc.fillColor("#33241a").fontSize(20).font("Helvetica-Bold").text("Davis Girdhar Foundation", 150, 58);
  doc
    .fontSize(10)
    .font("Helvetica")
    .fillColor("#7b6150")
    .text("C/o Sh. Sham Das, Umri, Mathana, Umri Thanesar, Kurukshetra, Haryana, 136131", 150, 86, {
      width: 350,
    })
    .text("Donation Receipt / Invoice", 150, 116);

  doc
    .fillColor("#e16a1f")
    .fontSize(16)
    .font("Helvetica-Bold")
    .text("PAID", 455, 58, { width: 70, align: "center" });

  doc.moveDown(5);
  doc.fillColor("#33241a");

  doc.fontSize(12);
  drawRow(doc, "Invoice ID", donation.invoiceId);
  drawRow(doc, "Invoice Date", new Date(donation.createdAt || Date.now()).toLocaleString("en-IN"));
  drawRow(doc, "Payment Status", donation.status);
  drawRow(doc, "Payment ID", donation.paymentId);
  drawRow(doc, "Order ID", donation.orderId);

  doc.moveDown();
  doc.fontSize(14).font("Helvetica-Bold").text("Donor Details");
  doc.moveDown(0.4);
  doc.fontSize(12);
  drawRow(doc, "Name", donation.donor?.fullName);
  drawRow(doc, "Email", donation.donor?.email);
  drawRow(doc, "Phone", donation.donor?.phone);

  doc.moveDown();
  doc.fontSize(14).font("Helvetica-Bold").text("Billing Details");
  doc.moveDown(0.4);
  doc.fontSize(12);
  drawRow(doc, "Address", [donation.billing?.addressLine1, donation.billing?.addressLine2].filter(Boolean).join(", "));
  drawRow(doc, "City", donation.billing?.city);
  drawRow(doc, "State", donation.billing?.state);
  drawRow(doc, "Postal Code", donation.billing?.postalCode);
  drawRow(doc, "Country", donation.billing?.country);
  drawRow(doc, "PAN", donation.billing?.pan);

  doc.moveDown();
  doc.fontSize(14).font("Helvetica-Bold").text("Donation Summary");
  doc.moveDown(0.4);
  doc.fontSize(12);
  drawRow(doc, "Amount", formatAmount(donation.amount, donation.currency));
  drawRow(doc, "Currency", donation.currency);
  drawRow(doc, "Note", donation.donor?.note);

  doc.moveDown(2);
  doc
    .fontSize(10)
    .fillColor("#555")
    .text("This receipt was generated after successful Razorpay signature verification. Please keep it for your records.");

  doc.moveDown(0.75);
  doc
    .fontSize(9)
    .fillColor("#8a5b38")
    .text(
      "Important: Davis Girdhar Foundation is not associated with Form 12A/Form 10AC or Form 80G/Form 10AC for this receipt; tax benefit eligibility is not claimed here.",
      { lineGap: 2 },
    );

  doc.end();
};
