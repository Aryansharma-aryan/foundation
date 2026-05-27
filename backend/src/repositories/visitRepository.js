import mongoose from "mongoose";
import Visit from "../models/Visit.js";

const visits = [];

export const saveVisit = async (visit) => {
  const payload = {
    ...visit,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  if (mongoose.connection.readyState === 1) {
    return Visit.create(visit);
  }

  visits.push(payload);
  return payload;
};

export const findAllVisits = async () => {
  if (mongoose.connection.readyState === 1) {
    return Visit.find({}).sort({ createdAt: -1 }).lean();
  }

  return [...visits].sort((first, second) => new Date(second.createdAt) - new Date(first.createdAt));
};
