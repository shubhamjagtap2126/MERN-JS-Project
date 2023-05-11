const express = require("express");
const router = express.Router();
const userControls = require("../controllers/userController");
const middleware = require("../middleware");

router.route("/signup").post(userControls.signupUser);

router.route("/login").post(userControls.loginUser);

router.route("/logout").post(userControls.logoutUser);

router.route("/frgpsw").post(userControls.frgpswUser);

router.route("/me").get(userControls.getUser);

module.exports = router;
