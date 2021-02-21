var express = require('express');
var router = express.Router();
const OrderModel = require("../models/orders").Order;
const OrderService = require("../services/OrderService").OrderService
const OrderController = require("../controllers/OrderController").OrderController

const Order = new OrderController(new OrderService(OrderModel))

/* GET users listing. */
router.post('/deals', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/get_order', Order.getOrders);

router.post('/lock_order', Order.lock_order);

router.post('/get_list_order', Order.get_list_order);

module.exports = router;
