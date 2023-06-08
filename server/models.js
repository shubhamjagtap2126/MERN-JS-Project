const mongoose = require("mongoose");

// =========> Schema = Budget <=========
const budgetSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    budgetAmount: {
      type: Number,
      required: true,
    },
    expenses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Expense",
      },
    ],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// =========> Schema = Expense <=========
const expenseSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    expense: {
      type: String,
      required: true,
    },
    expenseAmount: {
      type: Number,
      required: true,
    },
    budget: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Budget",
      },
    ],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);


// =========> Schema = Posts <=========
const postSchema = mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId,  ref: "User", required: true },
    content: { type: String, required: true },
    comments: [
      {type: mongoose.Schema.Types.ObjectId, ref: "Comment"},
    ],
  },
  { timestamps: true }
);

// =========> Schema = PostsComments <=========
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

// =========> Schema = PostsCommentsReply <=========
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

// =========> Schema = Tasks <=========
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

// =========> Schema = Users <=========
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
  Budget: mongoose.model("Budget", budgetSchema),
  Expense: mongoose.model("Expense", expenseSchema),
};


