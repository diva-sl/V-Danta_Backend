import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./src/db";
import authRoutes from "./routes/authRoutes";
import trackingRoutes from "./routes/trackingRoutes";
import skillsRoutes from "./routes/skillsRoutes";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/tracking", trackingRoutes);
app.use("/api/skills", skillsRoutes);

// start
const PORT = process.env.PORT || 5000;
(async () => {
  try {
    await sequelize.sync({ alter: true }); // auto-create tables
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error(err);
  }
})();
