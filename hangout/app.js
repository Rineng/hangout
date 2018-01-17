var express = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var index = require('./routes/events');
var users = require('./routes/users');
var hangout = require('./routes/hangout');
var passport = require('passport');
var flash = require('connect-flash');
var path = require('path');

var expressSession = require('express-session');



//var cons = require('consolidate'); //to use default html engine
var app = express();

//Set up mongoose connection
var mongoose = require('mongoose');
//var mongoDB = 'mongodb://rineng:ilovemango@ds135777.mlab.com:35777/medical';
mongoose.connect('mongodb://rineng:ilovemango@ds237717.mlab.com:37717/chillout');
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// view engine setup
//app.engine('html', cons.swig); //for default html engine
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'html');
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash())
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.session());

app.use('/hangout', hangout);
app.use('/hangout/user', users);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
