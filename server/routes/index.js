var express = require('express');
var router = express.Router();

var isLoggedIn = require('../utils').isLoggedIn;

router.get('/', isLoggedIn ,function(req, res, next) {
  res.render('layout', { title: 'Express' });
});

router.get('/index', isLoggedIn ,function(req, res, next) {
  res.render('main', { title: 'Express' });
});

module.exports = router;