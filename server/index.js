var express = require('express');
var bodyParser = require('body-parser');
var GoldoonSchema = require('./models/goldoon');
var restful = require('node-restful');
var app = express();

var mongoose = restful.mongoose;
mongoose.connect('mongodb://localhost/goldoon');

app.set('view engine', 'jade');
app.use(bodyParser.json());

var goldoonResource = app.resource = restful.model('Goldoon', GoldoonSchema).
    methods(['get', 'post', 'put', 'delete']);

app.listen(3000);
module.exports = app;
