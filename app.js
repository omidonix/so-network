var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postsRouter = require('./routes/posts');
var profilesRouter = require('./routes/profile');
var bodyParser = require('body-parser')
var session = require('express-session')
var {configPassport} = require('./config/passport')
var passport = require('passport')
var flash = require('connect-flash')

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false }))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/',express.static(path.join(__dirname, 'public')));
app.use('/upload',express.static(path.join(__dirname, 'upload_dir')));


app.use(session({ secret: 'keyboard cat',resave: true,
saveUninitialized: true }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(configPassport)


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/profile', profilesRouter);

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

