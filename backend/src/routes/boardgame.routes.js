/**
 * Express router for boardgame-related routes.
 * @module routes/boardgame
 */
const express = require("express");
const router = express.Router();
const boardgameController = require("../controllers/boardgame.controller.js");

/**
 * GET /boardgame
 * Route to get all the existing boardgames
 * 
 * @name GetBoardgames
 * @function
 * @memberof module:routes/boardgame
 * @returns {Object} 200 - JSON containing all boardgame and its data
 * @returns {Object} 500 - JSON error if Internal Server Error.
 */
router.get("/", boardgameController.getBoardgames);

/**
 * GET /boardgame/:id
 * Route to get the boardgame with the provided id
 * 
 * @name GetBoardgame
 * @function
 * @memberof module:routes/boardgame
 * @returns {Object} 200 - JSON containing all boardgame and its data
 * @returns {Object} 400 - JSON error if required data is missing or invalid.
 * @returns {Object} 404 - JSON error if no boardgame is found.
 * @returns {Object} 500 - JSON error if Internal Server Error.
 */
router.get("/:id", boardgameController.getBoardgame);

/**
 * POST /boardgame
 * Route to create a boardgame
 * 
 * @name CreateBoardgame
 * @function
 * @memberof module:routes/boardgame
 * @returns {Object} 201 - JSON containing the created boardgame and its data
 * @returns {Object} 400 - JSON error if required data is missing or invalid.
 * @returns {Object} 500 - JSON error if Internal Server Error.
 */
router.post("/", boardgameController.createBoardgame);

/**
 * PUT /boardgame/:id
 * Route to update a boardgame
 * 
 * @name UpdateBoardgame
 * @function
 * @memberof module:routes/boardgame
 * @returns {Object} 200 - JSON containing the updated boardgame and its data
 * @returns {Object} 400 - JSON error if required data is missing or invalid.
 * @returns {Object} 404 - JSON error if no boardgame is found.
 * @returns {Object} 500 - JSON error if Internal Server Error.
 */
router.put("/:id", boardgameController.updateBoardgame);

/**
 * DELETE /boardgame/:id
 * Route to delete a boardgame
 * 
 * @name DeleteBoardgame
 * @function
 * @memberof module:routes/boardgame
 * @returns {Object} 200 - JSON containing a success message
 * @returns {Object} 400 - JSON error if required data is missing or invalid.
 * @returns {Object} 404 - JSON error if no boardgame is found.
 * @returns {Object} 500 - JSON error if Internal Server Error.
 */
router.delete("/:id", boardgameController.deleteBoardgame);

module.exports = router