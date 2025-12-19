const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const Role = sequelize.define(
  "Role",
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
  { timestamps: false, tableName: 'Role' }
);

module.exports = Role;
