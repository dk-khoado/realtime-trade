const Controller = require("../helpers/Controller");
var response = require('../helpers/response');

class BotControlController extends Controller {
    constructor(service) {
        super(service);

    }
    async createBotConfig(req, res, next) {
        try {
            let result = await this.service.create_bot_config(req.body)
            if (!result.isError()) {
                res.send(response(null, true, 201, result.getData(), result.getMessage()))
            } else {
                res.send(response(result.getData(), false, 201, null, result.getMessage()))
            }
        } catch (error) {
            res.send(response(error, false, 200, []))
        }
    }

    async getAllConfig(req, res, next) {
        try {
            let result = await this.service.getAll_BotConfig()
            if (!result.isError()) {
                res.send(response(null, true, 201, result.getData(), result.getMessage()))
            } else {
                res.send(response(result.getData(), false, 201, null, result.getMessage()))
            }
        } catch (error) {
            res.send(response(error, false, 200, []))
        }
    }

    async get_bot_config_by_id(req, res, next) {
        var body = req.body;
        try {
            let result = await this.service.get_bot_config(body.stratery_id, body.symbol_id);
            if (!result.isError()) {
                res.send(response(null, true, 201, result.getData(), result.getMessage()))
            } else {
                res.send(response(result.getData(), false, 201, null, result.getMessage()))
            }
        } catch (error) {
            res.send(response(error, false, 200, []))
        }
    }

    async updateBotConfig(req, res, next) {
        var body = req.body;
        try {
            let result = await this.service.update_bot_config(body.stratery_id, body.symbol_id, req.body);
            if (!result.isError()) {
                res.send(response(null, true, 201, result.getData(), result.getMessage()))
            } else {
                res.send(response(result.getData(), false, 201, null, result.getMessage()))
            }
        } catch (error) {
            res.send(response(error, false, 200, []))
        }
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
}

module.exports = { BotControlController }