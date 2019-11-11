const myql = require("mysql")
const { db } = require("./config")
const conn = myql.createConnection(db)
module.exports = conn