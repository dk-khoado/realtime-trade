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
                let result = await this.service.update_banlance_account(req.body)
                global.log(module.filename, JSON.stringify(result));
                res.send(this.check_result_db(result))
            } else {
                await this.createAccount(req, res, next);
            }
        } catch (error) {
            global.log(module.filename, error)
            res.send(response(error, false, 200, [], error))
        }
    }
    async get_all_group(req, res, next) {
        try {
            let result = await this.service.get_all_group()
            res.send(this.check_result_db(result))
        } catch (error) {
            res.send(response(error, false, 200, []))
        }
    }

    async get_detail_group(req, res, next) {
        try {
            let result = await this.service.get_detail_group(req.params.id)
            res.send(this.check_result_db(result))
        } catch (error) {
            res.send(response(error, false, 200, []))
        }
    }
    async create_group(req, res, next) {
        try {
            let result = await this.service.create_group(req.body)
            res.send(this.check_result_db(result))
        } catch (error) {
            res.send(response(error, false, 200, []))
        }
    }
    async apply_group(req, res, next) {  
        try {
            let result = await this.service.apply_group(req.body)
            res.send(this.check_result_db(result))
        } catch (error) {
            res.send(response(error, false, 200, []))
        }
    }
    async remove_group(req, res, next) {
        try {
            let result = await this.service.remove_group(req.body)
            res.send(this.check_result_db(result))
        } catch (error) {
            res.send(response(error, false, 200, []))
        }
    }
}

module.exports = { AccountMT5Controller }