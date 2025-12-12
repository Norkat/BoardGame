/**
 * Service module for favorite-related logic.
 * @module services/boardgame
 */
const ApiError = require("../errors/ApiError");
const Favorite = require("../models/Favorite");
const Boardgame = require("../models/Boardgame");

/**
 * Retrieves all the existing favorites boardgames.
 *
 * @async
 * @function getFavorites
 * @returns {Promise<Object>} Resolves with an object containing all the favorites boardgames.
 */
const getFavorites = async () => {
  const favorites = await Favorite.findAll({
    attributes: ["id", "idBoardgame"],
    include: [
      {
        model: Boardgame,
        as: "boardgame",
        attributes: ["name", "publisher", "category", "year"],
      },
    ],
    raw: true,
  });

  return { data: favorites };
};
/**
 * Creates a new favorite with the required information.
 *
 * This function performs the following steps:
 * 1. Creates a new favorite record in the database with the provided data
 * 2. Returns the newly created favorite object.
 *
 * @async
 * @function createFavorite
 * @param {number}  idBoardgame - The favorite's idBoardgame
 * @returns {Promise<Object>} A promise that resolves with the newly created favorite object.
 */
const createFavorite = async (idBoardgame) => {
  const favorite = await Favorite.create({
    idBoardgame,
  });

  return favorite;
};

/**
 * Delete the favorite, with the provided ID if exists.
 *
 * @async
 * @function deleteFavorite
 * @param {number} id - The favorite's ID
 * @throws {ApiError} Throws status: 404 "Favorite Not Found" if no favorite exist with the given ID.
 */
const deleteFavorite = async (id) => {
  const rowsDeleted = await Favorite.destroy({
    where: {
      id,
    },
  });

  if (rowsDeleted === 0) {
    throw new ApiError("Favorite not found", 404);
  }
};

module.exports = { getFavorites, createFavorite, deleteFavorite };
