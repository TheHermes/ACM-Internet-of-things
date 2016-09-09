var express = require('express');
var router = express.Router();
var ensureAuth = require('../utils');
/* GET home page. */
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();
  // if they aren't redirect them to the home page
  res.redirect('/users/login');
}
router.get('/index', isLoggedIn ,function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;