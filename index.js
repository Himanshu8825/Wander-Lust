//! Import required modules
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');

const listings = require('./routes/listing');
const reviews = require('./routes/review');


//! Get the MongoDB URI from environment variables
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
main()

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);


//! app.use(express.static, path.join(__dirname, '/public'));
app.use(express.static(path.join(__dirname, "/public")));


//! Define a route for the root path ('/') and send a simple response
app.get('/', (req, res) => {
    res.send("Hey, I'm root");
});


app.use('/listings', listings);
app.use('/listings/:id/reviews', reviews);


app.all('*', (req, res, next) => {
    res.render('pageNotFound.ejs');
})


app.use((err, req, res, next) => {
    console.error(err); // Log the error to the console for debugging
    const statusCode = err.statusCode || 500;
    res.render('error.ejs');
});


//! Start the Express app and listen on port 8080
app.listen(8080, () => {
    console.log("Server is listening on port number 8080");
});
