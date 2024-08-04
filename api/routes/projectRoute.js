const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const {
  ProjectProfile,
  projectCreate,
  ProjectTypeController,
  ProjectStatusController,
  PiFrontEndTechController,
  PiBackEndTechController,
  projectCreateController,
  ProjectProfileByid,
  ProjectProfilevwByid,
  projectEditController,
} = require("../controllers/projectControl");

router.get("/all", auth, ProjectProfile);
router.get("/projectType", ProjectTypeController);
// router.get("/projectByID:reqId", ProjectProfileByid);
router.get("/projectByID/:reqId", ProjectProfileByid);
router.get("/projectvwByID/:reqId", ProjectProfilevwByid);

router.get("/projectStatus", ProjectStatusController);
router.get("/PiFrontEndTechController", PiFrontEndTechController);
router.get("/PiBackEndTechController", PiBackEndTechController);
router.post("/projectCreate", projectCreateController);
router.put("/projectEdit/:id", projectEditController);

// router.post("/create:id", projectCreate);

module.exports = router;
