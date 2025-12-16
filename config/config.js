const { default: PG } = require("pg");

require("dotenv").config();

const { PG_HOST, PG_PORT, PG_USER, PG_PASSWORD, PG_DATABASE, PG_DIALECT } =
  process.env;

module.exports = {
  development: {
    username: PG_USER,
    password: PG_PASSWORD,
    database: PG_DATABASE,
    host: PG_HOST,
    port: PG_PORT,
    dialect: PG_DIALECT,
  },
  test: {
    username: PG_USER,
    password: PG_PASSWORD,
    database: PG_DATABASE,
    host: PG_HOST,
    port: PG_PORT,
    dialect: PG_DIALECT,
  },
  production: {
    username: PG_USER,
    password: PG_PASSWORD,
    database: PG_DATABASE,
    host: PG_HOST,
    port: PG_PORT,
    dialect: PG_DIALECT,
  },
};
