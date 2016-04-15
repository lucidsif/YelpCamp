var express = require("express");
var router  = express.Router();
var Bike = require("../models/bike");
var middleware = require("../middleware");


//Bike Index - Show all bikes
router.get("/", function(req, res) {
    Bike.find({}, function(err, allBikes){
        if(err){
            console.log(err);
        } else {
            res.render("bikes/index", {bikes: allBikes});
        }
    });
});

//Bike Create- Add new bike to DB
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
            console.log("bike created! by " + req.user.username);
            req.flash("success", "Created new motorcycle");
            res.redirect("/bikes");
        }
    });
});

//Bike New - Show form to create new bike
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("bikes/new");
});

//Bike Show - show information about one bike
router.get("/:id", function(req, res) {
    Bike.findById(req.params.id).populate("comments").exec(function(err, foundbike) {
        if(err){
            console.log(err);
        }   else {
            res.render("bikes/show", {bike: foundbike});
        }
    });
});

//Bike Edit - Show edit form
router.get("/:id/edit", middleware.checkBikeOwnership, function(req, res) {
    Bike.findById(req.params.id, function(err, bike){
            res.render("bikes/edit", {bike: bike});
    });
});

//Bikes Update - Update bike
router.put("/:id", middleware.checkBikeOwnership, function(req, res){
    Bike.findByIdAndUpdate(req.params.id, req.body, function(err, bike){
        if(err){
            res.redirect("/bikes/" + req.params.id + "/edit");
        }   else    {
            console.log(req.body);
            req.flash("success", "Updated motorcycle");
            res.redirect("/bikes/" + req.params.id);
        }
    });
});

//Bikes Destroy- Delete Bike
router.delete("/:id", middleware.checkBikeOwnership, function(req,res){
    Bike.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/bikes/" + req.params.id)
        }   else    {
            req.flash("success", "Removed motorcycle");
            res.redirect("/bikes");
        }
    });
});

module.exports = router;