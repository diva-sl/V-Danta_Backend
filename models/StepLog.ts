import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../src/db";
import { User } from "./User";

export interface StepLogAttributes {
  id: number;
  userId: number;
  date: string; // YYYY-MM-DD
  steps: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface StepLogCreationAttributes extends Optional<StepLogAttributes, "id"> {}

export class StepLog
  extends Model<StepLogAttributes, StepLogCreationAttributes>
  implements StepLogAttributes
{
  public id!: number;
  public userId!: number;
  public date!: string;
  public steps!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

StepLog.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    date: { type: DataTypes.STRING(10), allowNull: false },
    steps: { type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0 },
  },
  { sequelize, tableName: "step_logs", modelName: "StepLog" }
);

User.hasMany(StepLog, { foreignKey: "userId" });
StepLog.belongsTo(User, { foreignKey: "userId" });
