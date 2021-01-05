const Controller = require("../helpers/Controller");
var response = require('../helpers/response');
class AccountMT5Controller extends Controller {
    constructor(service) {
        super(service);
    }
    async getAllAccount(req, res, next) {
        try {
            let result = await this.service.getAll({})
            res.send(response(null, true,200, result.getData(), result.getMessage()))
        } catch (error) {
            res.send(response(error, false, 200,[], result.getMessage()))
        }
    }

    async createAccount(req, res, next) {
        try {          
            let result = await this.service.insert(req.body)
            if(!result.isError()){
                res.send(response(null, true,200, result.getData(), result.getMessage()))

            }else{
            res.send(response(result.getData(), false,200, null, result.getMessage()))

            }
        } catch (error) {
            res.send(response(error, false, 200,[], result.getMessage()))
        }
    }
}

module.exports = { AccountMT5Controller }