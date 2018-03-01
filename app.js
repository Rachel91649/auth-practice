//DEPENDENCIES
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//AUTH DEPENDENCIES
const session = require('express-session');//creates session cookies.
const passport = require('passport');//authenticates.
const LocalStrategy = require('passport-local').Strategy;//works with passport to authenticate and log users in.

//REQUIRED ROUTES
var index = require('./routes/index');
var users = require('./routes/users');

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
//your auth functions need go here under cookieParser --- because order matters.
app.use(session({
  secret: "\x02\xf3\xf7r\t\x9f\xee\xbbu\xb1\xe1\x90\xfe'\xab\xa6L6\xdd\x8d[\xccO\xfe",//In procudtion make sure to save the session token as a variable
  resave: false, 
  saveUnitialized: true
}));
//^^^this needs to be used before app.use(passport.session()) to ensure that the login session is restored in the correct order. 
app.use(passport.initialize());//this initializes passport
app.use(passport.session());//this is used for persisten login sessions

app.use(express.static(path.join(__dirname, 'public')));

//ROUTES
app.use('/', index);//This is the root route.
app.use('/users', users);


//PASSPORT CONFIGURATION
//I am not sure of how to implement what Michael Herman has in his tutorial here.  Below is what he has
/*
let Account = require('./models/account');//this is requiring the mongo database modelSchema for an account
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.desrializeUser(Account.deserializeUser());
*/

//ERROR HANDLERS

// This is Dev error handler
// Will print stacktrace
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// This is Production error handler
// No stacktraces leaked to user
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
