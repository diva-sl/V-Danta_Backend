import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../src/db";

export interface UserAttributes {
  id: number;
  email?: string;
  phone?: string;
  passwordHash?: string;
  name: string;
  isVerified: boolean;
  level: number;
  stage: number;
}

interface UserCreationAttributes
  extends Optional<
    UserAttributes,
    "id" | "email" | "phone" | "passwordHash" | "isVerified" | "level" | "stage"
  > {}

export class User extends Model<UserAttributes, UserCreationAttributes> {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
    },

    phone: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
    },

    passwordHash: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    level: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },

    stage: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    tableName: "users",
    modelName: "User",
  }
);
