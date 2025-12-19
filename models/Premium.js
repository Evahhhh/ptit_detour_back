const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const Premium = sequelize.define(
  "Premium",
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
    price: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: false,
    },
    max_childs: {
        type: DataTypes.TINYINT,
        allowNull: false,
    },
    advertisement: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    downloading: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    holding: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
  },
  { timestamps: false, tableName: 'Premium' }
);

module.exports = Premium;
