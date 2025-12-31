import { DataTypes, Model } from "sequelize";
import { sequelize } from "../src/db";

export class SkillCourse extends Model {}

SkillCourse.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    modules: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    duration: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    price: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    image_key: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "skill_courses",
    modelName: "SkillCourse",
    timestamps: true,
  }
);
