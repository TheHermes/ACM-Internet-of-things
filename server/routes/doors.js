/**
 * Created by ardavan on 07/09/16.
 */
var express = require('express');
var request = require('request');
var mongoose = require('mongoose');
var router = express.Router();
var Door = require('../models/doors');
var Doors = Door.model;
var Permission = require('../models/permissions') ;
var Permissions =  Permission.model;

function Authenticated(req,res,next) {
    if (req.isAuthenticated()){
        console.log("Authenticated");
        next();
    }

    else {
        res.status(403);
        res.json({'status': 'You are not logged in'})
    }
}

router.post('/switch', Authenticated,function(req,res){ //is logged in
    Doors.find({id: req.body.doorId},function(err,d){
        if(err){
            console.log(err);
            res.end();
        }
        else {
            var Today = new Date();
            Permissions.findOne( { username: req.body.username , startDate: {'$lte': Today}, endDate: {'$gte': Today}, doorId: req.body.doorId}, function (err1, p) {
                if (err1) {
                    console.log(err1);
                    res.status(500);
                    res.end();
                }
                else {
                    console.log(p);
                    if (p != null) {
                        var request = require('request');
                        var string = p.ip;
                        request(string, function (error, response) {
                            if (!error && response.statusCode == 200) {
                                console.log("Welcome in");
                                console.log("Door Opened");
                           }
                        });
                        res.json({'status': 'Openned'});
                    }
                    else {
                        console.log("Open Door: Permission denied: " + req.body.username);
                        res.status(403);
                        res.json({'status': 'Permission Denied'});
                    }
                }

            });
        }
    });
});

module.exports = router;