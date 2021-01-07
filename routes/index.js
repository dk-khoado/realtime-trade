var express = require('express');
var router = express.Router();

var AccountMT5Controller = require("../controllers/AccountMT5Controller").AccountMT5Controller
var AccountMT5Service = require("../services/AccountMT5Service").AccountMT5Service
var AccountMT5Model = require("../models/account_mt5")
var accountMT5 = new AccountMT5Controller(new AccountMT5Service(AccountMT5Model))

var BotSettingController = require("../controllers/BotSettingController").BotSettingController
var BotSettingService = require("../services/BotSettingService").BotSettingService
var BotSettingModel = require("../models/bot_setting")
const botSetting = new BotSettingController(new BotSettingService(BotSettingModel))

var BotStrategyController = require("../controllers/BotStrategyController").BotStrategyController
var BotStrategyService = require("../services/BotStrategyService").BotStrategyService
var BotStrategyModel = require("../models/bot_stratery").BotStratery
const BotStrategy = new BotStrategyController(new BotStrategyService(BotStrategyModel))
/* GET home page. */
router.get('/accounts', accountMT5.getAllAccount);
router.post('/accounts', accountMT5.createAccount);
router.put('/accounts/:id', accountMT5.update);

router.get("/bot-strategy",BotStrategy.getAll)
router.post("/bot-strategy",BotStrategy.insert)
router.put("/bot-strategy/:id",BotStrategy.update)

router.get("/group", botSetting.getAll_gruop)
router.post("/group", botSetting.create_group)

router.get("/symbols", botSetting.getAll_symbols)
router.post("/symbols", botSetting.create_symbols)


router.get("/fields", botSetting.getAll_fields)
router.post("/fields", botSetting.create_fields)



router.get("/bot-setting", botSetting.getAll_fields)
router.post("/bot-setting", botSetting.create_setting)
module.exports = router;
