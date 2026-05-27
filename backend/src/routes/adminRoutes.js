import { Router } from "express";
import {
  downloadPaymentStatement,
  getAdminAnalytics,
  getAdminContactMessages,
  getAdminDonations,
  loginAdmin,
} from "../controllers/adminController.js";
import { requireAdmin } from "../middleware/auth.js";

const router = Router();

router.post("/admin/login", loginAdmin);
router.get("/admin/analytics", requireAdmin, getAdminAnalytics);
router.get("/admin/payment-statement/download", requireAdmin, downloadPaymentStatement);
router.get("/admin/donations", requireAdmin, getAdminDonations);
router.get("/admin/contact-messages", requireAdmin, getAdminContactMessages);

export default router;
