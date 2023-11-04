//! Import required modules
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const session = require("express-session");
const mongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./model/user");

const listingRouter = require("./routes/listing");
const reviewRouter = require("./routes/review");
const userRouter = require("./routes/user");
const MongoStore = require("connect-mongo");
const { error } = require("console");

//! Get the MongoDB URI from environment variables
const port = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URI;

//! Function to connect to the database
async function main() {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("Database Connected");
  } catch (err) {
    console.error("Error connecting to the database:", err);
  }
}

//! Call the main function to connect to the database
main();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

//! app.use(express.static, path.join(__dirname, '/public'));
app.use(express.static(path.join(__dirname, "/public")));

const store = MongoStore.create({
  mongoUrl: MONGODB_URL,
  crypto: {
    secret: "mysupersecretcode",
  },
  touchAfter: 24 * 3600,
});

store.on("error", () => {
  console.log("Error In MngoDB", error);
});

const sessionOption = {
  store,
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized: true,
};

app.use(session(sessionOption));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

app.all("*", (req, res, next) => {
  res.render("pageNotFound.ejs");
});

app.use((err, req, res, next) => {
  console.error(err); // Log the error to the console for debugging
  const statusCode = err.statusCode || 500;
  res.render("error.ejs");
});

//! Start the Express app and listen on port 8080
app.listen(port, () => {
  console.log(`Server is listening on port number ${port}`);
});
