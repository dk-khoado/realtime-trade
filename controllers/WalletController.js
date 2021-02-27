const Controller = require("../helpers/Controller");
var response = require('../helpers/response');
const { Wallet, WalletTransation } = require("../models/wallet")
const { WalletService, WalletTrasationService } = require("../services/WalletService")

class WalletController extends Controller {
    constructor(service = new WalletService(Wallet)) {
        super(service)
        this.service = service
        const transation = new WalletTrasationService(WalletTransation)
    }
    async get_balance(req, res) {
        try {
            var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            if (!emailRegex.test(req.query.email)) {
                throw "email cannot null"
            }
            let result = await this.service.get_balance(req.user,req.query.email)
            res.send(this.check_result_db(result))
        } catch (error) {
            res.send(response(error, false, 200, []))
        }
    }
}
module.exports = { WalletController: new WalletController() }