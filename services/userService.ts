import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

// ================= REGISTER =================
export const register = async ({ email, phone, password, name }: any) => {
  if (!email && !phone) {
    throw new Error("Email or phone required");
  }

  const existing = await User.findOne({
    where: email ? { email } : { phone },
  });

  if (existing) {
    throw new Error("User already exists");
  }

  const passwordHash = password
    ? await bcrypt.hash(password.trim(), 10)
    : undefined;

  return User.create({
    email: email?.trim(),
    phone: phone?.trim(),
    passwordHash,
    name: name.trim(),
  });
};

// ================= LOGIN WITH PASSWORD =================
export const loginWithPassword = async ({ email, phone, password }: any) => {
  if (!password) throw new Error("Invalid credentials");

  const where: any = {};
  if (email) where.email = email.trim();
  if (phone) where.phone = phone.trim();

  const user = await User.findOne({ where });

  const passwordHash = user?.getDataValue("passwordHash");

  if (!user || !passwordHash) {
    throw new Error("Invalid credentials");
  }

  const valid = await bcrypt.compare(password.trim(), passwordHash);

  if (!valid) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign({ id: user.getDataValue("id") }, JWT_SECRET, {
    expiresIn: "7d",
  });

  return { token, user };
};

// ================= OTP PLACEHOLDER =================
export const sendOtp = async (phone: string) => {
  if (!phone) throw new Error("Phone required");

  console.log("OTP sent to:", phone);
};

export const verifyOtp = async ({ phone, otp }: any) => {
  if (otp !== "123456") throw new Error("Invalid OTP");

  let user = await User.findOne({ where: { phone: phone.trim() } });

  if (!user) {
    user = await User.create({
      phone: phone.trim(),
      name: "New User",
      isVerified: true,
    });
  }

  const token = jwt.sign({ id: user.getDataValue("id") }, JWT_SECRET, {
    expiresIn: "7d",
  });

  return { token, user };
};

// ================= PROFILE =================
export const getProfile = async (userId: number) => {
  return User.findByPk(userId, {
    attributes: ["id", "email", "phone", "name", "level", "stage"],
  });
};

// ================= FORGOT PASSWORD =================
export const forgotPassword = async ({ email, phone }: any) => {
  if (!email && !phone) {
    throw new Error("Email or phone required");
  }

  const user = await User.findOne({
    where: email ? { email: email.trim() } : { phone: phone.trim() },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // 🔔 Later: send OTP / email
  return {
    message: "User verified. Proceed to reset password.",
    userId: user.getDataValue("id"),
  };
};

// ================= RESET PASSWORD =================
export const resetPassword = async ({ userId, newPassword }: any) => {
  if (!userId || !newPassword) {
    throw new Error("Invalid request");
  }

  const id = Number(userId);
  if (Number.isNaN(id)) {
    throw new Error("Invalid user id");
  }

  const user = await User.findByPk(id);
  if (!user) {
    throw new Error("User not found");
  }

  const passwordHash = await bcrypt.hash(newPassword.trim(), 10);

  await user.update({ passwordHash });

  return { message: "Password reset successful" };
};
