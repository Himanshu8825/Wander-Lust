const express = require('express');
const router = express.Router();
const User = require('../model/user');
const wrapAsync = require('../utils/wrapAsync');
const passport = require('passport');


router.get('/signup', (req, res) => {
    res.render("users/signup.ejs");
})

router.post("/signup", wrapAsync(async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registredUser = await User.register(newUser, password);
        console.log(registredUser);
        req.flash('success', 'Welcome to wanderLust!.');
        res.redirect('/listings')
    } catch (error) {
        req.flash('error', error.message);
        res.redirect('/signup');
    }
}));


router.get('/login', (req, res) => {
    res.render("users/login.ejs");
})


router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login', failureFlash: true
}),
    async (req, res) => {
        req.flash('success', 'Welcome to WandarLust! you are Logged-In. ');
        res.redirect('/listings')
    })
module.exports = router;