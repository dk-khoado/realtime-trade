const Controller = require("../helpers/Controller");
var response = require('../helpers/response');
const { body } = require('express-validator')
class BotControlController extends Controller {
    constructor(service) {
        super(service);

    }

    async updateBotStatus(req = this.request, res = this.response, next) {
        try {
            let active_key = null
            if (req.query.active_key) {
                active_key = req.query.active_key
            }
            let result = await this.service.updateStatus(active_key, req.body)
            res.send(this.check_result_db(result))
        } catch (error) {
            res.send(response(error, false, 200, []))
        }
    }
    async createActiveKey(req = this.request, res = this.response, next) {
        try {
            let active_key = null
            if (req.query.active_key) {
                active_key = req.query.active_key
            }
            let result = await this.service.updateStatus(active_key, req.body)
            res.send(this.check_result_db(result))
        } catch (error) {
            res.send(response(error, false, 200, []))
        }
    }

    async disableSymbol(req = this.request, res = this.response, next) {
        try {
            let link_account = null
            this.check_params(["link_account","symbol_name"], req.body)
            link_account =  req.body.link_account
            let result = await this.service.disableSymbol(link_account, req.body.symbol_name)
            res.send(this.check_result_db(result))
        } catch (error) {
            res.send(response(error, false, 200, []))
        }
    }
    async createBotController(req = this.request, res = this.response, next) {
        try {
            let link_account = null
            this.check_params(["link_account"], req.body)
            link_account =  req.body.link_account
            let result = await this.service.createBotController(link_account)
            res.send(this.check_result_db(result))
        } catch (error) {
            res.send(response(error, false, 200, []))
        }
    }
}

module.exports = { BotControlController }