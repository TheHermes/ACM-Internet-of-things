var express = require('express');
var bodyParser = require('body-parser');
var GoldoonSchema = require('./models/goldoon');
var restful = require('node-restful');
var morgan = require('morgan');
var app = express();

var mongoose = restful.mongoose;

// node-restful requirements ...
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/goldoon');

var goldoon = app.resource = restful.model('Goldoon', GoldoonSchema).
    methods(['get', 'post', 'put', 'delete']);

goldoon.register(app, '/goldoon');

app.get('/goldoons', function(req, res) {
    goldoon.find({}, function(err, goldoons) {
        res.send(goldoons);
    });
});

app.listen(3000);
module.exports = app;
