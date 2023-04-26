const asyncHandler = require("express-async-handler");
const taskSchema = require("../models/task");

//
module.exports.getTasks = asyncHandler(async (req, res) => {
  const tasks = await taskSchema.find();
  res.status(200).json(tasks);
  // res.status(200).send({ msg: "get tasks" });
});

//
module.exports.setTasks = asyncHandler(async (req, res) => {
  if (!req.body.msg) {
    res.status(400).send({ msg: "no found task" });
  }
  const tasks = await taskSchema.create(req.body);
  res.status(200).json(tasks);
  // res.status(200).send({ msg: `${req.body.msg}` });
});

//
module.exports.getIndTask = asyncHandler(async (req, res) => {
  const task = await taskSchema.findById(req.params.id);
  if (!task) {
    res.status(400).send({ msg: "no found task" });
  }
  res.status(200).send(task);
  // res.status(200).send({ msg: `get ${req.params.id}` });
});

//
module.exports.putIndTask = asyncHandler(async (req, res) => {
  const task = await taskSchema.findById(req.params.id);
  if (!task) {
    res.status(400).send({ msg: "no found task" });
  }
  const putTask = await taskSchema.findByIdAndUpdate(task, req.body, {
    new: true,
  });
  res.status(200).send(putTask);
  // res.status(200).send({ msg: `put ${req.params.id}` });
});

//
module.exports.patchIndTask = asyncHandler(async (req, res) => {
  const task = await taskSchema.findById(req.params.id);
  if (!task) {
    res.status(400).send({ msg: "no found task" });
  }
  const patchTask = await taskSchema.updateOne(task, req.body, {
    new: true,
  });
  res.status(200).send(task);

  // res.status(200).send({ msg: `patch ${req.params.id}` });
});

//
module.exports.delIndTask = asyncHandler(async (req, res) => {
  const task = await taskSchema.findById(req.params.id);
  if (!task) {
    res.status(400).send({ msg: "no found task" });
  }
  await taskSchema.deleteOne(task);
  res.status(200).send(task);
  // res.status(200).send({ msg: `delete ${req.params.id}` });
});
