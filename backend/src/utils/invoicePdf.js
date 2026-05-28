import path from "node:path";
import { fileURLToPath } from "node:url";
import PDFDocument from "pdfkit";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const logoPath = path.resolve(__dirname, "../../../client/src/assets/dlogo.jpeg");
const cinNumber = "U85490HR2025NPL129674";

const colors = {
  ink: "#2f241d",
  muted: "#756053",
  line: "#ead6c5",
  primary: "#e16a1f",
  primaryDark: "#b94f12",
  soft: "#fff5ec",
  pale: "#fffaf5",
  success: "#167a3f",
};

const page = {
  left: 42,
  right: 553,
  width: 511,
};

const formatAmountNumber = (amount) =>
  new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format((amount || 0) / 100);

const ones = [
  "",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
  "Fifteen",
  "Sixteen",
  "Seventeen",
  "Eighteen",
  "Nineteen",
];

const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

const twoDigitWords = (number) => {
  if (number < 20) return ones[number];
  return [tens[Math.floor(number / 10)], ones[number % 10]].filter(Boolean).join(" ");
};

const threeDigitWords = (number) => {
  const hundred = Math.floor(number / 100);
  const rest = number % 100;
  return [hundred ? `${ones[hundred]} Hundred` : "", rest ? twoDigitWords(rest) : ""].filter(Boolean).join(" ");
};

const integerToIndianWords = (number) => {
  if (!number) return "Zero";

  const parts = [
    { value: Math.floor(number / 10000000), label: "Crore" },
    { value: Math.floor((number % 10000000) / 100000), label: "Lakh" },
    { value: Math.floor((number % 100000) / 1000), label: "Thousand" },
    { value: number % 1000, label: "" },
  ];

  return parts
    .filter((part) => part.value)
    .map((part) => `${part.value < 100 ? twoDigitWords(part.value) : threeDigitWords(part.value)} ${part.label}`.trim())
    .join(" ");
};

const formatAmountWords = (amount) => {
  const totalPaise = Math.max(0, Number(amount) || 0);
  const rupees = Math.floor(totalPaise / 100);
  const paise = totalPaise % 100;
  const rupeeText = `Indian Rupees ${integerToIndianWords(rupees)}`;

  if (!paise) return `${rupeeText} Only`;
  return `${rupeeText} and ${twoDigitWords(paise)} Paise Only`;
};

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

const drawLabelValue = (doc, label, value, x, y, width, options = {}) => {
  const valueSize = options.valueSize || 10;
  const valueHeight = options.valueHeight || 34;

  doc.font("Helvetica-Bold").fontSize(8).fillColor(colors.muted).text(label.toUpperCase(), x, y, {
    width,
    characterSpacing: 0.35,
  });
  doc.font("Helvetica").fontSize(valueSize).fillColor(colors.ink).text(safeText(value), x, y + 14, {
    width,
    height: valueHeight,
    ellipsis: true,
    lineGap: 2,
  });
};

const drawSectionTitle = (doc, title, y) => {
  doc
    .roundedRect(page.left, y, 5, 20, 2)
    .fill(colors.primary);
  doc.font("Helvetica-Bold").fontSize(13).fillColor(colors.ink).text(title, page.left + 14, y + 2);
};

const drawCard = (doc, x, y, width, height) => {
  doc.roundedRect(x, y, width, height, 10).fillAndStroke("#ffffff", colors.line);
};

const drawDivider = (doc, y) => {
  doc.moveTo(page.left, y).lineTo(page.right, y).lineWidth(0.8).strokeColor(colors.line).stroke();
};

const drawRupeeSymbol = (doc, x, y, size, color) => {
  const scale = size / 24;
  const stroke = 2.3 * scale;

  doc
    .save()
    .lineWidth(stroke)
    .lineCap("round")
    .lineJoin("round")
    .strokeColor(color)
    .moveTo(x + 2 * scale, y + 1 * scale)
    .lineTo(x + 20 * scale, y + 1 * scale)
    .moveTo(x + 2 * scale, y + 7 * scale)
    .lineTo(x + 20 * scale, y + 7 * scale)
    .moveTo(x + 5 * scale, y + 1 * scale)
    .lineTo(x + 11 * scale, y + 1 * scale)
    .bezierCurveTo(x + 20 * scale, y + 1 * scale, x + 20 * scale, y + 15 * scale, x + 8 * scale, y + 15 * scale)
    .lineTo(x + 4 * scale, y + 15 * scale)
    .lineTo(x + 17 * scale, y + 25 * scale)
    .stroke()
    .restore();
};

const drawHeader = (doc, donation) => {
  doc.roundedRect(28, 28, 539, 785, 14).fillAndStroke("#ffffff", colors.line);
  doc.rect(28, 28, 539, 142).fill(colors.soft);
  doc.rect(28, 166, 539, 4).fill(colors.primary);

  try {
    doc.image(logoPath, 55, 54, { fit: [76, 76], align: "center", valign: "center" });
  } catch {
    doc.circle(93, 92, 38).fill(colors.primary);
    doc.fillColor("#ffffff").fontSize(18).font("Helvetica-Bold").text("DGF", 72, 82);
  }

  doc
    .font("Helvetica-Bold")
    .fontSize(21)
    .fillColor(colors.ink)
    .text("Davis Girdhar Foundation", 150, 52, { width: 280 });
  doc
    .font("Helvetica")
    .fontSize(9.5)
    .fillColor(colors.muted)
    .text("C/o Sh. Sham Das, Umri, Mathana, Umri Thanesar", 150, 82, { width: 300 })
    .text("Kurukshetra, Haryana, 136131, India", 150, 97, { width: 300 })
    .text(`CIN: ${cinNumber}`, 150, 112, { width: 300 })
    .text("Donation Receipt", 150, 128, { width: 300 });

  doc.roundedRect(430, 54, 94, 34, 17).fill("#e8f7ef");
  doc.font("Helvetica-Bold").fontSize(12).fillColor(colors.success).text("PAID", 430, 64, {
    width: 94,
    align: "center",
  });

  drawLabelValue(doc, "Receipt No.", donation.invoiceId, 430, 104, 105);
};

const drawReceiptSummary = (doc, donation) => {
  const y = 198;
  drawCard(doc, page.left, y, 246, 116);
  drawCard(doc, page.left + 265, y, 246, 116);

  doc.font("Helvetica-Bold").fontSize(9).fillColor(colors.muted).text("DONATION AMOUNT", page.left + 18, y + 18);
  doc
    .font("Helvetica-Bold")
    .fontSize(24)
    .fillColor(colors.primaryDark)
    .text(formatAmountNumber(donation.amount), page.left + 48, y + 36, { width: 180 });
  drawRupeeSymbol(doc, page.left + 18, y + 39, 25, colors.primaryDark);
  doc
    .font("Helvetica-Bold")
    .fontSize(8)
    .fillColor(colors.muted)
    .text("AMOUNT IN WORDS", page.left + 18, y + 72, { width: 210, characterSpacing: 0.35 });
  doc
    .font("Helvetica")
    .fontSize(9.2)
    .fillColor(colors.ink)
    .text(formatAmountWords(donation.amount), page.left + 18, y + 86, {
      width: 210,
      height: 24,
      ellipsis: true,
      lineGap: 1,
    });

  drawLabelValue(doc, "Receipt Date", formatDate(donation.createdAt), page.left + 283, y + 18, 100);
  drawLabelValue(doc, "Currency", donation.currency, page.left + 405, y + 18, 95);
  drawLabelValue(doc, "Payment Status", donation.status || "paid", page.left + 283, y + 70, 100);
  drawLabelValue(doc, "Mode", "Razorpay Checkout", page.left + 405, y + 70, 95);
};

const drawDonorAndBilling = (doc, donation) => {
  const y = 346;
  drawSectionTitle(doc, "Donor and Billing Details", y);

  drawCard(doc, page.left, y + 34, 246, 136);
  drawCard(doc, page.left + 265, y + 34, 246, 136);

  drawLabelValue(doc, "Donor Name", donation.donor?.fullName, page.left + 18, y + 52, 210);
  drawLabelValue(doc, "Email", donation.donor?.email, page.left + 18, y + 88, 210, { valueSize: 9.4 });
  drawLabelValue(doc, "Phone", donation.donor?.phone, page.left + 18, y + 124, 210);

  const address = [donation.billing?.addressLine1, donation.billing?.addressLine2].filter(Boolean).join(", ");
  const cityLine = [donation.billing?.city, donation.billing?.state, donation.billing?.postalCode]
    .filter(Boolean)
    .join(", ");

  drawLabelValue(doc, "Billing Address", address, page.left + 283, y + 52, 210, { valueSize: 9.4, valueHeight: 32 });
  drawLabelValue(doc, "City / State / PIN", cityLine, page.left + 283, y + 92, 210);
  drawLabelValue(doc, "Country / PAN", `${safeText(donation.billing?.country)} / ${safeText(donation.billing?.pan)}`, page.left + 283, y + 128, 210);
};

const drawPaymentReferences = (doc, donation) => {
  const y = 548;
  drawSectionTitle(doc, "Payment Reference", y);
  drawCard(doc, page.left, y + 34, page.width, 86);

  drawLabelValue(doc, "Razorpay Payment ID", donation.paymentId, page.left + 18, y + 52, 230, { valueSize: 9.2 });
  drawLabelValue(doc, "Razorpay Order ID", donation.orderId, page.left + 270, y + 52, 220, { valueSize: 9.2 });
  drawLabelValue(doc, "Donation Note", donation.donor?.note || "No note provided", page.left + 18, y + 88, 475, { valueSize: 9.2, valueHeight: 24 });
};

const drawFooter = (doc) => {
  const y = 674;
  drawDivider(doc, y);

  doc
    .font("Helvetica-Bold")
    .fontSize(10)
    .fillColor(colors.ink)
    .text("Verification", page.left, y + 18);
  doc
    .font("Helvetica")
    .fontSize(9.5)
    .fillColor(colors.muted)
    .text(
      "This receipt was generated only after successful Razorpay signature verification on the Davis Girdhar Foundation server.",
      page.left,
      y + 36,
      { width: page.width, lineGap: 2 },
    );

  doc
    .font("Helvetica")
    .fontSize(8)
    .fillColor("#9a8575")
    .text("Computer-generated receipt. No physical signature is required.", page.left, 784, {
      width: page.width,
      align: "center",
    });
};

const renderInvoice = (doc, donation) => {
  doc.rect(0, 0, doc.page.width, doc.page.height).fill(colors.pale);
  drawHeader(doc, donation);
  drawReceiptSummary(doc, donation);
  drawDonorAndBilling(doc, donation);
  drawPaymentReferences(doc, donation);
  drawFooter(doc);
};

export const createInvoicePdfBuffer = (donation) =>
  new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 0, size: "A4", bufferPages: false });
    const chunks = [];

    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    renderInvoice(doc, donation);
    doc.end();
  });

export const streamInvoicePdf = (res, donation) => {
  const doc = new PDFDocument({ margin: 0, size: "A4", bufferPages: false });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename="${donation.invoiceId}.pdf"`);

  doc.pipe(res);
  renderInvoice(doc, donation);
  doc.end();
};
