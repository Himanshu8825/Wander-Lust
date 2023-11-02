const Listing = require("../model/listing");
const Review = require("../model/review");

module.exports.createReview = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      // Handle the case where the listing is not found (null)
      return res.status(404).send("Listing not found");
    }

    const newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success", " New , Review added SuccessFully");
    res.redirect(`/listings/${listing._id}`);
  } catch (err) {
    // Handle other potential errors, e.g., database errors
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports.deleteReview = async (req, res) => {
  let { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Delete review SuccessFully");
  res.redirect(`/listings/${id}`);
};
