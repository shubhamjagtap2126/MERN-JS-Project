const express = require("express");
const router = express.Router();
const userControls = require("../controllers/userController");
const { authUser } = require("../middleware");

router.route("/signup").post(userControls.signupUser);

router.route("/login").post(userControls.loginUser);

router.route("/logout").post(userControls.logoutUser);

router.route("/resetpassword").post(userControls.resetpassword);

router.route("/me").get(authUser, userControls.getUser);

module.exports = router;
