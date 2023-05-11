const asyncHandler = require("express-async-handler");
const { Task } = require("../models");
const { default: mongoose } = require("mongoose");

//
module.exports.getTasks = asyncHandler(async (req, res) => {
  // console.log(req.body);
  const { user_id } = req.body;
  const tasks = await Task.find({ user_id: "644e044838846e2d25544153" }).sort({
    createdAt: -1,
  });
  res.status(200).json(tasks);
  // res.status(200).send({ error: "get tasks" });
});

//
module.exports.setTasks = asyncHandler(async (req, res) => {
  if (!req.body.task) {
    res.status(400).send({ error: "Error: Please add Task !!" });
  }
  const tasks = await Task.create(req.body);
  res.status(200).json(tasks);
  // res.status(200).send({ error: `${req.body.task}` });
});

//
module.exports.getIndTask = asyncHandler(async (req, res) => {
  // console.log(req.params);
  // const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(req.params._id)) {
    res.status(400).send({ error: "Error: Not Valid task id" });
  }
  const task = await Task.findById(req.params);
  console.log(task);
  if (!task) {
    res.status(400).send({ error: "Error: No Task Found !!" });
  }
  res.status(200).send(task);
  // res.status(200).send({ error: `get ${req.params.id}` });
});

//
module.exports.putIndTask = asyncHandler(async (req, res) => {
  // const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(req.params._id)) {
    res.status(400).send({ error: "Error: Not Valid task id" });
  }
  const task = await Task.findById(req.params);
  if (!task) {
    res.status(400).send({ error: "Error: No Task Found !!" });
  }
  const putTask = await Task.findByIdAndUpdate(task, req.body, {
    new: true,
  });
  res.status(200).send(putTask);
  // res.status(200).send({ error: `put ${req.params.id}` });
});

//
module.exports.patchIndTask = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params._id)) {
    res.status(400).send({ error: "Error: Not Valid task id" });
  }
  const _id = req.params;
  const task = await Task.findById(req.params);
  if (!task) {
    res.status(400).send({ error: "Error: No Task Found !!" });
  }
  const patchTask = await Task.updateOne(task, req.body, {
    new: true,
  });
  res.status(200).send(task);

  // res.status(200).send({ error: `patch ${req.params.id}` });
});

//
module.exports.delIndTask = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params._id)) {
    res.status(400).send({ error: "Error: Not Valid task id" });
  }
  const task = await Task.findById(req.params);
  if (!task) {
    res.status(400).send({ error: "Error: No Task Found !!" });
  }
  await Task.deleteOne(task);
  res.status(200).send(task);
  // res.status(200).send({ error: `delete ${req.params.id}` });
});
