const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const ActivityStep = sequelize.define(
  "Activity_Step",
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unsigned: true,
    },
    activity_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    outside: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    duration: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  },
  { timestamps: false, tableName: 'Activity_Step' }
);

module.exports = ActivityStep;
