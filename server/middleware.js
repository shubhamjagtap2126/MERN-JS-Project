const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { User } = require("./models");

module.exports.errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV == "Prod" ? null : err.stack,
  });
  next();
};

module.exports.authUser = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.header.authorization &&
    req.header.authorization.startsWith("Bearer")
  ) {
    try {
      jwtToken = req.headers.authorization.split(" ")[1];

      // validation
      const valid = await jwt.verify(jwtToken, process.env.JWT_TOKEN);

      // get authUser
      req.user = await User.findById(valid.id).select("-password");
      next();
    } catch (error) {
      console.log(error);
    }
  }
  if (!token) res.status(401);
});

//  isAuthor, isAdmin,
