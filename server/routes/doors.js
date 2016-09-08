/**
 * Created by ardavan on 07/09/16.
 */
var express = require('express');
var request = require('request');
var mongoose = require('mongoose');
var router = express.Router();
var Door = require('../models/doors');
var Doors = Door.model;
router.post('/turn/:id', function(req,res){
   Doors.findOne({id: req.params.id},function(err,q){
        if(err){
            console.log(err);
            res.end();
        }
        else {
            request.get(q.ip);
        }
        res.json({'status': 'ok'});
   })
});

module.exports = router;