const asyncHandler = require("express-async-handler");

//
module.exports.getTasks = asyncHandler(async (req, res) => {
  res.status(200).send({ msg: "get tasks" });
});

//
module.exports.setTasks = asyncHandler(async (req, res) => {
  if (!req.body.msg) {
    res.status(400).send({ msg: "no found task" });
  }
  res.status(200).send({ msg: `${req.body.msg}` });
});

//
module.exports.getIndTask = asyncHandler(async (req, res) => {
  res.status(200).send({ msg: `get ${req.params.id}` });
});

//
module.exports.putIndTask = asyncHandler(async (req, res) => {
  res.status(200).send({ msg: `put ${req.params.id}` });
});

//
module.exports.patchIndTask = asyncHandler(async (req, res) => {
  res.status(200).send({ msg: `patch ${req.params.id}` });
});

//
module.exports.delIndTask = asyncHandler(async (req, res) => {
  res.status(200).send({ msg: `delete ${req.params.id}` });
});
