const { Post, Comment, Reply } = require("../models");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

module.exports.getPosts = asyncHandler(async (req, res) => {
  try {
    const posts = await Post.find()
      .populate({ path: "comments", populate: ["replies"] })
      .exec();
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports.getOnePost = asyncHandler(async (req, res) => {
  try {
    // console.log(req.params.postid);
    const post = await Post.findById(req.params.postid.toString());
    console.log(post);
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports.getComment = asyncHandler(async (req, res) => {
  try {
    // console.log(req.params.postid);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports.getReply = asyncHandler(async (req, res) => {
  try {
    // console.log(req.params.postid);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports.createPosts = asyncHandler(async (req, res) => {
  try {
    // const { content } = req.body;
    const post = await Post.create({
      content: req.body.content,
      user_id: req.user._id.toString(),
    });
    console.log(post);
    res.status(200).json({ message: "Post created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports.createComment = asyncHandler(async (req, res) => {
  try {
    // const post = await Post.findById(req.params.postid);
    // console.log(req.params.postid.toString(), post);
    const comment = await Comment.create({
      postId: req.params.postid,
      userId: req.user._id,
      content: req.body.content,
    });
    // console.log(comment);
    // console.log(Post.findById(req.params.postid));
    await Post.findByIdAndUpdate(
      { _id: req.params.postid.toString() },
      { $push: { comments: comment._id } }
    );
    res.status(200).json({ message: "Comment created successfully" });
    res.json(comment);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports.createReply = asyncHandler(async (req, res) => {
  try {
    const reply = await Reply.create({
      commentId: req.params.commentid,
      userId: req.user._id,
      content: req.body.content,
    });
    await Comment.findByIdAndUpdate(req.params.commentid.toString(), {
      $push: { replies: reply._id },
    });
    res.status(200).json({ message: "Reply created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports.updateOnePost = asyncHandler(async (req, res) => {
  try {
    // console.log(req.params.postid);
    const post = await Post.findById(req.params.postid.toString());
    console.log(post);
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports.updateComment = asyncHandler(async (req, res) => {
  try {
    // console.log(req.params.postid);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports.updateReply = asyncHandler(async (req, res) => {
  try {
    // console.log(req.params.postid);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports.deleteOnePost = asyncHandler(async (req, res) => {
  try {
    // console.log(req.params.postid);
    const post = await Post.findById(req.params.postid.toString());
    console.log(post);
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports.deleteComment = asyncHandler(async (req, res) => {
  try {
    // console.log(req.params.postid);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports.deleteReply = asyncHandler(async (req, res) => {
  try {
    // console.log(req.params.postid);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});
