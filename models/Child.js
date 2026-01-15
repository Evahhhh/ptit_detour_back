const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const Child = sequelize.define(
  "Child",
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unsigned: true,
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    avatar_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    birthdate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    energetic: {
        type: DataTypes.TINYINT,
        allowNull: false,
    },
    scientific: {
        type: DataTypes.TINYINT,
        allowNull: false,
    },
    focused: {
        type: DataTypes.TINYINT,
        allowNull: false,
    },
    creative: {
        type: DataTypes.TINYINT,
        allowNull: false,
    }
  },
  { 
    tableName: 'Child',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    freezeTableName: true
  }
);

module.exports = Child;
