const ServiceBase = require("../helpers/ServicesBase").ServiceBase
const Response = require("../helpers/SevicesResponse")
var response = require('../helpers/response');

const mongoose = require("mongoose")
class OrderService extends ServiceBase {
    constructor(model) {
        super(model);
    }
    async create_orders(body) {
        try {
            let order = await this.model.create(body);
            if (order) {
                return new Response(false, order);
            } else {
                return new Response(true, {}, 'Something wrong happened');
            }
        } catch (error) {
            return new Response(true, error, "Error");
        }
    }

    async get_info_order(ticket_id) {
        try {
            let order = await this.model.aggregate([{ $match: { "ticket": ticket_id } }]);
            if (order) {
                if (order.length != 0) {
                    return new Response(false, order);
                } else {
                    return new Response(true, {}, 'This order is not exist !!!');
                }
            } else {
                return new Response(true, {}, 'Something wrong happened');
            }
        } catch (error) {
            return new Response(true, error, "Error");
        }
    }

    async lock_order(ticket_id) {
        try {
            let order = await this.model.findOneAndUpdate({ ticket: ticket_id }, { $set: { is_lock: true }});
            if (order) {
                return new Response(false, [], "Close order success !!!");
            } else {
                return new Response(true, {}, 'Something wrong happened');
            }
        } catch (error) {
            return new Response(true, error, "Error");
        }
    }

    async get_list_order(account_id) {
        try {
            let orders = await this.model.aggregate([{ $match: { "account_id": new mongoose.Types.ObjectId(account_id) } }]);
            if (orders) {
                return new Response(false, orders);
            } else {
                return new Response(true, {}, 'Something wrong happened');
            }
        } catch (error) {
            return new Response(true, error, "Error");
        }
    }
}

module.exports = { OrderService }