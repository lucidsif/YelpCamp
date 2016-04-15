var middlewareObj = {};
var Bike = require("../models/bike");
var Comment = require("../models/comment");

middlewareObj.checkBikeOwnership = function(req, res, next){
      if(req.isAuthenticated()){
        Bike.findById(req.params.id, function(err, bike){
        if(err){
            req.flash("error", "Bike not found");
            res.redirect("back");
        } else {
        if(bike.author.id.equals(req.user._id)){
           next();
        } else {
            req.flash("error", "Hey, that's not your bike!");
            res.redirect("back");
        }
    }
    });
    }   else    {
        req.flash("error", "You need to be logged in to do that, silly swabbit");
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next){
        if(req.isAuthenticated()){
        Comment.findById(req.params.commentid, function(err, comment){
            if(err){
                res.redirect("back");
            }   else    {
            if(comment.author.id.equals(req.user._id)){
                next();
            }   else    {
                req.flash("error", "Hey, you don't have permission to do that!")
                res.redirect("back");
            }
            }
        });
    }   else    {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that")
    res.redirect("/login");
};
    
module.exports = middlewareObj