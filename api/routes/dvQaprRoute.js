server / routes / customerRoute.js;
const db = require("../connection");
const routes = require("express").Router();
const {
  customerProfile,
  registerCustomerController,
} = require("../controllers/customerControl");
const auth = require("../middleware/authMiddleware");

// get all customer ======================================
routes.get("/details", customerProfile);
routes.post("/create", registerCustomerController);

module.exports = routes;
