const mongoose = require("mongoose");

//
const postSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

//
const commentSchema = mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reply",
      },
    ],
  },
  { timestamps: true }
);

//
const replySchema = mongoose.Schema(
  {
    commentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//
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

//
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
  Post: mongoose.model("Post", postSchema),
  Comment: mongoose.model("Comment", commentSchema),
  Reply: mongoose.model("Reply", replySchema),
};
