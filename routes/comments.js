var express = require("express");
var router  = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var User = require("../models/user");
var middleware = require("../middleware");

//Comments New
router.get("/new", middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }   else    {
            res.render("comments/new", {campground: campground});
        }
    });
});

//Comments Create
router.post("/", middleware.isLoggedIn, function (req, res) {
        //lookup campground
    Campground.findById(req.params.id, function(err, campground) {
        if(err){
            req.flash("error", "Something went wrong :(")
            console.log(err);
            res.redirect("/campgrounds");
        }   else    {
            //create new comment
            Comment.create(req.body, function(err, comment){
                if(err){
                    console.log(err);
                }   else    {
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "Successfully added comment! :)")
                    res.redirect("/campgrounds/" + req.params.id);
                }
            });
        }
    });
});

//Comments Edit
router.get("/:commentid/edit", middleware.checkCommentOwnership, function(req, res){
Campground.findById(req.params.id, function(err, campground) {
    if(err){
        console.log(err);
    }   else    {
        Comment.findById(req.params.commentid, function(err, comment){
            if(err){
                console.log(err);
            }   else    {
                res.render("comments/edit", {campground: campground, comment: comment});
            }
            });
        }
    });    
});

//Comments Update
router.put("/:commentid", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.commentid, req.body, function(err, comment){
        if(err){
            console.log(err);
        }   else    {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//Comments Delete
router.delete("/:commentid", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.commentid, function(err){
        if(err){
            console.log(err);
        }   else    {
        req.flash("success", "Comment deleted");
        res.redirect("/campgrounds/" + req.params.id);
        }
    });
}); 

module.exports = router;