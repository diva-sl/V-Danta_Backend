import { Router } from "express";
import {
  listSkills,
  addSkill,
  completeSkill,
} from "../controllers/skillsController";

const router = Router();

router.get("/", listSkills);
router.post("/", addSkill);
router.patch("/:id/complete", completeSkill);

export default router;
