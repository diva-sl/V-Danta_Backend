import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../src/db";
import { User } from "./User";

// 🎬 Skill Video attributes
export interface SkillVideoAttributes {
  id: number;
  title: string;
  url: string;
  week: number;
  durationSec: number;
  completed: boolean;
  userId?: number; // relation to User
}

// ✅ Creation attributes (id + completed are optional when creating)
interface SkillVideoCreationAttributes
  extends Optional<SkillVideoAttributes, "id" | "completed"> {}

// 📌 Sequelize Model
export class SkillVideo
  extends Model<SkillVideoAttributes, SkillVideoCreationAttributes>
  implements SkillVideoAttributes
{
  public id!: number;
  public title!: string;
  public url!: string;
  public week!: number;
  public durationSec!: number;
  public completed!: boolean;
  public userId?: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// 🗄 Init table
SkillVideo.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: { type: DataTypes.STRING, allowNull: false },
    url: { type: DataTypes.STRING, allowNull: false },
    week: { type: DataTypes.INTEGER, allowNull: false },
    durationSec: { type: DataTypes.INTEGER, allowNull: false },
    completed: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    sequelize,
    tableName: "skill_videos", // ✅ better naming for clarity
    modelName: "SkillVideo",
    timestamps: true,
  }
);

// 🔗 Associations
User.hasMany(SkillVideo, { foreignKey: "userId", as: "skills" });
SkillVideo.belongsTo(User, { foreignKey: "userId", as: "user" });
