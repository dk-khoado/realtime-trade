var express = require('express');
var router = express.Router();
const OrderModel = require("../models/orders").Order;
const OrderService = require("../services/OrderService").OrderService
const OrderController = require("../controllers/OrderController").OrderController

const Order = new OrderController(new OrderService(OrderModel))

const HistoryOrderModel = require("../models/history_order").HistoryOrder;
const HistoryOrderService = require("../services/HistoryOrderService").HistoryOrderService
const HistoryOrderController = require("../controllers/HistoryOrderController").HistoryOrderController

const HistoryOrder = new HistoryOrderController(new HistoryOrderService(HistoryOrderModel))

/* GET users listing. */
router.post('/deals', function(req, res, next) {
  res.send('respond with a resource');
});

//Order
router.post('/get_order', Order.getOrders);

router.post('/lock_order', Order.lock_order);

router.post('/get_list_order', Order.get_list_order);

//Histoy Order
router.post('/create_history', HistoryOrder.createHistoryOrder)

router.post('/get_history', HistoryOrder.getHistoryOrder)

module.exports = router;
