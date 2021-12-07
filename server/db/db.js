const Sequelize = require("sequelize");

const db = new Sequelize(process.env.DATABASE_URL || "messenger", "postgres", "K4rniv4L", {
  logging: false,
  dialect: 'postgres',
  host: 'localhost'
});

module.exports = db;
