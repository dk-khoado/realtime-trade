const ServiceBase = require("../helpers/ServicesBase").ServiceBase
const Response = require("../helpers/SevicesResponse")
var response = require('../helpers/response');
const TransactionMasterModel = require("../models/transaction_master").Admin;
const TransactionMasterService = require("../services/TransactionMasterService").TransactionMasterService
const mongoose = require("mongoose")
class TransactionService extends ServiceBase {
    constructor(model) {
        super(model);
    }
    async create_transactionSystem(body) {
        try {
            switch (body.transaction_type) {
                case "0":
                    body.description = `${body.amount} has been invested to ${body.to} from ${body.from} !!!`
                    body.category = `INVEST`
                    break;
                case "1":
                    body.description = `${body.from} withdrew ${body.amount} to the bank !!!`
                    body.category = `WITHDRAW`
                    break;
                case "2":
                    body.description = `${body.amount} has been loaded into the system by ${body.from} !!!`
                    body.category = `RECHARGE`
                    break;
                default:
                    throw "This transaction type not exits !!!"
            }

            let transaction = await this.model.insertMany(body)
            if (transaction) {
                if (transaction.transaction_type == 0) {
                    let bodyMaster = {
                        "id_transaction": transaction.id_transaction,
                        "master_id": transaction.master_id,
                        "amount": transaction.amount,
                        "transaction_type": String(transaction.transaction_type)
                    }
                    let result = await new TransactionMasterService(TransactionMasterModel).create_transactionMasterAccount(bodyMaster);
                    console.log(result)
                }
                return new Response(false, transaction);
            } else {
                return new Response(true, {}, 'Something wrong happened');
            }
        } catch (error) {
            return new Response(true, error, "Error");
        }
    }
}

module.exports = { TransactionService }