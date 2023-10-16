//! Import necessary modules
const mongoose = require('mongoose');
const { Schema } = mongoose;

//! Define the Review schema
const reviewSchema = new Schema({
    comment: String,
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    createdAt: {
        type: Date,         //! Use 'Date' for date type
        default: Date.now,  //! Set default value to the current date
    },
});

//! Create a mongoose model for 'Review'
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review; //! Export the Review model


