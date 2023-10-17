const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require('../utils/wrapAsync');
const { listingSchema, reviewSchema } = require('../schema');
const Review = require('../model/review');
const Listing = require('../model/listing');


//!Validate Review
const validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(', ');
    } else {
        next();
    }
};



//!Reviews Post Route
router.post('/', validateReview, wrapAsync(async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);

        if (!listing) {
            // Handle the case where the listing is not found (null)
            return res.status(404).send('Listing not found');
        }

        const newReview = new Review(req.body.review);

        listing.reviews.push(newReview);

        await newReview.save();
        await listing.save();
        req.flash('success', " New , Review added SuccessFully");
        res.redirect(`/listings/${listing._id}`);
    } catch (err) {
        // Handle other potential errors, e.g., database errors
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}));



//!Reviews Delete Route
router.delete('/:reviewId', wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', "Delete review SuccessFully");
    res.redirect(`/listings/${id}`);
}))


module.exports = router;