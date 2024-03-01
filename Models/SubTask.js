const { DataTypes } = require("sequelize");
const { database } = require("./main");
const Task = require("./Task");

const SubTask = database.define(
  "SubTask",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    task_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Task,
        key: "id",
      },
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    created_At: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    deleted_at: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

SubTask.belongsTo(Task);
Task.hasMany(SubTask);

module.exports = SubTask;
