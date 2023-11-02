const User = require("../model/user");

module.exports.renderSignUpForm = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.signUpRoute = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registredUser = await User.register(newUser, password);
    console.log(registredUser);
    req.login(registredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to wanderLust!.");
      res.redirect("/listings");
    });
  } catch (error) {
    req.flash("error", error.message);
    res.redirect("/signup");
  }
};

//!LogIn
module.exports.renderLogInForm = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.loginRoute = async (req, res) => {
  req.flash("success", "Welcome to WandarLust! you are Logged-In. ");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

//!LogOut
module.exports.logOutRoute = (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "you have logedout");
    res.redirect("/listings");
  });
};
