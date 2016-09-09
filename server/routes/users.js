var express = require('express');
var router = express.Router();
var passport_auth = require('../utils').authenticate;
var User = require('../models/user.js');


router.get('/', function(req, res, next) {
    res.send('Users Index');
});


router.get('/register', function(req, res, next) {
    res.render('register', {
        'title': 'Register',
        user: req.user
    });
});

router.get('/login', function(req, res, next) {
    res.render('login', {
        title: 'Login',
        user: req.user
    });
});

router.post('/register', function(req, res, next) {
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;

    User.find({
        $or: [{
            email: req.body.email
        }, {
            username: req.body.username
        }]
    }, function(err, users) {
        if (err) {
            console.log(err);
            res.end();
        }
        if (users.length > 0) {
            console.log("User Already Exists");
            res.redirect('register');
        } else {
            var newUser = User({
                email: email,
                username: username,
                password: password
            });
            User.createUser(newUser, function(err) {
                if (err) {
                    console.log(err);
                    res.end();
                }
            });
            res.redirect('/');
        }
    });
});


router.post('/login', passport_auth, function(req, res) {
    res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/users/login');
});


module.exports = router;