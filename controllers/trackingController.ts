import { Request, Response } from "express";
import { StepLog } from "../models/StepLog";
import { Op } from "sequelize";

export const getToday = async (req: Request, res: Response) => {
  const userId = 1; // TODO: replace with auth
  const today = new Date().toISOString().slice(0, 10);
  const log = await StepLog.findOne({ where: { userId, date: today } });
  res.json({ steps: log?.steps ?? 0, target: 10000 });
};

export const addSteps = async (req: Request, res: Response) => {
  const userId = 1;
  const { steps } = req.body;
  const today = new Date().toISOString().slice(0, 10);

  const [log, created] = await StepLog.findOrCreate({
    where: { userId, date: today },
    defaults: { steps, date: today, userId },
  });

  if (!created) {
    log.steps += Number(steps || 0);
    await log.save();
  }
  res.json(log);
};

export const list = async (req: Request, res: Response) => {
  const userId = 1;
  const { from, to } = req.query as { from?: string; to?: string };
  const where: any = { userId };

  if (from || to) {
    where.date = {
      ...(from ? { [Op.gte]: from } : {}),
      ...(to ? { [Op.lte]: to } : {}),
    };
  }

  const rows = await StepLog.findAll({ where, order: [["date", "ASC"]] });
  res.json(rows);
};
