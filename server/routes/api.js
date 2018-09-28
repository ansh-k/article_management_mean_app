const express = require('express');
const router = express.Router();
let mongoose = require('mongoose');
let Article = mongoose.model('Article');

// Error handling
const sendError = (err, res) => {
  response.status = 501;
  response.message = typeof err == 'object' ? err.message : err;
  res.status(501).json(response);
};

// Response handling
let response = {
  status: 200,
  data: [],
  message: null
};

router.post('/article', (req, res) => {
  let myData = new Article(req.body);
  myData.save()
  .then(article => {
    response.data = article;
    res.json(response);
  })
  .catch(err => {
    sendError(err, res);
  });
});

router.put('/article/:id', (req, res) => {
  let articleToUpdate = req.params.id;
  Article.updateOne({_id: articleToUpdate}, req.body, function(err, article) {
    if(err) {
      sendError(err, res);
    } else {
      response.data = article;
      res.json(response);  
    }
  })
});

router.get('/articles', (req, res) => {
  let sort = { _id: -1 };
  Article.find().sort(sort)
  .then(articles => {
    response.data = articles;
    res.json(response);
  })
  .catch(err => {
    sendError(err, res);
  });
});

module.exports = router;
