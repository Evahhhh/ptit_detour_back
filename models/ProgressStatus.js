const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const ProgressStatus = sequelize.define(
  "Progress_Status",
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unsigned: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { timestamps: false, tableName: 'Progress_Status' }
);

module.exports = ProgressStatus;
