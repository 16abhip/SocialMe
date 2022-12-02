const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');


passport.use(new googleStrategy({
    clientID: "443746268568-e3o8s18g5ihch97ahq67rfsfeu79eho0.apps.googleusercontent.com", 
    clientSecret: "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", 
    callbackURL: "https://socialme-tn63.onrender.com/user/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done){
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if(err){console.log('error in google stat passport'); return;}
            console.log(profile);
            if(user){
                return done(null, user);
            }else{
                User.create({
                    name: profile.displayName, 
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                    if(err){console.log('error in creating google stat passport'); return;}
                    return done(null ,user);
                });
            }
        });
    }
));

module.exports = passport;
