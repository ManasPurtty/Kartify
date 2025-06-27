const mongoose = require('mongoose');
const dbgr=require('debug')('development:mongoose');
const  config = require('config');

mongoose
.connect(`${config.get('MONGO_URI')}/scatch`)
.then(function() {
    dbgr("Connected to MongoDB");
})
.catch(function(err) {
    dbgr("Error connecting to MongoDB:", err);
});


module.exports = mongoose.connection; // Export the mongoose connection for use in other files