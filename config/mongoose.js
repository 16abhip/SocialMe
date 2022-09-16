const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/socialme_development');

const db = mongoose.connection;
db.on('error', function(){
    console.log('Error in connecting to db');
});

db.once('open', function(){
    console.log('Connected to Database :: MongoDb');
});

module.exports = db;