import { findDonation } from "../repositories/donationRepository.js";
import { cleanString } from "../utils/sanitize.js";
import { streamInvoicePdf } from "../utils/invoicePdf.js";

export const downloadInvoice = async (req, res) => {
  const invoiceId = cleanString(req.params.invoiceId);
  const donation = await findDonation(invoiceId);

  if (!donation) {
    return res.status(404).json({ error: "Invoice not found." });
  }

  return streamInvoicePdf(res, donation);
};
