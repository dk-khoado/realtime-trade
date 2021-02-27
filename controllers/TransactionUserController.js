const Controller = require("../helpers/Controller");
var response = require('../helpers/response');

class TransactionUserController extends Controller {
    constructor(service) {
        super(service);
        // const change_UserStream = this.service.model.watch();

        // change_UserStream.on('change', async (change) => {
        //     console.log("change_UserStream: ", change)
            
        // });
    }

    async createTransUser(req, res, next) {
        try {
            let result = await this.service.create_transactionUserAccount(req.body)
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

module.exports = { TransactionUserController }