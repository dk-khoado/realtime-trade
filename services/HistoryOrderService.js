const ServiceBase = require("../helpers/ServicesBase").ServiceBase
const Response = require("../helpers/SevicesResponse")
var response = require('../helpers/response');

const mongoose = require("mongoose")
class HistoryOrderService extends ServiceBase {
    constructor(model) {
        super(model);
    }

    async create_history_orders(body) {
        try {
            let history_order = await this.model.create(body);
            if (history_order) {
                return new Response(false, history_order);
            } else {
                return new Response(true, {}, 'Something wrong happened');
            }
        } catch (error) {
            return new Response(true, error, "Error");
        }
    }

    async get_history_order(username) {
        try {
            let order = await this.model.aggregate(
                [
                    { $match: { username: username } },
                    {
                        $group:
                        {
                            _id: "$username",
                            time: { $last: "$time" },
                            time_msc: { $last: "$time_msc" },
                            type: { $last: "$type" },
                            entry: { $last: "$entry" },
                            magic: { $last: "$magic" },
                            position_id: { $last: "$position_id" },
                            volume: { $last: "$volume" },
                            price: { $last: "$price" },
                            commission: { $last: "$commission" },
                            swap: { $last: "$swap" },
                            profit: { $last: "$profit" },
                            fee: { $last: "$fee" },
                            comment: { $last: "$comment" },
                            ticket: { $last: "$ticket" },
                            order: { $last: "$order" },
                            symbol: { $last: "$symbol" },
                        }
                    }
                ]
            );
            if (order) {
                return new Response(false, order);
            } else {
                return new Response(true, {}, 'Something wrong happened');
            }
        } catch (error) {
            return new Response(true, error, "Error");
        }
    }
}

module.exports = { HistoryOrderService }