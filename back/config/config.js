const dotenv = require( 'dotenv' );
dotenv.config();

module.exports = {
  "development": {
    "username": "root",
    "password": process.env.DB_PASSWORD,
    "database": "gagoboja",
    "host": "127.0.0.1",
    // "host" : "192.168.100.90",
    "dialect": "mysql"
  },

  "test": {
    "username": "root",
    "password": process.env.DB_PASSWORD,
    "database": "gagoboja",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },

  "production": {
    "username": "root",
    "password": process.env.DB_PASSWORD,
    "database": "gagoboja",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
