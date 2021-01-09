const Controller = require("../helpers/Controller");
var response = require('../helpers/response');
const { Gruop, FieldProperties } = require("../models/bot_stratery");


class BotSettingController extends Controller {
    constructor(service) {
        super(service);
    }
    async create_group(req, res, next) {
        try {
            let result = await this.service.create_Group(req.body)
            if (!result.isError()) {
                res.send(response(null, true, 201, result.getData(), result.getMessage()))

            } else {
                res.send(response(result.getData(), false, 201, null, result.getMessage()))
            }
        } catch (error) {
            res.send(response(error, false, 200, []))
        }
    }

    async getAll_gruop(req, res, next) {
        try {
            let result = await this.service.getAll_gruop()
            res.send(response(null, true, 200, result.getData(), result.getMessage()))
        } catch (error) {
            res.send(response(error, false, 200, [], result.getMessage()))
        }
    }

    async create_symbols(req, res, next) {
        try {
            let result = await this.service.create_symbol(req.body)
            if (!result.isError()) {
                res.send(response(null, true, 201, result.getData(), result.getMessage()))
            } else {
                res.send(response(result.getData(), false, 201, null, result.getMessage()))
            }
        } catch (error) {
            res.send(response(error, false, 200, []))
        }
    }

    async getAll_symbols(req, res, next) {
        try {
            let result = await this.service.getAll_symbol()
            res.send(response(null, true, 200, result.getData(), result.getMessage()))
        } catch (error) {
            res.send(response(error, false, 200, [], result.getMessage()))
        }
    }

    async getAll_fields(req, res, next) {
        try {
            let result = await this.service.getAll_fields()
            res.send(response(null, true, 200, result.getData(), result.getMessage()))
        } catch (error) {
            res.send(response(error, false, 200, [], result.getMessage()))
        }
    }

    async create_fields(req, res, next) {
        try {
            let result = await this.service.create_fields(req.body)
            if (!result.isError()) {
                res.send(response(null, true, 201, result.getData(), result.getMessage()))

            } else {
                res.send(response(result.getData(), false, 201, null, result.getMessage()))
            }
        } catch (error) {
            res.send(response(error, false, 200, []))
        }
    }

    async create_setting(req, res, next) {
        try {
            let result = await this.service.create_setting(req.body)
            res.send(this.check_result_db(result))
        } catch (error) {
            res.send(response(error, false, 200, []))
        }
    }

    async get_setting(req =this.request, res, next) {
        try {
            let result = await this.service.get_setting(req.params.stratery_id, req.params.symbol_id)
            res.send(this.check_result_db(result))
        } catch (error) {
            res.send(response(error, false, 200, []))
        }
    }

    async update_setting(req, res, next) {
        try {
            let result = await this.service.update_setting(req.body)
            res.send(this.check_result_db(result))
        } catch (error) {
            res.send(response(error, false, 200, []))
        }
    }
}

module.exports = { BotSettingController }