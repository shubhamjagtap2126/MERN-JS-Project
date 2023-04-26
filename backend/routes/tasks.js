const express = require("express");
const taskcontrols = require("../controllers/tasks");

const router = express.Router();

router.route("/").get(taskcontrols.getTasks).post(taskcontrols.setTasks);

router
  .route("/:id")
  .get(taskcontrols.getIndTask)
  .put(taskcontrols.putIndTask)
  .patch(taskcontrols.patchIndTask)
  .delete(taskcontrols.delIndTask);

module.exports = router;
