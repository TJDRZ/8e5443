const Sequelize = require("sequelize");
require('dotenv').config();

const db = new Sequelize(process.env.DATABASE_URL || "messenger", process.env.SECRET_USERNAME, process.env.SECRET_PASSWORD, {
  host: 'localhost',
  logging: false,
  dialect: 'postgres',
});

module.exports = db;
