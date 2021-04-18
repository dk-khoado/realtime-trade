var express = require('express');
var router = express.Router();
const auth = require("../helpers/auth_9586")
var AccountMT5Controller = require("../controllers/AccountMT5Controller").AccountMT5Controller
var AccountMT5Service = require("../services/AccountMT5Service").AccountMT5Service
var AccountMT5Model = require("../models/account_mt5").AccountMt5
var accountMT5 = new AccountMT5Controller(new AccountMT5Service(AccountMT5Model))

var BotSettingController = require("../controllers/BotSettingController").BotSettingController
var BotSettingService = require("../services/BotSettingService").BotSettingService
var BotSettingModel = require("../models/bot_setting").BOT_SETTING
const botSetting = new BotSettingController(new BotSettingService(BotSettingModel))

var BotStrategyController = require("../controllers/BotStrategyController").BotStrategyController
var BotStrategyService = require("../services/BotStrategyService").BotStrategyService
var BotStrategyModel = require("../models/bot_stratery").BotStratery
const BotStrategy = new BotStrategyController(new BotStrategyService(BotStrategyModel))

var BotControlController = require("../controllers/BotControlController").BotControlController
var BotControlService = require("../services/BotControllerService").BotControlService
var BotControlModel = require("../models/bot_setting").BOT_CONTROL
const botControl = new BotControlController(new BotControlService(BotControlModel))

const core = require('../controllers/CoreController');
router.use(auth)
/* GET home page. */
router.get('/accounts', accountMT5.get_all_account);
router.post('/accounts', accountMT5.createAccount);
router.put('/accounts/:id', accountMT5.update);

router.post('/accounts/register', accountMT5.registerAccount);
//nhóm tài khoản
router.get("/accounts/groups", accountMT5.get_all_group);
router.post("/accounts/groups", accountMT5.create_group);
//chuyern 0 để lấy nhóm mặc định
router.get("/accounts/groups/:id", accountMT5.get_detail_group)

router.post("/accounts/groups/apply", accountMT5.apply_group) 
router.post("/accounts/groups/remove", accountMT5.remove_group)

//tạo chiến lượt
router.get("/bot-strategy", BotStrategy.getAll)
// {
//     "name":"luot 11)1212"
// }
router.post("/bot-strategy", BotStrategy.insert)
router.put("/bot-strategy/:id", BotStrategy.update)



// client k quan tâm
router.get("/symbols", botSetting.getAll_symbols)
router.post("/symbols", botSetting.create_symbols)


router.get("/fields", botSetting.getAll_fields)
router.post("/fields", botSetting.create_fields)


//tạo setting cho chiên lượt
router.get("/bot-setting/:stratery_id/symbol/:symbol_id", botSetting.get_setting)
// {
//     "strategy_id":"5ff4ab5a85f5770d581e4d28",
//     "symbol_id":"5ff69a77a8eab931f42da9f4",
//     "fields":[
//         {
//             "field_id":"",
//             "value":""
//         }
//     ]
// }
router.post("/bot-setting", botSetting.create_setting)
router.put("/bot-setting", botSetting.update_setting)

router.get("/bot-running/:id", botSetting.get_setting_by_account)

router.post("/setting-status", botSetting.update_bot_status)

//Tạo bot config
router.put("/create_config", botControl.createBotConfig);
router.get("/getAllConfig", botControl.getAllConfig);
router.post("/getConfigByID", botControl.get_bot_config_by_id);
router.post("/update_bot_config", botControl.updateBotConfig);

router.get("/api/core/:model_name/:id", (req, res,next)=>{
    core.getModelByName(req.params.model_name).getAll(req, res, next)
});

module.exports = router;
