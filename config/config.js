require('dotenv').config(); // this is important!
module.exports = {
  "development": {
    "username": "root",
    "password": process.env.MY_SQL_PASSWORD,
    "database": "mailAwayDb",
    "host": "localhost",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "testdb",
    "host": "localhost",
    "dialect": "mysql",
    "logging": false
  },
  "production": {
    "use_env_variable": "JAWSDB_URL",
    "dialect": "mysql"
  }
} 