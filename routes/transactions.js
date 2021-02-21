var express = require('express');
var router = express.Router();
const TransactionSystemModel = require("../models/transaction_system").System;
const TransactionMasterModel = require("../models/transaction_master").Admin;
const TransactionUserModel = require("../models/transaction_user").User;

const TransactionService = require("../services/TransactionService").TransactionService
const TransactionController = require("../controllers/TransactionController").TransactionController

const Transaction_MasterService = require("../services/TransactionMasterService").TransactionMasterService
const Transaction_MasterController = require("../controllers/TransactionAdminController").TransactionAdminController

const Transaction_UserService = require("../services/TransactionUserService").TransactionUserService
const Transaction_UserController = require("../controllers/TransactionUserController").TransactionUserController

const Transaction_System = new TransactionController(new TransactionService(TransactionSystemModel))
const Transaction_Master = new Transaction_MasterController(new Transaction_MasterService(TransactionMasterModel))
const Transaction_User = new Transaction_UserController(new Transaction_UserService(TransactionUserModel))

/* GET users listing. */
router.put('/create_trans/system', Transaction_System.createTransystem);

router.put('/create_trans/master', Transaction_Master.createTransMaster);

router.put('/create_trans/user', Transaction_User.createTransUser);

router.post('/update_status/master', Transaction_Master.updateStatus);

module.exports = router;
