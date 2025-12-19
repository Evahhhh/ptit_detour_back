const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const Avatar = sequelize.define(
  "Avatar",
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unsigned: true,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { timestamps: false, tableName: 'Avatar' }
);

module.exports = Avatar;
