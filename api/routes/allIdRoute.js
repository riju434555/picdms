const router = require("express").Router();
const auth = require("../middleware/authMiddleware");

const { allProfile } = require("../controllers/allIdController");

router.get("/productManager/:id", allProfile);

module.exports = router;
