const asyncHandler = require("express-async-handler");
const { Task } = require("../models");
const mongoose = require("mongoose");

//
module.exports.getTasks = asyncHandler(async (req, res) => {
  // { user_id: "644e044838846e2d25544153" }

  const tasks = await Task.find({ user_id: req.user._id.toString() }).sort({
    createdAt: -1,
  });
  res.status(200).json(tasks);
  // res.status(200).json({ error: "get tasks" });
});

//
module.exports.setTasks = asyncHandler(async (req, res) => {
  if (!req.body.task) {
    res.status(400).json({ error: "Error: Please add Task !!" });
  }
  // console.log(req.user);
  const tasks = await Task.create({
    task: req.body.task,
    user_id: req.user._id.toString(),
  }).catch((err) => console.log(err.message));
  res.status(200).json(tasks);
  // res.status(200).json({ error: `${req.body.task}` });
});

//
module.exports.getIndTask = asyncHandler(async (req, res) => {
  // console.log(req.params);
  // const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(req.params._id)) {
    res.status(400).json({ error: "Error: Not Valid task id" });
  }
  const task = await Task.findById(req.params);
  console.log(task);
  if (!task) {
    res.status(400).json({ error: "Error: No Task Found !!" });
  }
  res.status(200).json(task);
  // res.status(200).json({ error: `get ${req.params.id}` });
});

//
module.exports.putIndTask = asyncHandler(async (req, res) => {
  // const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(req.params._id)) {
    res.status(400).json({ error: "Error: Not Valid task id" });
  }
  const task = await Task.findById(req.params);
  if (!task) {
    res.status(400).json({ error: "Error: No Task Found !!" });
  }
  const putTask = await Task.findByIdAndUpdate(task, req.body, {
    new: true,
  });
  res.status(200).json(putTask);
  // res.status(200).json({ error: `put ${req.params.id}` });
});

//
module.exports.patchIndTask = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params._id)) {
    res.status(400).json({ error: "Error: Not Valid task id" });
  }
  const _id = req.params;
  const task = await Task.findById(req.params);
  if (!task) {
    res.status(400).json({ error: "Error: No Task Found !!" });
  }
  const patchTask = await Task.updateOne(task, req.body, {
    new: true,
  });
  res.status(200).json(task);

  // res.status(200).json({ error: `patch ${req.params.id}` });
});

//
module.exports.delIndTask = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params._id)) {
    res.status(400).json({ error: "Error: Not Valid task id" });
  }
  const task = await Task.findById(req.params);
  if (!task) {
    res.status(400).json({ error: "Error: No Task Found !!" });
  }
  await Task.deleteOne(task);
  res.status(200).json(task);
  // res.status(200).json({ error: `delete ${req.params.id}` });
});
