import { saveVisit } from "../repositories/visitRepository.js";
import { cleanString } from "../utils/sanitize.js";

const maxFieldLength = 500;

const cleanLimitedString = (value, fallback = "") => {
  const cleaned = cleanString(value);
  return (cleaned || fallback).slice(0, maxFieldLength);
};

export const trackVisit = async (req, res) => {
  const visitorId = cleanLimitedString(req.body?.visitorId);
  const path = cleanLimitedString(req.body?.path, "/");

  if (!visitorId) {
    return res.status(400).json({ error: "Visitor id is required." });
  }

  await saveVisit({
    visitorId,
    path,
    referrer: cleanLimitedString(req.body?.referrer),
    userAgent: cleanLimitedString(req.get("user-agent")),
  });

  return res.status(204).send();
};
