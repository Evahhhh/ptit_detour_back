const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const Payment = sequelize.define(
  "Payment",
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unsigned: true,
    },
    amount: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: false,
    },
    payline_external_id: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    premium_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { timestamps: false, tableName: 'Payment' }
);

module.exports = Payment;
