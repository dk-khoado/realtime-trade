const ServiceBase = require("../helpers/ServicesBase").ServiceBase
const Response = require("../helpers/SevicesResponse")
const mongoose = require("mongoose")
const { BotControl, BotStatus, ActiveKey } = require("../models/bot_manager")
const { v4: uuidv4 } = require('uuid');

class BotControlService extends ServiceBase {
    constructor(model) {
        super(model);
    }

    async updateStatus(active_key, data) {
        try {
            let result = await BotStatus.updateOne({ bot_active_key: active_key }, data)
            if (result) {
                return new Response(false, result, "Update status success !!!");
            } else {
                return new Response(true, [], 'Something wrong happened');
            }
        } catch (error) {

        }
    }
    async createActiveKey(active_key, data) {
        try {
            let result = await ActiveKey.updateOne({ bot_active_key: active_key }, data)
            if (result) {
                return new Response(false, result, "Update status success !!!");
            } else {
                return new Response(true, [], 'Something wrong happened');
            }
        } catch (error) {

        }
    }

    async disableSymbol(link_account, symbol_name, turn_off = false) {
        try {
            let updateQuery = { $addToSet: { "symbols_disable": symbol_name } }
            if (turn_off) {
                updateQuery  = { $pull: { "symbols_disable": symbol_name } }
            }
            let result = await this.model.updateOne({ link_account: link_account },
                updateQuery,
                { setDefaultsOnInsert: true, runValidators: true })
            if (result) {
                return new Response(false, result, `Update success`);
            } else {
                return new Response(true, [], 'Something wrong happened');
            }
        } catch (error) {
            return new Response(true, error, 'Mongo error');
        }
    }


    async createBotController(link_account) {
        try {
            let result = await this.model.create({ link_account: link_account })
            if (result) {
                return new Response(false, result, `Update success`);
            } else {
                return new Response(true, [], 'Something wrong happened');
            }
        } catch (error) {
            return new Response(false, error, `Update success`);
        }
    }
}

module.exports = { BotControlService }