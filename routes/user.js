const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middileware");

const userController = require("../controllers/users");

router.get("/signup", userController.renderSignUpForm);

router.post("/signup", wrapAsync(userController.signUpRoute));

router.get("/login", userController.renderLogInForm);

router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userController.loginRoute
);

router.get("/logout", userController.logOutRoute);

module.exports = router;
