const ServiceBase = require("../helpers/ServicesBase").ServiceBase
const Response = require("../helpers/SevicesResponse")
const mongoose = require("mongoose")
class BotControlService extends ServiceBase {
    constructor(model) {
        super(model);
    }
    async create_bot_config(body) {
        try {
            let item = await this.model.create(body)
            if (item) {
                return new Response(false, item);
            } else {
                return new Response(true, {}, 'Something wrong happened');
            }
        } catch (error) {
            return new Response(true, error, "Error");
        }
    }

    async getAll_BotConfig() {
        try {
            let item = await this.model.find({})
            return new Response(false, item);
        } catch (error) {
            return new Response(true, error, "Error");
        }
    }

    async get_bot_config(stratery_id, symbol_id) {
        let result = await this.model.aggregate([{
            $match: {
                "strategy_id": mongoose.Types.ObjectId(stratery_id),
                "symbol_id": mongoose.Types.ObjectId(symbol_id)
            }
        }, {
            $lookup: {
                from: "Symbol",
                localField: "symbol_id",
                foreignField: "_id",
                as: "symbol"
            }
        }, {
            $lookup: {
                from: "BotSetting",
                localField: "bot_setting_id",
                foreignField: "_id",
                as: "bot_setting"
            }
        }, {
            $lookup: {
                from: "BotStratery",
                localField: "strategy_id",
                foreignField: "_id",
                as: "stratery"
            }
        }, {
            $lookup: {
                from: "AccountMt5",
                localField: "account_id",
                foreignField: "_id",
                as: "account"
            }
        },{
            $project: {
                symbol: {
                    $arrayElemAt: [
                        "$symbol.name",
                        0
                    ]
                },
                stratery: {
                    $arrayElemAt: [
                        "$stratery.name",
                        0
                    ]
                },
                account: {
                    $arrayElemAt: [
                        "$account.name",
                        0
                    ]
                },
                _id: 1,
                tokens: 1,
                token_used: 1,
                is_refesh: 1,
                time: 1,
                account_id: 1,
                bot_setting_id: 1,
                strategy_id: 1,
                symbol_id: 1,
                modules: 1
            },
        }]);
        if (result.length > 0) {
            return new Response(false, result[0], 'Get bot config success !!!');
        } else {
            return new Response(true, {}, 'Something wrong happened');
        }
    }

    async update_bot_config(stratery_id, symbol_id, body) {
        try {
            let bot_config = await this.model.findOneAndUpdate({ stratery_id: stratery_id, symbol_id: symbol_id }, body);
            if (bot_config) {
                return new Response(false, [], "Update bot config success !!!");
            } else {
                return new Response(true, {}, 'Something wrong happened');
            }
        } catch (error) {
            return new Response(true, error, "Error");
        }
    }

    async count_and_set_token(stratery_id, symbol_id, amount_token) {
        try {
            let bot_config = await this.model.findOneAndUpdate({ stratery_id: stratery_id, symbol_id: symbol_id }, { token_used: amount_token });
            if (bot_config) {
                return new Response(false, [], "Update token success !!!");
            } else {
                return new Response(true, {}, 'Something wrong happened');
            }
        } catch (error) {
            return new Response(true, error, "Error");
        }
    }
}

module.exports = { BotControlService }