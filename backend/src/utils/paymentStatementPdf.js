import path from "node:path";
import { fileURLToPath } from "node:url";
import PDFDocument from "pdfkit";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const logoPath = path.resolve(__dirname, "../../../client/src/assets/davisnew.jpeg");

const colors = {
  ink: "#2f241d",
  muted: "#756053",
  line: "#ead6c5",
  primary: "#e16a1f",
  primaryDark: "#b94f12",
  soft: "#fff5ec",
  pale: "#fffaf5",
  white: "#ffffff",
};

const formatAmount = (amount, currency = "INR") =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format((amount || 0) / 100);

const formatDate = (value) =>
  new Date(value || Date.now()).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const safeText = (value) => {
  if (value === 0) return "0";
  return value ? String(value) : "N/A";
};

const drawHeader = (doc, donations) => {
  const totalAmount = donations.reduce((sum, donation) => sum + (Number(donation.amount) || 0), 0);
  const uniqueUsers = new Set(
    donations
      .map((donation) => donation?.donor?.email || donation?.donor?.phone || donation?.donor?.fullName)
      .filter(Boolean)
      .map((value) => String(value).trim().toLowerCase()),
  );

  doc.rect(0, 0, doc.page.width, doc.page.height).fill(colors.pale);
  doc.roundedRect(24, 24, 794, 92, 12).fillAndStroke(colors.soft, colors.line);

  try {
    doc.image(logoPath, 44, 42, { fit: [48, 48], align: "center", valign: "center" });
  } catch {
    doc.circle(68, 66, 24).fill(colors.primary);
    doc.fillColor(colors.white).fontSize(12).font("Helvetica-Bold").text("DGF", 56, 61);
  }

  doc
    .font("Helvetica-Bold")
    .fontSize(19)
    .fillColor(colors.ink)
    .text("Davis Girdhar Foundation", 108, 42, { width: 300 });
  doc.font("Helvetica").fontSize(9).fillColor(colors.muted).text("Complete user payment statement", 108, 69);
  doc.font("Helvetica").fontSize(8.5).fillColor(colors.muted).text(`Generated: ${formatDate(new Date())}`, 108, 85);

  const summaryX = 492;
  [
    ["Users", uniqueUsers.size],
    ["Payments", donations.length],
    ["Received", formatAmount(totalAmount)],
  ].forEach(([label, value], index) => {
    const x = summaryX + index * 104;
    doc.roundedRect(x, 44, 92, 46, 8).fillAndStroke(colors.white, colors.line);
    doc.font("Helvetica-Bold").fontSize(7.5).fillColor(colors.muted).text(label.toUpperCase(), x + 10, 53);
    doc.font("Helvetica-Bold").fontSize(12).fillColor(index === 2 ? colors.primaryDark : colors.ink).text(String(value), x + 10, 67, {
      width: 72,
      ellipsis: true,
    });
  });
};

const columns = [
  { label: "#", x: 34, width: 28 },
  { label: "Date", x: 62, width: 78 },
  { label: "Donor", x: 144, width: 118 },
  { label: "Email", x: 266, width: 134 },
  { label: "Phone", x: 404, width: 78 },
  { label: "Amount", x: 486, width: 78 },
  { label: "Status", x: 568, width: 52 },
  { label: "Invoice", x: 624, width: 78 },
  { label: "Payment ID", x: 706, width: 102 },
];

const drawTableHeader = (doc, y) => {
  doc.roundedRect(24, y, 794, 24, 7).fill(colors.primary);

  columns.forEach((column) => {
    doc
      .font("Helvetica-Bold")
      .fontSize(7.5)
      .fillColor(colors.white)
      .text(column.label.toUpperCase(), column.x, y + 8, { width: column.width, ellipsis: true });
  });
};

const drawRow = (doc, donation, index, y) => {
  const fill = index % 2 === 0 ? colors.white : "#fffaf6";
  doc.rect(24, y, 794, 34).fillAndStroke(fill, colors.line);

  const values = [
    index + 1,
    formatDate(donation.createdAt),
    safeText(donation.donor?.fullName),
    safeText(donation.donor?.email),
    safeText(donation.donor?.phone),
    formatAmount(donation.amount, donation.currency),
    safeText(donation.status || "paid"),
    safeText(donation.invoiceId),
    safeText(donation.paymentId),
  ];

  columns.forEach((column, columnIndex) => {
    doc
      .font(columnIndex === 5 ? "Helvetica-Bold" : "Helvetica")
      .fontSize(7.2)
      .fillColor(columnIndex === 5 ? colors.primaryDark : colors.ink)
      .text(String(values[columnIndex]), column.x, y + 8, {
        width: column.width,
        height: 18,
        ellipsis: true,
      });
  });
};

const drawFooter = (doc, pageNumber) => {
  doc
    .font("Helvetica")
    .fontSize(7.5)
    .fillColor(colors.muted)
    .text(`Page ${pageNumber}`, 24, 566, { width: 794, align: "center" });
};

export const streamPaymentStatementPdf = (res, donations) => {
  const doc = new PDFDocument({ margin: 0, size: "A4", layout: "landscape", bufferPages: false });
  const filename = `payment-statement-${new Date().toISOString().slice(0, 10)}.pdf`;
  let pageNumber = 1;
  let y = 142;

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);

  doc.pipe(res);
  drawHeader(doc, donations);
  drawTableHeader(doc, 126);

  donations.forEach((donation, index) => {
    if (y > 520) {
      drawFooter(doc, pageNumber);
      doc.addPage({ margin: 0, size: "A4", layout: "landscape" });
      pageNumber += 1;
      doc.rect(0, 0, doc.page.width, doc.page.height).fill(colors.pale);
      drawTableHeader(doc, 34);
      y = 50;
    }

    drawRow(doc, donation, index, y);
    y += 34;
  });

  if (!donations.length) {
    doc
      .roundedRect(24, y, 794, 54, 8)
      .fillAndStroke(colors.white, colors.line)
      .font("Helvetica-Bold")
      .fontSize(12)
      .fillColor(colors.muted)
      .text("No verified payments found yet.", 44, y + 20, { width: 754, align: "center" });
  }

  drawFooter(doc, pageNumber);
  doc.end();
};
