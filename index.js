//! Import required modules
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');

const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./model/user');

const listingRouter = require('./routes/listing');
const reviewRouter = require('./routes/review');
const userRouter = require('./routes/user');


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


const sessionOption = {
    secret: 'mysupersecretcode',
    resave: false,
    saveUninitialized: true
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
    next();
})

// app.get('/demouser', async (req, res) => {
//     let fakeUser = new User({
//         email: 'admin@gmail.com',
//         username: 'suraj789'
//     });
//     let registeredUser = await User.register(fakeUser, 'Suraj789');
//     res.send(registeredUser);
// })

app.use('/listings', listingRouter);
app.use('/listings/:id/reviews', reviewRouter);
app.use('/', userRouter)


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
