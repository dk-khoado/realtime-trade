var express = require('express');
var router = express.Router();
const auth = require("../helpers/auth_9586")
const {WalletController} = require("../controllers/WalletController")
/* GET users listing. */
router.get('/wallet',WalletController.get_balance);

module.exports = router;
