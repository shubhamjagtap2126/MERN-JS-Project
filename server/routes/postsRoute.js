const express = require("express");
const postsControls = require("../controllers/postsController");
const { authUser } = require("../middleware");

const router = express.Router();

// Posts
router.route("/").get(postsControls.getPosts).post(postsControls.createPosts);

//
router.route("/:postid").get(authUser, postsControls.getOnePost);

// Comments
router.route("/:postid/comments").post(authUser, postsControls.createComment);
//   .patch()
//   .delete();

//
router
  .route("/:postid/comments/:commentid")
  .get(authUser, postsControls.getComment);

// Reply
router
  .route("/:postid/comments/:commentid/replies")
  .post(authUser, postsControls.createReply);

//
router
  .route("/:postid/comments/:commentid/replies/:replyid")
  .get(authUser, postsControls.getReply);

module.exports = router;
