var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Clouds's Rest",
        image: "http://croatia.hr/Images/t900x600-6085/Camp.jpg",
        description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."


    }, 
    {
        name: "Bullet Fly",
        image: "http://www.upwithpeople.org/images/camp.jpg",
        description: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
    }, 
    {
        name: "Maggi Chut",
        image: "https://upload.wikimedia.org/wikipedia/commons/1/12/Cabin_Camp_3_PRWI.JPG",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
];

function seedDB(){
    Campground.remove({}, function(err){
      /*  if(err){
            console.log(err);
        }   else    {
            console.log("removed campgrounds!");
             //add campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                    }   else    {
                        console.log("added a campground");
                        //add comments
                        Comment.create(
                            {
                                text: "This place is super dope!",
                                author: "Homer"
                        }, function(err, createdcomment){
                            if(err){
                                console.log(err);
                            }   else    {
                                campground.comments.push(createdcomment);
                                campground.save();
                                console.log("created new comment!");
                            }
                        });
                    }
                });
            });
        } */
    });
}


module.exports = seedDB;

//
/* Campground.remove({}, function(err){
    if(err){
        console.log(err);
    }   else    {
        console.log("campground removed");
        data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                    }   else    {
                        console.log("campground created")
                        Comment.create({
                            text: "Money",
                            author: "Rick James"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            }   else    {
                                campground.comments.push(comment);
                                campground.save(err, comment){
                                    if(err){
                                        console.log(err);
                                    }   else    {
                                        console.log("Comment created for campground");
                                    }
                                }
                            }
                        })
                    }
                });

        })
    }
})
*/


