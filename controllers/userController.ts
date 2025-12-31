import { Request, Response } from "express";
import * as userService from "../services/userService";

// Register (email / phone)
export const register = async (req: Request, res: Response) => {
  try {
    const user = await userService.register(req.body);
    res.json(user);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};

// Login with password
export const loginWithPassword = async (req: Request, res: Response) => {
  try {
    const data = await userService.loginWithPassword(req.body);
    res.json(data);
  } catch (e: any) {
    res.status(401).json({ error: e.message });
  }
};

// Login with OTP (send OTP)
export const loginWithOtp = async (req: Request, res: Response) => {
  try {
    await userService.sendOtp(req.body.phone);
    res.json({ message: "OTP sent" });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};

// Verify OTP
export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const data = await userService.verifyOtp(req.body);
    res.json(data);
  } catch (e: any) {
    res.status(401).json({ error: e.message });
  }
};

// Profile
export const profile = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const user = await userService.getProfile(userId);
  res.json(user);
};

// Forgot password
export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const data = await userService.forgotPassword(req.body);
    res.json(data);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};

// Reset password
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const data = await userService.resetPassword(req.body);
    res.json(data);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};
