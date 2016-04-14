var mongoose = require("mongoose");
var passportMongoose = require("passport-local-mongoose");

var userSchema = mongoose.Schema({
    username: String,
    email: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

userSchema.plugin(passportMongoose);

module.exports = mongoose.model("User", userSchema);

