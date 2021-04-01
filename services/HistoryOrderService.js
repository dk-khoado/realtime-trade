const ServiceBase = require("../helpers/ServicesBase").ServiceBase
const Response = require("../helpers/SevicesResponse")
var response = require('../helpers/response');
var setLastData = require('../helpers/setLastData');

const mongoose = require("mongoose")
class HistoryOrderService extends ServiceBase {
    constructor(model) {
        super(model);
    }

    async create_history_orders(body) {
        for (let i = 0; i < body.items.length; i++) {
            body.items[i].username = body.username
        }
        // console.log(body.items)
        try {
            let history_order = await this.model.insertMany(
                body.items, { ordered: false }
            );
            if (history_order) {
                console.log(history_order)
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
            var objData = setLastData("username",
                [
                    "time",
                    "time_msc",
                    "type",
                    "entry",
                    "magic",
                    "position_id",
                    "volume",
                    "price",
                    "commission",
                    "swap",
                    "profit",
                    "fee",
                    "comment",
                    "ticket",
                    "order",
                    "symbol"
                ])
            let order = await this.model.aggregate(
                [
                    { $match: { username: username } },
                    {
                        $group: objData
                    }
                ]
            );
            if (order) {
                order[0].username = order[0]._id
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