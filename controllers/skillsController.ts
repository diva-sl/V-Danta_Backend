import { Request, Response } from "express";
import { SkillVideo } from "../models/SkillsVideo";

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
