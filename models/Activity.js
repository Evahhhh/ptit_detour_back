const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const Activity = sequelize.define(
  "Activity",
  {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unsigned: true,
    },
    premium_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    category_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    requirements: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    min_age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    max_age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    duration: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    energitic: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    scientific: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    focused: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    creative: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
  },
  { timestamps: false, tableName: 'Activity' }
);

module.exports = Activity;
