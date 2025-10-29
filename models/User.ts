import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../src/db";

export interface UserAttributes {
  id: number;
  email: string;
  passwordHash: string;
  name: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public email!: string;
  public passwordHash!: string;
  public name!: string;
  static id: number | undefined;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    passwordHash: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, tableName: "users", modelName: "User" }
);
