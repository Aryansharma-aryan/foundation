import { saveContactMessage } from "../repositories/contactRepository.js";
import { sendContactNotification } from "../services/emailService.js";
import { cleanString } from "../utils/sanitize.js";

const normalizeContactMessage = (body) => ({
  fullName: cleanString(body?.fullName),
  phone: cleanString(body?.phone),
  email: cleanString(body?.email).toLowerCase(),
  topic: cleanString(body?.topic),
  message: cleanString(body?.message),
});

export const createContactMessage = async (req, res) => {
  const contactMessage = normalizeContactMessage(req.body);

  if (
    !contactMessage.fullName ||
    !contactMessage.phone ||
    !contactMessage.email ||
    !contactMessage.topic ||
    !contactMessage.message
  ) {
    return res.status(400).json({ error: "Please fill all contact form fields." });
  }

  try {
    const savedMessage = await saveContactMessage(contactMessage);

    sendContactNotification(savedMessage).catch((error) => {
      console.error("Contact notification email failed.", error);
    });

    return res.status(201).json({
      success: true,
      message: "Your message has been sent successfully.",
    });
  } catch (error) {
    console.error("Contact message save failed.", error);
    return res.status(500).json({ error: "Unable to send your message right now." });
  }
};
