const Post = require('../models/post');
const User = require('../models/user');
module.exports.home = async function(req, res){
    // Post.find({}, function(err, posts){
    //     return res.render('home', {
    //         title: 'SocialMe | Home',
    //         posts: posts
    //     });
    // });

    // populate the user of each post
    try{
        let posts = await Post.find({})
    .populate('user')
    .populate({
        path: 'comment', 
        populate: {
            path: 'user' // as mutlyple model is populated
        }
    });
    let user = await User.find({});

    
    return res.render('home', {
        title: 'SocialME | Home', 
        posts: posts, 
        all_user: user
    });

    }catch(err){
        console.log('Error',err );
        return;
    }
    
    

}


// module.exports.actionName = fun(req, res){};
