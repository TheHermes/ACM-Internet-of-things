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
//var isLoggedIn = require('../utils').isLoggedIn;

router.post('/turn/:id', Authenticated, function(req,res){ //is logged in
    Doors.findOne({id: req.params.id},function(err,d){
        if(err){
            console.log(err);
            res.end();
        }
        else { 
            Permissions.find({userId: req.user.userId}, function (err1, p) {
                if (err1) {
                    console.log(err1);
                    res.end();
                }
                else {
                    if (p.length > 0) { //find a permission which ends after this time and starts before
                        var Today = new Date();
                        p.findOne({startDate: {'$lte': Today}, endDate: {'$gte': Today}}, function (err2, permission) {
                            if (err2) {
                                console.log(err2);
                                res.end();
                            }
                            else {
                                if (permission) { //is it necessary?
                                    request.get(d.ip);
                                }
                                else {
                                    res.json({'status': 'Permission Expired'});
                                }
                            }
                        });
                    }
                    else {
                        res.json({'status': 'Permission Denied'})
                    }
                }
            });
        }
    });
});

module.exports = router;