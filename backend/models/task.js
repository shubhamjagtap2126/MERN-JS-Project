const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  { msg: { type: String, required: [true, "required"] } },
  { timestamps: true }
);

module.exports = mongoose.model("Tasks", taskSchema);
