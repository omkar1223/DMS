// sequelize.js
const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true, // This will require SSL connection
        rejectUnauthorized: false, // For self-signed certificates or for local testing, otherwise set to true.
      },
    },
  }
);

module.exports = sequelize;
