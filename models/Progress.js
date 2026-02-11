const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const Progress = sequelize.define(
  "Progress",
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unsigned: true,
    },
    activity_step_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    progress_status_id: {
      type: DataTypes.ENUM('0', '1', '99'),
      allowNull: false,
    },
    final_status_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  { timestamps: false, tableName: 'Progress' }
);

module.exports = Progress;
