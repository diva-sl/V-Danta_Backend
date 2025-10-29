import { Router } from "express";
import { getToday, addSteps, list } from "../controllers/trackingController";

const router = Router();
router.get("/today", getToday);
router.post("/add", addSteps);
router.get("/list", list);

export default router;
