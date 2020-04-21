const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/indexRounter');
const usersRouter = require('./routes/usersRouter');
const parkingBaysRouter = require('./routes/parkingBaysRouter')

const app = express();

// view engine setup
// Do not need to handle view in D2
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// log informations about requests
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// Use routers to direct requests
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/findBays', parkingBaysRouter);

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

module.exports = app;
