const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: "sql12.freesqldatabase.com" || "localhost",
  user: "sql12760735" || "root",
  password: "GG9dsRE5px" || "",
  database: "sql12760735" || "ppb_project",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
