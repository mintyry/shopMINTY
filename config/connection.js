//require dotenv to protect sensitive db info
require('dotenv').config();

//require instance of Sequelize to make a new instance of it to connect to MYSQL
const Sequelize = require('sequelize');

const sequelize = process.env.JAWSDB_URL //if this is defined, it is running in production; if not defined, it's in development, and is based on our db/server
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

module.exports = sequelize;
