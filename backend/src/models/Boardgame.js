/**
 * Sequelize model for the 'boardgames' table.
 * @module models/Boardgame
 */
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

/**
 * Defines the Boardgame model.
 * @class
 * @arguments {Model}
 */
const Boardgame = sequelize.define(
  "Boardgame",
  {
    id: {
      type: DataTypes.INTEGER,
      field: "ID",     
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(80),
      field: "Name",
      allowNull: false,
    },
    publisher: {
      type: DataTypes.STRING(60),
      field: "Publisher",
      allowNull: false,
    },
    category: {
      type: DataTypes.INTEGER,
      field: "Category",
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(200),
      field: "Description",
      allowNull: true,
    },
    year: {
      type: DataTypes.INTEGER,
      field: "Year",
      allowNull: true
    }
  },
  {
    timestamps: false,
    tableName: "BoardGames",      
  }
);

module.exports = Boardgame;
