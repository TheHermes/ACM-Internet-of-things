var express = require('express');
var request = require('request');
var mongoose = require('mongoose');
var router = express.Router();
var Permission = require('../models/doors');
var Permissions = Permission.model;
router.get('/hasPermission', function(req,res){
    Permissions.findOne({userId: req.params.userId, doorId: req.params.doorId},function(err,q){
        if(err){
            console.log(err);
            res.end();
        }
        else {
            if(q){
                res.send('authorized');
            }
            else{
                res.send('unauthorized');
            }
        }
    })
});

module.exports = router;