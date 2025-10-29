import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../src/db"; // your sequelize instance

interface StepLogAttributes {
  id: number;
  userId: number;
  date: Date; // <-- now it's a Date
  steps: number;
}

interface StepLogCreationAttributes extends Optional<StepLogAttributes, "id"> {}

export class StepLog
  extends Model<StepLogAttributes, StepLogCreationAttributes>
  implements StepLogAttributes
{
  public id!: number;
  public userId!: number;
  public date!: Date;
  public steps!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

StepLog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY, // ✅ store only YYYY-MM-DD
      allowNull: false,
    },
    steps: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "StepLog",
    tableName: "step_logs",
  }
);
