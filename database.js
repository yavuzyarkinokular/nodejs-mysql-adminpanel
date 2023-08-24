const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  database: "testing",
  user: "root",
  password: "",
});

connection.connect(function (err) {
  if (err) {
    throw err;
  } else {
    console.log("mysql db is connected to real life");
  }
});

module.exports = connection;
