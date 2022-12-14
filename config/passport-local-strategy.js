const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
// authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
    }, 
    function(req, email, password, done){
        // find the user and stablish identity
        User.findOne({email: email}, function(err, user){
            if(err){
                req.flash('error', err);
                return done(err);
            }
            if(!user || user.password != password){
                req.flash('error', 'Invalid Username/Password');
                return done(null, false);
            }
            return done(null, user);
        })
    }
));

// serializing : the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});

// deserializing the user from the key in the cookoie
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding User ---> PAssport'); 
            return done(err);
        }
        return done(null, user);
    });
});

// check authen 
passport.checkAuthentication = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    // it means user is not sign in 
    return res.redirect('/user/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        // req.user contains the current sign-in user from the session cookie and we are just sending this to the locals foe the views
        res.locals.user = req.user;
    }
    return next();
}

module.exports = passport;