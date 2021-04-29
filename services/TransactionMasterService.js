const ServiceBase = require("../helpers/ServicesBase").ServiceBase
const Response = require("../helpers/SevicesResponse")
const TransactionModel = require("../models/transaction_system").System;
// const TransactionService = require("../services/TransactionService").TransactionService
const mongoose = require("mongoose")
class TransactionMasterService extends ServiceBase {
    constructor(model) {
        super(model);
    }

    async create_transactionMasterAccount(body) {
        try {
            switch (body.transaction_type) {
                case "0":
                    body.description = `${body.from} was invested ${body.amount} to ${body.to} !!!`
                    break;
                case "1":
                    body.description = `${body.from} withdrew ${body.amount} to the bank !!!`
                    body.status = "SPENDING"
                    break;
                case "2":
                    body.description = `${body.from} received ${body.amount} weekly interest !!!`
                    break;
                default:
                    throw "This transaction type not exits !!!"
            }

            let transaction_admin = await this.model.insertMany(body)
            if (transaction_admin) {
                return new Response(false, transaction_admin);
            } else {
                return new Response(true, {}, 'Something wrong happened');
            }
        } catch (error) {
            return new Response(true, error, "Error");
        }
    }

    async updateStatus_Withdraw(ID) {
        try {
            let transaction_admin = await this.model.findOneAndUpdate({ _id: ID }, { $set: { status: "SUCCESS" } });
            if (transaction_admin) {

                await TransactionModel.create({
                    "id_transaction": transaction_admin.id_transaction,
                    "from": transaction_admin.from,
                    "to": transaction_admin.to,
                    "amount": String(transaction_admin.amount),
                    "transaction_type": String(transaction_admin.transaction_type),
                    "description": `${transaction_admin.from} withdrew ${transaction_admin.amount} to the bank !!!`,
                    "category": "WITHDRAW",
                    "status": "SUCCESS"
                });

                return new Response(false, transaction_admin);
            } else {
                return new Response(true, null, "Something wrong happend !!!");
            }

        } catch (error) {
            return new Response(true, error, "Error");
        }
    }
}

module.exports = { TransactionMasterService }