var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()
var db = require("./models/indexDB")
var cors = require("cors")
var indexRouter = require('./routes/index');
var walletRouter = require('./routes/wallet');
var ordersRouter = require('./routes/orders');
var transRouter = require('./routes/transactions');
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
app.use('/account', walletRouter);
app.use('/trans', transRouter);

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
const workspaces = io.of(/^\/setting\/\w+$/);
const orderController = io.of(/^\/orders\/\w+$/);
const open_position = {}
orderController.on("connection", (socket) => {
    socket.on("open_position", (history)=>{

    })
})

workspaces.on('connection', (socket) => {
  const workspace = socket.nsp;
  console.log('user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
global.io = io

module.exports = app;
