// Author: Aden Koziol
// ISU Netid : akoziol@iastate.edu
// Date :  April 26, 2024

const mysql = require('mysql2/promise')

const db = mysql. createPool({
    host: "127.0.0.1",
    user: "root",
    password: "password",
    database: "secoms319"
})

module.exports = db;