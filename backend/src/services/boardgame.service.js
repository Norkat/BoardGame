/**
 * Service module for boardgames-related logic.
 * @module services/boardgame
 */
const ApiError = require('../errors/ApiError'); 
const Boardgame = require("../models/Boardgame");
const Favorite = require("../models/Favorite");
const { sequelize } = require("../config/db");

// Condition to know if a boardgame is in Favorites
const isFavoriteLiteral = `(
    SELECT COUNT(Favorite.ID) 
    FROM Favorites AS Favorite 
    WHERE Favorite.IdBoardGame = Boardgame.ID 
)`;

/**
 * Retrieves all the existing boardgames.
 * 
 * @async
 * @function getBoardgames
 * @returns {Promise<Object>} Resolves with an object containing all the boardgames
 */
const getBoardgames = async() => {
    const boardgamesRaw = await Boardgame.findAll({
        attributes: {
            include: [
                [sequelize.literal(isFavoriteLiteral), 'isFavoriteCount'] 
            ]
        }
    });

    boardgames = boardgamesRaw.map(bg => {
            const boardgame = bg.toJSON();
            
            // Si el conteo es mayor a 0, es TRUE. Si es 0, es FALSE.
            boardgame.isFavorite = (boardgame.isFavoriteCount > 0); 
            
            // Limpiamos la columna de conteo de la respuesta final
            delete boardgame.isFavoriteCount; 
            
            return boardgame;
        });

    return { data: boardgames };
}

/**
 * Retrieves the boardgame, with the provided ID if exists.
 * 
 * @async
 * @function getBoardgame
 * @param {number} id - The boardgame's ID
 * @throws {ApiError} Throws status: 404 "Boardgame Not Found" if no boardgame exist with the given ID.
 * @returns {Promise<Object>} Resolves with an object containing the boardgame with the provided id
 */
const getBoardgame = async(id) => {
    const boardgamesRaw = await Boardgame.findByPk(id, {
        attributes: {
            include: [
                [sequelize.literal(isFavoriteLiteral), 'isFavoriteCount'] 
            ]
        }
    });

    if (!boardgamesRaw){
        throw new ApiError("Boardgame not found", 404);
    }

    const boardgame = boardgamesRaw.toJSON();
    boardgame.isFavorite = (boardgame.isFavoriteCount > 0);
    delete boardgame.isFavoriteCount;

    return { data: boardgame };
}

/**
 * Creates a new boardgame with the required information.
 *
 * This function performs the following steps:
 * 1. Creates a new boardgame record in the database with the provided data
 * 2. Returns the newly created boardgame object.
 *
 * @async
 * @function createBoardgame
 * @param {string} name - The boardgame's name
 * @param {string} publisher - The boardgame's publisher
 * @param {number} category - The boardgame's category
 * @param {string} description - The boardgame's description
 * @param {number} year - The boardgame's year
 * @returns {Promise<Object>} A promise that resolves with the newly created boardgame object.
 */
const createBoardgame = async (name, publisher, category, description, year) => {
  const boardgame = await Boardgame.create({ 
    name,
    publisher,
    category,
    description,
    year
  });

  return boardgame;
};

/**
 * Updates the boardgame with the provided id with the required information.
 *
 * This function performs the following steps:
 * 1. Update the boardgame record in the database with the provided data
 * 2. Returns the updated boardgame object.
 *
 * @async
 * @function createBoardgame
 * @param {string} name - The boardgame's name
 * @param {string} publisher - The boardgame's publisher
 * @param {number} category - The boardgame's category
 * @param {string} description - The boardgame's description
 * @param {number} year - The boardgame's year
 * @throws {ApiError} Throws status: 404 "Boardgame Not Found" if no boardgame exist with the given ID.
 * @returns {Promise<Object>} A promise that resolves with the newly created boardgame object.
 */
const updateBoardgame = async (id, publisher, category, description, year) => {
  const [rowsAffected, updatedBoardgames] = await Boardgame.update({ 
        publisher,
        category,
        description,
        year
    }, {
        where: {
            id
        },
        returning: true
    });

    if (rowsAffected === 0) {
        throw new ApiError("Boardgame not found", 404);
    }

  return getBoardgame(id);
};

/**
 * Delete the boardgame, with the provided ID if exists.
 * 
 * @async
 * @function deleteBoardgame
 * @param {number} id - The boardgame's ID
 * @throws {ApiError} Throws status: 404 "Boardgame Not Found" if no boardgame exist with the given ID.
 */
const deleteBoardgame = async(id) => {
    await Favorite.destroy({
        where: {
            idBoardgame: id
        }
    });

    const rowsDeleted = await Boardgame.destroy({
        where: {
            id
        }
    });

    if (rowsDeleted === 0){
        throw new ApiError("Boardgame not found", 404);
    }
}

module.exports = { getBoardgames, getBoardgame, createBoardgame, updateBoardgame, deleteBoardgame }