/**
 * Sequelize instance for database connection.
 * @module db
 */
const { Sequelize } = require("sequelize");

/**
 * Initializes the Sequelize instance.
 * @constant {Sequelize}
 */
const sequelize = new Sequelize(
  process.env.MYSQL_DB,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
    logging: false
  }
);

/**
 * Connects to the MySQL database.
 * This function authenticates the connection to the database instance.
 * If the connection is successful, it logs a success message.
 * If there is an error, it logs an error message and exits the process.
 * @async
 * @function connectDB
 * @throws {Error} If the connection to the database fails.
 * @returns {Promise<void>}
 */
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to MySQL");
  } catch (error) {
    console.error("Error connecting to MySQL", error);

    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };