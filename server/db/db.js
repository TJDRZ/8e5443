const Sequelize = require("sequelize");
require('dotenv').config();

const db = new Sequelize(process.env.DATABASE_URL);

module.exports = db;

/*

 || "messenger", process.env.SECRET_USERNAME, process.env.SECRET_PASSWORD, {
  host: 'localhost',
  logging: false,
  dialect: 'postgres',
}

*/