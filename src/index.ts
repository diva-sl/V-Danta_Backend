import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "../src/db";
import authRoutes from "../routes/authRoutes";
import stepsRoutes from "../routes/trackingRoutes";
import videosRoutes from "../routes/skillsRoutes";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.use("/api/auth", authRoutes);
app.use("/api/steps", stepsRoutes);
app.use("/api/videos", videosRoutes);

const PORT = process.env.PORT || 4000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`API on http://localhost:${PORT}`));
});
