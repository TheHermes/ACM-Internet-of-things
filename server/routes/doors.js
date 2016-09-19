/**
 * Created by ardavan on 07/09/16.
 */
var express = require('express');
var request = require('request');
var mongoose = require('mongoose');
var router = express.Router();
var Door = require('../models/doors');
var Doors = Door.model;
var Permission = require('../models/permissions')
var Permissions =  Permission.model;

function Authenticated(req,res,next) {
    if (req.user.isAuthenticated)
        return next();
    res.json({'status': 'You are not logged in'})
}

router.post('/open', function(req,res){ //is logged in
    Doors.find({id: req.body.doorId},function(err,d){
        if(err){
            console.log(err);
            res.end();
        }
        else {
            var Today = new Date();
            Permissions.find( { username: req.body.username , startDate: {'$lte': Today}, endDate: {'$gte': Today}, doorId: req.body.doorId}, function (err1, p) {
                if (err1) {
                    console.log(err1);
                    res.end();
                }
                else {
                    if (p != null) { //not null
                        var request = require('request');
                        var string = 'http://localhost:8080/'+req.body.doorId; //can not identify d.ip,why?
                        request('http://localhost/', function (error, response) {
                            if (!error && response.statusCode == 200) {
                               console.log("Welcome in");
                           }
                        });
                    }
                    else {
                        res.json({'status': 'Permission Denied'});
                    }
                }

            });
        }
    });
});

module.exports = router;