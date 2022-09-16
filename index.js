const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
// use express router 
// layout must be before routes
app.use(express.static('./assets'));
app.use(expressLayouts);
app.use('/', require('./routes/index'));

app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function(err){
    if(err){
        console.log('Error in running server ', err);
        return;
    }
    console.log('Server is running Port: ', port);
});