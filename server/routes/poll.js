var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
/*Get Answer*/

var Question = require('../models/question.js').model;
router.post('/new_answer/:_id', function (req, res) {
	var answer = req.body.answer;
	console.log(answer);
	console.log(req.params['_id']);
	Question.findOne({_id: req.params['_id']} , function (err, q) {
		if(!q.response)
			q.response = [];
		q.response.push(answer);
		q.save(function(err){
			if(err)
				console.log(err);
		});
		
	});
	res.send("Updated!");
});

module.exports = router;