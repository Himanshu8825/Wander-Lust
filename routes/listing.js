const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isOwner } = require("../middileware");
const listingController = require("../controllers/listing");

const multer = require("multer");
const { storage } = require("../cloudConfig");
const upload = multer({ storage });

//!Index Route
router.get("/", wrapAsync(listingController.index));

//!New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

//!Read Route
router.get("/:id", wrapAsync(listingController.showForm));

//!Create Route
router.post(
  "/",
  isLoggedIn,
  upload.single("listing[image]"),
  wrapAsync(listingController.createRoute)
);

//!Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.editRoute)
);

//!Update Route
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  upload.single("listing[image]"),
  wrapAsync(listingController.updateRoute)
);

//!Delete Route
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,

  wrapAsync(listingController.deleteRoute)
);

module.exports = router;
