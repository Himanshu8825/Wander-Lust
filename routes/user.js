const express = require('express');
const router = express.Router();
const User = require('../model/user');
const wrapAsync = require('../utils/wrapAsync');
const passport = require('passport');
const { saveRedirectUrl } = require('../middileware');


    router.get('/signup', (req, res) => {
        res.render("users/signup.ejs");
    })

    router.post("/signup", wrapAsync(async (req, res) => {
        try {
            let { username, email, password } = req.body;
            const newUser = new User({ email, username });
            const registredUser = await User.register(newUser, password);
            console.log(registredUser);
            req.login(registredUser , (err)=>{
                if (err){
                    return next(err);
                }
                req.flash('success', 'Welcome to wanderLust!.');
                res.redirect('/listings')
            })
          
        } catch (error) {
            req.flash('error', error.message);
            res.redirect('/signup');
        }
    }));


    router.get('/login', (req, res) => {
        res.render("users/login.ejs");
    });


    router.post('/login', saveRedirectUrl, passport.authenticate('local', {
        failureRedirect: '/login', failureFlash: true
    }),
        async (req, res) => {
            req.flash('success', 'Welcome to WandarLust! you are Logged-In. ');
            let redirectUrl = res.locals.redirectUrl || '/listings'
            res.redirect(redirectUrl );
        });


    router.get('/logout' , (req , res , next)=>{
        req.logOut((err)=>{
            if(err){
            return next(err);
            }
            req.flash('success' , 'you have logedout');
            res.redirect('/listings');
        })
    })


module.exports = router;