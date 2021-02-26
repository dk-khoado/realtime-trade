var mongoose = require('mongoose');
const Schema = mongoose.Schema

const OrdersSchema = new Schema({
    ticket: {
        type: String,
        required: true
    },
    account_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    symbol_id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    type_order: {
        type: String,
        required: true
    },
    profit: {
        type: Number,
        required: true
    },
    group_id: {
        type: Schema.Types.ObjectId,
        default: null
    },
    take_profit: {
        type: Number
    },
    stop_loss: {
        type: Number
    },
    slippage: {
        type: Number
    },
    is_lock: {
        type: Boolean,
        default: false
    }
})

module.exports = {
    Order: mongoose.model("Orders", OrdersSchema, "Orders")
}
