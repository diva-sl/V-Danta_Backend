import { connectDB, sequelize } from "./src/db";
import bcrypt from "bcryptjs";
import { User } from "./models/User";
import { SkillVideo } from "./models/SkillVideo";

(async () => {
  await connectDB();
  await sequelize.sync({ force: true }); // recreate tables fresh

  await User.create({
    email: "demo@els.app",
    passwordHash: await bcrypt.hash("dev", 10), // hashed password
    name: "Demo",
  });

  await SkillVideo.bulkCreate([
    {
      title: "Breathing Basics",
      url: "https://example.com/v/1",
      week: 1,
      durationSec: 180,
      userId: User.id,
    },
    {
      title: "Core Stability",
      url: "https://example.com/v/2",
      week: 1,
      durationSec: 240,
      userId: User.id,
    },
    {
      title: "Mobility Flow",
      url: "https://example.com/v/3",
      week: 2,
      durationSec: 300,
      userId: User.id,
    },
  ]);

  console.log("✅ Seeded successfully");
  process.exit(0);
})();
