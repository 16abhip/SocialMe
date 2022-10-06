const User = require('../models/user')
module.exports.profile = function(req, res){
    return res.render('user', {
        title : 'User'
    });
}
// render signUp page
module.exports.signUp = function(req, res){
    return res.render('user_sign_up',{
        title: 'SocialMe: Sign Up'
    });
}
//  render signIp page 
module.exports.signIn = function(req, res){
    return res.render('user_sign_in',{
        title: 'SocialMe: Sign In'
    });
}
//  get the signUp data 
module.exports.create = function(req, res){
    if(req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }
    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log('Error in finding User');
            return;
        }
        if(!user){
            User.create(req.body, function(err, user){
                if(err){
                    console.log('Error in Signing Up');
                    return;
                }
                return res.redirect('/user/sign-in');
            });
        }
        else{
            return res.redirect('back');
        }
    });
    
}

// sign in and create session for user

module.exports.createSession = function(req, res){
    // to do Later
}
