const router = require("express").Router();
const auth = require("../middleware/authMiddleware");

const {
  ProjectProfile,
  projectCreate,
} = require("../controllers/projectControl");
const {
  ProjectTimeLine,
  timelineCreate,
} = require("../controllers/timelineControll");

// timeline ====================================
router.get("/:projectId", auth, ProjectTimeLine);
router.post("/createTimeline", timelineCreate);

module.exports = router;
