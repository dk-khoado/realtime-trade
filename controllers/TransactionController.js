const Controller = require("../helpers/Controller");
var response = require('../helpers/response');

class TransactionController extends Controller {
    constructor(service) {
        super(service);
        // const changeStream = this.service.model.watch();
       
        // changeStream.on('change', async (change) => {
        //     console.log(change)
        // });

    }
    async createTransystem(req, res, next) {
        try {
            let result = await this.service.create_transactionSystem(req.body)
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

module.exports = { TransactionController }