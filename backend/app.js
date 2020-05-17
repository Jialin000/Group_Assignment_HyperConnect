const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/indexRounter');
const usersRouter = require('./routes/usersRouter');
const parkingBaysRouter = require('./routes/parkingBaysRouter')
const databaseRouter = require('./routes/databaseRouter')
const cors = require('cors');


const app = express();

require("./models");

// connect to the front end
//app.set('views', path.join(__dirname, '../frontend/public'));
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

// log informations about requests
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.use(bodyParser.json());
app.use(cors());


// Use routers to direct requests
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/parkingBays', parkingBaysRouter);
app.use('/update', databaseRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});


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
