/**
 * Sequelize model for the 'favorites' table.
 * @module models/Favorite
 */
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Boardgame = require("./Boardgame");

/**
 * Defines the Favorite model.
 * @class
 * @arguments {Model}
 */
const Favorite = sequelize.define(
  "Favorite",
  {
    id: {
      type: DataTypes.INTEGER,
      field: "ID",     
      primaryKey: true,
      autoIncrement: true
    },
    idBoardgame: {
      type: DataTypes.INTEGER,
      field: "IdBoardGame",
      allowNull: false
    }
  },
  {
    timestamps: false,
    tableName: "Favorites",      
  }
);

Favorite.belongsTo(Boardgame, { foreignKey: 'IdBoardgame', as: 'boardgame'})

module.exports = Favorite;
