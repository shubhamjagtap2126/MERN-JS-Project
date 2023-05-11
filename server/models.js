const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    task: { type: String, required: [true, "required"] },
    isDone: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "required"],
      ref: "User",
    },
  },
  { timestamps: true }
);

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, "required"] },
    email: { type: String, required: [true, "required"], unique: true },
    password: { type: String, required: [true, "required"] },
    isActive: { type: Boolean, default: true },
    role: { type: String, default: "user" },
    // role = ['user ', 'Admin','SAdmin']
  },
  { timestamps: true }
);

module.exports = {
  Task: mongoose.model("Task", taskSchema),
  User: mongoose.model("User", userSchema),
};
