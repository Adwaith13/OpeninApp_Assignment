const { DataTypes } = require("sequelize");
const { database } = require("./main");

const User = database.define("User", {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  phone_number: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  priority: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = User;
