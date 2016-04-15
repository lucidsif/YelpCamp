var express = require("express");
var router  = express.Router();
var Bike = require("../models/bike");
var middleware = require("../middleware");


//Campgrounds Index - Show all campgrounds
router.get("/", function(req, res) {
    Bike.find({}, function(err, allBikes){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {bikes: allBikes});
        }
    });
});

//Campgrounds Create- Add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res) {
    var submit = req.body;
    console.log(submit);
    Bike.create(submit, function(err, newBike){
        if(err){
            console.log(err);
        }   else {
            newBike.author.id = req.user.id;
            newBike.author.username = req.user.username;
            newBike.save();
            console.log("campground created! by " + req.user.username);
            res.redirect("/campgrounds");
        }
    });
});

//Campgrounds New - Show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

//Campgrounds Show - show information about one campground
router.get("/:id", function(req, res) {
    Bike.findById(req.params.id).populate("comments").exec(function(err, foundbike) {
        if(err){
            console.log(err);
        }   else {
            res.render("campgrounds/show", {bike: foundbike});
        }
    });
});

//Campgrounds Edit - Show edit form
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Bike.findById(req.params.id, function(err, bike){
            res.render("campgrounds/edit", {bike: bike});
    });
});

//Campgrounds Update - Update campground
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body, function(err, campground){
        if(err){
            res.redirect("/campgrounds/" + req.params.id + "/edit");
        }   else    {
            console.log(req.body);
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//Campgrounds Destroy- Delete Campground
router.delete("/:id", middleware.checkCampgroundOwnership, function(req,res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds/" + req.params.id)
        }   else    {
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;