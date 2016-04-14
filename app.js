//dependencies
var express             = require("express"),
    app                 = express(),
    bodyParser          = require("body-parser"),
    mongoose            = require("mongoose"),
    methodOverride      = require("method-override"),
    flash               = require("connect-flash"),
    //authentication
    passport            = require("passport"),
    localStrategy       = require("passport-local"),
    passportMongoose    = require("passport-local-mongoose"),
    //models
    Campground          = require("./models/campground"),
    Comment             = require("./models/comment"),
    User                = require("./models/user"),
    seedDB              = require("./seeds");
    //requiring routes
var campgroundsRoutes       = require("./routes/campgrounds"),
    commentsRoutes          = require("./routes/comments"),
    indexRoutes             = require("./routes/index");

var url = process.env.DATABASEURL;
mongoose.connect(url);
//mongoose.connect("mongodb://localhost/yelp_camp");
//mongoose.connect("mongodb://ahmedt93:dragon911@ds023510.mlab.com:23510/motocamp");

app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(flash());


/// Auth
app.use(require("express-session")({
    secret: "Dragon got a big cheek",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(indexRoutes);
app.use("/campgrounds", campgroundsRoutes);
app.use("/campgrounds/:id/comments", commentsRoutes);

//seedDB();
        
//intialize server/////////////////////
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server started");
});