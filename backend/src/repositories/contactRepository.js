import mongoose from "mongoose";
import ContactMessage from "../models/ContactMessage.js";

const contactMessages = new Map();

export const saveContactMessage = async (message) => {
  if (mongoose.connection.readyState === 1) {
    return ContactMessage.create(message);
  }

  const id = `contact_${Date.now()}`;
  const savedMessage = {
    _id: id,
    ...message,
    status: "new",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  contactMessages.set(id, savedMessage);
  return savedMessage;
};

export const findAllContactMessages = async () => {
  if (mongoose.connection.readyState === 1) {
    return ContactMessage.find({}).sort({ createdAt: -1 }).lean();
  }

  return [...contactMessages.values()].sort(
    (first, second) => new Date(second.createdAt) - new Date(first.createdAt),
  );
};
