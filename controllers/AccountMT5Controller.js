const Controller = require("../helpers/Controller");
var response = require('../helpers/response');
class AccountMT5Controller extends Controller {
    constructor(service) {
        super(service);
    }
    async getAllAccount(req, res, next) {
        try {
            let result = await this.service.getAll({})
            res.send(response(null, true, 200, result.getData(), result.getMessage()))
        } catch (error) {
            res.send(response(error, false, 200, [], result.getMessage()))
        }
    }

    async createAccount(req, res, next) {
        try {
            let result = await this.service.insert(req.body)
            if (!result.isError()) {
                res.send(response(null, true, 200, result.getData(), result.getMessage()))

            } else {
                res.send(response(result.getData(), false, 200, null, result.getMessage()))

            }
        } catch (error) {
            res.send(response(error, false, 200, [], result.getMessage()))
        }
    }
    async get_stratery(req, res, next) {
        try {
            let result = await this.service.get_stratery(req.body.id)
            res.send(this.check_result_db(result))
        } catch (error) {
            res.send(response(error, false, 200, []))
        }
    }
    async get_all_account(req, res, next) {
        try {
            let result = await this.service.get_all_account()
            res.send(this.check_result_db(result))
        } catch (error) {
            res.send(response(error, false, 200, []))
        }
    }

    async registerAccount(req, res, next) {
        try {
            global.log(module.filename, JSON.stringify(req.body));
            let hasExist = await this.service.model.exists({ username: req.body.username })
            if (hasExist) {
                req.params.id = req.body.username                   
                await this.update(req, res, next);
            } else {
                await this.createAccount(req, res, next);
            }
        } catch (error) {
            global.log(module.filename, result.getMessage())
            res.send(response(error, false, 200, [], result.getMessage()))
        }
    }
}

module.exports = { AccountMT5Controller }