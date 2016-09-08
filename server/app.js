var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var GoldoonSchema = require('./models/goldoon');
var restful = require('node-restful');



var routes = require('./routes/index');
var users = require('./routes/users');

var doors = require('./routes/doors');

var mongoose = restful.mongoose;

var app = express();

mongoose.connect('mongodb://localhost/acmiot');
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

app.use('/', routes);
app.use('/users', users);
app.use('/doors-api', doors);

//models
var Door = require('./models/doors');
var DoorsResource = app.resource = restful.model('doors', Door)
    .methods(['get', 'put', 'delete', 'post']);
DoorsResource.register(app, '/doors');


var permissions = require('./models/permissions');
var PermissionsRecource = app.resouce = restful.model('permissions', permissions)
    .methods(['get', 'put', 'delete', 'post']);
PermissionsRecource.register(app, '/permissions');


var Resource = app.resource = restful.model('Goldoon', GoldoonSchema).methods(['get', 'post', 'put', 'delete']);

//question
var question = require('./models/question');
var resource = restful.model('question', question)
	.methods(['get', 'put', 'post', 'delete']);
resource.register(app, '/question');

var poll = require('./routes/poll');
app.use('/questions', poll);

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

module.exports = app;
