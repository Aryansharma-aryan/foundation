import { Router } from "express";
import { getAdminDonations, loginAdmin } from "../controllers/adminController.js";
import { requireAdmin } from "../middleware/auth.js";

const router = Router();

router.post("/admin/login", loginAdmin);
router.get("/admin/donations", requireAdmin, getAdminDonations);

export default router;
