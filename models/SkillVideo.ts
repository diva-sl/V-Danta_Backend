import { DataTypes, Model } from "sequelize";
import { sequelize } from "../src/db";

export class SkillVideo extends Model {}

SkillVideo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    video_url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    duration: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    order_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "skill_videos",
    modelName: "SkillVideo",
  }
);
