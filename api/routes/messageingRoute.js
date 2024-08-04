const db = require("../connection");
const routes = require("express").Router();
const {
  messageControll,
  messageCreateController,
} = require("../controllers/messagingController");

// get all customer ======================================
routes.get("/messagebyId/:projectId", messageControll);
routes.post("/create", messageCreateController);

module.exports = routes;
