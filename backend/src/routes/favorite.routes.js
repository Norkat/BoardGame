/**
 * Express router for favorite-related routes.
 * @module routes/favorite
 */
const express = require("express");
const router = express.Router();
const favoriteController = require("../controllers/favorite.controller.js");

/**
 * GET /favorites
 * Route to get all the existing favorites boardgames
 * 
 * @name GetFavorites
 * @function
 * @memberof module:routes/favorite
 * @returns {Object} 200 - JSON containing all favorites boardgame and its data
 * @returns {Object} 500 - JSON error if Internal Server Error.
 */
router.get("/", favoriteController.getFavorites);

/**
 * POST /favorites
 * Route to create a favorite
 * 
 * @name CreateFavorite
 * @function
 * @memberof module:routes/favorite
 * @returns {Object} 201 - JSON containing the created favorite and its data
 * @returns {Object} 400 - JSON error if required data is missing or invalid.
 * @returns {Object} 500 - JSON error if Internal Server Error.
 */
router.post("/", favoriteController.createFavorite);

/**
 * DELETE /favorites/:id
 * Route to delete a favorite
 * 
 * @name DeleteFavorite
 * @function
 * @memberof module:routes/favorite
 * @returns {Object} 200 - JSON containing a success message
 * @returns {Object} 400 - JSON error if required data is missing or invalid.
 * @returns {Object} 404 - JSON error if no favorite is found.
 * @returns {Object} 500 - JSON error if Internal Server Error.
 */
router.delete("/:id", favoriteController.deleteFavorite);

module.exports = router