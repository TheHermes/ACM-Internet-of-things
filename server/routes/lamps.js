var express = require('express');
var router = express.Router();
var Lamp = require('../models/lamp.js');
var ensureAuth = require('../models/user.js').ensureAuth;


// home page
router.get('/', ensureAuth, function(req, res, next) {
    res.render('index', {
        title: 'Main Page',
        user: req.user
    });
});

router.post('/add', function(req, res, next) {
    var ip = req.body.ip;
    var id = req.body.id;
    var newLamp = Lamp({
        ip: ip,
        id: id
    });
    newLamp.save(function(err) {
        if (err) {
            console.log(err);
            res.end();
        } else {
            console.log("New Lamp Added");
            res.end();
        }
    });
});

router.post('/switch/:id', ensureAuth, function(req, res, next) {
    var id = req.params.id;
    Lamp.findOne({
        id: id
    }, function(err, lamp) {
        if (err) {
            console.log("New Lamp Added");
            res.end();
        }
        if (!lamp) return;
        else {
            Lamp.addEvent(lamp, req.user.username, function(err) {
                if (err) {
                    console.log("New Lamp Added");
                    res.end();
                } else {
                    console.log("Switeched");
                }
            });
        }
    })
});

module.exports = router;