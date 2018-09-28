let mongoose = require('mongoose');
let gracefulShutdown;
let dbURI = 'mongodb://localhost/mean';

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

//Connect to database
mongoose.connect(dbURI,{ useNewUrlParser: true });

// CONNECTION EVENTS
mongoose.connection.on('connected', function() {
  console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose disconnected');
});

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
gracefulShutdown = function(msg, callback) {
  mongoose.connection.close(function() {
    console.log('Mongoose disconnected through ' + msg);
    callback();
  });
};

// BRING IN YOUR SCHEMAS & MODELS
require('./articles');
