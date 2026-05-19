import cors from "cors";
import express from "express";
import adminRoutes from "./routes/adminRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";
import invoiceRoutes from "./routes/invoiceRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

const app = express();
const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";

app.use(cors({ origin: clientUrl }));
app.use(express.json({ limit: "1mb" }));

app.use("/api", healthRoutes);
app.use("/api", paymentRoutes);
app.use("/api", invoiceRoutes);
app.use("/api", adminRoutes);

app.use((_req, res) => {
  res.status(404).json({ error: "API route not found." });
});

export default app;
