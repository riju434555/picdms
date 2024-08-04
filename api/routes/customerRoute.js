const db = require("../connection");
const routes = require("express").Router();
const {
  customerProfile,
  editCustomerController,
  registerCustomerController,
} = require("../controllers/customerControl");
const auth = require("../middleware/authMiddleware");

// get all customer ======================================
routes.get("/details", customerProfile);
routes.post("/create", registerCustomerController);
routes.put("/edit/:id", editCustomerController);

module.exports = routes;
