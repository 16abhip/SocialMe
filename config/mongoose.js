const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://16_abhip:0361@cluster0.kektciz.mongodb.net/socialme_development');

const db = mongoose.connection;
db.on('error', function(){
    console.log('Error in connecting to db');
});

db.once('open', function(){
    console.log('Connected to Database :: MongoDb');
});

module.exports = db;