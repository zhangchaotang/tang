const mysql = require('mysql')
const {db} = require("./config")
const comm = mysql.createConnection(db)
module.exports = comm;