import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import adminRoutes from "./routes/adminRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";
import invoiceRoutes from "./routes/invoiceRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

const app = express();
const defaultOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://www.davisgirdharfoundation.com",
  "https://davisgirdharfoundation.com",
  "https://foundation-q2nx.onrender.com",
];

const allowedOrigins = new Set([
  ...defaultOrigins,
  ...(process.env.CLIENT_URL || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
]);

app.set("trust proxy", 1);
app.use(helmet());
app.use(compression());
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    },
  }),
);
app.use(express.json({ limit: "1mb" }));

app.use("/api", healthRoutes);
app.use("/api", paymentRoutes);
app.use("/api", invoiceRoutes);
app.use("/api", adminRoutes);
app.use("/api", contactRoutes);

app.use((_req, res) => {
  res.status(404).json({ error: "API route not found." });
});

export default app;
