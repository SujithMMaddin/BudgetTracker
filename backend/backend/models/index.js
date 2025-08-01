const dbConfig = require("../config/db.config.js");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: "mysql",
  logging: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Define models
db.user = require("./user.model.js")(sequelize, DataTypes);

module.exports = db;
