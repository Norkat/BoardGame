/**
 * Controllers for handling favorite-related requests.
 * @module controllers/favorite
 */
const favoriteService = require("../services/favorite.service");
const boardgameService = require("../services/boardgame.service");
const ApiError = require("../errors/ApiError");
const { validateString, validateInt } = require("../utils/validation");

/**
 * Controller to get all the existing favorites boardgames.
 * Fetches all the favorites boardgames from the service.
 *
 * @function getFavorites
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @throws {500} Will respond with 500 Internal Server Error.
 * @returns {Promise<void>} Sends JSON response with all the boardgames.
 */
const getFavorites = async (req, res) => {
  try {
    const data = await favoriteService.getFavorites();

    res.json(data);
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(error.status).json({ error: error.message });
    } else {
      console.error("UNHANDLED Server Error:", error);
      return res.status(500).json({
        error: "An unexpected internal server error occurred.",
      });
    }
  }
};

/**
 * Controller to create a favorite
 *
 * This function handles the creation request by:
 * 1. Extracting favorite data from the request body.
 * 2. Validating that all required fields are provided.
 * - Responds with HTTP 400 if any field is missing.
 * 4. Calling the `favoriteService.createFavorite` method to create a new favorite.
 * 5. Responding with an HTTP 201 status and a JSON object with the created favorite on success.
 *
 * @async
 * @function createFavorite
 * @param {Object} req - The request object. Expects `idBoardgame` in `req.body`.
 * @param {Object} res - The response object.
 * @throws {400} Will respond with 400 Bad Request if a required field is missing or has bad format.
 * @throws {404} Will respond with 404 Not Found if the idBoardgame does not exists.
 * @throws {500} Will respond with 500 Internal Server Error.
 * @returns {Promise<void>} Sends a JSON response with the newly created company location and a success message.
 */
const createFavorite = async (req, res) => {
  try {
    const { idBoardgame } = req.body;

    // Validate parameters
    if (!idBoardgame) {
      return res.status(400).json({ error: "Missing required information" });
    }

    validateInt(idBoardgame, "IdBoardgame", Infinity);

    //Check if the boardgame exists
    await boardgameService.getBoardgame(idBoardgame);

    const favorite = await favoriteService.createFavorite(idBoardgame);
    res.status(201).json({ message: "Favorite Created", favorite });
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(error.status).json({ error: error.message });
    } else {
      console.error("UNHANDLED Server Error:", error);
      return res.status(500).json({
        error: "An unexpected internal server error occurred.",
      });
    }
  }
};

/**
 * Controller to delete a favorite with the provided ID.
 * Deletes the favorite with the provided ID from the service.
 *
 * @function deleteFavorite
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @throws {400} Will respond with 400 Bad Request if the ID is missing or has bad format.
 * @throws {404} Will respond with 404 Not Found if no Favorite is found.
 * @throws {500} Will respond with 500 Internal Server Error.
 * @returns {Promise<void>} Sends JSON response with a success message.
 */
const deleteFavorite = async (req, res) => {
  try {
    const idRaw = req.params.id;

    if (!idRaw) {
      return res.status(400).json({ error: "Missing required information" });
    }

    validateString(idRaw, "id", 100, true);

    const id = parseInt(idRaw, 10);

    await favoriteService.deleteFavorite(id);

    res.status(200).json({ message: "Favorite Deleted" });
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(error.status).json({ error: error.message });
    } else {
      console.error("UNHANDLED Server Error:", error);
      return res.status(500).json({
        error: "An unexpected internal server error occurred.",
      });
    }
  }
};

module.exports = { getFavorites, createFavorite, deleteFavorite };
