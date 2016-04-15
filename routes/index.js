var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");

//Root route
router.get("/", function(req, res){
    res.render("landing");
});

//Register form
router.get("/register", function(req, res) {
    res.render("auth/register");
});

//handle signup logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp, " + user.username);
            res.redirect("/bikes");
        });
    });
});

//Login Form
router.get("/login", function(req, res){
    res.render("auth/login");
});

//Handle login Logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/bikes",
        failureRedirect: "/login"
    }), function(req, res) {
});
  
//Logout Route    
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/bikes");
});

module.exports = router;