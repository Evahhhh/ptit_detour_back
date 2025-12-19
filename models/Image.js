const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const Image = sequelize.define(
  "Image",
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
    activity_step_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { timestamps: false, tableName: 'Image' }
);

module.exports = Image;
