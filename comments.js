// Create web server
var express = require('express');
var router = express.Router();
var Comment = require('../models/comment');
var Post = require('../models/post');

// POST /comments
router.post('/', function(req, res, next) {
  var comment = new Comment({
    content: req.body.content,
    _post: req.body.post_id
  });

  comment.save(function(err, comment) {
    if (err) { return next(err); }

    Post.findById(comment._post, function(err, post) {
      if (err) { return next(err); }

      post.comments.push(comment);
      post.save(function(err, post) {
        if (err) { return next(err); }

        res.status(201).json(comment);
      });
    });
  });
});

module.exports = router;
