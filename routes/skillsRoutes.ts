import { Router } from "express";
import {
  listSkills,
  addSkill,
  completeSkill,
  getCourses,
  getCourseVideos,
} from "../controllers/skillController";

const router = Router();

router.get("/", listSkills);
router.post("/", addSkill);
router.patch("/:id/complete", completeSkill);
router.get("/courses", getCourses);
router.get("/courses/:courseId/videos", getCourseVideos);

export default router;
