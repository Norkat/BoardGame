/**
 * Main entry point of the application.
 * This file initializes the server and starts it on the specified port.
 * @module server
 */
const app = require("./src/app");

/**
 * The port number for the server to listen on.
 * It defaults to 3001 if not specified in the environment variables.
 * @constant {number}
 */
const PORT = process.env.PORT || 3001;

/**
 * Starts the server and listens for incoming requests on the specified port.
 * @listens {number} PORT - The port number.
 */
app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});