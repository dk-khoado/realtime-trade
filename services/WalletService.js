const ServiceBase = require("../helpers/ServicesBase").ServiceBase
const Response = require("../helpers/SevicesResponse")

class WalletService extends ServiceBase {
    constructor(model) {
        super(model);
    }
    async get_balance(user_id, email) {
        try {
            let balance = await this.model.findOne({ user_id: user_id, email: email })
            return new Response(false, balance);
        } catch (error) {
            return new Response(true, error, "Error");
        }
    }
}

class WalletTrasationService extends ServiceBase {
    constructor(model) {
        super(model);
    }
}
module.exports = { WalletService, WalletTrasationService }
