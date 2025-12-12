/**
 * @fileoverview Custom error class for handling specific HTTP responses.
 * @module error/ApiError
 */

/**
 * @class
 * @augments Error
 * @description Extends the native JavaScript Error class to include an HTTP status code.
 * This allows for centralized error handling in the controllers.
 */
class ApiError extends Error {
  /**
   * Creates an instance of ApiError.
   * @param {string} message - The error message to be displayed or logged.
   * @param {number} status - The HTTP status code (e.g., 401, 404, 500). Defaults to 500.
   */
  constructor(message, status) {
    super(message);
    this.name = this.constructor.name;
    this.status = status || 500;
    Error.captureStackTrace(this, this.constructor); 
  }
}

module.exports = ApiError;