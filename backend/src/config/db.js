import mongoose from "mongoose";

export const connectMongo = async () => {
  if (!process.env.MONGO_URI) {
    console.log("MongoDB not configured. Using in-memory invoice store for this session.");
    return;
  }

  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected.");
};

export const getMongoStatus = () =>
  mongoose.connection.readyState === 1 ? "connected" : "not_configured";
