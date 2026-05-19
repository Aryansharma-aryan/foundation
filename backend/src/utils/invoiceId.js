import crypto from "node:crypto";

export const makeInvoiceId = () =>
  `DGF-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}-${crypto
    .randomBytes(4)
    .toString("hex")
    .toUpperCase()}`;
