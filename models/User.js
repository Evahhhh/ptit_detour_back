const { DataTypes, Model } = require("sequelize");
const sequelize = require("../util/database");
const bcrypt = require("bcryptjs");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unsigned: true,
    },
    role_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    avatar_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    premium_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: true,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
  },
  {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'User',
    freezeTableName: true
  }
);

Model.prototype.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const DEFAULT_SALT_ROUNDS = 10;

User.addHook("beforeCreate", async (user) => {
  if (user.password) {
    const encryptedPassword = await bcrypt.hash(
      user.password,
      DEFAULT_SALT_ROUNDS
    );
    user.password = encryptedPassword;
  }
});

module.exports = User;