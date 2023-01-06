//app.js파일에는 express설정 파일이 있는 코드, routes폴더에 파일이 추가되면 app.js에 코드추가가 꼭 필요
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//보통 변수는 뒤에 Router를 쓰는게 관례적
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var formRouter = require('./routes/form');
var mysqlRouter = require('./routes/mysql');
var boardRouter = require('./routes/board');

var app = express();

// view engine setup - view engine 종류: ejs, jade 등
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/form', formRouter);
app.use('/mysql', mysqlRouter);
app.use('/board',boardRouter);

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
