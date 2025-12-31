import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./src/db";
import userRoutes from "./routes/userRoutes";
import trackingRoutes from "./routes/trackingRoutes";
import skillsRoutes from "./routes/skillsRoutes";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*", // 👈 allow web requests
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// routes
app.use("/api/user", userRoutes);
app.use("/api/tracking", trackingRoutes);
app.use("/api/skills", skillsRoutes);

// health check
app.get("/api/health", (_, res) => {
  res.json({ status: "ok" });
});

// start
const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await sequelize.sync({ alter: true });
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Server failed:", err);
  }
})();
