const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORTt || 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const sassMiddleWare = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');
app.use(sassMiddleWare({
    src: './assets/scss', 
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}))
// use express router 
// layout must be before routes
app.use(cookieParser());
app.use(express.urlencoded())
app.use(express.static('./assets'));
// make the upload path avail 
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(expressLayouts);
// extract the style and scripts from the pages into the layout and place it in the head
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name : 'SocialMe', 
    //to do change secret before deployment
    secret: 'blahsomething', 
    saveUninitialized: false,
    resave: false, 
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser); 
app.use(flash());
app.use(customMware.setFlash);
app.use('/', require('./routes/index'));


app.listen(port, function(err){
    if(err){
        console.log('Error in running server ', err);
        return;
    }
    console.log('Server is running Port: ', port);
});