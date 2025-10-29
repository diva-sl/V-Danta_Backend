import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME || "vdanta",
  process.env.DB_USER || "postgres",
  process.env.DB_PASSWORD || "password",
  {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    dialect: "postgres",
    logging: false,
  }
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");
  } catch (err) {
    console.error("❌ DB connection error:", err);
    process.exit(1);
  }
};
