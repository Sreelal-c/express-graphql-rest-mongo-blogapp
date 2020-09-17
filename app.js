var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var graphQLRouter = require('./routes/GraphQLRouter');
var restRouter = require('./routes/RESTRouter');
var indexRouter = require('./routes/indexRouter');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
// app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
  }));

 app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Index Router
app.use('/', indexRouter);

// GraphQL Component
app.use('/graphql',graphQLRouter);

// REST API Router
app.use('/api', restRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


mongoose.connect('mongodb://localhost:27017/SimpleBlog', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
  console.log('connected to database service');
}).catch(err =>  {
  console.log(err);
});

module.exports = app;
