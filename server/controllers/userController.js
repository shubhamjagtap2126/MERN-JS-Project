const asyncHandler = require("express-async-handler");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const { User } = require("../models");

//
module.exports.getUser = asyncHandler(async (req, res) => {
  // res.status(200).json("get route")
  // console.log(req.user._id.toString());
  const user = await User.find({ _id: req.user._id.toString() }).select(
    "-password"
  );
  res.status(200).json(user);
});

//
module.exports.signupUser = asyncHandler(async (req, res) => {
  //   res.status(200).json("signup route");
  const { name, password, email } = req.body;
  if (
    !validator.isAlpha(name) ||
    !validator.isStrongPassword(password, {
      minLength: 4,
      minLowercase: 1,
      minUppercase: 0,
      minNumbers: 1,
      minSymbols: 0,
    }) ||
    !validator.isEmail(email)
  ) {
    res.status(400).json({ error: "Please check the details" });
  }
  // check user exist
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({ error: "user exist" });
  }
  // Hash Password
  const salt = await bcryptjs.genSalt(10);
  const hashpwd = await bcryptjs.hash(password, salt);
  // res.json({ name, email, hashpwd });
  // add new user
  const user = await User.create({ name, email, password: hashpwd });
  if (user) {
    res.status(201).json({ user, token: jwtToken(user._id) });
  } else {
    res.status(400).json({ error: "Invalid User" });
  }
});

//
module.exports.loginUser = asyncHandler(async (req, res) => {
  const { password, email } = req.body;
  if (!password || !email) {
    res.status(400).json({ error: "Please add details" });
  }
  // check user exist
  const user = await User.findOne({ email });
  // userExists({ token: jwtToken(userExists._id) });
  // console.log(userExists);
  if (user && (await bcryptjs.compare(password, user.password))) {
    res.status(201).json({ user, token: jwtToken(user._id) });
  }
  res.status(400).json({ error: "Signup now" });
});

//
module.exports.logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "logout Successful!" });
});

//
module.exports.resetpassword = asyncHandler(async (req, res) => {
  const { password, pwd2, email } = req.body;
  if (!password || !pwd2 || !email) {
    res.status(400).json({ error: "Please add details" });
  }
  // check user exist
  const userExists = await User.findOne({ email });
  if (userExists && password === pwd2) {
    //  Hash the new pwd
    const salt = await bcryptjs.genSalt(10);
    const hashpwd = await bcryptjs.hash(password, salt);
    const user = await User.findOneAndUpdate({ password: hashpwd });
    res.status(200).json({ user, token: jwtToken(user._id) });
  }
  res.status(400);
  throw new Error("Wrong Credentials");
});

// token authorisation
const jwtToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_TOKEN, { expiresIn: "30d" });
};
