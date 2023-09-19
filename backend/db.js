const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./online-store.db",
});

const Item = sequelize.define(
  "Item",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.STRING,
    price: {
      type: DataTypes.REAL,
      allowNull: false,
    },
    imageUrl: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    tableName: "items",
    timestamps: true,
    updatedAt: "updatedAt",
    createdAt: "createdAt",
  }
);

sequelize.sync();

module.exports = {
  sequelize,
  Item,
};
