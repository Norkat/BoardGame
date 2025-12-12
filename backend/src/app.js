/**
 * Main application file for the backend server.
 * This file sets up the Express application, connects to the database,
 * and configures the necessary routes.
 * @module app
 */

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");
const boardgameRoutes = require("./routes/boardgame.routes");
const favoriteRoutes = require("./routes/favorite.routes");

const app = express();

/**
 * Connects to the MySQL database.
 * This function ensures the database connection is established
 * before the application starts listening for requests.
 */
connectDB();

/**
 * Middleware for handling Cross-Origin Resource Sharing (CORS).
 * This middleware allows requests from the specified frontend origin (http://localhost:5173)
 * and configures which HTTP methods are allowed.
 * @param {Object} options - CORS options object.
 * @param {string} options.origin - The allowed origin for requests.
 * @param {string[]} options.methods - The allowed HTTP methods.
 * @param {boolean} options.credentials - Indicates if cookies and authorization headers are sent.
 */
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

/**
 * Middleware to parse incoming requests with JSON payloads.
 * This middleware is required to correctly read JSON data sent from the client.
 */
app.use(express.json());

/**
 * Sets up the main API routes for boardgame.
 * All routes defined in `boardgame.routes.js` will be prefixed with `/boardgame`.
 */
app.use("/boardgame", boardgameRoutes);

/**
 * Sets up the main API routes for favorites.
 * All routes defined in `favorite.routes.js` will be prefixed with `/favorites`.
 */
app.use("/favorites", favoriteRoutes);

module.exports = app;
