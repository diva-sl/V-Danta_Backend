import { Router } from "express";
import {
  register,
  loginWithPassword,
  loginWithOtp,
  verifyOtp,
  profile,
  forgotPassword,
  resetPassword,
} from "../controllers/userController";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

// Auth
router.post("/register", register);
router.post("/login", loginWithPassword);

// Forgot password
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// OTP (later)
router.post("/login-otp", loginWithOtp);
router.post("/verify-otp", verifyOtp);

// Profile
router.get("/profile", authMiddleware, profile);

export default router;
