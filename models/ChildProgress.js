const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const ChildProgress = sequelize.define(
  "Child_Progress",
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unsigned: true,
    },
    child_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    progress_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  { timestamps: false, tableName: 'Child_Progress' }
);

module.exports = ChildProgress;
