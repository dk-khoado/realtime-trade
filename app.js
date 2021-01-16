var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()
var db = require("./models/indexDB")
var cors = require("cors")
var indexRouter = require('./routes/index');
var dashboardRouter = require('./routes/dashboard');
var ordersRouter = require('./routes/orders');
const io = require('socket.io')();
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/order', ordersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  console.log(req)
  res.locals.message = "ddos con cặc nè bạn ơi";
  res.locals.error = "Địt mẹ bạn :))";

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

io.attach(process.env.SOCKET_PORT || 3001, {
  pingInterval: 2000
})
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

global.io = io

module.exports = app;
