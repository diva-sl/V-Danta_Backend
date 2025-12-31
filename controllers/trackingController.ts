import { Response, Request } from "express";
import { AuthRequest } from "../middlewares/auth";
import { StepLog } from "../models/StepLog";
import { Op, fn, col } from "sequelize";

type SummaryQuery = {
  type?: "day" | "week" | "month" | "year";
  date?: string; // ISO date from frontend navigation
};

/** TODAY */
export const getToday = async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const today = new Date().toISOString().slice(0, 10);

  let log = await StepLog.findOne({ where: { userId, date: today } });

  if (!log) {
    log = await StepLog.findOne({
      where: { userId },
      order: [["date", "DESC"]],
    });
  }

  res.json({
    steps: log?.steps ?? 0,
    target: 10000,
  });
};

/** ADD STEPS */
export const addSteps = async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const steps = Number(req.body.steps || 0);
  const today = new Date().toISOString().slice(0, 10);

  const [log] = await StepLog.findOrCreate({
    where: { userId, date: today },
    defaults: { userId, date: today, steps: 0 },
  });

  log.steps += steps;
  await log.save();

  res.json(log);
};

/** SUMMARY (DAY / WEEK / MONTH / YEAR) */
export const summary = async (
  req: Request<{}, {}, {}, SummaryQuery>,
  res: Response
) => {
  try {
    const { type = "week", date } = req.query;

    // 🔹 base date controlled by frontend navigation
    const baseDate = date ? new Date(date) : new Date();

    let startDate = new Date(baseDate);
    let endDate = new Date(baseDate);

    /* =====================================================
       RANGE CALCULATION (DAY / WEEK / MONTH / YEAR)
       ===================================================== */

    if (type === "day") {
      // Full selected day
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);
    } else if (type === "week") {
      // Monday → Sunday (Trading style)
      const jsDay = baseDate.getDay(); // 0 = Sun
      const diffToMonday = jsDay === 0 ? -6 : 1 - jsDay;

      startDate = new Date(baseDate);
      startDate.setDate(baseDate.getDate() + diffToMonday);
      startDate.setHours(0, 0, 0, 0);

      endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6);
      endDate.setHours(23, 59, 59, 999);
    } else if (type === "month") {
      // Full selected month
      startDate = new Date(baseDate.getFullYear(), baseDate.getMonth(), 1);
      startDate.setHours(0, 0, 0, 0);

      endDate = new Date(baseDate.getFullYear(), baseDate.getMonth() + 1, 0);
      endDate.setHours(23, 59, 59, 999);
    } else if (type === "year") {
      // Full selected year
      startDate = new Date(baseDate.getFullYear(), 0, 1);
      startDate.setHours(0, 0, 0, 0);

      endDate = new Date(baseDate.getFullYear(), 11, 31);
      endDate.setHours(23, 59, 59, 999);
    }

    /* =====================================================
       DATABASE QUERY (DAILY ROWS ONLY)
       ===================================================== */

    const rows = await StepLog.findAll({
      where: {
        // 🔹 userId intentionally skipped for now (as requested)
        date: {
          [Op.between]: [
            startDate.toISOString().slice(0, 10),
            endDate.toISOString().slice(0, 10),
          ],
        },
      },
      attributes: [
        [fn("DATE", col("date")), "date"],
        [fn("SUM", col("steps")), "steps"],
      ],
      group: [fn("DATE", col("date"))],
      order: [[fn("DATE", col("date")), "ASC"]],
      raw: true,
    });

    /* =====================================================
       SAFE RESPONSE (FRONTEND DOES BUCKETING)
       ===================================================== */

    const safeData = rows.map((r: any) => ({
      date: r.date, // YYYY-MM-DD
      steps: Number(r.steps), // numeric
    }));

    return res.json(safeData);
  } catch (error) {
    console.error("SUMMARY ERROR:", error);
    return res.status(500).json({
      error: "Failed to load summary data",
    });
  }
};
