const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const { listingSchema, reviewSchema } = require('../schema');
const Listing = require('../model/listing');

//!Index Route
router.get('/', wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render('listings/index.ejs', { allListings });
}));


//!New Route
router.get('/new', (req, res) => {
    res.render("listings/new.ejs");
})


//!Read Route
router.get('/:id', wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate('reviews');
    if (!listing) {
        req.flash('error', "Listing you have requested does not exits!");
        res.redirect('/listings');
    }
    res.render("listings/show.ejs", { listing });
}));



//!Create Route
router.post(
    '/',
    wrapAsync(async (req, res, next) => {
        let result = listingSchema.validate(req.body);
        console.log(result);
        const newListing = new Listing(req.body.listing);
        await newListing.save();
        req.flash('success', "New Listing Created");
        res.redirect('/listings');
    })
);


//!Edit Route
router.get('/:id/edit', wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash('error', "Listing you have requested does not exits!");
        res.redirect('/listings');
    }
    req.flash('success', "Edit Listing SuccessFully");
    res.render('listings/edit.ejs', { listing });
}));


//!Update Route
router.put('/:id', wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash('success', "Update Listing SuccessFully");
    res.redirect(`/listings/${id}`);
}));


//!Delete Route
router.delete('/:id', wrapAsync(async (req, res) => {
    let { id } = req.params;
    const deletedListings = await Listing.findByIdAndDelete(id);
    console.log(deletedListings);
    req.flash('success', "Delete Listing SuccessFully");
    res.redirect('/listings');
}));

module.exports = router;