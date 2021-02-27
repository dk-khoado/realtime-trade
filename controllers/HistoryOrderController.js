const Controller = require("../helpers/Controller");
var response = require('../helpers/response');

class HistoryOrderController extends Controller {
    constructor(service) {
        super(service);
    }

    async createHistoryOrder(req = this.request, res = this.response, next) {
        var body = req.body;
        try {
            let result = await this.service.create_history_orders(body);
            if (!result.isError()) {
                res.send(response(null, true, 201, result.getData(), result.getMessage()))
            } else {
                res.send(response(result.getData(), false, 201, null, result.getMessage()))
            }
        } catch (error) {
            res.send(response(error, false, 200, []))
        }
    }

    async getHistoryOrder(req = this.request, res = this.response, next) {
        var body = req.body;
        try {
            let result = await this.service.get_history_order(body.username);
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

module.exports = { HistoryOrderController }