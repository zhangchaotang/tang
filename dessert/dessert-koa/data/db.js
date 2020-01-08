const mysql = require('mysql-pro')

const { db } = require('../config')

const pool = new mysql({
  mysql: db
});

module.exports = pool