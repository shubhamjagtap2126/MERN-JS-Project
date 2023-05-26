const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { User } = require("./models");

// Error Handling
module.exports.errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV == "Prod" ? null : err.stack,
  });
  next();
};

// User Auth
module.exports.authUser = asyncHandler(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // console.log(req.headers.authorization);
      jwtToken = req.headers.authorization.split(" ")[1];

      // validation
      const valid = await jwt.verify(jwtToken, process.env.JWT_TOKEN);
      // console.log(valid);
      // get authUser
      req.user = await User.findById(valid.id).select("-password");
      console.log(req.user);
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }
  if (!req.headers.authorization) {
    res.status(401);
    throw new Error("Not authorized, token required");
  }
});

//  isAuthor
module.exports.isPostCommentReplyAuthor = asyncHandler(async(req, res, next) => {
  if (req.user && req.user.id === req.post.userId) {
    // if the user is authenticated and is the author of the post
    return next();
  } else if (req.user && req.user.id === req.comment.userId) {
    // if the user is authenticated and is the author of the comment
    return next();
  } else if (req.user && req.user.id === req.reply.userId) {
    // if the user is authenticated and is the author of the comment
    return next();
  } else {
    // user is not auth or not author
    return res.status(403).json({ message: "You are not authorized" });
  }
})


// isAdmin