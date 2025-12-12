/**
 * Reusable validation utilities for Boardgame entities.
 * Each method validates a specific field and returns an error message or null.
 */
export const validators = {
  /**
   * Validates the board game name.
   * @param {string} name - Game name.
   * @returns {string|null} Error message or null if valid.
   */
  validateName(name) {
    if (!name) return "El nombre es obligatorio";
    if (name.length > 80) return "El nombre no debe exceder 80 caracteres";
    return null;
  },

  /**
   * Validates the publisher field.
   * @param {string} publisher - Game publisher.
   * @returns {string|null} Error message or null if valid.
   */
  validatePublisher(publisher) {
    if (!publisher) return "El publisher es obligatorio";
    if (publisher.length > 60)
      return "El publisher no debe exceder 60 caracteres";
    return null;
  },

  /**
   * Validates the category identifier.
   * @param {number|string} category - Category ID.
   * @returns {string|null} Error message or null if valid.
   */
  validateCategory(category) {
    if (!category) return "La categoría es obligatoria";
    if (String(category).length > 2)
      return "La categoría debe ser una clave válida";
    return null;
  },

  /**
   * Validates the optional description.
   * @param {string} description - Game description.
   * @returns {string|null} Error message or null if valid.
   */
  validateDescription(description) {
    if (!description) return null;
    if (description.length > 200)
      return "La descripción no debe exceder 200 caracteres";
    return null;
  },

  /**
   * Validates the optional year value.
   * @param {number|string} year - Year of publication.
   * @returns {string|null} Error message or null if valid.
   */
  validateYear(year) {
    if (!year) return null;
    if (String(year).length > 4) return "El año no debe exceder 4 dígitos";
    if (Number(year) < 0) return "El año no puede ser negativo";
    return null;
  },

  /**
   * Validates all fields required for creating a new board game.
   * Returns the first validation error encountered.
   * @param {Object} data - Board game data.
   * @returns {string|null} Error message or null if all fields are valid.
   */
  validateCreate(data) {
    return (
      this.validateName(data.name) ||
      this.validatePublisher(data.publisher) ||
      this.validateCategory(data.category) ||
      this.validateDescription(data.description) ||
      this.validateYear(data.year)
    );
  },

  /**
   * Validates fields allowed during editing.
   * Returns the first validation error encountered.
   * @param {Object} data - Board game data.
   * @returns {string|null} Error message or null if all fields are valid.
   */
  validateEdit(data) {
    return (
      this.validatePublisher(data.publisher) ||
      this.validateCategory(data.category) ||
      this.validateDescription(data.description) ||
      this.validateYear(data.year)
    );
  },
};
