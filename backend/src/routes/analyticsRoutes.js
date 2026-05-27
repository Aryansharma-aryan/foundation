import { Router } from "express";
import { trackVisit } from "../controllers/analyticsController.js";

const router = Router();

router.post("/analytics/visit", trackVisit);

export default router;
