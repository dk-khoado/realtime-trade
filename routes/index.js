var express = require('express');
var router = express.Router();
var AccountMT5Controller = require("../controllers/AccountMT5Controller").AccountMT5Controller
var AccountMT5Service = require("../services/AccountMT5Service").AccountMT5Service
var AccountMT5Model = require("../models/account_mt5")
var accountMT5 = new AccountMT5Controller(new AccountMT5Service(AccountMT5Model))
/* GET home page. */
router.get('/accounts', accountMT5.getAllAccount);
router.post('/accounts', accountMT5.createAccount);
router.put('/accounts/:id', accountMT5.update);

module.exports = router;
