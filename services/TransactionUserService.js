const ServiceBase = require("../helpers/ServicesBase").ServiceBase
const Response = require("../helpers/SevicesResponse")

const mongoose = require("mongoose")
class TransactionUserService extends ServiceBase {
    constructor(model) {
        super(model);
    }

    async create_transactionUserAccount(body) {
        try {
            switch (body.transaction_type) {
                case "0":
                    body.description = `${body.to} received ${body.amount} weekly interest by ${body.from} !!!`
                    break;
                case "1":
                    body.description = `${body.from} invested ${body.amount} in ${body.to} with a ${body.percent}% return !!!`
                    break;
                case "2":
                    body.description = `${body.from} has withdraw ${body.amount} in ${body.to} !!!`
                    break;
                default:
                    throw "This transaction type not exits !!!"
            }

            let transaction_user = await this.model.create(body)
            if (transaction_user) {
                return new Response(false, transaction_user);
            } else {
                return new Response(true, {}, 'Something wrong happened');
            }
        } catch (error) {
            return new Response(true, error, "Error");
        }
    }
}

module.exports = { TransactionUserService }