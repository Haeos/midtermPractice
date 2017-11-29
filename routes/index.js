var voteRoute = require('../models/Votes');
var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var Vote = mongoose.model('Vote');

router.get('/votes', function (req, res, next) {
  Vote.find(function (err, votes) {
    if (err) { return next(err); }
    res.json(votes);
  });
});

router.post('/votes', function (req, res, next) {
  var vote = new Vote(req.body);
  vote.save(function (err, vote) {
    if (err) { return next(err); }
    res.json(vote);
  });
});

router.delete('/votes/:vote', (req, res) => {
  console.log('Delete router called');
req.vote.remove();
res.sendStatus(200); 
});

router.param('vote', function (req, res, next, id) {
  var query = Vote.findById(id);
  query.exec(function (err, vote) {
    if (err) { return next(err); }
    if (!vote) { return next(new Error("can't find vote")); }
    req.vote = vote;
    return next();
  });
});

router.get('/votes/:vote', function (req, res) {
  res.json(req.vote);
});

router.put('/votes/:vote/upvote', function (req, res, next) {
  req.vote.upvote(function (err, vote) {
    if (err) { return next(err); }
    res.json(vote);
  });
});
module.exports = router;

