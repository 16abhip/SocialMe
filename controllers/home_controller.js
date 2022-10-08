const Post = require('../models/post');
const User = require('../models/user');
module.exports.home = function(req, res){
    // Post.find({}, function(err, posts){
    //     return res.render('home', {
    //         title: 'SocialMe | Home',
    //         posts: posts
    //     });
    // });

    // populate the user of each post
    Post.find({})
    .populate('user')
    .populate({
        path: 'comment', 
        populate: {
            path: 'user' // as mutlyple model is populated
        }
    })
    .exec(function(err,posts){
        User.find({}, function(err ,user){
            return res.render('home', {
                title: 'SocialME | Home', 
                posts: posts, 
                all_user: user
            });
        });
    })

}


// module.exports.actionName = fun(req, res){};p