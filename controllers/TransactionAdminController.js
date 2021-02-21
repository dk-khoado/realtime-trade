const Controller = require("../helpers/Controller");
var response = require('../helpers/response');

class TransactionAdminController extends Controller {
    constructor(service) {
        super(service);
        // const change_AdminStream = this.service.model.watch();
        
        // change_AdminStream.on('change', async (change) => {
        //     console.log("change_AdminStream: ", change)
            
        // });
    }

    async createTransMaster(req, res, next) {
        try {
            let result = await this.service.create_transactionMasterAccount(req.body)
            if (!result.isError()) {
                res.send(response(null, true, 201, result.getData(), result.getMessage()))
            } else {
                res.send(response(result.getData(), false, 201, null, result.getMessage()))
            }
        } catch (error) {
            res.send(response(error, false, 200, []))
        }
    }

    async updateStatus(req, res, next) {
        try {
            let result = await this.service.updateStatus_Withdraw(req.body.ID)
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

module.exports = { TransactionAdminController }