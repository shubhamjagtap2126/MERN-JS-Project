const asyncHandler = require("express-async-handler");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const { User } = require("../models");

//
module.exports.getUser = asyncHandler(async (req, res) => {
  // res.status(200).json("get route")
  const user = await User.find().select("-password");
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
    res.status(400).json({ msg: "Please check the details" });
  }
  // check user exist
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({ msg: "user exist" });
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
    res.status(400).json({ msg: "Invalid User" });
  }
});

//
module.exports.loginUser = asyncHandler(async (req, res) => {
  const { password, email } = req.body;
  if (!password || !email) {
    res.status(400).json({ msg: "Please add details" });
  }
  // check user exist
  const userExists = await User.findOne({ email });
  // userExists({ token: jwtToken(userExists._id) });
  // console.log(userExists);
  if (userExists && (await bcryptjs.compare(password, userExists.password))) {
    res.status(201).json({ userExists, token: jwtToken(userExists._id) });
  }
  res.status(400).json({ msg: "Signup now" });
});

//
module.exports.logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json({ msg: "logout route" });
});

//
module.exports.frgpswUser = asyncHandler(async (req, res) => {
  const { password, pwd2, email } = req.body;
  if (!password || !pwd2 || !email) {
    res.status(400).json({ msg: "Please add details" });
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
