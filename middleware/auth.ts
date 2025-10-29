import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: "No token provided" });

  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number };
    (req as any).userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
