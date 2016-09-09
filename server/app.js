var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var restful = require('node-restful');

var session = require('express-session');
var passport = require('passport');
// var cookieSession = require('cookie-session');


var mongoose = restful.mongoose;
mongoose.connect('mongodb://localhost/acm-iot');


var routes = require('./routes/index');

var doors = require('./routes/doors');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'testestst' }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', routes);
app.use('/doors-api', doors);

//models
var Door = require('./models/doors');
var DoorsResource = restful.model(Door.model_name, Door.schema)
    .methods(['get', 'put', 'delete', 'post']);
DoorsResource.register(app, '/doors');


var Permission = require('./models/permissions');
var PermissionsResource = app.resouce = restful.model(Permission.model_name, Permission.schema)
    .methods(['get', 'put', 'delete', 'post']);
PermissionsResource.register(app, '/permissions');

var Goldoon = require('./models/goldoon');

var GoldoonResource = restful.model(Goldoon.model_name, Goldoon.schema).methods(['get', 'post', 'put', 'delete']);
GoldoonResource.register(app, '/goldoons')

//question
var Question = require('./models/question');
var Questionresource = restful.model(Question.model_name, Question.schema)
	.methods(['get', 'put', 'post', 'delete']);
Questionresource.register(app, '/question');

// app.use(passport.authenticate('remember-me'));
var poll = require('./routes/poll');
app.use('/questions', poll);
var users = require('./routes/users');
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(8080);
console.log("Started");
module.exports = app;
