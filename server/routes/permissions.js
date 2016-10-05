var express = require('express');
var request = require('request');
var mongoose = require('mongoose');
var router = express.Router();
var Permission = require('../models/permissions');
var Permissions = Permission.model;

router.post('/hasPermission', function(req,res){
    Permissions.find({username: req.body.username},function(err,q){
        console.log(q);
        if(err){
            console.log(err);
            res.end();
        }
        else {
            if(q.length > 0){
                res.send('authorized');
            }
            else{
                res.send('unauthorized');
            }
        }
    })
});


module.exports = router;