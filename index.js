// Import required modules
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const Listing = require('./model/listing');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');

// Get the MongoDB URI from environment variables
const MONGODB_URL = process.env.MONGODB_URI;

// Function to connect to the database
async function main() {
    try {
        await mongoose.connect(MONGODB_URL);
        console.log("Database Connected");
    } catch (err) {
        console.error("Error connecting to the database:", err);
    }
}

// Call the main function to connect to the database
main()

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
// app.use(express.static, path.join(__dirname, '/public'));
app.use(express.static(path.join(__dirname, "/public")));




// Define a route for the root path ('/') and send a simple response
app.get('/', (req, res) => {
    res.send("Hey, I'm root");
});


//!Index Route
app.get('/listings', async (req, res) => {
    const allListings = await Listing.find({});
    res.render('listings/index.ejs', { allListings });
});


//!New Route
app.get('/listings/new', (req, res) => {
    res.render("listings/new.ejs");
})


//!Read Route
app.get('/listings/:id', async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
})



//!Create Route
app.post('/listings', async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect('/listings')
})


//!Edit Route
app.get('/listings/:id/edit', async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render('listings/edit.ejs', { listing });
})


//!Update Route
app.put('/listings/:id', async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
})


//!Delete Route
app.delete('/listings/:id', async (req, res) => {
    let { id } = req.params;
    const deletedListings = await Listing.findByIdAndDelete(id);
    console.log(deletedListings);
    res.redirect('/listings');
})


// app.get('/testing', async (req, res) => {
//     let sampleListing = new Listing({
//         title: "MyHome",
//         description: "By the beach",
//         price: 1600,
//         location: "Patna, Bihar",
//         country: "India"
//     })
//     await sampleListing.save();
//     console.log("Sample Saved");
//     res.send("Successful testing");
// })



// Start the Express app and listen on port 8080


app.listen(8080, () => {
    console.log("Server is listening on port number 8080");
});
