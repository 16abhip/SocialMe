const fs = require('fs');
const path = require('path');
const User = require('../models/user')
module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        return res.render('user_profile', {
            title : 'User', 
            profile_user: user
        });
    });
}

module.exports.update = async function(req, res){
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
    //         return res.redirect('back');
    //     });
    // }else{
    //     return res.status(401).send('Unauthorized');
    // }
    if(req.user.id == req.params.id){
        try{
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if(err){console.log('*****Multer Error: ', err); return;}
                user.name = req.body.name;
                user.email = req.body.email;
                if(req.file){
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });
        }catch(err){
            req.flash('error', err);
            return res.redirect('back');
        }
    }else{
        req.flash('error', 'Unauthorized!');
        return res.status(401).send('Unauthorized');

    }
}
// render signUp page
module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }
    return res.render('user_sign_up',{
        title: 'SocialMe: Sign Up'
    });
}
//  render signIp page 
module.exports.signIn = function(req, res){

    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }

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
                    console.log('Error in Signing Up!!');
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
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout(function(err){
        if(err){
            console.log('Error in logout');
            return; 
        }
    });
    req.flash('success', 'You have logged out');
    return res.redirect('/');
}