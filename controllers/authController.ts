import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

// Register
export const register = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  const existing = await User.findOne({ where: { email } });
  if (existing) return res.status(400).json({ error: "User already exists" });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, passwordHash, name });
  res.json({ id: user.id, email: user.email, name: user.name });
};

// Login
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "7d" });
  res.json({
    token,
    user: { id: user.id, email: user.email, name: user.name },
  });
};

// Profile
export const profile = async (req: Request, res: Response) => {
  const userId = (req as any).userId; // will be set in middleware
  const user = await User.findByPk(userId, {
    attributes: ["id", "email", "name"],
  });
  res.json(user);
};
