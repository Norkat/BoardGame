/**
 * Utility module for validation of input data
 * @module utils/validation
 */
const ApiError = require('../errors/ApiError');

/**
 * Validates if a value is a non-empty string. If validation fails, 
 * it throws an Error with a structured message.
 *
 * @param {*} value - The value to validate.
 * @param {string} fieldName - The name of the field being validated (used in the error message).
 * @throws {ApiError} Throws a generic Error with a structured message if the value is not a valid string.
 */
const validateString = (value, fieldName, limit, isNotNull) => {
    // 1. Check for the basic type: must be a string
    if (typeof value !== 'string') {
        throw new ApiError(`Invalid data type for field: ${fieldName}. Expected a string`, 400);
    }

    // 2. Check for content: must not be empty after trimming whitespace
    if (value.trim().length === 0 && isNotNull) {
        throw new ApiError(`Field cannot be empty: ${fieldName}`, 400);
    }

    if (value.trim().length > limit){
        throw new ApiError(`Field cannot be larger than ${limit}: ${fieldName}`, 400);
    }
    
    // If validation passes, the function simply exits without returning anything.
};

/**
 * Validates if a value is an Int. If validation fails, 
 * it throws an Error with a structured message.
 *
 * @param {*} value - The value to validate.
 * @param {string} fieldName - The name of the field being validated (used in the error message).
 * @throws {ApiError} Throws a generic Error with a structured message if the value is not a valid Int.
 */
const validateInt = (value, fieldName, limit) => {
    // 1. Check for the basic type: must be a string
    if (typeof value !== 'number') {
        throw new ApiError(`Invalid data type for field: ${fieldName}. Expected a Number`, 400);
    }

    if (value > limit){
        throw new ApiError(`Field cannot be larger than ${limit}: ${fieldName}`, 400);
    }
    
    // If validation passes, the function simply exits without returning anything.
};

module.exports = {
    validateString,
    validateInt
};