const Controller = require("../helpers/Controller");
var response = require('../helpers/response');

class OrderController extends Controller {
    constructor(service) {
        super(service);
    }

    async getOrders(req = this.request, res = this.response, next) {
        var body = req.body;
        try {
            let result = await this.service.get_info_order(body.ticket);
            if (!result.isError()) {
                res.send(response(null, true, 201, result.getData(), result.getMessage()))
            } else {
                res.send(response(result.getData(), false, 201, null, result.getMessage()))
            }
        } catch (error) {
            res.send(response(error, false, 200, []))
        }
    }

    async lock_order(req = this.request, res = this.response, next){
        var body = req.body;
        try {
            let result = await this.service.lock_order(body.ticket);
            if (!result.isError()) {
                res.send(response(null, true, 201, result.getData(), result.getMessage()))
            } else {
                res.send(response(result.getData(), false, 201, null, result.getMessage()))
            }
        } catch (error) {
            res.send(response(error, false, 200, []))
        }
    }

    async get_list_order(req = this.request, res = this.response, next){
        var body = req.body;
        try {
            let result = await this.service.get_list_order(body.account_id);
            if (!result.isError()) {
                res.send(response(null, true, 201, result.getData(), result.getMessage()))
            } else {
                res.send(response(result.getData(), false, 201, null, result.getMessage()))
            }
        } catch (error) {
            res.send(response(error, false, 200, []))
        }
    }
}

module.exports = { OrderController }