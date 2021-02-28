var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()
require("./models/indexDB")

var cors = require("cors")
var indexRouter = require('./routes/index');
var walletRouter = require('./routes/wallet');
var ordersRouter = require('./routes/orders');
var transRouter = require('./routes/transactions');
const io = require('socket.io')();

const logging = require('./helpers/Logger').Logging
const response = require("./helpers/response")
// view engine setup
var app = express();
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

orderController.use((socket, next) => {
  // console.log(socket.handshake);
  next()
})
orderController.on("connection", (socket) => {
  // nhận danh sách lệnh và gửi đi cho các client trong nsp
  logging("orders connected", socket.id)
  socket.on("position:action:list", (positions) => {
    socket.broadcast.emit("position:list", positions)
  })
  // gửi lệnh đên action
  socket.on("orders:create", (order_data) => {
    logging("orders:create", JSON.stringify(order_data))
    socket.broadcast.emit("orders_action_create", response("", true, 200, order_data, "new orders"))
  })

  socket.on("orders:action:prices", (order_data) => {
    socket.broadcast.emit("orders:prices", order_data)
  })

  socket.on("orders_action_create_notify", (msg) => {
    io.emit("orders:notify", msg)
  })
  //chỉnh sửa lệnh
  socket.on("orders:edit", (order_data) => {
    logging("orders:edit", JSON.stringify(order_data))
    socket.broadcast.emit("orders_action_edit", response("", true, 200, order_data, "edit orders"))
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
global.log = logging
module.exports = app;
