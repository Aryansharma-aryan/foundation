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
  "https://www.davisgirdharfoundation.org",
  "https://davisgirdharfoundation.org",
  "https://foundation-q2nx.onrender.com",
];

const allowedOrigins = new Set([
  ...defaultOrigins,
  ...(process.env.CLIENT_URL || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
]);

const isAllowedOrigin = (origin) => {
  if (!origin) return true;
  if (allowedOrigins.has(origin)) return true;

  try {
    const { hostname, protocol } = new URL(origin);
    const allowedSiteDomains = ["davisgirdharfoundation.com", "davisgirdharfoundation.org"];

    return (
      protocol === "https:" &&
      allowedSiteDomains.some((domain) => hostname === domain || hostname.endsWith(`.${domain}`))
    );
  } catch {
    return false;
  }
};

app.set("trust proxy", 1);
app.use(helmet());
app.use(compression());
app.use(
  cors({
    origin(origin, callback) {
      if (isAllowedOrigin(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    },
    maxAge: 86400,
  }),
);
app.use(express.json({ limit: "1mb" }));

app.use("/api", healthRoutes);
app.use("/api", paymentRoutes);
app.use("/api", invoiceRoutes);
app.use("/api", adminRoutes);
app.use("/api", contactRoutes);

app.use((error, _req, res, next) => {
  if (error?.message === "Not allowed by CORS") {
    res.status(403).json({ error: "This origin is not allowed to access the API." });
    return;
  }

  next(error);
});

app.use((_req, res) => {
  res.status(404).json({ error: "API route not found." });
});

export default app;
