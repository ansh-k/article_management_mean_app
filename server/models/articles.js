const mongoose = require('mongoose');

let articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  publish_date: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

let Article = mongoose.model('Article',articleSchema);
