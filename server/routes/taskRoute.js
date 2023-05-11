const express = require("express");
const taskcontrols = require("../controllers/taskController");
// const { authUser } = require("../middleware");

const router = express.Router();

router.route("/").get(taskcontrols.getTasks).post(taskcontrols.setTasks);

router
  .route("/:_id")
  .get(taskcontrols.getIndTask)
  .put(taskcontrols.putIndTask)
  .patch(taskcontrols.patchIndTask)
  .delete(taskcontrols.delIndTask);

module.exports = router;
