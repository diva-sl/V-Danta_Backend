import { Request, Response } from "express";
import { SkillVideo } from "../models/SkillVideo";
import * as skillService from "../services/skillService";

export const getCourses = async (_req: Request, res: Response) => {
  try {
    const courses = await skillService.getAllCourses();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch courses" });
  }
};

export const getCourseVideos = async (req: Request, res: Response) => {
  try {
    const courseId = Number(req.params.courseId);
    const videos = await skillService.getCourseVideos(courseId);
    res.json(videos);
  } catch {
    res.status(500).json({ error: "Failed to fetch videos" });
  }
};

// 📌 List all skill videos for a user
export const listSkills = async (req: Request, res: Response) => {
  const userId = 1; // TODO: replace with auth later
  try {
    const skills = await SkillVideo.findAll({ where: { userId } });
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch skill videos" });
  }
};

// 📌 Add a new skill video
export const addSkill = async (req: Request, res: Response) => {
  const userId = 1; // TODO: replace with auth
  const { title, url, week, durationSec } = req.body;

  try {
    const skill = await SkillVideo.create({
      userId,
      title,
      url,
      week,
      durationSec,
    });
    res.json(skill);
  } catch (err) {
    res.status(500).json({ error: "Failed to create skill SkillVideo" });
  }
};

// 📌 Mark a skill SkillVideo as completed
export const completeSkill = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const skill = await SkillVideo.findByPk(id);
    if (!skill) return res.status(404).json({ error: "Skill not found" });

    skill.completed = true;
    await skill.save();
    res.json(skill);
  } catch (err) {
    res.status(500).json({ error: "Failed to complete skill video" });
  }
};
