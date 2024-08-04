const express = require("express");
const dotenv = require("dotenv");
const mysql = require("mysql");

dotenv.config();

const app = express();

// MySQL Connection
let db;

function handleDisconnect() {
  db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectTimeout: 10000, // Increase timeout to 10 seconds
  });

  db.connect(function (err) {
    if (err) {
      console.error("Error connecting to MySQL: " + err.stack);
      setTimeout(handleDisconnect, 2000); // Attempt to reconnect every 2 seconds
    }
    console.log("Connected to MySQL as id " + db.threadId);
  });

  db.on("error", function (err) {
    console.log("db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleDisconnect(); // Reconnect on connection loss
    } else {
      console.log(err);
      handleDisconnect();
    }
  });
}

handleDisconnect(); // Initial connection
function setupKeepAlive() {
  setInterval(() => {
    db.query("SELECT 1", (err) => {
      if (err) {
        console.error("Error with keep-alive query:", err);
      }
    });
  }, 60000); // Run every minute
}

// Initialize keep-alive queries
setupKeepAlive();

module.exports = db;

//====================================
// db.js
// const mysql = require("mysql");

// // Create a connection pool
// const db = mysql.createPool({
//   connectionLimit: 10, // Maximum number of connections in the pool
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   waitForConnections: true,
//   queueLimit: 0, // Unlimited queue length
// });

// // Function to handle connection errors and reconnect
// function handleDisconnect() {
//   const connection = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//   });

//   connection.connect((err) => {
//     if (err) {
//       console.error("Error connecting to MySQL:", err);
//       setTimeout(handleDisconnect, 2000); // Reconnect after 2 seconds
//     }
//   });

//   connection.on("error", (err) => {
//     if (err.code === "PROTOCOL_CONNECTION_LOST") {
//       handleDisconnect(); // Reconnect if connection is lost
//     } else {
//       throw err;
//     }
//   });

//   return connection;
// }

// // Set up a keep-alive query to prevent idle connections from closing
// function setupKeepAlive() {
//   setInterval(() => {
//     db.query("SELECT 1", (err) => {
//       if (err) {
//         console.error("Error with keep-alive query:", err);
//       }
//     });
//   }, 60000); // Run every minute
// }

// // Initialize keep-alive queries
// setupKeepAlive();

// // Export the pool for use in other parts of your application
// module.exports = db;
