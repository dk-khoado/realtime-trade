var mongoose = require('mongoose');
const Schema = mongoose.Schema

const OrdersHistorySchema = new Schema({
    username: {
        type: String,
        required: true
    },
    ticket: {
        type: String,
        required: true,
        unique: true
    },
    order: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    time_msc: {
        type: Number,
        required: true
    },
    type: {
        type: Number,
        default: 0
    },
    entry: {
        type: Number,
        default: 0
    },
    magic: {
        type: Number,
        default: 0
    },
    position_id: {
        type: String,
        default: "0"
    },
    volume: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        default: 0
    },
    commission: {
        type: Number,
        default: 0
    },
    swap: {
        type: Number,
        default: 0
    },
    profit: {
        type: Number,
        default: 0
    },
    fee: {
        type: Number,
        default: 0
    },
    symbol: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        default: "--"
    }
})

module.exports = {
    HistoryOrder: mongoose.model("HistoryOrder", OrdersHistorySchema, "HistoryOrder")
}
