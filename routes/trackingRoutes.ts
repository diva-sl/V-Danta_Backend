import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import { getToday, addSteps, summary } from "../controllers/trackingController";

const router = Router();

router.get("/today", authMiddleware, getToday);
router.post("/add", authMiddleware, addSteps);
router.get("/summary", authMiddleware, summary);

export default router;
