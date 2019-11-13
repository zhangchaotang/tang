const mysql = require("mysql2")

const {db} = require("./config")

const pool = mysql.createPool(db)

module.exports = pool.promise()