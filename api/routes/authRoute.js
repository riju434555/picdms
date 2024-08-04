const router = require("express").Router();
const auth = require("../middleware/authMiddleware");

const {
  loginControler,
  userRole,
  registerController,
  login2ndControler,
} = require("../controllers/loginColtroller");

router.post("/login", loginControler);
router.get("/userRole", userRole);
router.post("/register", auth, registerController);
router.post("/login2", auth, login2ndControler);
// router.post("/login2", login2ndControler);

module.exports = router;
