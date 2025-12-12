/**
 * Controllers for handling boardgame-related requests.
 * @module controllers/boardgame
 */
const boardgameService = require("../services/boardgame.service");
const ApiError = require('../errors/ApiError'); 
const { validateString, validateInt } = require('../utils/validation');

/**
 * Controller to get all the existing boardgames.
 * Fetches all the boardgames from the service.
 *
 * @function getBoardgames
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @throws {500} Will respond with 500 Internal Server Error.
 * @returns {Promise<void>} Sends JSON response with all the boardgames.
 */
const getBoardgames = async (req, res) => {
  try{
    const data = await boardgameService.getBoardgames();

    res.json(data);
  } catch (error) {
    if (error instanceof ApiError){
      res.status(error.status).json({ error: error.message });
    }
    else{
      console.error("UNHANDLED Server Error:", error);
      return res.status(500).json({ 
          error: "An unexpected internal server error occurred."
      });
    }
  }
};

/**
 * Controller to get a boardgame with the provided ID.
 * Fetches the boardgame with the provided ID from the service.
 *
 * @function getBoardgame
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @throws {400} Will respond with 400 Bad Request if the ID is missing or has bad format.
 * @throws {404} Will respond with 404 Not Found if no Boardgame is found.
 * @throws {500} Will respond with 500 Internal Server Error.
 * @returns {Promise<void>} Sends JSON response with all the boardgames.
 */
const getBoardgame = async (req, res) => {
  try{
    const idRaw = req.params.id;

    if(!idRaw){
      return res.status(400).json({ error: "Missing required information" });
    }

    validateString(idRaw, "id", 100, true);

    const id = parseInt(idRaw, 10);

    const data = await boardgameService.getBoardgame(id);

    res.json(data);
  } catch (error) {
    if (error instanceof ApiError){
      res.status(error.status).json({ error: error.message });
    }
    else{
      console.error("UNHANDLED Server Error:", error);
      return res.status(500).json({ 
          error: "An unexpected internal server error occurred."
      });
    }
  }
};

/**
 * Controller to create a boardgame
 *
 * This function handles the creation request by:
 * 1. Extracting boardgame data from the request body.
 * 2. Validating that all required fields are provided.
 * - Responds with HTTP 400 if any field is missing.
 * 4. Calling the `boardgameService.createBoardgame` method to create a new boardgame.
 * 5. Responding with an HTTP 201 status and a JSON object with the created boardgame on success.
 *
 * @async
 * @function createBoardgame
 * @param {Object} req - The request object. Expects `name`, `publisher`, `category`, `description`, `year` in `req.body`.
 * @param {Object} res - The response object.
 * @throws {400} Will respond with 400 Bad Request if a required field is missing or has bad format.
 * @throws {500} Will respond with 500 Internal Server Error.
 * @returns {Promise<void>} Sends a JSON response with the newly created company location and a success message.
 */
const createBoardgame = async (req, res) => {
  try {
    const { name, publisher, category, description, year } = req.body;

    // Validate parameters
    if (!name || !publisher || !category) {
      return res.status(400).json({ error: "Missing required information" });
    }

    validateString(name, "Name", 80, true)
    validateString(publisher, "Publisher", 60, true);
    validateInt(category, "Category", 99);

    if(description){
      validateString(description, "Description", 200, false);
    }
    if(year){
      validateInt(year, "Year", 9999);
    }

    const boardgame = await boardgameService.createBoardgame(name, publisher, category, description, year);
    res.status(201).json({ message: "Boardgame Created", boardgame });
  } catch (error) {
    if (error instanceof ApiError){
      res.status(error.status).json({ error: error.message });
    }
    else{
      console.error("UNHANDLED Server Error:", error);
      return res.status(500).json({ 
          error: "An unexpected internal server error occurred."
      });
    }
  }
};

/**
 * Controller to update a boardgame
 *
 * This function handles the creation request by:
 * 1. Extracting boardgame data from the request body.
 * 2. Validating that all required fields are provided.
 * - Responds with HTTP 400 if any field is missing.
 * 4. Calling the `boardgameService.updateBoardgame` method to update the boardgame with the provided data.
 * 5. Responding with an HTTP 201 status and a JSON object with the updated boardgame on success.
 *
 * @async
 * @function updatedBoardgame
 * @param {Object} req - The request object. Expects `publisher`, `category`, `description`, `year` in `req.body`.
 * @param {Object} res - The response object.
 * @throws {400} Will respond with 400 Bad Request if a required field is missing or has bad format.
 * @throws {404} Will respond with 404 Not Found if no Boardgame is found.
 * @throws {500} Will respond with 500 Internal Server Error.
 * @returns {Promise<void>} Sends a JSON response with the updated boardgame.
 */
const updateBoardgame = async (req, res) => {
  try {
    const idRaw = req.params.id;

    if(!idRaw){
      return res.status(400).json({ error: "Missing required information" });
    }

    validateString(idRaw, "id", 100, true);

    const id = parseInt(idRaw, 10);

    const boardgame = await boardgameService.getBoardgame(id);
    
    let { publisher, category, description, year } = req.body;

    // Validate parameters
    if (!publisher && !category && !description && !year) {
      return res.status(400).json({ error: "Missing required information" });
    }

    if(!publisher){
      publisher = boardgame.publisher;
    }
    else{
      validateString(publisher, "Publisher", 60, true);
    }

    if(!category){
      category = boardgame.category;
    }
    else{
      validateInt(category, "Category", 99);
    }

    if(!description){
      description = boardgame.description;
    }
    else{
      validateString(description, "Description", 200, false);
    }

    if(!year){
      year = boardgame.year;
    }
    else{
      validateInt(year, "Year", 9999);
    }

    const boardgameUpdated = await boardgameService.updateBoardgame(id, publisher, category, description, year);
    res.status(200).json({ message: "Boardgame Updated", boardgameUpdated });
  } catch (error) {
    if (error instanceof ApiError){
      res.status(error.status).json({ error: error.message });
    }
    else{
      console.error("UNHANDLED Server Error:", error);
      return res.status(500).json({ 
          error: "An unexpected internal server error occurred."
      });
    }
  }
};

/**
 * Controller to delete a boardgame with the provided ID.
 * Deletes the boardgame with the provided ID from the service.
 *
 * @function deleteBoardgame
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @throws {400} Will respond with 400 Bad Request if the ID is missing or has bad format.
 * @throws {404} Will respond with 404 Not Found if no Boardgame is found.
 * @throws {500} Will respond with 500 Internal Server Error.
 * @returns {Promise<void>} Sends JSON response with a success message.
 */
const deleteBoardgame = async (req, res) => {
  try{
    const idRaw = req.params.id;

    if(!idRaw){
      return res.status(400).json({ error: "Missing required information" });
    }

    validateString(idRaw, "id", 100, true);

    const id = parseInt(idRaw, 10);

    await boardgameService.deleteBoardgame(id);

    res.status(200).json({ message: "Boardgame Deleted" });
  } catch (error) {
    if (error instanceof ApiError){
      res.status(error.status).json({ error: error.message });
    }
    else{
      console.error("UNHANDLED Server Error:", error);
      return res.status(500).json({ 
          error: "An unexpected internal server error occurred."
      });
    }
  }
};

module.exports = { getBoardgames, getBoardgame, createBoardgame, updateBoardgame, deleteBoardgame }